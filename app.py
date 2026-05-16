from datetime import datetime
import os
import json
import gspread
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# ─── Site Content (edit here — auto-injected into all templates) ───────────────
SITE_CONTENT = {
    "brand": "Muhammed Rashik",
    "tagline": "I build elegant, fast, and accessible web experiences with Python, Tailwind CSS, and modern JavaScript.",

    # About section — short preview + full text
    "about_short": (
        "I'm a full‑stack developer who loves crafting stylish, interactive UIs and solid backends. "
        "Specialising in Python ecosystems, I bring ideas from wireframe to production with clean code and delightful UX."
    ),
    "about_full": (
        "I'm a full‑stack developer who loves crafting stylish, interactive UIs and solid backends. "
        "Specialising in Python ecosystems — Flask, Django, SQLAlchemy — I pair them with modern frontends built "
        "with Tailwind CSS, vanilla JavaScript, and React. "
        "I care deeply about performance, accessibility, and code maintainability. "
        "Whether it's a REST API, a real‑time feature with Socket.io, or a pixel‑perfect landing page, "
        "I approach every project with the same attention to detail.\n\n"
        "Outside of work I contribute to open‑source projects, mentor junior developers, and explore "
        "machine‑learning integrations for web apps. I believe great software is built through collaboration, "
        "clear communication, and a genuine passion for solving problems."
    ),

    # Skills
    "skills": [
        {"title": "Frontend",   "items": "HTML, CSS, Tailwind, JavaScript, React, Bootstrap, Canvas"},
        {"title": "Backend",    "items": "Python, Flask, Django, REST APIs"},
        {"title": "Databases",  "items": "MySQL, SQLite, MongoDB"},
        {"title": "Tools",      "items": "Git, Docker basics, CI/CD"},
    ],

    # Experience
    "experience": [
        {
            "role": "Python Full Stack Developer",
            "company": "One Team Solutions, Kochi",
            "period": "2025 — Present",
            "description": (
                "Completed an internship as a Python Full Stack Developer Intern at OneTeam Solutions, "
                "gaining hands-on experience in Django, React, and REST API integration. "
                "Worked on real-world projects including web applications, authentication systems, "
                "and UI/UX improvements."
            ),
        }
    ],

    # Services
    "services": [
        {"title": "Web Development", "desc": "Full‑stack apps with Flask, Django, MERN, SQLAlchemy, Tailwind, and JS."},
        {"title": "API Design",      "desc": "RESTful APIs with secure auth and clean documentation."},
        {"title": "UI/UX Polish",    "desc": "Modern, accessible, and responsive UI implementation."},
    ],

    # FAQ
    "faq": [
        {"q": "What stack do you use?",    "a": "Python (Flask / Django), Tailwind CSS, JavaScript, and MySQL with SQLAlchemy."},
        {"q": "Do you take freelance work?","a": "Yes — reach out via the contact form with project details."},
        {"q": "How fast do you respond?",  "a": "Usually within 24 hours on weekdays."},
        {"q": "Can you work remotely?",    "a": "Absolutely — I'm fully set up for remote collaboration."},
    ],

    # Social links
    "github":   "https://github.com/Rashik8606",
    "linkedin": "https://www.linkedin.com/in/muhammed-rashik-52407a2b3/",
}


# ─── Models ───────────────────────────────────────────────────────────────────
class Project(db.Model):
    __tablename__ = "projects"
    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack  = db.Column(db.String(300), nullable=True)
    image_url   = db.Column(db.String(500), nullable=True)
    project_url = db.Column(db.String(500), nullable=True)
    github_url  = db.Column(db.String(500), nullable=True)
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Project {self.title}>"


class Message(db.Model):
    __tablename__ = "messages"
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(200), nullable=False)
    phone      = db.Column(db.String(20),  nullable=False)
    service    = db.Column(db.String(100), nullable=False)
    email      = db.Column(db.String(200), nullable=False)
    message    = db.Column(db.Text,        nullable=False)
    created_at = db.Column(db.DateTime,    default=datetime.utcnow)

    def __repr__(self):
        return f"<Message from {self.email}>"


# ─── Google Sheets helper ─────────────────────────────────────────────────────
def _get_sheet():
    """
    Returns the first worksheet of the Google Sheet.

    Set these env vars:
      GOOGLE_SERVICE_ACCOUNT_JSON  — path to your service-account JSON file
                                     OR the JSON content as a string
      GOOGLE_SHEET_NAME            — exact name of your Google Sheet
                                     (default: "Portfolio Messages")
    """
    creds_env = os.environ.get("GOOGLE_CREDENTIALS", "")
    sheet_name = os.environ.get("GOOGLE_SHEET_NAME", "Portfolio Messages")
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ]
    if not creds_env:
        return None

    # Accept either a file path or raw JSON string
    if creds_env.strip().startswith("{"):
        info = json.loads(creds_env)
        creds = Credentials.from_service_account_info(info, scopes=scopes)
    else:
        creds = Credentials.from_service_account_file(creds_env, scopes=scopes)

    client = gspread.authorize(creds)
    sheet = client.open(sheet_name).sheet1
    return sheet


def _ensure_sheet_headers(sheet):
    """Add header row if the sheet is empty."""
    if not sheet.get_all_values():
        sheet.append_row(["ID", "Name", "Email", "Phone", "Service", "Message", "Date"])


def save_to_google_sheet(msg: Message):
    """Append a Message row to Google Sheets. Silently skips if not configured."""
    try:
        sheet = _get_sheet()
        if sheet is None:
            return
        _ensure_sheet_headers(sheet)
        sheet.append_row([
            msg.id,
            msg.name,
            msg.email,
            msg.phone,
            msg.service,
            msg.message,
            msg.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        ])
    except Exception as exc:
        # Log but never crash the request
        import logging
        logging.getLogger(__name__).warning("Google Sheets save failed: %s", exc)


# ─── App factory ──────────────────────────────────────────────────────────────
def create_app() -> Flask:
    load_dotenv()
    print(">>> SHEET NAME FROM ENV:", os.environ.get("GOOGLE_SHEET_NAME", "NOT SET"))
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")

    default_sqlite_uri = "sqlite:///portfolio.db"
    database_uri = (
        os.environ.get("DATABASE_URL")
        or os.environ.get("SQLALCHEMY_DATABASE_URI")
        or default_sqlite_uri
    )
    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # ── Seed projects ──────────────────────────────────────────────────────────
    def init_db():
        db.create_all()
        portfolio_projects = [
            {
                "title": "Connectify",
                "description": "A modern social platform prototype with real-time interactions.",
                "tech_stack": "Flask, JS, Tailwind, Socket.io",
                "image_url": "images/Connectify.png",
                "project_url": "https://github.com/Rashik8606/Connectify",
                "github_url": "https://github.com/Rashik8606/Connectify",
            },
            {
                "title": "OnlineMov",
                "description": "Movie discovery app with search, filters, and watchlists.",
                "tech_stack": "Flask, TMDB API, Tailwind, SQLite",
                "image_url": "images/OnlineMov.png",
                "project_url": "https://github.com/Rashik8606/Express-basics",
                "github_url": "https://github.com/Rashik8606/Express-basics",
            },
            {
                "title": "Taskizo",
                "description": "Task management app with drag-and-drop and reminders.",
                "tech_stack": "Flask, JS, Tailwind, SQLAlchemy",
                "image_url": "images/Taskizo.png",
                "project_url": "https://github.com/Rashik8606/Job-Indeed",
                "github_url": "https://github.com/Rashik8606/Job-Indeed",
            },
            {
                "title": "Vegstore",
                "description": "E-commerce demo focused on fresh produce with cart and checkout.",
                "tech_stack": "Flask, Tailwind, SQLAlchemy",
                "image_url": "images/Vegstore.png",
                "project_url": "https://github.com/Rashik8606/vegstore",
                "github_url": "https://github.com/Rashik8606/vegstore",
            },
            {
                "title": "Credisure",
                "description": "Online Micro Loan Management app.",
                "tech_stack": "Django, React, MySQL",
                "image_url": "images/credisure.png",
                "project_url": "https://github.com/Rashik8606/credisure",
                "github_url": "https://github.com/Rashik8606/credisure",
            },
        ]
        for data in portfolio_projects:
            existing = Project.query.filter_by(title=data["title"]).first()
            if existing:
                if not existing.description:
                    existing.description = data["description"]
                if not existing.tech_stack:
                    existing.tech_stack = data["tech_stack"]
                if (not existing.image_url) or existing.image_url == "#" or existing.image_url.startswith("http"):
                    existing.image_url = data["image_url"]
                existing.project_url = data["project_url"]
                existing.github_url  = data["github_url"]
            else:
                db.session.add(Project(**data))
        db.session.commit()

    # ── Context processors ────────────────────────────────────────────────────
    @app.context_processor
    def inject_globals():
        return {
            "current_year": datetime.utcnow().year,
            "site": SITE_CONTENT,
        }

    with app.app_context():
        init_db()

    # ── Routes ────────────────────────────────────────────────────────────────
    @app.route("/")
    def home():
        projects = Project.query.order_by(Project.created_at.desc()).all()
        return render_template("index.html", projects=projects)

    @app.route("/contact", methods=["POST"])
    def contact():
        name         = request.form.get("name", "").strip()
        phone        = request.form.get("phone", "").strip()
        email        = request.form.get("email", "").strip()
        service      = request.form.get("service", "").strip()
        message_text = request.form.get("message", "").strip()

        if not name or not email or not message_text:
            flash("Please fill in all required fields.", "error")
            return redirect(url_for("home") + "#contact")

        try:
            msg = Message(name=name, email=email, message=message_text,
                          service=service, phone=phone)
            db.session.add(msg)
            db.session.commit()
            save_to_google_sheet(msg)          # ← saves to Google Sheets
            flash("Thanks! Your message has been sent.", "success")
        except Exception as exc:
            db.session.rollback()
            flash("Something went wrong. Please try again later.", "error")
            app.logger.exception(exc)

        return redirect(url_for("home") + "#contact")

    @app.route("/admin/messages")
    def admin_messages():
        messages = Message.query.order_by(Message.created_at.desc()).all()
        return render_template("admin_messages.html", messages=messages)

    @app.route("/api/messages")
    def api_messages():
        messages = Message.query.order_by(Message.created_at.desc()).all()
        return {
            "messages": [
                {
                    "id": m.id,
                    "name": m.name,
                    "email": m.email,
                    "phone": m.phone,
                    "service": m.service,
                    "message": m.message,
                    "created_at": m.created_at.isoformat(),
                    "formatted_date": m.created_at.strftime("%B %d, %Y at %I:%M %p"),
                }
                for m in messages
            ],
            "total": len(messages),
        }

    @app.route("/messages")
    def messages_page():
        return render_template("messages_system.html")
    

        
    @app.route("/test-sheets")
    def test_sheets():
        import traceback
        results = []
        
        # Step 1 — check env var is loaded
        creds_env = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "")
        sheet_name = os.environ.get("GOOGLE_SHEET_NAME", "NOT SET")
        
        results.append(f"GOOGLE_SHEET_NAME = '{sheet_name}'")
        
        if not creds_env:
            results.append("❌ GOOGLE_SERVICE_ACCOUNT_JSON is empty or not set in .env")
            return "<br>".join(results)
        
        results.append(f"✅ GOOGLE_SERVICE_ACCOUNT_JSON is set (starts with: {creds_env[:30]}...)")
        
        # Step 2 — check file exists
        if not creds_env.strip().startswith("{"):
            if os.path.exists(creds_env):
                results.append(f"✅ File found at: {creds_env}")
            else:
                results.append(f"❌ File NOT found at: {creds_env}")
                results.append(f"Current working directory: {os.getcwd()}")
                return "<br>".join(results)
        
        # Step 3 — try connecting
        try:
            sheet = _get_sheet()
            results.append(f"✅ Connected to Google Sheets!")
            results.append(f"✅ Sheet title: {sheet.title}")
        except Exception as e:
            results.append(f"❌ Connection failed: {str(e)}")
            results.append(f"<pre>{traceback.format_exc()}</pre>")
        
        return "<br>".join(results)


    return app



    


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)





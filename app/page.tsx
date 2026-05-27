import PortfolioLayout from "@/components/PortfolioLayout";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import { siteContent } from "@/lib/site-content";
import { projects, projectLink } from "@/lib/projects";

export default function HomePage() {
  return (
    <PortfolioLayout>
      <section className="container mx-auto px-6 pt-12 pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Full‑Stack Developer
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-500">
                {siteContent.brand}
              </span>
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl text-lg leading-relaxed">
              {siteContent.tagline}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all text-center font-medium"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:ring-2 ring-primary hover:-translate-y-0.5 transition-all text-center font-medium"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {siteContent.skills.map((skill) => (
                <span
                  key={skill.title}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-soft"
                >
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center h-64 sm:h-72 md:h-96">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-fuchsia-500/20 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile.jpg"
              alt={siteContent.brand}
              className="relative w-48 sm:w-56 md:w-72 h-auto rounded-3xl object-cover ring-4 ring-primary/30 shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      <AboutSection />

      <section id="skills" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {siteContent.skills.map((skill) => (
            <div
              key={skill.title}
              className="group p-5 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {skill.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {skill.tech}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Experience</h2>
        <div className="space-y-4">
          {siteContent.experience.map((exp) => (
            <div
              key={`${exp.role}-${exp.company}`}
              className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-gray-800 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h3 className="font-semibold text-lg">
                  {exp.role}{" "}
                  <span className="text-primary">@ {exp.company}</span>
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex-shrink-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <a
              key={p.id}
              href={projectLink(p)}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-white/5 backdrop-blur hover:shadow-2xl hover:-translate-y-2 hover:border-primary/40 transition-all duration-500 block"
            >
              <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">
                    View on GitHub →
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.techStack.split(",").map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="services" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.services.map((svc) => (
            <div
              key={svc.title}
              className="group p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-br hover:from-primary/10 hover:to-fuchsia-500/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {svc.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-primary to-fuchsia-500 text-white text-center shadow-xl shadow-primary/30">
          <h2 className="text-2xl md:text-3xl font-bold">
            Have a project in mind?
          </h2>
          <p className="mt-2 opacity-90">
            Let&apos;s build something great together.
          </p>
          <a
            href="#contact"
            className="inline-block mt-6 px-8 py-3 rounded-full bg-white text-gray-900 font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Get in touch
          </a>
        </div>
      </section>

      <section id="faq" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {siteContent.faq.map((item) => (
            <div
              key={item.q}
              className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 hover:shadow-md cursor-default"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {item.q}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2">Contact</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your message is saved and sent to Google Sheets when configured.
        </p>
        <ContactForm />
      </section>
    </PortfolioLayout>
  );
}

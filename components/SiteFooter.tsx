import { siteContent } from "@/lib/site-content";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="container mx-auto px-6 py-12 text-sm text-gray-500">
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {year} {siteContent.brand}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            className="hover:text-primary transition"
            href={siteContent.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-primary transition"
            href={siteContent.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

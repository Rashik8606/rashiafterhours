import { currentProject } from "@/lib/current-project";

function StatusBubble({ status, label }: { status: string; label: string }) {
  const isLive = status === "live";

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700">
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isLive ? "bg-green-400" : "bg-amber-400"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isLive ? "bg-green-500" : "bg-amber-500"
          }`}
        />
      </span>
      {label}
    </span>
  );
}

export default function CurrentProjectSection() {
  const { title, description, highlights, techStack, imageUrl, status, statusLabel, liveUrl, githubUrl } =
    currentProject;

  return (
    <section id="working-on" className="container mx-auto px-6 py-16">
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
        <h2 className="text-3xl font-bold">Currently Working On</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <StatusBubble status={status} label={statusLabel} />
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>

          <ul className="mt-5 space-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
              >
                View Live
              </a>
            ) : null}
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium hover:border-primary hover:text-primary transition-all"
              >
                View on GitHub
              </a>
            ) : null}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 to-fuchsia-500/20 blur-xl" />
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={`${title} preview`}
              className="w-full aspect-[16/10] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

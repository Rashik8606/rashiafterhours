"use client";

import { useState } from "react";
import { siteContent } from "@/lib/site-content";

export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-6">About</h2>
      <div className="max-w-3xl p-8 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {siteContent.aboutShort}
        </p>
        {!expanded ? null : (
          <div className="mt-4">
            {siteContent.aboutFull.map((para, i) => (
              <p
                key={i}
                className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
                  i > 0 ? "mt-4" : ""
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline focus:outline-none"
        >
          <span>{expanded ? "Read Less" : "Read More"}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

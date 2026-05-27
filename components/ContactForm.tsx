"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const flash = searchParams.get("flash");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      window.location.href = "/?flash=success#contact";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {flash === "success" && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
          Thanks! Your message has been sent.
        </div>
      )}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5 max-w-3xl">
        <input
          className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary transition placeholder-gray-400"
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary transition placeholder-gray-400"
          name="phone"
          placeholder="Phone Number"
          required
        />
        <select
          className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary transition"
          name="service"
          required
          defaultValue=""
        >
          <option value="" disabled>
            What are you looking for?
          </option>
          <option value="Web Application">Web Application</option>
          <option value="Mobile Application">Mobile Application</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>
        <input
          className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary transition placeholder-gray-400"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <textarea
          className="md:col-span-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary transition placeholder-gray-400 resize-none"
          name="message"
          placeholder="Tell me about your project…"
          rows={5}
          required
        />
        <button
          className="md:col-span-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Send Message →"}
        </button>
      </form>
    </>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}

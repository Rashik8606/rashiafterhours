"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type AdminMessage = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
  formattedDate: string;
  dateShort: string;
  timeShort: string;
};

export default function AdminMessagesClient({
  messages,
}: {
  messages: AdminMessage[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    let list = messages.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.message.toLowerCase().includes(term)
    );
    list = [...list].sort((a, b) => {
      if (sort === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sort === "name") return a.name.localeCompare(b.name);
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
    return list;
  }, [messages, search, sort]);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 flex items-center justify-center">
              <span className="text-white text-xl">📬</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
              Message Center
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage and respond to messages from your portfolio visitors
          </p>
        </div>

        {messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Total Messages" value={messages.length} emoji="📧" gradient="from-blue-500 to-blue-600" />
            <StatCard label="This Week" value={messages.length} emoji="📈" gradient="from-green-500 to-green-600" />
            <StatCard label="Unique Senders" value={new Set(messages.map((m) => m.email)).size} emoji="👥" gradient="from-purple-500 to-purple-600" />
          </div>
        )}

        <div className="mb-8 p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 max-w-md w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary"
            />
            <div className="flex gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name</option>
              </select>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition flex items-center gap-2"
              >
                <span>←</span> Back to Portfolio
              </Link>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-6">
            {filtered.map((message) => (
              <div
                key={message.id}
                className="message-card p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
                      {message.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{message.name}</h3>
                      <p className="text-primary font-medium">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
                      {message.dateShort}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
                      {message.timeShort}
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {message.message}
                  </p>
                </div>
                <div className="mt-6 flex gap-3 flex-wrap">
                  <a
                    href={`mailto:${message.email}?subject=Re: Your message from portfolio`}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <span>📧</span> Reply
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(message.email);
                      alert("Email copied to clipboard!");
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    <span>📋</span> Copy Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📭</div>
            <h2 className="text-3xl font-bold mb-4">No messages yet</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto mb-8">
              Contact messages will appear here when visitors send them through your portfolio.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
            >
              View Portfolio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  emoji,
  gradient,
}: {
  label: string;
  value: number;
  emoji: string;
  gradient: string;
}) {
  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-r ${gradient} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{emoji}</div>
      </div>
    </div>
  );
}

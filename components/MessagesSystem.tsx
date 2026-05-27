"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type ApiMessage = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
  formatted_date: string;
};

export default function MessagesSystem() {
  const [allMessages, setAllMessages] = useState<ApiMessage[]>([]);
  const [filtered, setFiltered] = useState<ApiMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setAllMessages(data.messages ?? []);
    } catch {
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
    const id = setInterval(loadMessages, 30000);
    return () => clearInterval(id);
  }, [loadMessages]);

  useEffect(() => {
    const term = search.toLowerCase();
    let list = allMessages.filter((msg) => {
      const matchesSearch =
        msg.name.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term) ||
        msg.message.toLowerCase().includes(term);
      const matchesDate = filterByDate(msg.created_at, dateFilter);
      return matchesSearch && matchesDate;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        case "email":
          return a.email.localeCompare(b.email);
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

    setFiltered(list);
  }, [allMessages, search, dateFilter, sort]);

  const today = new Date().toDateString();
  const todayCount = allMessages.filter(
    (m) => new Date(m.created_at).toDateString() === today
  ).length;
  const uniqueSenders = new Set(allMessages.map((m) => m.email)).size;

  function exportMessages() {
    const dataStr = JSON.stringify(filtered, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `messages_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl">📬</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Amazing Message System
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Professional message management with real-time updates, advanced
            filtering, and beautiful analytics
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={loadMessages}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition flex items-center gap-2"
            >
              <span>🔄</span> Refresh Messages
            </button>
            <button
              type="button"
              onClick={exportMessages}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition flex items-center gap-2"
            >
              <span>📊</span> Export Data
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:shadow-lg transition flex items-center gap-2"
            >
              <span>🏠</span> Back to Portfolio
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <DashboardStat label="Total Messages" value={allMessages.length} sub="All time" emoji="📧" colors="from-blue-500 via-blue-600 to-blue-700" />
          <DashboardStat label="Today's Messages" value={todayCount} sub="Last 24 hours" emoji="📈" colors="from-green-500 via-green-600 to-green-700" />
          <DashboardStat label="Unique Senders" value={uniqueSenders} sub="Different people" emoji="👥" colors="from-purple-500 via-purple-600 to-purple-700" />
          <DashboardStat label="Response Rate" value="85%" sub="Messages replied" emoji="⚡" colors="from-orange-500 via-orange-600 to-orange-700" />
        </div>

        <div className="mb-12 p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center">
            🔍 Advanced Message Search
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Search Messages</label>
              <input
                type="text"
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary border border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary border border-gray-300 dark:border-gray-700"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sort by</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none focus:ring-2 ring-primary border border-gray-300 dark:border-gray-700"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name (A-Z)</option>
                <option value="email">By Email</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Loading amazing messages...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📭</div>
            <h2 className="text-3xl font-bold mb-4">No messages found</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto mb-8">
              Try adjusting your search filters or check back later for new
              messages.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setDateFilter("all");
                setSort("newest");
              }}
              className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-8">
            {filtered.map((msg, index) => (
              <div
                key={msg.id}
                className="p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {msg.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                        {msg.name}
                      </h3>
                      <p className="text-primary font-semibold text-lg">
                        {msg.email}
                      </p>
                      <p className="text-primary font-semibold text-lg">
                        {msg.service}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Ph:no: #{msg.phone}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Message ID: #{msg.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
                      📅 {msg.formatted_date}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-200 text-sm font-medium">
                      ✅ Active
                    </span>
                  </div>
                </div>
                <div className="mb-8 p-8 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 shadow-inner">
                  <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${msg.email}?subject=Re: Your message from portfolio`}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition flex items-center gap-2 font-medium"
                  >
                    <span>📧</span> Reply
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(msg.email);
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition flex items-center gap-2 font-medium"
                  >
                    <span>📋</span> Copy Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardStat({
  label,
  value,
  sub,
  emoji,
  colors,
}: {
  label: string;
  value: number | string;
  sub: string;
  emoji: string;
  colors: string;
}) {
  return (
    <div
      className={`p-8 rounded-3xl bg-gradient-to-br ${colors} text-white transform hover:scale-105 transition-all duration-300 shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{label}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
          <p className="text-white/70 text-xs mt-1">{sub}</p>
        </div>
        <div className="text-5xl opacity-80">{emoji}</div>
      </div>
    </div>
  );
}

function filterByDate(dateString: string, filter: string): boolean {
  const msgDate = new Date(dateString);
  const now = new Date();
  switch (filter) {
    case "today":
      return msgDate.toDateString() === now.toDateString();
    case "week": {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return msgDate >= weekAgo;
    }
    case "month": {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return msgDate >= monthAgo;
    }
    default:
      return true;
  }
}

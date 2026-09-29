"use client";

import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// No backend/email service is wired up yet — this simulates the request so
// the UI states are real and testable. Replace the timeout with a real
// fetch() to your email provider once one exists.
export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(event) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  }

  return (
    <div className="max-w-sm">
      <h3 className="mb-1 text-sm font-semibold text-white">Stay Updated</h3>
      <p className="mb-3 text-sm text-gray-400">
        Get updates about new movies, series, and Youflix features.
      </p>

      {status === "success" ? (
        <p className="text-sm text-green-400">
          You're subscribed — thanks for joining!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your email"
            aria-label="Email address"
            className="w-full min-w-0 rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-white focus:outline-none cursor-pointer"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded bg-[#E50914] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-950 duration-300 disabled:opacity-60 cursor-pointer"
          >
            {status === "loading" ? "Sending…" : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-1.5 text-xs text-red-400">
          Enter a valid email address.
        </p>
      )}
    </div>
  );
}

"use client";

/** Login + Signup forms.  Two flavours of one component:
 *
 *    <AuthForm mode="login"  />
 *    <AuthForm mode="signup" />
 *
 *  Shared visual chrome (input rows, submit button, status banner,
 *  brand-coloured submit) lives in one place so the two forms stay
 *  in lock-step as they're tweaked.
 *
 *  Submits to the server actions in src/app/actions/auth.ts.  Those
 *  are still stubs (no Supabase Auth provisioned yet) — they
 *  validate, log, and return a friendly "we got your details, will
 *  follow up" response.  When auth lands, the form needs zero
 *  changes; only the action body swaps. */

import { useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AtSign,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Phone,
  User,
  UserPlus,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  login,
  signup,
  type AuthResult,
  type LoginPayload,
  type SignupPayload,
} from "@/app/actions/auth";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  // Combined "email or username" — the input auto-routes to the
  // right server field on submit based on whether it contains "@".
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [status, setStatus] = useState<AuthResult | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    startTransition(async () => {
      let res: AuthResult;
      if (mode === "login") {
        res = await login({ identifier, password } satisfies LoginPayload);
      } else {
        // Auto-detect: anything with "@" → email field, otherwise →
        // username field.  Server-side validators still run on both.
        const trimmed = emailOrUsername.trim();
        const isEmail = trimmed.includes("@");
        res = await signup({
          name,
          mobile,
          email: isEmail ? trimmed : undefined,
          username: !isEmail && trimmed ? trimmed : undefined,
          password,
        } satisfies SignupPayload);
      }
      setStatus(res);
      if (res.ok && mode === "signup") {
        setName("");
        setMobile("");
        setEmailOrUsername("");
        setPassword("");
      }
    });
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="grad-border p-6 sm:p-8 space-y-4"
    >
      {mode === "signup" && (
        <Field
          label="পূর্ণ নাম"
          required
          icon={User}
          value={name}
          onChange={setName}
          placeholder="যেমন: কামরুল হাসান"
          autoComplete="name"
        />
      )}

      {mode === "login" ? (
        <Field
          label="মোবাইল / ইউজারনেম / ইমেইল"
          required
          icon={Phone}
          value={identifier}
          onChange={setIdentifier}
          placeholder="01XXXXXXXXX"
          inputMode="tel"
          autoComplete="username"
        />
      ) : (
        <Field
          label="মোবাইল নম্বর"
          required
          icon={Phone}
          value={mobile}
          onChange={setMobile}
          placeholder="01XXXXXXXXX"
          inputMode="tel"
          autoComplete="tel"
          hint="শুধু মোবাইল + পাসওয়ার্ড দিয়েই দ্রুত লগইন করতে পারবেন।"
        />
      )}

      {mode === "signup" && (
        // Combined optional identifier — one box, two valid shapes.
        // Auto-detects: contains "@" → goes to email, otherwise →
        // username.  Keeps the form short and the visual rhythm
        // tighter than two stacked optional fields.
        <Field
          label="ইমেইল বা ইউজারনেম (ঐচ্ছিক)"
          icon={AtSign}
          value={emailOrUsername}
          onChange={setEmailOrUsername}
          placeholder="you@example.com  অথবা  kamrul95"
          autoComplete="email"
        />
      )}

      <PasswordField
        label="পাসওয়ার্ড"
        value={password}
        onChange={setPassword}
        showPw={showPw}
        onToggle={() => setShowPw((v) => !v)}
        autoComplete={mode === "login" ? "current-password" : "new-password"}
      />

      {mode === "login" && (
        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-fg-muted cursor-pointer">
            <input type="checkbox" className="accent-brand-blue" />
            আমাকে মনে রাখুন
          </label>
          <Link
            href="/contact"
            className="font-semibold text-brand-blue hover:underline"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>
      )}

      {status && (
        <div
          className={`rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${
            status.ok
              ? "bg-brand-blue-tint border border-brand-blue/30 text-brand-blue-dark"
              : "bg-brand-red-tint border border-brand-red/30 text-brand-red-dark"
          }`}
        >
          {status.ok ? (
            <Check className="h-4 w-4 mt-0.5 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          )}
          <span>{status.ok ? status.message : status.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-6 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 transition-all btn-shine"
      >
        {mode === "login" ? (
          <LogIn className="h-4 w-4" />
        ) : (
          <UserPlus className="h-4 w-4" />
        )}
        {pending
          ? "প্রক্রিয়াধীন..."
          : mode === "login"
            ? "লগইন করুন"
            : "অ্যাকাউন্ট তৈরি করুন"}
      </button>

      <div className="text-center text-sm text-fg-muted">
        {mode === "login" ? (
          <>
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-bold text-grad-rb hover:opacity-80"
            >
              সাইন আপ করুন →
            </Link>
          </>
        ) : (
          <>
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/login"
              className="font-bold text-grad-rb hover:opacity-80"
            >
              লগইন করুন →
            </Link>
          </>
        )}
      </div>
    </motion.form>
  );
}

// ── Field primitives ───────────────────────────────────────────────

function Field({
  label,
  required,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  hint,
}: {
  label: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.18em] text-fg-muted font-semibold">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-bg-soft border border-border focus-within:border-brand-blue/50 focus-within:ring-2 focus-within:ring-brand-blue/15 px-3 transition-colors">
        <Icon className="h-4 w-4 text-fg-muted shrink-0" />
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className="w-full bg-transparent py-3 text-sm text-fg placeholder:text-fg-faint outline-none"
        />
      </div>
      {hint && (
        <p className="mt-1.5 text-[11px] text-fg-faint leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  showPw,
  onToggle,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  showPw: boolean;
  onToggle: () => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.18em] text-fg-muted font-semibold">
        {label} <span className="text-brand-red">*</span>
      </label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-bg-soft border border-border focus-within:border-brand-blue/50 focus-within:ring-2 focus-within:ring-brand-blue/15 px-3 transition-colors">
        <Lock className="h-4 w-4 text-fg-muted shrink-0" />
        <input
          type={showPw ? "text" : "password"}
          required
          minLength={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          autoComplete={autoComplete}
          className="w-full bg-transparent py-3 text-sm text-fg placeholder:text-fg-faint outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={showPw ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
          className="text-fg-muted hover:text-brand-blue transition-colors p-1 -mr-1"
        >
          {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

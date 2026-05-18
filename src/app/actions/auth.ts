"use server";

/** Authentication Server Actions — STUB.
 *
 *  The UI forms (LoginForm + SignupForm) call these so the wiring is
 *  already in place; the inside currently just validates inputs and
 *  returns success, since Supabase Auth isn't provisioned yet.  When
 *  the auth provider is configured, swap the body of each function
 *  for `supabase.auth.signInWithPassword(...)` / `signUp(...)`.
 *
 *  Phone format: stored as country-coded digits-only e.g. "8801912345678".
 *  We normalise leading 0 / +880 / 880 to that canonical form so users
 *  can type whichever they're used to. */

export type LoginPayload = {
  /** Either a mobile number OR a username/email — both routes are
   *  supported.  The UI primarily promotes mobile + password as the
   *  fastest happy path. */
  identifier: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  mobile: string;
  email?: string;
  username?: string;
  password: string;
};

export type AuthResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

// ── Validators ────────────────────────────────────────────────────
const MIN_PASSWORD = 6;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Accepts: "01912345678" · "+8801912345678" · "8801912345678".
 *  Returns: canonical "8801912345678" or null if invalid. */
function normalizeBdMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;

  // Local format with leading 0: 01XXXXXXXXX (11 digits) → strip 0,
  // prefix 880.
  if (digits.length === 11 && digits.startsWith("01")) {
    return `880${digits.slice(1)}`;
  }
  // Already country-coded: 8801XXXXXXXXX (13 digits).
  if (digits.length === 13 && digits.startsWith("8801")) {
    return digits;
  }
  return null;
}

// ── Actions ───────────────────────────────────────────────────────

export async function login(payload: LoginPayload): Promise<AuthResult> {
  const id = payload.identifier?.trim();
  if (!id) return { ok: false, error: "মোবাইল নম্বর বা ইমেইল দিন।" };
  if (!payload.password || payload.password.length < MIN_PASSWORD) {
    return { ok: false, error: `পাসওয়ার্ড কমপক্ষে ${MIN_PASSWORD} অক্ষরের হতে হবে।` };
  }

  // Identifier can be mobile (preferred) or email/username.
  const mobile = normalizeBdMobile(id);
  const isEmail = EMAIL_RE.test(id);
  if (!mobile && !isEmail && id.length < 3) {
    return { ok: false, error: "সঠিক মোবাইল, ইমেইল বা ইউজারনেম দিন।" };
  }

  // TODO(supabase): replace with supabase.auth.signInWithPassword.
  console.log("[auth/login] (stub) identifier:", mobile ?? id);

  return {
    ok: true,
    message:
      "লগইন ফিচারটি শীঘ্রই সক্রিয় হবে। আপনার তথ্য রেকর্ড করা হয়েছে — মার্কেটিং অফিস থেকে যোগাযোগ করা হবে।",
  };
}

export async function signup(payload: SignupPayload): Promise<AuthResult> {
  const name = payload.name?.trim();
  if (!name || name.length < 2) {
    return { ok: false, error: "পূর্ণ নাম দিন।" };
  }
  const mobile = normalizeBdMobile(payload.mobile ?? "");
  if (!mobile) {
    return {
      ok: false,
      error: "সঠিক বাংলাদেশী মোবাইল নম্বর দিন (০১XXXXXXXXX)।",
    };
  }
  if (!payload.password || payload.password.length < MIN_PASSWORD) {
    return {
      ok: false,
      error: `পাসওয়ার্ড কমপক্ষে ${MIN_PASSWORD} অক্ষরের হতে হবে।`,
    };
  }
  if (payload.email && !EMAIL_RE.test(payload.email)) {
    return { ok: false, error: "ইমেইল ফরম্যাট সঠিক নয়।" };
  }

  // TODO(supabase): replace with supabase.auth.signUp (phone-first
  // signup), then write a profiles-table row with name + username.
  console.log("[auth/signup] (stub) profile:", {
    name,
    mobile,
    email: payload.email || null,
    username: payload.username || null,
  });

  return {
    ok: true,
    message:
      "ধন্যবাদ! সাইনআপ ফিচারটি শীঘ্রই সক্রিয় হবে। আপনার তথ্য পেয়েছি — আমাদের টিম যোগাযোগ করবে।",
  };
}

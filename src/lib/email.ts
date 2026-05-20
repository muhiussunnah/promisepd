/** Transactional email — contact-form notifications via Resend.
 *
 *  Server-only.  Fired from the submitContact Server Action AFTER
 *  the Supabase row is written, so a mail hiccup never blocks the
 *  lead from being saved.
 *
 *  Graceful: if RESEND_API_KEY isn't set (fresh clone, preview
 *  deploy), the send is skipped and logged — the form still works.
 *
 *  Why Resend: cleanest transactional-email API, generous free tier,
 *  and sending to your own Resend-account email works without domain
 *  verification — so hellopromisecity@gmail.com receives mail the
 *  moment the key is wired in (sign up at resend.com with that
 *  address).  Verify the promisepd.com domain later to send from a
 *  branded `noreply@promisepd.com` address. */

import "server-only";
import { Resend } from "resend";

export type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
};

/** Where lead notifications land + who they're "from". */
const NOTIFY_TO = process.env.CONTACT_NOTIFY_EMAIL || "hellopromisecity@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL || "Promise PPD <onboarding@resend.dev>";

export async function sendContactNotification(
  payload: ContactEmailPayload,
): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] RESEND_API_KEY not set — skipping notification.");
    return { sent: false };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      // Team can hit "Reply" and write straight back to the lead.
      replyTo: payload.email,
      subject: `নতুন যোগাযোগ — ${payload.name}`,
      html: buildContactEmailHtml(payload),
    });
    if (error) {
      console.error("[email] resend send failed:", error);
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] unexpected send error:", err);
    return { sent: false };
  }
}

/** Brand-styled, table-based HTML email — inline styles only (email
 *  clients strip <style> + @font-face), web-safe layout, Bangla text
 *  renders via the recipient's system Bengali font. */
function buildContactEmailHtml(p: ContactEmailPayload): string {
  const now = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const row = (label: string, value: string, accent = "#1847a1") => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #eef2ff;">
        <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8a93a6;font-weight:700;">${label}</div>
        <div style="margin-top:4px;font-size:15px;color:#0b1220;font-weight:600;line-height:1.5;border-left:3px solid ${accent};padding-left:10px;">${value}</div>
      </td>
    </tr>`;

  const phoneRow = p.phone
    ? row("ফোন", `<a href="tel:${esc(p.phone)}" style="color:#1847a1;text-decoration:none;">${esc(p.phone)}</a>`, "#e11924")
    : "";
  const interestRow = p.interest
    ? row("আগ্রহের বিষয়", esc(p.interest), "#c0c7d1")
    : "";

  return `<!doctype html>
<html lang="bn">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f9ff;font-family:'Noto Sans Bengali',-apple-system,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9ff;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px -10px rgba(24,71,161,0.18);">

          <!-- Header band -->
          <tr>
            <td style="background:linear-gradient(135deg,#1847a1 0%,#133680 60%,#e11924 140%);padding:28px 32px;">
              <div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:.3px;">Promise&nbsp;PPD</div>
              <div style="margin-top:2px;font-size:12px;color:rgba(255,255,255,0.8);">স্বপ্ন যেখানে বাস্তব</div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <div style="display:inline-block;background:#dce6f8;color:#1847a1;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 12px;border-radius:999px;">নতুন যোগাযোগ বার্তা</div>
              <h1 style="margin:14px 0 4px;font-size:22px;color:#0b1220;font-weight:800;line-height:1.3;">
                ${esc(p.name)} আপনার সাথে যোগাযোগ করতে চান
              </h1>
              <p style="margin:0;font-size:14px;color:#5a6478;line-height:1.6;">
                ওয়েবসাইটের যোগাযোগ ফর্ম থেকে একটি নতুন বার্তা এসেছে। বিস্তারিত নিচে —
              </p>
            </td>
          </tr>

          <!-- Detail rows -->
          <tr>
            <td style="padding:8px 32px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("নাম", esc(p.name))}
                ${row("ইমেইল", `<a href="mailto:${esc(p.email)}" style="color:#1847a1;text-decoration:none;">${esc(p.email)}</a>`)}
                ${phoneRow}
                ${interestRow}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:12px 32px 4px;">
              <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8a93a6;font-weight:700;margin-bottom:8px;">বার্তা</div>
              <div style="background:#f7f9ff;border:1px solid #eef2ff;border-radius:12px;padding:16px 18px;font-size:15px;color:#1f2a44;line-height:1.7;white-space:pre-wrap;">${esc(p.message)}</div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:22px 32px 8px;">
              <a href="mailto:${esc(p.email)}?subject=${encodeURIComponent("Re: আপনার বার্তা — Promise PPD")}"
                 style="display:inline-block;background:#1847a1;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:13px 28px;border-radius:14px;">
                ↩&nbsp; সরাসরি উত্তর দিন
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #eef2ff;margin-top:12px;">
              <p style="margin:0 0 4px;font-size:12px;color:#8a93a6;line-height:1.6;">
                📅 ${now} (ঢাকা)
              </p>
              <p style="margin:0;font-size:12px;color:#8a93a6;line-height:1.6;">
                Promise Proper Development Ltd. · ১২৩/১/২ কাজী টাওয়ার, দক্ষিণ যাত্রাবাড়ী, ঢাকা-১২০৪<br/>
                এই মেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে — সরাসরি Reply করলে গ্রাহকের কাছে পৌঁছাবে।
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

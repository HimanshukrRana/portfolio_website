import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildContactEmailTemplate(input: {
  name: string;
  email: string;
  message: string;
}) {
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br/>");
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New portfolio inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#060b17;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e6edf7;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:radial-gradient(circle at 18% 0%, rgba(34,211,238,0.18), transparent 36%), radial-gradient(circle at 100% 100%, rgba(59,130,246,0.16), transparent 42%), #060b17; padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#0b1222;border:1px solid rgba(148,163,184,0.24);border-radius:20px;overflow:hidden;">
            <tr>
              <td style="padding:30px 30px 22px;background:linear-gradient(120deg, rgba(34,211,238,0.2), rgba(59,130,246,0.15));border-bottom:1px solid rgba(148,163,184,0.2);">
                <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#a5b4fc;margin-bottom:8px;">Portfolio Contact</div>
                <div style="font-size:30px;line-height:1.15;font-weight:700;color:#f8fbff;">New Message Received</div>
                <div style="margin-top:10px;font-size:14px;color:#9fb0c7;">A visitor submitted your website contact form.</div>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:18px;">
                  <tr>
                    <td style="padding:0 8px 8px 0;">
                      <div style="display:inline-block;background:#111a2f;border:1px solid rgba(148,163,184,0.25);border-radius:999px;padding:8px 12px;font-size:12px;color:#b8c8dd;">From: ${safeName}</div>
                    </td>
                    <td style="padding:0 0 8px 8px;" align="right">
                      <div style="display:inline-block;background:#111a2f;border:1px solid rgba(148,163,184,0.25);border-radius:999px;padding:8px 12px;font-size:12px;color:#b8c8dd;">${escapeHtml(submittedAt)}</div>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0d1629;border:1px solid rgba(148,163,184,0.2);border-radius:16px;margin-bottom:18px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8fa6c3;margin-bottom:6px;">Sender email</div>
                      <a href="mailto:${safeEmail}" style="font-size:15px;font-weight:600;color:#dff6ff;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0d1629;border:1px solid rgba(148,163,184,0.2);border-radius:16px;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#8fa6c3;margin-bottom:8px;">Message</div>
                      <div style="font-size:15px;line-height:1.7;color:#e8f0fc;">${safeMessage}</div>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:22px;">
                  <a href="mailto:${safeEmail}" style="display:inline-block;background:linear-gradient(100deg, rgba(34,211,238,0.35), rgba(59,130,246,0.35));border:1px solid rgba(125,211,252,0.45);border-radius:999px;padding:11px 18px;font-size:13px;font-weight:600;color:#ecfeff;text-decoration:none;">Reply to ${safeName}</a>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 30px 22px;border-top:1px solid rgba(148,163,184,0.18);font-size:12px;color:#7f94ae;">
                Sent by your portfolio contact form endpoint.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

    if (!resendApiKey || !toEmail) {
      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ContactPayload;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    if (message.length > 5000) {
      return Response.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: buildContactEmailTemplate({ name, email, message }),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 },
    );
  }
}

const RESEND_API_URL = "https://api.resend.com/emails";

export type EmailAttachment = Readonly<{
  content: string;
  filename: string;
}>;

type EmailTag = Readonly<{
  name: string;
  value: string;
}>;

type SendEmailInput = Readonly<{
  attachments?: ReadonlyArray<EmailAttachment>;
  html: string;
  replyTo?: string;
  subject: string;
  tags?: ReadonlyArray<EmailTag>;
  text: string;
  to: ReadonlyArray<string>;
}>;

function getConfiguredSenderEmail() {
  return (
    process.env.CONTACT_FORM_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM?.trim()
  );
}

function buildFromAddress() {
  const fromEmail = getConfiguredSenderEmail();
  const fromName =
    process.env.CONTACT_FORM_FROM_NAME?.trim() ||
    process.env.RESEND_FROM_NAME?.trim() ||
    "ClinRT Website";

  if (!fromEmail) {
    throw new Error(
      "CONTACT_FORM_FROM_EMAIL is not configured. Set CONTACT_FORM_FROM_EMAIL or RESEND_FROM_EMAIL to a verified sender address before using contact emails.",
    );
  }

  return fromName ? `${fromName} <${fromEmail}>` : fromEmail;
}

async function readResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    return await response.text();
  } catch {
    return null;
  }
}

export async function sendEmail({
  attachments,
  html,
  replyTo,
  subject,
  tags,
  text,
  to,
}: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. Set the Resend API key before using contact emails.",
    );
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attachments,
      from: buildFromAddress(),
      html,
      reply_to: replyTo,
      subject,
      tags,
      text,
      to,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await readResponseBody(response);
    const serializedBody =
      typeof body === "string" ? body : JSON.stringify(body ?? {});

    throw new Error(
      `Resend email request failed with ${response.status}: ${serializedBody}`,
    );
  }

  return readResponseBody(response);
}

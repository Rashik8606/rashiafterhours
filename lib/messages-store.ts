import { appendMessage, listMessages, type ContactMessage } from "./google-sheets";

/** In-memory fallback when Google Sheets is not configured (dev / preview). */
const memoryMessages: ContactMessage[] = [];

function sheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CREDENTIALS ||
      process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
      process.env.GOOGLE_SHEET_ID
  );
}

export async function saveMessage(
  data: Omit<ContactMessage, "id" | "createdAt">
): Promise<ContactMessage> {
  const msg: ContactMessage = {
    ...data,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };

  if (sheetsConfigured()) {
    try {
      await appendMessage(msg);
    } catch (err) {
      console.warn("Google Sheets save failed:", err);
    }
  } else {
    memoryMessages.unshift(msg);
  }

  return msg;
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  if (sheetsConfigured()) {
    try {
      return await listMessages();
    } catch (err) {
      console.warn("Google Sheets read failed:", err);
      return memoryMessages;
    }
  }
  return memoryMessages;
}

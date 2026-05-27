import { google } from "googleapis";

export type ContactMessage = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
};

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.readonly",
];

function parseCredentials(): Record<string, unknown> | string | null {
  const credsEnv =
    process.env.GOOGLE_CREDENTIALS ||
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
    "";
  if (!credsEnv.trim()) return null;
  if (credsEnv.trim().startsWith("{")) {
    return JSON.parse(credsEnv) as Record<string, unknown>;
  }
  return credsEnv;
}

async function getSheetClient() {
  const creds = parseCredentials();
  if (!creds) return null;

  const auth = new google.auth.GoogleAuth({
    credentials: typeof creds === "object" ? creds : undefined,
    keyFile: typeof creds === "string" ? creds : undefined,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  let spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    const sheetName = process.env.GOOGLE_SHEET_NAME || "Portfolio Messages";
    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.spreadsheet' and name='${sheetName.replace(/'/g, "\\'")}' and trashed=false`,
      fields: "files(id)",
      pageSize: 1,
    });
    spreadsheetId = res.data.files?.[0]?.id ?? undefined;
  }

  if (!spreadsheetId) return null;
  return { sheets, spreadsheetId };
}

async function ensureHeaders(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string
) {
  const read = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:G1",
  });
  if (read.data.values?.length) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Sheet1!A1:G1",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        ["ID", "Name", "Email", "Phone", "Service", "Message", "Date"],
      ],
    },
  });
}

export async function appendMessage(msg: ContactMessage): Promise<void> {
  const client = await getSheetClient();
  if (!client) return;

  const { sheets, spreadsheetId } = client;
  await ensureHeaders(sheets, spreadsheetId);

  const date = new Date(msg.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          msg.id ?? Date.now(),
          msg.name,
          msg.email,
          msg.phone,
          msg.service,
          msg.message,
          date,
        ],
      ],
    },
  });
}

export async function listMessages(): Promise<ContactMessage[]> {
  const client = await getSheetClient();
  if (!client) return [];

  const { sheets, spreadsheetId } = client;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A2:G",
  });

  const rows = res.data.values ?? [];
  return rows
    .filter((row) => row.length >= 6)
    .map((row, index) => {
      const dateCell = row[6] as string | undefined;
      const createdAt = dateCell
        ? new Date(dateCell).toISOString()
        : new Date().toISOString();
      return {
        id: Number(row[0]) || index + 1,
        name: String(row[1] ?? ""),
        email: String(row[2] ?? ""),
        phone: String(row[3] ?? ""),
        service: String(row[4] ?? ""),
        message: String(row[5] ?? ""),
        createdAt,
      };
    })
    .reverse();
}

export function formatMessageDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

import { NextResponse } from "next/server";
import { getAllMessages } from "@/lib/messages-store";
import { formatMessageDate } from "@/lib/google-sheets";

export async function GET() {
  const messages = await getAllMessages();
  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      phone: m.phone,
      service: m.service,
      message: m.message,
      created_at: m.createdAt,
      formatted_date: formatMessageDate(m.createdAt),
    })),
    total: messages.length,
  });
}

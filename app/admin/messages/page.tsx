import PortfolioLayout from "@/components/PortfolioLayout";
import { getAllMessages } from "@/lib/messages-store";
import { formatMessageDate } from "@/lib/google-sheets";
import AdminMessagesClient from "@/components/AdminMessagesClient";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  const serialized = messages.map((m) => ({
    id: m.id ?? 0,
    name: m.name,
    email: m.email,
    phone: m.phone,
    service: m.service,
    message: m.message,
    createdAt: m.createdAt,
    formattedDate: formatMessageDate(m.createdAt),
    dateShort: new Date(m.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    timeShort: new Date(m.createdAt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  }));

  return (
    <PortfolioLayout>
      <AdminMessagesClient messages={serialized} />
    </PortfolioLayout>
  );
}

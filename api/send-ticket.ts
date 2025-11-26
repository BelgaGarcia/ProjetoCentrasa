import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { ticketSchema } from "../src/ticketSchema";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
  let payload: unknown;

  try {
    payload = typeof req.body === "string" ? JSON.parse(rawBody || "{}") : req.body;
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const parsed = ticketSchema.safeParse(payload);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  if (!resendApiKey) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY environment variable" });
  }

  const data = parsed.data;
  const toAddresses = (process.env.TICKET_TO_EMAIL || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const fromAddress = process.env.TICKET_FROM_EMAIL;

  if (!fromAddress || toAddresses.length === 0) {
    return res.status(500).json({
      error: "Missing TICKET_FROM_EMAIL or TICKET_TO_EMAIL environment variables"
    });
  }

  const assistedSection =
    data.isForRequester === "nao"
      ? `
      <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">E-mail do solicitado</td><td style="padding: 8px 0;">${data.assistedEmail}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Computador do solicitado</td><td style="padding: 8px 0;">${data.assistedComputerId}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Matrícula do solicitado</td><td style="padding: 8px 0;">${data.assistedEmployeeId}</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Nome do solicitado</td><td style="padding: 8px 0;">${data.assistedUserName}</td></tr>
    `
      : `
      <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Chamado para</td><td style="padding: 8px 0;">Solicitante</td></tr>
    `;

  const requiresEquipmentTag = ["desktop", "impressora"].includes(data.category);
  const equipmentTagLine = requiresEquipmentTag
    ? `<tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">TAG do equipamento</td><td style="padding: 8px 0;">${data.equipmentTag}</td></tr>`
    : "";

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; background: #f9fafb; padding: 24px;">
      <div style="max-width: 720px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <h1 style="font-size: 24px; margin: 0 0 16px; color: #1f2937;">Novo chamado de TI</h1>
        <p style="margin: 0 0 24px; color: #4b5563;">Um novo chamado foi registrado pelo portal.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Solicitante</td><td style="padding: 8px 0;">${data.userName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">E-mail do solicitante</td><td style="padding: 8px 0;">${data.requesterEmail}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Computador do solicitante</td><td style="padding: 8px 0;">${data.computerId}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Matrícula</td><td style="padding: 8px 0;">${data.employeeId}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Tipo de problema</td><td style="padding: 8px 0;">${data.problemType}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Categoria</td><td style="padding: 8px 0;">${data.category}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Subcategoria</td><td style="padding: 8px 0;">${data.subcategory}</td></tr>
            ${equipmentTagLine}
            ${assistedSection}
            <tr><td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Resumo</td><td style="padding: 8px 0;">${data.summary}</td></tr>
          </tbody>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
          <div style="color: #6b7280; font-weight: 600; margin-bottom: 8px;">Descrição</div>
          <div style="white-space: pre-wrap; color: #111827;">${data.description}</div>
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: fromAddress,
      to: toAddresses,
      subject: `Novo chamado: ${data.summary}`,
      html
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail de chamado", error);
    return res.status(500).json({ error: "Failed to send ticket email" });
  }
}

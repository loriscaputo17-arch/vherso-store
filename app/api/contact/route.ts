import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nome, cognome, email, problema } = await req.json();

    if (!nome || !cognome || !email || !problema) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"VHERSO Contact" <${process.env.EMAIL_USER}>`,
      to: "support@vhersoclo.com",
      subject: `Nuovo messaggio da ${nome} ${cognome}`,
      replyTo: email,
      text: `
        Nome: ${nome} ${cognome}
        Email: ${email}

        Problema:
        ${problema}
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Errore invio email" }, { status: 500 });
  }
}
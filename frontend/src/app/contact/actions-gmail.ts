"use server"

import nodemailer from "nodemailer"

// Gmail SMTP версия (альтернатива Resend)
async function sendEmailGmail(data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<boolean> {
  try {
    // Создаем транспорт для Gmail
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // твой gmail
        pass: process.env.GMAIL_APP_PASSWORD, // пароль приложения
      },
    })

    // Отправляем письмо
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // себе
      subject: `Portfolio Contact: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: data.email,
    })

    return true
  } catch (error) {
    console.error("Gmail sending failed:", error)
    return false
  }
}

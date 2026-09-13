import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("Email credentials:", {
    user: process.env.EMAIL_USER ? "configured" : "missing",
    pass: process.env.EMAIL_PASSWORD ? "configured" : "missing",
  });
  try {
    const body = await request.json();

    const { followers, sales, budget, problem, name, brand, phone, email } =
      body;

    // Validate environment variables

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Missing email credentials in environment variables");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format the email content
    const emailContent = `
      <h2>New Consultation Request</h2> 
      <p><strong>Client Name:</strong> ${name}</p>
      <p><strong>Brand Name:</strong> ${brand}</p>
      <p><strong>WhatsApp Number:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      
      <hr />
      
      <h3>Responses:</h3>
      <p><strong>Instagram Followers:</strong> ${followers}</p>
      <p><strong>Monthly Sales:</strong> ${sales}</p>
      <p><strong>Monthly Ads Budget:</strong> ${budget}</p>
      <p><strong>Specific Problem:</strong> ${problem || "Not provided"}</p>
    `;

    const notificationEmail = process.env.NOTIFICATION_EMAIL?.replace(/"/g, "");

    // Send the email
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: notificationEmail,
      subject: `New Grovo Consultation Request from ${brand}`,
      html: emailContent,
    });

    console.log("Email sent successfully:", result);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 },
    );
  }
}

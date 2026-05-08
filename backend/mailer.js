const nodemailer = require("nodemailer");

async function sendOtp(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"FantasyBet" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your FantasyBet OTP",
    html: `
      <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:24px;background:#0d1117;color:#fff;border-radius:12px">
        <h2 style="color:#f4c430">⚡ FantasyBet</h2>
        <p>Your OTP for signup is:</p>
        <div style="font-size:36px;font-weight:900;letter-spacing:8px;color:#22c55e;margin:16px 0">${otp}</div>
        <p style="color:#888;font-size:12px">Valid for 10 minutes. Do not share this with anyone.</p>
      </div>
    `,
  });
}

module.exports = { sendOtp };
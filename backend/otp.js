const otps = new Map();

function storeOtp(email, data) {
  otps.set(email, { ...data, expiresAt: Date.now() + 10 * 60 * 1000 });
}

function verifyOtp(email, otp) {
  const record = otps.get(email);
  if (!record) return { valid: false, reason: "No OTP found" };
  if (Date.now() > record.expiresAt) { otps.delete(email); return { valid: false, reason: "OTP expired" }; }
  if (record.otp !== otp) return { valid: false, reason: "Wrong OTP" };
  otps.delete(email);
  return { valid: true, data: record };
}

module.exports = { storeOtp, verifyOtp };
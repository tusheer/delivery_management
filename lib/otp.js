const crypto = require('crypto');

const key = 'verysecretkey'; // Key for cryptograpy. Keep it secret

const lib = {};

lib.createOtp = (phone) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = 5 * 60 * 1000; // 5 Minutes in miliseconds
    const expires = Date.now() + ttl; // timestamp to 5 minutes in the future
    const data = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
    const hash = crypto.createHmac('sha256', key).update(data).digest('hex'); // creating SHA256 hash of the data
    const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
    // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
    console.log(phone, `Your OTP is ${otp}. it will expire in 5 minutes`);
    return fullHash;
};

lib.verifyOtp = (phone, hash, otp) => {
    // Seperate Hash value and expires from the hash returned from the user
    const [hashValue, expires] = hash.split('.');
    // Check if expiry time has passed
    const now = Date.now();
    if (now > parseInt(expires, 10)) return false;
    // Calculate new hash with the same key and the same algorithm
    const data = `${phone}.${otp}.${expires}`;
    const newCalculatedHash = crypto.createHmac('sha256', key).update(data).digest('hex');
    // Match the hashes
    if (newCalculatedHash === hashValue) {
        return true;
    }
    return false;
};

module.exports = lib;

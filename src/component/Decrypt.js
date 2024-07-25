import CryptoJS from 'crypto-js';

const ciphertext = localStorage.getItem('encrypt');
const secretKey = localStorage.getItem('secret');

function Decrypt() {
  if (ciphertext && secretKey) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  return null;}

export default Decrypt;

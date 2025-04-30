import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const sendWhatsApp = async (message, phone = process.env.DEFAULT_WHATSAPP) => {
  try {
    await axios.get('https://api.callmebot.com/whatsapp.php', {
      params: {
        phone,
        text: message,
        apikey: process.env.WHATSAPP_KEY,
      },
    });
    console.log('📲 WhatsApp message sent');
  } catch (err) {
    console.error('❌ WhatsApp failed:', err.message);
  }
};

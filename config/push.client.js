import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const sendPushNotification = async (title, message) => {
  try {
    await axios.post('https://onesignal.com/api/v1/notifications', {
      app_id: process.env.ONESIGNAL_APP_ID,
      included_segments: ['All'],
      headings: { en: title },
      contents: { en: message },
    }, {
      headers: {
        Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('🔔 Push notification sent');
  } catch (err) {
    console.error('❌ Push failed:', err.message);
  }
};

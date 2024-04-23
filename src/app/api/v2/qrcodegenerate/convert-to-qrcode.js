import express from 'express';
import qrcode from 'qrcode';
import requestPromise from 'request-promise';

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    // Fetch data from URL
    const response = await requestPromise(url);

    // Generate QR code
    const qrCode = await qrcode.toDataURL(response);

    return res.status(200).json({ qrCode });
  } catch (error) {
    return res.status(400).json({ error: 'Failed to generate QR code' });
  }
});

export default router;

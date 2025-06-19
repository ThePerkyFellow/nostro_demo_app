// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 4000;

const corsOptions = {
  origin: 'https://theperkyfellow.github.io',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Load Nostro accounts and forex rates from JSON (parse your PDFs into JSON)
const nostroAccounts = require('./nostro_accounts.json');
const forexRates = require('./forex_rates.json');

// Step 1: Return Nostro accounts for dropdown
app.get('/api/nostro-accounts', (req, res) => {
  res.json(nostroAccounts);
});

// Step 2: Return forex rates for calculation
app.get('/api/forex-rates', (req, res) => {
  res.json(forexRates);
});

// Step 3: Upload GST Challan
app.post('/api/upload-challan', upload.single('challan'), (req, res) => {
  // Save file info, return path for demo
  res.json({ filename: req.file.filename, originalname: req.file.originalname });
});

// Step 4: Calculate charges and INR conversion
app.post('/api/calculate-charges', (req, res) => {
  const { currency, amount } = req.body;
  const rate = forexRates[currency]?.ttSellingRate;
  if (!rate) return res.status(400).json({ error: 'Invalid currency' });

  // Example margin: 1% over TT Selling Rate
  const marginRate = rate * 1.01;
  const inrAmount = amount * marginRate;
  const margin = (marginRate - rate) * amount;
  const gst = margin * 0.18;
  const totalCharges = margin + gst;

  res.json({
    rate,
    marginRate,
    inrAmount,
    margin,
    gst,
    totalCharges,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Link,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const steps = [
  "GST Challan",
  "SWIFT Details",
  "Currency & Nostro",
  "Upload Challan",
  "Remittance",
  "Conversion",
  "Processing",
  "Download Challan",
];

const API_URL = "https://nostro-demo-app.onrender.com";


function App() {
  const [step, setStep] = useState(1);
  const [nostroAccounts, setNostroAccounts] = useState([]);
  const [form, setForm] = useState({
    remitterName: "",
    uin: "",
    address: "",
    bankName: "",
    bankAccount: "",
    relationshipPeriod: "",
    currency: "",
    nostro: {},
    amount: "",
    challanFile: null,
    challanUploaded: false,
    charges: {},
  });
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/nostro-accounts`)
      .then((res) => setNostroAccounts(res.data));
  }, []);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    const nostro = nostroAccounts.find((n) => n.currency === currency) || {};
    setForm({ ...form, currency, nostro });
  };

  const handleFile = (e) =>
    setForm({ ...form, challanFile: e.target.files[0] });

  const uploadChallan = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("challan", form.challanFile);
    await axios.post("http://localhost:4000/api/upload-challan", data);
    setForm({ ...form, challanUploaded: true });
    setLoading(false);
    setStep(step + 1);
  };

  const calculateCharges = async () => {
    setLoading(true);
    const { currency, amount } = form;
    const res = await axios.post(
      "http://localhost:4000/api/calculate-charges",
      { currency, amount }
    );
    setForm({ ...form, charges: res.data });
    setLoading(false);
    setStep(step + 1);
  };

  // Back button logic
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Exit app handler (will only close if opened as popup)
  const handleExit = () => {
    window.close();
    setTimeout(() => alert("You can now close this tab."), 500);
  };

  // Mock FIRC/KYC generation
  const generateFIRC = () => {
    setSnack({ open: true, message: "FIRC generated and available for download.", severity: "success" });
  };
  const generateKYC = () => {
    setSnack({ open: true, message: "KYC document generated and available for download.", severity: "success" });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
          International Tax Payment Demo
        </Typography>
        <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1 */}
        {step === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 1: Generate GST Challan
            </Typography>
            <Typography>
              <b>
                Go to{" "}
                <Link href="https://www.gst.gov.in" target="_blank" rel="noopener">
                  gst.gov.in
                </Link>{" "}
                and fill the Challan form for tax payment.
              </b>
              <br />
              Download the generated GST Challan PDF.
            </Typography>
            <Typography sx={{ mt: 2 }}>
              For more FAQs on GST Payments, visit{" "}
              <Link
                href="https://taxguru.in/goods-and-service-tax/faqs-gst-payments.html"
                target="_blank"
                rel="noopener"
              >
                TaxGuru GST Payments FAQs
              </Link>
              .
            <Typography sx={{ mt: 2 }}>
              <b>API Backend:</b>{" "}
              <Link
                href="https://nostro-demo-app.onrender.com/"
                target="_blank"
                rel="noopener"
              >
                https://nostro-demo-app.onrender.com/
              </Link>
            </Typography>

            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          </Box>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 2: Enter SWIFT/MT103/MT199 Details
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                label="Remitter Name"
                name="remitterName"
                value={form.remitterName}
                onChange={handleInput}
                fullWidth
              />
              <TextField
                label="Registration Number/UIN"
                name="uin"
                value={form.uin}
                onChange={e => {
                  // Allow only alphanumeric, max 15 chars
                  const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
                  setForm({ ...form, uin: val });
                }}
                inputProps={{ maxLength: 15, pattern: "[a-zA-Z0-9]{15}" }}
                helperText="15 digit alphanumeric code"
                fullWidth
              />
              <TextField
                label="Registered Address"
                name="address"
                value={form.address}
                onChange={handleInput}
                fullWidth
              />
              <TextField
                label="Remitter Bank Name"
                name="bankName"
                value={form.bankName}
                onChange={handleInput}
                fullWidth
              />
              <TextField
                label="Remitter Bank Account Number"
                name="bankAccount"
                value={form.bankAccount}
                onChange={e => {
                  // Allow only numbers, max 18 digits
                  const val = e.target.value.replace(/\D/g, '').slice(0, 18);
                  setForm({ ...form, bankAccount: val });
                }}
                inputProps={{ maxLength: 18, pattern: "[0-9]{1,18}" }}
                helperText="Up to 18 digits (numbers only)"
                fullWidth
              />
              <TextField
                label="Banking Relationship Period"
                name="relationshipPeriod"
                value={form.relationshipPeriod}
                onChange={e => {
                  // Allow only numbers
                  const val = e.target.value.replace(/\D/g, '');
                  setForm({ ...form, relationshipPeriod: val });
                }}
                inputProps={{ pattern: "[0-9]*" }}
                helperText="Numbers only (years or months)"
                fullWidth
              />
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          </Box>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 3: Select Currency & Nostro Account
            </Typography>
            <Box display="flex" gap={2} mb={2} mt={2}>
              <FormControl fullWidth>
                <InputLabel id="currency-label">Select Currency</InputLabel>
                <Select
                  labelId="currency-label"
                  value={form.currency}
                  label="Select Currency"
                  onChange={handleCurrencyChange}
                >
                  <MenuItem value="">
                    <em>Select Currency</em>
                  </MenuItem>
                  {nostroAccounts.map((n) => (
                    <MenuItem key={n.currency} value={n.currency}>
                      {n.currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={e => {
                  // Allow only numbers
                  const val = e.target.value.replace(/\D/g, '');
                  setForm({ ...form, amount: val });
                }}
                inputProps={{ min: 0 }}
                fullWidth
              />
            </Box>
            {form.nostro.currency && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Nostro Account Details for {form.nostro.currency}:
                </Typography>
                <Paper sx={{ p: 2, background: "#f9f9f9" }}>
                  <Typography variant="body2">
                    <b>Bank Name:</b> {form.nostro.bankName}
                    <br />
                    <b>SWIFT Code:</b> {form.nostro.swiftCode}
                    <br />
                    <b>Account Number:</b> {form.nostro.accountNumber}
                    <br />
                    <b>Beneficiary Bank:</b> {form.nostro.beneficiaryBank}
                    <br />
                    <b>ICICI SWIFT Code:</b> {form.nostro.iciciSwiftCode}
                    {form.nostro.iban && (
                      <>
                        <br />
                        <b>IBAN:</b> {form.nostro.iban}
                      </>
                    )}
                    {form.nostro.sortCode && (
                      <>
                        <br />
                        <b>Sort Code:</b> {form.nostro.sortCode}
                      </>
                    )}
                    {form.nostro.abaFedNo && (
                      <>
                        <br />
                        <b>ABA Fed No:</b> {form.nostro.abaFedNo}
                      </>
                    )}
                  </Typography>
                </Paper>
              </Box>
            )}
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setStep(step + 1)}
              disabled={!form.currency || !form.amount}
            >
              Next
            </Button>
          </Box>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 4: Upload GST Challan
            </Typography>
            <Box mt={2}>
              <Button variant="contained" component="label">
                {form.challanFile ? form.challanFile.name : "Choose PDF"}
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleFile}
                />
              </Button>
              {form.challanFile && (
                <Typography sx={{ mt: 1 }}>{form.challanFile.name}</Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={uploadChallan}
              disabled={!form.challanFile || loading}
            >
              {loading ? <CircularProgress size={24} /> : "Upload & Next"}
            </Button>
          </Box>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 5: Remittance Instructions
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              Please instruct your bank to send the specified amount in{" "}
              <b>{form.currency}</b> to the Nostro account below.
              <br />
              Use SWIFT message <b>MT103+REMIT</b> or <b>MT103+STP</b>.
              <br />
              <b>Include:</b> Remitter name, UIN, address, bank name, account number, relationship period, and attach the GST Challan.
              <br />
              <b>Purpose of Remittance:</b> OIDAR Tax Payment
            </Typography>
            {/* Replace image with your table */}
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Remittance Instruction Table
              </Typography>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#fafafa" }}>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}><b>To Correspondent Bank Name:</b></td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>&lt; Corresponding Bank Name &gt;</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>SWIFT CODE (Field 56)</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>XXXXXXXXX</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>Correspondent Bank A/C no.</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>XXXXXXXXX</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>BANK CLEARING CODE (Intermediary Bank)</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>XXXXXXXXX</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>Beneficiary Bank Details (Field 57)</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>ICICI BANK LIMITED MUMBAI<br/>Overseas Tax payer GST collect</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>Beneficiary account name</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>Overseas Tax payer GST collect</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>Beneficiary account no</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>0104SLOOIDAR</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>Purpose of remittance (Field 70/72)</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>&lt;Provide GSTIN and email ID&gt;</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>BIC ID (Savings)</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>ICICINBBNRI</td>
                  </tr>
                </tbody>
              </table>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={calculateCharges}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "I've Sent the Funds"}
            </Button>
          </Box>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 6: Conversion & Charges
            </Typography>
            <Paper sx={{ p: 2, mt: 2, background: "#f9f9f9" }}>
              <Typography>
                <b>Amount received will be converted to INR at rate:</b>{" "}
                {form.charges.rate}
                <br />
                <b>Margin rate:</b> {form.charges.marginRate}
                <br />
                <b>INR Amount:</b> {form.charges.inrAmount}
                <br />
                <b>Margin:</b> {form.charges.margin}
                <br />
                <b>GST (18%):</b> {form.charges.gst}
                <br />
                <b>Total Charges:</b> {form.charges.totalCharges}
              </Typography>
            </Paper>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          </Box>
        )}

        {/* Step 7 */}
        {step === 7 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 7: Processing
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              Your transaction will be processed after successful payment and
              conversion.
              <br />
              Once complete, proceed to download the final paid Challan.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          </Box>
        )}

        {/* Step 8 */}
        {step === 8 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Step 8: Download Final GST Challan & Documents
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              Go to{" "}
              <Link
                href="https://www.gst.gov.in"
                target="_blank"
                rel="noopener"
              >
                gst.gov.in
              </Link>
              , log in, and download your paid Challan from 'Services &gt;
              Payments &gt; Challan History'.
            </Typography>
            <Typography paragraph>
              To check your payment status, visit the{" "}
              <Link
                href="https://tutorial.gst.gov.in/userguide/payments/Track_Payment_Status_(Pre_Login).htm"
                target="_blank"
                rel="noopener"
              >
                GST Payment Status Tutorial
              </Link>
              .
            </Typography>
            <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
              <Typography variant="h6" gutterBottom>
                Generate Additional Documents
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DescriptionIcon />}
                  onClick={generateFIRC}
                >
                  Generate FIRC on Security Paper
                </Button>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  The Foreign Inward Remittance Certificate (FIRC) serves as proof of your international tax payment.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<VerifiedUserIcon />}
                  onClick={generateKYC}
                >
                  Generate KYC on Bank Letterhead
                </Button>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  KYC document on bank letterhead serves as confirmation of your identity verification.
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, fontStyle: "italic" }}>
                  * Documents will be generated immediately and available for download before closing the app.
                </Typography>
              </Box>
            </Paper>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mr: 2 }}
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              onClick={handleExit}
            >
              Exit App
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Thank you!
            </Typography>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;

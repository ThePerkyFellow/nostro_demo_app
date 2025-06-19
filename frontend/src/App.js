import React, { useState } from "react";
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

// Hardcoded nostro accounts data
const hardcodedNostroAccounts = [
  {
    currency: "AED",
    bankName: "EMIRATES BANK INTERNATIONAL PJSC",
    swiftCode: "EBILAEADXXX",
    accountNumber: "1261052966705",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "AUD",
    bankName: "JP MORGAN CHASE BANK, SYDNEY",
    swiftCode: "CHASAU2XXXX",
    accountNumber: "10039347",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "BHD",
    bankName: "AHLI UNITED BANK B.S.C. MANAMA BH",
    swiftCode: "AUBBBHBMXXX",
    accountNumber: "BH07AUBB00016596231001",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "CAD",
    bankName: "ROYAL BANK OF CANADA TORONTO",
    swiftCode: "ROYCCAT2XXX",
    accountNumber: "95911022482",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "CHF",
    bankName: "UBS Zurich",
    swiftCode: "UBSWCHZH80A",
    accountNumber: "02300000036549050000Y",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "DKK",
    bankName: "DEN DANSKE BANK COPENHAGEN",
    swiftCode: "DABADKKKXXX",
    accountNumber: "3996026914",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "EUR",
    bankName: "ICICI Bank UK PLC, GERMANY BRANCH",
    swiftCode: "ICICDEFFXXX",
    accountNumber: "0000484637",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS",
    iban: "DE56 5012 0100 0000 4846 37"
  },
  {
    currency: "GBP",
    bankName: "NATIONAL WESTMINSTER BANK LONDON",
    swiftCode: "NWBKGB2LXXX",
    accountNumber: "10001247",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS",
    sortCode: "0000600004"
  },
  {
    currency: "HKD",
    bankName: "HSBC HONG KONG",
    swiftCode: "HSBCHKHHHKH",
    accountNumber: "511639197001",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "JPY",
    bankName: "SUMITOMO BANKING CORPORATION",
    swiftCode: "SMBCJPJTXXX",
    accountNumber: "4296",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "KRW",
    bankName: "KEB HANA BANK",
    swiftCode: "KOEXKRSEXXX",
    accountNumber: "0963FRW001000072",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "KWD",
    bankName: "BURGAN BANK - KUWAIT",
    swiftCode: "BRGNKWKWXXX",
    accountNumber: "0201/00124070014004000",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "MYR",
    bankName: "CIMB Bank Berhad",
    swiftCode: "CIBBMYKLXXX",
    accountNumber: "14081195623050",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "NOK",
    bankName: "DNB NOR BANK ASA (FORMERLY DEN NORSKE BANK ASA)",
    swiftCode: "DNBANOKKXXX",
    accountNumber: "7001.02.04230",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "NZD",
    bankName: "ANZ National Bank limited",
    swiftCode: "ANZBNZ22058",
    accountNumber: "103705/00001",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "OMR",
    bankName: "SOHAR INTERNATIONAL BANK S.A.O.G",
    swiftCode: "BSHROMRUXXX",
    accountNumber: "1020106023",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "PLN",
    bankName: "MBANK S.A. (FORMERLY BRE BANK S.A.)",
    swiftCode: "BREXPLPWXXX",
    accountNumber: "PL90114000000000101939001002",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "QAR",
    bankName: "COMMERCIAL BANK OF QATAR",
    swiftCode: "CBQAQAQAXXX",
    accountNumber: "4010004124002",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "SAR",
    bankName: "RIYAD BANK BANK LTD. RIYADH",
    swiftCode: "RIBLSARIXXX",
    accountNumber: "9250015699940",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "SEK",
    bankName: "SKANDINAVISKA ENSKILDA BANKEN STOCKHOLM SE",
    swiftCode: "ESSESESSXXX",
    accountNumber: "52018562525",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "SGD",
    bankName: "JP MORGAN CHASE BANK N.A SINGAPORE",
    swiftCode: "CHASSGSGXXX",
    accountNumber: "111940147",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "THB",
    bankName: "SIAM COMMERCIAL BANK",
    swiftCode: "SICOTHBKXXX",
    accountNumber: "1113913091",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  },
  {
    currency: "USD",
    bankName: "CITI BANK N.A.",
    swiftCode: "CITIUS33XXX",
    accountNumber: "36329377",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS",
    abaFedNo: "021000089"
  },
  {
    currency: "ZAR",
    bankName: "STANDARD BANK OF SOUTH AFRICA LIMITED",
    swiftCode: "SBZAZAJJXXX",
    accountNumber: "7222151",
    beneficiaryBank: "ICICI Bank Ltd., Mumbai (India)",
    iciciSwiftCode: "ICICINBBCTS"
  }
];

// Hardcoded forex rates
const hardcodedForexRates = {
  "USD": { "ttSellingRate": 86.7 },
  "EUR": { "ttSellingRate": 99.06 },
  "GBP": { "ttSellingRate": 116.36 },
  "AUD": { "ttSellingRate": 55.91 },
  "CAD": { "ttSellingRate": 62.84 },
  "SGD": { "ttSellingRate": 66.32 },
  "JPY": { "ttSellingRate": 61.38 },
  "AED": { "ttSellingRate": 24.03 },
  "CHF": { "ttSellingRate": 105.58 },
  "SAR": { "ttSellingRate": 23.37 },
  "QAR": { "ttSellingRate": 24.2 },
  "SEK": { "ttSellingRate": 9.15 },
  "DKK": { "ttSellingRate": 13.42 },
  "NOK": { "ttSellingRate": 8.53 },
  "NZD": { "ttSellingRate": 51.88 },
  "HKD": { "ttSellingRate": 11.29 },
  "KWD": { "ttSellingRate": 290.14 },
  "THB": { "ttSellingRate": 2.62 },
  "ZAR": { "ttSellingRate": 4.74 },
  "OMR": { "ttSellingRate": 227.34 },
  "KRW": { "ttSellingRate": 0.0619 },
  "PLN": { "ttSellingRate": 23.51 },
  "BHD": { "ttSellingRate": 232.78 },
  "MYR": { "ttSellingRate": 20.53 }
};

function App() {
  const [step, setStep] = useState(1);
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
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    const nostro = hardcodedNostroAccounts.find((n) => n.currency === currency) || {};
    setForm({ ...form, currency, nostro });
  };

  const handleFile = (e) =>
    setForm({ ...form, challanFile: e.target.files[0] });

  const uploadChallan = () => {
    // Dummy upload - just simulate success
    setForm({ ...form, challanUploaded: true });
    setSnack({ open: true, message: "Challan uploaded successfully (Demo)", severity: "success" });
    setTimeout(() => setStep(step + 1), 1000);
  };

  const calculateCharges = () => {
    // Dummy calculation using hardcoded rates
    const { currency, amount } = form;
    const rate = hardcodedForexRates[currency]?.ttSellingRate || 1;
    
    // Example margin: 1% over TT Selling Rate
    const marginRate = rate * 1.01;
    const inrAmount = amount * marginRate;
    const margin = (marginRate - rate) * amount;
    const gst = margin * 0.18;
    const totalCharges = margin + gst;

    setForm({ 
      ...form, 
      charges: {
        rate: rate.toFixed(2),
        marginRate: marginRate.toFixed(2),
        inrAmount: inrAmount.toFixed(2),
        margin: margin.toFixed(2),
        gst: gst.toFixed(2),
        totalCharges: totalCharges.toFixed(2),
      }
    });
    setStep(step + 1);
  };

  // Back button logic
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Exit app handler
  const handleExit = () => {
    window.close();
    setTimeout(() => alert("You can now close this tab."), 500);
  };

  // Mock FIRC/KYC generation
  const generateFIRC = () => {
    setSnack({ open: true, message: "FIRC generated and available for download (Demo).", severity: "success" });
  };
  const generateKYC = () => {
    setSnack({ open: true, message: "KYC document generated and available for download (Demo).", severity: "success" });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
          OIDAR International Tax Payment Demo
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
                and fill the Challan form for OIDAR tax payment.
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
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <b>Demo Mode:</b> This is a standalone demo version with hardcoded data for concept demonstration.
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
                  {hardcodedNostroAccounts.map((n) => (
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
              Step 4: Upload GST Challan (Demo)
            </Typography>
            <Box mt={2}>
              <Button variant="contained" component="label">
                {form.challanFile ? form.challanFile.name : "Choose PDF (Demo)"}
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
            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
              * This is a demo upload. In the real application, the file would be processed and validated.
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
              onClick={uploadChallan}
              disabled={!form.challanFile}
            >
              Upload & Next (Demo)
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
              <b>{form.currency}</b> to the Nostro account above.
              <br />
              Use SWIFT message <b>MT103+REMIT</b> or <b>MT103+STP</b>.
              <br />
              <b>Include:</b> Remitter name, UIN, address, bank name, account number, relationship period, and attach the GST Challan.
              <br />
              <b>Purpose of Remittance:</b> OIDAR Tax Payment
            </Typography>
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
              sx={{ mt: 2 }}
            >
              I've Sent the Funds (Demo)
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
            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
              * These are demo calculations based on hardcoded forex rates.
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
                Generate Additional Documents (Demo)
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DescriptionIcon />}
                  onClick={generateFIRC}
                >
                  Generate FIRC on Security Paper (Demo)
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
                  Generate KYC on Bank Letterhead (Demo)
                </Button>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  KYC document on bank letterhead serves as confirmation of your identity verification.
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, fontStyle: "italic" }}>
                  * This is a demo version. In the real application, documents would be generated and available for download.
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
              Thank you for trying the OIDAR Demo!
            </Typography>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
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

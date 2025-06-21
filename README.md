# International Tax Payment Demo

A comprehensive web application demonstrating the complete workflow for **International Tax Payments in India from abroad**. This app guides users through the entire process from GST challan generation to final document download.

## 🎯 Overview

This application provides a step-by-step demonstration of how foreign entities can pay OIDAR taxes in India through the banking system. It covers the complete workflow including currency selection, nostro account details, remittance instructions, and charge calculations.

## ✨ Features

- **8-Step Guided Workflow**: Complete end-to-end process simulation
- **Multi-Currency Support**: 24+ international currencies with real nostro account details
- **Dynamic Charge Calculation**: Real-time forex rate conversion with margin and GST calculations
- **Document Management**: GST challan upload and FIRC/KYC generation capabilities
- **Responsive Design**: Modern Material UI interface optimized for all devices
- **Standalone Operation**: Works completely independently without backend dependencies

## 🚀 Live Demo

**Frontend (GitHub Pages):** [https://theperkyfellow.github.io/nostro_demo_app/](https://theperkyfellow.github.io/nostro_demo_app/)

## 🛠 Technology Stack

### Frontend
- **React.js** - User interface framework
- **Material UI (MUI)** - Component library and design system
- **Axios** - HTTP client for API communication
- **GitHub Pages** - Static site hosting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Render.com** - Backend hosting

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git** (for version control)

## 🏗 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/theperkyfellow/nostro_demo_app.git
cd nostro_demo_app
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:4000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
nostro_demo_app/
├── backend/
│   ├── server.js              # Express server configuration
│   ├── nostro_accounts.json   # Currency and nostro account data
│   ├── forex_rates.json       # Real-time forex rates
│   ├── package.json           # Backend dependencies
│   └── uploads/               # File upload directory
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React application
│   │   └── index.js           # Application entry point
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # Frontend dependencies
│   └── build/                 # Production build files
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🔄 Application Workflow

### Step 1: GST Challan Generation
- Links to official GST portal
- Provides guidance for tax challan creation
- Includes helpful FAQ resources

### Step 2: SWIFT/MT103 Details
- Collects remitter information
- Validates UIN (15-digit alphanumeric)
- Captures banking relationship details

### Step 3: Currency & Nostro Selection
- **24+ supported currencies**: USD, EUR, GBP, AUD, CAD, SGD, JPY, AED, CHF, SAR, QAR, SEK, DKK, NOK, NZD, HKD, KWD, THB, ZAR, OMR, KRW, PLN, BHD, MYR
- Dynamic nostro account details display
- Real-time account information lookup

### Step 4: Document Upload
- GST challan PDF upload simulation
- File validation and processing
- Upload confirmation feedback

### Step 5: Remittance Instructions
- Detailed SWIFT message guidance
- Comprehensive remittance instruction table
- MT103+REMIT/MT103+STP specifications

### Step 6: Charges & Conversion
- Real-time forex rate application
- Margin calculation (1% over TT Selling Rate)
- GST computation (18% on margin)
- Total charges breakdown

### Step 7: Processing Status
- Transaction processing simulation
- Status updates and confirmations
- Progress tracking

### Step 8: Final Documentation
- Paid challan download instructions
- FIRC generation on security paper
- KYC document creation on bank letterhead
- Payment status tracking links

## 💰 Supported Currencies & Nostro Accounts

The application includes complete nostro account details for 24+ currencies through Bank's correspondent banking network:

| Currency | Correspondent Bank | SWIFT Code |
|----------|-------------------|------------|
| USD | CITI BANK N.A. | CITIUS33XXX |
| EUR | ICICI Bank UK PLC, GERMANY BRANCH | ICICDEFFXXX |
| GBP | NATIONAL WESTMINSTER BANK LONDON | NWBKGB2LXXX |
| JPY | SUMITOMO BANKING CORPORATION | SMBCJPJTXXX |
| AUD | JP MORGAN CHASE BANK, SYDNEY | CHASAU2XXXX |
| ... | ... | ... |

*Complete list available in the application*

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:4000
```

For production deployment:
```env
REACT_APP_API_URL=https://nostro-demo-app.onrender.com
```

### CORS Configuration
Update `backend/server.js` for production:
```javascript
const corsOptions = {
  origin: 'https://theperkyfellow.github.io',
  optionsSuccessStatus: 200
};
```

## 🚀 Deployment

### Frontend (GitHub Pages)
```bash
cd frontend
npm run build
npm run deploy
```

### Backend (Render.com)
1. Connect GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Set root directory: `backend`

## 📊 Key Features & Benefits

### For Financial Institutions
- **Comprehensive Workflow**: Complete OIDAR payment process simulation
- **Regulatory Compliance**: Aligned with Indian GST and FEMA regulations
- **Multi-Currency Support**: Global currency coverage with real nostro details
- **Document Management**: Integrated challan and certificate handling

### For Developers
- **Modern Tech Stack**: React + Node.js with Material UI
- **Responsive Design**: Mobile-first approach with clean UI/UX
- **Modular Architecture**: Easily extensible and maintainable codebase
- **API Integration**: RESTful backend with comprehensive data handling

### For End Users
- **Intuitive Interface**: Step-by-step guided process
- **Real-Time Calculations**: Dynamic forex rates and charge computation
- **Document Generation**: Automated FIRC and KYC creation
- **Progress Tracking**: Clear workflow visualization

## 🔐 Security & Compliance

- **Data Validation**: Input sanitization and validation
- **File Upload Security**: Restricted file types and size limits
- **CORS Protection**: Configured cross-origin policies
- **Regulatory Alignment**: Compliant with Indian banking regulations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

For questions, support, or collaboration opportunities:

- **GitHub Issues**: [Create an issue](https://github.com/theperkyfellow/nostro_demo_app/issues)
- **LinkedIn**: [Your LinkedIn profile](https://www.linkedin.com/in/mayur-g-798013219/)

## 🙏 Acknowledgments

- **Reserve Bank of India** - For FEMA regulations and guidelines
- **Material UI Team** - For the excellent component library
- **React Community** - For the robust frontend framework

## 📈 Future Enhancements

- [ ] Real-time forex rate API integration
- [ ] Multi-language support
- [ ] Advanced document processing
- [ ] Integration with banking APIs
- [ ] Enhanced security features
- [ ] Mobile application development

---

**Built with ❤️ for the Indian banking and fintech community**

*This is a demonstration application for educational and proof-of-concept purposes. For production use, ensure compliance with all applicable regulations and security standards.*

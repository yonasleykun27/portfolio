# 🌟 Premium Personal Developer Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/EmailJS-F25F22?style=for-the-badge&logo=mailgun&logoColor=white" alt="EmailJS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

A state-of-the-art, high-fidelity, and fully responsive personal portfolio designed to showcase software engineering expertise, sub-projects, academic credentials, and professional achievements. 

---

## 🔗 Live Demo
> **Check out the live deployment here:** [Your Live Website URL goes here!]

---

## ✨ Key Features

*   **🎨 Dynamic Light/Dark Mode**: High-performance theme switcher toggled seamlessly with micro-animations.
*   **📊 Viewport Stats Counter**: Multi-observer Glassmorphic stats counters animating dynamically when scrolled into view (15+ Projects, 8+ Certifications, 5+ Academic Institutions).
*   **✉️ Seamless Contact Form Integration**: Connected directly to **EmailJS** API for secure, instant client inquiries delivering detailed subject and body templates straight to dashboard.
*   **📄 High-Fidelity Binary PDF Download**: Fully custom mathematically-compliant single-page PDF resume download built programmatically to prevent any loading crashes.
*   **⚡ Lightweight Scroll Reveal Observer**: Custom vanilla JS scroll animations executing smooth translations (`translateY`) with zero third-party bloated libraries.
*   **📱 Mobile First & Hover Proof**: Project subtitling persists on touch screens while displaying gorgeous neon blue glow cards on desktop hover states.

---

## 🛠️ Tech Stack & Utilities

*   **Core**: HTML5, Vanilla CSS3, Vanilla ECMAScript 6+
*   **API Integrations**: [EmailJS API](https://www.emailjs.com/) for instant mail transmissions.
*   **Fonts & Icons**: Google Fonts (Poppins, Open Sans) & FontAwesome Icons.

---

## 📂 Project Structure

```text
├── image/                     # Compressed optimized media assets & profile picture
├── appleproject/              # Embedded sub-project 1
├── applebootstrapproject/     # Embedded sub-project 2
├── dbuiddms-project/          # Embedded sub-project 3
├── ethiopis project/          # Embedded sub-project 4
├── task-management-app/       # Embedded sub-project 5
├── index.html                 # Main portfolio page markup & SEO headers
├── style.css                  # Custom styling system, HSL variables & responsive framework
├── script.js                  # Intersection observers, count-up timelines & form control
├── README.md                  # Comprehensive project documentation
└── Yonas_Leykun_Resume.pdf    # Dynamic single-page professional resume PDF
```

---

## 🚀 Getting Started Locally

Follow these quick steps to launch the repository on your local computer for development:

### 1. Clone the repository
```bash
git clone https://github.com/yonasleykun27/portfolio.git
cd portfolio
```

### 2. Run a Local Server
Since the contact form and PDF assets use local paths, open the directory utilizing a local server:
*   **VS Code**: Right-click `index.html` and click **"Open with Live Server"**.
*   **Python**: Run `python -m http.server 8000` and navigate to `http://localhost:8000`.
*   **Node.js**: Install `http-server` globally (`npm install -g http-server`) and run `http-server .`.

---

## 📬 Contact Setup
To map the contact form to your own backend dashboard, simply update your credentials in `script.js`:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");

const serviceID = "YOUR_SERVICE_ID";
const templateID = "YOUR_TEMPLATE_ID";
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

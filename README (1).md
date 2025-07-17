# 🩺 BrestaTalks – Multimodal Arabic Medical Chatbot for Breast Cancer Support

**BrestaTalks** is an advanced multimodal medical chatbot built to support Arabic-speaking users through their breast cancer journey. It combines **Natural Language Processing (NLP)**, **Visual Question Answering (VQA)**, **voice input**, and **machine translation**, enabling users to interact using **text, images, and voice** — all in Arabic.

🧠 Think of it as **ChatGPT for breast cancer** that understands and explains Arabic medical questions and medical images like mammograms — with multilingual model integration for real-world impact.

---

## 🚀 Key Features

- 🗣️ **Arabic Language Support** – Right-to-left layout, proper localization, and medical terminology  
- 💬 **Text + Voice Chat** – Users can ask medical questions via text or Arabic speech input  
- 🖼️ **Medical Image Understanding (VQA)** – Ask questions about uploaded images (e.g., mammograms)  
- 🌍 **Translation Layer** – Arabic↔English pipeline for medical image Q&A  
- 🤖 **AI-Powered Answers** – Using powerful open-source LLMs and visual models  
- 🧘‍♀️ **Emotional Support** – Compassionate and culturally-aware chatbot responses  
- 📱 **Mobile-Friendly** – Fully responsive UI with dark mode support  
- ☁️ **Cloud Ready** – Frontend deployed on Vercel, backend prepared for cloud/NGROK  

---

## 🧠 Underlying AI Models

| Input Type | Task                       | Model Used                            |
|------------|----------------------------|----------------------------------------|
| 📝 Text     | Arabic Q&A                 | Aya LLM (Arabic medical model)         |
| 🔊 Voice    | Speech-to-Text             | Whisper (for Arabic voice recognition) |
| 📊 Embedding| Semantic Search / Retrieval| multilingual-e5-large                  |
| 🖼️ Image    | Visual Q&A                 | MedGEMMA                               |
| 🌐 Translation | English ↔ Arabic        | Helsinki-NLP/opus-mt-en-ar + inverse   |

---

## 🧬 How It Works

1. **User Input**: Message sent via text, voice, or image  
2. **Frontend (Next.js)**: Captures, validates, and prepares input with Arabic support  
3. **Backend (FastAPI)**:
   - Uses **Aya** for Arabic medical Q&A  
   - Uses **MedGEMMA + Helsinki** for VQA with translation layer  
   - Uses **Whisper** for voice input processing  
   - Uses **multilingual-e5-large** for semantic search (e.g., dataset grounding)  
4. **Output**: Arabic response returned and rendered in UI with proper RTL formatting

---

## 🌐 Stack Overview

| Layer    | Technology                            |
|----------|----------------------------------------|
| Frontend | Next.js 15, Tailwind CSS, TypeScript   |
| Backend  | FastAPI (Python), RESTful APIs         |
| AI Models| Aya, MedGEMMA, Whisper, multilingual-e5, Helsinki-NLP |
| Deploy   | Vercel (Frontend), Ngrok / Cloud-ready (Backend) |

---

## ✅ System Highlights

- 🔓 Custom user authentication and profile management  
- 📲 Mobile-first responsive chat interface  
- 🌐 Arabic NLP with real-time voice and text support  
- 🧠 VQA with medical image understanding and translation  
- 💬 Live chat experience with loading states, quick replies, and history  

---

## 📁 Project Pages

```
/pages
  /chat       - Main multimodal chat interface
  /auth/*     - Login, register, forgot password
  /profile    - User account and preferences
  /about      - Project goals and context
  /contact    - Support & feedback
/api/chat     - Core API endpoint
```

---

## 🧪 Example Interaction

**🤖 You are BRESTA TALKS, an Arabic medical assistant specialized in breast cancer. Always respond in Arabic with empathy and professionalism.**

```plaintext
User: أشعر بألم في الثدي، هل هذا طبيعي؟
Bot: أفهم قلقك، وهذا شعور طبيعي تماماً. آلام الثدي يمكن أن تحدث لأسباب متعددة منها...
```

---

## 🚀 How to Run This Locally

### 1. 📥 Download the Full Project from Google Drive  
👉 [Click here to download the full project](https://drive.google.com/drive/folders/1znao-Suy9X2N777PSHuG4pW72HN7ht8d?usp=sharing)

### 2. 🗂️ Extract the Files  
Extract the zip file into a folder on your local machine.

### 3. 📦 Install Dependencies

Make sure you have installed:

- Node.js (v18 or higher)
- npm or yarn

Then, open a terminal in the project folder and run:

```bash
npm install
```

### 4. ⚙️ Set Up Environment Variables

Create a file called `.env.local` in the root directory and add:

```dotenv
NEXT_PUBLIC_BACKEND_URL=https://your-ngrok-url.ngrok-free.app
```

Replace with the actual URL from running the backend notebook.

### 5. 🧠 Start the Backend

Run the notebook `run_final_Back_end.ipynb` (in Colab or Jupyter)  
Copy the `ngrok` URL printed at the end of the notebook and paste it into `.env.local`

### 6. 🧪 Run the Development Server

```bash
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
breast-cancer-chatbot/
├── app/
│   ├── api/chat/route.ts
│   ├── chat/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── auth/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── .env.local
├── package.json
└── next.config.mjs
```

---

## 🤝 Contributions & Future Plans

We welcome contributions from:

- 🧑‍💻 Developers (Frontend, Backend, AI)
- 🧑‍⚕️ Medical professionals (to refine medical content)
- 🔤 Linguists (to enhance Arabic NLP)
- 📊 ML Researchers (to push Arabic medical VQA)

### Future Plans

- 🧠 Fine-tune Arabic medical LLMs  
- 🗂️ Build open Arabic breast cancer datasets for VQA  
- 🔊 Add Arabic voice output (TTS) for accessibility  
- 🏥 Extend to other cancers and medical conditions  

---

© 2025 BrestaTalks — Empowering Arabic healthcare through AI 💜
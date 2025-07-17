
# 🩺 BrestaTalks – Multimodal Arabic Medical Chatbot for Breast Cancer Support

BrestaTalks is an advanced multimodal medical chatbot built to support Arabic-speaking users through their breast cancer journey. It combines Natural Language Processing (NLP), Visual Question Answering (VQA), voice input, and machine translation, enabling users to interact using text, images, and voice — all in Arabic.

🧠 Think of it as ChatGPT for breast cancer that understands and explains Arabic medical questions and medical images like mammograms — with multilingual model integration for real-world impact.

---

### 🚀 Key Features


🗣️ Arabic Language Support – Right-to-left layout, proper localization, and medical terminology

💬 Text + Voice Chat – Users can ask medical questions via text or Arabic speech input

🖼️ Medical Image Understanding (VQA) – Ask questions about uploaded images (e.g., mammograms)

🌍 Translation Layer – Arabic↔English pipeline for medical image Q&A

🤖 AI-Powered Answers – Using powerful open-source LLMs and visual models

🧘‍♀️ Emotional Support – Compassionate and culturally-aware chatbot responses

📱 Mobile-Friendly – Fully responsive UI with dark mode support

☁️ Cloud Ready – Frontend deployed on Vercel, backend prepared for cloud/NGROK



## 🧠 Underlying AI Models

| Input Type | Task                       | Model Used                            |
|------------|----------------------------|----------------------------------------|
| 📝 Text     | Arabic Q&A                 | Aya LLM (Arabic medical model)         |
| 🔊 Voice    | Speech-to-Text             | Whisper (for Arabic voice recognition) |
| 📊 Embedding| Semantic Search / Retrieval| multilingual-e5-large                  |
| 🖼️ Image    | Visual Q&A                 | MedGEMMA                                |
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

## 🚀 How to Run This Locally

### Step 1: Prerequisites

Make sure you have installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**

### Step 2: Download the Project

1. **Download the code** from the v0 interface (click "Download Code" button)
2. **Extract the files** to a folder on your computer

### Step 3: Install Dependencies

Open terminal/command prompt in the project folder and run:

```bash
npm install
```

### Step 4: Set Up Environment Variables

Create a `.env.local` file in the root directory with:

```plaintext
NEXT_PUBLIC_BACKEND_URL=https://6aa3-34-141-200-111.ngrok-free.app
```

*(Replace with your actual ngrok URL)*

### Step 5: Run the Development Server

```bash
npm run dev
```

### Step 6: Open in Browser

Go to: `http://localhost:3000`

---

## 📁 Your Project Structure

```plaintext
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

## 🔧 Important Notes

1. **Keep your Python backend running** on Google Colab
2. **Update the ngrok URL** in `.env.local` when it changes
3. **Restart the dev server** (`npm run dev`) after changing environment variables
4. **Run the final backend model notebook**: `final_Back_end.ipynb`

---

## 🤖 Models Used

| Task               | Model                               |
|--------------------|--------------------------------------|
| Text Embedding     | `intfloat/multilingual-e5-large`     |
| Text Generation    | `Aya` (Arabic LLM)                   |
| Image QA           | `MedGEMMA`                           |
| Translation Layer  | `Helsinki-NLP/opus-mt`               |

---

## 🧠 Future Plans

🧠 Fine-tune Arabic medical LLMs

🗂️ Build open Arabic breast cancer datasets for VQA

🔊 Add Arabic voice output (TTS) for accessibility

🏥 Extend to other cancers and medical conditions

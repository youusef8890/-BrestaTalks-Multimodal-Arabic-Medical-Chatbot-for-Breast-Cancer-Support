
# 🩺 Arabic Breast Cancer Chatbot with VQA

A full-stack intelligent assistant designed for breast cancer awareness, supporting Arabic text and image-based questions with real-time AI-generated answers.

---

## 📌 System Overview

### ✅ Arabic Q&A

- Multilingual-E5-Large embedding model for understanding questions
- Arabic LLM model: **Aya** for generating text responses
- Real-time question answering in Arabic
- Backend powered by FastAPI

### ✅ Visual Question Answering (VQA)

- Upload medical images (e.g., mammograms)
- Image + Arabic question sent to **MedGEMMA** model
- Translation Layer with **Helsinki-NLP/opus-mt** to return the answer in Arabic

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

## 🧠 Features

- Real-time Arabic chatbot for breast cancer
- Visual question answering from medical images
- Translation between English/Arabic for answers
- Secure API with FastAPI backend

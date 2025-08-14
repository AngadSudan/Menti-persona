# PERSONA BASED CHATBOT

This is a Next.js application that includes a chat interface, API routes, and supporting components For PERSONA BASED AI RAG CHATBOT.

Project Live at - [Deployemnt link](https://menti-persona.vercel.app/)

## 📂 Project Structure

```
src/
    app/
        (api)/generate/route.ts # API endpoint
        favicon.ico
        globals.css # Global styles
        layout.tsx # Layout wrapper
        page.tsx # Main page
    components/
        Chat.tsx # Chat UI component
        MessageBox.tsx # Message display component
        PromptBar.tsx # Input bar for prompts
    lib/
    prompt.ts # Helper storage for prompts

```

Other important files:

- `next.config.ts` – Next.js configuration
- `postcss.config.mjs` – PostCSS configuration
- `tsconfig.json` – TypeScript configuration
- `.env` – Environment variables (not committed)
- `package.json` – Dependencies and scripts

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
    git clone <your-repo-url>
    cd <your-repo-folder>
```

2. Install dependencies

```bash
npm install
```

3. Create environment variables
   Create a .env file in the project root and add your variables:

```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server

```bash

npm run dev
```

The app will be available at http://localhost:3000.

5. Build for production

```bash
npm run build
npm start
```

🛠 Technologies Used
Next.js – React framework

TypeScript – Typed JavaScript

PostCSS – CSS processing

API routes for server-side logic

📜 License
This project is licensed under the MIT License.

---

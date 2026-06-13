import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI scheme updates (using search grounding)
  app.post("/api/ai/sync-schemes", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "GEMINI_API_KEY is not configured in Secrets." });
      }

      console.log("Synchronizing schemes with Google Search Grounding through Gemini...");

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Find 3 actual government schemes introduced in India during 2024-2026 that are highly popular or beneficial (e.g., PM Surya Ghar Muft Bijli Yojana, PM Vishwakarma, Lakhpati Didi, or similar central/state initiatives). For each scheme, retrieve active operational details. Format the exact output as a valid JSON array of Scheme objects (no trailing commas, no markdown wrapping, just the array). Each object must match this Scheme interface:\n\n{\n  id: string; // alphanumeric identifier like 'pm-surya-ghar'\n  name: string; // English name\n  sponsor: string; // Ministry or department\n  category: 'Agriculture' | 'Health' | 'Education' | 'Housing' | 'Women' | 'Finance';\n  description: string;\n  image: string; // use a clean uncompressed placeholder image like 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600' or appropriate topic-related direct free image\n  benefits: string; // benefits in detail\n  benefitsLabel: string; // short summary like '₹78,000 subsidy' or similar\n  timelineLabel: string; // e.g. 'Ongoing'\n  deadline?: string;\n  eligibilityCriteria: { minAge?: number; maxAge?: number; maxIncome?: number; allowedStates?: string[]; allowedOccupations?: string[]; gender?: 'All' | 'Female' | 'Male' };\n  keyPoints: string[]; // 3-4 strings detailing benefits/process\n  documentsRequired: string[];\n  tags: string[];\n  hiName?: string; // Hindi name\n  hiSponsor?: string;\n  hiDescription?: string;\n  hiBenefits?: string;\n  hiBenefitsLabel?: string;\n  hiTimelineLabel?: string;\n  hiKeyPoints?: string[];\n  hiDocumentsRequired?: string[];\n  taName?: string; // Tamil name\n  taSponsor?: string;\n  taDescription?: string;\n  taBenefits?: string;\n  taBenefitsLabel?: string;\n  taTimelineLabel?: string;\n  taKeyPoints?: string[];\n  taDocumentsRequired?: string[];\n}",
        config: {
          systemInstruction: "You are an AI assistant and research lead at SarkariYojana. Using Google Search, find real schemes launched in India in 2024-2026. Translate strings to Hindi (hi) and Tamil (ta). Output ONLY the clean JSON array. Do not put markdown codes fences like ```json, just start with [ and end with ].",
          tools: [{ googleSearch: {} }],
        }
      });

      let responseText = response.text || "";
      console.log("Raw Gemini response received. Parsing...");

      let cleanJson = responseText.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.substring(7);
      } else if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.substring(3);
      }
      if (cleanJson.endsWith("```")) {
        cleanJson = cleanJson.substring(0, cleanJson.length - 3);
      }
      cleanJson = cleanJson.trim();

      try {
        const schemes = JSON.parse(cleanJson);
        res.json({ schemes });
      } catch (parseErr) {
        console.error("Failed to parse clean JSON. Trying fallback parsing with regex on raw response...", parseErr);
        // Clean markdown backticks and attempt parsing
        const match = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (match) {
          const schemes = JSON.parse(match[0]);
          res.json({ schemes });
        } else {
          throw new Error("Could not parse scheme list from model output.");
        }
      }
    } catch (err: any) {
      console.error("AI Sync Error:", err);
      res.status(500).json({ error: err.message || "An error occurred during AI synchronization." });
    }
  });

  // API Route for Sudar Ramesh's AI Digital Twin Twin Chat
  app.post("/api/ai/chat-bot", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "GEMINI_API_KEY is not configured in Secrets." });
      }

      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
      }

      console.log("Processing chat message for Sudar Ramesh's AI Digital Twin...");

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare contents in the format standard for generateContent
      // Map basic { role, content } messages from client to Gemini contents format
      const safetyPrompt = `You are the AI Digital Twin of Sudar Ramesh - an exceptionally talented AI Engineer, Software Developer, and Data Analytics Specialist. 
Your goal is to converse with prospective clients, recruiters, and visitors on Sudar's portfolio web application. 
Speak in first-person ("I", "my") as Sudar himself (or explicitly as Sudar's Digital AI Double) in a highly professional, confident, technical, and warm tone. 

Here are the absolute facts about Sudar Ramesh that you must use to answer questions. NEVER hallucinate or invent conflicting details:
1. Contact Details:
   - Name: Sudar Ramesh
   - Email: sudarramesh541@gmail.com
   - Phone: +91 7604882003
   - Physical Address: 27/2, Amman Kovil Street, Dalpathi Samuthiram Meloor, 627101, Tirunelveli / Kanyakumari, Tamil Nadu, India.
2. Online Profiles & Connections:
   - Naukri Profile: https://naukri.com/Sudar Ramesh
   - GitHub: https://github.com/Sudarramesh
   - LinkedIn: https://linkedin.com/in/Sudar Ramesh
   - Instagram: @Sudar_ramesh
3. Professional Profile Summary:
   - High-performance, motivated AI Engineer & Software Developer with a robust background in Data Analytics.
   - Excel in designing, developing, and deploying intelligent software, dashboard architectures, predictive analytics models, and robust end-to-end full-stack systems.
   - Deeply eager to collaborate, bring hands-on expertise in Machine Learning, Deep Learning, and clean software writing to impactful enterprise environments.
4. Core Tech Stack & Skills:
   - High competency fields: Full Stack Development, Data Analytics, Machine Learning, Deep Learning, SQL database management, power business dashboards.
   - Languages & Frameworks: Python, C++, SQL, Java, Node.js (Express), React, TypeScript, Tailwind CSS, Vite, esbuild, and modern cloud deployment systems.
   - Key Analytics Tools: Power BI, Excel, D3.js, Recharts, and Google Search Grounding / LLM interactions.
5. Work & Professional Experience:
   - Entudio Pvt. Ltd. (Data Analytics Intern, Tirunelveli, June 2025 - June 2025):
     * Cleaned, organized, and formulated complex relational business datasets.
     * Engineered high-contrast interactive sales & business performance dashboards in Power BI.
     * Utilized refined data transformation systems to generate actionable insights and make operational metrics understandable for senior business stakeholders.
   - Novitech Pvt Limited (AI & Full Stack Masterclass Intern, Coimbatore, 2025):
     * Specialized in AI, Deep Learning, Machine Learning, Data Analytics, and Full Stack Development.
     * Formulated Neural Network models, data cleaning modules, and client-side system layouts.
6. Education background:
   - B.Tech in Artificial Intelligence And Data Science (Rohini College of Engineering and Technology, Palkulam, Kanyakumari, Graduating Class of 2026).
   - Solid foundation in Artificial Intelligence, Deep Learning models, Advanced Machine Learning algorithms, Network Security protocols, and database schemas.
7. Key Achievements:
   - Secured 3rd Place with a Rs. 1,000 cash prize at a National Level Technical Symposium (Sivanthi Adhithanar College of Engineering, Tiruchendur) for an outstanding Technical Paper Presentation.
   - Track Star & Sportsman: Won 1st Place for 3 consecutive times in 1500m Running, and is a passionate local Kabaddi team league competitor representing his native Sports Association.
   - Completed the N-Queen Puzzle visualizer and and mathematical formulations.
8. Co-Curricular & Community Leadership:
   - Event Coordinator (AIDS Symposium, Oct 2025): Championed the Technical Events segment, including an AI Chatbot Creation event (interactive Chatbots / AI programs) and general Tech Trivia Quiz. Helped classmates build motivation to code.
   - Volunteer Mentor (VKV Association, Feb 2020 - Apr 2021, Vallioor): Maintained school campus discipline, mentored juniors, and helped promote spoken English fluency and confidence within his alma mater.
9. Personal Attributes:
   - Date of Birth: October 16, 2005
   - Nationality: Indian
   - Primary Languages Spoken: English, Tamil, Hindi
   - Core Hobbies: Farming, Cricket, Kabaddi league, Reading literature & story books, and keeping updated with recent global technology news.

CONVERSATION GUIDELINES:
- Keep responses relatively concise, scannable, and engaging.
- Use elegant formatting like bullet points when listing skills or experiences.
- Be extremely polite, technical, and welcoming. Ask visitors about their projects, hiring requirements, or specific questions about Sudar's backgrounds.
- If they ask to contact/hire Sudar, present his email (sudarramesh541@gmail.com) and (+91 7604882003) proudly.
- If asked about the Sarkari Welfare Portal project, explain that Sudar built a fully live, search-grounded welfare yojana finder utilizing React and Gemini AI to search and sync schemes from official portals in real-time, which is embedded inside his portfolio!`;

      // Map last 10 messages for context
      const chatContents = messages.slice(-10).map((msg: any) => {
        return {
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction: safetyPrompt,
          temperature: 0.7,
        }
      });

      res.json({ message: response.text || "I'm sorry, I couldn't process that response right now." });
    } catch (err: any) {
      console.error("AI Twin Bot Error:", err);
      res.status(500).json({ error: err.message || "An error occurred with the AI Double Bot." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

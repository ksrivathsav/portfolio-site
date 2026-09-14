// ──────────────────────────────────────────────────────────
//  api/chat.js  — Vercel Serverless Function
//  Secured: rate limiting · input validation · token capping
//  Scalable: edge-compatible, max 40-turn context window
// ──────────────────────────────────────────────────────────
import OpenAI from "openai";
import { applyRateLimit }  from "./middleware/rateLimit.js";
import { validateChat, sanitize } from "./middleware/validate.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ── Srivathsav's full context ── */
const SYSTEM_PROMPT = `You are Srivathsav Kommineni, a Full Stack Software Engineer. You are chatting with visitors on your personal portfolio website. Answer as yourself — in first person, professionally, warmly, and with technical depth. Keep replies concise (2-4 short paragraphs max). If you genuinely don't know something, say so naturally.

== ABOUT ME ==
Name: Srivathsav Kommineni | Title: Full Stack Developer | Location: United States
Email: srivathsavkommineni@gmail.com | GitHub: github.com/ksrivathsav | LinkedIn: linkedin.com/in/srivathsav-kommineni
Bio: Passionate full-stack developer building clean, performant web apps and AI-powered features — RAG pipelines, LLM integrations, distributed systems. I thrive turning complex problems into intuitive user experiences.

== WORK EXPERIENCE ==
1. FINRA — Full Stack Engineer (Jun 2026–Present, Rockville MD): Spring Boot microservices, AWS (SNS/SQS/Kinesis/Kafka), Angular, PostgreSQL, Maven/Docker/Jenkins on EKS/ECS.
2. University of Florida — Software Engineer (Aug 2025–May 2026, Gainesville FL): FastAPI+PostgreSQL infrastructure portal, AWS EKS+Terraform ML pipelines, LangChain+OpenAI LLM support assistants, 27% utilization gain.
3. University of Florida — Student Research Assistant (Feb–Aug 2025): Python/OpenCV/DLib video pipeline (500K+ frames), PyTorch CNN deception detection (87% accuracy), presented at NVIDIA AI Conference.
4. Teradata — Software Engineer (Jan–Dec 2023, Hyderabad): Spring Boot microservices, Angular dashboards, Kafka pipelines, gRPC (−34% latency), Azure DevOps CI/CD, Python script migration.

== EDUCATION ==
- M.S. Computer & Information Sciences, University of Florida (2024–2025), GPA 3.74/4.0
- B.Tech Computer Science, JNTUH (2019–2023), GPA 8.28/10.0

== KEY SKILLS ==
Frontend: React, Angular, Vue, Next.js, TypeScript, Redux, Tailwind
Backend: Node.js, Java/Spring Boot, Python, FastAPI, Django, REST, gRPC, Kafka, Microservices
AI/ML: PyTorch, TensorFlow, LangChain, LangGraph, OpenAI API, RAG, LLMs, Hugging Face, FAISS, QdrantDB, CUDA, MLflow
Databases: PostgreSQL, MySQL, MongoDB, Redis, DynamoDB
Cloud/DevOps: AWS, Azure, Docker, Kubernetes, Terraform, GitHub Actions

== FEATURED PROJECTS ==
- PDF Chat AI: RAG over PDFs — LangChain, OpenAI, QdrantDB, React
- Smart Resume Analyzer: SpaCy NLP, FastAPI, Docker, TypeScript
- Bird vs Drone Classifier: ResNet-50, 92.6% accuracy, PyTorch
- Protein Function Prediction: ProtT5 embeddings, TensorFlow, CAFA5
- Pascal→LLVM Compiler: Java, ANTLR4

== RESPONSE STYLE ==
Speak in first person. Be enthusiastic about AI/ML and system design. For salary questions, say you're open to discussing based on role. Keep answers concise. Suggest portfolio sections when relevant. Never fabricate experience or skills not listed above.`;

export default async function handler(req, res) {
  /* ── CORS ── */
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  /* ── Rate limiting ── */
  if (applyRateLimit(req, res, "chat")) return;

  /* ── Input validation ── */
  const body = req.body ?? {};
  const { valid, error } = validateChat(body);
  if (!valid) return res.status(400).json({ error });

  /* ── Sanitize + cap messages ── */
  const sanitized = body.messages
    .slice(-40)
    .map((m) => ({ role: m.role, content: sanitize(m.content) }))
    .filter((m) => m.role === "user" || m.role === "assistant"); // strip injected system msgs

  /* ── OpenAI call ── */
  try {
    const completion = await openai.chat.completions.create({
      model:       "gpt-4o-mini",
      messages:    [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
      max_tokens:  450,
      temperature: 0.72,
    });

    const reply = completion.choices[0]?.message?.content
      ?? "I couldn't generate a response right now — please try again.";

    return res.status(200).json({
      reply,
      usage: completion.usage, // token usage for observability
    });

  } catch (err) {
    console.error("[api/chat] OpenAI error:", err.status, err.message);

    /* Graceful degradation by error type */
    if (err.status === 429) {
      return res.status(503).json({ error: "AI service is busy. Please try again in a moment." });
    }
    if (err.status === 401) {
      return res.status(500).json({ error: "AI service configuration error." });
    }
    return res.status(500).json({ error: "AI service temporarily unavailable." });
  }
}

// ─────────────────────────────────────────────────────────
//  portfolioData.js
//  Centralised data for the portfolio — update this file
//  to customise your personal information.
// ─────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Srivathsav Kommineni",
  title: "Full Stack Developer",
  tagline: "Building scalable, elegant solutions at the intersection of engineering and design.",
  bio: "I'm a passionate full-stack developer who builds clean, performant web applications and AI-powered features - from RAG pipelines to LLM integrations. I thrive in collaborative environments and enjoy turning complex problems into intuitive user experiences.",
  email: "srivathsavkommineni@gmail.com",
  github: "https://github.com/ksrivathsav",
  linkedin: "https://www.linkedin.com/in/srivathsav-kommineni/",
  location: "United States",
};

// ─── Work Experience ────────────────────────────────────
export const experiences = [
  {
    id: 1,
    company: "University of Florida",
    role: "Software Engineer",
    duration: "August 2025 – Present",
    location: "Hybrid",
    logo: "TC",
    color: "#6366f1",
    responsibilities: [
      "Architected Python microservices and CI/CD pipelines with 85% PyTest coverage, reducing deployment failures by 60% and accelerating release cadence by 30% across HPC infrastructure.",
      "Designed and deployed FastAPI-based RESTful services automating researcher onboarding, job scheduling, and GPU resource monitoring, cutting manual workflows by 30% for 1,000+ active users.",
      "Optimized ML training workloads on NVIDIA V100/A100/B200 GPU clusters via SLURM tuning, improving PyTorch and TensorFlow pipeline runtimes by 15%.",
      "Provisioned and managed AWS (EC2, S3) infrastructure, reducing environment configuration failures by 25% across distributed Linux systems.",

    ],
  },
  {
    id: 2,
    company: "University of Florida",
    role: "Graduate Student Research Assitant",
    duration: "February 2025 – December 2025",
    location: "Gainesville, FL",
    logo: "SX",
    color: "#06b6d4",
    responsibilities: [
      "Engineered automated video processing pipeline (Python, OpenCV, AFFDEX 2.0) processing 500,000+ frames for an NSF-funded study, reducing manual annotation effort by 95%.",
      "Trained CNN-based deception detection model in PyTorch on multimodal features (FAUs, gaze, micro-expressions), achieving 97% classification accuracy.",
      "Built complete ML pipeline with DVC versioning and MLflow/Weights & Biases tracking in Kubernetes environments; presented AI research at NVIDIA AI Conference to 200+ attendees.",
    ],
  },
  {
    id: 3,
    company: "Teradata",
    role: "Software Engineer",
    duration: "Janaury 2023 – December 2023",
    location: "India",
    logo: "IL",
    color: "#f59e0b",
    responsibilities: [
      "Developed full-stack features using React.js (component-driven UI) and Java (Spring Boot with Hibernate/JPA for ORM and efficient DB transactions) for an enterprise platform serving 1M+ concurrent users.",
      "Implemented Cucumber-based BDD automation test suites alongside CI/CD pipelines with xUnit, increasing test coverage by 25% and accelerating release velocity, maintaining 99.9% production uptime.",
      "Built Python deployment automation framework with idempotent install, upgrade, and rollback support, improving deployment reliability by 15%.",
    ],
  },
];

// ─── Education ──────────────────────────────────────────
export const education = [
  {
    id: 1,
    degree: "Master of Science in Computer and Information Sciences",
    institution: "University of Florida",
    year: "2024 – 2025",
    highlights: [
      "Major: Computer and Information Sciences ",
      "GPA: 3.74 / 4.0",
    ],
    logo: "UF",
    color: "#6366f1",
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Computer Science",
    institution: "Jawaharlal Nehru Technological University, Hyderabad",
    year: "2019 – 2023",
    highlights: [
      "Major: Computer Science & Engineering",
      "GPA: 8.28/ 10.0",
      "Placement Coordinator, JNTUH Placement Cell",
      "Cloud Computing & Technical Team Member, Google Developer Students Clubs (GDSC), JNTUH",
    ],
    logo: "JNTUH",
    color: "#06b6d4",
  },
];

// ─── Projects ───────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "PDF Chat  AI ",
    description: "An AI-powered RAG system over PDFs and structured documents, chunking and embedding content with LangChain, storing vectors in QdrantDB, and enabling contextual retrieval to improve answer accuracy.",
    tech: ["React", "TypeScript", "Vite", "OpenAI API", "QdrantDB", "LangChain", "Tailwind CSS", "pdfjs-dist"],
    github: "https://github.com/ksrivathsav/Pdf-Chat-Ai",
    featured: true,
    gradient: "from-indigo-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Alumni Tracking System",
    description: "A full-stack web platform for tracking and managing alumni data — featuring dynamic server-side rendered views with EJS, RESTful backend APIs with Node.js and Express, and MongoDB for persistent data storage.",
    tech: ["Node.js", "Express", "EJS", "MongoDB", "JavaScript", "CSS", "Mailchimp API"],
    github: "https://github.com/ksrivathsav/alumni-tracking-system",
    featured: false,
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: 3,
    title: "Pascal to LLVM Compiler",
    description: "A multi-stage compiler that translates a Pascal/Delphi language subset into LLVM Intermediate Representation (IR) — implementing lexing, parsing via ANTLR4, semantic analysis, and IR code generation with support for arithmetic, conditionals, and loops.",
    tech: ["Java", "ANTLR4", "LLVM IR"],
    github: "https://github.com/ksrivathsav/Delphi_compiler",
    featured: false,
    gradient: "from-orange-500 to-rose-500",
  },
  {
    id: 4,
    title: "Bird vs Drone Classification",
    description: "A deep learning classifier that distinguishes birds from drones in aerial imagery using transfer learning on ResNet-50, achieving 92.6% validation accuracy.",
    tech: ["Python", "PyTorch", "ResNet-50", "OpenCV", "NumPy", "Matplotlib"],
    github: "https://github.com/ksrivathsav/bird_vs_drone_image_classfier",
    featured: true,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 5,
    title: "Smart Resume Analyzer",
    description: "A full-stack web application that analyzes resumes against job descriptions using SpaCy NLP — providing intelligent skill matching scores, missing skill recommendations, and domain suggestions via a FastAPI backend and a Dockerized CI/CD deployment pipeline.",
    tech: ["React.js", "TypeScript", "Vite", "TailwindCSS", "FastAPI", "SpaCy", "Docker", "GitHub Actions"],
    github: "https://github.com/ksrivathsav/Resume_Analyzer",
    featured: false,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: 6,
    title: "Software Quality Prediction Dashboard ",
    description: "Built ML classification system with interactive Flask visualization dashboard translating complex model outputs into clear, actionable insights for non-technical stakeholders.",
    tech: ["Python", "XGBoost", "Scikit-learn", "Flask", "Seaborn"],
    github: "https://github.com/ksrivathsav/",
    featured: false,
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: 7,
    title: "Peer-to-Peer Chat Application",
    description: "A multithreaded peer-to-peer chat application built in Java that enables real-time messaging and file transfer between users over a network using TCP sockets with chunked file handling.",
    tech: ["Java", "Multithreading", "Socket Programming"],
    github: "https://github.com/ksrivathsav/chatbot_cn",
    featured: false,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 8,
    title: "Protein Function Prediction",
    description: "A multi-label classification model that predicts 5,000+ biological protein functions from amino acid sequences using fine-tuned ProtT5 transformer embeddings, trained on the CAFA 5 dataset with binary cross-entropy loss, achieving strong AUC performance on a V100 GPU",
    tech: ["Python", "TensorFlow", "ProtT5", "CAFA 5 Dataset", "Kaggle"],
    github: "https://github.com/ksrivathsav/Amino_Acid_Seq_Func_Prediction",
    featured: false,
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: 9,
    title: "Abstractive Text Summarizer",
    description: "An NLP-powered web application that generates concise, human-like abstractive summaries from long-form text using a pre-trained transformer model, deployed as a live interactive app via Anvil.",
    tech: ["Python", "Hugging Face Transformers", "Jupyter Notebook", "Anvil", "HTML/CSS"],
    github: "https://github.com/ksrivathsav/Abstractive-Text-Summarizer",
    featured: false,
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: 10,
    title: "Banking System",
    description: "A full-stack banking web application supporting core banking operations like account management and transactions, built with a PHP backend, MySQL database, and a responsive HTML/CSS/JS frontend.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/ksrivathsav/bank",
    featured: false,
    gradient: "from-amber-500 to-yellow-400",
  },


];

// ─── Skills ─────────────────────────────────────────────
export const skillCategories = [
  {
    label: "Frontend",
    icon: "🎨",
    skills: ["React.js", "Angular.js", "Vue.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Web Design"],
  },
  {
    label: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Java", "Spring Boot", "Python", "FastAPI", "GraphQL", "REST APIs", "Web Sockets", "Flask", "Express.js"],
  },
  {
    label: "Artificial Intelligence and Machine Learning",
    icon: "",
    skills: ["Pandas", "NumPy", "Scikit-learn", "PyTorch", "TensorFlow", "hugging face transformers", "CNNs", "Vision Transformers", "LLMs", "Generative AI", "RAG", "LangChain", "QdrantDB", "LangGraph", "Fine-tuning", "Transfer Learning", "OpenCV", "ONNX", "MLflow", "DVC", "Weights & Biases "],
  },
  {
    label: "Databases",
    icon: "🗄️",
    skills: ["PostgreSQL", "MySQL", "NoSQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    icon: "☁️",
    skills: ["AWS", "CI/CD", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "SLURM"],
  },
  {
    label: " Core & Tools & Practices",
    icon: "🛠️",
    skills: ["Python", "Java", "C", "C++", "C#", "Bash", "Shell Scripting", "Git", "Jira", "Figma", "Jest", "Cucumber", "xUnit", "Linux", "Agile / Scrum"],
  },
];

// ─── Nav Links ──────────────────────────────────────────
export const navLinks = [
  { label: "Home", to: "hero" },
  { label: "Experience", to: "experience" },
  { label: "Education", to: "education" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
];

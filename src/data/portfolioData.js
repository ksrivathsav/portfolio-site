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
    company: "FINRA",
    role: "Full Stack Engineer",
    duration: "Jun 2026 – Present",
    location: "Rockville, MD",
    logo: "FINRA",
    logoUrl: "logos/finra.png",
    color: "#233E66",
    responsibilities: [
      "Contributing to Spring Boot microservices for FINRA's enterprise messaging platform, supporting reliable, guaranteed-delivery event exchange across 12+ application teams.",
      "Working with the platform's pub/sub and messaging architecture (AWS SNS, SQS, Kinesis, Apache Kafka, Apache Camel, AWS SES), supporting standardized event distribution and notification delivery across application teams — partnering with cross-functional teams to understand integration requirements.",
      "Supporting self-service onboarding tooling (Angular, PostgreSQL-backed configuration, AWS Lambda with provisioned concurrency, S3, RDS) used by application teams to integrate with the messaging platform independently.",
      "Working within CI/CD pipelines (Maven, Docker, Jenkins) deploying services across AWS EKS and ECS Fargate, gaining exposure to container orchestration and deployment strategies across the platform.",
      "Ramping up on operational monitoring using AWS CloudWatch and Splunk, supporting message queue throughput tracking, delivery health checks, and incident diagnosis.",
      "Exploring Kiro and other internal AI-assisted development tools to support day-to-day microservice development and code review.",
      "Writing integration & unit tests for messaging platform microservices, validating event delivery paths across service boundaries.",
    ],
  },
  {
    id: 2,
    company: "University of Florida",
    role: "Software Engineer",
    duration: "Aug 2025 – May 2026",
    location: "Gainesville, FL",
    logo: "UF",
    logoUrl: "logos/uf.png",
    color: "#0021A5",
    responsibilities: [
      "Designed and built a full-stack infrastructure portal (FastAPI, PostgreSQL, SQLAlchemy, Angular UI) enabling self-service researcher onboarding and GPU environment management across shared clusters, deployed on Linux-based compute nodes.",
      "Provisioned ML training environments on AWS EKS using Docker and Terraform, managing containerized distributed training workloads and improving infrastructure utilization by 27%.",
      "Tuned SLURM scheduling policies and GPU allocation controls — partition configuration, job priority weighting, resource limits — reducing contention across concurrent research workloads and increasing batch-processing throughput by 24%.",
      "Standardized GPU-enabled research environments by automating dependency installation for CUDA, OpenCV, PyTorch, and TensorFlow across Linux compute nodes, cutting researcher setup effort and improving environment consistency.",
      "Built CI/CD pipelines with GitHub Actions and PyTest, validating API endpoints with Postman before deployment to catch regressions and improve platform reliability.",
      "Built LLM-powered support assistants (LangChain, OpenAI API) using retrieval-augmented responses, integrated into researcher support workflows to help researchers self-resolve GPU and environment configuration issues faster.",
    ],
  },
  {
    id: 3,
    company: "University of Florida",
    role: "Student Research Assistant",
    duration: "Feb 2025 – Aug 2025",
    location: "Gainesville, FL",
    logo: "UF",
    logoUrl: "logos/uf.png",
    color: "#FA4616",
    responsibilities: [
      "Built an end-to-end video-processing pipeline (Python, OpenCV, DLib, AFFDEX 2.0, OpenFace, Py-Feat) extracting facial action units, gaze, and head pose across 500,000+ video frames, encompassing multimodal facial feature representations for training.",
      "Designed and trained CNN-based deception detection models in PyTorch, using Scikit-learn for baseline model comparison and evaluation metrics, tracking experiments with MLflow, versioning datasets with DVC, iterating on architecture and hyperparameters through systematic experimentation to achieve 87% prediction accuracy.",
      "Presented AI-driven behavioral analysis research, including the video-processing pipeline and deep learning methodology, at the NVIDIA AI Conference at the University of Florida to academic and industry audiences.",
    ],
  },
  {
    id: 4,
    company: "Teradata",
    role: "Software Engineer",
    duration: "Jan 2023 – Dec 2023",
    location: "Hyderabad, India",
    logo: "TD",
    logoUrl: "logos/teradata.png",
    color: "#F37440",
    responsibilities: [
      "Built Spring Boot microservices for enterprise data operations, handling validation, transformation, and synchronization of operational records across distributed organizational systems, with structured error handling and retry logic for data consistency.",
      "Built Angular dashboards integrated with Java REST APIs, giving operational teams centralized visibility into processing exceptions and reducing manual reconciliation activities by 26%.",
      "Designed Kafka-driven event exchanges between platform services — including topic partitioning and consumer group design — improving data synchronization reliability and reducing processing bottlenecks during peak operational cycles.",
      "Implemented gRPC communication patterns across distributed application components, using protocol buffers for schema-driven contracts, reducing service response latency by 34% under increasing transaction volumes.",
      "Automated release verification and deployment workflows through Azure DevOps pipelines, accelerating software delivery and minimizing manual validation effort across environments.",
      "Migrated legacy Perl-based install, update, migration, and backout (IUMB) automation scripts to Python, modernizing deployment lifecycle tooling and improving maintainability across environments.",
      "Optimized Azure SQL data models and query execution plans (indexing strategy, query restructuring) to decrease reporting retrieval times, supporting enterprise operational analytics and governance requirements.",
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
      "Major: Computer and Information Sciences",
      "GPA: 3.74 / 4.0",
    ],
    logo: "UF",
    logoUrl: "logos/uf_seal.png",
    color: "#0021A5",
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Computer Science",
    institution: "Jawaharlal Nehru Technological University, Hyderabad",
    year: "2019 – 2023",
    highlights: [
      "Major: Computer Science & Engineering",
      "GPA: 8.28 / 10.0",
      "Placement Coordinator, JNTUH Placement Cell",
      "Cloud Computing & Technical Team Member, Google Developer Students Clubs (GDSC), JNTUH",
    ],
    logo: "JNTUH",
    logoUrl: "logos/jntuh.png",
    color: "#7B1D1D",
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
    skills: ["React.js", "Angular", "Vue.js", "Next.js", "TypeScript", "JavaScript", "Redux", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Responsive Web Design"],
  },
  {
    label: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Java", "Spring Boot", "Python", "FastAPI", "Django", "Flask", "Express.js", "REST APIs", "GraphQL", "gRPC", "WebSockets", "Microservices", "Apache Kafka"],
  },
  {
    label: "Artificial Intelligence and Machine Learning",
    icon: "",
    skills: ["Pandas", "NumPy", "Scikit-learn", "PyTorch", "TensorFlow", "Hugging Face Transformers", "CNNs", "Vision Transformers", "LLMs", "Generative AI", "RAG", "Graph RAG", "LangChain", "LangGraph", "OpenAI API", "FAISS", "QdrantDB", "CUDA", "NLP", "SpaCy", "OpenCV", "Fine-tuning", "Transfer Learning", "ONNX", "MLflow", "DVC", "Weights & Biases"],
  },
  {
    label: "Databases",
    icon: "🗄️",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra", "DynamoDB", "SQLAlchemy", "NoSQL"],
  },
  {
    label: "Cloud & DevOps",
    icon: "☁️",
    skills: ["AWS", "Microsoft Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "Nginx", "SLURM"],
  },
  {
    label: "Core & Tools & Practices",
    icon: "🛠️",
    skills: ["Python", "Java", "C", "C++", "C#", "SQL", "Bash", "Shell Scripting", "Git", "PyTest", "Jest", "OAuth 2.0", "JWT", "Prometheus", "Jira", "Figma", "Cucumber", "xUnit", "Linux", "Agile / Scrum"],
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

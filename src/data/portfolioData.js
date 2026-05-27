// ─────────────────────────────────────────────────────────
//  PORTFOLIO DATA  —  edit this file to update all content
// ─────────────────────────────────────────────────────────

export const personal = {
  fullName:    'Md. Nazimuddin Alam Thepo',
  shortName:   'Nazimuddin',
  nickname:    'Thepo',
  title:       'Frontend Developer & ML Researcher',
  subtitle:    'Building elegant web experiences. Exploring intelligence through code.',
  email:       'mahialamdipu2003@gmail.com',
  phone:       '+880 1836 739301',
  location:    'Dhaka, Bangladesh',
  university:  'RUET — Rajshahi University of Engineering & Technology',
  linkedin:    'https://linkedin.com/in/your-linkedin',
  github:      'https://github.com/NazimUddinAlamThepo',
  whatsapp:    'https://wa.me/8801836739301',

  // Hero CTA
  heroTagline: 'Crafting the future, one commit at a time.',
  about: `I'm a Computer Science & Engineering undergraduate at RUET with a deep passion for 
frontend development and artificial intelligence. I build full-stack web applications using 
the React ecosystem and explore deep learning architectures — currently studying LSTM networks 
and building RAG-based AI systems. I believe in learning through building, and I'm always 
working on something new.`,
}

export const skills = {
  frontend: ['React.js', 'JavaScript', 'Tailwind CSS', 'React Router', 'TanStack Query', 'Axios', 'HTML5', 'CSS3'],
  backend:  ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'JWT', 'REST APIs', 'ASP.NET'],
  ml: [
    { name: 'LSTM',            active: true },
    { name: 'RAG',             active: true },
    { name: 'PyTorch',         active: false },
    { name: 'TensorFlow',      active: false },
    { name: 'Scikit-learn',    active: false },
    { name: 'LangChain',       active: false },
    { name: 'HuggingFace',     active: false },
    { name: 'FAISS',           active: false },
    { name: 'ChromaDB',        active: false },
    { name: 'Pandas',          active: false },
    { name: 'NumPy',           active: false },
    { name: 'Transformers',    active: false },
  ],
  tools: ['Git', 'GitHub', 'VS Code', 'Vercel', 'npm', 'Postman', 'Figma'],
  certifications: [
    { name: 'Machine Learning Specialization', issuer: 'Coursera', year: '2023' },
    { name: 'Advanced Machine Learning',       issuer: 'Coursera', year: '2024' },
  ],
}

export const projects = [
  {
    id:       1,
    title:    'RAG-Based Question Answering System',
    category: 'AI / ML',
    color:    'forest',
    badge:    'AI Research',
    tech:     ['Python', 'LangChain', 'FAISS', 'ChromaDB', 'OpenAI', 'HuggingFace', 'Streamlit'],
    description: 'A Retrieval-Augmented Generation pipeline integrating a vector store with an LLM for context-aware document Q&A. Implemented chunking strategies, embedding generation, and similarity-based retrieval to ground responses in factual source material.',
    points: [
      'Designed end-to-end RAG pipeline with document ingestion and vector indexing',
      'Compared retrieval accuracy across FAISS and ChromaDB backends',
      'Evaluated hallucination reduction with multiple embedding models',
    ],
    demo:   '',
    github: 'https://github.com/NazimUddinAlamThepo',
    featured: true,
  },
  {
    id:       2,
    title:    'EduManage — E-Learning Platform',
    category: 'Full-Stack Web',
    color:    'navy',
    badge:    'Full-Stack',
    tech:     ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'JWT', 'TanStack Query', 'Tailwind CSS'],
    description: 'Full-stack e-learning platform with role-based access for Students, Teachers, and Admins. Course purchasing, assignment creation/submission, JWT-secured APIs, and server-side pagination.',
    points: [
      'Role-based access control for three user types',
      'Course purchasing and assignment submission workflows',
      'JWT authentication with protected API routes',
    ],
    demo:   'https://edumanage-f25f6.web.app',
    github: 'https://github.com/NazimUddinAlamThepo',
    featured: true,
  },
  {
    id:       3,
    title:    'CrowdFunding Platform',
    category: 'Full-Stack Web',
    color:    'navy',
    badge:    'Web App',
    tech:     ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'JWT', 'Tailwind CSS'],
    description: 'Platform for creating and managing fundraising campaigns with real-time funding progress tracking and secure authentication.',
    points: [
      'Campaign creation, management, and donation tracking',
      'Real-time funding progress and milestone indicators',
      'Secure user authentication and campaign ownership',
    ],
    demo:   'https://crowd-funding-3cd40.web.app',
    github: 'https://github.com/NazimUddinAlamThepo',
    featured: false,
  },
  {
    id:       4,
    title:    'Lostify — Lost & Found Platform',
    category: 'Full-Stack Web',
    color:    'navy',
    badge:    'Web App',
    tech:     ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'JWT'],
    description: 'A system for reporting and discovering lost or found items with advanced filtering, real-time status updates, and secure claim verification.',
    points: [
      'Advanced filtering and search for items',
      'Real-time status updates for claims',
      'Secure user verification for claim authenticity',
    ],
    demo:   'https://lositfy.web.app',
    github: 'https://github.com/NazimUddinAlamThepo',
    featured: false,
  },
  {
    id:       5,
    title:    'GameShop — ASP.NET App',
    category: 'Backend',
    color:    'navy',
    badge:    '.NET',
    tech:     ['.NET', 'ASP.NET', 'MVC', 'SQL Server'],
    description: 'Backend-focused game store application applying MVC architecture and relational database interaction.',
    points: [
      'MVC architecture with clean separation of concerns',
      'RESTful API design and SQL Server integration',
    ],
    demo:   '',
    github: 'https://github.com/NazimUddinAlamThepo/GameShop',
    featured: false,
  },
]

export const education = [
  {
    id:       1,
    degree:   'Bachelor of Science in Computer Science & Engineering',
    school:   'Rajshahi University of Engineering & Technology (RUET)',
    location: 'Rajshahi, Bangladesh',
    period:   '2022 — Present',
    status:   'Ongoing',
    icon:     '🎓',
    color:    'navy',
    highlights: [
      'Core focus on Algorithms, Data Structures, and AI/ML',
      'Active in research on deep learning and NLP',
      'Building production-grade projects alongside academics',
    ],
  },
  {
    id:       2,
    degree:   'Higher Secondary Certificate (HSC)',
    school:   'BPATC School & College',
    location: 'Dhaka, Bangladesh',
    period:   '2020 — 2022',
    status:   'Completed',
    icon:     '📘',
    color:    'forest',
    highlights: [
      'Science group with Mathematics and Physics focus',
    ],
  },
  {
    id:       3,
    degree:   'Secondary School Certificate (SSC)',
    school:   'Savar Cantonment Boys High School',
    location: 'Dhaka, Bangladesh',
    period:   '2018 — 2020',
    status:   'Completed',
    icon:     '📗',
    color:    'forest',
    highlights: [
      'Science group — strong foundation in mathematics',
    ],
  },
]

export const mlResearch = [
  {
    title:   'LSTM & Sequence Modeling',
    badge:   'Currently Studying',
    color:   'amber',
    icon:    '🧠',
    desc:    'Exploring Long Short-Term Memory networks for time-series forecasting, text generation, and sequential pattern recognition. Deep-diving into gating mechanisms, bidirectional LSTMs, and their applications in NLP.',
  },
  {
    title:   'Retrieval-Augmented Generation',
    badge:   'Project Built',
    color:   'forest',
    icon:    '🔍',
    desc:    'Practical experience building document Q&A pipelines combining dense vector retrieval with LLM generation. Proficient with chunking strategies, FAISS, ChromaDB, and embedding model comparison.',
  },
  {
    title:   'Deep Learning Foundations',
    badge:   'Coursera Certified',
    color:   'navy',
    icon:    '⚡',
    desc:    'Strong understanding of CNNs, RNNs, attention mechanisms, and transformer architectures. Completed Machine Learning and Advanced ML specializations on Coursera.',
  },
  {
    title:   'Research Interests',
    badge:   'Active Reader',
    color:   'navy',
    icon:    '📖',
    desc:    'Natural Language Processing, Generative AI, information retrieval, and applied deep learning. Regularly reading recent papers from ArXiv on LLMs, RAG, and efficient transformers.',
  },
]


export const softSkills = [
  { name: 'Research & Analytical Thinking', icon: '🔬' },
  { name: 'Problem-Solving',                icon: '🧩' },
  { name: 'Leadership & Initiative',        icon: '🚀' },
  { name: 'Continuous Learning',            icon: '📚' },
  { name: 'Self-Motivated Builder',         icon: '🏗️' },
  { name: 'Collaborative Mindset',          icon: '🤝' },
]

export const languages = [
  { name: 'Bangla', level: 'Native',        pct: 100 },
  { name: 'English', level: 'Professional', pct: 80 },
]

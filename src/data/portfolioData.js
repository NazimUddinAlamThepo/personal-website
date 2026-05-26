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

// ─────────────────────────────────────────────────────────
//  LEARNING LOG DATA  —  add new entries at the top
// ─────────────────────────────────────────────────────────

export const learningPosts = [
  {
    id: 1,
    date: '2025-05-24',
    category: 'ML / AI',
    tags: ['LSTM', 'PyTorch', 'Sequence Modeling'],
    title: 'Deep-diving into LSTM Gating Mechanisms',
    content: `Today I spent 4 hours really understanding *why* LSTM gates work the way they do — not just how to code them.

The forget gate decides what to throw away from cell state. The input gate decides what new info to store. The output gate decides what to expose as hidden state.

Key insight: the cell state is like a "conveyor belt" — information flows through with only minor linear interactions. This is what solves the vanishing gradient problem that plagued vanilla RNNs.

**What I built:** A character-level text generator in PyTorch trained on a small poetry corpus. Generated surprisingly coherent haiku-like sentences after 20 epochs.`,
    pinned: true,
  },
  {
    id: 2,
    date: '2025-05-22',
    category: 'Frontend',
    tags: ['React', 'TanStack Query', 'Caching'],
    title: 'TanStack Query staleTime vs cacheTime — finally clicked',
    content: `I kept confusing these two and today I finally have a mental model that works:

- **staleTime**: how long data is considered "fresh" — during this window, no background refetch
- **gcTime** (formerly cacheTime): how long *unused* cache entries stick around before garbage collection

Practical rule I'm adopting: for mostly-static data (user profile, config), set staleTime to 5-10 minutes. For live feeds, keep it at 0.

Also discovered that refetchOnWindowFocus is true by default — which was causing extra API calls I didn't expect in EduManage. Fixed!`,
    pinned: false,
  },
  {
    id: 3,
    date: '2025-05-20',
    category: 'DSA',
    tags: ['Graph', 'BFS', 'LeetCode'],
    title: 'BFS on a matrix — pattern that works every time',
    content: `Solved 3 LeetCode matrix BFS problems today. The pattern that eliminates bugs:

1. Push starting cell(s) into queue AND mark visited immediately
2. Use a directions array: [[-1,0],[1,0],[0,-1],[0,1]]
3. Check bounds + visited + validity before pushing (not after popping)

The mistake I kept making: marking visited when popping instead of when pushing → leads to duplicate processing and TLE.

Problems done: 994 (Rotting Oranges), 542 (01 Matrix), 1162 (As Far from Land as Possible)`,
    pinned: false,
  },
  {
    id: 4,
    date: '2025-05-17',
    category: 'ML / AI',
    tags: ['RAG', 'FAISS', 'Embeddings'],
    title: 'Chunking strategies for RAG — what actually matters',
    content: `After building my RAG Q&A system I compared 3 chunking approaches:

**Fixed-size chunking** (512 tokens, 50 overlap): fast, simple, but splits mid-sentence sometimes. Retrieval quality ~70%.

**Sentence-aware chunking**: respects sentence boundaries. Noticeably better for factual Q&A. ~82% quality.

**Semantic chunking** (using embedding similarity between adjacent sentences): best quality ~88% but 4x slower at ingestion time.

Conclusion: for production, sentence-aware chunking is the sweet spot. Semantic chunking only worth it if your corpus is small and static.`,
    pinned: false,
  },
  {
    id: 5,
    date: '2025-05-14',
    category: 'Tools',
    tags: ['Git', 'GitHub', 'Workflow'],
    title: 'Git workflow I now use for every project',
    content: `Standardizing my Git flow after messy commits on my last project:

- main — always deployable
- dev — integration branch
- feat/, fix/, refactor/ — short-lived branches

Commit message format I'm adopting: type(scope): description — e.g. feat(auth): add JWT refresh token endpoint

Biggest win: git stash + git stash pop combo when I need to quickly switch context. No more WIP commits cluttering the log.`,
    pinned: false,
  },
  {
    id: 6,
    date: '2025-05-10',
    category: 'Frontend',
    tags: ['CSS', 'Animation', 'Framer Motion'],
    title: 'CSS animations vs Framer Motion — when to use each',
    content: `Working on my portfolio redesign made me think about this properly:

**Pure CSS**: best for hover states, simple transitions, looping decorative animations (blobs, gradients). Zero JS overhead.

**Framer Motion**: best for entrance animations (scroll-triggered or mount), complex sequences, gesture-based interactions, layout transitions.

My rule: if it can be done elegantly in CSS with no JS logic, do it in CSS. Framer Motion for anything involving component lifecycle, gestures, or orchestrated sequences.

Also learned about will-change: transform — dramatically improves performance for elements that animate frequently.`,
    pinned: false,
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

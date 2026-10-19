// All portfolio text lives here. Edit this file to make the site yours.
// Anything marked TODO is a placeholder and must be replaced before you share the URL.

export interface Project {
  title: string
  summary: string
  problem: string
  solution: string
  result: string
  kind?: string // e.g. "Team project", shown as a small badge
  contributions?: string[] // exactly what YOU did on it; be specific and honest
  features?: string[] // short feature chips shown under the case study
  stack: string[]
  liveUrl?: string
  repoUrl?: string
}

export interface ExperienceItem {
  role: string
  org: string
  period: string
  points: string[]
  awards?: string[] // shown as small badges under the role
}

export interface Certification {
  title: string
  issuer: string
  issued: string // e.g. "May 2022"
  details?: string[] // optional list of included courses, shown as small chips
  wide?: boolean // spans the full width; use for cards with a long details list
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string // e.g. "Founder, Acme Inc. (Upwork client)"
}

export const profile = {
  name: 'Jayanth Reddy',
  // How to say the first name, spelled out for English readers.
  pronunciation: 'JEH-yunth',
  title: 'Full-Stack Developer',
  secondaryTitle: 'Forward Deployed Engineer', // shown next to the title in the hero
  tagline:
    'I turn business ideas into fast, reliable web products. With React, Node.js and NestJS, plus AI and agentic coding tools, I help you launch sooner and spend less on rework.',
  email: 'jayanthr525@gmail.com',
  // TODO: replace with your real profile links
  github: 'https://github.com/Jayanth-j-FSD',
  linkedin: 'https://www.linkedin.com/in/b-r-1014251a2',
  upwork: 'https://www.upwork.com/freelancers/~01a32399018c9c0dca?mp_source=share',
  location: 'India', // TODO: city, if you want it shown
}

// Shown in the animated code window in the hero. TODO: keep to your strongest 3-5 skills.
export const heroStack = ['React', 'Node.js', 'NestJS', 'PostgreSQL']

// Text wrapped in **double asterisks** is highlighted on the page.
export const about = {
  intro:
    'Full-Stack Software Developer with **4+ years** of experience building, maintaining and improving web applications with **React, Node.js, NestJS** and **PostgreSQL**.',
  body: 'I design **REST APIs**, integrate third-party services and build **e-commerce** solutions, from **Shopify** and custom checkout flows to payment integrations and webhooks. I enjoy turning business requirements into practical, maintainable software that works reliably in real-world environments.',
  stats: [
    { icon: '🗓️', value: '4+', label: 'Years of experience' },
    { icon: '🧩', value: 'Full-stack', label: 'React · Node.js · NestJS · PostgreSQL' },
    { icon: '🤖', value: 'AI-assisted', label: 'Faster delivery, carefully reviewed' },
  ],
  specialties: [
    { icon: '🔌', title: 'REST API design', text: 'Clean, well-structured APIs that are easy to consume and extend.' },
    { icon: '🛒', title: 'E-commerce', text: 'Shopify builds and custom checkout workflows.' },
    { icon: '💳', title: 'Payments & webhooks', text: 'Payment integrations and event-driven webhook handling.' },
    { icon: '🔗', title: 'Third-party integrations', text: 'Connecting external services into your application reliably.' },
  ],
  ai: {
    title: 'AI-assisted development',
    text: 'I pair hands-on engineering experience with **AI coding tools** as development partners. They help me move faster without lowering the bar.',
    points: [
      { icon: '⚡', text: 'Faster implementation' },
      { icon: '🧭', text: 'Better solutions explored' },
      { icon: '🐞', text: 'Sharper debugging' },
      { icon: '🧪', text: 'Stronger testing' },
    ],
    note: 'AI is a partner, not an autopilot. I review all generated code to keep **quality, security and reliability** high.',
  },
  goal: 'Your budget is an investment, and I treat it that way. I build the right thing the first time, so you **spend less** 💰 on **rework and delays** 📉 and launch sooner with software your customers trust. The result: **lower costs, faster delivery and more room to grow your revenue** 📈',
}

// Dedicated AI section. TODO: confirm the tool names below (and the one you called "WeNot").
export const aiSection = {
  intro:
    'AI is part of how I work every day. I use **agentic coding tools** to plan, write, test and debug faster, then review every change by hand so the result stays **secure and maintainable**.',
  capabilities: [
    { icon: '🧠', title: 'AI-based development', text: 'AI used across the whole cycle: design, implementation, debugging and testing.' },
    { icon: '🤖', title: 'Agentic coding', text: 'Working with AI agents that read the codebase and make multi-file changes, always under my review.' },
    { icon: '✨', title: 'Generative AI', text: 'Hands-on with generative AI and Python, so I can bring AI features into your product.' },
    { icon: '📈', title: 'Machine learning basics', text: 'A working foundation in machine learning, backed by AWS Academy Machine Learning Foundations.' },
    { icon: '🔌', title: 'AI inside the workflow', text: 'AI set up in the editor and daily workflow, used with proper context instead of guesswork.' },
    { icon: '🛡️', title: 'Responsible use', text: 'Generated code is reviewed for quality and security, and your data rules always come first.' },
  ],
  tools: ['Claude', 'Cursor', 'Copilot', 'ChatGPT', 'Gemini', 'Vercel'],
  forwardDeployed: {
    title: 'Forward-deployed engineering',
    text: 'I also work in a **forward-deployed** style: close to the client\'s team and their problem, turning real requirements into working solutions that fit how the business actually runs.',
  },
}

export const skills: Record<string, string[]> = {
  // TODO: only list what you can confidently discuss in an interview.
  '🎨 Frontend': ['Angular', 'React', 'TypeScript', 'JavaScript (ES2023)', 'HTML5', 'CSS3', 'Tailwind CSS'],
  '⚙️ Backend': ['Node.js', 'NestJS', 'Express', 'REST APIs', 'Python', 'Go (Golang)', 'Authentication (JWT)'],
  '🗄️ Database': ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'],
  '🛒 E-commerce': ['Shopify', 'Custom checkout', 'Payment integrations', 'Webhooks'],
  '🤖 AI & agentic development': ['AI-based development', 'Agentic coding', 'Claude', 'Cursor', 'Copilot', 'ChatGPT', 'Gemini', 'Vercel'],
  '🧠 Generative AI & ML': ['Generative AI', 'Python', 'Machine learning (foundations)', 'Reviewing AI-generated code'],
  '🧰 Tools': ['Git & GitHub', 'VS Code', 'Vite'],
  '🚢 Delivery': ['Docker', 'CI/CD', 'Vercel / Netlify'],
}

export const services: ServiceItem[] = [
  {
    icon: '🧩',
    title: 'Full-stack web apps',
    description: 'End-to-end builds: UI, API, database and deployment, delivered in milestones you can review.',
  },
  {
    icon: '🖥️',
    title: 'Frontend development',
    description: 'Responsive, accessible React and Angular interfaces built from your designs.',
  },
  {
    icon: '🔌',
    title: 'API & backend development',
    description: 'Clean REST APIs, authentication, and data models that are easy to extend.',
  },
  {
    icon: '📊',
    title: 'Dashboards & internal tools',
    description: 'Data-driven admin panels and reporting tools that replace spreadsheets.',
  },
  {
    icon: '🛠️',
    title: 'Bug fixes & improvements',
    description: 'Take over an existing codebase, fix what is broken and make it maintainable.',
  },
  {
    icon: '🚢',
    title: 'Deployment & launch',
    description: 'Get your app live on free or low-cost hosting with CI/CD, so every update ships safely.',
  },
  {
    icon: '🤖',
    title: 'AI features & agentic workflows',
    description: 'Add generative AI features to your product, or speed up your team with AI-assisted development.',
  },
  {
    icon: '🧭',
    title: 'Forward-deployed engineering',
    description: 'Work closely with your team and users to turn real-world requirements into working solutions.',
  },
]

// TODO: replace these three with REAL projects. Real case studies are the most
// important part of this site. Add live demo and GitHub links wherever possible.
export const projects: Project[] = [
  {
    title: 'Phoenix: Shopify checkout & CRM platform',
    kind: 'Client project at Soft Suave',
    summary:
      'An e-commerce platform for Shopify store owners that combines a **custom checkout builder** with a **CRM**, installed directly into their stores.',
    problem:
      'Store owners wanted more from the standard checkout, such as upsells and subscriptions, and one place to see how their sales and **revenue** were performing.',
    solution:
      'A **custom checkout** is injected into each merchant\'s Shopify store, with upselling and a subscriptions module. A **CRM** shows the sales and revenue data behind it, and integrations such as email marketing connect the rest.',
    contributions: [
      'Worked on the entire **CRM**, including its **role-based access control (RBAC)**.',
      'Integrated **Meta Pixel** tracking into the checkout and added **PayPal** as a payment gateway.',
      'Contributed to checkout **page validation** and **performance** improvements.',
      'Fixed **security issues** across the application, including **BOLA** (broken object level authorization) and **IDOR** vulnerabilities.',
    ],
    // TODO: add one real outcome if you have it (merchants onboarded, uplift in order value, hours saved).
    result:
      'Merchants run checkout improvements and track **sales and revenue** from a single platform.',
    features: [
      'Custom checkout builder',
      'Upsells',
      'Subscriptions module',
      'CRM & revenue analytics',
      'Role-based access control',
      'PayPal payments',
      'Meta Pixel tracking',
      'Email marketing & third-party integrations',
    ],
    stack: ['React', 'NestJS', 'PostgreSQL', 'SQL', 'Shopify', 'PayPal', 'Meta Pixel', 'Third-party APIs'],
    liveUrl: undefined,
    repoUrl: undefined,
  },
  // To add another project, use the template in docs/project-template.md
]

export const experience: ExperienceItem[] = [
  // TODO: replace with your real history.
  {
    role: 'Team Lead & Executive Software Engineer',
    org: 'Soft Suave',
    period: 'January 2024 - Present',
    points: [
      'Lead a team of around 15 developers: assigning tasks, reviewing code, mentoring and keeping delivery on track.',
    ],
    awards: ['Best Team Lead', 'Architect Scalable Award', 'Quick Learner Award'],
  },
  // TODO: add freelance and internship entries (company or platform, dates, what you built).
  {
    role: 'Full Stack Developer Trainee',
    org: 'Cyberaegis IT Solutions Pvt Ltd',
    period: 'October 2021 - May 2022',
    points: [],
  },
]

export const certifications: Certification[] = [
  {
    title: 'edYoda course completions',
    issuer: 'edYoda',
    issued: 'July 2023',
    wide: true,
    details: [
      'ReactJS - Basics to Advanced',
      'Modern JavaScript for React',
      'HTML5 - Basics to Advanced',
      'Data Structure and Algorithms',
      'Data Structures in Python',
      'Network Security / Information Security',
    ],
  },
  { title: 'Accenture Consultant Virtual Experience Program', issuer: 'Forage (Accenture)', issued: 'March 2023' },
  { title: 'Full Stack Developer', issuer: 'Cyberaegis IT Solutions Pvt Ltd', issued: 'May 2022' },
  { title: 'AWS Academy Graduate - AWS Academy Machine Learning Foundations', issuer: 'AWS', issued: 'April 2022' },
  { title: 'AWS Cloud Virtual Internship', issuer: 'AWS', issued: 'December 2021' },
  { title: 'AWS Academy Graduate - AWS Academy Cloud Foundations', issuer: 'AWS', issued: 'December 2021' },
  {
    title: 'Web Development Training (8 weeks)',
    issuer: 'Internshala Trainings',
    issued: 'August 2021',
    details: ['HTML & CSS', 'Bootstrap', 'SQL', 'PHP', '100% in the final assessment'],
  },
  // TODO: add your Udemy certificates (exact course titles and dates) if you want them listed.
]

export const contactForm = {
  // Where the "Contact now" pop-up sends messages. Leave it empty and the pop-up opens the
  // visitor's own email app with everything filled in instead.
  endpoint: 'https://formspree.io/f/xzedwykz',
}

// ---------- Client-facing sections ----------

export const availability = {
  // TODO: keep this honest and update it when your schedule changes.
  status: 'Open to new opportunities',
  responseTime: 'Replies within 24 hours',
  timezone: 'IST (UTC+5:30), flexible overlap with US & EU hours',
}

export const whyHire = [
  { icon: '🎯', title: 'Clear scope, no surprises', text: 'You get a written plan, milestones and a fixed delivery date before I start.' },
  { icon: '💬', title: 'Regular updates', text: 'Short progress updates and working demos, so you always know where the project stands.' },
  { icon: '🧼', title: 'Clean, maintainable code', text: 'Typed, tested where it matters, and documented so another developer can take over.' },
  { icon: '🚀', title: 'Live, not just "done"', text: 'I deploy to a real URL, so you can use and show the product, not just read the code.' },
  { icon: '🤖', title: 'AI-accelerated delivery', text: 'I use AI agents and coding tools to move faster, then review every change by hand.' },
  { icon: '🧭', title: 'Close to your problem', text: 'A forward-deployed style: I work near your team and users so the software fits your business.' },
]

export interface ProcessStep {
  icon: string
  title: string
  text: string
  size?: 'small' | 'highlight' // small = compact card, highlight = the featured last step
  chips?: string[]
}

// Shown left to right as a flowchart. Build and Test & launch are joined by a feedback loop.
export const process: ProcessStep[] = [
  { icon: '📞', title: 'Discovery', text: 'Goals, users and constraints.', size: 'small' },
  { icon: '🔬', title: 'R&D', text: 'For a new project, I research the options and risks first, then pick the right approach.' },
  { icon: '📝', title: 'Proposal', text: 'Scope, milestones, timeline and price, in writing.' },
  { icon: '🔨', title: 'Build', text: 'Small milestones, AI-assisted for speed, with a working demo after each one.' },
  { icon: '✅', title: 'Test & launch', text: 'Testing, fixes and deployment, with a handover walkthrough.' },
  {
    icon: '🤝',
    title: 'Support',
    text: 'I stay with you after launch, so the product keeps working and growing.',
    size: 'highlight',
    chips: ['Free bug-fix window', 'Maintenance & new features'],
  },
]

export const processLoop = 'Issue found? Back to Build, fix, test again'

export const engagements = [
  { icon: '📦', title: 'Fixed-price project', text: 'Best for a well-defined scope. Paid by milestone.' },
  { icon: '⏱️', title: 'Hourly', text: 'Best for evolving work, fixes and small tasks.' },
  { icon: '🧑‍💻', title: 'Long-term / part-time', text: 'A dependable developer for your team, on a recurring basis.' },
]

// Real testimonials only. Ask past clients (Upwork reviews, managers, colleagues) for a
// short quote and permission to use it. The section hides itself while this list is empty.
export const testimonials: Testimonial[] = []

export const faq = [
  { q: 'How do we start?', a: 'Send me a short description of your project through the contact section or Upwork. I will reply within 24 hours with questions and a rough plan.' },
  { q: 'How do you price projects?', a: 'Fixed price per milestone for defined scope, or hourly for open-ended work. You will see the number before any work begins.' },
  { q: 'Who owns the code?', a: 'You do. Full source code and access are handed over when the final milestone is paid.' },
  { q: 'Do you work with my time zone?', a: 'Yes. I work from India and keep a few hours of overlap with US and European teams.' },
  { q: 'What happens after launch?', a: 'Bugs found within the support window are fixed for free. After that, I am available for maintenance or new features.' },
  { q: 'Do you use AI to write code?', a: 'Yes. I work with tools like Claude, Cursor and Copilot as development partners. I review all generated code for quality and security, and I follow your rules on what code and data may be shared with AI tools.' },
]

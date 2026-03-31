export type NavItem = {
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  level: number;
  icon: string;
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  commits?: number;
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  location?: string;
  summary: string;
  highlights?: string[];
};

export type Education = {
  period: string;
  institution: string;
  degree: string;
};

export const profile = {
  fullName: "Himanshu Kumar Rana",
  firstName: "Himanshu",
  headline: "Full Stack Developer",
  phone: "+91-7643935392",
  email: "er.ranahimanshu@gmail.com",
  githubUrl: "https://github.com/himanshurana18",
  location: "Koderma, Jharkhand, India",
  summary:
    "Frontend Software Engineer with 3+ years of experience building scalable, high-performance web and mobile applications using React.js, Next.js, Vue.js, TypeScript, and React Native. Proven track record of migrating legacy systems, shipping production apps to the Play Store and App Store, and delivering AI-powered features end-to-end.",
  linkedinUrl: "https://www.linkedin.com/in/himanshu-kumar-rana/",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Experience", href: "#experience" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

export const skills: Skill[] = [
  { name: "React", level: 95, icon: "react" },
  { name: "Next.js", level: 93, icon: "next" },
  { name: "Vue.js", level: 84, icon: "vue" },
  { name: "TypeScript", level: 90, icon: "typescript" },
  { name: "React Native CLI", level: 88, icon: "react" },
  { name: "Redux", level: 85, icon: "redux" },
  { name: "Tailwind CSS", level: 96, icon: "tailwind" },
  { name: "Firebase", level: 82, icon: "firebase" },
];

export const technicalSkillGroups = [
  {
    label: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Python (Flask)"],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "React.js",
      "Next.js",
      "Vue.js",
      "React Native CLI",
      "Redux",
      "Tailwind CSS",
      "Vuetify",
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      "Figma",
      "Firebase",
      "Git",
      "GitHub",
      "Sanity CMS",
      "WordPress",
      "Wix",
      "Canva",
    ],
  },
  {
    label: "Concepts",
    items: [
      "Component-Based Architecture",
      "REST APIs",
      "SEO Optimization",
      "Mobile-First Design",
      "Agile/Scrum",
      "Code Review",
    ],
  },
  {
    label: "App Deployment",
    items: ["Google Play Store", "Apple App Store"],
  },
];

export const projects: Project[] = [
  {
    title: "Reddup",
    description:
      "Most active repository by commit history, built with a TypeScript-first stack and iterative feature delivery.",
    tech: ["TypeScript", "React", "Frontend"],
    image: "/projects/nova-commerce.svg",
    demoUrl: "https://github.com/himanshurana18/Reddup",
    githubUrl: "https://github.com/himanshurana18/Reddup",
    commits: 30,
  },
  {
    title: "estate-ui",
    description:
      "A JavaScript UI project with strong commit activity and iterative UI enhancements.",
    tech: ["JavaScript", "UI", "Frontend"],
    image: "/projects/pulse-analytics.svg",
    demoUrl: "https://github.com/himanshurana18/estate-ui",
    githubUrl: "https://github.com/himanshurana18/estate-ui",
    commits: 16,
  },
  {
    title: "backup-apigen",
    description:
      "API utility project with consistent JavaScript commits and ongoing improvements.",
    tech: ["JavaScript", "API", "Tools"],
    image: "/projects/orbit-studio.svg",
    demoUrl: "https://github.com/himanshurana18/backup-apigen",
    githubUrl: "https://github.com/himanshurana18/backup-apigen",
    commits: 15,
  },
];

export const experiences: Experience[] = [
  {
    period: "May 2024 - Present",
    role: "Frontend Developer (SDE-1)",
    company: "Nirji Ventures",
    location: "Remote",
    summary:
      "Built and scaled core commerce and AI product surfaces across web and mobile.",
    highlights: [
      "Architected and shipped a React Native CLI app for Android and iOS with Firebase push notifications and store releases.",
      "Built a B2B ecommerce platform in Next.js and improved SEO and page speed after migration from Flask.",
      "Developed an AI fashion chatbot with outfit virtual try-on and an AI shopping assistant integrated with a Flask model backend.",
      "Led CSS-to-Tailwind migration and delivered mobile-first UX redesigns to improve onboarding and activation.",
      "Built analytics dashboards for inventory and click behavior to drive product decisions.",
    ],
  },
  {
    period: "September 2023 - March 2024",
    role: "Software Engineer",
    company: "Edgistify",
    location: "Thane, Maharashtra, India",
    summary:
      "Delivered scalable B2B web products for supply chain clients.",
    highlights: [
      "Developed B2B web pages and EdgeOS platform features for enterprise operations.",
      "Implemented component-based architecture for scalable and maintainable frontend systems.",
      "Partnered with product and design teams to align requirements with roadmap goals.",
      "Performed regular code reviews to improve quality, readability, and maintainability.",
    ],
  },
  {
    period: "January 2023 - March 2023",
    role: "Frontend Developer Intern",
    company: "BizLyft",
    location: "Bhopal, Madhya Pradesh, India",
    summary:
      "Translated design systems into responsive production-ready UI experiences.",
    highlights: [
      "Built cross-platform responsive web applications from Figma wireframes and designs.",
      "Collaborated with developers to debug frontend and CSS issues across devices and browsers.",
    ],
  },
];

export const education: Education[] = [
  {
    period: "July 2019 - July 2023",
    institution: "Rajiv Gandhi Prodyogiki Vishwavidyalaya",
    degree: "Bachelor of Technology in Computer Science and Engineering",
  },
];

export const certifications: string[] = [
  "JavaScript Algorithms and Data Structures (freeCodeCamp)",
  "Problem Solving Using Computational Thinking",
  "The Science of Well-Being (Yale)",
  "Industrial Training - Zensar ESD (Zensar Technologies)",
];

export const socials = [
  { label: "GitHub", href: profile.githubUrl },
  { label: "LinkedIn", href: profile.linkedinUrl },
  { label: "Email", href: `mailto:${profile.email}` },
];

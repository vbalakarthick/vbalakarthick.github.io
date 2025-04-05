export interface SocialLink {
  url: string;
  icon: string;
  label: string;
}

export interface Skill {
  name: string;
  percentage?: number;
  icon?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  useCase: string;
  solution: string;
  liveLink: string;
  githubLink: string;
  category: "Web Apps" | "Mobile" | "UI/UX" | string | string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
  description: string;
  icon?: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface Stats {
  value: number;
  label: string;
  suffix?: string;
}

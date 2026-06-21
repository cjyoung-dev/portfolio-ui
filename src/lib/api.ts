const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: string;
}

export type Profile = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  availability: "open" | "employed";
}

export type ProjectStatus = "active" | "complete" | "archived";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  highlights: string[];
  year: number;
}

export type SkillCategory = "language" | "frontend" | "backend" | "database" | "tooling" | "other";

export type Skill = {
  name: string;
  category: SkillCategory;
  proficiency: "familiar" | "proficient" | "expert";
}

export type ExperienceType = "work" | "education";

export type Experience = {
  id: string;
  type: ExperienceType;
  organization: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
}

async function apiFetch<T>(path: string, params?: Record<string, string >): Promise<ApiResponse<T>> {
  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  profile: () => apiFetch<Profile>('/api/profile'),
  projects: (params?: Record<string, string>) => apiFetch<Project[]>('/api/projects', params),
  skills: (params?: Record<string, string>) => apiFetch<Skill[]>('/api/skills', params),
  experience: (params?: Record<string, string>) => apiFetch<Experience[]>('/api/experience', params),
}
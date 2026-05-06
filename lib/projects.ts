import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

export type Project = {
  slug: string;
  title: string;
  industry: string;
  date: string;
  tags: string[];
  domain: string[];
  difficulty: "Mid-level" | "Hard" | "Expert";
  status: "Completed" | "In Progress";
  summary: string;
  github: string;
  website?: string;
  content: string;
};

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir);

  const projects = files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(projectsDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title,
        industry: data.industry ?? "",
        date: data.date,
        tags: data.tags ?? [],
        domain: Array.isArray(data.domain) ? data.domain : [data.domain],
        difficulty: data.difficulty,
        status: data.status,
        summary: data.summary,
        github: data.github ?? "",
        website: data.website ?? "",
        content,
      } as Project;
    });

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function NavLinks() {
  const router = useRouter();
  const pathname = usePathname();

  function handleProjects(e: React.MouseEvent) {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#projects");
    }
  }

  return (
    <div style={{ display: "flex", gap: "32px" }}>
      <a href="#projects" onClick={handleProjects} className="nav-link">
        Projects
      </a>
      <Link href="/about" className="nav-link">
        About
      </Link>
      <a
        href="https://github.com/M17SN/ai-freelance-projects"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link"
      >
        GitHub
      </a>
    </div>
  );
}
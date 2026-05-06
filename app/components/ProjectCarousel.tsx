"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";

const statusColor: Record<string, string> = {
  Completed: "#22c55e",
  "In Progress": "#f59e0b",
};

function ArrowButton({ dir, active, onClick }: { dir: "left" | "right"; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={!active}
      style={{
        width: "40px", height: "40px",
        borderRadius: "50%",
        border: `1px solid ${active ? "var(--border)" : "var(--surface-2)"}`,
        background: "var(--surface)",
        color: active ? "var(--text-primary)" : "var(--text-secondary)",
        cursor: active ? "pointer" : "not-allowed",
        fontSize: "1.1rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
        opacity: active ? 1 : 0.35,
      }}
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}>
      <div className="glass" style={{ padding: "24px", height: "100%", cursor: "pointer" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <span className="mono" style={{ color: "var(--accent-cyan)", letterSpacing: "0.1em" }}>
            {project.slug.split("-")[0]}
          </span>
          <span className="mono" style={{ color: statusColor[project.status], fontSize: "0.7rem", padding: "2px 8px", border: `1px solid ${statusColor[project.status]}`, borderRadius: "999px" }}>
            {project.status}
          </span>
        </div>

        {/* Industry */}
        <p className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "8px", fontSize: "0.7rem", letterSpacing: "0.12em", opacity: 0.7 }}>
          {project.industry.toUpperCase()}
        </p>

        {/* Title */}
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "12px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.title}
        </h3>

        {/* Summary */}
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "16px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.summary}
        </p>

        {/* Domain */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
          <span className="mono" style={{ color: "var(--text-secondary)", fontSize: "0.65rem", letterSpacing: "0.12em", minWidth: "48px" }}>DOMAIN</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.domain.map((d) => (
              <span key={d} className="mono" style={{ background: "var(--surface-2)", border: "1px solid var(--accent-cyan)", borderRadius: "4px", padding: "2px 8px", color: "var(--accent-cyan)", fontSize: "0.7rem" }}>
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
          <span className="mono" style={{ color: "var(--text-secondary)", fontSize: "0.65rem", letterSpacing: "0.12em", minWidth: "48px" }}>STACK</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="mono" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "2px 8px", color: "var(--accent-purple)", fontSize: "0.7rem" }}>
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="mono" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "2px 8px", color: "var(--text-secondary)", fontSize: "0.7rem" }}>
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
            {new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    function update() {
      let v = 3;
      if (window.innerWidth < 640) v = 1;
      else if (window.innerWidth < 1024) v = 2;
      setVisible(v);
      setIndex((i) => Math.min(i, Math.max(0, projects.length - v)));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [projects.length]);

  const canGoLeft = index > 0;
  const canGoRight = index + visible < projects.length;

  if (projects.length <= visible) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${visible}, 1fr)`, gap: "24px" }}>
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    );
  }

  return (
    <div>
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${projects.length}, calc(${100 / visible}% - ${(24 * (visible - 1)) / visible}px))`,
            gap: "24px",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `translateX(calc(-${index} * (100% / ${projects.length}) * ${projects.length / visible} - ${index * 24 / visible}px))`,
          }}
        >
          {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: "40px" }}>
        <ArrowButton dir="left" active={canGoLeft} onClick={() => setIndex((i) => i - 1)} />

        <div style={{ display: "flex", gap: "8px" }}>
          {projects.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(Math.min(i, projects.length - visible))}
              style={{
                width: i === index ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === index ? "var(--accent-cyan)" : "var(--border)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <ArrowButton dir="right" active={canGoRight} onClick={() => setIndex((i) => i + 1)} />
      </div>
    </div>
  );
}
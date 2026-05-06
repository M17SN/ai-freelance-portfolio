import Link from "next/link";

const skills = [
  { category: "Machine Learning", items: ["Scikit-learn", "XGBoost", "LightGBM", "Random Forest", "SVM", "Feature Engineering"] },
  { category: "Deep Learning & CV", items: ["PyTorch", "TensorFlow", "CNNs", "YOLO", "OpenCV", "Transfer Learning"] },
  { category: "NLP", items: ["NLTK", "spaCy", "Transformers", "BERT", "Text Classification", "Named Entity Recognition"] },
  { category: "GenAI & LLMs", items: ["LangChain", "RAG Pipelines", "OpenAI API", "Hugging Face", "Prompt Engineering", "Fine-tuning"] },
  { category: "Data Science", items: ["Python", "Pandas", "NumPy", "SQL", "EDA", "Data Visualization"] },
  { category: "MLOps", items: ["Docker", "FastAPI", "GitHub Actions", "Weights & Biases", "MLflow", "CI/CD"] },
  { category: "Cloud & Infra", items: ["AWS", "Google Cloud", "Vercel", "Linux", "REST APIs", "Git"] },
];

const domains = [
  "NLP", "Computer Vision", "Time Series Forecasting",
  "Anomaly Detection", "Recommender Systems", "Generative AI",
  "Reinforcement Learning", "MLOps",
];

export default function About() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}>
      {/* Back */}
      <Link
        href="/"
        className="mono"
        style={{
          color: "var(--text-secondary)",
          textDecoration: "none",
          fontSize: "0.8rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "48px",
          letterSpacing: "0.1em",
        }}
      >
        ← BACK TO HOME
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <p className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "12px", letterSpacing: "0.15em", fontSize: "0.8rem" }}>
          ABOUT
        </p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "24px" }}>
          Abdulmohsen Alghamdi
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "16px" }}>
          I am an AI freelancer building end-to-end machine learning systems — from raw data to deployed product.
          I work across the full stack of AI: predictive models, NLP pipelines, computer vision systems,
          LLM-powered applications, and generative AI workflows.
        </p>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1rem" }}>
          Every project here is a real problem solved end-to-end — not tutorials, not toy datasets.
          I document the process honestly: what worked, what did not, and what I would do differently.
        </p>
      </div>

      {/* Domains */}
      <div style={{ marginBottom: "48px" }}>
        <p className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "16px", letterSpacing: "0.15em", fontSize: "0.8rem" }}>
          DOMAINS
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {domains.map((d) => (
            <span
              key={d}
              className="mono"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "6px 12px",
                color: "var(--accent-purple)",
                fontSize: "0.75rem",
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: "48px" }}>
        <p className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "24px", letterSpacing: "0.15em", fontSize: "0.8rem" }}>
          SKILLS
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {skills.map((group) => (
            <div
              key={group.category}
              className="glass"
              style={{ padding: "16px" }}
            >
              <p className="mono" style={{ color: "var(--text-primary)", marginBottom: "10px", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                {group.category}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                {group.items.map((item) => (
                  <li key={item} style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
        <p className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "16px", letterSpacing: "0.15em", fontSize: "0.8rem" }}>
          CONTACT
        </p>
        <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "0.95rem" }}>
          Available for freelance projects. Reach out if you have a problem worth solving.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <a
            href="https://github.com/M17SN"
            target="_blank"
            rel="noopener noreferrer"
            style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 20px", color: "var(--text-primary)", textDecoration: "none", fontSize: "0.875rem" }}
          >
            GitHub
          </a>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>mohsen.a.1424@gmail.com</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>+966 501-700-700</span>
        </div>
      </div>
    </div>
  );
}
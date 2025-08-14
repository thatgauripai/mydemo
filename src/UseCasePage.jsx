import React from "react";

const UsecasePage = () => {
  const features = [
    {
      title: "Visual Cues",
      emoji: "🎨",
      description: "Colorful emojis and icons guide tasks in a fun way.",
    },
    {
      title: "Auditory Cues",
      emoji: "🔊",
      description: "Cheerful sounds notify when tasks start or finish.",
    },
    {
      title: "Timers",
      emoji: "⏳",
      description: "Countdown timers give clear and structured feedback.",
    },
    {
      title: "Simple Navigation",
      emoji: "🧭",
      description: "Big, friendly buttons make it easy to move around.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4f78baff, #c2e9fb)",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "2rem",
            color: "#2b6cb0",
          }}
        >
          About the Use Case
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#4a5568",
            fontSize: "1.1rem",
            marginBottom: "40px",
          }}
        >
          A daily routine scheduler for children with autism — making each day
          predictable, interactive, and fun.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fef3c7",
                padding: "25px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                {feature.emoji}
              </div>
              <h3 style={{ marginBottom: "10px", color: "#2d3748" }}>
                {feature.title}
              </h3>
              <p style={{ color: "#4a5568", fontSize: "0.95rem" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "linear-gradient(to right, #f6d365, #fda085)",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Our goal: Support independence, predictability, and focus — every day!
        </div>
      </div>
    </div>
  );
};

export default UsecasePage;

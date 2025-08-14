import React from "react"; 
// Importing React library - required for JSX and creating components

const UsecasePage = () => { 
  // Functional Component (Stateless Component) - no internal state, just renders UI

  const features = [
    // Array of Objects - Data structure used for rendering list items dynamically
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
    // JSX syntax - allows writing HTML-like elements inside JavaScript
    <div
      // Inline Styling - applying CSS directly via the style prop
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4f78baff, #c2e9fb)",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        // Styling for container box
        style={{
          maxWidth: "900px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          padding: "40px",
        }}
      >
        <h1
          // Styled heading
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
          // Styled paragraph
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
          // CSS Grid layout for responsive design
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          {features.map((feature, index) => (
            // List Rendering in React using .map()
            // Keys - 'key={index}' is used to help React identify list elements
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
              // Event Handling - onMouseEnter triggers scale animation
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              // Event Handling - onMouseLeave resets scale
            >
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                {/* Using props-like object data to render emoji */}
                {feature.emoji}
              </div>
              <h3 style={{ marginBottom: "10px", color: "#2d3748" }}>
                {/* Rendering title from the features array */}
                {feature.title}
              </h3>
              <p style={{ color: "#4a5568", fontSize: "0.95rem" }}>
                {/* Rendering description from the features array */}
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div
          // Styled footer message
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
// Exporting the component so it can be used in other files

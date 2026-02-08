import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("https://aichatbuddy.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🤖 AI Chat Buddy</h1>
      <p style={styles.subtitle}>
        Ask anything and get instant AI-powered answers
      </p>

      <textarea
        style={styles.input}
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button style={styles.button} onClick={askAI} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {answer && (
        <div style={styles.card}>
          <h3>AI Response</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "30px",
    opacity: 0.9,
  },
  input: {
    width: "100%",
    maxWidth: "600px",
    height: "120px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#ffdd57",
    color: "#333",
    padding: "12px 30px",
    borderRadius: "25px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#fff",
    color: "#333",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "600px",
    marginTop: "30px",
  },
  error: {
    color: "#ffcccc",
    marginTop: "15px",
  },
};

export default App;

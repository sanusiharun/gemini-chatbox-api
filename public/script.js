const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

let conversationHistory = [];
let isProcessing = false;

function appendMessage(role, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", role);
  messageElement.textContent = text;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
  return messageElement;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  if (isProcessing) return;
  
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Prevent multiple submissions
  isProcessing = true;
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  // Add user message to UI
  appendMessage("user", userMessage);
  
  // Add to conversation history
  conversationHistory.push({ role: "user", text: userMessage });
  
  // Clear input
  input.value = "";

  // Show thinking message
  const thinkingMessage = appendMessage("bot", "Thinking...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: conversationHistory,
      }),
    });

    const data = await response.json();

    if (response.ok && data.result) {
      thinkingMessage.textContent = data.result;
      conversationHistory.push({ role: "bot", text: data.result });
    } else {
      thinkingMessage.textContent = data.error || "Sorry, something went wrong.";
    }
  } catch (error) {
    console.error("Error:", error);
    thinkingMessage.textContent = "Failed to connect to server. Please try again.";
  } finally {
    isProcessing = false;
    submitButton.disabled = false;
    input.focus();
  }
});

// Add welcome message on page load
window.addEventListener("load", () => {
  appendMessage("bot", "Hello! I'm your Gemini AI assistant. How can I help you today?");
});

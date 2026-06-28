import { useState } from "react";
function Chat() {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
  {
    sender: "bot",
    text: "👋 Hello! I'm your Context DNA assistant."
  }
]);
const [memory, setMemory] = useState([]);

function getBotReply(userMessage) {
  const text = userMessage.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    return "Hello! 👋 How can I help you today?";
  }

  if (text.includes("who are you")) {
    return "I'm Context DNA 🧬, an AI that remembers your goals, habits, and preferences.";
  }

  if (text.includes("thank")) {
    return "You're welcome! 😊";
  }

 if (text.includes("like")) {
    const interest = userMessage.replace(/^(i\s+)?like\s+/i, "").trim();
    return `Got it! 🧬 I'll remember that you like ${interest}.`;
  }

  if (text.includes("my goal is")) {
    const goal = userMessage.replace(/my goal is/i, "").trim();
    return `🎯 Awesome! I'll remember that your goal is ${goal}.`;
  }

  if (
  text.includes("my name is") ||
  text.includes("i am") ||
  text.includes("i'm")
) {
  let name = "";

  if (text.includes("my name is")) {
    name = userMessage.replace(/my name is/i, "").trim();
  } else if (text.includes("i am")) {
    name = userMessage.replace(/i am/i, "").trim();
  } else if (text.includes("i'm")) {
    name = userMessage.replace(/i'm/i, "").trim();
  }

  return `Nice to meet you, ${name}! 😊`;
}
  return "That's interesting! Tell me more. 😊";
}
function sendMessage() {
  if (message.trim() === "") return;

  const botReply = getBotReply(message);

if (message.toLowerCase().includes("like")) {
  const interest = message.replace(/^(i\s+)?like\s+/i, "").trim();
  

  setMemory([
    ...memory,
    `❤️ Likes ${interest}`
  ]);
}
 if (message.toLowerCase().includes("my goal is")) {
  const goal = message.replace(/my goal is/i, "").trim();

  setMemory([
    ...memory,
    `🎯 Goal: ${goal}`
  ]);
}
if (
  message.toLowerCase().includes("my name is") ||
  message.toLowerCase().includes("i am") ||
  message.toLowerCase().includes("i'm")
) {
  let name = "";

  if (message.toLowerCase().includes("my name is")) {
    name = message.replace(/my name is/i, "").trim();
  } else if (message.toLowerCase().includes("i am")) {
    name = message.replace(/i am/i, "").trim();
  } else if (message.toLowerCase().includes("i'm")) {
    name = message.replace(/i'm/i, "").trim();
  }

  setMemory([
    ...memory,
    `👤 Name: ${name}`
  ]);
}
  setMessages([
    ...messages,
    {
      sender: "user",
      text: message,
    },
    {
      sender: "bot",
      text: botReply,
    },
  ]);

  setMessage("");
}
  return (
    <div className="chat-page">

      <div className="sidebar">
        <h2>🧬 Context DNA</h2>

        <h3>Memory</h3>

        <ul>
  {memory.length === 0 ? (
    <li>No memories yet...</li>
  ) : (
    memory.map((item, index) => (
      <li key={index}>{item}</li>
    ))
  )}
</ul>
      </div>

      <div className="chat-container">

        <div className="chat-header">
          💬 AI Assistant
        </div>

        <div className="chat-messages">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={msg.sender === "bot" ? "bot-message" : "user-message"}
    >
      {msg.text}
    </div>
  ))}
</div>

        <div className="chat-input">

          <input
  type="text"
  placeholder="Type your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>

          <button onClick={sendMessage}>
  Send
</button> 

        </div>

      </div>

    </div>
  );
}

export default Chat;  
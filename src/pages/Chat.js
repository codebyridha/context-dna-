import { useState, useEffect } from "react";
import { askAI } from "../services/aiService";
function Chat() {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

const [memory, setMemory] = useState(() => {
  const savedMemory = localStorage.getItem("memory");

  return savedMemory ? JSON.parse(savedMemory) : [];
});
useEffect(() => {
  localStorage.setItem("memory", JSON.stringify(memory));
}, [memory]);
useEffect(() => {
  const nameMemory = memory.find(item => item.startsWith("👤 Name:"));

  if (nameMemory) {
    const name = nameMemory.replace("👤 Name:", "").trim();

    setMessages([
      {
        sender: "bot",
        text: `👋 Welcome back, ${name}! 😊`
      }
    ]);
  } else {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hello! I'm your Context DNA assistant."
      }
    ]);
  }
}, []);
function getBotReply(userMessage) {
  const text = userMessage.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    return "Hello! 👋 How can I help you today?";
  }

  if (text.includes("who are you")) {
    return "I'm Context DNA 🧬, an AI that remembers your goals, preferences and habits.";
  }

  if (text.includes("thank")) {
    return "You're welcome! 😊";
  }

  // 📚 Learning (must come BEFORE Name)
  if (text.startsWith("i am learning ")) {
    const learning = userMessage.substring(14).trim();
    return `📚 Great! I'll remember that you're learning ${learning}.`;
  }

  if (text.startsWith("i'm learning ")) {
    const learning = userMessage.substring(13).trim();
    return `📚 Great! I'll remember that you're learning ${learning}.`;
  }

  // 👤 Name
  if (text.startsWith("my name is ")) {
    const name = userMessage.substring(11).trim();
    return `Nice to meet you, ${name}! 😊`;
  }

  if (text.startsWith("i am ")) {
    const name = userMessage.substring(5).trim();
    return `Nice to meet you, ${name}! 😊`;
  }

  if (text.startsWith("i'm ")) {
    const name = userMessage.substring(4).trim();
    return `Nice to meet you, ${name}! 😊`;
  }

  // ❤️ Likes
  if (text.startsWith("i like ")) {
  const interest = userMessage.substring(7).trim();
  return `Got it! ❤️ I'll remember that you like ${interest}.`;
}

if (text.startsWith("like ")) {
  const interest = userMessage.substring(5).trim();
  return `Got it! ❤️ I'll remember that you like ${interest}.`;
}

  // 🎯 Goal
  if (text.startsWith("my goal is ")) {
    const goal = userMessage.substring(11).trim();
    return `🎯 Awesome! I'll remember that your goal is ${goal}.`;
  }
if (
  text.includes("what do you know about me") ||
  text.includes("who am i") ||
  text.includes("tell me about me") ||
  text.includes("what do you remember about me") ||

  text.includes("who is me") ||
  text.includes("summarize me") ||
  text.includes("my profile") ||
  text.includes("show my profile") ||
  text.includes("show my memory") ||
  text.includes("what have you learned about me") ||
  text.includes("recall my memory") ||
  text.includes("what do you know") ||

  text === "profile" ||
  text === "memory" ||
  text === "summary" ||
  text === "me" ||
  text === "about me"
) {
  return "__SHOW_MEMORY__";
}
// 🧠 Smart Recommendations
if (
  text.includes("what should i learn next") ||
  text.includes("what should i study next") ||
  text.includes("recommend me") ||
  text.includes("what do you recommend")
) {

  const learning = memory.find(item => item.startsWith("📚 Learning:"));
  const goal = memory.find(item => item.startsWith("🎯 Goal:"));

  if (learning && learning.includes("Java")) {
    return `🧠 Since you're learning Java and I remember your goal, I recommend:

✅ DSA
✅ Spring Boot
✅ JDBC
✅ Hibernate
✅ Build Java Projects`;
  }

  if (learning && learning.includes("React")) {
    return `🧠 Since you're learning React, I recommend:

✅ JavaScript ES6
✅ React Hooks
✅ Node.js
✅ Express.js
✅ Build Full Stack Projects`;
  }

  return `📚 I recommend learning one topic deeply before moving to the next. Keep building projects! 🚀`;
}

  return "That's interesting! Tell me more. 😊";
}

function sendMessage() {
  if (message.trim() === "") return;

  let botReply = getBotReply(message);

if (botReply === "__SHOW_MEMORY__") {
  if (memory.length === 0) {
    botReply = "🤔 I don't know anything about you yet. Tell me something!";
  } else {
    botReply =
      "🧬 Here's what I know about you:\n\n" +
      memory.join("\n");
  }
}
  let newMemory = null;

const text = message.toLowerCase();
// 👤 Name
if (text.startsWith("my name is ")) {
  const name = message.substring(11).trim();
  newMemory = `👤 Name: ${name}`;
}

else if (text.startsWith("i am learning ")) {
  const learning = message.substring(14).trim();
  newMemory = `📚 Learning: ${learning}`;
}

else if (text.startsWith("i'm learning ")) {
  const learning = message.substring(13).trim();
  newMemory = `📚 Learning: ${learning}`;
}

// 👤 Name
else if (text.startsWith("i am ")) {
  const name = message.substring(5).trim();
  newMemory = `👤 Name: ${name}`;
}

else if (text.startsWith("i'm ")) {
  const name = message.substring(4).trim();
  newMemory = `👤 Name: ${name}`;
}

// ❤️ Likes
else if (text.startsWith("i like ")) {
  const interest = message.substring(7).trim();
  newMemory = `❤️ Likes: ${interest}`;
}

else if (text.startsWith("like ")) {
  const interest = message.substring(5).trim();
  newMemory = `❤️ Likes: ${interest}`;
}

// 🎯 Goal
else if (text.startsWith("my goal is ")) {
  const goal = message.substring(11).trim();

  newMemory = `🎯 Goal: ${goal}`;

  const updatedMemory = memory.filter(
    item => !item.startsWith("🎯 Goal:")
  );

  updatedMemory.push(newMemory);

  setMemory(updatedMemory);

  newMemory = null;
}
  if (newMemory && !memory.includes(newMemory)) {
  setMemory([
    ...memory,
    newMemory,
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
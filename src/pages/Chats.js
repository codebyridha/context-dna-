import { useState, useEffect } from "react";

import {
  loadMemory,
  saveMemory,
  addMemory,
} from "../services/memoryService";

import {
  loadMessages,
  saveMessages,
} from "../services/chatService";

import Sidebar from "../components/Sidebar";
import MemoryViewer from "../components/MemoryViewer";
import ChatWindow from "../components/ChatWindow";
import MemoryScore from "../components/MemoryScore";
import RecommendationCard from "../components/RecommendationCard_old.js";
import Dashboard from "../components/Dashboard";
import {
  askAI,
  extractMemory,
} from "../services/aiService";

function Chats() {

  // ==========================
  // States
  // ==========================

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(() => {
    return loadMessages();
  });

  const [memory, setMemory] = useState(() => {
    return loadMemory();
  });

 const [selectedCategory, setSelectedCategory] = useState(null);
  // ==========================
  // Categories
  // ==========================

  const categories = [
    { name: "Profile", icon: "👤" },
    { name: "Goals", icon: "🎯" },
    { name: "Learning", icon: "📚" },
    { name: "Likes", icon: "❤️" },
    { name: "Hobbies", icon: "🏸" },
    { name: "Emotions", icon: "😊" },
    { name: "Notes", icon: "📝" },
  ];
    // ==========================
  // Save Memory
  // ==========================

  useEffect(() => {
    saveMemory(memory);
  }, [memory]);

  // ==========================
  // Save Chat Messages
  // ==========================

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);
  function deleteMemory(memoryToDelete) {

  const updatedMemory = memory.filter(
    (item) => item !== memoryToDelete
  );

  setMemory(updatedMemory);

}
function editMemory(oldMemory, newMemory) {

  const updatedMemory = memory.map((item) =>
    item === oldMemory ? newMemory : item
  );

  setMemory(updatedMemory);

} 

  
  // ==========================
  // Welcome Message
  // ==========================

  useEffect(() => {

    if (messages.length > 0) return;

    const nameMemory = memory.find(item =>
      item.startsWith("👤 Name:")
    );

    if (nameMemory) {

      const name = nameMemory.replace(
        "👤 Name:",
        ""
      ).trim();

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
          text: "👋 Hello! I'm your Context DNA Assistant."
        }
      ]);

    }

  }, []);
    // ==========================
  // Bot Reply Logic
  // ==========================

  function getBotReply(userMessage) {

    const text = userMessage.toLowerCase();

    // Greetings
    if (text.includes("hi") || text.includes("hello")) {
      return "Hello! 👋 How can I help you today?";
    }

    if (text.includes("who are you")) {
      return "I'm Context DNA 🧬, an AI that remembers your goals, preferences and habits.";
    }

    if (text.includes("thank")) {
      return "You're welcome! 😊";
    }

    // ==========================
    // Learning
    // ==========================

    if (text.startsWith("i am learning ")) {
      const learning = userMessage.substring(14).trim();
      return `📚 Great! I'll remember that you're learning ${learning}.`;
    }

    if (text.startsWith("i'm learning ")) {
      const learning = userMessage.substring(13).trim();
      return `📚 Great! I'll remember that you're learning ${learning}.`;
    }

    // ==========================
    // Name
    // ==========================

    if (text.startsWith("my name is ")) {
      const name = userMessage.substring(11).trim();
      return `Nice to meet you, ${name}! 😊`;
    }

   // 😊 Emotion Detection
const emotions = [
  "happy",
  "sad",
  "angry",
  "stressed",
  "stress",
  "excited",
  "tired",
  "sleepy",
  "worried",
  "confused",
  "nervous",
  "upset",
  "good",
  "great",
  "fine",
  "okay"
];

if (text.startsWith("i am ")) {

  const value = userMessage.substring(5).trim();

  if (emotions.includes(value.toLowerCase())) {
    return `I'm sorry you're feeling ${value}. 💙 I'm here if you want to talk.`;
  }

  return `Nice to meet you, ${value}! 😊`;
}

if (text.startsWith("i'm ")) {

  const value = userMessage.substring(4).trim();

  if (emotions.includes(value.toLowerCase())) {
    return `I'm sorry you're feeling ${value}. 💙 I'm here if you want to talk.`;
  }

  return `Nice to meet you, ${value}! 😊`;
}

    // ==========================
    // Likes
    // ==========================

    if (text.startsWith("i like ")) {
      const like = userMessage.substring(7).trim();
      return `❤️ Got it! I'll remember that you like ${like}.`;
    }

    if (text.startsWith("like ")) {
      const like = userMessage.substring(5).trim();
      return `❤️ Got it! I'll remember that you like ${like}.`;
    }

    // ==========================
    // Goal
    // ==========================

    if (text.startsWith("my goal is ")) {
      const goal = userMessage.substring(11).trim();
      return `🎯 Awesome! I'll remember your goal: ${goal}`;
    }

    // ==========================
    // Memory Summary
    // ==========================

    if (
      text.includes("what do you know about me") ||
      text.includes("tell me about me") ||
      text.includes("show my memory") ||
      text.includes("show my profile") ||
      text === "memory" ||
      text === "profile"
    ) {
      return "__SHOW_MEMORY__";
    }

    // ==========================
    // Smart Recommendations
    // ==========================

    if (
      text.includes("recommend") ||
      text.includes("study next") ||
      text.includes("learn next")
    ) {

      const learning = memory.find(item =>
        item.startsWith("📚 Learning:")
      );

      const goal = memory.find(item =>
        item.startsWith("🎯 Goal:")
      );

      if (learning?.includes("Java")) {
        return `🧠 Since you're learning Java${
          goal
            ? " and working toward " + goal.replace("🎯 Goal: ", "")
            : ""
        }

✅ DSA
✅ JDBC
✅ Spring Boot
✅ Hibernate
✅ Build Java Projects`;
      }

      if (learning?.includes("React")) {
        return `🧠 Since you're learning React

✅ JavaScript ES6
✅ React Hooks
✅ Node.js
✅ Express.js
✅ Build Full Stack Projects`;
      }

      return "📚 Keep learning consistently and build projects alongside your studies! 🚀";
    }

    return "That's interesting! Tell me more. 😊";
  }
  // ==========================
// Send Message
// ==========================

async function sendMessage() {

  if (message.trim() === "") return;

  let botReply = getBotReply(message);

  const aiMemory = await extractMemory(message);

  if (botReply === "__SHOW_MEMORY__") {

    if (memory.length === 0) {

      botReply =
        "🤔 I don't know anything about you yet.";

    } else {

      botReply =
        "🧬 Here's what I know about you:\n\n" +
        memory.join("\n");

    }

  }

  let newMemory = null;

  const text = message.toLowerCase();

  if (text.startsWith("my name is ")) {
    newMemory = `👤 Name: ${message.substring(11).trim()}`;
  }

  else if (text.startsWith("i am learning ")) {
    newMemory = `📚 Learning: ${message.substring(14).trim()}`;
  }

  else if (text.startsWith("i'm learning ")) {
    newMemory = `📚 Learning: ${message.substring(13).trim()}`;
  }
  // 😊 Emotion Detection
else if (
  text.startsWith("i am ") ||
  text.startsWith("i'm ")
) {

  const emotionText = text
    .replace("i am ", "")
    .replace("i'm ", "")
    .trim();

  const emotions = [
    "happy",
    "sad",
    "angry",
    "stressed",
    "stress",
    "excited",
    "tired",
    "sleepy",
    "worried",
    "confused",
    "nervous",
    "upset",
    "good",
    "great",
    "fine",
    "okay"
  ];

  if (emotions.includes(emotionText)) {

    newMemory = `😊 Emotion: ${emotionText}`;

  } else {

    newMemory = `👤 Name: ${message.substring(5).trim()}`;

  }

}

  else if (text.startsWith("i like ")) {
    newMemory = `❤️ Likes: ${message.substring(7).trim()}`;
  }

  else if (text.startsWith("like ")) {
    newMemory = `❤️ Likes: ${message.substring(5).trim()}`;
  }

  else if (text.startsWith("my goal is ")) {
    newMemory = `🎯 Goal: ${message.substring(11).trim()}`;
  }

  if (aiMemory || newMemory) {

    const updatedMemory =
      addMemory(memory, aiMemory || newMemory);

    setMemory(updatedMemory);

  }

  const finalReply = botReply === "That's interesting! Tell me more. 😊"
    ? await askAI(memory, message)
    : botReply;

  setMessages(prev => [
    ...prev,
    {
      sender: "user",
      text: message,
    },
    {
      sender: "bot",
      text: finalReply,
    }
  ]);

  setMessage("");

}
return (

  <div className="chat-page">

    <Sidebar
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />

    <div
      className={
        selectedCategory
          ? "main-content"
          : "main-content full-chat"
      }
    >

      {selectedCategory && (

  <Dashboard
  memory={memory}
  selectedCategory={selectedCategory}
  deleteMemory={deleteMemory}
  editMemory={editMemory}
/>
)}

      <ChatWindow
        messages={messages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />

    </div>

  </div>

);

}

export default Chats;
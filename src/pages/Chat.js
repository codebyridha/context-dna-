import {
  loadMemory,
  saveMemory,
  addMemory,
} from "../services/memoryService";
import { useState, useEffect } from "react";
import { askAI, extractMemory } from "../services/aiService";
import {
  loadMessages,
  saveMessages,
} from "../services/chatService";
function Chat() {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState(() => {
  return loadMessages();
});
    

const [memory, setMemory] = useState(() => {
  return loadMemory();
});

const [selectedCategory, setSelectedCategory] = useState("Goals");
const [showMemory, setShowMemory] = useState(false);

const categories = [
  { name: "Profile", icon: "👤" },
  { name: "Goals", icon: "🎯" },
  { name: "Learning", icon: "📚" },
  { name: "Likes", icon: "❤️" },
  { name: "Hobbies", icon: "🏸" },
  { name: "Emotions", icon: "😊" },
  { name: "Notes", icon: "📝" },
];

useEffect(() => {
 saveMemory(memory);
}, [memory]);
useEffect(() => {
  saveMessages(messages);
}, [messages]);
useEffect(() => {
  const nameMemory = memory.find(item => item.startsWith("👤 Name:"));

  if (nameMemory) {
    const name = nameMemory.replace("👤 Name:", "").trim();

    if (messages.length === 0) {
  setMessages([
    {
      sender: "bot",
      text: `👋 Welcome back, ${name}! 😊`
    }
  ]);
}
  } else {
  setMessages([
    {
      sender: "bot",
      text: "👋 Hello! I'm your Context DNA assistant."
    }
  ]);
}
}, [memory,messages]);
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
  return `🧠 Since you're learning Java${
    goal ? " and working toward " + goal.replace("🎯 Goal: ", "") : ""
  }, I recommend:

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


async function sendMessage() {
  if (message.trim() === "") return;

  let botReply = getBotReply(message);
  const aiMemory = await extractMemory(message);

const useAI =
  botReply === "That's interesting! Tell me more. 😊";

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
  const updatedMemory = addMemory(memory, aiMemory || newMemory);

setMemory(updatedMemory);
if (useAI) {
  askAI(memory, message).then((aiReply) => {
    setMessages([
      ...messages,
      {
        sender: "user",
        text: message,
      },
      {
        sender: "bot",
        text: aiReply,
      },
    ]);
  });
} else {
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
}
setMessage("");
}

   return (
    <div className="chat-page">

      <div className="sidebar">
        <h2>🧬 Context DNA</h2>

        <h3>Memory</h3>

<div className="memory-categories">
  <button
  className="category-btn"
  onClick={() => setShowMemory(false)}
>
  💬 Chat
</button>

  {categories.map((category) => (
    
<button
    key={category.name}

    className={
      selectedCategory === category.name
        ? "active-category"
        : "category-btn"
    }


    onClick={() => {
  setSelectedCategory(category.name);
  setShowMemory(true);
}}

>

{category.icon} {category.name}

</button>

))}

</div>

<hr />

<div className="memory-viewer">

  <div className="chat-header">
    🧠 {selectedCategory}
  </div>

  <div className="memory-content">

    {memory
      .filter((item) => {

        if (selectedCategory === "Profile")
          return item.startsWith("👤");

        if (selectedCategory === "Goals")
          return item.startsWith("🎯");

        if (selectedCategory === "Learning")
          return item.startsWith("📚");

        if (selectedCategory === "Likes")
          return item.startsWith("❤️");

        if (selectedCategory === "Hobbies")
          return item.startsWith("🏸");

        if (selectedCategory === "Emotions")
          return item.startsWith("😊");

        if (selectedCategory === "Notes")
    return item.startsWith("📝");

return false;
})

.map((item, index) => (
  <div key={index} className="memory-card">
  {item
    .replace("👤 Name: ", "👤 ")
    .replace("🎯 Goal: ", "🎯 ")
    .replace("📚 Learning: ", "📚 ")
    .replace("❤️ Likes: ", "❤️ ")
    .replace("🏸 Hobby: ", "🏸 ")
    .replace("😊 Emotion: ", "😊 ")
    .replace("📝 Note: ", "📝 ")
  }
</div>

))

}
</div>
</div>

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
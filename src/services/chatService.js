 
export function loadMessages() {
  const saved = localStorage.getItem("messages");

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
}

export function saveMessages(messages) {
  localStorage.setItem(
    "messages",
    JSON.stringify(messages)
  );
}
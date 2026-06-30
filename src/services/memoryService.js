// Load memory from Local Storage
export function loadMemory() {
  const saved = localStorage.getItem("memory");

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
}

// Save memory
export function saveMemory(memory) {
  localStorage.setItem(
    "memory",
    JSON.stringify(memory)
  );
}

// Add new memory
export function addMemory(memory, newItem) {
  if (
    newItem &&
    newItem !== "NONE" &&
    !memory.includes(newItem)
  ) {
    return [...memory, newItem];
  }

  return memory;
}
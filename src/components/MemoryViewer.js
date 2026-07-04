import MemoryCard from "./MemoryCard";
function MemoryViewer({
  memory,
  selectedCategory,
  deleteMemory,
  editMemory,
}) {

  const filteredMemory = memory.filter((item) => {

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
  });

  return (

    <div className="memory-viewer">

      <div className="chat-header">
        🧠 {selectedCategory}
      </div>

      <div className="memory-content">

        {filteredMemory.length === 0 ? (

          <p>No memory stored yet.</p>

        ) : (

          filteredMemory.map((item, index) => (

  <MemoryCard
  key={index}
  item={item}
   onDelete={() => deleteMemory(item)}
  onEdit={(newMemory) =>
  editMemory(item, newMemory)
}
  />

))
        )}

      </div>

    </div>

  );
}

export default MemoryViewer;
function MemoryCard({
  item,
  onDelete,
  onEdit,
}) {

  return (

    <div className="memory-card">

      <span>{item}</span>

      <div className="memory-actions">

        <button
          className="edit-btn"
          onClick={onEdit}
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          🗑️
        </button>

      </div>

    </div>

  );

}

export default MemoryCard;
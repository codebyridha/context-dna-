import { useState } from "react";
function MemoryCard({
  item,
  onDelete,
  onEdit,
}) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item);

  function saveEdit() {
    onEdit(editedText);
    setIsEditing(false);
  }

  return (

    <div className="memory-card">

      {isEditing ? (

        <>
          <input
            className="memory-input"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />

          <div className="memory-actions">

            <button
              className="save-btn"
              onClick={saveEdit}
            >
              💾
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                setEditedText(item);
                setIsEditing(false);
              }}
            >
              ❌
            </button>

          </div>

        </>

      ) : (

        <>

          <span>{item}</span>

          <div className="memory-actions">

            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
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

        </>

      )}

    </div>

  );

}

export default MemoryCard;
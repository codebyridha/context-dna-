function ProfileCard({ memory }) {

  const getValue = (prefix) => {

    const item = memory.find(m => m.startsWith(prefix));

    return item
      ? item.replace(prefix, "")
      : "Not Available";

  };

  return (

    <div className="profile-card">

      <h2>👤 Digital Identity</h2>

      <div className="profile-row">
        <span>👤 Name</span>
        <strong>{getValue("👤 Name: ")}</strong>
      </div>

      <div className="profile-row">
        <span>🎯 Goal</span>
        <strong>{getValue("🎯 Goal: ")}</strong>
      </div>

      <div className="profile-row">
        <span>📚 Learning</span>
        <strong>{getValue("📚 Learning: ")}</strong>
      </div>

      <div className="profile-row">
        <span>❤️ Likes</span>
        <strong>{getValue("❤️ Likes: ")}</strong>
      </div>

      <div className="profile-row">
        <span>😊 Mood</span>
        <strong>{getValue("😊 Emotion: ")}</strong>
      </div>

    </div>

  );

}

export default ProfileCard;
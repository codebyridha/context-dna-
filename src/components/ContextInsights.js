function ContextInsights({ memory }) {

  const profile = memory.filter(item =>
    item.startsWith("👤")
  ).length;

  const goals = memory.filter(item =>
    item.startsWith("🎯")
  ).length;

  const learning = memory.filter(item =>
    item.startsWith("📚")
  ).length;

  const likes = memory.filter(item =>
    item.startsWith("❤️")
  ).length;

  const emotions = memory.filter(item =>
    item.startsWith("😊")
  ).length;

  const hobbies = memory.filter(item =>
    item.startsWith("🏸")
  ).length;

  const notes = memory.filter(item =>
    item.startsWith("📝")
  ).length;

  return (

    <div className="insight-card">

      <h2>🧠 Context Insights</h2>

      <div className="insight-item">
        {profile ? "✅" : "❌"} Profile
      </div>

      <div className="insight-item">
        {goals ? "✅" : "❌"} Goals
      </div>

      <div className="insight-item">
        {learning ? "✅" : "❌"} Learning
      </div>

      <div className="insight-item">
        {likes ? "✅" : "❌"} Likes
      </div>

      <div className="insight-item">
        {emotions ? "✅" : "❌"} Emotions
      </div>

      <div className="insight-item">
        {hobbies ? "✅" : "❌"} Hobbies
      </div>

      <div className="insight-item">
        {notes ? "✅" : "❌"} Notes
      </div>

      <hr />

      <p>

        💡 Keep chatting to help Context DNA
        understand you better.

      </p>

    </div>

  );

}

export default ContextInsights;
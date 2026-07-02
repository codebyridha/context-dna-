function MemoryScore({ memory }) {

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

  const total =
    profile +
    goals +
    learning +
    likes +
    emotions;

  const score = Math.min(
    Math.round((total / 10) * 100),
    100
  );

  return (

    <div className="memory-score">

      <h2>🧬 Context DNA</h2>

      <div className="score-circle">

        <h1>{score}%</h1>

        <p>Memory Score</p>

      </div>

      <div className="score-item">

        <span>👤 Profile</span>

        <progress
          value={profile}
          max="2"
        />

      </div>

      <div className="score-item">

        <span>🎯 Goals</span>

        <progress
          value={goals}
          max="2"
        />

      </div>

      <div className="score-item">

        <span>📚 Learning</span>

        <progress
          value={learning}
          max="2"
        />

      </div>

      <div className="score-item">

        <span>❤️ Likes</span>

        <progress
          value={likes}
          max="2"
        />

      </div>

      <div className="score-item">

        <span>😊 Emotion</span>

        <progress
          value={emotions}
          max="2"
        />

      </div>

    </div>

  );

}

export default MemoryScore;
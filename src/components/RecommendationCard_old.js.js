function RecommendationCard({ memory }) {

  const learning = memory.find(item =>
    item.startsWith("📚 Learning:")
  );

  const goal = memory.find(item =>
    item.startsWith("🎯 Goal:")
  );

  let title = "🚀 Recommended Next Step";

  let recommendation =
    "Tell me more about yourself so I can personalize recommendations.";

  let reason =
    "I don't have enough information yet.";

  if (learning && learning.includes("Java")) {

    recommendation =
      "Learn DSA → JDBC → Spring Boot → Hibernate";

    reason =
      "Because you're learning Java.";

  }

  if (learning && learning.includes("React")) {

    recommendation =
      "Learn Node.js → Express.js → MongoDB";

    reason =
      "Because you're learning React.";

  }

  if (
    learning &&
    goal &&
    goal.includes("AI")
  ) {

    recommendation =
      "Learn Python → Machine Learning → Deep Learning";

    reason =
      "Because your goal is AI and you're already learning programming.";

  }

  return (

    <div className="recommendation-card">

      <h2>{title}</h2>

      <h3>{recommendation}</h3>

      <p>
        🧠 {reason}
      </p>

    </div>

  );

}

export default RecommendationCard;
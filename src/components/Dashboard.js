import MemoryViewer from "./MemoryViewer";
import MemoryScore from "./MemoryScore";
import ContextInsights from "./ContextInsights";
import ProfileCard from "./ProfileCard";

function Dashboard({
  memory,
  selectedCategory,
  deleteMemory,
  editMemory,
}) {

  return (

    <div className="dashboard">

      <div className="dashboard-memory">
        
<MemoryViewer
  memory={memory}
  selectedCategory={selectedCategory}
  deleteMemory={deleteMemory}
  editMemory={editMemory}
/>
        

      </div>

      <div className="dashboard-profile">

        <ProfileCard
          memory={memory}
        />

      </div>

      <div className="dashboard-score">

        <MemoryScore
          memory={memory}
        />

      </div>

      <div className="dashboard-insights">

        <ContextInsights
          memory={memory}
        />

      </div>

    </div>

  );

}

export default Dashboard;
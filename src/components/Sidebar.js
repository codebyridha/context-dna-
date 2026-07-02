function Sidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {

  return (

    <div className="sidebar">

      <h2>🧬 Context DNA</h2>

      <h3>Memory</h3>

      <div className="memory-categories">

        <button
          className="category-btn"
          onClick={() => setSelectedCategory(null)}
        >
          💬 Chat
        </button>

        {categories.map((category) => (

          <button
            key={category.name}
            className={
              selectedCategory === category.name
                ? "active-category"
                : "category-btn"
            }
            onClick={() =>
              setSelectedCategory(category.name)
            }
          >

            {category.icon} {category.name}

          </button>

        ))}

      </div>

    </div>

  );

}

export default Sidebar;
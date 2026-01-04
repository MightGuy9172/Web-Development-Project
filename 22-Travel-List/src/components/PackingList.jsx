import { useState } from "react";
import ListItem from "./ListItem";

function PackingList({ items, setItems }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  function clearList() {
    const confirmed = window.confirm("Are you Sure u Want to clear List? ");
    if (confirmed) setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <ListItem item={item} key={item.id} setItems={setItems} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Item Added</option>
          <option value="description">Sort By Name</option>
          <option value="packed">Sort by Packed Items</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;

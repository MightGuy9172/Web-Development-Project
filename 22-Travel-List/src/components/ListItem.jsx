function ListItem({ item, setItems }) {
  const { id, description, quantity, packed } = item;

  function handleDelete() {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePacked() {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <li>
      <input type="checkbox" value={packed} onChange={handlePacked} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}

export default ListItem;

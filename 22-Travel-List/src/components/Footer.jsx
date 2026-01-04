function Footer({ items }) {
  const packedItems = items.filter((item) => item.packed).length;
  const percent = Math.round((packedItems / items.length) * 100);
  return (
    <footer className="stats">
      <em>
        {items.length === 0
          ? "Start adding Items to the List 🚀"
          : percent === 100
          ? "You are Ready To Go. ✈️"
          : `💼You have ${items.length} items on your list, and you already packed ${packedItems} item (${percent}%)`}
      </em>
    </footer>
  );
}

export default Footer;

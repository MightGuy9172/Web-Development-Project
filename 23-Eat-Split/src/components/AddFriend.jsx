import { useState } from "react";
import Button from "./Button";

function AddFriend({ onAddTheFriend, handleShowFriend }) {
  const [name, setName] = useState("");
  const image = "https://i.pravatar.cc/48";

  function handleAddFriend(e) {
    e.preventDefault();
    if (!name) return;

    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, balance: 0, id };
    onAddTheFriend(newFriend);
    setName("");
    handleShowFriend();
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label for="friend-name">🧑Friend Name</label>
      <input
        type="text"
        id="friend-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label for="friend-img">📷Image url</label>
      <input type="text" id="friend-img" value={image} readOnly />
      <Button onClick={handleAddFriend}>Add</Button>
    </form>
  );
}

export default AddFriend;

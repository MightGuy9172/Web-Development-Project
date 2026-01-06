import { useState } from "react";
import AddFriend from "./AddFriend";
import Button from "./Button";
import Friend from "./Friend";

function FriendList({
  friends,
  onAddTheFriend,
  handleSelection,
  selectedFriend,
}) {
  const [showFriendForm, setShowFriendForm] = useState(false);

  function handleShowFriend() {
    setShowFriendForm((show) => !show);
  }

  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            handleSelection={handleSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
      {showFriendForm && (
        <AddFriend
          onAddTheFriend={onAddTheFriend}
          handleShowFriend={handleShowFriend}
        />
      )}
      <Button onClick={handleShowFriend}>
        {showFriendForm ? "Close" : "Add Friend"}
      </Button>
    </div>
  );
}

export default FriendList;

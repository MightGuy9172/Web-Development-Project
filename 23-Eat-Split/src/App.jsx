import { useState } from "react";
import FriendList from "./components/FriendList";
import SplitBillForm from "./components/SplitBillForm";
import initialFriends from "./constants/dummyData";

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  console.log(friends);

  function onAddTheFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }

  function onSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <FriendList
        friends={friends}
        onAddTheFriend={onAddTheFriend}
        handleSelection={handleSelection}
        selectedFriend={selectedFriend}
      />
      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSplitBill={onSplitBill}
        />
      )}
    </div>
  );
}

export default App;

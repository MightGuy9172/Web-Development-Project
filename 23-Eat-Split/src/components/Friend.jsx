import Button from "./Button";

function Friend({ friend, handleSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  const { name, image, balance } = friend;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt="image" />
      <h3>{name}</h3>
      {balance == 0 ? (
        <p>You and {name} are even</p>
      ) : (
        <p className={balance < 0 ? "red" : "green"}>
          {balance < 0
            ? `You owe ${name} ₹${balance * -1}`
            : `${name} owes you ₹${balance}`}
        </p>
      )}
      <Button
        onClick={() => {
          handleSelection(friend);
        }}
      >
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Friend;

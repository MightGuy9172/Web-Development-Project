import { useState } from "react";
import Button from "./Button";

function SplitBillForm({ selectedFriend, onSplitBill }) {
  const { name } = selectedFriend;
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoPaying, setWhoPaying] = useState("You");

  function handleSumbit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoPaying === "You" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSumbit}>
      <h2>Split Bill With {name}</h2>
      {/* Bill Value */}
      <label for="bill-value">💰Bill Value</label>
      <input
        type="number"
        id="bill-value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      {/* Your Expense */}
      <label for="your-expense">😎Your Expense</label>
      <input
        type="number"
        id="your-expense"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      {/* Friend Expense */}
      <label for="friend-expense">🙄{name}'s Expense</label>
      <input type="number" id="friend-expense" value={paidByFriend} readOnly />
      {/* Who's Paying */}
      <label for="paying">💵Who's Paying The Bill</label>
      <select
        id="paying"
        value={whoPaying}
        onChange={(e) => setWhoPaying(e.target.value)}
      >
        <option value="You">You</option>
        <option value="Friend">{name}</option>
      </select>
      <Button onClick={handleSumbit}>Split Bill</Button>
    </form>
  );
}

export default SplitBillForm;

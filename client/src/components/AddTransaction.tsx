import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

type Props = {};

const AddTransaction = (props: Props) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction, transactions } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransactionObject = {
      id: Math.floor(Math.random() * 100000000),
      text: text, //from useState
      amount: +amount, //from useState
    };
    addTransaction(newTransactionObject);
    console.log("here", transactions);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;

import React, { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";
//Initial State
//negative amount = expense
//positive = income
function loadTransactions() {
  const transactionJSON = localStorage.getItem("TRANSACTIONS");
  if (transactionJSON == null)
    return {
      transactions: [],
    };

  const parsedJSON = JSON.parse(transactionJSON);
  const returnObject = {
    transactions: parsedJSON,
  };
  return returnObject;
}

function saveTransactions(transactions) {
  localStorage.setItem("TRANSACTIONS", JSON.stringify(transactions));
}

const initialState = loadTransactions();

//Create context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Adding Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
    const keepTransactions = initialState.transactions.filter(
      (transaction) => transaction.id !== id
    );

    saveTransactions(keepTransactions);
    console.log("hello");
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });

    saveTransactions([transaction, ...initialState.transactions]);
    console.log(initialState.transactions, "transactions after");
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        loadTransactions,
        saveTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

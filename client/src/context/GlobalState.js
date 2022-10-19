import React, { createContext, useReducer } from "react";
import axios from "axios";

import AppReducer from "./AppReducer";
//Initial State
//negative amount = expense
//positive = income

// function loadTransactions() {
//   const transactionJSON = localStorage.getItem("TRANSACTIONS");
//   if (transactionJSON == null)
//     return {
//       transactions: [],
//     };

//   const parsedJSON = JSON.parse(transactionJSON);
//   const returnObject = {
//     transactions: parsedJSON,
//   };
//   return returnObject;
// }

// function saveTransactions(transactions) {
//   localStorage.setItem("TRANSACTIONS", JSON.stringify(transactions));
// }

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Adding Actions
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }

    // const keepTransactions = initialState.transactions.filter(
    //(transaction) => transaction.id !== id
    //);

    //saveTransactions(keepTransactions);
    console.log("hello");
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/v1/transactions/",
        transaction,
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        //when we add a transaction we receive a JSON object containing success state as well as the transaction itself labelled "data",
        //so in order to access the transaction from the response we use res.data to access the entire response, then .data to access that specific field
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }

    //saveTransactions([transaction, ...initialState.transactions]);
    //console.log(initialState.transactions, "transactions after");
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
        //loadTransactions,
        //saveTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//Each case spreads the current global state, then returns it with certain changes depending on the request
//i.e DELETE_TRANSACTION spreads the state, then removes the transaction that the user passes in, and returns modified state

//We use spread to add to transaction state array rather than push as using spread creates a copy rather than directly...
//mutating state
export default (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      //We pass in the axios response (the transactions) to the transaction state, then return it
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export {};

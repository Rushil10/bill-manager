import {
  ADD_BILL,
  DELETE_BILL,
  EDIT_BILL,
  SET_BILLS,
  SET_ERROR,
  SET_LOADING,
} from "../types";

const initialState = {
  bills: [],
  loading: true,
  error: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BILLS:
      return {
        ...state,
        bills: action.payload,
        loading: false,
        error: "",
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_BILL:
      return {
        ...state,
        bills: [...state.bills, action.payload],
        loading: false,
      };
    case EDIT_BILL:
      var newBills = [...state.bills];
      var index = newBills.indexOf(action.payload.prevBill);
      if (index !== -1) {
        newBills[index].description = action.payload.bill.description;
        newBills[index].category = action.payload.bill.category;
        newBills[index].date = action.payload.bill.date;
        newBills[index].amount = action.payload.bill.amount;
        return {
          ...state,
          bills: newBills,
          loading: false,
        };
      } else {
        return { ...state };
      }
    case DELETE_BILL:
      return {
        ...state,
        bills: state.bills.filter((item, index) => item.id !== action.payload),
        loading: false,
      };
    default:
      return state;
  }
}

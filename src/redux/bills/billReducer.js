import {
  ADD_BILL,
  DELETE_BILL,
  EDIT_BILL,
  REMOVE_HIGHLIGHTED_INDEX,
  SET_BILLS,
  SET_ERROR,
  SET_HIGHLIGHTED_INDEXES,
  SET_LOADING,
} from "../types";

const initialState = {
  bills: [],
  loading: true,
  error: "",
  highlightedID: [],
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
        highlightedID: []
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        highlightedID: []
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        highlightedID: []
      };
    case ADD_BILL:
      return {
        ...state,
        bills: [...state.bills, action.payload],
        loading: false,
        highlightedID: []
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
          highlightedID: []
        };
      } else {
        return { ...state };
      }
    case DELETE_BILL:
      return {
        ...state,
        bills: state.bills.filter((item, index) => item.id !== action.payload),
        loading: false,
        highlightedID: []
      };
    case SET_HIGHLIGHTED_INDEXES:
      return {
        ...state,
        highlightedID: action.payload,
      };
    case REMOVE_HIGHLIGHTED_INDEX:
      return {
        ...state,
        highlightedID: [],
      };
    default:
      return state;
  }
}

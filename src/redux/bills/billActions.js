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

export const setBillData = () => (dispatch) => {
  fetch("data.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (response) {
      console.log(response);
      dispatch({ type: SET_BILLS, payload: response.bills });
    })
    .catch(function (error) {
      dispatch({ type: SET_ERROR, payload: "Error Occurred" });
      console.log(error);
    });
};

export const addBill = (bill) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: ADD_BILL, payload: bill });
};

export const editBill = (bill, prevBill) => (dispatch) => {
  var payload = {
    prevBill,
    bill,
  };
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: EDIT_BILL, payload: payload });
};

export const deleteBill = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  dispatch({ type: DELETE_BILL, payload: id });
};

export const setHighlights = (ids) => (dispatch) => {
  var id = [...ids];
  dispatch({ type: SET_HIGHLIGHTED_INDEXES, payload: id });
};

export const removeHighlights = (ids) => (dispatch) => {
  dispatch({ type: REMOVE_HIGHLIGHTED_INDEX, payload: [] });
};

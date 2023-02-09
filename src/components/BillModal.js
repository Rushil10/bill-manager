import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "./BillModal.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import PickDate from "./PickDate";
import store from "../redux/store";
import { addBill, editBill } from "../redux/bills/billActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #1da1f2",
    backgroundColor: "#1da1f2",
    width: "40%",
    height: "75%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("-");
}

function makeid(l) {
  var text = "";
  var char_list =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < l; i++) {
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return text;
}

function BillModal(props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm(
    props.bill
      ? {
          description: props.bill.description,
          category: props.bill.category,
          amount: props.bill.amount,
        }
      : {
          description: "",
          category: "",
          amount: "",
        }
  );

  const onSubmit = (data) => {
    if (!props.bill) {
      var bill = { ...data };
      bill.date = convertDate(startDate);
      var id = makeid(4);
      bill.id = id;
      console.log(bill);
      store.dispatch(addBill(bill));
      setStartDate(new Date());
      reset();
      props.closeModal();
    } else {
      console.log(data);
      var bill2 = { ...data };
      bill2.date = convertDate(startDate);
      bill2.id = props.bill.id;
      console.log(bill2);
      store.dispatch(editBill(bill2, props.bill));
      setStartDate(new Date());
      reset();
      props.closeModal();
    }
  };

  const changeDate = (date) => {
    setStartDate(date);
  };

  const [description, setDescription] = useState(
    props.bill ? props.bill.description : ""
  );

  const [category, setCategory] = useState(
    props.bill ? props.bill.category : ""
  );

  const [amount, setAmount] = useState(props.bill ? props.bill.amount : "");

  const [startDate, setStartDate] = useState(
    props.bill ? new Date(props.bill.date.replace("-", "/")) : new Date()
  );
  return (
    <div>
      <Modal
        isOpen={props.open}
        onRequestClose={props.closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Selected Option"
      >
        <div className="modal-container">
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input
              defaultValue={description}
              placeholder="Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="error-text">This field is required</p>
            )}
            {/* include validation with required or other standard HTML validation rules */}
            <input
              defaultValue={category}
              placeholder="Category"
              {...register("category", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.category && (
              <p className="error-text">This field is required</p>
            )}
            <input
              defaultValue={amount}
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.amount && (
              <p className="error-text">This field is required</p>
            )}
            <PickDate date={startDate} changeDate={changeDate} />
            <input type="submit" />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default BillModal;

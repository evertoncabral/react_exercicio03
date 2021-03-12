import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialValue = {
  title: "",
  url: "",
  imageUrl: "",
  price: "",
};
const PromotionForm = () => {
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id", values)
      .then((response) => {
        history.push("/");
      });
  }

  return (
    <div>
      <h1>Promotion Form</h1>
      <h2>Nova promoção</h2>
      <form onSubmit={onSubmit}>
        <div className="propotion-form__group">
          <label htmlfor="title">Título</label>
          <input id="title" name="title" type="text" onChange={onChange} />
        </div>
        <div className="propotion-form__group">
          <label htmlfor="url">Link</label>
          <input id="url" name="url" type="text" onChange={onChange} />
        </div>
        <div className="propotion-form__group">
          <label htmlfor="imageUrl">Imagem (URL)</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            onChange={onChange}
          />
        </div>
        <div className="propotion-form__group">
          <label htmlfor="price">Preço</label>
          <input id="price" name="price" type="number" onChange={onChange} />
        </div>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;

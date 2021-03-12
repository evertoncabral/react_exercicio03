import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialValue = {
  title: "",
  url: "",
  imageUrl: "",
  price: "",
};
const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValue);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/promotions/${id}`).then((response) => {
        setValues(response.data);
      });
    }
  }, []);

  function onChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault();

    const method = id ? "put" : "post";
    const url = id
      ? `http://localhost:5000/promotions/${id}`
      : `http://localhost:5000/promotions`;

    axios[method](url, values).then((response) => {
      history.push("/");
    });
  }

  return (
    <div>
      <h1>Promotion Form</h1>
      <h2>Nova promoção</h2>
      {!values ? (
        <div>Carregando......</div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="propotion-form__group">
            <label htmlfor="title">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={onChange}
              value={values.title}
            />
          </div>
          <div className="propotion-form__group">
            <label htmlfor="url">Link</label>
            <input
              id="url"
              name="url"
              type="text"
              onChange={onChange}
              value={values.url}
            />
          </div>
          <div className="propotion-form__group">
            <label htmlfor="imageUrl">Imagem (URL)</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              onChange={onChange}
              value={values.imageUrl}
            />
          </div>
          <div className="propotion-form__group">
            <label htmlfor="price">Preço</label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={onChange}
              value={values.price}
            />
          </div>
          <div>
            <button type="submit">Salvar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PromotionForm;

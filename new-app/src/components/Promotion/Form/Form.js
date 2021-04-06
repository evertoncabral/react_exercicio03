import React, { useEffect } from "react";
import "./Form.css";
import { useHistory } from "react-router-dom";
import useApi from "components/utils/useApi";
import { Formik, Form, Field } from "formik";
import schema from "./schema";

const initialValue = {
  title: "",
  url: "",
  imageUrl: "",
  price: "",
};
const PromotionForm = ({ id }) => {
  const history = useHistory();
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: "get",
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : `/promotions`,
    method: id ? "put" : "post",
    onCompleted: (response) => {
      if (!response.error) {
        history.push("/");
      }
    },
  });

  useEffect(() => {
    if (id) {
      load();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onSubmit(formValues) {
    save({
      data: formValues,
    });
  }

  const values = id ? loadInfo.data : initialValue;

  return (
    <div>
      <h1>Promotion Form</h1>
      <h2>Nova promoção</h2>
      {!values ? (
        <div>Carregando......</div>
      ) : (
        <Formik
          initialValues={values}
          onSubmit={onSubmit}
          validationSchema={schema}
          render={({ errors, touched }) => (
            <Form>
              {saveInfo.loading && <span>Salvando dados...</span>}
              <div className="propotion-form__group">
                <label htmlfor="title">Título</label>
                <Field id="title" name="title" type="text" />
                {errors.title && <span className="promotion-form_error-message">{errors.title}</span>}
              </div>
              <div className="propotion-form__group">
                <label htmlfor="url">Link</label>
                <Field id="url" name="url" type="text" />
              </div>
              <div className="propotion-form__group">
                <label htmlfor="imageUrl">Imagem (URL)</label>
                <Field id="imageUrl" name="imageUrl" type="text" />
              </div>
              <div className="propotion-form__group">
                <label htmlfor="price">Preço</label>
                <Field id="price" name="price" type="number" />
              </div>
              <div>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          )}
        />
      )}
    </div>
  );
};

export default PromotionForm;

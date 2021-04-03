import React, { useState } from "react";
import "./List.css";
import PromotionCard from "components/Promotion/Card/Card";
import PromotionModal from "components/Promotion/Modal/Modal";

const PromotionList = ({ loading, error, promotions }) => {
  const [promotionID, setPromotionID] = useState(null);

  if (error) {
    return <div>Erro........</div>;
  }

  if (promotions === null) {
    return <div>Carregando........</div>;
  }
  if (promotions.length === 0) {
    return <div> Nenhum resultado encontrado</div>;
  }
  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          onclickComments={() => setPromotionID(promotion.id)}
        />
      ))}
      {loading && (
        <div>Carregando mais promoções.....</div>
      )}
      {promotionID && (
        <PromotionModal
          promotionID={promotionID}
          onClickClose={() => setPromotionID(null)}
        ></PromotionModal>
      )}
    </div>
  );
};
export default PromotionList;

import React, { useState } from "react";
import "./List.css";
import PromotionCard from "components/Promotion/Card/Card";
import UIModal from "components/UI/Modal/Modal";

const PromotionList = ({ loading, error, promotions }) => {
  const [promotionID, setPromotionID] = useState(null);

  if (error) {
    return <div>Erro........</div>;
  }

  if (loading || promotions === null) {
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
      <UIModal
        isOpen={Boolean(promotionID)}
        onClickClose={() => setPromotionID(null)}
      >
        <h1>Comentários do Modal UI.</h1>
      </UIModal>
    </div>
  );
};
export default PromotionList;

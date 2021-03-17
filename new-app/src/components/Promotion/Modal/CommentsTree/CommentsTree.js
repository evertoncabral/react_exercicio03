import React from "react";
import "./CommentsTree.css";

const PromotionModalCommentsTree = ({ comments }) => {
  if (!comments) {
    return <div> Carregando..</div>;
  }
  return (
    <ul className="promotion-modal-comments-tree">
      {comments.map((item) => (
        <li>
          <img
            src={item.user.avatarURL}
            alt={`foto de avatar ${item.user.name}`}
            className="promotion-modal-comments-tree__item__avatar"
          ></img>
          <div className="promotion-modal-comments-tree__item__info">
            <span className="promotion-modal-comments-tree__item__name">
              {item.user.name}
            </span>
            <p> {item.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PromotionModalCommentsTree;

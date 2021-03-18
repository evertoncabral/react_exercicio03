import React, { useState } from "react";
import "./CommentsTree.css";

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
  const [comment, setComment] = useState("");
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  if (!comments) {
    return <div> Carregando..</div>;
  }
  return (
    <ul className="promotion-modal-comments-tree">
      {comments.map((item) => (
        <li className="promotion-modal-comments-tree__item">
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
            <button
              type="button"
              className="promotion-modal-comments-tree__answer-button"
              onClick={() => {
                setComment("");
                setActiveCommentBox(
                  activeCommentBox === item.id ? null : item.id
                );
              }}
            >
              Responder
            </button>
            {activeCommentBox === item.id && (
              <div className="promotion-modal-comments-tree__comment-box">
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />

                <button
                  type="button"
                  className="promotion-modal-comments-tree__send-button"
                  onClick={() => {
                    sendComment(comment, item.id);
                    setComment("");
                    setActiveCommentBox(null);
                  }}
                >
                  Enviar
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

PromotionModalCommentsTree.defaulProps = {
  sendComment: () => {},
};

export default PromotionModalCommentsTree;

import React, { useEffect, useState } from "react";
import UIModal from "components/UI/Modal/Modal";
import useApi from "components/utils/useApi";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";
import "./Modal.css";

const PromotionModal = ({ promotionID, onClickClose }) => {
  const [comment, setComment] = useState("");

  const [load, loadInfo] = useApi({
    url: "/comments",
    params: {
      promotionID,
      _expand: "user",
    },
  });

  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "POST",
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    try {
      await sendComment({
        data: {
          userID: 1,
          promotionID,
          comment,
        },
      });
      setComment("");
      load();
    } catch (error) {}
  }

  async function sendAnswer(text, parentId) {
    await sendComment({
      data: {
        userID: 1,
        promotionID,
        comment: text,
        parentId,
      },
    });
    load();
  }

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
        <textarea
          placeholder="comentário..."
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />
        <button type="submit" disabled={sendCommentInfo.loading}>
          {sendCommentInfo.loading ? "Enviando.." : "Enviar"}
        </button>
      </form>
      <PromotionModalCommentsTree
        comments={loadInfo.data}
        sendComment={sendAnswer}
      />
    </UIModal>
  );
};

export default PromotionModal;

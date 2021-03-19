import React, { useState, useMemo } from "react";
import "./CommentsTree.css";

function getTree(list) {
  if (!list) {
    return [];
  }
  const roots = [];
  const childrenByParentID = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }

    if (!childrenByParentID[item.parentId]) {
      childrenByParentID[item.parentId] = [];
    }
    childrenByParentID[item.parentId].push(item);
  });

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }
    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentID[node.id]),
    }));
  }

  return buildNodes(roots);
}

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
  const tree = useMemo(() => getTree(comments), [comments]);
  const [comment, setComment] = useState("");
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  if (!comments) {
    return <div> Carregando..</div>;
  }

  function renderItem(item) {
    return (
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
          {item.children && renderList(item.children)}
        </div>
      </li>
    );
  }

  function renderList(list) {
    return (
      <ul className="promotion-modal-comments-tree">{list.map(renderItem)}</ul>
    );
  }
  return renderList(tree);
};

PromotionModalCommentsTree.defaulProps = {
  sendComment: () => {},
};

export default PromotionModalCommentsTree;

import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import PromotionList from "components/Promotion/List/List";
import { Link } from "react-router-dom";
import useApi from "components/utils/useApi";

const PromotionSearch = () => {
  const mountRef = useRef(null);

  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    debounceDelay: 300,
    debounced:true,
    url: "/promotions",
    method: "get",
    params: {
      _embed: "comments",
      _order: "desc",
      _sort: "id",
      title_like: search || undefined,
    },
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
    });
    if (!mountRef.current) {
      mountRef.current = true;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>Promo Show</h1>
        <Link to="/create">Nova Promoção</Link>
      </header>

      <input
        type="search"
        className="promotion-search__input"
        placeholder="Pesquise Aqui"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
    </div>
  );
};

export default PromotionSearch;

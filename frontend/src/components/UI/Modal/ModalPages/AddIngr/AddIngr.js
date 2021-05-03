import React, { useEffect, useState } from "react";

import "./style.scss";
import DropDown from "../../../dropDown/DropDown";

const INGREDIENT_TYPES = [
  { label: "штуки", id: "sht" },
  { label: "грами", id: "gr" },
  { label: "мілілітри", id: "ml" },
];

const AddIngr = ({ data }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "tasty_ingr",
      JSON.stringify({
        name,
        type,
        weight,
      })
    );
  }, [name, type, weight]);

  return (
    <div className="add-ingr-form">
      <h3>{"Добавить ингридиент"}</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Ингридиент"
      />
      <DropDown
        items={INGREDIENT_TYPES}
        options={{
          labelPosition: "left",
          width: "200px",
          labelText: "тип:",
          placeholder: "тип",
        }}
        selected={type}
        onSelectItemHandler={onSetNewType}
      />
      <input
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        type="number"
        placeholder="Вес"
      />
    </div>
  );

  function onSetNewType(el) {
    setType(el);
    setWeight("");
  }
};

export default AddIngr;

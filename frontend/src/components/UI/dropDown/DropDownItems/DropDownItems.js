import React from "react";

const DropDownItems = ({ items, onSelectItem, selected, cancel, disabled }) => {
  return (
    <>
      {items.map((el) => {
        const itemIsDisabled =
          disabled && disabled[0]
            ? disabled.filter((el1) => el1.id === el.id)[0]
            : false;
        const handler = itemIsDisabled ? null : () => onSelectItem(el);
        const cN = itemIsDisabled
          ? "disabled"
          : selected && selected.id === el.id
          ? "selected"
          : "";

        return (
          <li key={el.id} onClick={handler} className={cN}>
            {el.label}
            {el.secondLabel && <span>{el.secondLabel}</span>}
          </li>
        );
      })}
    </>
  );
};

export default DropDownItems;

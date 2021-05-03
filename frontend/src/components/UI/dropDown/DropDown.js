import React, { useEffect, useState, useRef } from "react";

import CflowDropDownArrowDown from "./CflowDropDownArrowDown";
import DropDownItems from "./DropDownItems/DropDownItems";

import "./style.scss";

const DropDown = (props) => {
  const { items, onSelectItemHandler, selected, options, disabled } = props;

  const [opened, setOpened] = useState({
    className: "collapsed",
    isOpened: false,
  });
  const node = useRef("");

  useEffect(() => {
    if (opened.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened.isOpened]);

  const classNameWidth = options.width ? "a" + options.width : "";

  return (
    <>
      <div className={"cflow-dropdown-wrapper black"} ref={node}>
        <div className={"cflow-dropdown-toggle-btn " + classNameWidth}>
          {options.labelText && (
            <label className={"big-label cflow-label " + options.labelPosition}>
              {options.labelText}
            </label>
          )}
          <button
            onClick={onDropDownToggle}
            type="button"
            className="black-button"
          >
            <div className="cflow-dropdown-caption">
              {selected && <p>{selected.label}</p>}
            </div>
            <div
              className="cflow-icon cflow-supper-small-icon drop-down-arrow"
              style={{ width: "15px", height: "15px" }}
            >
              <CflowDropDownArrowDown />
            </div>
          </button>
        </div>
        <div className={"cflow-dropdown-options-wrapper " + opened.className}>
          <ul className={"cflow-dropdown-opt"} style={{ border: "none" }}>
            <DropDownItems
              items={items}
              disabled={disabled}
              selected={selected}
              onSelectItem={onSelectItem}
              cancel={options.cancel}
            />
          </ul>
        </div>
      </div>
    </>
  );

  function onSelectItem(item) {
    if (selected && selected.id && item.id === selected.id) {
      onDropDownToggle();
      return;
    }

    onDropDownToggle();
    onSelectItemHandler(item);
  }

  function handleClickOutside(event) {
    if (node.current.contains(event.target)) {
      return;
    } else {
      setOpened({ className: "collapsed", isOpen: false });
    }
  }

  function onDropDownToggle() {
    const newOpened = {
      isOpen: !opened.isOpen,
      className: opened.isOpen ? "collapsed" : "opened",
    };

    setOpened(newOpened);
  }
};

export default DropDown;

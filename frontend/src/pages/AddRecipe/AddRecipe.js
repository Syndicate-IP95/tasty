import React, { useState } from "react";

import ModalWindow from "../../components/UI/Modal/ModalWindow";
import Close from "../../assets/icons/Close";
import {
  sOnAddIngItem,
  sOnDeleteIng,
  onSetTitle,
  onSetContent,
} from "./service";

import "./style.scss";

const AddRecipe = () => {
  const [uploadedFile, setUploadedFile] = useState({
    file: null,
    imagePreviewUrl: null,
  });
  const [modalInfo, setModalInfo] = useState({});
  const [ings, setIngs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const formIsValid = ings.length !== 0;

  return (
    <div className="add-recipe-content">
      <ModalWindow info={modalInfo} />
      <h1>{"Створити рецепт"}</h1>
      <div className="add-recipe-form">
        <div className="add-recipe-form_header">
          <input
            value={title}
            onChange={(e) => onSetTitle(e, { setTitle })}
            placeholder={"Назва"}
            className="casual-input big-input"
          />
          <div className="author-block">
            <p>{"Автор:"}</p>
            <input
              type="text"
              value={"Петрук П."}
              className="casual-input"
              disabled
            />
          </div>
          {!uploadedFile.file && (
            <label className="add-image-button" htmlFor="add-image">
              <i class="fas fa-file-upload" />
              {"Додати картинку до рецепту"}
            </label>
          )}
          {uploadedFile.file && (
            <div className="image-exists-div">
              <p>{"Фото: "}</p>
              <button
                onClick={() =>
                  setUploadedFile({ file: null, imagePreviewUrl: null })
                }
              >
                {"Удалить фото"}
              </button>
            </div>
          )}
          {uploadedFile.imagePreviewUrl && (
            <img
              src={uploadedFile.imagePreviewUrl}
              alt=""
              className="uploaded-image"
            />
          )}
          <input
            onChange={onSelectImageHandler}
            style={{ display: "none", width: "0px", height: "0px" }}
            id="add-image"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="add-recipe-form_ingr">
          <p>{"Список ингридиентов:"}</p>
          {ings.length !== 0 && (
            <ul className="ingredients">
              {ings.map((el) => (
                <li key={el.label}>
                  <div
                    onClick={() => sOnDeleteIng(el.name, { ings, setIngs })}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <Close />
                  </div>
                  <p>
                    {el.name +
                      " - " +
                      el.weight +
                      " " +
                      (el.type.id === "sht"
                        ? "шт."
                        : el.type.id === "gr"
                        ? "гр."
                        : "мл.")}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {ings.length === 0 && (
            <ul className="ingredients">
              <li>
                <p>Добавьте ингридиенты...</p>
              </li>
            </ul>
          )}
          <button
            onClick={onAddIng}
            className={ings.length >= 20 ? "disabled" : null}
          >
            {"Добавить ингридиент"}
          </button>
        </div>
        <div className="add-recipe-form_content">
          <p>{"Рецепт:"}</p>
          <textarea
            value={content}
            onChange={(e) => onSetContent(e, { setContent })}
          />
        </div>
        <button
          onClick={formIsValid ? onCreateRecipe : () => {}}
          disabled={!formIsValid}
          className={formIsValid ? "create-button" : "create-button disabled"}
        >
          {"Создать рецепт"}
        </button>
      </div>
    </div>
  );

  function onSelectImageHandler(e) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setUploadedFile({ file: null, imagePreviewUrl: null });
    }
  }

  function onAddIng() {
    setModalInfo({
      type: "add-ingr-modal",
      cbNo: () => {
        setModalInfo({});
        localStorage.removeItem("tasty_ingr");
      },
      cbYes: () => sOnAddIngItem({ ings, setIngs, setModalInfo }),
      labelYes: "Добавить",
    });
  }

  function onCreateRecipe() {}
};

export default AddRecipe;

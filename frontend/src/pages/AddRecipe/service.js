export const sOnAddIngItem = (settingData) => {
  const { ings, setIngs, setModalInfo } = settingData;

  const item = JSON.parse(localStorage.getItem("tasty_ingr"));

  if (
    !item.type.id ||
    item.name === "" ||
    item.weight === "" ||
    +item.weight <= 0
  ) {
    return;
  }

  const newItems = [...ings];
  newItems.push(item);
  setIngs(newItems);
  setModalInfo({});
  localStorage.removeItem("tasty_ingr");
};

export const sOnDeleteIng = (name, settingData) => {
  const { ings, setIngs } = settingData;

  const newItems = [...ings].filter((el) => el.name !== name);
  setIngs(newItems);
};

export const onSetTitle = (e, settingData) => {
  const value = e.target.value;
  const { setTitle } = settingData;
  if (value.length > 200) {
    setTitle(value.slice(0, 200));
  } else {
    setTitle(value);
  }
};

export const onSetContent = (e, settingData) => {
  const value = e.target.value;
  const { setContent } = settingData;
  if (value.length > 2000) {
    setContent(value.slice(0, 2000));
  } else {
    setContent(value);
  }
};

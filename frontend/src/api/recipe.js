import { service } from "../config/api";

export const saveRecipe = (formData) => {
  return service.post("/recipe/save", formData, {
    headers: {
      Authorization: localStorage.getItem("tasty_token"),
    },
  });
};

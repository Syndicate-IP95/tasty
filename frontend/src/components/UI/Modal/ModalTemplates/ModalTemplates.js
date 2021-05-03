import { EmptyPage, Sentence, AddIngr } from "../ModalPages";

export const ModalTemplates = (data) => {
  switch (data.type) {
    case "sentence-modal":
      return <Sentence data={data} />;
    case "add-ingr-modal":
      return <AddIngr data={data} />
    default:
      return <EmptyPage />;
  }
};

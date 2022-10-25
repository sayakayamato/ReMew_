import { useLocation } from "react-router-dom";
import { Header } from "../templates/Header";
import { CollectFeedback } from "./CollectFeedback";

export const CollectFeedbackWithHeader = () => {
  const initialText = useLocation().state;
  return (
    <>
      <Header />
      <CollectFeedback initialText={initialText} />
    </>
  );
};

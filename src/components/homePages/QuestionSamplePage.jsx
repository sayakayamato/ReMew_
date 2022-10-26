import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { QuestionSampleContents } from "./QuestionSampleContents";
import { useLocation } from "react-router-dom";

import { useDataList } from "../../hooks/useDataList";
import { Header } from "../templates/Header";
// import { useAuthContext } from "../../contexts/AuthContext";

export const QuestionSamplePage = () => {
  // const { user } = useAuthContext();
  //useLocationを使ってQuestionDetailContnetsからのstateを受け取る
  const categoryName = useLocation().state.categoryName;
  const categoryId = useLocation().state.categoryId;

  const { data } = useDataList("questionSamples", "categoryId", categoryId);
  // console.log(user);
  // if (!user) {
  //   console.log("please sign in");
  //   return <Navigate replace to="/login" />;
  // }

  return (
    <>
      <Header />
      <Link to="/">
        <p className="return_button">戻る</p>
      </Link>
      <p className="caterory_name">{categoryName}</p>
      <div>
        <ul>
          {data &&
            Object.entries(data).map(([key, item]) => (
              <li className="detail_question" key={key}>
                <QuestionSampleContents question={String(item.content)} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

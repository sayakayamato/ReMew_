import { Link, useParams } from "react-router-dom";
import { ChatContents } from "./ChatContents";
import { useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import "../../css/Chats.css";
import { useDataRead } from "../../hooks/useDataRead";
import { useEffect, useState } from "react";
import { Header } from "../templates/Header";
import { useAuthContext } from "../../contexts/AuthContext";

export function Chats() {
  //useLocationを使ってFeedContentsから値を受け取る
  const { user } = useAuthContext();
  const location = useLocation();
  const dataRead = useDataRead;
  const params = useParams();

  const [questiontext, setQuestiontext] = useState("Loading...");
  const feedId = params.feedID;

  useEffect(() => {
    if (!location.state) {
      dataRead("questions", params.feedID).then((res) => {
        setQuestiontext(res.content);
      });
    } else {
      setQuestiontext(location.state.whatfeedtext);
    }
  }, []);
  return (
    <>
      {user && <Header />}
      <div className="chats_header">
        <Link to="/">
          <ChevronLeftIcon boxSize={6} className="return_button" />
        </Link>
      </div>

      <div className="chats_question">{questiontext}</div>
      <ChatContents feedId={feedId} />
    </>
  );
}

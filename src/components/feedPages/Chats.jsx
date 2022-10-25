import { Link, useParams } from "react-router-dom";
import { ChatContents } from "./ChatContents";
import { useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import "../../css/Chats.css";
import { useDataRead } from "../../hooks/useDataRead";
import { useEffect, useState } from "react";
import { Header } from "../templates/Header";

export function Chats() {
  //useLocationを使ってFeedContentsから値を受け取る
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
      <Header />
      <div className="chats_header">
        <div>
          <Link to="/">
            <ChevronLeftIcon boxSize={6} className="return_button" />
          </Link>
        </div>
        <div className="chats_title">
          <p className="chat_title_text">フィードバックを送信する</p>
        </div>
      </div>

      <div className="chats_question">{questiontext}</div>
      <ChatContents feedId={feedId} />
    </>
  );
}

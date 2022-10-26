import { useNavigate } from "react-router-dom";
import { FeedComponent } from "./FeedComponent";

export function FeedContents() {
  const navigate = useNavigate();
  const NewFeedContents = () => navigate("/CollectFeedback");

  return (
    <>
      <FeedComponent friendsMode={true} />
      <button onClick={NewFeedContents} className="feed_add_button">
        +
      </button>
    </>
  );
}

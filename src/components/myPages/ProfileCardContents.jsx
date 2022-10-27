import { Box } from "@chakra-ui/react";
import { useDataList } from "../../hooks/useDataList";

import "../../css/Proflie_Card.css";

export function ProfileCardContents({ profTitle, categoryId, displayUser }) {
  const dataList = useDataList;
  const tableName = "profs";
  const queryKey = "combCatgoryUserId";
  const queryValue = categoryId + displayUser.userId;
  const { data } = dataList(tableName, queryKey, queryValue);

  return (
    <>
      <div className="card_wrap">
        <div className="card_input_wrap">
          {data && Object.keys(data).length ? (
            Object.entries(data).map(([key, item]) => {
              return (
                <Box
                  className="feed_box"
                  bg={"rgba(255, 255, 255, 0.7)"}
                  w="100%"
                  p={4}
                  color="black"
                  mb={5}
                  key={key}
                >
                  <p className="feed_user_name">{item.profContent}</p>
                  <p className="feed_contents_text" id={key}>
                    {item.content}
                  </p>
                </Box>
              );
            })
          ) : (
            <p>まだ回答がありません</p>
          )}
        </div>
      </div>
    </>
  );
}

import {
  ref,
  onValue,
  child,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

export const useMultiDataList = (tableName, queryKey, queryValueList) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const rootRef = ref(db);
    const tableRef = child(rootRef, tableName);
    const dataArray = [];
    for (let i = 0; i < queryValueList.length; i++) {
      const listRef = query(
        tableRef,
        orderByChild(queryKey),
        equalTo(queryValueList[i])
      );
      onValue(listRef, (snapshot) => {
        const newData = snapshot.val();
        if (newData) {
          Object.entries(newData).map(([key, item]) => {
            const dataWithId = {
              id: key,
              ...item,
            };
            dataArray.push(dataWithId);
          });
        }
      });
    }
    setData(dataArray);
  }, []);

  return { data };
};

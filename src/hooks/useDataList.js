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

export const useDataList = (tableName, queryKey, queryValue) => {
  const [data, setData] = useState();
  // const [errors, setErrors] = useState(null);

  useEffect(() => {
    const rootRef = ref(db);
    const tableRef = child(rootRef, tableName);
    // クエリ処理
    const listRef = query(
      tableRef,
      orderByChild(queryKey),
      equalTo(queryValue)
    );

    onValue(listRef, (snapshot) => {
      const newData = snapshot.val();
      setData(newData == null ? {} : newData);
    });
  }, []);

  return { data };
};

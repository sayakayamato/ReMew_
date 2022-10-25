import { ref } from "firebase/database";

export const databaseRef = (db) => {
  return ref(db);
};

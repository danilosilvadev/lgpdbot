import { openDB } from "idb/with-async-ittr.js";
import { FIREBASE_KEY } from "../keys";

const DB = "firebaseLocalStorageDb";
const TABLE = "firebaseLocalStorage";

const dbPromise = openDB(DB, 1, {
  upgrade(db) {
    db.createObjectStore(TABLE);
  }
});

export const idbKeyval = {
  async get(key) {
    return (await dbPromise).get(TABLE, key);
  },
  async set(key, val) {
    return (await dbPromise).put(TABLE, val, key);
  },
  async delete(key) {
    return (await dbPromise).delete(TABLE, key);
  },
  async clear() {
    return (await dbPromise).clear(TABLE);
  },
  async keys() {
    return (await dbPromise).getAllKeys(TABLE);
  }
};

export const getUIDFromIDB = () => {
  return idbKeyval.get(FIREBASE_KEY).then(res => {
    return res && res.value.uid;
  });
};

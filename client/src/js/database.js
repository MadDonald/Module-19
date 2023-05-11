import { openDB } from 'idb';

const dbName = 'jate';
const dbVersion = 1;

const initdb = async () =>
  openDB(dbName, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(dbName)) {
        console.log(`${dbName} database already exists`);
        return;
      }
      db.createObjectStore(dbName, { keyPath: 'id', autoIncrement: true });
      console.log(`${dbName} database created`);
    },
  });

const getDbConnection = async () => await openDB(dbName, dbVersion);

const getObjectStore = (db, storeName, mode) => db.transaction(storeName, mode).objectStore(storeName);

export const putDb = async (content) => {
  console.log('Put to the Database');

  const db = await getDbConnection();
  const store = getObjectStore(db, dbName, 'readwrite');
  
  const request = store.put({id: 1,value: content});
  const result = await request;
  console.log('Saved to Database', result);
};

export const getDb = async () => {
  console.log('Get to the Database')

  const db = await getDbConnection();
  const store = getObjectStore(db, dbName, 'readonly');
  
  const request = store.get(1);
  const result = await request;
  
  console.log('result.value', result);
  return result?.value;
};

initdb();

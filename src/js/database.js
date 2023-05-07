import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Save content to the database
export const putDb = async (content)  => {
  console.log('Saving content to the database...');

  // Open a connection to the database and specify the version we want to use.
  const db = await openDB('my-db', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('my-store', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('my-store');

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Content saved to the database:', result);
};

// Retrieve all content from the database
export const getDb = async () => {
  console.log('Retrieving all content from the database...');

  // Open a connection to the database and specify the version we want to use.
  const db = await openDB('my-db', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('my-store', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('my-store');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request and return the data.
  const result = await request;
  console.log('Retrieved all content from the database:', result);
  return result?.value;
};

// Initialize the database
initdb();

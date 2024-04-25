import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jateStore')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jateStore', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jateStore', 'readwrite');
    const store = tx.objectStore('jateStore');
    const request = store.put({ jate: content });
    const result = await request;
    console.log('Text saved to the database', result);
  } catch (error) {
    console.error('Error saving text to the database');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jateStore', 'readonly');
    const store = tx.objectStore('jateStore');
    const request = store.getAll();
    const result = await request;
    console.log(result);
  } catch (error) {
    console.error('Error retrieving data from the database');
  }
};

  initdb();

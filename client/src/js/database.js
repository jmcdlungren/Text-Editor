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

// Adds logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');

  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Remove the 'id' property if it exists
  const { id, ...data } = content;

  return new Promise((resolve, reject) => {
    const request = store.put(data);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    tx.oncomplete = () => {
      console.log('Transaction completed successfully');
      resolve();
    };

    tx.onerror = () => {
      console.error('Transaction error:', tx.error);
      reject(tx.error);
    };
  });
};

// Adds logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the database');

  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    tx.oncomplete = () => {
      console.log('Transaction completed successfully');
      resolve();
    };

    tx.onerror = () => {
      console.error('Transaction error:', tx.error);
      reject(tx.error);
    };
  });
};


initdb();

import memjs from 'memjs';

const memcached = memjs.Client.create("localhost:11211");

export function getFromCache<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
      if (err) {
        reject(err);
      } else if (data) {
        try {
          const parsedData: T = JSON.parse(data.toString());
          resolve(parsedData);
        } catch (parseError) {
          console.error("Error parsing cached data:", parseError);
          resolve(null); // Resolve with null on parsing error
        }
      } else {
        resolve(null);
      }
    });
  });
}

export function setToCache<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
  return new Promise((resolve, reject) => {
    const stringifiedValue = JSON.stringify(value);
    memcached.set(key, stringifiedValue, { expires: ttl }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function deleteFromCache(key: string): Promise<void> {
  return new Promise((resolve,reject) => {
    memcached.delete((key),(err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}
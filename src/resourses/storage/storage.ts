import { IStore } from 'types';

type StringOrNumber = string | number;
type StorageDictionary = Record<StringOrNumber, StringOrNumber>;

class Storage implements IStore<StorageDictionary> {
  private static dictionary: StorageDictionary = {};

  public removeAll() {
    Storage.dictionary = {};
  }

  public getAll() {
    return Storage.dictionary;
  }

  public findByKey(key: StringOrNumber) {
    const value = Storage.dictionary[key];
    if (!value) {
      return null;
    }

    return { [key]: Storage.dictionary[key] };
  }

  public removeByKey(key: StringOrNumber) {
    const valueToDelete = this.findByKey(key);
    if (!valueToDelete) {
      throw new Error('Value not found');
      return;
    }

    delete Storage.dictionary[key];
  }

  public add(key: StringOrNumber, value: StringOrNumber, ttl?: number) {
    const valueToDelete = this.findByKey(key);
    if (valueToDelete) {
      throw new Error('Value already exists');
      return;
    }

    Storage.dictionary[key] = value;

    if (ttl) {
      setTimeout(() => {
        delete Storage.dictionary[key];
      }, ttl);
    }
  }
}

export const StorageApi = new Storage();

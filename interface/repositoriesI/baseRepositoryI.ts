// use have created it a genric interface
export interface BaseRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    findOne(query: object): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
  }
  
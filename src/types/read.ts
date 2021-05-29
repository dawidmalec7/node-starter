export interface Read<T> {
  find(item: T): Promise<T[]>;
  findById(id: string): Promise<T>;
}

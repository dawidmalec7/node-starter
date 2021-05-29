import { Write } from "types/Write";
import { Read } from "types/Read";
import { ID } from "types/commons";

// that class only can be extended
export abstract class BaseRepository<T> implements Write<T>, Read<T> {
  create<M>(item: M): Promise<T> {
    throw new Error("Method not implemented.");
  }
  update<M>(id: ID, item: M): Promise<T> {
    throw new Error("Method not implemented.");
  }
  delete(id: ID): Promise<number> {
    throw new Error("Method not implemented.");
  }
  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: ID): Promise<T> {
    throw new Error("Method not implemented.");
  }
}

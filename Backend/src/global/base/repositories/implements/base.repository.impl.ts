import { IBaseRepository } from '../base.repository';

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private model: any) {}

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: T): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.model.delete({ where: { id } });
    return !!deleted;
  }
}

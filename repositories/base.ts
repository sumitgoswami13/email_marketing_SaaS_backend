export class BaseRepository<T> {
    protected dbModel: any;
  
    constructor(dbModel: any) {
      this.dbModel = dbModel;
    }
  
    async findById(id: string): Promise<T | null> {
      return this.dbModel.findOne({ where: { id } });
    }
  
    async findAll(): Promise<T[]> {
      return this.dbModel.findAll();
    }
  
    async findOne(query: object): Promise<T | null> {
      return this.dbModel.findOne({ where: query });
    }
  
    async create(data: Partial<T>): Promise<T> {
      return this.dbModel.create(data);
    }
  
    async update(id: string, data: Partial<T>): Promise<T | null> {
      const item = await this.findById(id);
      if (!item) return null;
      return this.dbModel.update(data);
    }
  
    async delete(id: string): Promise<boolean> {
      const result = await this.dbModel.destroy({ where: { id } });
      return result > 0;
    }
  }
  
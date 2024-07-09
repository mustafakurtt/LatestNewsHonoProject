  import { Database } from "bun:sqlite";

  export default abstract class SqliteBaseDal<T> {
    db: Database;
    tableName: string;
      
    private insertStatement: string;
    private updateStatement: string;
    private deleteStatement: string;
    private getByIdStatement: string;
    private getAllStatement: string;
    constructor(private type: new () => T) {
      
      this.tableName = type.name.toLowerCase() + "s"; // T'nin class adını kullanarak tablo adı oluştur
      this.db = new Database("database.sqlite", { create: true, strict: true });
      this.checkTableExists();
      this.insertStatement = this.generateInsertStatement(new type());
      this.updateStatement = this.generateUpdateStatement(new type());
      this.deleteStatement = `DELETE FROM ${this.tableName} WHERE id = ?`;
      this.getByIdStatement = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      this.getAllStatement = `SELECT * FROM ${this.tableName}`;
    }

    async create(data: T): Promise<any> {
      console.log(this.insertStatement);
      
      const statement = this.db.prepare(this.insertStatement);
      this.bindParameters(statement, data);
    }

    async update(id: string, data: T): Promise<any> {
      const statement = this.db.prepare(this.updateStatement);
      this.bindParameters(statement, data, id);
    }

    async delete(id: string): Promise<any> {
      const statement = this.db.prepare(this.deleteStatement);
      return statement.run(id);
    }
    async getById(id: string): Promise<any> {
      const statement = this.db.prepare(this.getByIdStatement);
      return statement.get(id);
    }
    async getAll(): Promise<any> {
      const statement = this.db.prepare(this.getAllStatement);
      return statement.all();
    }

    private generateInsertStatement(obj: T): string {
      const columns = Object.keys(obj as any);
      const placeholders = columns.map(() => "?").join(", ");
      const statement = `INSERT INTO ${this.tableName} (${columns.join(
        ", "
      )}) VALUES (${placeholders})`;
      return statement;
    }
    private generateUpdateStatement(obj: T): string {
      const columns = Object.keys(obj as any);
      const placeholders = columns.map((column) => `${column} = ?`).join(", ");
      const statement = `UPDATE ${this.tableName} SET ${placeholders} WHERE id = ?`;
      return statement;
    }
    private checkTableExists(): void {
      const createTableStatement = this.generateCreateTableStatement(
        new this.type()
      );
      this.db.run(createTableStatement);
    }
    private generateCreateTableStatement(obj: T): string {
      const columns = Object.keys(obj as any)
        .map((column) => `${column} TEXT`)
        .join(", ");
      return `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columns})`;
    }

    private bindParameters(statement: any, data: T, id?: string): void {
      const values: any[] = [];
      const columns = Object.keys(data as any);

      columns.forEach((column) => {
        const value = data[column as keyof T];

        console.log(`Column: ${column}, Value: ${value}`);
        
        
        if (Array.isArray(value) || typeof value === "object") {
          values.push(JSON.stringify(value));
        } else {
          values.push(value);
        }
      });

      if (id) {
        // Eğer id parametresi varsa, update işlemidir; id değerini sona ekliyoruz
        values.push(id);
      }
      statement.run(values);
    }
  }

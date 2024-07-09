import { Database } from "bun:sqlite";
import IBaseDal from "../../abstract/IBaseDal";
import InstanceService from "../../../InstanceService";
import DataAccessError from "../../../utils/errors/DataAccessError";

export default abstract class SqliteBaseDal<T> implements IBaseDal<T> {
  db: Database;
  tableName: string;

  private insertStatement: string;
  private updateStatement: string;
  private deleteStatement: string;
  private getByIdStatement: string;
  private getAllStatement: string;
  constructor(private type: new () => T, interfaceName: string) {
    this.tableName = type.name.toLowerCase() + "s"; // T'nin class adını kullanarak tablo adı oluştur
    this.db = new Database("database.sqlite", { create: true, strict: true });
    this.checkTableExists();
    this.insertStatement = this.generateInsertStatement(new type());
    this.updateStatement = this.generateUpdateStatement(new type());
    this.deleteStatement = `DELETE FROM ${this.tableName} WHERE id = ?`;
    this.getByIdStatement = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    this.getAllStatement = `SELECT * FROM ${this.tableName}`;
    InstanceService.set(interfaceName, this);
  }

  async create(data: T): Promise<T | null> {
    console.log(`sqliteBaseDal.create`);

    const statement = this.db.prepare(this.insertStatement);
    const response: any = this.bindParameters(statement, data);
    if (response.changes) {
      return data as T;
    }
    return null;
  }

  async update(id: string, data: T): Promise<T | null> {
    console.log(`sqliteBaseDal.update`);
    const statement = this.db.prepare(this.updateStatement);
    const response = this.bindParameters(statement, data, id);
    if (response.changes) return data;
    return null;
  }
  
  async delete(id: string): Promise<string | null> {
    console.log(`sqliteBaseDal.delete`);

    const statement = this.db.prepare(this.deleteStatement);
    const response = statement.run(id);
    if (response.changes) return id;
    return null;
  } 

  async getById(id: string): Promise<T | null> {
    console.log(`sqliteBaseDal.getById`);

    const statement = this.db.prepare(this.getByIdStatement);
    const response = statement.get(id);
    if (response) return response as T;
    return null;
  }
  async getAll(): Promise<T[]> {
    console.log(`sqliteBaseDal.getAll`);
    const statement = this.db.prepare(this.getAllStatement);
    const response = statement.all();
    return response as T[];
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
  private bindParameters(statement: any, data: T, id?: string): any {
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
    return statement.run(values);
  }


}

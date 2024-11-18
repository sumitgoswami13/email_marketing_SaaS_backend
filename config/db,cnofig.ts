import { Pool } from "pg";

class DatabaseConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "mydatabase",
      password: process.env.DB_PASSWORD || "12345678",
      port: Number(process.env.DB_PORT) || 5432,
    });
  }

  async connectDb(): Promise<void> {
    try {
      await this.pool.query("SELECT 1");
      console.log("Connected to the PostgreSQL database successfully.");
    } catch (error: any) {
      console.error("Error connecting to the PostgreSQL database:", error.message);
      throw error;
    }
  }

  getPool(): Pool {
    return this.pool;
  }

  async closeConnection(): Promise<void> {
    try {
      await this.pool.end();
      console.log("PostgreSQL database connection closed.");
    } catch (error: any) {
      console.error("Error closing the PostgreSQL database connection:", error.message);
    }
  }
}

export default DatabaseConnection;

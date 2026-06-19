import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

import { Simulacao } from '../types';

class DatabaseService {
  private db: SQLiteDBConnection | null = null;

  async init() {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    try {
      this.db = await sqlite.createConnection('financeiro_db', false, 'no-encryption', 1, false);
      await this.db.open();
      await this.createTables();
    } catch (error) {
      console.error('Erro ao inicializar banco:', error);
    }
  }

  async createTables() {
    if (!this.db) return;
    
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS simulacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT DEFAULT CURRENT_TIMESTAMP,
        receita REAL,
        rbt12 REAL,
        percentualProLabore REAL,
        das REAL,
        inss REAL,
        irrf REAL,
        prolaboreBruto REAL,
        prolaboreLiquido REAL,
        lucroDistribuivel REAL,
        totalLiquido REAL,
        descricao TEXT
      )
    `);
  }

  async salvarSimulacao(simulacao: Omit<Simulacao, 'id' | 'data'>): Promise<number> {
    if (!this.db) throw new Error('Banco não inicializado');

    const query = `
      INSERT INTO simulacoes (
        receita, rbt12, percentualProLabore, das, inss, irrf,
        prolaboreBruto, prolaboreLiquido, lucroDistribuivel,
        totalLiquido, descricao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await this.db.run(query, [
      simulacao.receita,
      simulacao.rbt12,
      simulacao.percentualProLabore,
      simulacao.das,
      simulacao.inss,
      simulacao.irrf,
      simulacao.prolaboreBruto,
      simulacao.prolaboreLiquido,
      simulacao.lucroDistribuivel,
      simulacao.totalLiquido,
      simulacao.descricao || null
    ]);

    return result.changes?.lastId || 0;
  }

  async listarSimulacoes(): Promise<Simulacao[]> {
    if (!this.db) throw new Error('Banco não inicializado');

    const result = await this.db.query('SELECT * FROM simulacoes ORDER BY data DESC');
    return result.values || [];
  }

  async getSimulacao(id: number): Promise<Simulacao | null> {
    if (!this.db) throw new Error('Banco não inicializado');

    const result = await this.db.query('SELECT * FROM simulacoes WHERE id = ?', [id]);
    return (result.values && result.values[0]) || null;
  }

  async deleteSimulacao(id: number): Promise<void> {
    if (!this.db) throw new Error('Banco não inicializado');
    await this.db.run('DELETE FROM simulacoes WHERE id = ?', [id]);
  }

  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export const database = new DatabaseService();
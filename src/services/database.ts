import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Simulacao } from '../types';

const STORAGE_KEY = 'simulacoes_db';

class DatabaseService {
  private db: SQLiteDBConnection | null = null;
  private useWeb = false;

  async init() {
    try {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      this.db = await sqlite.createConnection('financeiro_db', false, 'no-encryption', 1, false);
      await this.db.open();
      await this.createTables();
    } catch {
      console.warn('SQLite nativo indisponível, usando localStorage');
      this.useWeb = true;
      this.initWeb();
    }
  }

  private initWeb() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  }

  private async createTables() {
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
    if (this.useWeb) return this.salvarSimulacaoWeb(simulacao);
    if (!this.db) throw new Error('Banco não inicializado');

    const query = `
      INSERT INTO simulacoes (
        receita, rbt12, percentualProLabore, das, inss, irrf,
        prolaboreBruto, prolaboreLiquido, lucroDistribuivel,
        totalLiquido, descricao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await this.db.run(query, [
      simulacao.receita, simulacao.rbt12, simulacao.percentualProLabore,
      simulacao.das, simulacao.inss, simulacao.irrf,
      simulacao.prolaboreBruto, simulacao.prolaboreLiquido,
      simulacao.lucroDistribuivel, simulacao.totalLiquido,
      simulacao.descricao || null,
    ]);

    return result.changes?.lastId || 0;
  }

  private salvarSimulacaoWeb(simulacao: Omit<Simulacao, 'id' | 'data'>): number {
    const list = this.getList();
    const newId = Date.now();
    const nova: Simulacao = {
      id: newId,
      data: new Date().toISOString(),
      ...simulacao,
    };
    list.unshift(nova);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newId;
  }

  async listarSimulacoes(): Promise<Simulacao[]> {
    if (this.useWeb) return this.getList();
    if (!this.db) throw new Error('Banco não inicializado');
    const result = await this.db.query('SELECT * FROM simulacoes ORDER BY data DESC');
    return result.values || [];
  }

  async getSimulacao(id: number): Promise<Simulacao | null> {
    if (this.useWeb) {
      const list = this.getList();
      return list.find(s => s.id === id) || null;
    }
    if (!this.db) throw new Error('Banco não inicializado');
    const result = await this.db.query('SELECT * FROM simulacoes WHERE id = ?', [id]);
    return (result.values && result.values[0]) || null;
  }

  async deleteSimulacao(id: number): Promise<void> {
    if (this.useWeb) {
      const list = this.getList().filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return;
    }
    if (!this.db) throw new Error('Banco não inicializado');
    await this.db.run('DELETE FROM simulacoes WHERE id = ?', [id]);
  }

  private getList(): Simulacao[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export const database = new DatabaseService();

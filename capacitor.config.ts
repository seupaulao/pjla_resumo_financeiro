import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  "appId": "com.financeiro.medicapj",
  "appName": "Resumo Financeiro",
  "webDir": "build",
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "CapacitorSQLite": {
      "iosDatabaseLocation": "Library/CapacitorDatabase",
      "androidDatabaseLocation": "default"
    }
  }
};

export default config;



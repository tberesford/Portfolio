declare namespace NodeJS {
    export interface ProcessEnv {
      API_KEY: string;
      SERIAL_NUMBER: string,
      AZURE_CONN_STRING: string,
      CONTAINER: string,
      NODE_ENV: 'development' | 'production' | 'test'; // Optional
    }
  }
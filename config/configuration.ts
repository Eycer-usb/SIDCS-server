
export default () => ({
    port: parseInt(process.env.PORT ? process.env.PORT : '3000', 10),
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.PORT ? process.env.PORT : '5432', 10),
    }
  });
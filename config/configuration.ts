
export default () => ({
    port: parseInt(process.env.PORT ? process.env.PORT : '3000', 10),
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.PORT ? process.env.PORT : '5432', 10),
    },
    code_duration_mill: process.env.CODE_DURATION_MIN ? 
                        parseInt( process.env.CODE_DURATION_MIN )*60*1000 : 
                        1000 * 60 * 60 * 3
  });
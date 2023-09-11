export const envConfig = {
  db: {
    uri: process.env.MONGO_URI as string,
  },
  auth: {
    secret: process.env.JWT_SECRET as string,
  },
  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'localhost',
  },
};

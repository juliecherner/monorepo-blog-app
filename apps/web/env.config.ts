export const envConfig = {
  api: {
    uri: `https://${process.env.HOST || "localhost"}:${
      process.env.PORT || 8000
    }`,
  },
};

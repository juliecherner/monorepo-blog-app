const serverUri = `http://${process.env.HOST || "localhost"}:${
  process.env.PORT || 8000
}`;

export const envConfig = {
  server: {
    loginUrl: serverUri + "/auth/login",
    postsUrl: serverUri + "/posts"
  },
};

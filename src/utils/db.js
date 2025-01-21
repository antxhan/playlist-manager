export const db = {
  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  },
  setToken(token) {
    token.expires_at = Date.now() + token.expires_in * 1000;
    localStorage.setItem("token", JSON.stringify(token));
  },
};

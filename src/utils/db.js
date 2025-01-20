export const db = {
  getToken() {
    return JSON.parse(localStorage.getItem("token"));
  },
  setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  },
};

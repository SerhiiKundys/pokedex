export const requestAPI = {
  request: async (url, method = "GET", body = null, headers = {}) => {
    try {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something is wrong");
      }
      return data;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  },
};

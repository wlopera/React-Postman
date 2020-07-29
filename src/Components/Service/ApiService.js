class ApiService {
  invoke = (headers, authorization, http) => {
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(authorization.username + ":" + authorization.password).toString("base64")
    );

    return fetch(http.url, { method: http.method, headers: headers, body: http.request })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return { status: "500", statusText: err };
      });
  };
}

export default new ApiService();

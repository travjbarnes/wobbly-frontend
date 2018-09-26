const ROOT_URL = new URL("http://localhost/api/v1");

export const getUser = (id: number) => {
  const url = new URL(`/user/${id}`, ROOT_URL);
  const request = new Request(url.toString());
  return fetch(request);
};

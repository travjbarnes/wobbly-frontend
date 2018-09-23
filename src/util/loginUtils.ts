import { removeData, retrieveData, storeData } from "./functions";

let token: string | undefined;

export const signIn = (newToken: string) => storeData("BEARER_TOKEN", newToken);

export const signOut = () => {
  token = undefined;
  return removeData("BEARER_TOKEN");
};

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }
  token = await retrieveData("BEARER_TOKEN");
  return token;
};

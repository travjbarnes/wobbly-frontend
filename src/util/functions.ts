import { AsyncStorage } from "react-native";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// export function consoleDevOnly(...params: any[]) {
//   // Run only in dev mode
//   if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//     console.log(...params);
//   }
// }

// export function consoleState(state: any) {
//   // Run only in dev mode
//   if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//     console.table(state);
//   }
// }

export const switchPlural = (n: number) => (n !== 1 ? "s" : "");

export function dateToString(createdAt: string | Date) {
  return new Date(createdAt).toLocaleDateString();
}

export { default as validateSignup } from "./validateSignup";
export { default as validateGroupForm } from "./validateGroupForm";

export async function storeData(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(`Failed to save data: ${key}: ${value}`);
    return false;
  }
}

export async function removeData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(`Could not remove data for key ${key}`);
    return false;
  }
}

export async function retrieveData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(`Failed to retrieve data for key ${key}`);
  }
  return undefined;
}

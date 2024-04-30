import mysql from "mysql2/promise";

const host = process.env.EXPO_PUBLIC_HOST;
const user = process.env.EXPO_PUBLIC_USER;

export const recomealDB = mysql.createConnection({
  host: host,
  user: user,
  database: "recomealdata",
  password: process.env.EXPO_PUBLIC_PASSWORD,
});

export const connection = async () => {
  return await recomealDB;
}
export const disconnect = async () => {
  (await recomealDB).end();
}

// user function

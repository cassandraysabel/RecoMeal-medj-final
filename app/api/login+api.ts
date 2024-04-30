import { connection } from "../../utils/db";
import crypto from "node:crypto";

export const POST = async (req: Request, res: Response) => {
  try {
    console.log("connected: 'GET' /user");
    const recomealDB = await connection();

    const { username, password } = await req.json();

    console.log(username, password);

    const secret = crypto
      .createHash("sha256")
      .update(String("mysecretkeY123"))
      .digest("base64")
      .substring(0, 32);

    var [users] = await recomealDB.execute(
      `SELECT * FROM users WHERE name = ?`,
      [username]
    );

    users = users as [];
    var user;

    for (let userData of users) {
      try {
        const decryptIV = Buffer.from(userData["iv"], "hex");
        console.log(userData["password"]);
        console.log(userData["iv"]);
        console.log(decryptIV);

        const decryptPassword = crypto.createDecipheriv(
          "aes-256-cbc",
          secret,
          decryptIV
        );
        let decrypt = decryptPassword.update(
          userData["password"],
          "hex",
          "utf8"
        );
        decrypt += decryptPassword.final("utf8");

        if (decrypt === password) {
          user = userData;
          break;
        }
      } catch (err) {
        console.log(err, "Incorrect user");
      }
    }
    if (user === undefined) {
      return new Response("Incorrect username or password.", { status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};

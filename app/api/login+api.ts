import { connection } from "../../utils/db";
import crypto from "node:crypto";

export const POST = async (req: Request, res: Response) => {
  try {
    console.log("connected: 'POST' /user");
    const recomealDB = await connection();

    const { email, password } = await req.json();

    console.log(email, password);

    const secret = crypto
      .createHash("sha256")
      .update(String("mysecretkeY123"))
      .digest("base64")
      .substring(0, 32);

    var [userData] = await recomealDB.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    console.log(userData);
    userData = userData as [];
    if (userData.length == 0) {
      return new Response("Incorrect username or password.", { status: 400 });
    }

    const user = userData[0];

    const decryptIV = Buffer.from(user["iv"], "hex");
    console.log(user["password"]);
    console.log(user["iv"]);
    console.log(decryptIV);

    const decrypt = crypto.createDecipheriv(
      "aes-256-cbc",
      secret,
      decryptIV
    );

    let decryptPassword = decrypt.update(user["password"], "hex", "utf8");
    decryptPassword += decrypt.final("utf8");

    if (decryptPassword !== password) {
      
    }
    

    return Response.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};

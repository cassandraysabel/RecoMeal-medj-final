import { connection } from "../../utils/db";
import crypto from "node:crypto";

export const POST = async (req: Request, res: Response) => {
  try {
    console.log("connected: 'POST' /user");
    const { name, email, password, confirmPassword } = await req.json();
    console.log(name, email, password, confirmPassword);
    if (password != confirmPassword) {
      return new Response("Passwords do not match", {
        status: 400,
      });
    }
    const recomealdb = await connection();


    const iv = crypto.randomBytes(16)
    console.log(iv);
    const secret = crypto
      .createHash("sha256")
      .update(String("mysecretkeY123"))
      .digest("base64")
      .substring(0, 32);

    const cryptPassword = crypto.createCipheriv("aes-256-cbc", secret, iv);
    let encrypted = cryptPassword.update(password, "utf8", "hex");
    encrypted += cryptPassword.final("hex");

    var [user] = await recomealdb.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    user = user as [];
    console.log(user);
    if (user.length) {
      return new Response("There is a user already existing with this email.", {
        status: 400,
      });
    }

    const [result] = await recomealdb.execute(
      `INSERT INTO users (name, email, password, iv) VALUES (?, ?, ?, ?)`,
      [name, email, String(encrypted), iv.toString('hex')]
    );
    return Response.json({ data: result }, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};

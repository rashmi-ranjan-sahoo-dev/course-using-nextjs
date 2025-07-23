import jwt from "jsonwebtoken";

const secret = process.env.ADMIN_SECRET!;

export function verifyAdmin(headers: Headers) {
  const authHeader = headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Token Missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret) as { id: string };
    return decoded.id;
  } catch {
    throw new Error("Unauthorized: Invalid token");
  }
}

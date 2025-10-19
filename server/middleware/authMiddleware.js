import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: true, msg: "Falta token" });
  console.log(header);
  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: true, msg: "Token inválido" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.authInfo = decoded;
    next();
  } catch {
    return res.status(401).json({ error: true, msg: "Token expirado o inválido" });
  }
}

import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("Body cannot be empty | from handleValidationErrors.js");
    return res.status(400).json({
      message: "El body esta vacio",
    });
  }

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errorsObject = validationErrors.mapped();

    let errors = {};

    Object.entries(errorsObject).forEach(([key, value]) => {
      Object.entries(value).forEach(([innerKey, innerValue]) => {
        if (innerKey === "msg") {
          errors[key] = innerValue;
        }
      });
    });

    return res.status(400).json({ errors: errors });
  }

  return false;
};

export const catchErrors = (res, e) => {
  if (res.headersSent) return;
  if (e.parent?.sqlMessage) {
    console.error("Error:", e.name);
    console.error("Tabla:", e.table);
    console.error("Campo(s):", e.fields);
    console.error("Código SQL:", e.parent?.code);
    console.error("Mensaje:", e.parent?.sqlMessage);
    console.error("Consulta SQL:", e.sql);

    return res.status(500).json({
      message: e.message || "Ocurrió un error",
      table: e.table || null,
      fields: e.fields || null,
      code: e.code || null,
      sql: e.sql || null,
    });
  } else {
    console.error(e);
    return res.status(500).json({e})
  }
};

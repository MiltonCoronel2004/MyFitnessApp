import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.mjs";

export class User extends Model {}

User.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-ZÀ-ÿ\s]+$/i,
          msg: "El nombre solo puede contener letras y espacios",
        },
        len: {
          args: [2, 50],
          msg: "El nombre debe tener entre 2 y 50 caracteres",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "El email ya está registrado" },
      validate: {
        isEmail: { msg: "El email debe tener un formato válido" },
      },
    },

    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },

    // Estado del usuario (por si después querés suspender o borrar cuentas)
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    // Opcional: para agregar foto de perfil más adelante
    avatarUrl: {
      type: DataTypes.STRING,
        defaultValue: null,
      allowNull: true,
    },
    // Hash del refresh token para sesiones persistentes (por dispositivo)
    refreshTokenHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true, // agrega createdAt y updatedAt
   
  }
);

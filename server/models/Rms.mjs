import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.mjs";

export class RegistrosFuerza extends Model {}

RegistrosFuerza.init(
  {
    nombreEjercicio: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre del ejercicio no puede estar vacío"
        },
        len: {
          args: [1, 100],
          msg: "El nombre del ejercicio debe tener entre 1 y 100 caracteres"
        }
      }
    },
    pesoLevantadoKg: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        min: {
          args: 0.1,
          msg: "El peso debe ser mayor a 0.1 kg"
        },
        max: {
          args: 2000,
          msg: "El peso debe ser menor a 2000 kg"
        }
      }
    },
    repeticiones: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Las repeticiones deben ser al menos 1"
        },
        max: {
          args: 1000,
          msg: "Las repeticiones deben ser menores a 1000"
        }
      }
    },
    numeroSerie: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: 1,
          msg: "El número de serie debe ser al menos 1"
        },
        max: {
          args: 100,
          msg: "El número de serie debe ser menor a 100"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    tableName: "registros_fuerza",
    sequelize,
    timestamps: true
  }
);

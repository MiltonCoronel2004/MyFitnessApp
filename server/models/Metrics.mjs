import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.mjs";

export class Metricas extends Model {}

Metricas.init(
  {
    pesoKg: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: {
          args: 0.1,
          msg: "El peso debe ser mayor a 0.1 kg"
        },
        max: {
          args: 1000,
          msg: "El peso debe ser menor a 1000 kg"
        }
      }
    },
    cinturaCm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: {
          args: 0.1,
          msg: "La cintura debe ser mayor a 0.1 cm"
        },
        max: {
          args: 500,
          msg: "La cintura debe ser menor a 500 cm"
        }
      }
    },
    pechoCm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: {
          args: 0.1,
          msg: "El pecho debe ser mayor a 0.1 cm"
        },
        max: {
          args: 500,
          msg: "El pecho debe ser menor a 500 cm"
        }
      }
    },
    bicepsCm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: {
          args: 0.1,
          msg: "El bíceps debe ser mayor a 0.1 cm"
        },
        max: {
          args: 200,
          msg: "El bíceps debe ser menor a 200 cm"
        }
      }
    },
    cuadricepsCm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: {
          args: 0.1,
          msg: "El cuádriceps debe ser mayor a 0.1 cm"
        },
        max: {
          args: 200,
          msg: "El cuádriceps debe ser menor a 200 cm"
        }
      }
    },
    pantorrillaCm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: {
          args: 0.1,
          msg: "La pantorrilla debe ser mayor a 0.1 cm"
        },
        max: {
          args: 200,
          msg: "La pantorrilla debe ser menor a 200 cm"
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
    tableName: "metricas",
    sequelize,
    timestamps: true
  }
);

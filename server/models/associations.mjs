import { User } from "./User.mjs";
import { Metricas } from "./Metrics.mjs";
import { RegistrosFuerza } from "./Rms.mjs";

// Definir relaciones entre modelos

// 1. User tiene muchas Metricas (One-to-Many)
User.hasMany(Metricas, {
  foreignKey: 'userId',
  as: 'metricas' // alias para la relación
});

Metricas.belongsTo(User, {
  foreignKey: 'userId',
  as: 'usuario' // alias para la relación
});

// 2. User tiene muchos RegistrosFuerza (One-to-Many)
User.hasMany(RegistrosFuerza, {
  foreignKey: 'userId',
  as: 'registrosFuerza' // alias para la relación
});

RegistrosFuerza.belongsTo(User, {
  foreignKey: 'userId',
  as: 'usuario' // alias para la relación
});

// Exportar los modelos con relaciones definidas
export { User, Metricas, RegistrosFuerza };

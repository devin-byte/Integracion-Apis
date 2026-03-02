const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const Asignatura = sequelize.define('asignatura', {
    idAsignatura: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreAsignatura: DataTypes.STRING,
    profesorAsignatura: DataTypes.STRING
}, {
    tableName: 'asignaturas',
    timestamps: false
});

module.exports = Asignatura;
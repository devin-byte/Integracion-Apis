const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const Alumno = sequelize.define('alumno', {
    idAlumno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreAlumno: DataTypes.STRING,
    emailAlumno: DataTypes.STRING
}, {
    tableName: 'alumno',
    timestamps: false
});

module.exports = Alumno;
const Alumno = require('./Alumno');
const Asignatura = require('./Asignaturas');

Alumno.belongsToMany(Asignatura, {
    through: 'alumno_asignatura',
    foreignKey: 'idAlumno',
    otherKey: 'idAsignatura',
    timestamps: false
});

Asignatura.belongsToMany(Alumno, {
    through: 'alumno_asignatura',
    foreignKey: 'idAsignatura',
    otherKey: 'idAlumno',
    timestamps: false
});

module.exports = { Alumno, Asignatura };
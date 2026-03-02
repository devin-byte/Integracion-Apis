const express = require('express');
const { Alumno, Asignatura } = require('./modelos/relaciones');
const sequelize = require('./db/conexion');

const app = express();
app.use(express.json());



//punto de entrada 
// request , response
//metodo get , post , put , delete
// manejo de errores (200,501,502,504,)
app.get('/api/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.findAll({
      include: {
        model: Asignatura,
        through: { attributes: [] } // quita los datos de la tabla pivote
      }
    });

    if(alumnos.length > 0){
        res.status(200).json(alumnos);
    } else {
        res.status(402).json({ message: 'No se encontraron alumnos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alumnos', error: error.message });  
  }
});

app.post('/api/alumnos', async (req, res)=> {

    try {

        //insert into alumnos (nombre, email, curso) values (?, ?, ?);

        const alumnos= await Alumno.create(req.body);

        if(alumnos){
            res.status(200).json(alumnos);
        }
        else{
            res.status(402).json({message: 'Error al guatdar alumnos' + error});
        }


    } catch (error) {
        res.status(500).json({message: 'Error al guatdar alumnos' + error});  
    }
})


app.put('/api/alumnos/:id', async (req, res)=> {
    try {

            //update alumnos set nombre = ?, email = ?, curso = ? where id = ?;
        const alumnos= await Alumno.update(req.body,
             {where: {idAlumno: req.params.id}}
            );
        if(alumnos){
            res.status(200).json(alumnos);
        }
        else{
            res.status(402).json({message: 'Error al guatdar alumnos' + error});
        }
    } catch (error) {
        res.status(500).json({message: 'Error al guatdar alumnos' + error});  
    }
})

app.delete('/api/alumnos/:id', async (req, res)=> {

    try {

        //delete from alumnos where id = ?;
        const alumnos= await Alumno.destroy({where: {idAlumno: req.params.id}});
        if(alumnos){
            res.status(200).json({message: 'Alumno eliminado correctamente'});
        }
        else{
            res.status(402).json({message: 'Error al guatdar alumnos' + error});
        }
        
    } catch (error) {
        res.status(500).json({message: 'Error al guatdar alumnos' + error});  
    }
})


app.get('/api/asignaturas', async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll();

    if (asignaturas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asignaturas' });
    }

    res.status(200).json(asignaturas);

  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener asignaturas',
      error: error.message
    });
  }
});

app.post('/api/asignaturas', async (req, res) => {
  try {
    const asignatura = await Asignatura.create(req.body);

    res.status(201).json(asignatura);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear asignatura', error });
  }
});

app.delete('/api/asignaturas/:id', async (req, res) => {
  try {
    const eliminado = await Asignatura.destroy({
      where: { idAsignatura: req.params.id }
    });

    if (eliminado) {
      res.status(200).json({ message: 'Asignatura eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'No se encontró la asignatura' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar asignatura', error });
  }
});


Alumno.belongsToMany(Asignatura, {
  through: {
    model: 'alumno_asignatura',
    unique: false
  },
  foreignKey: 'idAlumno',
  otherKey: 'idAsignatura',
  timestamps: false
});

Asignatura.belongsToMany(Alumno, {
  through: {
    model: 'alumno_asignatura',
    unique: false
  },
  foreignKey: 'idAsignatura',
  otherKey: 'idAlumno',
  timestamps: false
});



app.get('/api/alumnos/:id/asignaturas', async (req, res) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id, {
            include: {
                model: Asignatura,
                through: { attributes: [] }
            }
        });

        if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });


        const resultado = {
            idAlumno: alumno.idAlumno,
            nombreAlumno: alumno.nombreAlumno,
            emailAlumno: alumno.emailAlumno,
            asignaturas: alumno.asignaturas.map(a => ({
                idAsignatura: a.idAsignatura,
                nombreAsignatura: a.nombreAsignatura,
                profesorAsignatura: a.profesorAsignatura
            }))
        };

        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asignaturas', error: error.message });
    }
});

app.post('/api/alumnos/:id/asignaturas', async (req, res) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id);
        const asignatura = await Asignatura.findByPk(req.body.idAsignatura);

        if (!alumno || !asignatura)
            return res.status(404).json({ message: 'Alumno o Asignatura no encontrada' });

        await alumno.addAsignatura(asignatura);
        res.status(200).json({ message: 'Asignatura asignada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar asignatura', error: error.message });
    }
});

app.put('/api/alumnos/:id/asignaturas', async (req, res) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id);
        if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });


        await alumno.removeAsignatura(req.body.vieja);
        await alumno.addAsignatura(req.body.nueva);

        res.status(200).json({ message: 'Asignatura actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar asignatura', error: error.message });
    }
});

app.delete('/api/alumnos/:id/asignaturas/:idAsignatura', async (req, res) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id);
        if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });

        await alumno.removeAsignatura(req.params.idAsignatura);
        res.status(200).json({ message: 'Asignatura eliminada del alumno' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar asignatura', error: error.message });
    }
});


app.listen(5000, () => {   
    console.log('Server is running on port 5000');
});
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'universidad',
    'root',
    '12345678',
    {
        host: 'localhost',        
        port: 3306,
        dialect: 'mysql',
       
    }

);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente');
    })
    .catch((error) => {
        console.log('Error de conexión: ', error);
    });

module.exports = sequelize;
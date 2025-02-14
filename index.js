require("dotenv").config(); // Carga la configuración de variables de entorno

const { neon } = require("@neondatabase/serverless"); // Trae la instancia Neon
const express = require('express'); // Trae instancia de express
const app = express(); // Configura Express
const port = 3000; // Define puerto
const sql = neon(process.env.DATABASE_URL); // Se crea la conexión con Neon

// Ruta principal (/) ahora muestra la lista de tareas directamente
app.get('/', async (req, res) => {
    try {
        const tareas = await sql`SELECT * FROM tbl_tareas`; // Consulta todas las tareas
        res.json(tareas); // Enviar las tareas como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las tareas');
    }
});

// Ruta adicional para obtener tareas manualmente si es necesario
app.get('/tareas', async (req, res) => {
    try {
        const tareas = await sql`SELECT * FROM tbl_tareas`; // Consulta todas las tareas
        res.json(tareas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las tareas');
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

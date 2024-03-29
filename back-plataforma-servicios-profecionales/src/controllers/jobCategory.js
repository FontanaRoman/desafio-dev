// Se requiere el modelo de la base de datos
const db = require("../database/models");

// Controlador para manejar categorías de trabajo
const jobCategory = {
    // Método de prueba para verificar el funcionamiento del controlador
    send: (req, res) => {
        res.send("funcionando");
    },

    // Subir una nueva categoría de trabajo a la base de datos
    uploadJobCategory: async (req, res) => {
        try {
            // Validar los datos del formulario
            const resultValidation = validationResult(req);

            // Manejar errores de validación del formulario
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores del formulario"
                });
            }

            // Verificar si la categoría de trabajo ya existe en la base de datos
            const existingJobCategory = await db.JobCategory.findOne({
                where: { name: req.body.name }
            });

            // Manejar caso de categoría de trabajo ya existente
            if (existingJobCategory) {
                return res.status(400).json({
                    status: 400,
                    errors: { name: { msg: "Esta categoría de trabajo ya existe" } }
                });
            }

            // Crear una nueva categoría de trabajo
            const newJobCategory = { name: req.body.name };
            await db.JobCategory.create(newJobCategory);

            // Retornar mensaje de éxito
            res.status(200).json({
                status: 200,
                msg: "Éxito al registrar categoría de trabajo"
            });
        } catch (error) {
            // Manejar errores internos del servidor
            console.log(`Ha ocurrido un error: ${error}`);
            res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud"
            });
        }
    },

    // Obtener todas las categorías de trabajo registradas
    getJobCategory: async (req, res) => {
        try {
            // Buscar todas las categorías de trabajo en la base de datos
            const jobCategories = await db.JobCategory.findAll();

            // Manejar caso de no encontrar categorías de trabajo
            if (jobCategories.length <= 0) {
                return res.status(400).json({
                    status: 400,
                    msg: "No hay categorías de trabajo registradas"
                });
            }

            // Retornar las categorías de trabajo encontradas
            return res.status(200).json({
                status: 200,
                msg: "Éxito al obtener las categorías de trabajo",
                data: jobCategories
            });
        } catch (error) {
            // Manejar errores internos del servidor
            console.log(`Ha ocurrido un error: ${error}`);
            res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud"
            });
        }
    },

    // Eliminar una categoría de trabajo de la base de datos
    deleteCategory: async (req, res) => {
        try {
            // Obtener el ID de la categoría de trabajo a eliminar
            const ID = req.body.id;

            // Buscar la categoría de trabajo a eliminar por su nombre
            const toDelete = await db.JobCategory.findOne({ where: { name: ID } });

            // Verificar si se encontró la categoría de trabajo
            if (toDelete) {
                // Eliminar la categoría de trabajo encontrada
                await toDelete.destroy();
                res.status(200).json({
                    status: 200,
                    msg: "Categoría eliminada correctamente"
                });
            } else {
                // Manejar caso de no encontrar la categoría de trabajo
                res.status(404).json({
                    status: 404,
                    msg: "La categoría no existe en la base de datos"
                });
            }
        } catch (error) {
            // Manejar errores internos del servidor
            console.log(`Ha ocurrido un error: ${error}`);
            res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud"
            });
        }
    }
};

module.exports = jobCategory;

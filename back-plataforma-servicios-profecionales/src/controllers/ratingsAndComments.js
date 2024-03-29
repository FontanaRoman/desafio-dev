// Se requiere el modelo de la base de datos
const db = require("../database/models");

// Controlador para manejar calificaciones y comentarios
const ratingsAndComments = {
    // Método de prueba
    send: (req, res) => {
        res.send("funcionando");
    },

    // Agregar nueva calificación y comentario
    newRatingsAndComments: async (req, res) => {
        try {
            // Obtener IDs de usuario y profesional
            const userID = req.params.user_id;
            const professionalsID = req.params.professionals_id;

            // Verificar si existe usuario y profesional
            const foundUser = await db.User.findByPk(userID);
            const foundProfessional = await db.Professionals.findByPk(professionalsID);

            // Manejar caso de usuario o profesional no encontrado
            if (!foundUser || !foundProfessional) {
                return res.status(400).json({
                    status: 400,
                    msg: "Error: Usuario o profesional no encontrado."
                });
            }

            // Crear nueva calificación y comentario
            const newRatingsAndComments = {
                professionals_id: professionalsID,
                user_id: userID,
                qualification: req.body.qualification,
                comment: req.body.comment,
                qualificationDate: new Date()
            };

            // Guardar en la base de datos
            await db.RatingsAndComments.create(newRatingsAndComments);

            // Retornar mensaje de éxito
            res.status(201).json({
                status: 201,
                msg: "Calificación y comentario agregados correctamente."
            });
        } catch (error) {
            // Manejar errores internos del servidor
            console.error("Error al agregar calificación y comentario:", error);
            res.status(500).json({
                status: 500,
                msg: "Error interno del servidor."
            });
        }
    },

    // Obtener calificaciones y comentarios de un profesional
    getRatingsAndComments: async (req, res) => {
        try {
            // Obtener ID del profesional
            const professionalID = req.params.professionals_id;

            // Buscar calificaciones y comentarios en la base de datos
            const ratingsAndComments = await db.RatingsAndComments.findAll({
                where: { professionals_id: professionalID },
                include: [{ model: db.User, attributes: ['name'] }]
            });

            // Manejar caso de no encontrar calificaciones y comentarios
            if (ratingsAndComments.length <= 0) {
                return res.status(400).json({
                    status: 400,
                    msg: "No hay calificaciones y comentarios para este profesional."
                });
            }

            // Retornar calificaciones y comentarios
            res.status(200).json({
                status: 200,
                msg: "Éxito al obtener las calificaciones y comentarios.",
                data: ratingsAndComments,
            });
        } catch (error) {
            // Manejar errores internos del servidor
            console.error("Error al obtener calificaciones y comentarios:", error);
            res.status(500).json({
                status: 500,
                msg: "Error interno del servidor."
            });
        }
    }
};

module.exports = ratingsAndComments;

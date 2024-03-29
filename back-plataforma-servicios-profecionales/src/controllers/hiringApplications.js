// Se requiere el modelo de la base de datos
const db = require("../database/models");

// Controlador para manejar las solicitudes de contratación
const hiringApplications = {
    // Método de prueba para verificar el funcionamiento del controlador
    send: (req, res) => {
        res.send("funcionando");
    },

    // Crear una nueva solicitud de contratación
    newHiringApplications: async (req, res) => {
        try {

            console.log(req.params)

            // Crear objeto para la nueva solicitud de contratación
            const newHiringApplications = {
                user_id: parseInt(req.params.user_id),
                professionals_id: parseInt(req.params.professionals_id),
                date: new Date(),
                state_id: 0,
            };

            // Crear la solicitud de contratación en la base de datos
            await db.HiringApplications.create(newHiringApplications);

            // Retornar mensaje de éxito
            return res.status(200).json({
                status: 200,
                msg: "Éxito al contratar un servicio. Podrás ver el estado de tu contratación en tus solicitudes.",
            });
        } catch (error) {
            // Manejar errores internos del servidor
            console.error(`Ha ocurrido un error en newHiringApplications: ${error}`);
            return res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
                error: error.message
            });
        }
    },

    // Obtener las solicitudes de contratación de un usuario
    userContracts: async (req, res) => {
        try {
            // Obtener el ID del usuario
            const userId = req.params.id;

            // Buscar las solicitudes de contratación del usuario en la base de datos
            const userContracts = await db.HiringApplications.findAll({
                where: { user_id: userId }
            });

            // Manejar caso de encontrar solicitudes de contratación
            if (userContracts.length > 0) {
                return res.status(200).json({
                    status: 200,
                    msg: "Éxito al solicitar contrataciones.",
                    data: userContracts
                });
            } else {
                // Manejar caso de no encontrar solicitudes de contratación
                return res.status(400).json({
                    status: 400,
                    msg: "No tienes contrataciones.",
                });
            }
        } catch (error) {
            // Manejar errores internos del servidor
            console.error(`Ha ocurrido un error en userContracts: ${error}`);
            return res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
                error: error.message
            });
        }
    },

    // Obtener las solicitudes de contratación de un profesional
    professionalContracts: async (req, res) => {
        try {
            // Obtener el ID del profesional
            const professionalId = req.params.id;

            // Buscar las solicitudes de contratación del profesional en la base de datos
            const professionalContracts = await db.HiringApplications.findAll({
                where: { professionals_id: professionalId }
            });

            // Manejar caso de encontrar solicitudes de contratación
            if (professionalContracts.length > 0) {
                return res.status(200).json({
                    status: 200,
                    msg: "Éxito al solicitar contrataciones del profesional.",
                    data: professionalContracts
                });
            } else {
                // Manejar caso de no encontrar solicitudes de contratación para el profesional
                return res.status(400).json({
                    status: 400,
                    msg: "El profesional no tiene contrataciones.",
                });
            }
        } catch (error) {
            // Manejar errores internos del servidor
            console.error(`Ha ocurrido un error en professionalContracts: ${error}`);
            return res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
                error: error.message
            });
        }
    }
};

module.exports = hiringApplications;

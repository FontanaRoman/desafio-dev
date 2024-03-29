// Se requiere los modelos
const db = require("../database/models");

// Se requieren las validaciones
const { validationResult } = require("express-validator");

const state = {
    // Método de prueba
    send: (req, res) => {
        res.send("funcionando");
    },
    // Método encargado de subir un nuevo estado a la db
    uploadState: async (req, res) => {
        try {
            // Validar los datos del formulario
            const resultValidation = validationResult(req);

            // verificamos si exister errores
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores del formulario"
                });
            }

            // Verificamos si el estado ya existe en la db
            const existingState = await db.State.findOne({
                where: {
                    name: req.body.name,
                }
            });

            // Retornamos en caso de que exista
            if (existingState) {
                return res.status(400).json({
                    status: 400,
                    errors: {
                        name: {
                            msg: "Este estado ya existe"
                        }
                    }
                });
            }

            // Crear un nuevo estado con el nombre proporcionado
            const newState = {
                name: req.body.name,
            };

            // Guardar el nuevo estado en la db
            await db.State.create(newState);

            // Retornar un mensaje de éxito
            res.status(200).json({
                status: 200,
                msg: "Exito al registrar estado"
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
    getState: async (req, res) => {
        try {
            // Buscar todos los estados en la base de datos
            const states = await db.State.findAll();

            // Manejar caso de no encontrar estados
            if (!states || states.length === 0) {
                return res.status(400).json({
                    status: 400,
                    msg: "No hay Estados registrados",
                });
            };

            // Retornar los estados encontrados
            return res.status(200).json({
                status: 200,
                msg: "Exito al obtener los estados",
                data: states,
            });
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

module.exports = state;

// Se requiere los modelos de la db
const db = require("../database/models");
// se se requieren las validaciones
const { validationResult } = require("express-validator");

const rolesController = {
    // Método de prueba
    send: (req, res) => {
        res.send("funcionando");
    },
    // Método encargado de subir un nuevo rol a la base de datos
    uploadRole: async (req, res) => {
        try {
            console.log("entro en la funcion");

            // Validaciones del formulario
            const resultValidation = validationResult(req);

            // revisamos que esten vacios en caso de no estarlo retornamos
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores del formulario"
                });
            }

            // Verificar si el rol ya existe en la db
            const existingRole = await db.Roles.findOne({
                where: {
                    name: req.body.name,
                }
            });

            // Manejar caso de rol ya existente
            if (existingRole) {
                return res.status(400).json({
                    status: 400,
                    errors: {
                        name: {
                            msg: "Este rol ya existe"
                        }
                    }
                });
            }

            // Crear un nuevo rol con el nombre ingresado
            const newRole = {
                name: req.body.name,
            };

            // Guardar el nuevo rol en la db
            await db.Roles.create(newRole);

            // Retornar un mensaje de éxito
            res.status(200).json({
                status: 200,
                msg: "Éxito al registrar el rol"
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
    // Método encargado de obtener todos los roles registrados en la base de datos
    getRoles: async (req, res) => {
        try {
            // Buscar todos los roles en la base de datos excepto 'administrador' y 'soporte'
            const roles = await db.Roles.findAll({
                where: {
                    name: {
                        [db.Sequelize.Op.notIn]: ['administrador', 'soporte']
                    }
                }
            });

            // Manejar caso de no encontrar roles
            if (roles.length <= 0) {
                return res.status(400).json({
                    status: 400,
                    msg: "No hay roles registrados",
                });
            }

            // Retornar los roles encontrados
            return res.status(200).json({
                status: 200,
                msg: "Éxito al obtener los roles",
                data: roles,
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

    // Método encargado de eliminar un rol de usuario de la base de datos
    deleteRol: async (req, res) => {
        try {
            // Obtener el ID del rol a eliminar
            const rolID = req.body.id;

            // Buscar el rol a eliminar por su ID
            const rolToDelete = await db.Roles.findOne({ where: { roles_id: rolID } });

            // Verificar si se encontró el rol
            if (rolToDelete) {
                // Eliminar el rol encontrado
                await rolToDelete.destroy();
                res.status(200).json({
                    status: 200,
                    msg: "Rol eliminado correctamente"
                });
            } else {
                // Si no se encontró el rol
                res.status(404).json({
                    status: 404,
                    msg: "El rol no existe en la base de datos"
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

module.exports = rolesController;

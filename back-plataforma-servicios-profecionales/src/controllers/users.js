// requerimos los modelos
const db = require("../database/models")
// requerimos bcrypt para hashear las password
const bcrypt = require("bcrypt");
// requerimos las validaciones de validator
const { validationResult } = require("express-validator");
// requerimos jwt para crear token y validar datos luego
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
// controladores que se encargaran de los usuarios
const user = {
    // metodo de prueba
    send: (req, res) => {
        res.send("funcionando");
    },
    // metodo encargado del register 
    // los metodos utilizan async para trabajar asincronicamente con await
    register: async (req, res) => {
        try {
            console.log(req.body)
            // validaciones
            const resultValidation = validationResult(req);

            // manejamos las validacion en caso de tener errores retornamos
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    msg: "Errores de formulario",
                    errors: resultValidation.mapped(),
                });
            };

            // verificamos si el email existe
            const existingEmail = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // si el email existe retornamos que el email ya esta registrado
            if (existingEmail) {
                return res.status(400).json({
                    status: 400,
                    errors: {
                        email: {
                            msg: "Este correo ya está registrado",
                        },
                    },
                })
            }

            // obtenemos el registro del rol de usuario para trabajar con  el id
            const idRolUser = await db.Roles.findOne({
                where: { name: "USUARIO" }
            })

            console.log(idRolUser.roles_id)

            // creamos un objeto con los datos para crear el registro
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                roles_id: idRolUser.roles_id,
            }

            // creamos el registro
            await db.User.create(newUser)

            // retornamos un estado 200 y un mensaje de exito
            res.status(200).json({
                status: 200,
                msg: "Registro creado correctamente",
            });
            // catch para manejar cualquier error que surga retornar un estado 500 con un mensaje indicando un problema interno    
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
            res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud"
            });
        }
    },
    // registro de professionales
    registerProfessionals: async (req, res) => {
        try {
            // validaciones 
            const resultValidation = validationResult(req);

            console.log(req.body)

            console.log(req.body)
            // verificamos las validaciones si contienen error retornamos un estado 400 y un mensaje
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    msg: "Errores de formulario",
                    errors: resultValidation.mapped(),
                });
            };

            // buscamos el email
            const existingEmail = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // verificamos si el email ya existe en caso de existir retornamos estado 400 y mensaje de error
            if (existingEmail) {
                return res.status(400).json({
                    status: 400,
                    errors: {
                        email: {
                            msg: "Este correo ya está registrado",
                        },
                    },
                })
            }

            // array de objetos que contiene las imagenes y datos
            const arrayPhotos = req.files;

            // variable que guardara la imagen del certificado se realiza un find al array de photos
            // para buscar en la propiedad originalname la palabra Certificate
            const certificate = arrayPhotos.find((photo) => {
                return photo.originalname.includes("Certificate");
            });
            // variable que guardara la imagen del documento se realiza un find al array de photos
            // para buscar en la propiedad originalname la palabra Documents
            const photoDocument = arrayPhotos.find((photo) => {
                return photo.originalname.includes("Documents");
            });
            // variable que guardara la imagen del profesional se realiza un find al array de photos
            // para buscar en la propiedad originalname la palabra Professionals
            const photoProfessionals = arrayPhotos.find((photo) => {
                return photo.originalname.includes("Professionals");
            });

            // buscamos el registro del rol de procefional 
            const idProfessionals = await db.Roles.findOne({
                where: { name: "PROFECIONAL" }
            })


            // aca vamos a realizar 2 registros uno registrara los datos necesarios en Usuarios
            // y el otro el registro de los datos de Profesionales

            // objeto con los datos del usuario a registrar
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                roles_id: idProfessionals.roles_id,
            }

            console.log("user", idProfessionals.roles_id)

            // creando registro del usuario
            await db.User.create(newUser);

            // buscamos el registro del usuario para luego extraer su id y referenciarlo en profesionales
            const idUser = await db.User.findOne({
                where: { email: newUser.email }
            })

            console.log(idUser, "usuario buscado")

            // creamos el objeto con los datos necesarios para registrar el profesional
            const newProfessionals = {
                photo: photoProfessionals.filename,
                identificationDocument: photoDocument.filename,
                certificates: certificate.filename,
                state_id: 0,
                jobCategory_id: req.body.jobCategory_id,
            }

            // realizamos el registro
            await db.Professionals.create({
                user_id: idUser.user_id,
                ...newProfessionals,
            })
            // retornamos un estaado 200 y un mensaje de exito
            res.status(200).json({
                status: 200,
                msg: "Registro creado correctamente",
            });
            // catch para manejar cualquier error que surga retornar un estado 500 con un mensaje indicando un problema interno 
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
            // en caso de error retornamos un estado 500 y el mensaje de error al procesar la solitcitud
            res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud"
            });
        }
    },
    login: async (req, res) => {
        try {
            // validaciones
            const resultValidation = validationResult(req);

            // verificamos que esten vacias, en caso de no estarlo retornamos
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores de formulario",
                });
            };

            const userToLogin = await db.User.findOne({
                where: { email: req.body.email },
                include: [{ model: db.Professionals }, { model: db.Roles }],
            });

            // si el usuario existe seguimos en caso de no existir pasa al cacth
            if (userToLogin) {
                // comparamos la contraseña ingresada con la registrada utilizando bcrypt para comparar 
                // utilizando compara porque la contraseña esta hash
                const isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                // ahora comparamos el email con el ingresado y ademas la contraseña debe ser la misma
                if ((userToLogin.email === req.body.email) && (isOkThePassword)) {

                    const token = {
                        name: userToLogin.name,
                        email: userToLogin.email,
                        rol_id: userToLogin.Role.name,
                    }

                    const tokenUser = jwt.sign(token, jwtSecret);

                    let userLogin = {
                        token: tokenUser,
                        id: userToLogin.user_id,
                        name: userToLogin.name,
                        email: userToLogin.email,
                        rol_id: userToLogin.Role.name,
                    }

                    if (userToLogin.Role.name == "PROFECIONAL") {
                        userLogin = {
                            ...userLogin,
                            photo: userToLogin.Professionals.photo,
                            documento: userToLogin.Professionals.identificationDocument,
                            certificado: userToLogin.Professionals.certificates,
                        }
                    }

                    return res.status(200).json({
                        status: 200,
                        msg: "Exito al iniciar sesion",
                        data: userLogin,
                    });

                }
            }

        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
            // en caso de error retornamos un estado 500 y el mensaje de error al procesar la solitcitud
            res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud"
            });
        }
    },
    editUser: async (req, res) => {
        try {
        
            console.log(req.body);
            // validaciones
            const resultValidation = validationResult(req);

            // manejamos las validacion en caso de tener errores retornamos
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    msg: "Errores de formulario",
                    errors: resultValidation.mapped(),
                });
            };

            // verificamos si el email existe
            const existingEmail = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // si el email existe retornamos que el email ya esta registrado
            if (!existingEmail) {
                return res.status(400).json({
                    status: 400,
                    errors: {
                        email: {
                            msg: "Este correo no esta registrado",
                        },
                    },
                })
            }

            const userChangePassword = await db.User.findOne({
                where: {email: req.body.email}
            })
                // utilizando compara porque la contraseña esta hash
                const isOkThePassword = bcrypt.compareSync(req.body.password, userChangePassword.password);
                // ahora comparamos el email con el ingresado y ademas la contraseña debe ser la misma
                if (isOkThePassword) {
                    await db.User.update(
                        {
                           password:bcrypt.hashSync(req.body.newPassword, 10)
                        },
                        {
                            where: { user_id: userChangePassword.user_id }
                        }
                    );
                }
        
                return res.status(200).json({
                    status: 200,
                    msg: "exito al cambiar contraseña" 
                })

        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
            res.status(500).json({
                status: 500,
                msg: "Ha ocurrido un error al procesar la solicitud"
            });
        }
    },
    getTotalUsers: async (req, res) => {
        try {
            // Buscar el rol de usuario
            const userRole = await db.Roles.findOne({
                where: { name: "usuario" }
            });

            // Verificar si se encontró el rol de usuario
            if (!userRole) {
                return res.status(404).json({
                    status: 404,
                    msg: "Rol de usuario no encontrado",
                });
            }

            // Buscar todos los usuarios con el id del rol de usuario
            const users = await db.User.findAll({
                where: { rol_id: userRole.id }
            });

            // Verificar si se encontraron usuarios
            if (users.length === 0) {
                return res.status(404).json({
                    status: 404,
                    msg: "No se encontraron usuarios",
                });
            }

            // Retornar los usuarios encontrados
            return res.status(200).json({
                status: 200,
                data: users,
                length: users.length,
            });
            // catch para manejar cualquier error que surga retornar un estado 500 con un mensaje indicando un problema interno 
        } catch (error) {
            // Manejar errores internos del servidor
            console.error("Error al obtener usuarios:", error);
            return res.status(500).json({
                status: 500,
                msg: "Error interno del servidor",
            });
        }
    },
    getProfessionalId: async (req,res) => {
        try {
            const professionalsUserData = await db.Professionals.findOne({
                where: { professionals_id: req.params.id },
                include: [{ model: db.User },{model: db.JobCategory}]
            })

            return res.status(200).json({
                status: 200,
                data: professionalsUserData,
                msg: "exito"
            })
        } catch (error) {
            
        }
    },
    getTotalProfessionals: async (req, res) => {
        try {

            const professionalsUserData = await db.Professionals.findAll({
                where: { state_id: 0 },
                include: [{ model: db.User },{model: db.JobCategory}]
            })

            // Verificar si se encontraron usuarios
            if (professionalsUserData.length === 0) {
                return res.status(404).json({
                    status: 404,
                    msg: "No se encontraron usuarios con el rol de profesionales",
                });
            }

            // Retornar los usuarios encontrados
            return res.status(200).json({
                status: 200,
                data: professionalsUserData,
                length: professionalsUserData.length,
            });
            // catch para manejar cualquier error que surga retornar un estado 500 con un mensaje indicando un problema interno 
        } catch (error) {
            // Manejar errores internos del servidor
            console.error("Error al obtener usuarios:", error);
            return res.status(500).json({
                status: 500,
                msg: "Error interno del servidor",
            });
        }
    }



};

module.exports = user
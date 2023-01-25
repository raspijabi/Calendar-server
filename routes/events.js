/*
    Rutas de Eventos
    host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');

//Todas tienen que estar validadas del JWT
//Todas despues de esta linea son privadas y tienen que tener tokens
//si queremos que una sea pública y no tenga token podemos bajar la siguiente linea :D
router.use( validarJWT );

//Obtener eventos
router.get(
    '/',
    getEventos);

//Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
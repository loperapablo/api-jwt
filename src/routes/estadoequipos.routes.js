import { Router } from 'express';
const router = Router();

import * as estadoEquipoCtrl from '../controllers/estadoequipo.controller';
import { authjwt } from '../middlewares';

router.post(
	'/',
	[authjwt.verifyToken, authjwt.esAdmin],
	estadoEquipoCtrl.createEstadoEquipo
);
router.get(
	'/',
	[authjwt.verifyToken, authjwt.esAdmin],
	estadoEquipoCtrl.getEstadoEquipos
);
router.get(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	estadoEquipoCtrl.getEstadoEquipoById
);
router.put(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	estadoEquipoCtrl.updateEstadoEquipoById
);
router.delete(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	estadoEquipoCtrl.deleteEstadoEquipoById
);

export default router;

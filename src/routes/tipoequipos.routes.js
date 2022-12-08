import { Router } from 'express';
const router = Router();

import * as tipoEquipoCtrl from '../controllers/tipoequipos.controller';
import { authjwt } from '../middlewares';

router.post(
	'/',
	[authjwt.verifyToken, authjwt.esAdmin],
	tipoEquipoCtrl.createTipoEquipo
);
router.get(
	'/',
	[authjwt.verifyToken, authjwt.esAdmin],
	tipoEquipoCtrl.getTipoEquipos
);
router.get(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	tipoEquipoCtrl.getTipoEquipoById
);
router.put(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	tipoEquipoCtrl.updateTipoEquipoById
);
router.delete(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	tipoEquipoCtrl.deleteTipoEquipoById
);

export default router;

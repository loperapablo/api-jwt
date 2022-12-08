import { Router } from 'express';
const router = Router();

import * as inventarioCtrl from '../controllers/inventario.controller';
import {
	authjwt,
	middleInventario,
} from '../middlewares';

router.post(
	'/',
	[
		authjwt.verifyToken,
		authjwt.esAdmin,
		middleInventario.checkDuplicateModelo,
	],
	inventarioCtrl.createInventario
);
router.get(
	'/',
	[authjwt.verifyToken, authjwt.esDocente],
	inventarioCtrl.getInventarios
);
router.get(
	'/:id',
	[authjwt.verifyToken, authjwt.esDocente],
	inventarioCtrl.getInventarioById
);
router.put(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	inventarioCtrl.updateInventarioById
);
router.delete(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	inventarioCtrl.deleteInventarioById
);

export default router;

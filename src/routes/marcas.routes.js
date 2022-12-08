import { Router } from 'express';
const router = Router();

import * as marcaCtrl from '../controllers/marcas.controller';
import { authjwt } from '../middlewares';

router.post(
	'/',
	[authjwt.verifyToken, authjwt.esAdmin],
	marcaCtrl.createMarca
);
router.get(
	'/',
	[authjwt.verifyToken, authjwt.esAdmin],
	marcaCtrl.getMarca
);
router.get(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	marcaCtrl.getMarcaById
);
router.put(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	marcaCtrl.updateMarcaById
);
router.delete(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	marcaCtrl.deleteMarcaById
);

export default router;

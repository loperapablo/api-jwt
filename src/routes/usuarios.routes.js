import { Router } from 'express';
const router = Router();

import * as usuarioCtrl from '../controllers/usuario.controller';
import {
	authjwt,
	verifySignup,
} from '../middlewares';

router.post(
	'/',
	[
		authjwt.verifyToken,
		authjwt.esAdmin,
		verifySignup.checkRolesExisted,
		verifySignup.checkDuplicateEmail,
	],
	usuarioCtrl.createUsuario
);

router.get(
	'/',
	[authjwt.verifyToken, authjwt.esAdmin],
	usuarioCtrl.getUsuario
);

router.get(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	usuarioCtrl.getUsuarioById
);

router.put(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	usuarioCtrl.updateUsuarioById
);

router.delete(
	'/:id',
	[authjwt.verifyToken, authjwt.esAdmin],
	usuarioCtrl.deleteUsuarioById
);

export default router;

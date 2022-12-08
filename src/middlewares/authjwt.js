import jwt from 'jsonwebtoken';
import config from '../config';
import Usuario from '../models/Usuarios';
import Role from '../models/Roles';

export const verifyToken = async (
	req,
	res,
	next
) => {
	try {
		const token =
			req.headers['x-access-token'];

		if (!token)
			return res.status(403).json({
				message: 'No token provided',
			});

		const decoded = jwt.verify(
			token,
			config.SECRET
		);

		req.UsuarioId = decoded.id;

		const usuario = await Usuario.findById(
			decoded.id,
			{ password: 0 }
		);
		if (!usuario)
			return res.status(404).json({
				message: 'Usuario no existe.',
			});

		next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: 'Sin autorización.' });
	}
};

export const esDocente = async (
	req,
	res,
	next
) => {
	const usuario = await Usuario.findById(
		req.UsuarioId
	);
	const roles = await Role.find({
		_id: { $in: usuario.roles },
	});

	for (
		let index = 0;
		index < roles.length;
		index++
	) {
		if (
			roles[index].nombre === 'docente' ||
			'administrador'
		) {
			next();
			return;
		}
	}

	return res.status(403).json({
		message: 'Requiere rol de docente',
	});
};

export const esAdmin = async (
	req,
	res,
	next
) => {
	const usuario = await Usuario.findById(
		req.UsuarioId
	);
	const roles = await Role.find({
		_id: { $in: usuario.roles },
	});

	for (
		let index = 0;
		index < roles.length;
		index++
	) {
		if (
			roles[index].nombre === 'administrador'
		) {
			next();
			return;
		}
	}

	return res.status(403).json({
		message: 'Requiere rol de admin',
	});
};

import Usuario from '../models/Usuarios';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Roles';

export const signup = async (req, res) => {
	const {
		nombre,
		email,
		password,
		estado,
		roles,
	} = req.body;

	const usuarioEncontrado = Usuario.find({
		email,
	});

	const nuevoUsuario = new Usuario({
		nombre,
		email,
		password: await Usuario.encryptPassword(
			password
		),
		estado,
	});

	if (roles) {
		const foundRoles = await Role.find({
			nombre: { $in: roles },
		});
		nuevoUsuario.roles = foundRoles.map(
			(role) => role._id
		);
	} else {
		const role = await Role.findOne({
			nombre: 'usuario',
		});
		nuevoUsuario.roles = [role._id];
	}

	const usuarioGuardado =
		await nuevoUsuario.save();

	console.log(usuarioGuardado);

	const token = jwt.sign(
		{ id: usuarioGuardado._id },
		config.SECRET,
		{
			expiresIn: 86400, //24 horas
		}
	);

	res.json({ token });
};

export const signin = async (req, res) => {
	const usuarioEncontrado =
		await Usuario.findOne({
			email: req.body.email,
		}).populate('roles');

	if (!usuarioEncontrado)
		return res.status(400).json({
			message: 'Usuario no encontrado',
		});

	const matchPassword =
		await Usuario.comparePassword(
			req.body.password,
			usuarioEncontrado.password
		);

	if (!matchPassword)
		return res.status(401).json({
			token: null,
			message: 'Contraseña inválida',
		});

	const token = jwt.sign(
		{ id: usuarioEncontrado._id },
		config.SECRET,
		{ expiresIn: 86400 }
	);

	console.log(usuarioEncontrado);
	res.json({ token: token });
};

import Usuario from '../models/Usuarios';
import Role from '../models/Roles';
import jwt from 'jsonwebtoken';
import config from '../config';

export const createUsuario = async (
	req,
	res
) => {
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

export const getUsuario = async (req, res) => {
	const usuario = await Usuario.find();
	res.json(usuario);
};

export const getUsuarioById = async (
	req,
	res
) => {
	const usuario = await Usuario.findById(
		req.params.id
	);
	res.status(200).json(usuario);
};

export const updateUsuarioById = async (
	req,
	res
) => {
	const { roles } = req.body;
	if (roles) {
		const foundRoles = await Role.find({
			nombre: { $in: roles },
		});
		req.body.roles = foundRoles.map(
			(role) => role._id
		);

		const updatedUsuario =
			await Usuario.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
		res.status(200).json(updatedUsuario);
	} else {
		const updatedUsuario =
			await Usuario.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);
		res.status(200).json(updatedUsuario);
	}
};

export const deleteUsuarioById = async (
	req,
	res
) => {
	await Usuario.findByIdAndDelete(
		req.params.id
	);
	res.status(204).json();
};

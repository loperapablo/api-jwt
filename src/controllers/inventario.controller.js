import Inventario from '../models/Inventario';
import Usuario from '../models/Usuarios';
import EstadoEquipo from '../models/EstadoEquipo';
import Marcas from '../models/Marcas';
import TipoEquipo from '../models/TipoEquipo';

export const createInventario = async (
	req,
	res
) => {
	const {
		modelo,
		descripcion,
		color,
		precio,
		usuario,
		marca,
		estadoEquipo,
		tipoEquipo,
	} = req.body;

	const nuevoInventario = new Inventario({
		modelo,
		descripcion,
		color,
		precio,
	});

	try {
		const foundUsuario = await Usuario.findOne(
			{
				email: { $in: usuario },
			}
		);
		if (!foundUsuario) {
			return res
				.status(400)
				.json('Usuario no existe');
		}

		const foundMarca = await Marcas.findOne({
			nombre: { $in: marca },
		});
		if (!foundMarca) {
			return res
				.status(400)
				.json('Marca no existe');
		}

		const foundestadoEquipo =
			await EstadoEquipo.findOne({
				nombre: { $in: estadoEquipo },
			});

		if (!foundestadoEquipo) {
			return res
				.status(400)
				.json('Estado de equipo no existe');
		}

		const foundtipoEquipo =
			await TipoEquipo.findOne({
				nombre: {
					$in: tipoEquipo,
				},
			});
		if (!foundtipoEquipo) {
			return res
				.status(400)
				.json('Tipo de equipo no existe');
		}

		nuevoInventario.usuario = foundUsuario._id;
		nuevoInventario.marca = foundMarca._id;
		nuevoInventario.estadoEquipo =
			foundestadoEquipo._id;
		nuevoInventario.tipoEquipo =
			foundtipoEquipo._id;
	} catch (error) {
		console.log(error);
	}

	const inventarioGuardado =
		await nuevoInventario.save();
	console.log(inventarioGuardado);
	res.status(201).json(inventarioGuardado);
};

export const getInventarios = async (
	req,
	res
) => {
	const inventarios = await Inventario.find();
	res.json(inventarios);
};

export const getInventarioById = async (
	req,
	res
) => {
	const inventario = await Inventario.findById(
		req.params.id
	);
	res.status(200).json(inventario);
};

export const updateInventarioById = async (
	req,
	res
) => {
	const {
		usuario,
		marca,
		estadoEquipo,
		tipoEquipo,
	} = req.body;

	if (usuario) {
		const foundUsuario = await Usuario.findOne(
			{
				email: { $in: usuario },
			}
		);
		if (!foundUsuario) {
			return res
				.status(400)
				.json('Usuario no existe');
		}
		req.body.usuario = foundUsuario._id;
	}

	if (marca) {
		const foundMarca = await Marcas.findOne({
			nombre: { $in: marca },
		});
		if (!foundMarca) {
			return res
				.status(400)
				.json('Marca no existe');
		}
		req.body.marca = foundMarca._id;
	}

	if (estadoEquipo) {
		const foundestadoEquipo =
			await EstadoEquipo.findOne({
				nombre: { $in: estadoEquipo },
			});

		if (!foundestadoEquipo) {
			return res
				.status(400)
				.json('Estado de equipo no existe');
		}
		req.body.estadoEquipo =
			foundestadoEquipo._id;
	}

	if (tipoEquipo) {
		const foundtipoEquipo =
			await TipoEquipo.findOne({
				nombre: {
					$in: tipoEquipo,
				},
			});
		if (!foundtipoEquipo) {
			return res
				.status(400)
				.json('Tipo de equipo no existe');
		}
		req.body.tipoEquipo = foundtipoEquipo._id;
	}

	const updatedUsuario =
		await Inventario.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
	res.status(200).json(updatedUsuario);
};

export const deleteInventarioById = async (
	req,
	res
) => {
	await Inventario.findByIdAndDelete(
		req.params.id
	);
	res.status(204).json();
};

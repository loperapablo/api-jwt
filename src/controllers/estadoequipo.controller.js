import EstadoEquipo from '../models/EstadoEquipo';

export const createEstadoEquipo = async (
	req,
	res
) => {
	const { nombre, estado } = req.body;
	const newEstadoEquipo = new EstadoEquipo({
		nombre,
		estado,
	});

	const estadoEquipoSaved =
		await newEstadoEquipo.save();

	res.status(201).json(estadoEquipoSaved);
};

export const getEstadoEquipos = async (
	req,
	res
) => {
	const estadoEquipos =
		await EstadoEquipo.find();
	res.json(estadoEquipos);
};

export const getEstadoEquipoById = async (
	req,
	res
) => {
	const estadoequipo =
		await EstadoEquipo.findById(req.params.id);
	res.status(200).json(estadoequipo);
};

export const updateEstadoEquipoById = async (
	req,
	res
) => {
	const updatedEstadoEquipo =
		await EstadoEquipo.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
	res.status(200).json(updatedEstadoEquipo);
};

export const deleteEstadoEquipoById = async (
	req,
	res
) => {
	await EstadoEquipo.findByIdAndDelete(
		req.params.id
	);
	res.status(204).json();
};

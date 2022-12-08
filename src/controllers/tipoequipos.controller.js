import TipoEquipo from '../models/TipoEquipo';

export const createTipoEquipo = async (
	req,
	res
) => {
	const { nombre, estado } = req.body;
	const newTipoEquipo = new TipoEquipo({
		nombre,
		estado,
	});

	const tipoEquipoSaved =
		await newTipoEquipo.save();

	res.status(201).json(tipoEquipoSaved);
};

export const getTipoEquipos = async (
	req,
	res
) => {
	const tipoEquipos = await TipoEquipo.find();
	res.json(tipoEquipos);
};

export const getTipoEquipoById = async (
	req,
	res
) => {
	const tipoequipo = await TipoEquipo.findById(
		req.params.id
	);
	res.status(200).json(tipoequipo);
};

export const updateTipoEquipoById = async (
	req,
	res
) => {
	const updatedTipoequipo =
		await TipoEquipo.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
	res.status(200).json(updatedTipoequipo);
};

export const deleteTipoEquipoById = async (
	req,
	res
) => {
	await TipoEquipo.findByIdAndDelete(
		req.params.id
	);
	res.status(204).json();
};

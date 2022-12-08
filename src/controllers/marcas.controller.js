import Marca from '../models/Marcas';

export const createMarca = async (
	req,
	res
) => {
	const { nombre, estado } = req.body;
	const newMarca = new Marca({
		nombre,
		estado,
	});

	const marcaSaved = await newMarca.save();

	res.status(201).json(marcaSaved);
};

export const getMarca = async (req, res) => {
	const marca = await Marca.find();
	res.json(marca);
};

export const getMarcaById = async (
	req,
	res
) => {
	const marca = await Marca.findById(
		req.params.id
	);
	res.status(200).json(marca);
};

export const updateMarcaById = async (
	req,
	res
) => {
	const updatedMarca =
		await Marca.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
	res.status(200).json(updatedMarca);
};

export const deleteMarcaById = async (
	req,
	res
) => {
	await Marca.findByIdAndDelete(req.params.id);
	res.status(204).json();
};

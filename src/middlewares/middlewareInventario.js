import Inventario from '../models/Inventario';

export const checkDuplicateModelo = async (
	req,
	res,
	next
) => {
	const modelo = await Inventario.findOne({
		modelo: req.body.modelo,
	});
	if (modelo)
		return res
			.status(400)
			.json({
				message: 'Este modelo ya existe',
			});
	next();
};

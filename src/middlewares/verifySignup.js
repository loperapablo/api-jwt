import { ROLES } from '../models/Roles';
import Usuarios from '../models/Usuarios';

export const checkDuplicateEmail = async (
	req,
	res,
	next
) => {
	const email = await Usuarios.findOne({
		email: req.body.email,
	});
	if (email)
		return res
			.status(400)
			.json({ message: 'Email en uso' });
	next();
};

export const checkRolesExisted = (
	req,
	res,
	next
) => {
	if (req.body.roles) {
		for (
			let i = 0;
			i < req.body.roles.length;
			i++
		) {
			if (!ROLES.includes(req.body.roles[i])) {
				return res.status(400).json({
					message: `Rol ${req.body.roles[i]} no existe`,
				});
			}
		}
	}
	next();
};

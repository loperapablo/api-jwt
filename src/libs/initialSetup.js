import Role from '../models/Roles';

export const createRoles = async () => {
	const count =
		await Role.estimatedDocumentCount();

	if (count > 0) return;

	try {
		const values = await Promise.all([
			new Role({
				nombre: 'administrador',
			}).save(),
			new Role({
				nombre: 'docente',
			}).save(),
			new Role({
				nombre: 'usuario',
			}).save(),
		]);

		console.log(values);
	} catch (error) {
		console.log(error);
	}
};

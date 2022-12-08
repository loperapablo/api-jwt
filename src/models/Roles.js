import { Schema, model } from 'mongoose';

export const ROLES = [
	'usuario',
	'administrador',
	'docente',
];

const roleSchema = new Schema(
	{
		nombre: String,
	},
	{
		versionKey: false,
	}
);

export default model('Role', roleSchema);

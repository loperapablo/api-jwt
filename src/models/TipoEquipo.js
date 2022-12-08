import mongoose, { model } from 'mongoose';

var Schema = mongoose.Schema;

const tipoEquipoSchema = new Schema(
	{
		nombre: String,
		estado: Boolean,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model(
	'TipoEquipo',
	tipoEquipoSchema
);

import mongoose, { model } from 'mongoose';

var Schema = mongoose.Schema;

const marcasSchema = new Schema(
	{
		nombre: String,
		estado: Boolean,
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model('Marca', marcasSchema);

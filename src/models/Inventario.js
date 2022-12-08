import { Schema, model } from 'mongoose';

const inventarioSchema = new Schema(
	{
		modelo: {
			type: String,
			unique: true,
		},
		descripcion: {
			type: String,
		},
		color: {
			type: String,
		},
		precio: {
			type: Number,
		},
		usuario: [
			{
				ref: 'Usuario',
				type: Schema.Types.ObjectId,
			},
		],
		marca: [
			{
				ref: 'Marcas',
				type: Schema.Types.ObjectId,
			},
		],
		estadoEquipo: [
			{
				ref: 'EstadoEquipos',
				type: Schema.Types.ObjectId,
			},
		],
		tipoEquipo: [
			{
				ref: 'TipoEquipos',
				type: Schema.Types.ObjectId,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model(
	'Inventario',
	inventarioSchema
);

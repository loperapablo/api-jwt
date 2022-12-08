import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose
	.connect('mongodb://localhost/api-db', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((db) =>
		console.log('La DB está conectada.')
	)
	.catch((error) => console.log(error));

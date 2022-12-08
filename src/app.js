import express from 'express';
import morgan from 'morgan';
import { createRoles } from './libs/initialSetup';
import tipoEquiposRoutes from './routes/tipoequipos.routes';
import authRoutes from './routes/auth.routes';
import usuariosRoutes from './routes/usuarios.routes';
import estadoEquipoRoutes from './routes/estadoequipos.routes';
import marcasRoutes from './routes/marcas.routes';
import inventariosRoutes from './routes/inventario.routes';

const app = express();
createRoles();

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		Autor: 'Pablo Lopera',
		Descripcion: 'API con JWT',
	});
});

app.use('/api/tipoequipos', tipoEquiposRoutes);
app.use('/api/marcas', marcasRoutes);
app.use('/api/inventarios', inventariosRoutes);
app.use(
	'/api/estadoequipos',
	estadoEquipoRoutes
);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

export default app;

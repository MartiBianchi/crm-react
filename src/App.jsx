import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './layout/Layout';
import { Inicio } from './pages/Inicio';
import { NuevoCliente } from './pages/NuevoCliente';
import { EditarCliente } from './pages/EditarCliente';
import { VerCliente } from './pages/VerCliente';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/clientes' element={<Layout />}>
					<Route index element={<Inicio />} />
					<Route path='nuevo' element={<NuevoCliente />} />
					<Route path='editar/:id' element={<EditarCliente />} />
					<Route path=':id' element={<VerCliente />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;

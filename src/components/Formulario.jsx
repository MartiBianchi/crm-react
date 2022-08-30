import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Alerta } from './Alerta';
import { Spinner } from './Spinner';

export const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  // Validaciones
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
      .email('El email no es válido')
      .required('El email es obligatorio'),
    telefono: Yup.number()
      .positive('Número no válido')
      .integer('Número no válido')
      .typeError('Número no válido'),
  });

  const handleSubmit = async (values) => {
    try {
      let respuesta;

      if (cliente.id) {
        // Editar registro
        const url = `http://localhost:3000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Nuevo registro
        const url = 'http://localhost:3000/clientes';

        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      await respuesta.json();

      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className='bg-white mt-10 px-5 py-10 rounder-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
        {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className='mt-10'>
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='nombre'>
                  Nombre:
                </label>
                <Field
                  id='nombre'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-100 capitalize'
                  placeholder='Nombre del Cliente'
                  name='nombre'
                />

                {/* Validación en tiempo real */}
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='empresa'>
                  Empresa:
                </label>
                <Field
                  id='empresa'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-100 capitalize'
                  placeholder='Empresa del Cliente'
                  name='empresa'
                />

                {/* Validación en tiempo real */}
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='email'>
                  E-mail:
                </label>
                <Field
                  id='email'
                  type='email'
                  className='mt-2 block w-full p-3 bg-gray-100'
                  placeholder='Email del Cliente'
                  name='email'
                />

                {/* Validación en tiempo real */}
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='telefono'>
                  Teléfono:
                </label>
                <Field
                  id='telefono'
                  type='tel'
                  className='mt-2 block w-full p-3 bg-gray-100'
                  placeholder='Teléfono del Cliente'
                  name='telefono'
                />

                {/* Validación en tiempo real */}
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='notas'>
                  Notas:
                </label>
                <Field
                  as='textarea'
                  id='notas'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-100'
                  placeholder='Notas del Cliente'
                  name='notas'
                />
              </div>

              <input
                type='submit'
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-700'
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

// Default Props
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

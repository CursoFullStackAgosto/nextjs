import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function LoginPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        setError('Credenciales incorrectas');
        return;
      }

      const data = await response.json();
      localStorage.setItem('t', data.token);
      setMessage('Inicio de sesión exitoso, seras redirigido a la página principal.');

      setTimeout(() => {
        router.push('/');
      }, 2000)

    } catch (error) {
      console.log(error);
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
              <h2 className="text-3xl font-bold text-gra-900 mb-2">
                Iniciar Sesión
              </h2>
              <p>Accede al sistema de Parqueadero</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                {message}
            </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {/* Wrapper o envoltura de formulario */}
            <div className="space-y-4">
              {/* Wrapper de input correo electrónico */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Wrapper de input contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <input 
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:outline-none fucus:ring-2 focus:ring-offset-2 fucus:ring-indigo-500 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              ): (
                'Iniciar Sesión'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm -text-gray-600">¿No tienes una cuenta?{' '}</p>
              <Link 
                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200"
                href="/register">
                Regístrate aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

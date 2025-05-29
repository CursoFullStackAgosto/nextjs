import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";

function LoginPage() {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(router.query.message) {
            setMessage(router.query.message);
        }
    }, []);

    const initialState = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || "Error al iniciar sesión, por favor intenta de nuevo."
                );
                return;
            }

            localStorage.setItem("t", data.token);
            setMessage("Inicio de sesión exitoso, bienvenido al parqueadero.");
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                router.push("/");
            }, 2000);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError("Error al iniciar sesión, por favor intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br
    from-indigo-50 to-blue-50 flex items-cente justify-center py-12
    px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <div className="text-center ">
                        <div
                            className="mx-auto h-16 w-16
            bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full
            flex items-center justify-center mb-4"
                        >
                            <svg
                                className="h-8 w-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Iniciar Sesión
                        </h2>
                        <p>Accede al sistema de Parqueadero</p>

                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            {/* Mensajes de éxito o error */}
                            {message && (
                                <div
                                    className="bg-green-50 border border-green-200
            text-green-600 px-4 py-3 rounded-lg text-sm"
                                >
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div
                                    className="bg-red-50 border border-red-200
                text-red-600 px-4 py-3 rounded-lg text-sm"
                                >
                                    {error}
                                </div>
                            )}
                            {/* Wrapper del form */}
                            <div className="space-y-4">
                                {/* Wrapper de input del email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Correo Electrónico
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="tu@correo.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                          transition duration-200 placeholder:text-gray-400"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    {/* Wrapper de input del password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Contraseña
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                placeholder="********"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                            transition duration-200 placeholder:text-gray-400"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center px-4 py-3 border border-transparent
               rounded-lg shadow-sm text-white bg-gradient-to-r
               from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
               font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed
               cursor-pointer"
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </button>

                            <div className="text-center ">
                                <p className="text-sm text-gray-600">¿No tenés cuenta? </p>
                                <Link
                                    className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200"
                                    href="/register"
                                >
                                    Registrate acá, nabo
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

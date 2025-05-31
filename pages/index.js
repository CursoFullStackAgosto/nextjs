import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TOKEN_STRING } from "@/constants";

export default function Home() {
  const router = useRouter();

  const [formData, setFromData] = useState({
    placa: "",
    nombreConductor: "",
    telefono: "",
  });

  const mockEntries = [
    {
      id: 1,
      placa: "ABC-123",
      nombreConductor: "Juan Perez",
      telefono: "1234567890",
    },
    {
      id: 2,
      placa: "DEF-456",
      nombreConductor: "Maria Lopez",
      telefono: "0987654321",
    },
    {
      id: 3,
      placa: "GHI-789",
      nombreConductor: "Carlos Gomez",
      telefono: "1122334455",
    },
  ];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState(mockEntries);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validamos si hay token y usuario
  // useEffect(() => {
  //   const token = localStorage.getItem('t');
  //     if (!token) {
  //         router.push('/login');
  //         return;
  //     }

  //     fetchEntries();
  // }, []);

  // Obtenemos todas las entradas del parking
  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/parking/entries");
      const data = await response.json();

      if (response.ok) {
        setEntries(data);
      } else {
        setError(data.message || "Error al cargar las entradas.");
      }
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
    }
  };

  // Manejamos endpoint para agregar las entradas de autos definidas en api/parking/entries
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/parking/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = response.json();

      if (response.ok) {
        setSuccess(data.message || "Vehículo registrado exitosamente.");
        setFormData({ placa: "", nombreConductor: "", telefono: "" });
      } else {
        setError(data.message || "Error al registrar el vehículo.");
      }
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STRING);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div
                className="h-10 w-10 bg-gradient-to-r
          from-blue-500 to-indigo-600 rounded-lg
          flex items-center justify-center"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Sistema de Parqueadero
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2
              rounded-lg font-medium transition duration-300 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de entrada  */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div
                className="h-8 w-8 bg-gradient-to-r
                        from-green-500 to-emerald-600 rounded-lg
                        flex items-center justify-center mr-3"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Ingresar Vehículo</h2>
            </div>

            <form className="space-y-4">
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="placa"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Número de placa
                </label>
                <input
                  required
                  id="placa"
                  name="placa"
                  type="text"
                  placeholder="ABC-123"
                  value={formData.placa}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 uppercase"
                />
              </div>

              <div>
                <label
                  htmlFor="nombreConductor"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre del conductor
                </label>
                <input
                  required
                  id="nombreConductor"
                  name="nombreConductor"
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.nombreConductor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Número de teléfono
                </label>
                <input
                  required
                  id="telefono"
                  name="telefono"
                  type="text"
                  placeholder="123-456-789"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
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
                    Registrando...
                  </div>
                ) : (
                  "Registrar vehículo"
                )}
              </button>
            </form>
          </div> */}

          {/* Lista de Vehículos */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Vehículos en el Parqueadero
                </h2>
              </div>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {entries.length} vehículos
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {entries.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    No hay vehículos registrados
                  </p>
                </div>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-lg">
                            {entry.placa}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            1h
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium">
                          {entry.nombreConductor}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {entry.telefono}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Entrada: 10:00 AM
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                        <button disabled={deleteLoading} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs fount-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                          {deleteLoading ? (
                            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            'Salida'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
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
                Sistema de Gestión de Parqueadero
              </h1>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200 cursor-pointer">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div>
        <div>

          {/* Formulario de entrada*/}
          <div>
            <div>
              <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="">
                Registrar Entrada
              </h2>
            </div>

            <form>
              <div>
                <label>Número de placa</label>
                <input type="text" placeholder="ABC-123" />
              </div>

              <div>
                <label>Nombre del Conductor</label>
                <input type="text" placeholder="Nombre completo" />
              </div>

              <div>
                <label>Número de teléfono</label>
                <input type="text" placeholder="300 123 9231" />
              </div>

              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition duration-200 cursor-pointer">
                Registrar Vehículo
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

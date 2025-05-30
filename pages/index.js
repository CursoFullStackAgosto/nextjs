import { useState , useEffect} from "react";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  const[formData, setFromData] = useState ({
    placa: '',
    nombreConductor: '',
    telefono: ''
  });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [entries, setEntries] = useState([]);


    // Validamos si hay token y usuario
    useEffect(() => {
      const token = localStorage.getItem('t');
        if (!token) {
            router.push('/login');
            return;
        }

        fetchEntries();
    }, []);

    // Obtenemos todas las entradas del parking
    const fetchEntries = async () => {
        try {
            const response = await fetch('/api/parking/entries');
            const data = await response.json();

            if (response.ok) {
                setEntries(data);
            } else {
                setError(data.message || 'Error al cargar las entradas.');
            }
        } catch (error) {
            setError('Error de conexión. Intente nuevamente.');
        }
    }

    // Manejamos endpoint para agregar las entradas de autos definidas en api/parking/entries
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setLoading(true);

        try {
            const response = await fetch('/api/parking/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
              body: JSON.stringify(formData)
            });

            const data = response.json()

            if (response.ok) {
                setSuccess(data.message || 'Vehículo registrado exitosamente.');
                setFormData({ placa: '', nombreConductor: '', telefono: '' });
            } else {
                setError(data.message || 'Error al registrar el vehículo.');
            }
        }catch (error) {
            setError('Error de conexión. Intente nuevamente.');
        }
        finally {
          setLoading(false);
        }

    }


  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
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
                  Sistema de gestión de parqueadero
                </h1>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2
                rounded-lg font-medium transition duration-300 cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}

        <div>
          <div>
            {/* Formulario de entrada  */}

            <div>
              <div>
                <div
                    className="h-8 w-8 bg-gradient-to-r
                        from-green-500 to-emerald-600 rounded-lg
                        flex items-center justify-center"
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
                <h2 className="">Ingresar vehículo</h2>
              </div>

              <form>
                <div>
                  <label>Número de placa</label>
                  <input type="text" placeholder="ABC-123" value={formData.placa} />
                </div>

                <div>
                  <label>Nombre del conductor</label>
                  <input type="text" placeholder="Nombre completo" value={formData.nombreConductor}/>
                </div>

                <div>
                  <label>Número de teléfono</label>
                  <input type="text" placeholder="123-456-789" value={formData.telefono}/>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2
                rounded-lg font-medium transition duration-300 cursor-pointer"
                >
                  Registrar vehículo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}


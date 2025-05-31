import dbConnect from "@/lib/dbConnect";
import ParkingEntry from "@/models/ParkingEntry";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
        try {
        const entry = await ParkingEntry.findById(id);

            res.status(200).json({
            success: true,
            data: entry
            });

        } catch (error) {
            console.log('Error al obtener entrada:', error);
            res.status(500).json({
            success: false,
            message: 'Error al obtener la entrada.'
            });
        }
        break;

        case 'POST':
            try {
                const { placa, nombreConductor, telefono } = req.body;

                if (!placa || !nombreConductor || !telefono) {
                    return res.status(400).json({
                        success: false,
                        message: 'Por favor, complete todos los campos requeridos.'
                    });
                }

                // Verificar si ya existe un vehiculo en el parking
                const existingEntry = await ParkingEntry.findOne({ placa: placa.toUpperCase() });
                if (existingEntry) {
                    return res.status(400).json({
                        success: false,
                        message: 'Este vehículo ya está registrado en el parking.'
                    });
                }

                // Ingresamos el vehiculo
                const entry = await ParkingEntry.create({
                    placa: placa.toUpperCase(),
                    nombreConductor,
                    telefono
                });

                res.status(201).json({
                    success: true,
                    message: 'Vehículo registrado exitosamente.',
                    data: entry
                });


            } catch (error) {}
            console.log('Error al crear entrada:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear la entrada.'
            });

            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }

}


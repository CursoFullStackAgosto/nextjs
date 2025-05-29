import dbConnect from "@/lib/dbConnect";
import ParkingEntry from "@/models/ParkingEntry";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'DELETE':
            try {
                const deletedEntry = await ParkingEntry.findByIdAndDelete(id);

                if (!deletedEntry) {
                    return res.status(404).json({
                        success: false,
                        message: 'Entrada no encontrada.'
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'Vehículo removido del parking exitosamente.',
                    data: deletedEntry
                });

            } catch (error) {
                console.log('Error al eliminar entrada:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error al remover el vehículo del parking.'
                });
            }
            break;

        case 'GET':
            try {
                const entry = await ParkingEntry.findById(id);

                if (!entry) {
                    return res.status(404).json({
                        success: false,
                        message: 'Entrada no encontrada.'
                    });
                }

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

        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }

}

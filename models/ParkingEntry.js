import mongoose from "mongoose";

const ParkingEntrySchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: [true, 'Por favor, ingrese el número de placa del vehículo.'],
    trim: true,
    maxlength: [10, 'El número de placa no puede tener más de 10 caracteres.']
  },
  ownerName: {
    type: String,
    required: [true, 'Por favor, ingrese el nombre del propietario del vehículo.'],
    trim: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  }
});

const ParkingEntry = mongoose.models.ParkingEntry || mongoose.model('ParkingENtry', ParkingEntrySchema)

export default ParkingEntry;
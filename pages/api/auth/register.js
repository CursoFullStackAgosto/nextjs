import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ message: 'Por favor, ingrese un email y una contraseña.'})
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
          return res.status(400).json({ success: false, message: 'El usuario ya fue registrado.' })
        }

        const user = await User.create({ email, password });
        console.log(user);
        res.status(201).json({ success: true, massage: 'Usuario registrado correctamente.' })
      } catch (error) {
        console.log('Error al registrar el usuario', error);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }
      break;
    case 'GET':
      try {
        return res.status(200).json({ message: 'Hello World' });
      } catch (error) {
        return res.status(500).json({  message: 'Error al obtener los datos' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not ALlowed`);
      break;
  }
}
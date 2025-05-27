import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method !== 'POST') {
    return res.status(405).end(`Method ${method} Not Allowed`)
  }

  const JWT_SECRET = process.env.JWT_SECRET

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'No se ha configurado la variable de entorno JWT_SECRET.'
    })
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, ingrese email y contraseña.'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas.'
      })
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if(!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas.'
      })
    }

    const token = jwt.sign({
      userId: user.id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    success: true,
    message: 'Inicio de sesión exitoso.',
    token,
    user: {
      id: user._id,
      email: user.email
    }
  })

  } catch (error) {
    console.log('Error al iniciar sesión', error);
    return res.status(500).json({
      success: false,
      message: 'Error del servidor al iniciar sesión.'
    })
  }
}
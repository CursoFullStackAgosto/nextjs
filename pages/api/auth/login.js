import User from "@/models/User";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    // const JWT_SECRET = process.env.JWT_SECRET;
    // if (!JWT_SECRET) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "JWT secret is not defined",
    //     });
    // }

    switch (method) {
        case "POST":

            try {
                const { email, password } = req.body;

                if (!email || !password) {
                    return res.status(400).json({
                        success: false,
                        message: "Email and password are required",
                    });
                }

                // Buscamos usuario
                const user = await User.findOne({ email }).select("+password");

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid credentials",
                    });
                }

                // Verificar contraseña
                const isPasswordCorrect = await user.matchPassword(password);

                if (!isPasswordCorrect) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid password",
                    });
                }

                // Generamos JWT TOKEN
                const token = jwt.sign(
                    {
                        userId: user.id,
                        email: user.email,
                    },
                    process.env.JWT_SECRET || 'fallback-secret-key',
                    {
                        expiresIn: "8h",
                    }
                );

                return res.status(200).json({
                    success: true,
                    message: "Login successful",
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                    },
                });
            } catch (error) {
                console.error("Error in login handler:", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                });
            }

        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }

}

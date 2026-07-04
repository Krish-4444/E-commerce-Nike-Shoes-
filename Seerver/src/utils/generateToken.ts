import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_here';
  const expiresIn = '30d';
  return jwt.sign({ id }, secret, { expiresIn });
};

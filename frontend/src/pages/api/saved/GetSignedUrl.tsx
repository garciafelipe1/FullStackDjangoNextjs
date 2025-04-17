import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises'; // Usamos fs.promises para async/await

// Configuración para la carpeta de subidas local
const UPLOADS_FOLDER = path.join(process.cwd(), 'public', 'uploads');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('POST request received at /api/saved/GetSignedUrl');
    console.log('Request Body:', req.body);
    try {
      // Simulación de recepción de un archivo (esto dependerá de cómo envíes el archivo desde el frontend)
      // Aquí asumimos que el 'key' en el body es el nombre deseado para el archivo
      const { key, fileData } = req.body; // 'fileData' sería la información del archivo (ej: base64)

      if (!key) {
        console.error('Error: Missing key in request body.');
        return res.status(400).json({ error: 'Missing key in request body.' });
      }
      if (!fileData) {
        console.error('Error: Missing fileData in request body.');
        return res.status(400).json({ error: 'Missing file data in request body.' });
      }

      console.log('UPLOADS_FOLDER:', UPLOADS_FOLDER);
      // Asegúrate de que la carpeta de subidas exista
      try {
        await fs.mkdir(UPLOADS_FOLDER, { recursive: true });
        console.log('Uploads folder created or already exists.');
      } catch (error) {
        console.error('Error creating uploads folder:', error);
        return res.status(500).json({ error: 'Failed to create uploads folder.' });
      }

      const filePath = path.join(UPLOADS_FOLDER, key);
      console.log('filePath:', filePath);

      // Simulación de escritura del archivo local
      // Si estás enviando el archivo de otra manera (ej: FormData), necesitarás un middleware como 'next-connect' o similar para manejar la subida.
      try {
        // Asumiendo que fileData es base64 (necesitarías adaptarlo según tu forma de enviar el archivo)
        const buffer = Buffer.from(fileData, 'base64');
        await fs.writeFile(filePath, buffer);
        console.log('File written successfully to:', filePath);
      } catch (error) {
        console.error('Error writing file:', error);
        return res.status(500).json({ error: 'Failed to write file.' });
      }

      // Generar la URL local para acceder al archivo
      const localFileURL = `/uploads/${key}`;
      console.log('localFileURL:', localFileURL);

      return res.status(200).json({ results: localFileURL });
    } catch (error: any) {
      console.error('Error handling upload:', error);
      return res.status(500).json({ error: 'Failed to handle file upload.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Ruta para subir archivos
app.post('/subir', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'ruta/a/tus/credenciales.json',
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });

  const drive = google.drive({ version: 'v3', auth });

  // Lógica para subir el archivo a Google Drive
  // Reemplaza 'ruta/del/archivo' con el path del archivo en tu servidor
  const fileMetadata = {
    name: 'nombre_del_archivo_en_drive.txt',
  };

  const media = {
    mimeType: 'text/plain',
    body: fs.createReadStream('ruta/del/archivo'),
  };

  try {
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Eliminar archivo del servidor local después de subirlo a Drive
    fs.unlinkSync('ruta/del/archivo');

    res.send('Archivo subido correctamente a Google Drive.');
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).send('Error al subir el archivo a Google Drive.');
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
      

import { ToastError } from '@/components/toast/toast';

export default async function uploadProfilePicture(file: File) {
  // Recibe directamente el objeto File
  try {
    const formData = new FormData();
    formData.append('profile_picture', file); // 'profile_picture' es el nombre del campo que el backend esperará

    const res = await fetch('/api/profile/upload_profile_picture', {
      method: 'POST',
      body: formData, // ¡Enviamos el FormData como body!
    });

    const data = await res.json();
    return data; // Espera que el backend responda con la URL de la imagen
  } catch (err) {
    console.error('Error uploading profile picture:', err);
    ToastError('Error uploading profile picture to backend');
  }
  return null;
}

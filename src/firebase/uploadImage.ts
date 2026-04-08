import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firebaseEnabled } from './config';

export async function uploadImage(path: string, file: File): Promise<string> {
  if (!firebaseEnabled) throw new Error('Firebase no configurado');
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

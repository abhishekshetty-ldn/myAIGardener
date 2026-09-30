import { db } from '../../../config/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const EnvironmentService = {
  // Fetch all environment zones for a specific user
  async getEnvironmentsByUser(userId) {
    const q = query(
      collection(db, 'garden_environments'),
      where('user_id', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Create a new garden environment zone
  async createEnvironment(envData) {
    const docRef = await addDoc(collection(db, 'garden_environments'), {
      ...envData,
      created_at: new Date().toISOString()
    });
    return docRef.id;
  }
};
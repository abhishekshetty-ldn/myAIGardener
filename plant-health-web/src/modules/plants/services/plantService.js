import { db } from '../../../config/firebaseConfig';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

export const PlantService = {
  // Fetch all registered plant profiles for a user
  async getPlantsByUser(userId) {
    const q = query(
      collection(db, 'plants'),
      where('user_id', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Register a new plant profile with its growth objective
  async registerPlant(plantData) {
    const docRef = await addDoc(collection(db, 'plants'), {
      ...plantData,
      created_at: new Date().toISOString()
    });
    return docRef.id;
  },

  // Add a watering event to a specific plant's subcollection
  async logWatering(plantId, { amountMl, method, notes }) {
    const logRef = collection(db, `plants/${plantId}/water_logs`);
    const docRef = await addDoc(logRef, {
      timestamp: serverTimestamp(),
      amount_ml: Number(amountMl),
      method,
      notes
    });
    return docRef.id;
  }
};
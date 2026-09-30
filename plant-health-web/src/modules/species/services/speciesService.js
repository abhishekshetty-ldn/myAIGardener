import { db } from '../../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const SpeciesService = {
  // Fetch all available species in the catalog
  async getSpeciesCatalog() {
    const snapshot = await getDocs(collection(db, 'species_catalog'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
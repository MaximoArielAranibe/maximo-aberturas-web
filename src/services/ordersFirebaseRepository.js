import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import {
  ORDER_COLLECTION_NAME,
  ORDER_PROVIDER_FIREBASE,
  ORDER_PROVIDER_LABELS,
  createOrderDraft,
  normalizeOrder,
  sortOrdersByDate,
} from '../helpers/orders.js';
import { getFirestoreDb, isFirebaseConfigured } from '../lib/firebase.js';

export const createFirebaseOrdersRepository = ({ collectionName = ORDER_COLLECTION_NAME } = {}) => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase no esta configurado. Se necesita VITE_FIREBASE_* para usar Firestore.');
  }

  const db = getFirestoreDb();

  return {
    kind: ORDER_PROVIDER_FIREBASE,
    label: ORDER_PROVIDER_LABELS[ORDER_PROVIDER_FIREBASE],
    collectionName,

    async listOrders() {
      const ordersQuery = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(ordersQuery);

      return sortOrdersByDate(snapshot.docs.map((entry) => normalizeOrder({ id: entry.id, ...entry.data() })));
    },

    async createOrder(orderInput) {
      const preparedOrder = orderInput.code ? normalizeOrder(orderInput) : createOrderDraft(orderInput);
      const { id: _id, displayId: _displayId, ...serializableOrder } = preparedOrder;
      const docRef = await addDoc(collection(db, collectionName), serializableOrder);

      return normalizeOrder({ ...serializableOrder, id: docRef.id });
    },

    async updateOrder(orderId, patch) {
      await updateDoc(doc(db, collectionName, orderId), {
        ...patch,
        updatedAt: new Date().toISOString(),
      });
    },
  };
};

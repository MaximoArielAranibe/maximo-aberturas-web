import {
  ORDER_COLLECTION_NAME,
  ORDER_PROVIDER_FIREBASE,
  ORDER_PROVIDER_LOCAL,
  ORDER_STORAGE_KEY,
} from '../helpers/orders.js';
import { createLocalOrdersRepository } from './ordersLocalRepository.js';

export const createOrdersRepository = async ({
  preferredProvider,
  storageKey = ORDER_STORAGE_KEY,
  collectionName = ORDER_COLLECTION_NAME,
} = {}) => {
  const requestedProvider = (preferredProvider || import.meta.env.VITE_ORDERS_PROVIDER || ORDER_PROVIDER_LOCAL).toLowerCase();

  if (requestedProvider === ORDER_PROVIDER_FIREBASE) {
    try {
      const { createFirebaseOrdersRepository } = await import('./ordersFirebaseRepository.js');
      return createFirebaseOrdersRepository({ collectionName });
    } catch (error) {
      console.warn('Firebase no esta disponible, se usa almacenamiento local.', error);

      return {
        ...createLocalOrdersRepository({ storageKey }),
        warning: 'Firebase no esta configurado o la dependencia todavia no fue instalada. Se usa almacenamiento local.',
      };
    }
  }

  return createLocalOrdersRepository({ storageKey });
};

import {
  ORDER_COLLECTION_NAME,
  ORDER_PROVIDER_FIREBASE,
  ORDER_PROVIDER_LOCAL,
  ORDER_STORAGE_KEY,
} from '../helpers/orders.js';
import { createLocalOrdersRepository } from './ordersLocalRepository.js';

export const createOrdersRepository = async ({
  storageKey = ORDER_STORAGE_KEY,
} = {}) => {
  return createLocalOrdersRepository({ storageKey });
};

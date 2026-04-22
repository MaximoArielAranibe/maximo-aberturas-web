import {
  ORDER_PROVIDER_LABELS,
  ORDER_PROVIDER_LOCAL,
  ORDER_STORAGE_KEY,
  createOrderDraft,
  normalizeOrder,
  sortOrdersByDate,
} from '../helpers/orders.js';

const readStoredOrders = (storageKey) => {
  try {
    const rawOrders = localStorage.getItem(storageKey);
    const parsedOrders = rawOrders ? JSON.parse(rawOrders) : [];

    return Array.isArray(parsedOrders) ? parsedOrders : [];
  } catch (error) {
    console.error('No se pudieron leer los pedidos locales:', error);
    return [];
  }
};

const writeStoredOrders = (storageKey, orders) => {
  localStorage.setItem(storageKey, JSON.stringify(orders));
};

export const createLocalOrdersRepository = ({ storageKey = ORDER_STORAGE_KEY } = {}) => ({
  kind: ORDER_PROVIDER_LOCAL,
  label: ORDER_PROVIDER_LABELS[ORDER_PROVIDER_LOCAL],
  storageKey,

  async listOrders() {
    return sortOrdersByDate(readStoredOrders(storageKey).map((order) => normalizeOrder(order)));
  },

  async createOrder(orderInput) {
    const preparedOrder = orderInput.code ? normalizeOrder(orderInput) : createOrderDraft(orderInput);
    const persistedOrder = normalizeOrder({
      ...preparedOrder,
      id: preparedOrder.id || preparedOrder.code,
      updatedAt: new Date().toISOString(),
    });

    const currentOrders = await this.listOrders();
    writeStoredOrders(storageKey, [persistedOrder, ...currentOrders]);

    return persistedOrder;
  },

  async updateOrder(orderId, patch) {
    const currentOrders = await this.listOrders();
    let updatedOrder = null;

    const nextOrders = currentOrders.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      updatedOrder = normalizeOrder({
        ...order,
        ...patch,
        customer: patch.customer ? { ...order.customer, ...patch.customer } : order.customer,
        updatedAt: new Date().toISOString(),
      });

      return updatedOrder;
    });

    if (!updatedOrder) {
      throw new Error(`No se encontro el pedido ${orderId}`);
    }

    writeStoredOrders(storageKey, nextOrders);

    return updatedOrder;
  },
});

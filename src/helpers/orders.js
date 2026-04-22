import { formatPrice } from '../hooks/formatPrice.js';

export const ORDER_STORAGE_KEY = 'maximo_orders';
export const ORDER_COLLECTION_NAME = 'orders';
export const ORDER_PROVIDER_LOCAL = 'local';
export const ORDER_PROVIDER_FIREBASE = 'firebase';

export const ORDER_PROVIDER_LABELS = {
  [ORDER_PROVIDER_LOCAL]: 'Local (localStorage)',
  [ORDER_PROVIDER_FIREBASE]: 'Firebase / Firestore',
};

export const ORDER_STATUS_OPTIONS = [
  'pendiente',
  'confirmado',
  'en_produccion',
  'listo',
  'entregado',
  'cancelado',
];

export const PAYMENT_STATUS_OPTIONS = ['pendiente', 'pagado'];

export const PAYMENT_METHOD_OPTIONS = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'acordar', label: 'A coordinar' },
];

export const ORDER_STATUS_LABELS = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  en_produccion: 'En produccion',
  listo: 'Listo para entregar',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

export const PAYMENT_STATUS_LABELS = {
  pendiente: 'Pago pendiente',
  pagado: 'Pagado',
};

export const PAYMENT_METHOD_LABELS = PAYMENT_METHOD_OPTIONS.reduce((accumulator, option) => {
  accumulator[option.value] = option.label;
  return accumulator;
}, {});

const sanitizeString = (value) => (value === null || value === undefined ? '' : String(value).trim());

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getDateKey = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10).replace(/-/g, '');
  }

  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const buildLegacyOrderCode = (order, createdAt, customerName) => {
  const identity = sanitizeString(order.code || order.orderNumber || order.orderId || order.id);

  if (identity) {
    return identity;
  }

  const safeName = (customerName || 'WEB')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 4) || 'WEB';

  return `PED-${getDateKey(createdAt)}-${safeName}`;
};

export const getOrderStatusLabel = (value) => ORDER_STATUS_LABELS[value] || value || 'Sin estado';
export const getPaymentStatusLabel = (value) => PAYMENT_STATUS_LABELS[value] || value || 'Sin pago';
export const getPaymentMethodLabel = (value) => PAYMENT_METHOD_LABELS[value] || value || 'No informado';

export const normalizeCustomer = (customer = {}, order = {}) => ({
  name: sanitizeString(customer.name || order.customerName || order.name || 'Cliente sin nombre'),
  phone: sanitizeString(customer.phone || order.customerPhone || order.phone),
  email: sanitizeString(customer.email || order.customerEmail || order.email),
  address: sanitizeString(customer.address || order.customerAddress || order.address),
});

export const normalizeOrderItems = (items = []) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      const quantity = Math.max(1, toNumber(item.quantity ?? item.qty ?? 1) || 1);
      const price = toNumber(item.price ?? item.unitPrice ?? item.unit_price ?? item.subtotal);
      const subtotal = toNumber(item.subtotal) || price * quantity;
      const title = sanitizeString(item.title || item.name || item.productName || `Producto ${index + 1}`);

      return {
        id: item.id ?? item.productId ?? item.sku ?? `item-${index + 1}`,
        productId: item.productId ?? item.id ?? null,
        title,
        thumbnail: sanitizeString(item.thumbnail || item.image || item.photo),
        quantity,
        price,
        subtotal,
      };
    })
    .filter((item) => item.title || item.price || item.quantity);
};

const getRawItems = (order = {}) => {
  if (Array.isArray(order.items)) {
    return order.items;
  }

  if (Array.isArray(order.cart)) {
    return order.cart;
  }

  if (Array.isArray(order.products)) {
    return order.products;
  }

  return [];
};

export const normalizeOrder = (order = {}) => {
  const createdAt =
    sanitizeString(order.createdAt || order.date || order.created_at || order.timestamp) ||
    new Date().toISOString();

  const customer = normalizeCustomer(order.customer || order.client || {}, order);
  const items = normalizeOrderItems(getRawItems(order));
  const total = toNumber(order.total) || items.reduce((accumulator, item) => accumulator + item.subtotal, 0);
  const statusCandidate = sanitizeString(order.status || order.orderStatus);
  const paymentStatusCandidate = sanitizeString(order.paymentStatus || order.payment_state || (order.isPaid ? 'pagado' : ''));
  const paymentMethodCandidate = sanitizeString(order.paymentMethod || order.method || order.payment_method);
  const code = buildLegacyOrderCode(order, createdAt, customer.name);
  const id = sanitizeString(order.id || order.docId || order.documentId) || code;

  return {
    id,
    code,
    displayId: code || id,
    createdAt,
    updatedAt: sanitizeString(order.updatedAt || order.updated_at) || createdAt,
    customer,
    items,
    total,
    status: ORDER_STATUS_OPTIONS.includes(statusCandidate) ? statusCandidate : 'pendiente',
    paymentStatus: PAYMENT_STATUS_OPTIONS.includes(paymentStatusCandidate) ? paymentStatusCandidate : 'pendiente',
    paymentMethod: PAYMENT_METHOD_LABELS[paymentMethodCandidate] ? paymentMethodCandidate : 'efectivo',
    notes: sanitizeString(order.notes || order.comment || order.comments),
    source: sanitizeString(order.source || 'web'),
    channel: sanitizeString(order.channel || 'whatsapp'),
  };
};

export const sortOrdersByDate = (orders = []) =>
  [...orders].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

export const generateOrderCode = (date = new Date()) => {
  const randomToken = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PED-${getDateKey(date)}-${randomToken}`;
};

export const createOrderDraft = ({
  cart = [],
  total = 0,
  customer = {},
  paymentMethod = 'efectivo',
  notes = '',
  source = 'web',
  channel = 'whatsapp',
} = {}) => {
  const createdAt = new Date().toISOString();
  const orderId = generateOrderCode(new Date(createdAt));
  const items = normalizeOrderItems(cart);
  const normalizedCustomer = normalizeCustomer(customer);

  return normalizeOrder({
    id: orderId,
    code: orderId,
    createdAt,
    updatedAt: createdAt,
    customer: normalizedCustomer,
    items,
    total: toNumber(total) || items.reduce((accumulator, item) => accumulator + item.subtotal, 0),
    status: 'pendiente',
    paymentStatus: 'pendiente',
    paymentMethod,
    notes,
    source,
    channel,
  });
};

export const buildOrderSearchIndex = (order) =>
  [
    order.displayId,
    order.customer.name,
    order.customer.phone,
    order.customer.email,
    order.customer.address,
    ...order.items.map((item) => item.title),
  ]
    .join(' ')
    .toLowerCase();

export const formatOrderDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value || '-';
  }

  return date.toLocaleString('es-AR');
};

export const buildOrderWhatsappMessage = (order, businessName = 'Maximo Aberturas') => {
  const lines = [
    `Hola ${businessName}, quiero confirmar mi pedido ${order.displayId}.`,
    '',
    `Cliente: ${order.customer.name}`,
    `Telefono: ${order.customer.phone || 'No informado'}`,
    `Email: ${order.customer.email || 'No informado'}`,
    `Direccion: ${order.customer.address || 'No informada'}`,
    `Pago: ${getPaymentMethodLabel(order.paymentMethod)}`,
    '',
    'Detalle:',
    ...order.items.map((item) => `- ${item.title} x${item.quantity}: $${formatPrice(item.subtotal)}`),
    '',
    `Total: $${formatPrice(order.total)}`,
  ];

  if (order.notes) {
    lines.push(`Notas: ${order.notes}`);
  }

  return lines.join('\n');
};

export const buildOrderPrintMarkup = (order, businessName = 'Maximo Aberturas') => {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.title)}</td>
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">$${formatPrice(item.price)}</td>
          <td style="text-align:right;">$${formatPrice(item.subtotal)}</td>
        </tr>
      `
    )
    .join('');

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Pedido ${escapeHtml(order.displayId)}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 32px;
            color: #111827;
          }
          h1, h2, h3, p {
            margin: 0 0 10px;
          }
          .header, .summary, .notes {
            margin-bottom: 24px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
          }
          th, td {
            border-bottom: 1px solid #d1d5db;
            padding: 10px 8px;
            font-size: 14px;
          }
          th {
            text-align: left;
            background: #f3f4f6;
          }
          .tag {
            display: inline-block;
            margin-right: 8px;
            padding: 6px 10px;
            border-radius: 999px;
            background: #e5e7eb;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .total {
            margin-top: 16px;
            text-align: right;
            font-size: 20px;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <section class="header">
          <h1>${escapeHtml(businessName)}</h1>
          <h2>Pedido ${escapeHtml(order.displayId)}</h2>
          <p>Fecha: ${escapeHtml(formatOrderDate(order.createdAt))}</p>
          <span class="tag">${escapeHtml(getOrderStatusLabel(order.status))}</span>
          <span class="tag">${escapeHtml(getPaymentStatusLabel(order.paymentStatus))}</span>
        </section>

        <section class="summary">
          <h3>Datos del cliente</h3>
          <div class="grid">
            <p><strong>Nombre:</strong> ${escapeHtml(order.customer.name)}</p>
            <p><strong>Telefono:</strong> ${escapeHtml(order.customer.phone || '-')}</p>
            <p><strong>Email:</strong> ${escapeHtml(order.customer.email || '-')}</p>
            <p><strong>Direccion:</strong> ${escapeHtml(order.customer.address || '-')}</p>
            <p><strong>Pago:</strong> ${escapeHtml(getPaymentMethodLabel(order.paymentMethod))}</p>
          </div>
        </section>

        <section>
          <h3>Detalle</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th style="text-align:center;">Cant.</th>
                <th style="text-align:right;">Unitario</th>
                <th style="text-align:right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <p class="total">Total: $${formatPrice(order.total)}</p>
        </section>

        ${
          order.notes
            ? `
              <section class="notes">
                <h3>Notas</h3>
                <p>${escapeHtml(order.notes)}</p>
              </section>
            `
            : ''
        }

        <script>
          window.onload = function () {
            window.print();
          };
        </script>
      </body>
    </html>
  `;
};

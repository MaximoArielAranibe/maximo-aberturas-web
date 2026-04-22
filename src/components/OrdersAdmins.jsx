import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/orders-admin.scss';
import {
  ORDER_COLLECTION_NAME,
  ORDER_STATUS_OPTIONS,
  ORDER_STORAGE_KEY,
  PAYMENT_STATUS_OPTIONS,
  buildOrderPrintMarkup,
  buildOrderSearchIndex,
  formatOrderDate,
  getOrderStatusLabel,
  getPaymentMethodLabel,
  getPaymentStatusLabel,
} from '../helpers/orders.js';
import { formatPrice } from '../hooks/formatPrice.js';
import { createOrdersRepository } from '../services/ordersRepository.js';

const getTagStyle = (value) => {
  switch (value) {
    case 'pagado':
    case 'entregado':
      return { background: '#dcfce7', color: '#166534' };
    case 'confirmado':
    case 'listo':
      return { background: '#dbeafe', color: '#1d4ed8' };
    case 'cancelado':
      return { background: '#fee2e2', color: '#b91c1c' };
    default:
      return { background: '#fef3c7', color: '#92400e' };
  }
};

const OrdersAdmins = ({
  preferredProvider,
  storageKey = ORDER_STORAGE_KEY,
  collectionName = ORDER_COLLECTION_NAME,
  businessName = 'Maximo Aberturas',
}) => {
  const [repository, setRepository] = useState(null);
  const [repositoryInfo, setRepositoryInfo] = useState({ label: 'Cargando...', warning: '' });
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [paymentFilter, setPaymentFilter] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const bootstrap = async () => {
      setIsLoading(true);
      setError('');

      try {
        const nextRepository = await createOrdersRepository({
          preferredProvider,
          storageKey,
          collectionName,
        });

        if (ignore) {
          return;
        }

        const nextOrders = await nextRepository.listOrders();

        if (ignore) {
          return;
        }

        setRepository(nextRepository);
        setRepositoryInfo({
          label: nextRepository.label,
          warning: nextRepository.warning || '',
        });
        setOrders(nextOrders);
      } catch (loadError) {
        console.error('No se pudieron cargar los pedidos:', loadError);

        if (!ignore) {
          setError('No se pudieron cargar los pedidos.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    bootstrap();

    return () => {
      ignore = true;
    };
  }, [collectionName, preferredProvider, storageKey]);

  const refreshOrders = async (targetRepository = repository) => {
    if (!targetRepository) {
      return;
    }

    setIsLoading(true);

    try {
      const nextOrders = await targetRepository.listOrders();
      setOrders(nextOrders);
      setError('');
    } catch (loadError) {
      console.error('No se pudieron refrescar los pedidos:', loadError);
      setError('No se pudieron refrescar los pedidos.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrder = async (orderId, patch, successMessage) => {
    if (!repository) {
      return;
    }

    try {
      await repository.updateOrder(orderId, patch);
      await refreshOrders(repository);
      toast.success(successMessage, { position: 'bottom-center' });
    } catch (updateError) {
      console.error('No se pudo actualizar el pedido:', updateError);
      toast.error('No se pudo actualizar el pedido', { position: 'bottom-center' });
    }
  };

  const handleReprint = (order) => {
    const printWindow = window.open('', '_blank', 'width=960,height=720');

    if (!printWindow) {
      toast.error('Tu navegador bloqueo la ventana de impresion', { position: 'bottom-center' });
      return;
    }

    printWindow.document.write(buildOrderPrintMarkup(order, businessName));
    printWindow.document.close();
  };

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch = !query || buildOrderSearchIndex(order).includes(query);
      const matchesStatus = statusFilter === 'todos' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'todos' || order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, paymentFilter, search, statusFilter]);

  const metrics = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((order) => order.status === 'pendiente').length,
      paid: orders.filter((order) => order.paymentStatus === 'pagado').length,
      revenue: orders
        .filter((order) => order.paymentStatus === 'pagado')
        .reduce((accumulator, order) => accumulator + order.total, 0),
    }),
    [orders]
  );

  return (
    <section className="orders-admin">
      <div className="orders-admin__hero">
        <div>
          <p className="orders-admin__eyebrow">Panel administrativo</p>
          <h1 className="orders-admin__title">Pedidos</h1>
          <p className="orders-admin__copy">
            Tu tienda hoy funciona con catálogo estático y carrito local. Este panel cierra el circuito operativo:
            crea pedidos desde el checkout, los lista, permite cambiar estados, registrar pagos y reimprimir.
          </p>
        </div>

        <div className="orders-admin__provider">
          <span className="orders-admin__provider-label">Persistencia</span>
          <strong className="orders-admin__provider-value">{repositoryInfo.label}</strong>
          {repositoryInfo.warning ? (
            <p className="orders-admin__provider-warning">{repositoryInfo.warning}</p>
          ) : null}
        </div>
      </div>

      <div className="orders-admin__metrics">
        <article className="orders-admin__metric">
          <span className="orders-admin__metric-label">Pedidos totales</span>
          <strong className="orders-admin__metric-value">{metrics.total}</strong>
        </article>
        <article className="orders-admin__metric">
          <span className="orders-admin__metric-label">Pendientes</span>
          <strong className="orders-admin__metric-value">{metrics.pending}</strong>
        </article>
        <article className="orders-admin__metric">
          <span className="orders-admin__metric-label">Pagados</span>
          <strong className="orders-admin__metric-value">{metrics.paid}</strong>
        </article>
        <article className="orders-admin__metric">
          <span className="orders-admin__metric-label">Ingresos cobrados</span>
          <strong className="orders-admin__metric-value">${formatPrice(metrics.revenue)}</strong>
        </article>
      </div>

      <div className="orders-admin__filters">
        <input
          className="orders-admin__field"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por cliente, pedido o producto"
        />

        <select
          className="orders-admin__select"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="todos">Todos los estados</option>
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {getOrderStatusLabel(status)}
            </option>
          ))}
        </select>

        <select
          className="orders-admin__select"
          value={paymentFilter}
          onChange={(event) => setPaymentFilter(event.target.value)}
        >
          <option value="todos">Todos los pagos</option>
          {PAYMENT_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {getPaymentStatusLabel(status)}
            </option>
          ))}
        </select>

        <button className="orders-admin__refresh" type="button" onClick={() => refreshOrders()}>
          {isLoading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      {error ? <div className="orders-admin__status orders-admin__status--error">{error}</div> : null}
      {isLoading ? <div className="orders-admin__status">Cargando pedidos...</div> : null}

      {!isLoading && filteredOrders.length === 0 ? (
        <div className="orders-admin__empty">
          <h2 className="orders-admin__empty-title">Todavia no hay pedidos</h2>
          <p className="orders-admin__empty-copy">
            Cuando se genere un pedido desde el carrito, va a aparecer aca con seguimiento completo.
          </p>
        </div>
      ) : null}

      {!isLoading && filteredOrders.length > 0 ? (
        <div className="orders-admin__list">
          {filteredOrders.map((order) => (
            <article key={order.id} className="orders-admin__card">
              <div className="orders-admin__card-header">
                <div>
                  <div className="orders-admin__card-title-row">
                    <h2 className="orders-admin__card-title">Pedido {order.displayId}</h2>
                    <span className="orders-admin__date">{formatOrderDate(order.createdAt)}</span>
                  </div>
                  <p className="orders-admin__customer">
                    {order.customer.name} | {order.customer.phone || 'Telefono no informado'}
                  </p>
                  <p className="orders-admin__secondary">
                    {order.customer.email || 'Sin email'} | {order.customer.address || 'Sin direccion'}
                  </p>
                </div>

                <div className="orders-admin__tags">
                  <span className="orders-admin__tag" style={getTagStyle(order.status)}>
                    {getOrderStatusLabel(order.status)}
                  </span>
                  <span className="orders-admin__tag" style={getTagStyle(order.paymentStatus)}>
                    {getPaymentStatusLabel(order.paymentStatus)}
                  </span>
                </div>
              </div>

              <div className="orders-admin__items">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.id}`} className="orders-admin__item">
                    <span>
                      {item.title} x{item.quantity}
                    </span>
                    <strong>${formatPrice(item.subtotal)}</strong>
                  </div>
                ))}
              </div>

              <div className="orders-admin__summary">
                <div className="orders-admin__summary-block">
                  <span className="orders-admin__summary-label">Medio de pago</span>
                  <strong className="orders-admin__summary-value">{getPaymentMethodLabel(order.paymentMethod)}</strong>
                </div>
                <div className="orders-admin__summary-block">
                  <span className="orders-admin__summary-label">Canal</span>
                  <strong className="orders-admin__summary-value">{order.channel || 'web'}</strong>
                </div>
                <div className="orders-admin__summary-block">
                  <span className="orders-admin__summary-label">Total</span>
                  <strong className="orders-admin__summary-value orders-admin__summary-value--total">
                    ${formatPrice(order.total)}
                  </strong>
                </div>
              </div>

              {order.notes ? <p className="orders-admin__notes">Notas: {order.notes}</p> : null}

              <div className="orders-admin__actions">
                <label className="orders-admin__control">
                  <span className="orders-admin__control-label">Estado del pedido</span>
                  <select
                    className="orders-admin__select"
                    value={order.status}
                    onChange={(event) =>
                      handleUpdateOrder(
                        order.id,
                        { status: event.target.value },
                        `Estado actualizado a ${getOrderStatusLabel(event.target.value)}`
                      )
                    }
                  >
                    {ORDER_STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {getOrderStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className="orders-admin__button orders-admin__button--secondary"
                  type="button"
                  onClick={() => handleReprint(order)}
                >
                  Reimprimir
                </button>

                <button
                  className={`orders-admin__button ${
                    order.paymentStatus === 'pagado'
                      ? 'orders-admin__button--success-ghost'
                      : 'orders-admin__button--success'
                  }`}
                  type="button"
                  onClick={() =>
                    handleUpdateOrder(
                      order.id,
                      { paymentStatus: order.paymentStatus === 'pagado' ? 'pendiente' : 'pagado' },
                      order.paymentStatus === 'pagado' ? 'Pago marcado como pendiente' : 'Pago registrado'
                    )
                  }
                >
                  {order.paymentStatus === 'pagado' ? 'Pago registrado' : 'Marcar pago'}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default OrdersAdmins;

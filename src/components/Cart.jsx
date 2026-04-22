import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartProvider';
import { formatPrice } from '../hooks/formatPrice';
import {
  PAYMENT_METHOD_OPTIONS,
  buildOrderWhatsappMessage,
  createOrderDraft,
  getPaymentMethodLabel,
} from '../helpers/orders.js';
import { createOrdersRepository } from '../services/ordersRepository.js';
import '../styles/cart.scss';
import ButtonWhatsapp from './ButtonWhatsapp';

const INITIAL_CHECKOUT = {
  name: '',
  phone: '',
  email: '',
  address: '',
  paymentMethod: 'efectivo',
  notes: '',
};

const Cart = () => {
  const [checkoutData, setCheckoutData] = useState(INITIAL_CHECKOUT);
  const [ordersInfo, setOrdersInfo] = useState({ label: 'Cargando...', warning: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cart, total, deleteFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

  useEffect(() => {
    let ignore = false;

    const resolveOrdersProvider = async () => {
      try {
        const repository = await createOrdersRepository();

        if (!ignore) {
          setOrdersInfo({
            label: repository.label,
            warning: repository.warning || '',
          });
        }
      } catch (error) {
        console.error('No se pudo resolver la persistencia de pedidos:', error);

        if (!ignore) {
          setOrdersInfo({
            label: 'Local (localStorage)',
            warning: 'No se pudo inicializar el proveedor configurado. Se mostrara el flujo local.',
          });
        }
      }
    };

    resolveOrdersProvider();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCheckoutChange = (event) => {
    const { name, value } = event.target;
    setCheckoutData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!checkoutData.name.trim() || !checkoutData.phone.trim()) {
      toast.error('Completa al menos nombre y telefono para generar el pedido', {
        position: 'bottom-center',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const repository = await createOrdersRepository();
      const orderDraft = createOrderDraft({
        cart,
        total,
        customer: {
          name: checkoutData.name,
          phone: checkoutData.phone,
          email: checkoutData.email,
          address: checkoutData.address,
        },
        paymentMethod: checkoutData.paymentMethod,
        notes: checkoutData.notes,
      });

      const order = await repository.createOrder(orderDraft);
      const businessPhone = (import.meta.env.VITE_BUSINESS_WHATSAPP || '5492477567514').replace(/\D/g, '');
      const whatsappMessage = encodeURIComponent(buildOrderWhatsappMessage(order));
      const whatsappUrl = `https://wa.me/${businessPhone}?text=${whatsappMessage}`;
      const popup = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      if (!popup) {
        window.location.href = whatsappUrl;
      }

      clearCart({ notify: false });
      setCheckoutData(INITIAL_CHECKOUT);
      setOrdersInfo({
        label: repository.label,
        warning: repository.warning || '',
      });

      toast.success(`Pedido ${order.displayId} generado correctamente`, {
        position: 'bottom-center',
      });
    } catch (error) {
      console.error('No se pudo generar el pedido:', error);
      toast.error('No se pudo generar el pedido', { position: 'bottom-center' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart__empty">
        <h3>Tu carrito está vacío...</h3>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h1 className="cart__title">Tu pedido</h1>
        <button className="cart__delete" onClick={() => clearCart()}>
          <span>Vaciar carrito</span>
        </button>
      </div>

      <div className="cart__provider">
        {ordersInfo.warning ? <span className="cart__provider-warning">{ordersInfo.warning}</span> : null}
      </div>

      <ul className="cart__items">
        {cart.map(({ id, title, price, quantity, thumbnail }) => (
          <li key={id} className="cart__item">
            <div className="cart__item--wrapper">
              <img className="cart__item--thumbnail" src={thumbnail} alt={title} />
              <h3 className="cart__item--title">{title}</h3>
            </div>
            <div className="cart__item--quantity">
              <button className="cart__item--quantity--decrement" onClick={() => decrementQuantity(id)}>
                -
              </button>
              <p>{quantity}</p>
              <button className="cart__item--quantity--increment" onClick={() => incrementQuantity(id)}>
                +
              </button>
            </div>
            <div className="cart__item--wrapper">
              <p className="cart__item--price">${formatPrice(price * quantity)}</p>
              <button onClick={() => deleteFromCart(id)} className="cart__item--clear">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="cart__totalQuantity">
        Productos en el carrito: {cart.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)}
      </p>
      <h2 style={{ fontWeight: '800' }}>
        Total: <span style={{ fontWeight: '700' }}>${formatPrice(total)}</span>
      </h2>

      <div className="cart__checkout">
        <div className="cart__checkout-header">
          <h2 className="cart__checkout-title">Datos para generar el pedido</h2>
          <p className="cart__checkout-copy">
            Se crea el pedido, queda disponible en el admin y despues se abre WhatsApp con el numero de orden.
          </p>
        </div>

        <div className="cart__checkout-grid">
          <label className="cart__field">
            <span className="cart__field-label">Nombre y apellido</span>
            <input
              className="cart__field-input"
              type="text"
              name="name"
              value={checkoutData.name}
              onChange={handleCheckoutChange}
              placeholder="Ej: Juan Perez"
            />
          </label>

          <label className="cart__field">
            <span className="cart__field-label">Telefono</span>
            <input
              className="cart__field-input"
              type="tel"
              name="phone"
              value={checkoutData.phone}
              onChange={handleCheckoutChange}
              placeholder="Ej: 2477..."
            />
          </label>

          <label className="cart__field">
            <span className="cart__field-label">Email</span>
            <input
              className="cart__field-input"
              type="email"
              name="email"
              value={checkoutData.email}
              onChange={handleCheckoutChange}
              placeholder="Opcional"
            />
          </label>

          <label className="cart__field">
            <span className="cart__field-label">Direccion</span>
            <input
              className="cart__field-input"
              type="text"
              name="address"
              value={checkoutData.address}
              onChange={handleCheckoutChange}
              placeholder="Opcional"
            />
          </label>

          <label className="cart__field">
            <span className="cart__field-label">Metodo de pago</span>
            <select
              className="cart__field-input"
              name="paymentMethod"
              value={checkoutData.paymentMethod}
              onChange={handleCheckoutChange}
            >
              {PAYMENT_METHOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="cart__field cart__field--full">
            <span className="cart__field-label">Notas</span>
            <textarea
              className="cart__field-input cart__field-input--textarea"
              name="notes"
              value={checkoutData.notes}
              onChange={handleCheckoutChange}
              placeholder="Color, medida, entrega, instalacion..."
            />
          </label>
        </div>

        <div className="cart__checkout-summary">
          <p className="cart__checkout-copy">
            Medio seleccionado: <strong>{getPaymentMethodLabel(checkoutData.paymentMethod)}</strong>
          </p>
          <ButtonWhatsapp
            action={handleCheckout}
            loading={isSubmitting}
            disabled={isSubmitting}
            text="Generar pedido y enviar por WhatsApp"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;

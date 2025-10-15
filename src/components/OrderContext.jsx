import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('moonlight-orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('moonlight-orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      orderNumber: `#${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      status: 'pending', // pending, processing, shipped, delivered, cancelled
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping || 0,
      total: orderData.total,
      customerInfo: orderData.customerInfo || {
        name: orderData.name || 'Customer',
        email: orderData.email || '',
        phone: orderData.phone || '',
        address: orderData.address || '',
        city: orderData.city || '',
        state: orderData.state || '',
        zipCode: orderData.zipCode || '',
        country: orderData.country || 'Nigeria'
      },
      paymentMethod: orderData.paymentMethod || 'WhatsApp Order',
      paymentProof: orderData.paymentProof || null,
      trackingNumber: null,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        {
          status: 'pending',
          date: new Date().toISOString(),
          message: 'Order placed successfully'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, message) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          statusHistory: [
            ...order.statusHistory,
            {
              status: newStatus,
              date: new Date().toISOString(),
              message: message || `Order ${newStatus}`
            }
          ]
        };
      }
      return order;
    }));
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const cancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'cancelled', 'Order cancelled by customer');
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      updateOrderStatus,
      getOrderById,
      cancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
}

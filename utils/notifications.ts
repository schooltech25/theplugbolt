import { Notification } from '../types';

export const createNotification = (
  type: Notification['type'],
  title: string,
  message: string,
  targetRoles: string[],
  priority: Notification['priority'] = 'medium',
  actionRequired: boolean = false,
  orderId?: string,
  tableId?: string
): Notification => {
  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    title,
    message,
    priority,
    targetRoles,
    isRead: false,
    createdAt: new Date(),
    actionRequired,
    orderId,
    tableId,
  };
};

export const filterNotificationsByRole = (notifications: Notification[], userRole: string): Notification[] => {
  return notifications.filter(notification => 
    notification.targetRoles.includes(userRole) || notification.targetRoles.includes('all')
  );
};

export const getUnreadCount = (notifications: Notification[], userRole: string): number => {
  return filterNotificationsByRole(notifications, userRole).filter(n => !n.isRead).length;
};

export const sortNotificationsByPriority = (notifications: Notification[]): Notification[] => {
  const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
  
  return notifications.sort((a, b) => {
    // First sort by priority
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};

export const markAsRead = (notifications: Notification[], notificationId: string): Notification[] => {
  return notifications.map(notification =>
    notification.id === notificationId
      ? { ...notification, isRead: true }
      : notification
  );
};

// Notification templates for common scenarios
export const NotificationTemplates = {
  orderReady: (orderId: string, tableNumber?: string) => 
    createNotification(
      'order',
      'Order Ready for Pickup',
      `Order #${orderId.slice(-4)} ${tableNumber ? `(Table ${tableNumber})` : ''} is ready for pickup`,
      ['waiter'],
      'high',
      true,
      orderId,
      tableNumber
    ),

  lowStock: (itemName: string, currentStock: number, unit: string) =>
    createNotification(
      'inventory',
      'Low Stock Alert',
      `${itemName} stock is running low (${currentStock} ${unit} remaining)`,
      ['manager', 'owner', 'bartender'],
      'medium'
    ),

  loginRequest: (staffName: string, role: string) =>
    createNotification(
      'staff',
      'Login Request',
      `${staffName} (${role}) requesting login approval`,
      ['manager', 'owner'],
      'medium',
      true
    ),

  systemError: (errorMessage: string) =>
    createNotification(
      'system',
      'System Error',
      errorMessage,
      ['developer', 'owner'],
      'urgent',
      true
    ),

  reservationReminder: (customerName: string, time: string, guests: number) =>
    createNotification(
      'reservation',
      'Upcoming Reservation',
      `${customerName} - ${guests} guests at ${time} (15 minutes)`,
      ['waiter', 'manager'],
      'medium'
    ),

  voucherRedeemed: (voucherCode: string, customerInfo: string) =>
    createNotification(
      'voucher',
      'Voucher Redeemed',
      `Voucher ${voucherCode} redeemed by ${customerInfo}`,
      ['manager', 'owner'],
      'low'
    ),
};
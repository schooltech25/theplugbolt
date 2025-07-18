import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { X, Bell, AlertTriangle, Package, Users, Calendar } from 'lucide-react-native';
import { Notification } from '../../types';

interface NotificationPanelProps {
  visible: boolean;
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (notificationId: string) => void;
  onNotificationPress: (notification: Notification) => void;
}

export default function NotificationPanel({
  visible,
  notifications,
  onClose,
  onMarkAsRead,
  onNotificationPress,
}: NotificationPanelProps) {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order': return Bell;
      case 'inventory': return Package;
      case 'staff': return Users;
      case 'system': return AlertTriangle;
      case 'reservation': return Calendar;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#3b82f6';
      case 'low': return '#059669';
      default: return '#6b7280';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
            {notifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Bell size={48} color="#ccc" />
                <Text style={styles.emptyText}>No notifications</Text>
              </View>
            ) : (
              notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                const priorityColor = getPriorityColor(notification.priority);

                return (
                  <TouchableOpacity
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      !notification.isRead && styles.notificationItemUnread,
                    ]}
                    onPress={() => {
                      onNotificationPress(notification);
                      if (!notification.isRead) {
                        onMarkAsRead(notification.id);
                      }
                    }}
                  >
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <View style={styles.iconContainer}>
                          <IconComponent size={16} color={priorityColor} />
                        </View>
                        <Text style={styles.notificationTitle}>
                          {notification.title}
                        </Text>
                        <Text style={styles.notificationTime}>
                          {formatTime(notification.createdAt)}
                        </Text>
                      </View>
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      {notification.actionRequired && (
                        <View style={styles.actionBadge}>
                          <Text style={styles.actionText}>Action Required</Text>
                        </View>
                      )}
                    </View>
                    {!notification.isRead && <View style={styles.unreadDot} />}
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  notificationsList: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  notificationItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    position: 'relative',
  },
  notificationItemUnread: {
    backgroundColor: '#fff',
    borderColor: '#3b82f6',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  actionBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  unreadDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
});
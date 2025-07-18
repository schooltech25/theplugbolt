import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, X, LogOut, Chrome as Home, Package, CreditCard, Users, Shield, Code, ChefHat, MapPin, ChartBar as BarChart3, Calendar, Gift, QrCode, Settings, Bell, Clock, TrendingUp, TriangleAlert as AlertTriangle, FileText } from 'lucide-react-native';

interface NavigationItem {
  id: string;
  title: string;
  icon: any;
  route: string;
  description: string;
  category: string;
}

interface CollapsibleNavigationProps {
  userRole: 'owner' | 'manager' | 'bartender' | 'kitchen' | 'waiter' | 'security' | 'developer';
  currentRoute: string;
  notificationCount?: number;
  onNotificationPress?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

export default function CollapsibleNavigation({ 
  userRole, 
  currentRoute, 
  notificationCount = 0,
  onNotificationPress 
}: CollapsibleNavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            setIsVisible(false);
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const getNavigationItems = (): { [key: string]: NavigationItem[] } => {
    const baseItems = {
      'Main Functions': [
        {
          id: 'dashboard',
          title: 'Dashboard',
          icon: Home,
          route: `/(dashboard)/${userRole}`,
          description: 'Main dashboard overview',
          category: 'Main Functions'
        }
      ]
    };

    switch (userRole) {
      case 'owner':
        return {
          ...baseItems,
          'Dashboard Access': [
            {
              id: 'manager-dash',
              title: 'Manager View',
              icon: Users,
              route: '/(dashboard)/manager',
              description: 'View manager dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'bartender-dash',
              title: 'Bartender View',
              icon: Package,
              route: '/(dashboard)/bartender',
              description: 'View bartender dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'kitchen-dash',
              title: 'Kitchen View',
              icon: ChefHat,
              route: '/(dashboard)/kitchen',
              description: 'View kitchen dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'waiter-dash',
              title: 'Waiter View',
              icon: MapPin,
              route: '/(dashboard)/waiter',
              description: 'View waiter dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'security-dash',
              title: 'Security View',
              icon: Shield,
              route: '/(dashboard)/security',
              description: 'View security dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'developer-dash',
              title: 'Developer View',
              icon: Code,
              route: '/(dashboard)/developer',
              description: 'View developer dashboard',
              category: 'Dashboard Access'
            }
          ],
          'Management Tools': [
            {
              id: 'reports',
              title: 'Reports & Analytics',
              icon: BarChart3,
              route: '/(dashboard)/manager/reports',
              description: 'Sales and performance reports',
              category: 'Management Tools'
            },
            {
              id: 'inventory',
              title: 'Inventory Management',
              icon: Package,
              route: '/(dashboard)/manager/inventory',
              description: 'Stock levels and purchasing',
              category: 'Management Tools'
            },
            {
              id: 'staff',
              title: 'Staff Management',
              icon: Users,
              route: '/(dashboard)/manager/staff',
              description: 'Employee evaluation and scheduling',
              category: 'Management Tools'
            },
            {
              id: 'reservations',
              title: 'Table Reservations',
              icon: Calendar,
              route: '/(dashboard)/manager/reservations',
              description: 'Booking and table management',
              category: 'Management Tools'
            },
            {
              id: 'vouchers',
              title: 'Voucher Generator',
              icon: Gift,
              route: '/(dashboard)/manager/vouchers',
              description: 'Create promotional vouchers',
              category: 'Management Tools'
            }
          ]
        };

      case 'manager':
        return {
          ...baseItems,
          'Dashboard Access': [
            {
              id: 'bartender-dash',
              title: 'Bartender View',
              icon: Package,
              route: '/(dashboard)/bartender',
              description: 'View bartender dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'kitchen-dash',
              title: 'Kitchen View',
              icon: ChefHat,
              route: '/(dashboard)/kitchen',
              description: 'View kitchen dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'waiter-dash',
              title: 'Waiter View',
              icon: MapPin,
              route: '/(dashboard)/waiter',
              description: 'View waiter dashboard',
              category: 'Dashboard Access'
            },
            {
              id: 'security-dash',
              title: 'Security View',
              icon: Shield,
              route: '/(dashboard)/security',
              description: 'View security dashboard',
              category: 'Dashboard Access'
            }
          ],
          'Management Tools': [
            {
              id: 'reports',
              title: 'Reports & Analytics',
              icon: BarChart3,
              route: '/(dashboard)/manager/reports',
              description: 'Sales and performance reports',
              category: 'Management Tools'
            },
            {
              id: 'inventory',
              title: 'Inventory Management',
              icon: Package,
              route: '/(dashboard)/manager/inventory',
              description: 'Stock levels and purchasing',
              category: 'Management Tools'
            },
            {
              id: 'staff',
              title: 'Staff Management',
              icon: Users,
              route: '/(dashboard)/manager/staff',
              description: 'Employee evaluation and scheduling',
              category: 'Management Tools'
            },
            {
              id: 'reservations',
              title: 'Table Reservations',
              icon: Calendar,
              route: '/(dashboard)/manager/reservations',
              description: 'Booking and table management',
              category: 'Management Tools'
            },
            {
              id: 'vouchers',
              title: 'Voucher Generator',
              icon: Gift,
              route: '/(dashboard)/manager/vouchers',
              description: 'Create promotional vouchers',
              category: 'Management Tools'
            }
          ]
        };

      case 'bartender':
        return {
          ...baseItems,
          'POS Functions': [
            {
              id: 'pos',
              title: 'POS System',
              icon: CreditCard,
              route: '/(dashboard)/bartender/pos',
              description: 'Process walk-in orders',
              category: 'POS Functions'
            }
          ],
          'Operations': [
            {
              id: 'inventory',
              title: 'Bar Inventory',
              icon: Package,
              route: '/(dashboard)/bartender/inventory',
              description: 'Check bar stock levels',
              category: 'Operations'
            },
            {
              id: 'shift-log',
              title: 'Shift Log',
              icon: Clock,
              route: '/(dashboard)/bartender/shift-log',
              description: 'Record shift activities',
              category: 'Operations'
            }
          ]
        };

      case 'kitchen':
        return {
          ...baseItems,
          'Kitchen Operations': [
            {
              id: 'orders',
              title: 'Order Management',
              icon: ChefHat,
              route: '/(dashboard)/kitchen/orders',
              description: 'View and manage orders',
              category: 'Kitchen Operations'
            },
            {
              id: 'production',
              title: 'Production Log',
              icon: FileText,
              route: '/(dashboard)/kitchen/production',
              description: 'Track food production',
              category: 'Kitchen Operations'
            }
          ],
          'Inventory': [
            {
              id: 'inventory',
              title: 'Kitchen Inventory',
              icon: Package,
              route: '/(dashboard)/kitchen/inventory',
              description: 'Check ingredient levels',
              category: 'Inventory'
            }
          ]
        };

      case 'waiter':
        return {
          ...baseItems,
          'Table Service': [
            {
              id: 'pos',
              title: 'Table Management',
              icon: MapPin,
              route: '/(dashboard)/waiter/pos',
              description: 'Manage table orders',
              category: 'Table Service'
            },
            {
              id: 'payments',
              title: 'Process Payment',
              icon: CreditCard,
              route: '/(dashboard)/waiter/payments',
              description: 'Handle table payments',
              category: 'Table Service'
            }
          ],
          'Service Log': [
            {
              id: 'service-log',
              title: 'Service Log',
              icon: Clock,
              route: '/(dashboard)/waiter/service-log',
              description: 'Track service activities',
              category: 'Service Log'
            }
          ]
        };

      case 'security':
        return {
          ...baseItems,
          'Security Functions': [
            {
              id: 'scanner',
              title: 'QR Scanner',
              icon: QrCode,
              route: '/(dashboard)/security/scanner',
              description: 'Scan tickets and vouchers',
              category: 'Security Functions'
            },
            {
              id: 'incidents',
              title: 'Log Incident',
              icon: AlertTriangle,
              route: '/(dashboard)/security/incidents',
              description: 'Report security incidents',
              category: 'Security Functions'
            }
          ],
          'Monitoring': [
            {
              id: 'security-log',
              title: 'Security Log',
              icon: Shield,
              route: '/(dashboard)/security/log',
              description: 'View security activities',
              category: 'Monitoring'
            }
          ]
        };

      case 'developer':
        return {
          ...baseItems,
          'System Management': [
            {
              id: 'fix-bugs',
              title: 'Fix Bugs',
              icon: AlertTriangle,
              route: '/(dashboard)/developer/fix-bugs',
              description: 'Resolve system issues',
              category: 'System Management'
            },
            {
              id: 'rollback',
              title: 'System Rollback',
              icon: TrendingUp,
              route: '/(dashboard)/developer/rollback',
              description: 'Revert to previous version',
              category: 'System Management'
            }
          ],
          'Monitoring': [
            {
              id: 'logs',
              title: 'Error Logs',
              icon: FileText,
              route: '/(dashboard)/developer/logs',
              description: 'View system logs',
              category: 'Monitoring'
            },
            {
              id: 'backup',
              title: 'Backup Management',
              icon: Package,
              route: '/(dashboard)/developer/backup',
              description: 'Manage system backups',
              category: 'Monitoring'
            }
          ]
        };

      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (route: string) => {
    setIsVisible(false);
    router.push(route as any);
  };

  const getRoleDisplayName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <>
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsVisible(true)}
        >
          <Menu size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>BarMaster</Text>
        
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={onNotificationPress}
        >
          <Bell size={24} color="#000" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Navigation Modal */}
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: screenWidth > 768 ? '40%' : '85%' }]}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.roleTitle}>{getRoleDisplayName(userRole)}</Text>
                <Text style={styles.roleSubtitle}>Dashboard Navigation</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsVisible(false)}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Navigation Content */}
            <ScrollView style={styles.navigationContent} showsVerticalScrollIndicator={false}>
              {Object.entries(navigationItems).map(([category, items]) => (
                <View key={category} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <View style={styles.itemsGrid}>
                    {items.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.navigationItem,
                          currentRoute === item.route && styles.navigationItemActive
                        ]}
                        onPress={() => handleNavigation(item.route)}
                      >
                        <View style={styles.itemIcon}>
                          <item.icon size={20} color="#000" />
                        </View>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <LogOut size={20} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  userInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  roleSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  navigationContent: {
    flex: 1,
    padding: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  itemsGrid: {
    gap: 8,
  },
  navigationItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationItemActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
    flex: 1,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    flex: 2,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
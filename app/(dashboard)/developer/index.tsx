import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Code, Bell, Server, Bug, RotateCcw, Database, Shield, Calendar } from 'lucide-react-native';

const systemStats = [
  { title: 'System Uptime', value: '99.8%', status: 'good', icon: Server },
  { title: 'Active Users', value: '12', status: 'good', icon: Shield },
  { title: 'Database Health', value: 'Optimal', status: 'good', icon: Database },
  { title: 'Error Rate', value: '0.02%', status: 'good', icon: Bug },
];

export default function DeveloperDashboard() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFixBug = () => {
    Alert.alert(
      'Fix Bug or Error',
      'This will attempt to resolve known system issues. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Fix Issues',
          onPress: () => {
            setIsProcessing(true);
            // Simulate bug fixing process
            setTimeout(() => {
              setIsProcessing(false);
              Alert.alert('Success', 'Known issues have been resolved.');
            }, 2000);
          },
        },
      ]
    );
  };

  const handleRollbackToDate = () => {
    Alert.alert(
      'Rollback to Date',
      'This will revert the system to a previous state. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Select Date',
          onPress: () => {
            Alert.alert('Feature', 'Date picker will be implemented here.');
          },
        },
      ]
    );
  };

  const handleRollbackToFunctioning = () => {
    Alert.alert(
      'Rollback to Functioning Version',
      'This will revert to the last known stable version. All recent changes will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Rollback',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Confirmation', 'Rollback initiated. System will restart shortly.');
          },
        },
      ]
    );
  };

  const handleResetFactory = () => {
    Alert.alert(
      'Reset Factory Settings',
      'WARNING: This will permanently delete ALL data and reset the system to factory defaults.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'I Understand',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'Type "RESET" to confirm factory reset:',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'RESET',
                  style: 'destructive',
                  onPress: () => {
                    Alert.alert('Factory Reset', 'System reset initiated. All data will be lost.');
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#059669';
      case 'warning': return '#fbbf24';
      case 'error': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>System Status</Text>
          <Text style={styles.title}>Developer Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>0</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <View style={styles.statsGrid}>
            {systemStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <stat.icon size={20} color="#666" />
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(stat.status) }]} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* System Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Management</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, isProcessing && styles.actionCardDisabled]}
              onPress={handleFixBug}
              disabled={isProcessing}
            >
              <Bug size={20} color="#000" />
              <Text style={styles.actionText}>
                {isProcessing ? 'Fixing Issues...' : 'Fix Bug or Error'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={handleRollbackToDate}>
              <Calendar size={20} color="#000" />
              <Text style={styles.actionText}>Rollback to Date</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={handleRollbackToFunctioning}>
              <RotateCcw size={20} color="#000" />
              <Text style={styles.actionText}>Rollback to Functioning</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <TouchableOpacity style={styles.dangerCard} onPress={handleResetFactory}>
            <RotateCcw size={20} color="#dc2626" />
            <View style={styles.dangerContent}>
              <Text style={styles.dangerTitle}>Reset Factory Settings</Text>
              <Text style={styles.dangerDescription}>
                Permanently delete all data and reset system
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Error Logs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Error Logs</Text>
          <View style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logTime}>2024-01-15 14:32:15</Text>
              <View style={styles.logLevel}>
                <Text style={styles.logLevelText}>INFO</Text>
              </View>
            </View>
            <Text style={styles.logMessage}>System backup completed successfully</Text>
          </View>
          
          <View style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logTime}>2024-01-15 12:15:43</Text>
              <View style={[styles.logLevel, styles.logLevelWarning]}>
                <Text style={styles.logLevelText}>WARN</Text>
              </View>
            </View>
            <Text style={styles.logMessage}>High memory usage detected (85%)</Text>
          </View>
        </View>

        {/* Backup Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backup Management</Text>
          <View style={styles.backupCard}>
            <View style={styles.backupHeader}>
              <Database size={20} color="#059669" />
              <Text style={styles.backupTitle}>Last Backup</Text>
            </View>
            <Text style={styles.backupTime}>Today at 3:00 AM</Text>
            <Text style={styles.backupStatus}>Status: Successful</Text>
            <TouchableOpacity style={styles.backupButton}>
              <Text style={styles.backupButtonText}>Manual Backup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#059669',
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
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  actionGrid: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  actionCardDisabled: {
    opacity: 0.6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  dangerCard: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dangerContent: {
    flex: 1,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
  },
  dangerDescription: {
    fontSize: 14,
    color: '#991b1b',
  },
  logCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 12,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logTime: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  logLevel: {
    backgroundColor: '#059669',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  logLevelWarning: {
    backgroundColor: '#fbbf24',
  },
  logLevelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logMessage: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  backupCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  backupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  backupTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  backupStatus: {
    fontSize: 14,
    color: '#059669',
    marginBottom: 12,
  },
  backupButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  backupButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
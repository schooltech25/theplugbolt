import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { QrCode, CheckCircle, XCircle, Clock } from 'lucide-react-native';

interface ScanResult {
  id: string;
  type: 'voucher' | 'ticket';
  code: string;
  isValid: boolean;
  message: string;
  timestamp: Date;
}

interface QRScannerProps {
  onScan: (result: ScanResult) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([
    {
      id: '1',
      type: 'voucher',
      code: 'VOUCHER-001',
      isValid: true,
      message: 'Free Beer voucher verified',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: '2',
      type: 'ticket',
      code: 'TICKET-VIP-123',
      isValid: true,
      message: 'VIP event ticket verified',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: '3',
      type: 'voucher',
      code: 'VOUCHER-EXPIRED',
      isValid: false,
      message: 'Voucher has expired',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
  ]);

  const handleStartScan = () => {
    setIsScanning(true);
    
    // Simulate QR code scanning
    setTimeout(() => {
      const mockScanResult: ScanResult = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'voucher' : 'ticket',
        code: `SCAN-${Date.now()}`,
        isValid: Math.random() > 0.3, // 70% success rate
        message: Math.random() > 0.3 ? 'Successfully verified' : 'Invalid or expired code',
        timestamp: new Date(),
      };
      
      setScanHistory([mockScanResult, ...scanHistory]);
      onScan(mockScanResult);
      setIsScanning(false);
      
      Alert.alert(
        mockScanResult.isValid ? 'Success' : 'Invalid Code',
        mockScanResult.message,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <QrCode size={24} color="#000" />
        <Text style={styles.title}>QR Code Scanner</Text>
      </View>

      <View style={styles.scannerSection}>
        <View style={styles.scannerArea}>
          <QrCode size={64} color={isScanning ? '#059669' : '#666'} />
          <Text style={styles.scannerText}>
            {isScanning ? 'Scanning...' : 'Ready to scan QR codes'}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
          onPress={handleStartScan}
          disabled={isScanning}
        >
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Scan History</Text>
        <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
          {scanHistory.map((scan) => (
            <View key={scan.id} style={styles.historyItem}>
              <View style={styles.historyHeader}>
                <View style={styles.historyInfo}>
                  <View style={styles.historyType}>
                    {scan.isValid ? (
                      <CheckCircle size={16} color="#059669" />
                    ) : (
                      <XCircle size={16} color="#dc2626" />
                    )}
                    <Text style={styles.historyTypeText}>
                      {scan.type.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.historyCode}>{scan.code}</Text>
                </View>
                <View style={styles.historyTime}>
                  <Clock size={12} color="#666" />
                  <Text style={styles.historyTimeText}>
                    {formatTime(scan.timestamp)}
                  </Text>
                </View>
              </View>
              <Text style={[
                styles.historyMessage,
                { color: scan.isValid ? '#059669' : '#dc2626' }
              ]}>
                {scan.message}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Today's Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {scanHistory.filter(s => s.isValid).length}
            </Text>
            <Text style={styles.statLabel}>Valid Scans</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {scanHistory.filter(s => !s.isValid).length}
            </Text>
            <Text style={styles.statLabel}>Invalid Scans</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {scanHistory.filter(s => s.type === 'voucher').length}
            </Text>
            <Text style={styles.statLabel}>Vouchers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {scanHistory.filter(s => s.type === 'ticket').length}
            </Text>
            <Text style={styles.statLabel}>Tickets</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  scannerSection: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  scannerArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scannerText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  scanButtonDisabled: {
    backgroundColor: '#666',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historySection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  historyInfo: {
    flex: 1,
  },
  historyType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  historyTypeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  historyCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  historyTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyTimeText: {
    fontSize: 12,
    color: '#666',
  },
  historyMessage: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});
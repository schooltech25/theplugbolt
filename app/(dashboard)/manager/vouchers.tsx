import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Gift } from 'lucide-react-native';
import VoucherGenerator from '../../../components/vouchers/VoucherGenerator';

export default function ManagerVouchers() {
  const router = useRouter();

  const handleGenerateVouchers = (voucherData: any) => {
    // In a real app, this would generate actual QR codes and save to database
    Alert.alert(
      'Vouchers Generated',
      `Successfully generated ${voucherData.quantity} vouchers for "${voucherData.itemOffer}". QR codes are ready for export.`,
      [
        { text: 'OK' },
        { text: 'Export PDF', onPress: () => Alert.alert('Export', 'PDF export functionality would be implemented here') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Voucher Management</Text>
        <Gift size={24} color="#000" />
      </View>

      <VoucherGenerator onGenerate={handleGenerateVouchers} />
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
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
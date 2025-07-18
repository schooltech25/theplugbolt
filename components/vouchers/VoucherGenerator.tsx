import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { QrCode, Calendar, Gift, Download } from 'lucide-react-native';

interface VoucherData {
  quantity: number;
  itemOffer: string;
  discountType: 'percentage' | 'fixed' | 'free-item' | 'bogo';
  discountValue: number;
  expirationDate: Date;
  usageLimit: number;
  eventPurpose: string;
}

interface VoucherGeneratorProps {
  onGenerate: (voucherData: VoucherData) => void;
}

export default function VoucherGenerator({ onGenerate }: VoucherGeneratorProps) {
  const [formData, setFormData] = useState<VoucherData>({
    quantity: 1,
    itemOffer: '',
    discountType: 'percentage',
    discountValue: 0,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    usageLimit: 1,
    eventPurpose: '',
  });

  const handleGenerate = () => {
    if (!formData.itemOffer.trim()) {
      Alert.alert('Error', 'Please specify the item or offer');
      return;
    }

    if (!formData.eventPurpose.trim()) {
      Alert.alert('Error', 'Please specify the event or purpose');
      return;
    }

    if (formData.quantity <= 0) {
      Alert.alert('Error', 'Quantity must be greater than 0');
      return;
    }

    onGenerate(formData);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <QrCode size={24} color="#000" />
        <Text style={styles.title}>Generate Vouchers</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={formData.quantity.toString()}
            onChangeText={(text) => setFormData({ ...formData, quantity: parseInt(text) || 1 })}
            keyboardType="numeric"
            placeholder="Number of vouchers"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Item/Offer Description</Text>
          <TextInput
            style={styles.input}
            value={formData.itemOffer}
            onChangeText={(text) => setFormData({ ...formData, itemOffer: text })}
            placeholder="e.g., Free Beer, 20% off total bill"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Discount Type</Text>
          <View style={styles.radioGroup}>
            {[
              { id: 'percentage', label: 'Percentage Off' },
              { id: 'fixed', label: 'Fixed Amount Off' },
              { id: 'free-item', label: 'Free Item' },
              { id: 'bogo', label: 'Buy One Get One' },
            ].map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.radioOption,
                  formData.discountType === option.id && styles.radioOptionActive,
                ]}
                onPress={() => setFormData({ ...formData, discountType: option.id as any })}
              >
                <Text style={[
                  styles.radioText,
                  formData.discountType === option.id && styles.radioTextActive,
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {(formData.discountType === 'percentage' || formData.discountType === 'fixed') && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {formData.discountType === 'percentage' ? 'Percentage (%)' : 'Amount (₱)'}
            </Text>
            <TextInput
              style={styles.input}
              value={formData.discountValue.toString()}
              onChangeText={(text) => setFormData({ ...formData, discountValue: parseFloat(text) || 0 })}
              keyboardType="numeric"
              placeholder={formData.discountType === 'percentage' ? '10' : '100'}
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Usage Limit per Customer</Text>
          <TextInput
            style={styles.input}
            value={formData.usageLimit.toString()}
            onChangeText={(text) => setFormData({ ...formData, usageLimit: parseInt(text) || 1 })}
            keyboardType="numeric"
            placeholder="1"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event/Purpose</Text>
          <TextInput
            style={styles.input}
            value={formData.eventPurpose}
            onChangeText={(text) => setFormData({ ...formData, eventPurpose: text })}
            placeholder="e.g., Happy Hour, Birthday Special"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Expiration Date</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Calendar size={16} color="#666" />
            <Text style={styles.dateText}>
              {formData.expirationDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
          <Gift size={20} color="#fff" />
          <Text style={styles.generateButtonText}>Generate Vouchers</Text>
        </TouchableOpacity>

        <View style={styles.exportOptions}>
          <Text style={styles.exportTitle}>Export Options</Text>
          <View style={styles.exportButtons}>
            <TouchableOpacity style={styles.exportButton}>
              <Download size={16} color="#000" />
              <Text style={styles.exportButtonText}>Export PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportButton}>
              <Download size={16} color="#000" />
              <Text style={styles.exportButtonText}>Export CSV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#000',
  },
  radioGroup: {
    gap: 8,
  },
  radioOption: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 12,
  },
  radioOptionActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  radioText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  radioTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  generateButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exportOptions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  exportButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
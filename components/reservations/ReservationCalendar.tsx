import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar, Clock, Users, Phone, Mail } from 'lucide-react-native';
import { Reservation, Table } from '../../types';

interface ReservationCalendarProps {
  reservations: Reservation[];
  tables: Table[];
  onCreateReservation: (reservation: Partial<Reservation>) => void;
  onUpdateReservation: (id: string, updates: Partial<Reservation>) => void;
}

export default function ReservationCalendar({ 
  reservations, 
  tables, 
  onCreateReservation,
  onUpdateReservation 
}: ReservationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  const getDateReservations = (date: Date) => {
    return reservations.filter(res => 
      res.date.toDateString() === date.toDateString()
    );
  };

  const isTimeSlotAvailable = (time: string, tableId: string) => {
    const dateReservations = getDateReservations(selectedDate);
    return !dateReservations.some(res => 
      res.time === time && res.tableId === tableId && res.status !== 'cancelled'
    );
  };

  const handleCreateReservation = () => {
    if (!selectedTime) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }

    Alert.prompt(
      'New Reservation',
      'Enter customer details (Name, Phone, Guests)',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Create',
          onPress: (input) => {
            if (input) {
              const [name, phone, guests] = input.split(',').map(s => s.trim());
              if (name && phone && guests) {
                onCreateReservation({
                  customerName: name,
                  customerPhone: phone,
                  date: selectedDate,
                  time: selectedTime,
                  guests: parseInt(guests),
                  tableId: 't1', // Default table, should be selectable
                  status: 'confirmed',
                  isPaid: false,
                  createdAt: new Date(),
                });
              }
            }
          },
        },
      ],
      'plain-text',
      'John Doe, +63 912 345 6789, 4'
    );
  };

  const handleReservationAction = (reservation: Reservation, action: string) => {
    switch (action) {
      case 'confirm':
        onUpdateReservation(reservation.id, { status: 'confirmed' });
        break;
      case 'seat':
        onUpdateReservation(reservation.id, { status: 'seated' });
        break;
      case 'cancel':
        Alert.alert(
          'Cancel Reservation',
          'Are you sure you want to cancel this reservation?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => onUpdateReservation(reservation.id, { status: 'cancelled' }) },
          ]
        );
        break;
    }
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed': return '#059669';
      case 'seated': return '#3b82f6';
      case 'cancelled': return '#dc2626';
      case 'no-show': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calendar size={24} color="#000" />
        <Text style={styles.title}>Table Reservations</Text>
      </View>

      <View style={styles.dateSelector}>
        <Text style={styles.selectedDate}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View style={styles.timeSlots}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.timeSlotGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.timeSlotTextSelected,
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateReservation}>
        <Text style={styles.createButtonText}>Create New Reservation</Text>
      </TouchableOpacity>

      <ScrollView style={styles.reservationsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Today's Reservations</Text>
        {getDateReservations(selectedDate).map((reservation) => (
          <View key={reservation.id} style={styles.reservationCard}>
            <View style={styles.reservationHeader}>
              <View style={styles.reservationInfo}>
                <Text style={styles.customerName}>{reservation.customerName}</Text>
                <View style={styles.reservationDetails}>
                  <Clock size={14} color="#666" />
                  <Text style={styles.reservationTime}>{reservation.time}</Text>
                  <Users size={14} color="#666" />
                  <Text style={styles.reservationGuests}>{reservation.guests} guests</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(reservation.status) }]}>
                <Text style={styles.statusText}>{reservation.status}</Text>
              </View>
            </View>

            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Phone size={14} color="#666" />
                <Text style={styles.contactText}>{reservation.customerPhone}</Text>
              </View>
              {reservation.customerEmail && (
                <View style={styles.contactItem}>
                  <Mail size={14} color="#666" />
                  <Text style={styles.contactText}>{reservation.customerEmail}</Text>
                </View>
              )}
            </View>

            {reservation.notes && (
              <Text style={styles.reservationNotes}>Note: {reservation.notes}</Text>
            )}

            <View style={styles.reservationActions}>
              {reservation.status === 'confirmed' && (
                <>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleReservationAction(reservation, 'seat')}
                  >
                    <Text style={styles.actionButtonText}>Seat Customers</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => handleReservationAction(reservation, 'cancel')}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
  dateSelector: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  selectedDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  timeSlots: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  timeSlotSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#000',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reservationsList: {
    flex: 1,
    padding: 16,
  },
  reservationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  reservationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reservationInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  reservationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reservationTime: {
    fontSize: 14,
    color: '#666',
  },
  reservationGuests: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
  },
  reservationNotes: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  reservationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#dc2626',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar } from 'lucide-react-native';
import ReservationCalendar from '../../../components/reservations/ReservationCalendar';
import { mockReservations, mockTables } from '../../../data/mockData';
import { Reservation } from '../../../types';

export default function ManagerReservations() {
  const router = useRouter();
  const [reservations, setReservations] = useState(mockReservations);

  const handleCreateReservation = (newReservation: Partial<Reservation>) => {
    const reservation: Reservation = {
      id: `res-${Date.now()}`,
      customerName: newReservation.customerName!,
      customerPhone: newReservation.customerPhone!,
      customerEmail: newReservation.customerEmail,
      date: newReservation.date!,
      time: newReservation.time!,
      guests: newReservation.guests!,
      tableId: newReservation.tableId!,
      status: 'confirmed',
      isPaid: false,
      notes: newReservation.notes,
      createdAt: new Date(),
    };

    setReservations([...reservations, reservation]);
  };

  const handleUpdateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations(prevReservations =>
      prevReservations.map(res =>
        res.id === id ? { ...res, ...updates } : res
      )
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
        <Text style={styles.title}>Table Reservations</Text>
        <Calendar size={24} color="#000" />
      </View>

      <ReservationCalendar
        reservations={reservations}
        tables={mockTables}
        onCreateReservation={handleCreateReservation}
        onUpdateReservation={handleUpdateReservation}
      />
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
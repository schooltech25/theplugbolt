import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { User, Star, TrendingUp, TrendingDown, Calendar } from 'lucide-react-native';
import { User as UserType, PerformanceMetrics } from '../../types';

interface StaffEvaluationProps {
  staff: UserType[];
  performanceData: PerformanceMetrics[];
  onEvaluate: (userId: string, rating: number, notes: string) => void;
}

export default function StaffEvaluation({ staff, performanceData, onEvaluate }: StaffEvaluationProps) {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [evaluationRating, setEvaluationRating] = useState(5);
  const [evaluationNotes, setEvaluationNotes] = useState('');

  const getStaffPerformance = (userId: string) => {
    return performanceData.filter(p => p.userId === userId);
  };

  const getAverageRating = (userId: string) => {
    const performances = getStaffPerformance(userId);
    if (performances.length === 0) return 0;
    return performances.reduce((sum, p) => sum + p.rating, 0) / performances.length;
  };

  const getPerformanceTrend = (userId: string) => {
    const performances = getStaffPerformance(userId).slice(-7); // Last 7 days
    if (performances.length < 2) return 'stable';
    
    const recent = performances.slice(-3).reduce((sum, p) => sum + p.rating, 0) / 3;
    const previous = performances.slice(0, -3).reduce((sum, p) => sum + p.rating, 0) / (performances.length - 3);
    
    if (recent > previous + 0.2) return 'improving';
    if (recent < previous - 0.2) return 'declining';
    return 'stable';
  };

  const handleEvaluate = () => {
    if (!selectedStaff) return;
    
    if (!evaluationNotes.trim()) {
      Alert.alert('Error', 'Please provide evaluation notes');
      return;
    }

    onEvaluate(selectedStaff, evaluationRating, evaluationNotes);
    setSelectedStaff(null);
    setEvaluationRating(5);
    setEvaluationNotes('');
    Alert.alert('Success', 'Evaluation submitted successfully');
  };

  const renderStarRating = (rating: number, onPress?: (rating: number) => void) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress?.(star)}
            disabled={!onPress}
          >
            <Star
              size={20}
              color={star <= rating ? '#fbbf24' : '#e5e7eb'}
              fill={star <= rating ? '#fbbf24' : 'transparent'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp size={16} color="#059669" />;
      case 'declining': return <TrendingDown size={16} color="#dc2626" />;
      default: return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return '#059669';
      case 'declining': return '#dc2626';
      default: return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <User size={24} color="#000" />
        <Text style={styles.title}>Staff Evaluation</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {staff.map((member) => {
          const avgRating = getAverageRating(member.id);
          const trend = getPerformanceTrend(member.id);
          const performances = getStaffPerformance(member.id);
          const lastPerformance = performances[performances.length - 1];

          return (
            <View key={member.id} style={styles.staffCard}>
              <View style={styles.staffHeader}>
                <View style={styles.staffInfo}>
                  <Text style={styles.staffName}>{member.username}</Text>
                  <Text style={styles.staffRole}>{member.role}</Text>
                  <Text style={styles.staffDate}>
                    Started: {member.createdAt.toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.performanceInfo}>
                  {renderStarRating(Math.round(avgRating))}
                  <View style={styles.trendInfo}>
                    {getTrendIcon(trend)}
                    <Text style={[styles.trendText, { color: getTrendColor(trend) }]}>
                      {trend}
                    </Text>
                  </View>
                </View>
              </View>

              {lastPerformance && (
                <View style={styles.metricsContainer}>
                  <Text style={styles.metricsTitle}>Latest Performance</Text>
                  <View style={styles.metricsGrid}>
                    {Object.entries(lastPerformance.metrics).map(([key, value]) => (
                      <View key={key} style={styles.metricItem}>
                        <Text style={styles.metricValue}>{value}</Text>
                        <Text style={styles.metricLabel}>
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={styles.evaluateButton}
                onPress={() => setSelectedStaff(member.id)}
              >
                <Text style={styles.evaluateButtonText}>Evaluate Now</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {selectedStaff && (
        <View style={styles.evaluationModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Staff Evaluation</Text>
            
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Performance Rating</Text>
              {renderStarRating(evaluationRating, setEvaluationRating)}
            </View>

            <View style={styles.notesSection}>
              <Text style={styles.notesLabel}>Evaluation Notes</Text>
              <TextInput
                style={styles.notesInput}
                value={evaluationNotes}
                onChangeText={setEvaluationNotes}
                placeholder="Provide detailed feedback on performance, strengths, and areas for improvement..."
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSelectedStaff(null)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleEvaluate}
              >
                <Text style={styles.submitButtonText}>Submit Evaluation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  content: {
    flex: 1,
    padding: 16,
  },
  staffCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  staffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  staffRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  staffDate: {
    fontSize: 12,
    color: '#999',
  },
  performanceInfo: {
    alignItems: 'flex-end',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 8,
  },
  trendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsContainer: {
    marginBottom: 16,
  },
  metricsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  metricLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  evaluateButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  evaluateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  evaluationModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  notesSection: {
    marginBottom: 20,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
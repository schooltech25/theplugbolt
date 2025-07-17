import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'non-alcoholic', name: 'Non-Alcoholic' },
  { id: 'alcoholic', name: 'Alcoholic' },
  { id: 'shots', name: 'Shots' },
  { id: 'glass', name: 'Glass' },
  { id: 'pitcher', name: 'Pitcher' },
  { id: 'bottled', name: 'Bottled' },
  { id: 'food', name: 'Food' },
];

export default function CategoryTabs({ selectedCategory, onCategorySelect }: CategoryTabsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            selectedCategory === category.id && styles.tabActive,
          ]}
          onPress={() => onCategorySelect(category.id)}
        >
          <Text style={[
            styles.tabText,
            selectedCategory === category.id && styles.tabTextActive,
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tabActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
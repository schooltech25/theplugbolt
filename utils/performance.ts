import { PerformanceMetrics, User } from '../types';

/**
 * Utility functions for staff performance calculations
 */

export const calculateDailyRating = (
  role: string,
  metrics: PerformanceMetrics['metrics']
): number => {
  let rating = 5.0;

  switch (role) {
    case 'waiter':
      // Base rating on service time and customer satisfaction
      if (metrics.averageServiceTime) {
        if (metrics.averageServiceTime > 6) rating -= 0.5;
        if (metrics.averageServiceTime > 8) rating -= 0.5;
        if (metrics.averageServiceTime < 4) rating += 0.2;
      }
      if (metrics.ordersProcessed) {
        if (metrics.ordersProcessed > 25) rating += 0.3;
        if (metrics.ordersProcessed < 10) rating -= 0.3;
      }
      break;

    case 'bartender':
      // Base rating on order processing speed and sales
      if (metrics.ordersProcessed) {
        if (metrics.ordersProcessed > 40) rating += 0.3;
        if (metrics.ordersProcessed < 20) rating -= 0.3;
      }
      if (metrics.totalSales) {
        if (metrics.totalSales > 15000) rating += 0.2;
        if (metrics.totalSales < 8000) rating -= 0.2;
      }
      break;

    case 'kitchen':
      // Base rating on preparation time and order accuracy
      if (metrics.averageServiceTime) {
        if (metrics.averageServiceTime > 12) rating -= 0.5;
        if (metrics.averageServiceTime > 15) rating -= 0.5;
        if (metrics.averageServiceTime < 8) rating += 0.2;
      }
      if (metrics.ordersProcessed) {
        if (metrics.ordersProcessed > 30) rating += 0.3;
        if (metrics.ordersProcessed < 15) rating -= 0.3;
      }
      break;

    case 'security':
      // Base rating on response time and incident handling
      if (metrics.ticketsScanned) {
        if (metrics.ticketsScanned > 50) rating += 0.3;
        if (metrics.ticketsScanned < 20) rating -= 0.2;
      }
      if (metrics.incidentsLogged !== undefined) {
        if (metrics.incidentsLogged > 5) rating -= 0.3;
      }
      break;
  }

  // Ensure rating stays within bounds
  return Math.max(1.0, Math.min(5.0, rating));
};

export const getPerformanceTrend = (
  performanceHistory: PerformanceMetrics[]
): 'improving' | 'declining' | 'stable' => {
  if (performanceHistory.length < 3) return 'stable';

  const recent = performanceHistory.slice(-3);
  const previous = performanceHistory.slice(-6, -3);

  if (recent.length === 0 || previous.length === 0) return 'stable';

  const recentAvg = recent.reduce((sum, p) => sum + p.rating, 0) / recent.length;
  const previousAvg = previous.reduce((sum, p) => sum + p.rating, 0) / previous.length;

  const difference = recentAvg - previousAvg;

  if (difference > 0.2) return 'improving';
  if (difference < -0.2) return 'declining';
  return 'stable';
};

export const generateImprovementSuggestions = (
  user: User,
  performanceHistory: PerformanceMetrics[]
): string[] => {
  const suggestions: string[] = [];
  const latestMetrics = performanceHistory[performanceHistory.length - 1];
  
  if (!latestMetrics) return suggestions;

  const { role, metrics } = latestMetrics;

  switch (role) {
    case 'waiter':
      if (metrics.averageServiceTime && metrics.averageServiceTime > 6) {
        suggestions.push('Consider reviewing order flow to reduce service time');
      }
      if (metrics.ordersProcessed && metrics.ordersProcessed < 15) {
        suggestions.push('Focus on increasing order volume during peak hours');
      }
      break;

    case 'bartender':
      if (metrics.ordersProcessed && metrics.ordersProcessed < 25) {
        suggestions.push('Work on improving order processing speed');
      }
      if (metrics.totalSales && metrics.totalSales < 10000) {
        suggestions.push('Consider upselling techniques to increase sales');
      }
      break;

    case 'kitchen':
      if (metrics.averageServiceTime && metrics.averageServiceTime > 10) {
        suggestions.push('Review kitchen workflow to reduce preparation time');
      }
      if (metrics.wastageReported && metrics.wastageReported > 3) {
        suggestions.push('Focus on reducing food waste and improving portion control');
      }
      break;

    case 'security':
      if (metrics.ticketsScanned && metrics.ticketsScanned < 30) {
        suggestions.push('Increase vigilance in checking customer tickets');
      }
      if (metrics.incidentsLogged && metrics.incidentsLogged > 3) {
        suggestions.push('Review incident prevention strategies');
      }
      break;
  }

  return suggestions;
};

export const calculateTeamPerformance = (
  teamMembers: User[],
  performanceData: PerformanceMetrics[]
): {
  averageRating: number;
  totalOrders: number;
  totalSales: number;
  topPerformer: User | null;
} => {
  const teamPerformance = teamMembers.map(member => {
    const memberPerformance = performanceData.filter(p => p.userId === member.id);
    const latestPerformance = memberPerformance[memberPerformance.length - 1];
    
    return {
      member,
      performance: latestPerformance,
    };
  }).filter(item => item.performance);

  const averageRating = teamPerformance.length > 0
    ? teamPerformance.reduce((sum, item) => sum + item.performance.rating, 0) / teamPerformance.length
    : 0;

  const totalOrders = teamPerformance.reduce(
    (sum, item) => sum + (item.performance.metrics.ordersProcessed || 0), 0
  );

  const totalSales = teamPerformance.reduce(
    (sum, item) => sum + (item.performance.metrics.totalSales || 0), 0
  );

  const topPerformer = teamPerformance.length > 0
    ? teamPerformance.reduce((best, current) => 
        current.performance.rating > best.performance.rating ? current : best
      ).member
    : null;

  return {
    averageRating,
    totalOrders,
    totalSales,
    topPerformer,
  };
};
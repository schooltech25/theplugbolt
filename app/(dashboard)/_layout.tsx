import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="owner/index" />
      <Stack.Screen name="manager/index" />
      <Stack.Screen name="manager/inventory" />
      <Stack.Screen name="bartender/index" />
      <Stack.Screen name="bartender/pos" />
      <Stack.Screen name="kitchen/index" />
      <Stack.Screen name="waiter/index" />
      <Stack.Screen name="waiter/pos" />
      <Stack.Screen name="security/index" />
      <Stack.Screen name="security/scanner" />
      <Stack.Screen name="developer/index" />
      <Stack.Screen name="kitchen/orders" />
      <Stack.Screen name="manager/reports" />
      <Stack.Screen name="manager/vouchers" />
      <Stack.Screen name="manager/reservations" />
      <Stack.Screen name="manager/staff" />
    </Stack>
  );
}
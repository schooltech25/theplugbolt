import React from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to login as the entry point
  return <Redirect href="/(auth)/login" />;
}
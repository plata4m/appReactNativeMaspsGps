import { Stack } from 'expo-router';
import { AuthProvider, AlertProvider } from '@/template';

export default function RootLayout() {
  return (
    <AlertProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="map" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </AlertProvider>
  );
}

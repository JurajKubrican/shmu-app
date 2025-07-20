import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { registerRootComponent } from 'expo'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  )
}

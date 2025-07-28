// App.js
import React from 'react';
import { View, Button } from 'react-native';
import { ToastProvider } from './context/ToastContext';
import { useToast } from './hooks/useToast';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <ToastProvider>
      <Main />
    </ToastProvider>
  );
}

function Main() {
  const { showToast, toast } = useToast();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Toast" onPress={() => showToast({ message: 'Hello from Toast!' })} />
      {toast?.visible && <Toast {...toast} />}
    </View>
  );
}

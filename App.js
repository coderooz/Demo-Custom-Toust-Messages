import {  StatusBar } from 'react-native';
import { ToastProvider } from './context/ToastContext';
import ToastDemo from './screen/ToastDisplay';

export default function App() {
  return (
    <>
    <ToastProvider>
      <StatusBar hidden/>
      <ToastDemo />
    </ToastProvider>
    </>
  );
}

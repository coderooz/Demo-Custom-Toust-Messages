// ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast from '../components/Toast';
import uuid from 'react-native-uuid';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (toast) => {
    const id = uuid.v4();
    setToasts((prev) => [...prev, { id, ...toast }]);

    // Auto-remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View pointerEvents="box-none" style={styles.toastWrapper}>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            {...toast}
            positionOffset={index * 70} // stack spacing
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
});

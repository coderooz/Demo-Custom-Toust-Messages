import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

let toastQueue = [];
let isShowing = false;

export let showToast = (msg = '', type = 'success', action = null) => {
  toastQueue.push({ msg, type, action });
  processQueue();
};

const processQueue = () => {
  if (isShowing || toastQueue.length === 0) return;
  isShowing = true;
  const next = toastQueue.shift();
  globalShow(next);
};

let globalShow = () => {}; // populated by component

export default function Toast() {
  const opacity = useSharedValue(0);
  const translate = useSharedValue(-50);

  const [toast, setToast] = useState({
    msg: '',
    type: 'success',
    action: null,
  });

  const [visible, setVisible] = useState(false);

  globalShow = ({ msg, type, action }) => {
    setToast({ msg, type, action });
    setVisible(true);

    opacity.value = withTiming(1, { duration: 300 });
    translate.value = withTiming(0, { duration: 300 });

    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 });
      translate.value = withTiming(-50, { duration: 300 }, () => {
        runOnJS(setVisible)(false);
        isShowing = false;
        runOnJS(processQueue)();
      });
    }, 3000);
  };

  const animatedStyle = useAnimatedStyle(() => {
    let positionStyle = {};

    switch (toast.type) {
      case 'success':
        positionStyle = { top: 50, alignSelf: 'center', transform: [{ translateY: translate.value }] };
        break;
      case 'warning':
        positionStyle = { bottom: 40, right: 20, transform: [{ translateX: translate.value }] };
        break;
      case 'error':
        positionStyle = { bottom: 40, alignSelf: 'center', transform: [{ translateY: translate.value }] };
        break;
      case 'info':
        positionStyle = { bottom: 80, alignSelf: 'center', transform: [{ translateY: translate.value }] };
        break;
      default:
        positionStyle = { top: 50, alignSelf: 'center' };
    }

    return {
      opacity: opacity.value,
      position: 'absolute',
      zIndex: 999,
      ...positionStyle,
    };
  });

  if (!visible) return null;

  const iconMap = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
  };

  const bgMap = {
    success: '#2ecc71',
    warning: '#e67e22',
    error: '#e74c3c',
    info: '#3498db',
  };

  return (
    <Animated.View style={[styles.toast, { backgroundColor: bgMap[toast.type] }, animatedStyle]}>
      <Text style={styles.text}>
        {iconMap[toast.type]} {toast.msg}
      </Text>
      {toast.action && (
        <Pressable onPress={() => {
          toast.action();
        }}>
          <Text style={styles.action}>Action</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    maxWidth: width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    flexShrink: 1,
  },
  action: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 12,
    textDecorationLine: 'underline',
  },
});

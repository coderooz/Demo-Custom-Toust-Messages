// Toast.js
import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Toast = ({ alert = 'info', title, message, duration = 3000, positionOffset = 0 }) => {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(positionOffset + 0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });

    const timeout = setTimeout(() => {
      translateY.value = withTiming(-100, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }, duration - 500);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    marginBottom: 10,
  }));

  const iconMap = {
    success: { name: 'circle-check', color: '#28a745', bg: '#d4edda' },
    error:   { name: 'circle-xmark', color: '#dc3545', bg: '#f8d7da' },
    warning: { name: 'triangle-exclamation', color: '#ffc107', bg: '#fff3cd' },
    info:    { name: 'circle-info', color: '#17a2b8', bg: '#d1ecf1' },
  };

  const { name, color, bg } = iconMap[alert] || iconMap.info;

  return (
    <Animated.View style={[styles.toastContainer, { backgroundColor: bg }, animatedStyle]}>
      <Icon name={name} size={20} color={color} />
      <View style={styles.textWrapper}>
        <Text style={[styles.toastTitle, { color }]}>{title}</Text>
        <Text style={styles.toastMessage}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer:{
    position:'absolute',
    top: 0,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 50,
    marginHorizontal: 15,
    flexDirection: 'row',
    zIndex: 999,
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
    backgroundColor: '#def1d7'
  },
  textWrapper:{
    flexDirection:'column',
    alignItems: 'center',
    marginHorizontal:5,
  },
  toastTitle:{
    fontSize: 15,
    fontWeight: 700,
    alignSelf: 'left'
  },
  toastMessage: {
    fontSize: 10,
    fontWeight: 500
  }
});

export default Toast;
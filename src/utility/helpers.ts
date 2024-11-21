import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, Easing, EasingFunction } from 'react-native';

export function colorWithOpacity(color: string, alpha: string | number): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    throw new Error(`Invalid color value "${color}". Must be a six-digit hex code.`);
  }

  let alphaHex: string;

  if (typeof alpha === 'number') {
    if (alpha < 0 || alpha > 1) {
      throw new Error('Alpha must be a number between 0 and 1.');
    }
    const alphaValue = Math.round(alpha * 255);
    alphaHex = alphaValue.toString(16).padStart(2, '0');
  } else if (typeof alpha === 'string') {
    if (!/^([0-9a-fA-F]{2})$/.test(alpha)) {
      throw new Error(`Invalid alpha value "${alpha}". Must be a two-digit hex.`);
    }
    alphaHex = alpha;
  } else {
    throw new Error('Alpha must be a number between 0 and 1 or a two-digit hex string.');
  }

  return `${color}${alphaHex}`;
}

export namespace StorageManager {
  export async function getStoreValue<T>(key: StorageKey): Promise<T | undefined> {
    try {
      const item = await AsyncStorage.getItem(key);

      if (!item) {
        return undefined;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Async Storage: Error retrieving item for key "${key}":`, error);
      return undefined;
    }
  }

  export async function saveStoreValue(key: StorageKey, value: string) {
    await AsyncStorage.setItem(key, value);
  }
}

export namespace Animation {
  export function timing(
    animatedValue: Animated.Value,
    toValue: number,
    duration?: number,
    easing?: EasingFunction,
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue,
      duration: duration,
      useNativeDriver: true,
      easing,
    });
  }

  export function continuous(animation: Animated.CompositeAnimation): Animated.CompositeAnimation {
    return Animated.loop(animation);
  }

  export function delay(time: number): Animated.CompositeAnimation {
    return Animated.delay(time);
  }

  export const getAnimatedValue = (value: Animated.value) => value.__getValue();
}

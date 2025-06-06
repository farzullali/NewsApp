import { Dimensions, Platform, PixelRatio, ScaledSize } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions are for iPhone 11 (414x896)
const baseWidth = 414;
const baseHeight = 896;

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isTablet = SCREEN_WIDTH >= 768;

export const scale = (size: number): number => {
  const ratio = SCREEN_WIDTH / baseWidth;
  const newSize = size * ratio;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const verticalScale = (size: number): number => {
  const ratio = SCREEN_HEIGHT / baseHeight;
  const newSize = size * ratio;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  const ratio = size * (SCREEN_WIDTH / baseWidth);
  const moderateFactor = 1 - factor * (1 - ratio);
  return size * moderateFactor;
};

export const getResponsiveWidth = (widthPercent: number): number => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

export const getResponsiveHeight = (heightPercent: number): number => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

// Listen for dimension changes (e.g., rotation)
Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
  const { width, height } = window;
  // Update dimensions if needed
  if (width !== SCREEN_WIDTH || height !== SCREEN_HEIGHT) {
    // You can implement dimension change handling here
  }
}); 
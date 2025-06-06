import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale, isTablet } from '../utils/dimensions';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    borderRadius: scale(8),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.7)',
  },
  errorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
  },
  defaultPlaceholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});

interface CachedImageProps {
  uri?: string | null;
  width?: number;
  height?: number;
  style?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  placeholder?: React.ReactNode;
  onLoadComplete?: () => void;
  testID?: string;
}

const DEFAULT_PLACEHOLDER = <View style={styles.defaultPlaceholder} />;

export const CachedImage: React.FC<CachedImageProps> = ({
  uri,
  width,
  height,
  style,
  resizeMode = 'cover',
  placeholder = DEFAULT_PLACEHOLDER,
  onLoadComplete,
  testID,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (uri) {
      // Preload image
      FastImage.preload([{ uri }]);
    }
  }, [uri]);

  const imageStyle = {
    width: width || '100%',
    height: height || '100%',
    ...style,
  };

  const containerStyle = {
    width: width || '100%',
    height: height || '100%',
    ...style,
  };

  if (!uri) {
    return (
      <View style={[styles.container, containerStyle]} testID={testID}>
        {placeholder}
      </View>
    );
  }

  const handleLoadEnd = () => {
    setIsLoading(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      <FastImage
        style={[styles.image, imageStyle]}
        source={{
          uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={
          resizeMode === 'cover'
            ? FastImage.resizeMode.cover
            : resizeMode === 'contain'
            ? FastImage.resizeMode.contain
            : resizeMode === 'stretch'
            ? FastImage.resizeMode.stretch
            : FastImage.resizeMode.center
        }
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        testID={`${testID}-image`}
      />
      {isLoading && (
        <View style={[styles.loaderContainer, containerStyle]} testID={`${testID}-loader`}>
          <ActivityIndicator 
            size={isTablet ? "large" : "small"} 
            testID={`${testID}-activity-indicator`}
          />
        </View>
      )}
      {hasError && (
        <View style={[styles.errorContainer, containerStyle]} testID={`${testID}-error`}>
          {placeholder}
        </View>
      )}
    </View>
  );
}; 
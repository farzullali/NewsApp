import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useThemeStore } from '../store/useThemeStore';
import { lightTheme, darkTheme } from '../utils/theme';
import { scale, isTablet, getResponsiveWidth } from '../utils/dimensions';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface SkeletonProps {
  testID?: string;
}

const NewsItemSkeletonComponent: React.FC<SkeletonProps> = ({ testID }) => {
  const { isDarkMode } = useThemeStore();
  const theme = useMemo(() => isDarkMode ? darkTheme : lightTheme, [isDarkMode]);

  const shimmerColors = useMemo(() => 
    isDarkMode 
      ? ['#333', '#555', '#333'] 
      : ['#ebebeb', '#c5c5c5', '#ebebeb'],
    [isDarkMode]
  );

  return (
    <View 
      style={[styles.container, { backgroundColor: theme.colors.cardBackground }]}
      testID={testID}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <ShimmerPlaceholder 
            style={styles.image}
            shimmerColors={shimmerColors}
          />
        </View>
        <View style={styles.textContent}>
          <ShimmerPlaceholder 
            style={styles.title}
            shimmerColors={shimmerColors}
          />
          <ShimmerPlaceholder 
            style={styles.description}
            shimmerColors={shimmerColors}
          />
          <View style={styles.bottomRow}>
            <View style={styles.metadata}>
              <ShimmerPlaceholder 
                style={styles.source}
                shimmerColors={shimmerColors}
              />
              <ShimmerPlaceholder 
                style={styles.date}
                shimmerColors={shimmerColors}
              />
            </View>
            <ShimmerPlaceholder 
              style={styles.favoriteIcon}
              shimmerColors={shimmerColors}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

interface NewsListSkeletonProps extends SkeletonProps {
  count?: number;
}

const NewsListSkeletonComponent: React.FC<NewsListSkeletonProps> = ({ count = 5, testID }) => {
  const skeletons = useMemo(() => 
    Array.from({ length: count }).map((_, index) => (
      <NewsItemSkeleton 
        key={index} 
        testID={`${testID}-item-${index}`}
      />
    )),
    [count, testID]
  );

  return <View testID={testID}>{skeletons}</View>;
};

export const NewsItemSkeleton = memo(NewsItemSkeletonComponent);
export const NewsListSkeleton = memo(NewsListSkeletonComponent);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(16),
    marginVertical: scale(8),
    borderRadius: scale(12),
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  content: {
    padding: scale(16),
  },
  imageContainer: {
    height: scale(isTablet ? 300 : 200),
    borderRadius: scale(8),
    overflow: 'hidden',
    marginBottom: scale(12),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(8),
  },
  textContent: {
    flex: 1,
  },
  title: {
    height: scale(isTablet ? 22 : 18),
    width: '90%',
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  description: {
    height: scale(isTablet ? 48 : 42),
    width: '100%',
    borderRadius: scale(4),
    marginBottom: scale(12),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(8),
  },
  metadata: {
    flex: 1,
  },
  source: {
    height: scale(isTablet ? 14 : 12),
    width: scale(isTablet ? 100 : 80),
    borderRadius: scale(4),
    marginBottom: scale(2),
  },
  date: {
    height: scale(isTablet ? 13 : 11),
    width: scale(isTablet ? 80 : 60),
    borderRadius: scale(4),
  },
  favoriteIcon: {
    width: scale(isTablet ? 24 : 20),
    height: scale(isTablet ? 24 : 20),
    borderRadius: scale(12),
    marginLeft: scale(8),
  },
}); 
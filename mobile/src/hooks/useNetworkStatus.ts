import { useState, useEffect, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import NetInfo, { 
  NetInfoState, 
  NetInfoStateType,
  NetInfoSubscription,
  NetInfoCellularGeneration 
} from '@react-native-community/netinfo';

export interface NetworkStatus {
  isConnected: boolean | null;
  connectionType: NetInfoStateType;
  isOffline: boolean;
  isWifi: boolean;
  isCellular: boolean;
  isInternetReachable: boolean | null;
  isConnectionFast: boolean;
  details: NetInfoState | null;
}

const INITIAL_STATE: NetworkStatus = {
  isConnected: true,
  connectionType: 'unknown' as NetInfoStateType,
  isOffline: false,
  isWifi: false,
  isCellular: false,
  isInternetReachable: true,
  isConnectionFast: true,
  details: null,
};

const CELLULAR_GENERATION_SPEEDS: Record<NetInfoCellularGeneration, boolean> = {
  '2g': false,
  '3g': false,
  '4g': true,
  '5g': true,
};

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(INITIAL_STATE);
  const lastUpdate = useRef<number>(Date.now());
  const netInfoSubscription = useRef<NetInfoSubscription | null>(null);
  const updateThreshold = 1000; // 1 second

  const determineConnectionSpeed = useCallback((state: NetInfoState): boolean => {
    if (!state.isConnected) return false;
    
    // WiFi connection
    if (state.type === 'wifi') {
      // On Android, check if internet is actually reachable
      if (Platform.OS === 'android') {
        return state.isInternetReachable === true;
      }
      return true;
    }
    
    // Cellular connection
    if (state.type === 'cellular') {
      const generation = state.details?.cellularGeneration;
      if (!generation) return false;
      
      // Use predefined speed mapping
      return CELLULAR_GENERATION_SPEEDS[generation] ?? false;
    }
    
    // Other connection types (ethernet, bluetooth, etc.)
    return state.isInternetReachable === true;
  }, []);

  const handleConnectivityChange = useCallback((state: NetInfoState) => {
    const now = Date.now();
    if (now - lastUpdate.current < updateThreshold) {
      return; // Debounce updates
    }
    lastUpdate.current = now;

    // Handle Android-specific edge cases
    const isAndroid = Platform.OS === 'android';
    const isConnected = isAndroid 
      ? state.isConnected && state.isInternetReachable !== false
      : state.isConnected;

    setNetworkStatus({
      isConnected,
      connectionType: state.type,
      isOffline: !isConnected,
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
      isInternetReachable: state.isInternetReachable,
      isConnectionFast: determineConnectionSpeed(state),
      details: state,
    });
  }, [determineConnectionSpeed]);

  const setupNetInfoSubscription = useCallback(() => {
    // Clean up existing subscription
    if (netInfoSubscription.current) {
      netInfoSubscription.current();
    }

    // Create new subscription
    netInfoSubscription.current = NetInfo.addEventListener(handleConnectivityChange);

    // Initial network check
    NetInfo.fetch().then(handleConnectivityChange).catch(error => {
      console.warn('Failed to fetch initial network state:', error);
      // Set offline state if initial check fails
      setNetworkStatus(prev => ({
        ...prev,
        isConnected: false,
        isOffline: true,
        isInternetReachable: false
      }));
    });
  }, [handleConnectivityChange]);

  useEffect(() => {
    setupNetInfoSubscription();

    // Platform specific setup
    if (Platform.OS === 'android') {
      // Additional setup for Android if needed
      const checkInterval = setInterval(() => {
        checkConnection();
      }, 10000); // Check every 10 seconds on Android

      return () => {
        if (netInfoSubscription.current) {
          netInfoSubscription.current();
        }
        clearInterval(checkInterval);
      };
    }

    return () => {
      if (netInfoSubscription.current) {
        netInfoSubscription.current();
      }
    };
  }, [setupNetInfoSubscription]);

  const checkConnection = useCallback(async () => {
    try {
      const state = await NetInfo.fetch();
      handleConnectivityChange(state);
      return state.isConnected && state.isInternetReachable !== false;
    } catch (error) {
      console.warn('Failed to check connection:', error);
      return false;
    }
  }, [handleConnectivityChange]);

  return {
    ...networkStatus,
    checkConnection,
  };
}; 
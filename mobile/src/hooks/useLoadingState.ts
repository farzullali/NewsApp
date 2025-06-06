import { useState, useCallback, useRef } from 'react';

export type LoadingType = 'isInitialLoading' | 'isLoadingMore' | 'isRefreshing';

interface LoadingState {
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
}

const INITIAL_STATE: LoadingState = {
  isInitialLoading: false,
  isLoadingMore: false,
  isRefreshing: false,
};

export const useLoadingState = (debugName?: string) => {
  const [loadingState, setLoadingState] = useState<LoadingState>(INITIAL_STATE);
  const prevLoadingState = useRef<LoadingState>(INITIAL_STATE);

  const startLoading = useCallback((type: LoadingType) => {
    if (loadingState[type]) {
      if (debugName) {
        console.warn(`[${debugName}] Attempted to start ${type} while already loading`);
      }
      return;
    }

    prevLoadingState.current = loadingState;
    setLoadingState(prev => ({ ...prev, [type]: true }));
  }, [loadingState, debugName]);

  const stopLoading = useCallback((type: LoadingType) => {
    if (!loadingState[type]) {
      if (debugName) {
        console.warn(`[${debugName}] Attempted to stop ${type} while not loading`);
      }
      return;
    }

    setLoadingState(prev => ({ ...prev, [type]: false }));
  }, [loadingState, debugName]);

  const resetLoading = useCallback(() => {
    if (Object.values(loadingState).every(state => !state)) {
      return; // Already reset
    }
    setLoadingState(INITIAL_STATE);
  }, [loadingState]);

  const isAnyLoading = useCallback(() => 
    Object.values(loadingState).some(state => state),
    [loadingState]
  );

  return {
    ...loadingState,
    startLoading,
    stopLoading,
    resetLoading,
    isAnyLoading,
    prevLoadingState: prevLoadingState.current,
  };
}; 
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface PwaInstallState {
  isSupported: boolean;
  isInstalled: boolean;
  isInstallable: boolean;
  isIos: boolean;
  isDismissed: boolean;
  updateAvailable: boolean;
  swRegistration: ServiceWorkerRegistration | null;
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
  dismissPrompt: () => void;
  resetDismissal: () => void;
  applyUpdate: () => void;
}

const DISMISS_KEY = 'afterglow_pwa_install_dismissed';

export function usePwaInstall(): PwaInstallState {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check if already running in standalone mode (installed PWA)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsInstalled(isStandaloneMode);
    };

    checkStandalone();
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // 2. Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) && !(window.navigator as any).standalone;
    setIsIos(isIosDevice);

    // 3. Check dismissal preference
    const dismissed = localStorage.getItem(DISMISS_KEY) === 'true';
    setIsDismissed(dismissed);

    // 4. Listen for native beforeinstallprompt (Chrome, Edge, Android, Opera)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // 5. Listen for successful appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      localStorage.removeItem(DISMISS_KEY);
      console.log('[PWA] AFTERGLOW was successfully installed as an app.');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 6. Register Service Worker in production & development localhost
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          setSwRegistration(registration);
          console.log('[PWA] Service Worker registered with scope:', registration.scope);

          // Check if an update is found
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (
                  installingWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration skipped or failed:', err);
        });

      // Handle controller change (when new service worker claims clients)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Trigger the native installation prompt
  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    if (!deferredPrompt) {
      return 'unavailable';
    }

    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return 'accepted';
      } else {
        return 'dismissed';
      }
    } catch (err) {
      console.error('[PWA] Error invoking installation prompt:', err);
      return 'unavailable';
    }
  }, [deferredPrompt]);

  const dismissPrompt = useCallback(() => {
    setIsDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, 'true');
    } catch (e) {}
  }, []);

  const resetDismissal = useCallback(() => {
    setIsDismissed(false);
    try {
      localStorage.removeItem(DISMISS_KEY);
    } catch (e) {}
  }, []);

  const applyUpdate = useCallback(() => {
    if (swRegistration && swRegistration.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [swRegistration]);

  return {
    isSupported: typeof window !== 'undefined' && 'serviceWorker' in navigator,
    isInstalled,
    isInstallable: Boolean(deferredPrompt) || isIos,
    isIos,
    isDismissed,
    updateAvailable,
    swRegistration,
    promptInstall,
    dismissPrompt,
    resetDismissal,
    applyUpdate,
  };
}

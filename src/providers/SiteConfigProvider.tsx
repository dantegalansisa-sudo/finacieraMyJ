import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, firebaseEnabled } from '../firebase/config';
import type { SiteConfigMap, SiteConfigKey } from '../config/siteConfigTypes';

type ConfigState = {
  [K in SiteConfigKey]?: Partial<SiteConfigMap[K]>;
};

interface SiteConfigContextValue {
  overrides: ConfigState;
}

const SiteConfigContext = createContext<SiteConfigContextValue>({ overrides: {} });

const EDITABLE_SECTIONS: SiteConfigKey[] = [
  'contacto',
  'calculadora',
  'simuladorCuotas',
  'estadisticas',
  'urgencyBanner',
];

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<ConfigState>({});

  useEffect(() => {
    if (!firebaseEnabled) return;

    const unsubscribers = EDITABLE_SECTIONS.map((section) =>
      onSnapshot(
        doc(db, 'siteConfig', section),
        (snap) => {
          if (snap.exists()) {
            setOverrides((prev) => ({ ...prev, [section]: snap.data() }));
          }
        },
        (error) => {
          console.warn(`Firebase read for ${section}:`, error.message);
        }
      )
    );

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  return (
    <SiteConfigContext.Provider value={{ overrides }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfigContext() {
  return useContext(SiteConfigContext);
}

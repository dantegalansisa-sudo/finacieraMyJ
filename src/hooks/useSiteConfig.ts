import { useSiteConfigContext } from '../providers/SiteConfigProvider';
import * as defaults from '../config/siteConfig';
import type { SiteConfigMap, SiteConfigKey } from '../config/siteConfigTypes';

export function useSiteConfig<K extends SiteConfigKey>(section: K): SiteConfigMap[K] {
  const { overrides } = useSiteConfigContext();
  const defaultValue = defaults[section] as SiteConfigMap[K];
  const override = overrides[section];

  if (!override) return defaultValue;

  // Arrays get replaced entirely, objects get merged
  if (Array.isArray(defaultValue)) {
    return (override as SiteConfigMap[K]) ?? defaultValue;
  }

  return { ...defaultValue, ...override } as SiteConfigMap[K];
}

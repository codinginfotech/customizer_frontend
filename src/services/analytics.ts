import type { AnalyticsEvent } from '@cpd/shared';
import { api } from './apiClient';

/**
 * Typed, privacy-safe analytics. Only ids/keys/counts ever leave the client;
 * failures are silent — analytics must never affect the product experience.
 */
export function track(
  name: AnalyticsEvent,
  props: { productId?: number; designId?: number; areaKey?: string; value?: number } = {},
) {
  void api.post('/platform/events', { name, props }).catch(() => undefined);
}

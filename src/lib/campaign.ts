import type { Campaign } from './content';

/** Whether the campaign is on and hasn't ended (the end date counts as the last day, Israel time). */
export function campaignLive(c: Campaign, now = new Date()) {
  if (!c.enabled || !c.url) return false;
  const end = /^\d{4}-\d{2}-\d{2}$/.test(c.endsAt) ? new Date(`${c.endsAt}T23:59:59+02:00`) : null;
  return !end || now <= end;
}

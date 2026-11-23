import { campaignLive } from '@/lib/campaign';

/** A thin bar at the top of every page while the Headstart campaign runs. */
export function CampaignBanner() {
  if (!campaignLive()) return null;
  return (
    <a className="campaign-banner" href="/support" dir="rtl" lang="he">
      <span aria-hidden="true">🚀</span>
      <span>שני בני 13 בונים את RanEddie. <b>תמכו בנו בהדסטארט</b></span>
      <span className="campaign-banner-cta">לפרטים ←</span>
    </a>
  );
}

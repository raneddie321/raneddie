import { campaignLive } from '@/lib/campaign';

/** A thin bar at the top of every page while the Headstart campaign runs. */
export function CampaignBanner() {
  if (!campaignLive()) return null;
  return (
    <a className="campaign-banner" href="/support">
      <span aria-hidden="true">🚀</span>
      <span>Two 13-year-olds are building RanEddie. <b>Back us on Headstart</b></span>
      <span className="campaign-banner-cta">Learn more →</span>
    </a>
  );
}

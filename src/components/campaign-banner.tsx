import type { Campaign } from '@/lib/content';
import { campaignLive } from '@/lib/campaign';

/** A thin bar at the top of every page while the campaign runs (Studio → Campaign). */
export function CampaignBanner({ campaign }: { campaign: Campaign }) {
  if (!campaignLive(campaign)) return null;
  return (
    <a className="campaign-banner" href="/support">
      <span aria-hidden="true">🚀</span>
      <span>
        {campaign.bannerText} {campaign.bannerBold && <b>{campaign.bannerBold}</b>}
      </span>
      {campaign.bannerCta && <span className="campaign-banner-cta">{campaign.bannerCta}</span>}
    </a>
  );
}

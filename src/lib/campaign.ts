/** The Headstart crowdfunding campaign. The banner and /support hide themselves after it ends. */
export const CAMPAIGN = {
  url: 'https://headstart.co.il/project/92954',
  endsAt: new Date('2027-02-11T23:59:59+02:00'),
  shareText: 'Two 13-year-olds from Israel are building a tech company, RanEddie. Back them on Headstart 🚀',
};
export const campaignLive = (now = new Date()) => now < CAMPAIGN.endsAt;

/** The Headstart crowdfunding campaign. The banner and /support hide themselves after it ends. */
export const CAMPAIGN = {
  url: 'https://headstart.co.il/project/92954',
  endsAt: new Date('2027-02-11T23:59:59+02:00'),
  shareText: 'שני בני 13 מחדרה בונים חברת טכנולוגיה, RanEddie. תמכו בהם בהדסטארט 🚀',
};
export const campaignLive = (now = new Date()) => now < CAMPAIGN.endsAt;

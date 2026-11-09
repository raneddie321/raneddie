"""
RanEddie product catalogue: the source for product pages, product images and product docs.
Run `python3 scripts/generate-content.py` after editing; it rewrites src/data/*.json and the SVGs.

Feature fields (used to write the per-feature docs):
  n: name, d: what it does, s: steps, t: tip, sym: problem title, c: likely causes, f: fixes
"""

PLAY_URL = "https://play.google.com/store/apps/details?id=com.snakebrawl.raneddie"
FIZZ_URL = "https://fizzbrowser.vercel.app/"

PRODUCTS = [
    # ------------------------------------------------------------------ existing products
    {
        "slug": "fizz", "name": "Fizz Browser", "section": "Fizz Browser", "category": "BROWSER",
        "tagline": "The browser that rewards you.",
        "summary": "A fresh way to explore the web — a faster, more personal browsing experience with rewards built into the journey.",
        "visual": "fizz", "image": "", "status": "available", "platforms": ["Web"],
        "primaryCta": {"label": "Get Fizz", "href": FIZZ_URL},
        "palette": ["#7b5cff", "#168fe9", "#0b1530"], "motif": "browser",
        "body": """Fizz is RanEddie's take on what a browser should feel like today: quick to open, calm to look at and personal from the first tab.

## Built around you
Fizz keeps the things you use most one tap away, so getting where you want to go takes less effort.

## Rewards in the journey
Rewards are part of the experience rather than an add-on — explore the web the way you normally would.

## Your RanEddie ID
Sign in with the same RanEddie ID you use across RanEddie products.""",
        "features": [
            {"title": "Fast by default", "text": "A lightweight experience that gets out of the way."},
            {"title": "Rewards built in", "text": "Explore the web and get more back along the way."},
            {"title": "Personal", "text": "Make Fizz yours with the things you use most."},
        ],
        "data": "your settings, rewards progress and the things you choose to save",
        "ai": "Fizz may offer smart suggestions as you type in the search box. Suggestions are optional and can be turned off in settings.",
        "docFeatures": [
            {"n": "Search from the start page", "d": "type a question or an address into the search box on the Fizz start page", "s": ["Open Fizz.", "Select the search box on the start page.", "Type what you're looking for and press Enter."], "t": "Typing a full address such as raneddie.com opens the site directly.", "sym": "Search results don't open", "c": ["A slow or interrupted connection", "A browser extension or content blocker interfering"], "f": ["Check that you're connected to the internet.", "Turn off content blockers for the page and try again.", "Reload Fizz."]},
            {"n": "Rewards", "d": "collect rewards as you explore the web with Fizz", "s": ["Open Fizz and sign in with your RanEddie ID.", "Browse as you normally would.", "Open the rewards area to see your progress."], "t": "Sign in before you browse so your progress is saved to your RanEddie ID.", "sym": "Rewards progress isn't updating", "c": ["You're not signed in", "Progress takes a moment to sync"], "f": ["Make sure you're signed in with your RanEddie ID.", "Wait a few minutes and reopen the rewards area.", "Sign out and back in."]},
            {"n": "Personal start page", "d": "keep the sites you use most one tap away", "s": ["Open a new Fizz tab.", "Add the sites you visit most.", "Rearrange them in the order you like."], "t": "Keep your start page short — a few favourites are faster to scan than a long list.", "sym": "Start page changes disappear", "c": ["Browsing in a private window", "Site data was cleared"], "f": ["Use a regular window when you edit your start page.", "Sign in with your RanEddie ID to keep your settings.", "Avoid clearing site data for Fizz."]},
            {"n": "Sign in with RanEddie ID", "d": "use one account across Fizz and other RanEddie products", "s": ["Open Fizz.", "Choose Sign in.", "Sign in on id.raneddie.com and you're returned to Fizz."], "t": "The same RanEddie ID works across every RanEddie product.", "sym": "Sign-in page keeps loading", "c": ["A content blocker blocking the sign-in page", "A weak connection"], "f": ["Make sure the address is id.raneddie.com.", "Turn off content blockers for the page.", "Try again on a stronger connection."]},
        ],
        "glossary": [("Start page", "The page you see when you open a new tab in Fizz."), ("Rewards", "Progress you collect while you browse with Fizz."), ("RanEddie ID", "The account you use across all RanEddie products.")],
        "faq": [("Is Fizz free?", "Yes, you can use Fizz for free."), ("Do I need a RanEddie ID?", "No, but signing in keeps your rewards and settings with your account.")],
    },
    {
        "slug": "snake-brawl", "name": "Snake Brawl", "section": "Snake Brawl", "category": "GAME",
        "tagline": "Nostalgia meets competition.",
        "summary": "Classic Snake meets arena combat. Grow, shoot, charge your Super and be the last snake standing while the poison closes in.",
        "visual": "snake", "image": "/images/snake-brawl-art.svg", "status": "available", "platforms": ["Android"],
        "primaryCta": {"label": "Get it on Google Play", "href": PLAY_URL},
        "palette": ["#22d3ee", "#2563eb", "#080910"], "motif": "snake",
        "body": """Snake Brawl takes the game everyone knows and drops it into an arena. Eat orbs to grow, carry a weapon, charge your **Super**, hide in bushes and be the last snake standing while the poison closes in.

## Three ways to play
- **Showdown** — ten snakes, no respawns, and a poison cloud that closes in. Last snake standing wins.
- **Endless** — the classic grow-as-big-as-you-can mode on a bigger map.
- **Duo Showdown** — team up with your club's duo partner against four other pairs.

## Twelve brawlers
From Viper's venom pellets to Nova's meteor rain, every brawler has its own attack and Super. Unlock new brawlers in the shop and upgrade them from power level 1 to 7.

## Play with a friend
**Friends** mode connects two Android phones on the same Wi-Fi network — choose Together, Versus, Snake Ball or Egg Heist.

## Snake Pass
A 30-tier season pass with free and Snake Pass+ rewards — coins, boxes, skins and brawlers.

## Safe for younger players
Players under 13 get a generated nickname and can't buy coins with real money.""",
        "features": [
            {"title": "Arena combat", "text": "Shoot, charge your Super and outplay nine other snakes."},
            {"title": "12 brawlers", "text": "Every brawler has its own attack, Super and upgrade path."},
            {"title": "Play with a friend", "text": "Two phones on the same Wi-Fi: Together, Versus, Snake Ball or Egg Heist."},
            {"title": "Snake Pass", "text": "A 30-tier season with free and Pass+ rewards."},
        ],
        "data": "your nickname, progress, coins, unlocked brawlers and settings — stored on your phone",
        "ai": "Snake Brawl's computer players (bots) adapt to your trophy count: they get smarter, stronger and fancier as you improve.",
        "docFeatures": [
            {"n": "Showdown", "d": "play a ten-snake battle with no respawns while the poison closes in", "s": ["Choose Showdown on the main menu.", "Pick your brawler.", "Grow, collect power cubes and survive until you're the last snake."], "t": "The poison starts closing in after 25 seconds — head toward the centre early.", "sym": "I lose trophies even when I do well", "c": ["Trophies depend on your final rank", "Higher trophy counts face stronger bots"], "f": ["Focus on surviving longer rather than knockouts.", "Collect power cubes from crates for +10% health and damage each.", "Upgrade your favourite brawler."]},
            {"n": "Endless", "d": "play the classic grow-as-big-as-you-can mode on a bigger map", "s": ["Choose Endless on the main menu.", "Eat orbs to grow.", "Avoid crashing your head into other snakes."], "t": "Boosting burns length — use it to escape or to cut off another snake.", "sym": "My snake keeps shrinking", "c": ["Holding Boost burns length"], "f": ["Release the Boost button when you don't need speed.", "Eat the food other snakes leave behind."]},
            {"n": "Duo Showdown", "d": "team up with your club's duo partner against four other pairs", "s": ["Join or create a club.", "Choose Play Duo on the club screen.", "Watch your partner's card under the minimap for their health and respawn timer."], "t": "A knocked-out partner respawns after 5 seconds while you stay alive — play safe when they're down.", "sym": "I can't find Duo Showdown", "c": ["You're not in a club yet"], "f": ["Open the club screen and join or create a club.", "Choose Play Duo from the club screen."]},
            {"n": "Brawlers and upgrades", "d": "unlock brawlers and raise their power level", "s": ["Open the Brawlers screen.", "Pick a brawler.", "Spend coins to upgrade its power level (1 to 7)."], "t": "Each power level adds 6% health and damage.", "sym": "I can't afford an upgrade", "c": ["Not enough coins"], "f": ["Play matches to earn coins by rank, knockouts and length.", "Claim the free gift in the shop every 4 hours.", "Claim Snake Pass rewards."]},
            {"n": "Snake Pass", "d": "earn rewards across a 30-tier season", "s": ["Open the SNAKE PASS card on the main menu.", "Play matches to earn pass XP (150 XP per tier).", "Select CLAIM ALL to collect your rewards."], "t": "Snake Pass+ costs 1,200 coins — no real money.", "sym": "A reward turned into coins", "c": ["You already owned that item"], "f": ["This is expected: rewards you already own are converted into coins."]},
            {"n": "Play with a friend", "d": "play with one friend on the same Wi-Fi network", "s": ["Connect both Android phones to the same Wi-Fi network (or use a hotspot).", "On the host phone, choose FRIENDS and create a room.", "On the second phone, join the room — or enter the host phone's local IP address.", "The host picks Together, Versus, Snake Ball or Egg Heist and a map."], "t": "Only two phones can play together: the host and one friend.", "sym": "My friend can't find my room", "c": ["The phones are on different networks", "The network blocks devices from seeing each other", "Different versions of the game"], "f": ["Make sure both phones are on the same Wi-Fi network, or use one phone as a hotspot.", "Enter the host phone's local IP address manually.", "Update both phones to the latest version."]},
            {"n": "Clubs", "d": "join or create a club and play with a duo partner", "s": ["Open the club screen.", "Join one of the clubs, or create your own with a name and badge.", "See members and their trophies on the club screen."], "t": "Some clubs need a minimum number of trophies.", "sym": "I can't join a club", "c": ["The club needs more trophies than you have"], "f": ["Choose a club with a lower trophy requirement.", "Create your own club."]},
            {"n": "Settings", "d": "adjust sound, controls and graphics", "s": ["Open Settings.", "Change sound, vibration, damage numbers, graphics quality, auto-aim, left-handed controls, joystick size or camera distance."], "t": "Low graphics quality can make the game smoother on older phones.", "sym": "The game feels slow", "c": ["High graphics on an older phone", "Other apps running in the background"], "f": ["Set graphics quality to low.", "Close other apps.", "Restart your phone."]},
        ],
        "glossary": [("Super", "A powerful attack you charge by hitting other snakes."), ("Power cube", "A pickup from crates and knocked-out snakes that adds 10% health and damage."), ("Poison", "The cloud that closes in during Showdown."), ("Trophies", "Points you earn or lose based on your Showdown rank."), ("Boost", "A sprint that burns length.")],
        "faq": [("Is there online multiplayer?", "Friends mode works for two Android phones on the same Wi-Fi network. Clubs and duo partners are computer players."), ("Can kids buy coins?", "Players under 13 can't buy coins with real money."), ("Does Snake Brawl show ads?", "No.")],
    },
    # ------------------------------------------------------------------ new products
    {
        "slug": "bluebear-media", "name": "BlueBear Media", "section": "BlueBear Media", "category": "ENTERTAINMENT",
        "tagline": "Stories for every screen, and places to live them.",
        "summary": "BlueBear Media is RanEddie's entertainment company — film, television, streaming, animation, music and theme parks under one roof.",
        "palette": ["#2f6bff", "#0b2a6f", "#050a1c"], "motif": "media", "platforms": ["Cinemas", "TV", "Streaming", "Parks"],
        "body": """BlueBear Media brings RanEddie's storytelling together: the films you see in cinemas, the series you stream at home, the music you hear in them and the parks where you can step inside them.

## BlueBear Pictures
The film studio. BlueBear Pictures develops, produces and releases feature films — from big-screen adventures and family animation to smaller character-driven stories — and takes them from first draft to premiere.

## BlueBear TV
The television group. BlueBear TV produces scripted series, unscripted shows, live events and kids' programming, and runs BlueBear's linear channels.

## BlueBear Stream
The streaming service. Watch BlueBear films and series on phones, tablets, TVs and streamers, with profiles for everyone in the household, downloads for offline viewing and a kids' space with its own controls.

## BlueBear Animation
Feature films, series and shorts made by BlueBear's animation studio, for young audiences and grown-ups alike.

## BlueBear Music
Original scores and soundtracks, plus a label for artists whose music starts on screen and keeps going.

## BlueBear Parks & Resorts
Theme parks, water parks and resort hotels where BlueBear stories become rides, shows, food and places to stay.

## BlueBear Studio Tours
Walk the backlots and sound stages, see how scenes are built and visit the departments that make them.

## BlueBear Consumer Products
Toys, apparel, books and collectibles inspired by BlueBear films and series.

## Made with RanEddie tools
BlueBear productions use EditTime for editing and post-production, Cloudly for storage and delivery, and RanEddie ID for one account across BlueBear Stream, park tickets and the BlueBear shop.""",
        "features": [
            {"title": "BlueBear Pictures", "text": "Feature films from first draft to premiere."},
            {"title": "BlueBear TV", "text": "Series, live events, kids' programming and channels."},
            {"title": "BlueBear Stream", "text": "Films and series on every screen, with profiles and downloads."},
            {"title": "BlueBear Parks & Resorts", "text": "Rides, shows and hotels inspired by BlueBear stories."},
            {"title": "BlueBear Animation & Music", "text": "Animated films and series, original scores and soundtracks."},
            {"title": "Studio Tours & Products", "text": "Behind-the-scenes tours, toys, books and collectibles."},
        ],
        "data": "your BlueBear Stream profiles, watch history, downloads, park tickets and shop orders",
        "ai": "BlueBear Stream can recommend films and series based on what each profile watches. Recommendations stay inside each profile and can be reset at any time.",
        "docFeatures": [
            {"n": "BlueBear Stream profiles", "d": "give everyone in your household their own profile with its own recommendations and watch list", "s": ["Open BlueBear Stream and sign in with your RanEddie ID.", "Choose Manage profiles.", "Add a profile, pick an avatar and set the maturity level."], "t": "Create a kids' profile for younger viewers — it only shows titles for their age.", "sym": "Recommendations don't match what I watch", "c": ["Someone else watched on your profile", "Your watch history is mixed between people"], "f": ["Give each person their own profile.", "Remove titles from your watch history.", "Reset recommendations in profile settings."]},
            {"n": "Downloads", "d": "download films and episodes to watch without a connection", "s": ["Open a title in BlueBear Stream on your phone or tablet.", "Select Download.", "Find it later under Downloads."], "t": "Download over Wi-Fi to save mobile data.", "sym": "A download expired", "c": ["Downloads stay available for a limited time", "The title left BlueBear Stream"], "f": ["Connect to the internet and renew the download.", "Delete and download the title again."]},
            {"n": "Watch on your TV", "d": "watch BlueBear Stream on a TV, streamer or Lu Stream", "s": ["Install BlueBear Stream on your TV or streamer.", "Choose Sign in and note the code shown.", "Enter the code at id.raneddie.com on your phone."], "t": "You can also cast from your phone to a TV on the same network.", "sym": "Video keeps buffering", "c": ["A slow or busy connection", "Too many devices streaming at once"], "f": ["Move your router closer or use a wired connection.", "Lower the playback quality.", "Pause other downloads on your network."]},
            {"n": "Parental controls", "d": "control what younger viewers can watch", "s": ["Open profile settings in BlueBear Stream.", "Set a maturity level for each profile.", "Add a profile PIN to stop others switching profiles."], "t": "Profile PINs are separate from your RanEddie ID password.", "sym": "A kids' profile shows the wrong titles", "c": ["The maturity level is set too high"], "f": ["Lower the profile's maturity level.", "Block specific titles in profile settings."]},
            {"n": "Park tickets", "d": "buy and store BlueBear Parks & Resorts tickets in your RanEddie ID", "s": ["Visit BlueBear Parks & Resorts and choose your dates.", "Sign in with your RanEddie ID and pay.", "Show the ticket from your phone at the gate."], "t": "Add everyone in your party before you check out so tickets are assigned by name.", "sym": "My ticket won't scan", "c": ["Screen brightness too low", "The ticket is for a different date"], "f": ["Turn up your screen brightness.", "Check the date on the ticket.", "Visit Guest Services at the entrance."]},
            {"n": "Resort reservations", "d": "book a room at a BlueBear resort hotel", "s": ["Choose a resort and your dates.", "Pick a room and add guests.", "Confirm with your RanEddie ID."], "t": "Resort guests can link park tickets to their reservation.", "sym": "I can't change my reservation", "c": ["The change window has passed", "The room type is sold out on new dates"], "f": ["Check the change policy in your confirmation.", "Contact BlueBear Parks & Resorts guest support."]},
            {"n": "Studio Tours", "d": "book a guided tour of BlueBear's backlots and sound stages", "s": ["Choose a tour and a time.", "Add guests and confirm.", "Arrive 20 minutes early with your ticket."], "t": "Sets change with productions, so every tour is a little different.", "sym": "My tour time changed", "c": ["Filming schedules can move tours"], "f": ["Check your email for the new time.", "Rebook from your RanEddie ID if the new time doesn't work."]},
            {"n": "BlueBear Shop", "d": "buy toys, apparel, books and collectibles", "s": ["Browse the BlueBear Shop.", "Add items to your bag.", "Check out with your RanEddie ID."], "t": "Orders appear in your RanEddie ID so you can track them.", "sym": "My order hasn't arrived", "c": ["Delivery estimates vary by country"], "f": ["Open the order to see tracking.", "Contact the shop if tracking hasn't updated in 5 days."]},
        ],
        "glossary": [("Profile", "A personal space in BlueBear Stream with its own recommendations."), ("Maturity level", "The age rating a profile is allowed to watch."), ("Backlot", "Outdoor sets at a film studio."), ("Download", "A copy of a title stored on your device for offline viewing.")],
        "faq": [("Do I need a separate account for BlueBear Stream?", "No — sign in with your RanEddie ID."), ("Can I watch on more than one device?", "Yes. Each profile can watch on its own device.")],
    },
    {
        "slug": "lu", "name": "Lu", "section": "Lu", "category": "DEVICES",
        "tagline": "Every device, one Lu.",
        "summary": "Lu is RanEddie's family of devices — phone, tablet, watch, earbuds, streamer, laptop and home speaker — designed to work as one.",
        "palette": ["#e8edf5", "#8aa0c2", "#101523"], "motif": "devices", "platforms": ["Lu Phone", "Lu Tab", "Lu Watch", "Lu Buds", "Lu Stream", "Lu Book", "Lu Home"],
        "body": """Lu is a family of devices that know about each other. Start something on your phone and finish it on your tablet, answer a call on your watch, and move music from your earbuds to the speaker in the kitchen — all with one RanEddie ID.

## Lu Phone
The centre of Lu: a bright display, an all-day battery, a camera system tuned for real life, and Lu OS keeping your apps, photos and messages in sync.

## Lu Tab
A thin, light tablet for watching, drawing, reading and working — with keyboard and pen accessories when you need them.

## Lu Watch
Notifications, calls, workouts, heart-rate and sleep tracking, and payments from your wrist.

## Lu Buds
Wireless earbuds with active noise cancellation, a transparency mode and automatic switching between your Lu devices.

## Lu Stream
A small box that turns any TV into a smart TV, with BlueBear Stream, RanEddie Games streaming and your Lu photos on the big screen.

## Lu Book
A laptop for work and study, with workIT built in and Lu Link to your phone.

## Lu Home
A home speaker with room-filling sound that controls your smart home and plays across rooms.

## Lu Link
Lu Link connects your devices: copy on one and paste on another, hand off a call, share Wi-Fi passwords, unlock your Lu Book with your Lu Watch and find any device that goes missing.

## Built to last
Lu devices get software updates for years, and RanEddie Part offers genuine parts, repairs and trade-in when you're ready for something new.""",
        "features": [
            {"title": "Lu Phone & Lu Tab", "text": "Bright displays, all-day battery and Lu OS on every screen."},
            {"title": "Lu Watch", "text": "Calls, health tracking, workouts and payments on your wrist."},
            {"title": "Lu Buds", "text": "Noise cancellation and automatic switching between devices."},
            {"title": "Lu Stream & Lu Home", "text": "A smarter TV and room-filling sound for the whole home."},
            {"title": "Lu Book", "text": "A laptop with workIT built in and Lu Link to your phone."},
            {"title": "Lu Link", "text": "Copy, paste, hand off calls and find devices across Lu."},
        ],
        "data": "device backups, health and fitness data, photos, Wi-Fi passwords and the list of devices linked to your RanEddie ID",
        "ai": "Lu OS uses on-device intelligence for features like photo search, smart replies and battery optimisation. Where possible, this processing happens on the device itself.",
        "docFeatures": [
            {"n": "Set up a new Lu device", "d": "set up a Lu device and sign in with your RanEddie ID", "s": ["Turn on the device and choose your language.", "Connect to Wi-Fi.", "Sign in with your RanEddie ID.", "Restore from a Cloudly backup or set up as new."], "t": "Hold another Lu device nearby to copy settings automatically.", "sym": "Setup is stuck on Wi-Fi", "c": ["Wrong Wi-Fi password", "A network that needs a sign-in page"], "f": ["Re-enter the Wi-Fi password.", "Choose a different network or a mobile hotspot.", "Restart the device and try again."]},
            {"n": "Lu Link", "d": "copy, paste and hand off between your Lu devices", "s": ["Sign in to the same RanEddie ID on each device.", "Turn on Bluetooth and Wi-Fi.", "Turn on Lu Link in Settings."], "t": "Keep devices within about 10 metres of each other for hand-off to work.", "sym": "Copy and paste doesn't move between devices", "c": ["Devices signed in with different RanEddie IDs", "Bluetooth is off on one device"], "f": ["Check that every device uses the same RanEddie ID.", "Turn Bluetooth and Wi-Fi on.", "Turn Lu Link off and on again."]},
            {"n": "Pair Lu Buds", "d": "connect Lu Buds to your phone and other Lu devices", "s": ["Open the Lu Buds case next to your Lu Phone.", "Select Connect on the card that appears.", "Your Lu Buds are now available on every Lu device signed in to your RanEddie ID."], "t": "Press and hold the case button to pair with a non-Lu device.", "sym": "One earbud has no sound", "c": ["The earbud's battery is empty", "Dirty speaker mesh"], "f": ["Put both earbuds in the case to charge.", "Clean the mesh gently with a dry, soft brush.", "Reset the earbuds by holding the case button for 15 seconds."]},
            {"n": "Health on Lu Watch", "d": "track workouts, heart rate and sleep", "s": ["Open the Health app on your Lu Phone.", "Fill in your health profile.", "Wear Lu Watch snugly, especially while you sleep."], "t": "Lu Watch is not a medical device. Talk to a doctor about any health concerns.", "sym": "Heart-rate readings look wrong", "c": ["The watch is too loose", "Wet or tattooed skin under the sensor"], "f": ["Tighten the band slightly.", "Dry your wrist and the sensor.", "Wear the watch a little higher on your arm."]},
            {"n": "Find my device", "d": "locate, ring or lock a missing Lu device", "s": ["Sign in to your RanEddie ID on another device.", "Open Find My Lu.", "Choose the device to see it on a map, play a sound, or lock it."], "t": "Turn on Find My Lu during setup so it's ready if you ever need it.", "sym": "My device shows as offline", "c": ["The battery is empty", "The device has no connection"], "f": ["Turn on Notify when found.", "Lock the device remotely so it's protected when it reconnects."]},
            {"n": "Back up to Cloudly", "d": "keep a copy of your device in Cloudly", "s": ["Open Settings > RanEddie ID > Backup.", "Turn on Cloudly Backup.", "Keep the device on Wi-Fi and charging overnight."], "t": "Backups include apps, settings, messages and photos you choose.", "sym": "Backup didn't finish", "c": ["Not enough Cloudly storage", "The device wasn't charging or on Wi-Fi"], "f": ["Free up Cloudly storage or upgrade your plan.", "Connect to Wi-Fi and a charger, then select Back up now."]},
            {"n": "Software updates", "d": "keep Lu OS up to date", "s": ["Open Settings > Software update.", "Select Download and install.", "Keep the device charging until it restarts."], "t": "Turn on automatic updates to install them overnight.", "sym": "An update won't install", "c": ["Not enough free space", "Low battery"], "f": ["Free up storage.", "Charge to at least 50%.", "Restart and try again."]},
            {"n": "Lu Stream setup", "d": "connect Lu Stream to your TV", "s": ["Plug Lu Stream into your TV's HDMI port and into power.", "Pair the remote.", "Sign in with your RanEddie ID by scanning the code with your phone."], "t": "Use the TV's HDMI port marked ARC to control volume with the Lu remote.", "sym": "No picture on the TV", "c": ["The TV is on the wrong input", "A loose HDMI cable"], "f": ["Switch the TV input to the HDMI port Lu Stream is plugged into.", "Reconnect the cable firmly.", "Try another HDMI port."]},
        ],
        "glossary": [("Lu OS", "The software that runs on Lu devices."), ("Lu Link", "Features that connect your Lu devices together."), ("Hand-off", "Moving an activity from one device to another."), ("ANC", "Active noise cancellation in Lu Buds.")],
        "faq": [("Do Lu devices work without each other?", "Yes. Each device works on its own; together they do more."), ("How long do Lu devices get updates?", "Lu devices receive software updates for several years after release.")],
    },
    {
        "slug": "raneddie-part", "name": "RanEddie Part", "section": "RanEddie Part", "category": "REPAIR & PARTS",
        "tagline": "Keep it working. Keep it yours.",
        "summary": "RanEddie Part is where RanEddie hardware gets a longer life — genuine parts, repairs, accessories, protection plans, trade-in and recycling.",
        "palette": ["#ffb020", "#d35400", "#1a0f05"], "motif": "parts", "platforms": ["Repair centres", "Mail-in", "Online store"],
        "body": """Every Lu device, RanEddie Core console and Gimbly camera is built to be repaired. RanEddie Part is the home for everything that keeps them going.

## Genuine parts
Batteries, screens, cameras, charging ports, controllers and more — the same parts used in RanEddie repair centres, each matched to your device's serial number.

## Repairs your way
Book a repair at a RanEddie Part centre, send your device by mail, or fix it yourself with a self-repair kit and step-by-step guides.

## Self-repair kits
Kits include the part, the right tools and a guide written for your exact model. Return the old part in the prepaid box and it's recycled.

## Part Care
Protection plans that cover accidental damage, battery service and express replacements for Lu devices, RanEddie Core and Gimbly.

## Accessories
Cases, chargers, cables, bands, controllers and docks designed for RanEddie hardware.

## Trade-in and recycling
Trade in your old device for credit, or recycle it for free. Every device is checked, wiped securely and either refurbished or recycled responsibly.

## Certified refurbished
Refurbished RanEddie devices with a new battery, genuine parts and a full warranty.""",
        "features": [
            {"title": "Genuine parts", "text": "Batteries, screens, cameras and ports matched to your device."},
            {"title": "Repair centres & mail-in", "text": "Book a visit or send your device in."},
            {"title": "Self-repair kits", "text": "The part, the tools and a guide for your exact model."},
            {"title": "Part Care", "text": "Accidental damage cover and express replacements."},
            {"title": "Trade-in & recycling", "text": "Credit for your old device, or free recycling."},
            {"title": "Certified refurbished", "text": "Like-new devices with a full warranty."},
        ],
        "data": "your device serial numbers, repair history, orders and Part Care plans",
        "ai": "RanEddie Part's diagnostics can suggest which part is likely at fault from a device's self-test results. A technician always confirms before any repair.",
        "docFeatures": [
            {"n": "Book a repair", "d": "book a repair at a RanEddie Part centre", "s": ["Sign in to RanEddie Part with your RanEddie ID.", "Choose your device and describe the problem.", "Pick a centre and a time."], "t": "Back up your device to Cloudly before your appointment.", "sym": "No appointments are available", "c": ["High demand at your nearest centre"], "f": ["Try another centre nearby.", "Choose mail-in repair instead."]},
            {"n": "Mail-in repair", "d": "send your device to RanEddie Part by post", "s": ["Start a mail-in repair and print the prepaid label.", "Turn off Find My Lu and back up your device.", "Pack it in the box we send, or any sturdy box."], "t": "Remove cases, SIM cards and memory cards before sending.", "sym": "My repair is taking longer than expected", "c": ["Waiting for a part", "The technician found another issue"], "f": ["Check the repair status in your RanEddie ID.", "Approve any extra repair quote so work can continue."]},
            {"n": "Self-repair kits", "d": "repair a device yourself with genuine parts and tools", "s": ["Enter your device's serial number to see available kits.", "Order the kit.", "Follow the guide for your exact model.", "Return the old part in the prepaid box."], "t": "Read the whole guide before you start and work on a clean, well-lit surface.", "sym": "The new part isn't recognised", "c": ["The part needs to be paired to your device"], "f": ["Run System Configuration from the guide's last step.", "Make sure the device is connected to the internet while pairing."]},
            {"n": "Part Care", "d": "protect your device against accidents", "s": ["Choose Part Care when you buy, or add it within 60 days.", "Register your device's serial number.", "Start a claim from your RanEddie ID if something happens."], "t": "Part Care includes battery service when capacity drops below 80%.", "sym": "My claim was declined", "c": ["The damage isn't covered by your plan", "The serial number doesn't match"], "f": ["Read the coverage terms in your plan.", "Contact RanEddie Part support to review the claim."]},
            {"n": "Trade in a device", "d": "get credit for a device you no longer use", "s": ["Answer a few questions about your device's condition.", "Accept the estimate.", "Send the device or drop it off at a centre."], "t": "Sign out of your RanEddie ID and erase the device before trading it in.", "sym": "My trade-in value changed", "c": ["The device's condition differed from the description"], "f": ["Review the inspection notes.", "Accept the new value or ask for the device back for free."]},
            {"n": "Recycle a device", "d": "recycle RanEddie hardware for free", "s": ["Start a recycling request.", "Print the free label or drop off at a centre.", "We'll confirm when it's been recycled."], "t": "Batteries are recycled separately for safety.", "sym": "I can't print a label", "c": ["No printer"], "f": ["Choose drop-off at a RanEddie Part centre instead."]},
            {"n": "Check your warranty", "d": "see your device's warranty and Part Care status", "s": ["Sign in to RanEddie Part.", "Select your device.", "See its warranty, Part Care and repair history."], "t": "Keep your proof of purchase in your RanEddie ID.", "sym": "My device isn't listed", "c": ["It's registered to a different RanEddie ID"], "f": ["Sign in with the RanEddie ID used on the device.", "Add the device by serial number."]},
            {"n": "Buy accessories", "d": "find cases, chargers and accessories for your devices", "s": ["Choose your device to see compatible accessories.", "Add to your bag.", "Check out with your RanEddie ID."], "t": "Filter by device so you only see accessories that fit.", "sym": "The accessory doesn't fit", "c": ["It was made for a different model"], "f": ["Return it within 14 days for a refund.", "Check your model name in Settings > About."]},
        ],
        "glossary": [("Serial number", "The unique code that identifies your device."), ("Part Care", "A RanEddie Part protection plan."), ("Refurbished", "A pre-owned device restored with genuine parts.")],
        "faq": [("Will a repair erase my data?", "Some repairs may. Always back up to Cloudly first."), ("Do self-repair kits void my warranty?", "No — using a genuine kit and following the guide doesn't void your warranty.")],
    },
    {
        "slug": "skypear", "name": "SkyPear", "section": "SkyPear", "category": "FOOD",
        "tagline": "Pizza, reimagined from the base up.",
        "summary": "SkyPear is a fast-food restaurant chain known for its signature pizzas on crispy tortilla or fresh dough, hot dogs, loaded fries, wraps, shakes and more.",
        "palette": ["#ff6a3d", "#7cc243", "#1b0f08"], "motif": "food", "platforms": ["Restaurants", "SkyPear app", "Delivery"],
        "body": """SkyPear started with one question: what if the base were the best part of the pizza? Today SkyPear restaurants serve pizzas on two very different foundations — and a full menu around them.

## Two kinds of pizza
- **Tortilla pizzas** — a thin, crisp tortilla base that bakes in minutes, with toppings piled edge to edge.
- **Dough pizzas** — fresh dough, proofed in the restaurant every day and baked until the crust is golden and airy.

Every pizza comes in classic and SkyPear originals, and you can build your own from the topping bar.

## Hot dogs
Grilled hot dogs in toasted buns with SkyPear's own sauces and crunchy toppings — plus vegetarian sausages.

## Beyond pizza
Loaded fries, wraps, salads, wings, shakes, fresh juices and desserts — including the Pear Crumble the brand is named after.

## Order your way
Eat in, take away, drive through, or order ahead in the SkyPear app and skip the queue. Delivery is available from many restaurants.

## Pear Points
Earn Pear Points with every order in the app and swap them for free food.

## Know what you eat
Allergen and nutrition information for every item is in the app and in every restaurant. Ask the team if you have an allergy — they'll help you choose.""",
        "features": [
            {"title": "Tortilla & dough pizzas", "text": "A crisp tortilla base or fresh dough baked daily."},
            {"title": "Hot dogs", "text": "Grilled, loaded and served with SkyPear sauces."},
            {"title": "Fries, wraps & shakes", "text": "A full menu around the pizza."},
            {"title": "Order ahead", "text": "Skip the queue with the SkyPear app."},
            {"title": "Delivery", "text": "From many SkyPear restaurants to your door."},
            {"title": "Pear Points", "text": "Earn points on every order and get free food."},
        ],
        "data": "your orders, saved addresses, favourite restaurants, Pear Points and dietary preferences",
        "ai": "The SkyPear app can suggest favourites and combos based on your past orders. You can clear your order history at any time.",
        "docFeatures": [
            {"n": "Order ahead", "d": "order in the SkyPear app and collect without queuing", "s": ["Open the SkyPear app and choose a restaurant.", "Add items and choose a pickup time.", "Pay and collect from the pickup shelf."], "t": "Turn on notifications to know the moment your order is ready.", "sym": "My order isn't ready at the pickup time", "c": ["A busy period at the restaurant"], "f": ["Show your order number to the team.", "Check the order status in the app."]},
            {"n": "Delivery", "d": "get SkyPear delivered", "s": ["Choose Delivery and enter your address.", "Add items to your basket.", "Pay and follow the driver in the app."], "t": "Add delivery notes like a gate code to help your driver.", "sym": "My delivery is late or missing", "c": ["Heavy traffic or weather", "Address details missing"], "f": ["Follow the driver on the map.", "Contact support from the order screen for a refund or replacement."]},
            {"n": "Build your own pizza", "d": "choose a base and toppings", "s": ["Choose Build your own.", "Pick tortilla or dough.", "Add sauce, cheese and toppings."], "t": "Tortilla pizzas bake faster — perfect when you're in a hurry.", "sym": "A topping I want isn't listed", "c": ["It's seasonal or not available at this restaurant"], "f": ["Try another restaurant.", "Check back — seasonal toppings change regularly."]},
            {"n": "Pear Points", "d": "earn and spend Pear Points", "s": ["Sign in to the SkyPear app with your RanEddie ID.", "Order in the app or scan your code in the restaurant.", "Spend points on rewards from the Rewards tab."], "t": "Points expire after 12 months without an order.", "sym": "Points are missing from an order", "c": ["The code wasn't scanned", "The order was placed as a guest"], "f": ["Add a missing order within 14 days from Rewards > Missing points.", "Always sign in before you order."]},
            {"n": "Allergens and nutrition", "d": "find allergen and nutrition information", "s": ["Open any item in the app.", "Select Allergens & nutrition.", "Set dietary filters to hide items that don't suit you."], "t": "Our kitchens handle common allergens. Always tell the team about an allergy.", "sym": "I can't find allergen information", "c": ["The item is a limited-time special"], "f": ["Ask the restaurant team for the allergen sheet.", "Contact SkyPear support."]},
            {"n": "Group orders", "d": "order together with friends or colleagues", "s": ["Start a group order and share the link.", "Everyone adds their own items.", "The organiser pays, or everyone pays their part."], "t": "Set a deadline so the order is placed on time.", "sym": "Someone can't join the group order", "c": ["The link expired", "The deadline passed"], "f": ["Share a new link.", "Extend the deadline."]},
            {"n": "Catering", "d": "order SkyPear for events", "s": ["Choose Catering in the app.", "Pick a package and the number of guests.", "Choose a date and confirm at least 48 hours ahead."], "t": "Catering packages include vegetarian options.", "sym": "My catering date isn't available", "c": ["The restaurant is fully booked"], "f": ["Choose another restaurant or time.", "Contact the restaurant directly."]},
            {"n": "Refunds", "d": "get help with an order that wasn't right", "s": ["Open the order in the app.", "Select Get help and choose what went wrong.", "Add a photo if something was damaged."], "t": "Report problems within 24 hours of your order.", "sym": "I didn't get my refund", "c": ["Refunds take a few days to reach your bank"], "f": ["Allow 3–5 business days.", "Contact support with your order number."]},
        ],
        "glossary": [("Tortilla pizza", "SkyPear's signature pizza on a thin, crisp tortilla base."), ("Pear Points", "SkyPear's rewards points."), ("Order ahead", "Ordering in the app and collecting without queuing.")],
        "faq": [("Do you have vegetarian options?", "Yes — including vegetarian sausages and plenty of meat-free pizzas."), ("Can I pay in cash?", "In restaurants, yes. App orders are paid in the app.")],
    },
    {
        "slug": "workit", "name": "workIT", "section": "workIT", "category": "PRODUCTIVITY",
        "tagline": "Do your best work, together.",
        "summary": "workIT is RanEddie's productivity suite — documents, spreadsheets, presentations, notes, forms and meetings that work together, with workIT Assist built in.",
        "palette": ["#3b82f6", "#10b981", "#0a1628"], "motif": "office", "platforms": ["Web", "Windows", "macOS", "Lu Book", "Lu Tab", "Phones"],
        "body": """workIT brings together the apps you use to write, calculate, present and meet — on the web, on your computer and on your phone — with files saved to Cloudly and shared in a click.

## workIT Write
A word processor for everything from a one-page letter to a 300-page report: styles, tables, comments, suggestions, version history and export to common formats.

## workIT Sheets
Spreadsheets with formulas, pivot tables, charts, filters and live collaboration — from a household budget to a company forecast.

## workIT Slides
Presentations with themes, animations, presenter view and live captions when you present.

## workIT Notes
Notebooks for ideas, meeting notes and to-dos, with handwriting on Lu Tab.

## workIT Forms
Surveys, quizzes and sign-up forms with responses collected straight into workIT Sheets.

## workIT Meet
Video meetings with screen sharing, chat, recordings and transcripts.

## workIT Assist
An AI assistant inside every workIT app. Ask it to draft a document, summarise a long thread, build a formula, turn notes into slides or recap a meeting — and review what it suggests before you use it.

## Work together
Share a file with a link, edit at the same time, leave comments and see who changed what. Everything saves automatically to Cloudly.""",
        "features": [
            {"title": "Write, Sheets & Slides", "text": "Documents, spreadsheets and presentations that work together."},
            {"title": "Notes & Forms", "text": "Notebooks, surveys and quizzes with live responses."},
            {"title": "workIT Meet", "text": "Video meetings with recordings and transcripts."},
            {"title": "workIT Assist", "text": "An AI assistant in every app."},
            {"title": "Real-time collaboration", "text": "Edit together, comment and track changes."},
            {"title": "Saved to Cloudly", "text": "Every change saved automatically and available everywhere."},
        ],
        "data": "your documents, spreadsheets, presentations, notes, form responses and meeting recordings, stored in Cloudly",
        "ai": "workIT Assist uses AI to draft, summarise and analyse content you ask it about. It works on the files you choose, and you review its suggestions before they're added to your work.",
        "docFeatures": [
            {"n": "Create a document in workIT Write", "d": "start a new document from scratch or a template", "s": ["Open workIT and choose Write.", "Select Blank document or pick a template.", "Give it a name — it saves to Cloudly automatically."], "t": "Use heading styles so you get an automatic table of contents.", "sym": "My document won't save", "c": ["You're offline", "Your Cloudly storage is full"], "f": ["Check your connection — changes save when you reconnect.", "Free up Cloudly storage."]},
            {"n": "Formulas in workIT Sheets", "d": "calculate with formulas and functions", "s": ["Select a cell and type =.", "Start typing a function such as SUM, AVERAGE or LOOKUP.", "Select the cells to use and press Enter."], "t": "Ask workIT Assist to write a formula by describing what you want in plain words.", "sym": "A formula shows an error", "c": ["A reference points to an empty or text cell", "Mismatched brackets"], "f": ["Select the cell to see what the error means.", "Check that every bracket is closed.", "Make sure referenced cells contain numbers."]},
            {"n": "Present with workIT Slides", "d": "present a slideshow with speaker notes", "s": ["Open your presentation.", "Select Present > Presenter view.", "Use the arrow keys to move between slides."], "t": "Turn on live captions to make your talk easier to follow.", "sym": "The audience sees my notes", "c": ["Presenter view is on the wrong screen"], "f": ["Select Swap displays in presenter view."]},
            {"n": "Share and collaborate", "d": "share files and work on them together", "s": ["Select Share.", "Enter names or email addresses, or copy a link.", "Choose whether people can view, comment or edit."], "t": "Use suggestion mode in workIT Write so changes can be reviewed before they're accepted.", "sym": "Someone can't open my file", "c": ["The link is set to people in your organisation only", "They have view access but need to edit"], "f": ["Change the link setting.", "Give them edit access."]},
            {"n": "workIT Assist", "d": "use the AI assistant to draft, summarise and analyse", "s": ["Select Assist in any workIT app.", "Describe what you need, for example 'Summarise this report in five bullet points'.", "Review the result and choose Insert or Try again."], "t": "Be specific: mention the audience, length and tone you want.", "sym": "Assist gives an inaccurate answer", "c": ["AI can make mistakes", "The prompt was too vague"], "f": ["Check important facts and figures yourself.", "Give more detail in your request.", "Point Assist at the exact file or section to use."]},
            {"n": "workIT Meet", "d": "host and join video meetings", "s": ["Select Meet > New meeting, or join with a link.", "Check your camera and microphone.", "Share your screen with the Share button."], "t": "Turn on transcripts to get searchable notes after the meeting.", "sym": "Others can't hear me", "c": ["You're muted", "The wrong microphone is selected"], "f": ["Unmute.", "Choose the right microphone in Settings > Audio.", "Allow microphone access in your browser."]},
            {"n": "workIT Forms", "d": "build a survey or quiz and collect responses", "s": ["Choose Forms > New form.", "Add questions.", "Select Send and share the link."], "t": "Link the form to workIT Sheets to analyse responses with charts.", "sym": "I'm not getting responses", "c": ["The form isn't accepting responses", "Sign-in is required"], "f": ["Turn on Accepting responses.", "Turn off sign-in if the form is public."]},
            {"n": "Version history", "d": "see and restore earlier versions of a file", "s": ["Open the file.", "Select File > Version history.", "Choose a version and select Restore."], "t": "Name important versions so they're easy to find later.", "sym": "I deleted content by mistake", "c": ["The change was saved automatically"], "f": ["Open version history and restore the version from before the change."]},
        ],
        "glossary": [("Template", "A ready-made starting point for a document."), ("Formula", "A calculation in a spreadsheet cell."), ("Presenter view", "A screen with notes and a timer while you present."), ("workIT Assist", "The AI assistant built into workIT.")],
        "faq": [("Can I open files from other office apps?", "Yes — workIT opens and saves common document, spreadsheet and presentation formats."), ("Does workIT work offline?", "Yes, on desktop and mobile. Changes sync when you reconnect.")],
    },
    {
        "slug": "edittime", "name": "EditTime", "section": "EditTime", "category": "VIDEO",
        "tagline": "Edit at the speed of the story.",
        "summary": "EditTime is a complete video editor with AI built into every step — from first assembly to final colour, sound and delivery — built for professional film and television productions and creators alike.",
        "palette": ["#ff3d7f", "#7c3aed", "#0d0617"], "motif": "video", "platforms": ["Windows", "macOS", "Lu Book", "Lu Tab"],
        "body": """EditTime is a full post-production studio in one app: edit, colour, sound, effects and delivery on a single timeline, with AI that takes on the repetitive work so editors can focus on the story.

## A timeline built for long-form work
Multi-track editing, multicam, nested sequences, trimming tools and keyboard-driven workflows that hold up across feature-length projects.

## AI that edits with you
- **Scene detection** finds every cut in existing footage.
- **Transcript editing** lets you cut interviews by editing the words.
- **Smart reframe** keeps the subject centred when you change aspect ratio.
- **Auto-captions** in many languages, ready to style.
- **Voice cleanup** removes background noise and room echo.
- **Rough cut assistant** builds a first assembly from your script and selects.

## Colour
Node-based grading, HDR scopes, LUT support and AI shot matching so every angle looks like it belongs.

## Sound
Mixing, effects and loudness meters to match broadcast and streaming delivery specs.

## Effects and titles
Keying, tracking, stabilisation, motion graphics and titles without leaving the timeline.

## Collaboration at production scale
Projects live in Cloudly, so editors, assistants, colourists and producers can work on the same project with locking, comments and review links.

## Proxy and camera workflows
Work smoothly with high-resolution camera formats through automatic proxies, then relink to originals for delivery.

## Deliver anywhere
Export presets for cinema, broadcast, streaming platforms and social — or send straight to BlueBear Stream review.""",
        "features": [
            {"title": "Professional timeline", "text": "Multicam, nested sequences and keyboard-driven editing."},
            {"title": "AI editing tools", "text": "Scene detection, transcript editing, smart reframe and rough cuts."},
            {"title": "Colour & sound", "text": "Node-based grading, HDR scopes and broadcast-ready mixing."},
            {"title": "Effects & titles", "text": "Keying, tracking, stabilisation and motion graphics."},
            {"title": "Team collaboration", "text": "Shared projects in Cloudly with review links."},
            {"title": "Deliver anywhere", "text": "Presets for cinema, broadcast, streaming and social."},
        ],
        "data": "your projects, media, proxies, transcripts and review comments, stored on your computer and in Cloudly",
        "ai": "EditTime's AI features analyse the footage and audio in your project to detect scenes, transcribe speech, reframe shots and clean up sound. They only process media you add to a project.",
        "docFeatures": [
            {"n": "Create a project", "d": "start a project and import media", "s": ["Open EditTime and choose New project.", "Pick the frame size and frame rate.", "Drag your media into the Media panel."], "t": "Match the project frame rate to your camera to avoid stutter.", "sym": "Some clips won't import", "c": ["An unsupported codec", "Files still copying from the card"], "f": ["Wait for copies to finish.", "Use Media > Transcode to convert the clip.", "Update EditTime for new camera formats."]},
            {"n": "Transcript editing", "d": "edit interviews by editing the text", "s": ["Select a clip and choose Transcribe.", "Open the Transcript panel.", "Delete words or rearrange paragraphs — the timeline follows."], "t": "Remove filler words in one step with Clean up > Filler words.", "sym": "The transcript has mistakes", "c": ["Background noise", "The wrong language selected"], "f": ["Choose the correct language and transcribe again.", "Run Voice cleanup first.", "Correct words directly in the transcript."]},
            {"n": "Scene detection", "d": "split existing footage at every cut", "s": ["Select the clip in the Media panel.", "Choose AI > Detect scenes.", "Review the cut points and select Apply."], "t": "Lower the sensitivity for footage with fast camera moves.", "sym": "Scene detection finds too many cuts", "c": ["Flashes or fast motion in the footage"], "f": ["Lower the sensitivity.", "Delete the extra cut points before applying."]},
            {"n": "Auto-captions", "d": "create captions automatically", "s": ["Select your sequence.", "Choose Captions > Generate.", "Pick a language and style, then review the captions."], "t": "Keep captions to two lines and about 40 characters per line for readability.", "sym": "Captions are out of sync", "c": ["The sequence was edited after captions were created"], "f": ["Select Captions > Resync.", "Regenerate captions after picture lock."]},
            {"n": "Colour grading", "d": "correct and grade colour", "s": ["Switch to the Colour workspace.", "Use scopes to balance exposure and white balance.", "Add nodes for creative looks."], "t": "Use AI > Match shots to start from a consistent base across angles.", "sym": "Colours look different after export", "c": ["Mismatched colour space settings"], "f": ["Check the project and export colour space match.", "Use the delivery preset for your platform."]},
            {"n": "Proxy workflows", "d": "edit high-resolution footage smoothly", "s": ["Select clips and choose Create proxies.", "Turn on Use proxies in the viewer.", "EditTime relinks to originals automatically when you export."], "t": "Store proxies on a fast SSD.", "sym": "Playback stutters", "c": ["High-resolution media without proxies", "Too many effects on the timeline"], "f": ["Create proxies.", "Lower playback resolution.", "Render effects in the background."]},
            {"n": "Collaborate on a project", "d": "work on the same project with your team", "s": ["Save the project to Cloudly.", "Choose Share and invite your team.", "Bins and sequences lock while someone is editing them."], "t": "Use review links so producers can leave timecoded comments without installing EditTime.", "sym": "A sequence is locked", "c": ["A teammate has it open"], "f": ["Ask them to close it, or open a read-only copy.", "An admin can release the lock."]},
            {"n": "Export and delivery", "d": "export for any destination", "s": ["Choose Deliver.", "Pick a preset for your destination.", "Select Export and track progress in the queue."], "t": "Check the loudness meter against your platform's spec before exporting.", "sym": "Export fails", "c": ["Not enough disk space", "Offline media in the sequence"], "f": ["Free up disk space.", "Relink offline media.", "Export a smaller range to find the problem clip."]},
        ],
        "glossary": [("Proxy", "A lightweight copy of footage used for smooth editing."), ("Multicam", "Editing several camera angles shot at the same time."), ("LUT", "A lookup table that transforms colour."), ("Picture lock", "The point when the edit is final."), ("Nested sequence", "A sequence placed inside another sequence.")],
        "faq": [("Can EditTime open projects from other editors?", "EditTime imports common interchange formats such as XML and EDL."), ("Does EditTime work offline?", "Yes. Cloudly is only needed for sharing and team projects.")],
    },
    {
        "slug": "raneddie-games", "name": "RanEddie Games", "section": "RanEddie Games", "category": "GAMES",
        "tagline": "More than 50 games. One console made for them.",
        "summary": "RanEddie Games is RanEddie's game studio and publisher — more than 50 games, made to shine on RanEddie Core, its own console.",
        "palette": ["#22c55e", "#0ea5e9", "#05120a"], "motif": "console", "platforms": ["RanEddie Core", "Android", "Lu devices", "Streaming"],
        "body": """RanEddie Games makes games — more than 50 of them, from quick arcade rounds to long adventures — and the console built to play them.

## RanEddie Core
RanEddie Core is the RanEddie Games console: designed around its own controller, fast loading and a library that's ready the moment you sign in with your RanEddie ID.

## The Core Controller
Comfortable grips, responsive triggers, a touch strip and adaptive rumble, with a battery that lasts for days.

## More than 50 games
Action, racing, puzzle, sports, party games and family adventures — including **Snake Brawl** — with new games added regularly.

## Core Pass
One subscription for the full library on day one, online play, cloud saves and member discounts.

## Play together
Online multiplayer, parties with voice chat, and couch co-op with up to four controllers.

## Your progress, everywhere
Cloud saves follow your RanEddie ID, so you can pick up on another Core or stream to Lu devices.

## Families
Family settings for play time, spending limits, age ratings and who kids can play with.""",
        "features": [
            {"title": "RanEddie Core", "text": "A console built for RanEddie games."},
            {"title": "50+ games", "text": "Action, racing, puzzle, sports and family adventures."},
            {"title": "Core Pass", "text": "The full library, online play and cloud saves."},
            {"title": "Core Controller", "text": "Adaptive rumble, touch strip and days of battery."},
            {"title": "Play together", "text": "Online multiplayer, parties and couch co-op."},
            {"title": "Family settings", "text": "Play time, spending and age-rating controls."},
        ],
        "data": "your game saves, achievements, friends list, purchases, Core Pass membership and family settings",
        "ai": "Some RanEddie games use AI-driven opponents that adapt to how you play. Core also uses AI to suggest games you might like based on what you play.",
        "docFeatures": [
            {"n": "Set up RanEddie Core", "d": "connect your console and sign in", "s": ["Connect Core to your TV with HDMI and plug it in.", "Pair the Core Controller by holding the Home button.", "Connect to the internet and sign in with your RanEddie ID."], "t": "Use a wired connection for the fastest downloads.", "sym": "The controller won't pair", "c": ["The battery is empty", "The controller is paired to another console"], "f": ["Charge the controller with the USB-C cable.", "Hold Home and Share together for 5 seconds to enter pairing mode."]},
            {"n": "Core Pass", "d": "join Core Pass for the full game library", "s": ["Open Store > Core Pass on your console.", "Choose a plan.", "Confirm with your RanEddie ID."], "t": "Games in Core Pass can be downloaded and played while your membership is active.", "sym": "A game says I need to buy it", "c": ["The game left Core Pass", "Your membership expired"], "f": ["Check your membership in Settings > Account.", "Buy the game to keep playing, often with a member discount."]},
            {"n": "Cloud saves", "d": "keep your progress safe in the cloud", "s": ["Sign in with your RanEddie ID.", "Turn on Cloud saves in Settings > System.", "Your progress syncs when you close a game."], "t": "Let the console finish syncing before you unplug it.", "sym": "My save didn't sync", "c": ["The console was offline", "There's a conflict between two saves"], "f": ["Connect to the internet and open the game again.", "Choose which save to keep when asked."]},
            {"n": "Play online with friends", "d": "add friends and play together online", "s": ["Open Friends and choose Add friend.", "Search for their RanEddie ID username.", "Invite them to a party or a game."], "t": "Online play needs Core Pass.", "sym": "I can't join my friend's game", "c": ["Different game versions", "Strict network settings"], "f": ["Update the game on both consoles.", "Run Settings > Network > Test connection.", "Restart your router."]},
            {"n": "Family settings", "d": "set limits for younger players", "s": ["Open the RanEddie ID app or Settings > Family on Core.", "Add your child's account to your family.", "Set play time, spending limits, age ratings and who they can play with."], "t": "Children can ask for more time — you'll get a notification to approve it.", "sym": "My child can't play a game", "c": ["The game's age rating is above their limit"], "f": ["Review the request and allow the game if you're happy with it."]},
            {"n": "Storage and downloads", "d": "manage space on your console", "s": ["Open Settings > Storage.", "See how much space each game uses.", "Uninstall games you're not playing — your saves stay in the cloud."], "t": "Add an external drive to store more games.", "sym": "A download is stuck", "c": ["Not enough space", "A weak connection"], "f": ["Free up space.", "Pause and resume the download.", "Restart the console."]},
            {"n": "Achievements", "d": "earn and view achievements", "s": ["Play any RanEddie game.", "Open your profile to see achievements.", "Compare with friends."], "t": "Some achievements are hidden until you unlock them.", "sym": "An achievement didn't unlock", "c": ["You were offline", "A specific condition wasn't met"], "f": ["Connect to the internet and open the game again.", "Check the achievement's requirements."]},
            {"n": "Stream games to Lu devices", "d": "play Core games on a Lu Phone, Lu Tab or Lu Stream", "s": ["Turn on Remote play in Core settings.", "Open RanEddie Games on your Lu device.", "Choose your console and start playing."], "t": "A 5 GHz Wi-Fi network gives the smoothest stream.", "sym": "Streaming is laggy", "c": ["A busy network", "Too far from the router"], "f": ["Move closer to your router.", "Use 5 GHz Wi-Fi or a wired console connection.", "Close other streams on your network."]},
        ],
        "glossary": [("RanEddie Core", "The RanEddie Games console."), ("Core Pass", "A subscription to the RanEddie Games library and online play."), ("Cloud save", "Game progress stored online with your RanEddie ID."), ("Party", "A group of friends chatting and playing together.")],
        "faq": [("Is Snake Brawl a RanEddie game?", "Yes — Snake Brawl is made by RanEddie Games."), ("Can I play without Core Pass?", "Yes. You can buy games individually; online play needs Core Pass.")],
    },
    {
        "slug": "gimbly", "name": "Gimbly", "section": "Gimbly", "category": "CAMERA",
        "tagline": "The camera that flies itself.",
        "summary": "Gimbly is a pocket-size flying camera with a built-in stabiliser and an AI director — it launches from your palm, follows the action, frames every shot and edits the story for you.",
        "palette": ["#a855f7", "#06b6d4", "#0b0717"], "motif": "drone", "platforms": ["Gimbly", "Lu Phone", "EditTime"],
        "body": """Gimbly folds to the size of a phone, opens in your hand and lifts off from your palm. It's a flying camera with a three-axis stabiliser and an AI director that decides where to fly, how to frame the shot and when to roll.

## Launch from your hand
Open Gimbly, hold it flat and it takes off on its own — no controller needed. Hold out your palm to land it.

## An AI director on board
Tell Gimbly what you're doing — running, cycling, a family picnic, a product shot — and it chooses the moves: orbits, reveals, follows and slow pull-backs, keeping the subject perfectly framed.

## Rock-steady footage
A three-axis gimbal and electronic stabilisation keep footage smooth, even in wind or while following fast action.

## Gestures and voice
Wave to start a shot, raise a hand for a photo, or say "Gimbly, follow me".

## Indoor and outdoor
Obstacle sensing on every side lets Gimbly fly indoors and through trees, and slows it down near people.

## Your story, edited
When you land, Gimbly sends its clips to your phone and builds a short edit with music. Open it in EditTime to refine it.

## Safe and responsible
Built-in geofencing respects no-fly zones, propellers are fully guarded, and a privacy mode stops Gimbly from recording people who haven't been added to your shot.""",
        "features": [
            {"title": "Palm launch & landing", "text": "Takes off from your hand — no controller needed."},
            {"title": "AI director", "text": "Chooses the moves and keeps the subject framed."},
            {"title": "3-axis gimbal", "text": "Smooth footage, even in wind."},
            {"title": "Gestures & voice", "text": "Wave, raise a hand or just ask."},
            {"title": "Obstacle sensing", "text": "Flies safely indoors, outdoors and near people."},
            {"title": "Auto-edit", "text": "A finished clip on your phone, ready for EditTime."},
        ],
        "data": "your photos and videos, flight logs and the people you add to your shots",
        "ai": "Gimbly's AI director recognises the subject you choose, plans camera moves and avoids obstacles on the device itself. Face recognition is only used for people you add to your shot, and you can delete them at any time.",
        "docFeatures": [
            {"n": "First flight", "d": "set up Gimbly and fly for the first time", "s": ["Charge Gimbly fully.", "Pair it with the Gimbly app on your phone and sign in with your RanEddie ID.", "Unfold Gimbly, hold it flat on your palm and tap the power button twice."], "t": "Practise your first flights outdoors in an open space with no wind.", "sym": "Gimbly won't take off", "c": ["You're in a no-fly zone", "The battery is too low", "The propeller guards aren't fully open"], "f": ["Check the map in the app for restrictions.", "Charge the battery.", "Unfold the arms until they click."]},
            {"n": "AI director shots", "d": "let the AI choose camera moves for your activity", "s": ["Open the Gimbly app and choose Director.", "Pick an activity or describe it.", "Select yourself or a subject, then start."], "t": "Wear clothing that contrasts with the background to help Gimbly track you.", "sym": "Gimbly loses track of me", "c": ["Low light", "Similar-looking people nearby", "You moved behind an obstacle"], "f": ["Fly in better light.", "Re-select yourself as the subject.", "Use a wider shot mode."]},
            {"n": "Gesture control", "d": "control Gimbly with your hands", "s": ["Turn on Gestures in the app.", "Wave to start or stop recording.", "Raise your palm for a photo; hold out your palm to land."], "t": "Stand 2–5 metres away for gestures to be recognised.", "sym": "Gestures don't work", "c": ["Too far away", "Backlit by the sun"], "f": ["Move closer.", "Turn so the sun is behind Gimbly, not you."]},
            {"n": "Auto-edit", "d": "get a finished edit after you land", "s": ["Land Gimbly.", "Open the app — clips transfer automatically.", "Choose a style and music, then save or share."], "t": "Select Open in EditTime to fine-tune the edit on your computer.", "sym": "Clips won't transfer", "c": ["Bluetooth or Wi-Fi is off on your phone"], "f": ["Turn on Bluetooth and Wi-Fi.", "Keep the phone close to Gimbly.", "Restart the app."]},
            {"n": "Privacy mode", "d": "avoid recording people who aren't in your shot", "s": ["Open Settings > Privacy.", "Turn on Privacy mode.", "Add the people who can appear in your shots."], "t": "People you add are stored on your device and can be removed at any time.", "sym": "Faces are blurred in my video", "c": ["Privacy mode blurs people you haven't added"], "f": ["Add them to your shot list, or turn privacy mode off for that flight."]},
            {"n": "Batteries and charging", "d": "charge and care for Gimbly batteries", "s": ["Charge with the included USB-C cable.", "Check the battery level in the app before every flight.", "Store batteries at about half charge if you won't fly for a while."], "t": "Gimbly returns and lands automatically when the battery is low.", "sym": "Flight time is shorter than usual", "c": ["Cold weather", "Strong wind", "An ageing battery"], "f": ["Keep batteries warm before flying in cold weather.", "Fly in calmer conditions.", "Replace the battery through RanEddie Part."]},
            {"n": "Flying rules", "d": "fly safely and legally", "s": ["Check the local drone rules where you fly.", "Keep Gimbly in sight.", "Respect people's privacy and private property."], "t": "Gimbly's map shows restricted areas, but you're responsible for following local rules.", "sym": "The app says I need to register", "c": ["Some countries require drone registration"], "f": ["Follow the registration link for your country in the app."]},
            {"n": "Firmware updates", "d": "keep Gimbly up to date", "s": ["Connect Gimbly to the app.", "Select Update when one is available.", "Keep Gimbly charging until it finishes."], "t": "Updates improve tracking, safety and battery life.", "sym": "An update failed", "c": ["Low battery", "The phone moved out of range"], "f": ["Charge Gimbly to 50% or more.", "Keep the phone next to Gimbly.", "Try again."]},
        ],
        "glossary": [("Gimbal", "A motorised mount that keeps the camera steady."), ("Geofencing", "Built-in limits that stop Gimbly flying in restricted areas."), ("AI director", "Gimbly's on-board system that plans camera moves.")],
        "faq": [("Do I need a licence to fly Gimbly?", "It depends on your country. Check local rules before flying."), ("Can Gimbly fly indoors?", "Yes — obstacle sensing works indoors, and Gimbly flies more slowly near people.")],
    },
    {
        "slug": "cloudly", "name": "Cloudly", "section": "Cloudly", "category": "CLOUD",
        "tagline": "Your files and your apps, in the RanEddie cloud.",
        "summary": "Cloudly is RanEddie's cloud — storage, sharing and backup for everyone, plus computing, hosting and storage infrastructure for developers and businesses.",
        "palette": ["#38bdf8", "#6366f1", "#06101f"], "motif": "cloud", "platforms": ["Web", "Windows", "macOS", "Lu devices", "Android", "API"],
        "body": """Cloudly is two clouds in one. For people, it's a safe place for files, photos and backups that you can reach from any device. For developers and businesses, it's the infrastructure to run apps and store data at any scale.

## Cloudly Drive
Store any file, organise it in folders, search it instantly and open it on any device. Share with a link and choose who can view or edit.

## Cloudly Photos
Back up photos and videos automatically from your phone, find them by what's in them, and share albums with family.

## Cloudly Backup
Keep a copy of your Lu devices, computers and workIT files, and restore them when you need to.

## Cloudly for Business
Shared drives, admin controls, retention policies and audit logs for teams of every size.

## Cloudly Compute
Virtual servers and containers in regions around the world, with autoscaling and load balancing.

## Cloudly Functions
Run code in response to events without managing servers.

## Cloudly Object Storage
Durable storage for any amount of data, with lifecycle rules and a global content delivery network.

## Built for developers
APIs, a command-line tool and SDKs for popular languages — and baseline for a ready-made backend on top of Cloudly.

## Secure by default
Files are encrypted in transit and at rest, and two-step verification with your RanEddie ID protects your account.""",
        "features": [
            {"title": "Cloudly Drive", "text": "Store, search and share files from any device."},
            {"title": "Cloudly Photos", "text": "Automatic backup and search for your photos."},
            {"title": "Cloudly Backup", "text": "Restore your devices and computers when you need to."},
            {"title": "Compute & Functions", "text": "Servers, containers and event-driven code."},
            {"title": "Object Storage & CDN", "text": "Durable storage delivered worldwide."},
            {"title": "Encrypted", "text": "Encrypted in transit and at rest."},
        ],
        "data": "your files, photos, backups and, for developers, the resources and data you create",
        "ai": "Cloudly Photos uses AI to recognise what's in your photos so you can search for things like 'beach' or 'birthday cake'. You can turn off people recognition at any time.",
        "docFeatures": [
            {"n": "Upload files to Cloudly Drive", "d": "add files and folders to Cloudly Drive", "s": ["Open Cloudly Drive.", "Select Upload, or drag files into the window.", "Organise them into folders."], "t": "Install Cloudly on your computer to sync a folder automatically.", "sym": "An upload is stuck", "c": ["A slow connection", "The file is bigger than your remaining storage"], "f": ["Check your storage in Settings.", "Pause and resume the upload.", "Try a wired or faster connection."]},
            {"n": "Share a file or folder", "d": "share with people or with a link", "s": ["Select the file or folder.", "Choose Share.", "Add people or copy a link, and choose View or Edit."], "t": "Set an expiry date on links you share outside your family or team.", "sym": "People can't open my link", "c": ["The link has expired", "It's restricted to specific people"], "f": ["Create a new link.", "Change who can open it."]},
            {"n": "Back up your photos", "d": "back up photos and videos from your phone", "s": ["Open Cloudly on your phone.", "Turn on Photo backup.", "Choose whether to back up over mobile data."], "t": "Keep backup on Wi-Fi only to save mobile data.", "sym": "Photos aren't backing up", "c": ["Battery saver is on", "Cloudly doesn't have photo access"], "f": ["Turn off battery saver while charging.", "Allow Cloudly access to all photos in your phone settings."]},
            {"n": "Restore deleted files", "d": "get back files you deleted", "s": ["Open Cloudly Drive.", "Go to Recently deleted.", "Select files and choose Restore."], "t": "Deleted files stay in Recently deleted for 30 days.", "sym": "A file isn't in Recently deleted", "c": ["It was deleted more than 30 days ago", "It was deleted by the owner of a shared folder"], "f": ["Check Version history for older copies.", "Ask the folder owner to restore it."]},
            {"n": "Storage plans", "d": "see and change your storage", "s": ["Open Settings > Storage.", "See what's using your space.", "Choose a bigger plan if you need more."], "t": "Large videos and old backups often use the most space.", "sym": "My storage is full", "c": ["Old device backups", "Large videos"], "f": ["Delete backups of devices you no longer use.", "Empty Recently deleted.", "Upgrade your plan."]},
            {"n": "Deploy a server with Cloudly Compute", "d": "create a virtual server", "s": ["Open the Cloudly console and choose Compute > Create.", "Pick a region, size and image.", "Add an SSH key and create the server."], "t": "Pick the region closest to your users for lower latency.", "sym": "I can't connect to my server", "c": ["The firewall blocks the port", "The wrong SSH key"], "f": ["Open the port in the server's firewall rules.", "Check you're using the matching private key."]},
            {"n": "Cloudly Functions", "d": "run code when something happens", "s": ["Choose Functions > Create.", "Pick a runtime and a trigger (HTTP, schedule or storage event).", "Write or upload your code and deploy."], "t": "Keep functions small and fast; use environment variables for configuration.", "sym": "A function times out", "c": ["Slow external calls", "The timeout is too short"], "f": ["Increase the timeout.", "Move long work to a queue.", "Check logs for slow calls."]},
            {"n": "Object storage buckets", "d": "store data for apps in buckets", "s": ["Choose Object Storage > Create bucket.", "Pick a region and access level.", "Upload with the console, CLI or SDK."], "t": "Keep buckets private and share files with signed URLs.", "sym": "Access denied when reading a file", "c": ["The bucket is private", "The access key lacks permission"], "f": ["Use a signed URL.", "Grant the key read access to the bucket."]},
        ],
        "glossary": [("Bucket", "A container for files in Cloudly Object Storage."), ("Region", "A location where Cloudly runs your resources."), ("Sync", "Keeping a folder the same on your computer and in Cloudly."), ("CDN", "A network that delivers files from locations near your users.")],
        "faq": [("Is my data encrypted?", "Yes, in transit and at rest."), ("Can I use Cloudly without a Lu device?", "Yes — Cloudly works on the web, Windows, macOS and Android.")],
    },
    {
        "slug": "raneddie-invest", "name": "RanEddie Invest", "section": "RanEddie Invest", "category": "FINANCE",
        "tagline": "Investing made clear.",
        "summary": "RanEddie Invest is an investing app for buying and selling stocks and ETFs, building a long-term portfolio and following the markets — with clear fees and plain-language explanations.",
        "palette": ["#16a34a", "#0f766e", "#04130c"], "motif": "chart", "platforms": ["Lu Phone", "Android", "Web"],
        "body": """RanEddie Invest is built for people who want to invest without the jargon: open an account in minutes, buy stocks and ETFs, set up regular investing and always see exactly what you pay.

## Stocks and ETFs
Buy and sell shares and exchange-traded funds from major markets, including fractional shares so you can start with a small amount.

## Recurring investments
Invest a fixed amount every week or month automatically.

## Clear fees
Every fee is shown before you confirm an order — no surprises.

## Watchlists and alerts
Follow the companies you care about and get alerts when prices move.

## Learn as you go
Plain-language explanations of every term, chart and order type, right where you need them.

## Security
Sign in with your RanEddie ID and two-step verification; withdrawals only go to accounts in your name.

## Important
Investing involves risk, including the possible loss of the money you invest. Past performance doesn't guarantee future results. RanEddie Invest doesn't provide personal financial advice. Availability depends on your country.""",
        "features": [
            {"title": "Stocks & ETFs", "text": "Including fractional shares from a small amount."},
            {"title": "Recurring investing", "text": "Invest automatically every week or month."},
            {"title": "Clear fees", "text": "See every fee before you confirm."},
            {"title": "Watchlists & alerts", "text": "Follow companies and price moves."},
            {"title": "Learn as you go", "text": "Plain-language explanations everywhere."},
            {"title": "Secure", "text": "RanEddie ID, two-step verification and protected withdrawals."},
        ],
        "data": "your identity verification details, bank accounts, orders, holdings and tax documents",
        "ai": "RanEddie Invest can explain financial terms and summarise company news in plain language. It doesn't tell you what to buy or sell.",
        "docFeatures": [
            {"n": "Open an account", "d": "open a RanEddie Invest account", "s": ["Sign in with your RanEddie ID.", "Verify your identity with a photo ID.", "Answer a few questions about your experience and goals."], "t": "Identity verification is required by law and usually takes a few minutes.", "sym": "Identity verification failed", "c": ["A blurry photo", "Your name doesn't match your ID"], "f": ["Retake the photo in good light.", "Make sure your RanEddie ID name matches your ID.", "Contact support if it fails again."]},
            {"n": "Add money", "d": "deposit money to invest", "s": ["Choose Add money.", "Link a bank account in your name.", "Enter an amount and confirm."], "t": "Deposits from new bank accounts may take a few days to be available.", "sym": "My deposit hasn't arrived", "c": ["Bank transfers take 1–3 business days"], "f": ["Check the expected date on the deposit.", "Contact support if it's later than expected."]},
            {"n": "Buy a stock or ETF", "d": "place an order", "s": ["Search for a company or ETF.", "Choose Buy and enter an amount or number of shares.", "Review fees and confirm."], "t": "Use a limit order to set the highest price you're willing to pay.", "sym": "My order didn't go through", "c": ["The market is closed", "Your limit price wasn't reached"], "f": ["Check the order status — it may run when the market opens.", "Adjust or cancel your limit order."]},
            {"n": "Recurring investments", "d": "invest automatically on a schedule", "s": ["Open a stock or ETF.", "Choose Invest regularly.", "Pick an amount and how often."], "t": "Recurring investments are paused if you don't have enough money in your account.", "sym": "A recurring investment was skipped", "c": ["Not enough cash in the account"], "f": ["Add money or set up an automatic deposit."]},
            {"n": "Watchlists and alerts", "d": "follow companies and get price alerts", "s": ["Open a company page.", "Select Add to watchlist.", "Set an alert for a price or percentage move."], "t": "Alerts are for information only — they don't place orders.", "sym": "I didn't get an alert", "c": ["Notifications are off"], "f": ["Allow notifications for RanEddie Invest in your phone settings."]},
            {"n": "Withdraw money", "d": "move money back to your bank", "s": ["Choose Withdraw.", "Pick your linked bank account.", "Enter an amount and confirm."], "t": "Money from recent sales is available to withdraw once trades settle.", "sym": "I can't withdraw everything", "c": ["Some money is from unsettled trades"], "f": ["Wait for the trade to settle, usually 1–2 business days."]},
            {"n": "Tax documents", "d": "download your tax documents", "s": ["Open Account > Documents.", "Choose the tax year.", "Download or share the document."], "t": "RanEddie Invest can't give tax advice — talk to a tax professional.", "sym": "My tax document isn't available yet", "c": ["Documents are released after the tax year ends"], "f": ["Check back after the date shown in Documents."]},
            {"n": "Understand fees", "d": "see what you pay", "s": ["Open Account > Fees.", "See the fee for each type of order.", "Review fees again on the order screen before confirming."], "t": "Currency conversion fees apply when you buy assets in another currency.", "sym": "A fee looks unexpected", "c": ["A currency conversion", "A regulatory fee on a sale"], "f": ["Open the order to see the full fee breakdown.", "Contact support with the order number."]},
        ],
        "glossary": [("ETF", "An exchange-traded fund: a basket of investments you can buy as one."), ("Fractional share", "Part of a single share."), ("Limit order", "An order that only runs at your price or better."), ("Settlement", "When a trade is completed and money moves.")],
        "faq": [("Is my money safe?", "Investing involves risk and the value of investments can go down as well as up."), ("Does RanEddie Invest give advice?", "No. RanEddie Invest provides information, not personal financial advice.")],
    },
    {
        "slug": "remail", "name": "rEmail", "section": "rEmail", "category": "EMAIL",
        "tagline": "Email that stays out of your way.",
        "summary": "rEmail is RanEddie's email service — a clean inbox with strong spam protection, smart organisation, custom addresses and AI that helps you write and catch up.",
        "palette": ["#f43f5e", "#f59e0b", "#1a0609"], "motif": "mail", "platforms": ["Web", "Lu devices", "Android", "Windows", "macOS"],
        "body": """rEmail gives you an @remail address, or works with your own domain, with an inbox that sorts itself and keeps the noise out.

## A calmer inbox
rEmail sorts incoming mail into Primary, Updates, Promotions and Social, so the messages that matter are first.

## Spam and phishing protection
Suspicious messages are filtered before they reach you, and links and attachments are checked for threats with help from Protector Y.

## Write faster
Smart compose suggests the rest of your sentence, and rEmail Assist can draft a reply or rewrite a paragraph in a different tone. You always review before sending.

## Catch up quickly
Summaries of long threads, a daily digest and snooze to bring a message back when you're ready.

## Your address, your way
Aliases to protect your real address, custom domains for your business, and filters that file mail automatically.

## Schedule and undo
Schedule messages for later, and undo a send for a few seconds after you press it.

## Calendar and contacts
Invitations, a calendar and your contacts, built in and synced to every device.

## Private by design
rEmail doesn't use the content of your email for advertising. Messages are encrypted in transit and at rest.""",
        "features": [
            {"title": "Smart inbox", "text": "Primary, Updates, Promotions and Social sorted for you."},
            {"title": "Spam & phishing protection", "text": "Threats filtered before they reach you."},
            {"title": "rEmail Assist", "text": "Draft replies, rewrite text and summarise threads."},
            {"title": "Aliases & custom domains", "text": "Protect your address or use your own domain."},
            {"title": "Schedule & undo send", "text": "Send later, or take it back."},
            {"title": "Calendar & contacts", "text": "Built in and synced everywhere."},
        ],
        "data": "your email messages, attachments, contacts, calendar events and filters",
        "ai": "rEmail Assist drafts replies and summarises threads when you ask it to. It works on the messages you choose, and rEmail never uses your email content for advertising.",
        "docFeatures": [
            {"n": "Create an rEmail address", "d": "get an @remail address", "s": ["Sign in with your RanEddie ID.", "Choose Create rEmail address.", "Pick an available address."], "t": "Your RanEddie ID email stays the same — rEmail is an extra address.", "sym": "The address I want is taken", "c": ["Someone else already uses it"], "f": ["Try adding a number, a dot or your middle initial."]},
            {"n": "Filters and labels", "d": "sort mail automatically", "s": ["Open Settings > Filters.", "Choose conditions such as sender or subject.", "Choose an action: label, archive, forward or mark as read."], "t": "Create a filter straight from a message with More > Filter messages like this.", "sym": "A filter isn't working", "c": ["The conditions don't match exactly"], "f": ["Test the filter with Search first.", "Use the sender's exact address."]},
            {"n": "Aliases", "d": "use extra addresses that deliver to your inbox", "s": ["Open Settings > Aliases.", "Create an alias.", "Use it when signing up for websites."], "t": "Turn off an alias to stop all mail sent to it.", "sym": "I'm getting spam on an alias", "c": ["The website shared your alias"], "f": ["Turn the alias off.", "Create a new one for that website."]},
            {"n": "Custom domains", "d": "use your own domain with rEmail", "s": ["Open Settings > Domains and add your domain.", "Add the DNS records shown to your domain.", "Create addresses on your domain."], "t": "DNS changes can take a few hours to take effect.", "sym": "My domain won't verify", "c": ["DNS records not added yet", "A typo in a record"], "f": ["Copy the records exactly.", "Wait a few hours and select Verify again."]},
            {"n": "Schedule and undo send", "d": "send later or take a message back", "s": ["Write your message.", "Select the arrow next to Send > Schedule.", "To undo, select Undo right after sending."], "t": "Change the undo window in Settings > General.", "sym": "Undo send didn't appear", "c": ["The undo window passed"], "f": ["Increase the undo window in settings."]},
            {"n": "rEmail Assist", "d": "draft replies and summarise long threads", "s": ["Open a message.", "Select Assist > Draft reply or Summarise.", "Edit the draft before sending."], "t": "Tell Assist the tone you want, like 'friendly and short'.", "sym": "Assist isn't available", "c": ["Assist is turned off", "The message is encrypted end to end"], "f": ["Turn on Assist in Settings.", "Assist can't read end-to-end encrypted messages."]},
            {"n": "Report phishing", "d": "report suspicious email", "s": ["Open the message.", "Select More > Report phishing.", "Delete the message."], "t": "rEmail will never ask for your password by email.", "sym": "A real message went to spam", "c": ["The sender is new or sends lots of mail"], "f": ["Select Not spam.", "Add the sender to your contacts."]},
            {"n": "Use rEmail in another mail app", "d": "connect rEmail to other email apps", "s": ["Open Settings > Other apps.", "Create an app password.", "Use the server settings shown in your mail app."], "t": "App passwords can be revoked at any time.", "sym": "My mail app can't sign in", "c": ["You used your RanEddie ID password instead of an app password"], "f": ["Create an app password and use it in the app."]},
        ],
        "glossary": [("Alias", "An extra address that delivers to your inbox."), ("Phishing", "Fake messages that try to steal information."), ("DNS", "Settings that tell the internet where your domain's mail goes."), ("App password", "A separate password for other email apps.")],
        "faq": [("Does rEmail read my email for ads?", "No. rEmail doesn't use your email content for advertising."), ("Can I import mail from another account?", "Yes, from Settings > Import.")],
    },
    {
        "slug": "baseline", "name": "baseline", "section": "baseline", "category": "DEVELOPERS",
        "tagline": "The backend you'd build, ready today.",
        "summary": "baseline gives developers a complete backend in minutes — a Postgres database, authentication, file storage, realtime, edge functions and instant APIs — running on Cloudly.",
        "palette": ["#14b8a6", "#22c55e", "#04140f"], "motif": "database", "platforms": ["Web dashboard", "CLI", "JavaScript", "Python", "Swift", "Kotlin"],
        "body": """baseline is a backend platform for building web and mobile apps. Every project starts with a full Postgres database and adds everything an app needs around it — so you write your product, not plumbing.

## Postgres database
A dedicated Postgres database with extensions, a table editor, a SQL editor, backups and point-in-time recovery.

## Instant APIs
Every table gets REST and GraphQL APIs automatically, with typed client libraries.

## Authentication
Email, passwords, magic links, social sign-in and **Sign in with RanEddie ID**, with row-level security to control who can read and write each row.

## Storage
Store and serve files, with image transformations and the same security rules as your database.

## Realtime
Listen to database changes, broadcast messages and track who's online.

## Edge functions
Run server-side code close to your users.

## Branching
Create a branch of your project for every pull request, with its own database.

## Built on Cloudly
Choose a region, scale compute as you grow and keep your data where you need it.""",
        "features": [
            {"title": "Postgres database", "text": "Full Postgres with backups and point-in-time recovery."},
            {"title": "Instant APIs", "text": "REST and GraphQL for every table."},
            {"title": "Auth & row-level security", "text": "Including Sign in with RanEddie ID."},
            {"title": "Storage", "text": "Files with image transformations and access rules."},
            {"title": "Realtime & edge functions", "text": "Live updates and server code near your users."},
            {"title": "Branching", "text": "A database per pull request."},
        ],
        "data": "the projects you create and the data your apps store in them",
        "ai": "baseline's SQL assistant can write queries, explain errors and suggest indexes from a plain-language description. Review generated SQL before running it on production data.",
        "docFeatures": [
            {"n": "Create a project", "d": "start a new baseline project", "s": ["Sign in to baseline with your RanEddie ID.", "Choose New project, a name and a region.", "Set a strong database password and create the project."], "t": "Pick the region closest to your users.", "sym": "Project creation is taking a long time", "c": ["Provisioning a dedicated database takes a few minutes"], "f": ["Wait a few minutes and refresh the dashboard."]},
            {"n": "Create tables", "d": "design your database schema", "s": ["Open Table editor > New table.", "Add columns and choose types.", "Turn on row-level security."], "t": "Use migrations from the CLI to keep schema changes in version control.", "sym": "Inserts are blocked", "c": ["Row-level security is on with no policies"], "f": ["Add a policy that allows the operation.", "Test as the user role in the SQL editor."]},
            {"n": "Row-level security", "d": "control access to each row", "s": ["Turn on RLS for the table.", "Create a policy for select, insert, update or delete.", "Use the signed-in user's ID in the policy condition."], "t": "Never expose the service key in client-side code.", "sym": "Users can see each other's data", "c": ["RLS is off", "A policy is too broad"], "f": ["Turn RLS on.", "Narrow the policy to the user's own rows."]},
            {"n": "Authentication", "d": "add sign-in to your app", "s": ["Open Auth > Providers.", "Turn on email, social providers or RanEddie ID.", "Call sign-in from the client library."], "t": "Add your app's URLs to the allowed redirect list.", "sym": "Sign-in redirects fail", "c": ["The redirect URL isn't allowed"], "f": ["Add the exact URL to Auth > URL configuration."]},
            {"n": "Storage buckets", "d": "upload and serve files", "s": ["Open Storage > New bucket.", "Choose public or private.", "Upload from the client library with access policies."], "t": "Use image transformations to serve the right size for each screen.", "sym": "Uploads are denied", "c": ["No storage policy allows the upload"], "f": ["Add an insert policy for the bucket."]},
            {"n": "Realtime", "d": "listen to changes as they happen", "s": ["Turn on realtime for the table.", "Subscribe from the client library.", "Handle insert, update and delete events."], "t": "Realtime respects row-level security, so users only get rows they can read.", "sym": "No events arrive", "c": ["Realtime isn't enabled for the table"], "f": ["Enable realtime in the table settings."]},
            {"n": "Edge functions", "d": "deploy server-side code", "s": ["Install the baseline CLI.", "Run baseline functions new hello.", "Deploy with baseline functions deploy."], "t": "Store secrets with baseline secrets set instead of in code.", "sym": "A function returns 500", "c": ["An unhandled error", "A missing secret"], "f": ["Check the function logs.", "Set the missing secrets."]},
            {"n": "Backups and restore", "d": "recover your database", "s": ["Open Database > Backups.", "Choose a daily backup or a point in time.", "Restore to a new project or the same project."], "t": "Restore to a new project first to check the data.", "sym": "The backup I need isn't listed", "c": ["Your plan's retention period has passed"], "f": ["Check your plan's backup retention."]},
        ],
        "glossary": [("RLS", "Row-level security: rules for who can access each row."), ("Migration", "A versioned change to your database schema."), ("Service key", "A secret key with full access — server-side only."), ("Edge function", "Server code that runs near your users.")],
        "faq": [("Can I use my own Postgres tools?", "Yes — connect with any Postgres client."), ("Can I export my data?", "Yes, with standard Postgres dumps.")],
    },
    {
        "slug": "protector-y", "name": "Protector Y", "section": "Protector Y", "category": "SECURITY",
        "tagline": "Protection for every device you own.",
        "summary": "Protector Y protects computers, phones and tablets from viruses, ransomware, dangerous websites and scams, with a secure VPN and a password manager.",
        "palette": ["#ef4444", "#3b82f6", "#08080f"], "motif": "shield", "platforms": ["Windows", "macOS", "Android", "Lu devices", "Browser extension"],
        "body": """Protector Y keeps your devices and your identity safe without slowing you down. One subscription covers every device in your household.

## Real-time protection
Protector Y scans files and apps as they arrive and as they run, stopping viruses, spyware and ransomware before they do damage.

## Safe browsing
Dangerous and fake websites are blocked before they load, on every browser, with the Protector Y extension.

## Scam and phishing protection
Protector Y warns you about suspicious links in messages and email.

## Ransomware shield
Protected folders can only be changed by apps you trust.

## Secure VPN
Encrypt your connection on public Wi-Fi with one tap.

## Password manager
Strong, unique passwords for every site, filled in automatically and synced across your devices.

## Identity alerts
Get notified if your email address appears in a known data breach, with steps to secure your accounts.

## Light on your device
Scans run when you're not busy, and gaming mode pauses notifications while you play.""",
        "features": [
            {"title": "Real-time protection", "text": "Stops viruses, spyware and ransomware."},
            {"title": "Safe browsing", "text": "Blocks dangerous and fake websites."},
            {"title": "Scam protection", "text": "Warns about suspicious links in messages."},
            {"title": "Secure VPN", "text": "Encrypted browsing on public Wi-Fi."},
            {"title": "Password manager", "text": "Strong passwords, filled in everywhere."},
            {"title": "Identity alerts", "text": "Know when your email appears in a breach."},
        ],
        "data": "information about threats found on your devices, your protected devices list and, if you use it, your encrypted password vault",
        "ai": "Protector Y uses machine-learning models to recognise new threats by how they behave, not just by known signatures. Suspicious files may be checked against Protector Y's cloud service, and you can turn this off.",
        "docFeatures": [
            {"n": "Install Protector Y", "d": "protect a device", "s": ["Download Protector Y for your device.", "Sign in with your RanEddie ID.", "Run the first scan."], "t": "Remove other antivirus software first so they don't conflict.", "sym": "Installation fails", "c": ["Another antivirus is installed", "The device needs a restart"], "f": ["Uninstall other antivirus software.", "Restart and install again."]},
            {"n": "Run a scan", "d": "scan your device for threats", "s": ["Open Protector Y.", "Choose Quick scan or Full scan.", "Review anything Protector Y finds."], "t": "Schedule a full scan weekly when you're not using the device.", "sym": "A scan is very slow", "c": ["Many files or a large external drive"], "f": ["Run a quick scan instead.", "Exclude large backup drives from scheduled scans."]},
            {"n": "Quarantine", "d": "manage threats Protector Y has isolated", "s": ["Open Protection > Quarantine.", "Select an item.", "Choose Delete or Restore."], "t": "Only restore a file if you're sure it's safe.", "sym": "A file I need was quarantined", "c": ["A false positive"], "f": ["Restore the file and add it to exclusions.", "Report it so the detection can be reviewed."]},
            {"n": "Safe browsing extension", "d": "block dangerous websites in your browser", "s": ["Open Protector Y > Web protection.", "Install the browser extension.", "Turn on Safe browsing."], "t": "The extension also checks links in search results.", "sym": "A safe website is blocked", "c": ["The site was flagged in error"], "f": ["Select Report as safe on the block page.", "Allow the site in settings if you trust it."]},
            {"n": "Ransomware shield", "d": "protect important folders", "s": ["Open Protection > Ransomware shield.", "Add the folders to protect.", "Allow trusted apps that need to change them."], "t": "Protect your Documents and Pictures folders at least.", "sym": "An app can't save files", "c": ["It's not on the trusted list"], "f": ["Add the app to trusted apps."]},
            {"n": "Secure VPN", "d": "encrypt your connection", "s": ["Open Protector Y > VPN.", "Select Connect.", "Choose Automatic to connect on public Wi-Fi."], "t": "Pick a nearby location for the best speed.", "sym": "Websites are slow on VPN", "c": ["A distant location"], "f": ["Choose a nearer location.", "Disconnect and reconnect."]},
            {"n": "Password manager", "d": "store and fill passwords", "s": ["Open Protector Y > Passwords and create a vault.", "Import passwords from your browser.", "Use the extension to fill and save passwords."], "t": "Your vault is encrypted with a key only you have — don't forget your vault password.", "sym": "I forgot my vault password", "c": ["The vault can only be opened with your vault password"], "f": ["Use your recovery key if you created one.", "Otherwise reset the vault and start again."]},
            {"n": "Identity alerts", "d": "check if your details appeared in a breach", "s": ["Open Identity.", "Add the email addresses to monitor.", "Follow the steps for any breach found."], "t": "Change the password on any account named in a breach and turn on two-step verification.", "sym": "I got a breach alert", "c": ["A website you use was breached"], "f": ["Change the password for that site.", "Change it anywhere else you reused it.", "Turn on two-step verification."]},
        ],
        "glossary": [("Malware", "Software designed to harm your device or steal data."), ("Ransomware", "Malware that locks files and demands payment."), ("Quarantine", "A safe place where Protector Y isolates threats."), ("VPN", "An encrypted connection that protects your traffic."), ("False positive", "A safe file flagged by mistake.")],
        "faq": [("How many devices can I protect?", "One subscription covers every device in your household."), ("Will Protector Y slow down my computer?", "Scans run when you're not busy, and gaming mode keeps things smooth.")],
    },
]

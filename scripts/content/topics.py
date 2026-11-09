"""
General RanEddie docs (not tied to one product).
Each article: (title, description, [blocks]); a block is (heading, text | [bullets] | ("steps", [...])).
"""

S = lambda *steps: ("steps", list(steps))

TOPICS = {
    # ===================================================================== AI
    "AI at RanEddie": [
        ("How RanEddie uses AI", "Where AI shows up in RanEddie products and what it's for.", [
            ("Overview", "AI helps across RanEddie products with tasks like summarising, drafting, recognising what's in photos, recommending what to watch and detecting threats. It's there to save you time — you stay in control of what it does."),
            ("Where you'll find it", ["workIT Assist and rEmail Assist for writing and summarising", "EditTime for transcripts, captions and scene detection", "Cloudly Photos for search", "Gimbly's AI director", "Protector Y's threat detection", "Recommendations in BlueBear Stream and RanEddie Games"]),
            ("Your controls", "Most AI features can be turned off in each product's settings. See [Turn AI features on or off](/docs/ai-turn-ai-features-on-or-off)."),
        ]),
        ("RanEddie's AI principles", "The commitments behind every AI feature.", [
            ("Helpful", "AI features should solve a real problem and save real time."),
            ("In your control", "You choose when to use AI, and you can review, edit or reject what it produces."),
            ("Private", "AI features only use the content you ask them to work on, and your content isn't used to show you ads."),
            ("Honest", "We label AI-generated content and tell you when AI is involved."),
            ("Safe", "We test AI features for harmful outputs and keep improving them."),
        ]),
        ("Turn AI features on or off", "Control AI features across RanEddie products.", [
            ("In each product", S("Open the product's Settings.", "Find the AI or Assist section.", "Turn individual features on or off.")),
            ("For your whole account", "In your [Account Center](https://id.raneddie.com/account) under Privacy, you can turn off personalised recommendations across RanEddie products."),
            ("Good to know", "Some features, like Protector Y's threat detection, rely on AI to keep you safe. Turning them off reduces protection."),
        ]),
        ("Review AI-generated content", "Why and how to check what AI produces.", [
            ("AI can make mistakes", "AI can sound confident and still be wrong. It can misread a number, invent a detail or miss context."),
            ("What to check", ["Names, dates, figures and quotes", "Anything legal, medical or financial", "Tone — does it sound like you?", "Whether anything important was left out"]),
            ("Tip", "Ask the assistant to point to where it found something, then check the source."),
        ]),
        ("Write better prompts", "Get more useful results from AI assistants.", [
            ("Be specific", "Say what you want, who it's for, how long it should be and the tone."),
            ("Give context", "Point the assistant at the right file, thread or section."),
            ("Iterate", "Ask follow-ups like 'shorter', 'more formal' or 'add a table'."),
            ("Examples", ["Summarise this report in five bullet points for a busy manager.", "Turn these notes into a friendly email to the team.", "Write a formula that totals column C when column B says Paid."]),
        ]),
        ("What data AI features use", "Which information AI features work with.", [
            ("The content you choose", "Assistants work on the document, message, project or photo you ask about."),
            ("Signals for recommendations", "Recommendations use activity inside the product, like what a profile watched or what games you played."),
            ("What AI doesn't do", ["Use your email or documents to show you ads", "Share your content with other customers", "Make decisions about you without a way to review them"]),
        ]),
        ("Is my content used to train AI?", "How your content relates to AI model training.", [
            ("Your private content", "Your private files, messages and projects aren't used to train AI models without your permission."),
            ("Product improvement", "With your permission, anonymised usage information may help improve features. You can change this in Privacy settings."),
            ("Change your choice", S("Open your [Account Center](https://id.raneddie.com/account).", "Go to Privacy.", "Turn Help improve RanEddie AI on or off.")),
        ]),
        ("On-device AI", "AI that runs on your device instead of in the cloud.", [
            ("What it is", "Some AI runs entirely on your device — like Lu OS photo search or Gimbly's flight planning — so your data doesn't need to leave it."),
            ("Benefits", ["Works offline", "Faster responses", "More private"]),
            ("Limits", "Larger tasks, like summarising very long documents, may use RanEddie's cloud instead."),
        ]),
        ("AI and accessibility", "How AI makes RanEddie products easier to use.", [
            ("Examples", ["Live captions in workIT Meet and workIT Slides", "Auto-captions in EditTime", "Image descriptions in Cloudly Photos", "Voice control on Lu devices and Gimbly"]),
            ("Tell us what would help", "Send feedback from any product's Help menu."),
        ]),
        ("AI-generated images and video", "How RanEddie labels and handles generated media.", [
            ("Labels", "Media created or heavily changed with RanEddie AI tools is labelled, and files include information that shows AI was used."),
            ("Use responsibly", ["Don't create misleading content about real people", "Respect copyright and trademarks", "Follow each product's terms"]),
        ]),
        ("Recommendations explained", "Why you see the suggestions you see.", [
            ("How they work", "Recommendations look at what you've watched, played or opened inside a product and suggest similar things."),
            ("Make them better", ["Rate titles you like or don't like", "Remove items from your history", "Use separate profiles for different people"]),
            ("Turn them off", "Turn off personalised recommendations under Privacy in your Account Center."),
        ]),
        ("AI in workIT", "What workIT Assist can do.", [
            ("Write", "Draft documents, rewrite paragraphs and change tone in workIT Write."),
            ("Analyse", "Build formulas, summarise data and suggest charts in workIT Sheets."),
            ("Present", "Turn an outline into slides in workIT Slides."),
            ("Meet", "Recap meetings and list action items in workIT Meet."),
            ("More", "See [workIT Assist](/docs/workit-workit-assist)."),
        ]),
        ("AI in EditTime", "AI tools for editors.", [
            ("Tools", ["Scene detection", "Transcript editing", "Auto-captions", "Smart reframe", "Voice cleanup", "Shot matching", "Rough cut assistant"]),
            ("Stay in control", "Every AI change appears on the timeline where you can adjust or undo it."),
        ]),
        ("AI in rEmail", "Writing help and summaries in your inbox.", [
            ("Features", ["Smart compose", "Draft a reply", "Rewrite in a different tone", "Summarise long threads"]),
            ("Privacy", "rEmail doesn't use your email content for advertising."),
        ]),
        ("AI in Protector Y", "How AI helps detect new threats.", [
            ("Behaviour detection", "Protector Y watches how apps behave so it can stop threats it has never seen before."),
            ("Cloud checks", "Unknown files can be checked against Protector Y's cloud service. You can turn this off in settings, which reduces protection."),
        ]),
        ("AI in Cloudly Photos", "Search your photos by what's in them.", [
            ("Search", "Search for things like 'dog', 'beach' or 'receipt'."),
            ("People", "Group photos by face to find everyone quickly. People recognition can be turned off."),
            ("Memories", "Get collections of photos from trips and events."),
        ]),
        ("Gimbly's AI director", "How Gimbly plans its shots.", [
            ("Subject tracking", "Gimbly follows the subject you select and predicts where they're going."),
            ("Shot planning", "It chooses camera moves for the activity you pick."),
            ("Safety", "Obstacle sensing and geofencing run on the device during every flight."),
        ]),
        ("AI opponents in RanEddie games", "How game AI adapts to you.", [
            ("Adaptive bots", "In games like Snake Brawl, computer players get smarter and stronger as your trophy count rises."),
            ("Fair play", "AI opponents don't see hidden information you can't see."),
        ]),
        ("Report a problem with an AI feature", "Tell us when AI gets it wrong.", [
            ("How to report", S("Select the thumbs-down or Report option next to the AI result.", "Tell us what went wrong.", "Submit — your report goes to the product team.")),
            ("What helps", "Include what you asked for and what you expected."),
        ]),
        ("Harmful or offensive AI output", "What to do if AI produces something inappropriate.", [
            ("Report it", "Use the Report option next to the result. We review reports and improve our safety systems."),
            ("Our safeguards", "RanEddie AI features include filters designed to block harmful content, but no system is perfect."),
        ]),
        ("AI and copyright", "Using AI-assisted content responsibly.", [
            ("Your content", "Content you create with RanEddie AI tools belongs to you, subject to each product's terms."),
            ("Others' content", "Don't ask AI tools to copy protected work. You're responsible for how you use what you create."),
        ]),
        ("AI for teams and businesses", "Controls for administrators.", [
            ("Admin controls", ["Turn AI features on or off for your organisation", "Limit features to specific groups", "Review usage reports"]),
            ("Data handling", "Business content isn't used to train AI models."),
        ]),
        ("AI for kids and teens", "How AI features work for younger users.", [
            ("Age-appropriate defaults", "Some AI features are limited or off for users under 18."),
            ("Family controls", "Parents can manage AI features from Family settings. See [Family settings](/docs/families-family-settings-overview)."),
        ]),
        ("Voice assistants on Lu", "Using your voice with Lu devices.", [
            ("What you can do", ["Set timers and reminders", "Control music on Lu Home", "Send messages", "Control smart-home devices"]),
            ("Privacy", "Lu devices listen for the wake phrase on the device. You can review and delete voice history in Settings."),
        ]),
        ("Delete your AI activity", "Remove the history of what you asked AI assistants.", [
            ("Steps", S("Open your [Account Center](https://id.raneddie.com/account).", "Go to Privacy > AI activity.", "Delete individual items or everything.")),
            ("Auto-delete", "Choose to delete AI activity automatically after 3, 18 or 36 months."),
        ]),
        ("AI summaries: how accurate are they?", "Understanding summary limits.", [
            ("What summaries do well", "Capture the main points of long documents and threads."),
            ("What they can miss", ["Exceptions and caveats", "Numbers in tables", "Tone and nuance"]),
            ("Tip", "Use summaries to decide what to read in full — not instead of reading what matters."),
        ]),
        ("Languages supported by RanEddie AI", "Which languages AI features work in.", [
            ("Overview", "AI features support many languages and we add more regularly. Captions and transcripts in EditTime and workIT Meet support the widest range."),
            ("Mixed-language content", "Results are best when a document or recording is mostly in one language."),
        ]),
        ("AI usage limits", "Why AI features sometimes say you've reached a limit.", [
            ("Fair use", "To keep AI features fast for everyone, some have daily limits that depend on your plan."),
            ("What to do", ["Wait until the limit resets", "Check your plan for higher limits"]),
        ]),
        ("AI features when you're offline", "What works without a connection.", [
            ("Works offline", ["On-device photo search on Lu", "Gimbly flight and tracking", "Protector Y behaviour detection"]),
            ("Needs a connection", ["workIT Assist and rEmail Assist", "EditTime transcription in the cloud", "Recommendations"]),
        ]),
        ("Transparency about AI", "How we tell you when AI is involved.", [
            ("Labels", "AI-generated text, images and summaries are marked in RanEddie products."),
            ("Explanations", "Many AI features show a short note about how the result was produced."),
        ]),
        ("Customising AI tone and style", "Make AI writing sound like you.", [
            ("In the prompt", "Ask for a tone: friendly, formal, short, persuasive."),
            ("Writing style", "In workIT Assist and rEmail Assist settings, add a short note about how you like to write."),
        ]),
        ("AI and sensitive topics", "How AI handles health, legal and financial questions.", [
            ("General information only", "AI can explain concepts but isn't a substitute for a doctor, lawyer or financial adviser."),
            ("RanEddie Invest", "RanEddie Invest's AI explains terms and news but doesn't recommend what to buy or sell."),
        ]),
        ("Accessibility of AI features", "Using AI features with assistive technology.", [
            ("Screen readers", "AI panels in RanEddie apps work with screen readers and keyboard navigation."),
            ("Voice input", "Dictate prompts on any device that supports voice typing."),
        ]),
        ("Glossary of AI terms", "Plain explanations of common AI words.", [
            ("Terms", ["**Model** — the system that produces AI results", "**Prompt** — what you ask the AI", "**Summary** — a short version of longer content", "**On-device** — AI that runs on your device", "**Hallucination** — when AI states something that isn't true"]),
        ]),
    ],
    # ===================================================================== SIGN-IN
    "Sign-in & RanEddie ID": [
        ("What is a RanEddie ID?", "One account for every RanEddie product.", [
            ("One account", "Your RanEddie ID signs you in to Fizz, Snake Brawl, BlueBear Stream, Lu devices, workIT, Cloudly, rEmail and every other RanEddie product."),
            ("What it holds", ["Your name, username and photo", "Your email and password", "Security settings", "Connected products and devices"]),
            ("Get one", "[Create a RanEddie ID](/docs/raneddie-id-create-account)."),
        ]),
        ("Change your password", "Update the password for your RanEddie ID.", [
            ("Steps", S("Open your [Account Center](https://id.raneddie.com/account).", "Go to Security.", "Enter your current password and a new one of at least 15 characters.")),
            ("What happens next", "You're signed out on your other devices for safety."),
        ]),
        ("Choose a strong password", "Make your password hard to guess and easy to remember.", [
            ("Use a passphrase", "Four or more random words, like 'river lamp purple tiger', are strong and memorable."),
            ("Avoid", ["Names, birthdays and pet names", "Passwords you use anywhere else", "Simple patterns like 123456 or qwerty"]),
            ("Use a password manager", "Protector Y's password manager can create and remember passwords for you."),
        ]),
        ("Change your email address", "Update the email you use to sign in.", [
            ("Steps", S("Open Personal information in your Account Center.", "Add your new email address.", "Enter the code we send to it.", "Make it your primary email.")),
            ("Tip", "Keep your old address until you've confirmed the new one works."),
        ]),
        ("Change your username", "Update how other players and users see you.", [
            ("Steps", S("Open Personal information in your Account Center.", "Edit your username.", "Save.")),
            ("Rules", "Usernames are 4–20 characters: letters, numbers, _ and -, starting with a letter."),
        ]),
        ("Change your profile photo", "Add or change your RanEddie ID photo.", [
            ("Steps", S("Open Personal information in your Account Center.", "Select your photo.", "Upload a new image.")),
            ("Good to know", "Your photo is visible in RanEddie products where your username appears."),
        ]),
        ("Sign out of RanEddie products", "Sign out on one device or everywhere.", [
            ("On this device", "Choose Sign out from the product's account menu."),
            ("Everywhere", S("Open Security in your Account Center.", "Find Active sessions.", "Revoke the sessions you want to end.")),
        ]),
        ("Sign in on a TV or console", "Use a code to sign in on devices without a keyboard.", [
            ("Steps", S("Choose Sign in on the TV or console.", "Note the code shown.", "Go to id.raneddie.com on your phone and enter the code.")),
            ("Tip", "Some devices show a QR code — scan it with your phone camera."),
        ]),
        ("Why was I asked for a code?", "When RanEddie ID asks for a verification code.", [
            ("New device", "We email a 6-digit code when you sign in on a device we haven't seen before."),
            ("Sensitive changes", "Changing your email or password may ask you to confirm it's you."),
            ("Didn't try to sign in?", "Change your password right away and review your active sessions."),
        ]),
        ("I'm not getting verification emails", "Fix missing sign-in codes.", [
            ("Check", ["Your spam or junk folder", "That you typed your email correctly", "That your inbox isn't full"]),
            ("Try", S("Wait a minute.", "Select Send a new code.", "Add our address to your contacts.")),
        ]),
        ("Account locked after too many attempts", "What to do when sign-in is temporarily blocked.", [
            ("Why", "After 10 wrong attempts, sign-in is paused for an hour to protect your account."),
            ("What to do", ["Wait an hour and try again", "[Reset your password](/docs/raneddie-id-reset-password) if you've forgotten it"]),
        ]),
        ("Recover an account you can't access", "Get back into your RanEddie ID.", [
            ("Forgot password", "[Reset it](/docs/raneddie-id-reset-password) with a code sent to your email."),
            ("Lost access to your email", "Contact support with as much detail as you can about the account. We'll verify you're the owner."),
            ("Lost your authenticator app", "Use a backup code, or contact support."),
        ]),
        ("Two-step verification explained", "Add a second check when you sign in.", [
            ("What it is", "After your password, you enter a code from an authenticator app. Even if someone learns your password, they can't sign in."),
            ("Turn it on", "See [Security and devices](/docs/raneddie-id-security)."),
        ]),
        ("Set up an authenticator app", "Use an app to generate sign-in codes.", [
            ("Steps", S("Open Security in your Account Center.", "Select Set up next to Authenticator app.", "Scan the QR code with your authenticator app.", "Enter the 6-digit code to confirm.")),
            ("Tip", "Save the secret key somewhere safe in case you change phones."),
        ]),
        ("Passkeys", "Sign in with your fingerprint, face or device PIN.", [
            ("What they are", "Passkeys replace passwords with a key stored securely on your device."),
            ("Why use them", ["They can't be phished", "Nothing to remember", "Faster sign-in"]),
        ]),
        ("Manage connected products", "See which games and apps use your RanEddie ID.", [
            ("Steps", S("Open Connected products in your Account Center.", "See each product and when it was connected.", "Select Disconnect to sign it out everywhere.")),
        ]),
        ("Sign in with RanEddie ID on other websites", "Use your RanEddie ID with apps built on baseline.", [
            ("How it works", "Apps that offer Sign in with RanEddie ID send you to id.raneddie.com. You approve, and you're sent back signed in."),
            ("What they get", "Only the details shown on the approval screen."),
            ("Revoke access", "Disconnect the app in Connected products."),
        ]),
        ("Update your date of birth or country", "Change the details you gave at sign-up.", [
            ("Why it matters", "Your age and country decide which features and content are available to you."),
            ("How", "Contact support to correct your date of birth. You may be asked to verify it."),
        ]),
        ("Minimum age for a RanEddie ID", "Who can create an account.", [
            ("The rule", "You must be at least 13 years old to create a RanEddie ID."),
            ("Younger children", "Younger children can use some products through a parent's family settings."),
        ]),
        ("Delete your RanEddie ID", "Permanently close your account.", [
            ("Before you delete", ["Download anything you want to keep", "Cancel subscriptions", "Use up any balances or credits"]),
            ("Steps", S("Open Privacy in your Account Center.", "Select Delete my account.", "Confirm.")),
            ("This can't be undone", "Your data in every RanEddie product is deleted."),
        ]),
        ("Use RanEddie ID on a shared computer", "Stay safe on computers other people use.", [
            ("Tips", ["Use a private window", "Don't save your password in the browser", "Sign out when you're done", "Revoke the session from another device if you forgot"]),
        ]),
        ("Why does the sign-in page keep loading?", "Fix a stuck sign-in screen.", [
            ("Check the address", "RanEddie ID only works at **id.raneddie.com**."),
            ("Try", ["Turn off content blockers for the page", "Allow third-party cookies for raneddie.com", "Update your browser", "Try another browser"]),
        ]),
        ("Supported browsers", "Browsers that work with RanEddie ID.", [
            ("Supported", ["Current versions of popular browsers on Windows, macOS, Android and Lu", "Fizz Browser"]),
            ("Tip", "Keep your browser updated for the best security."),
        ]),
        ("Sign in with a different account", "Switch between RanEddie IDs.", [
            ("Steps", S("Sign out from the account menu.", "Choose Sign in.", "Enter the other account's email.")),
        ]),
        ("Merge two RanEddie IDs", "Can two accounts be combined?", [
            ("Not possible", "RanEddie IDs can't be merged. Choose the account you want to keep and move what you can — for example, download files from Cloudly and upload them again."),
        ]),
        ("Security check during sign-up", "Why we ask you to confirm you're a person.", [
            ("Why", "The check stops automated sign-ups and protects everyone."),
            ("If it fails", ["Turn off ad or content blockers", "Refresh and try again", "Try another browser"]),
        ]),
        ("Email already in use", "What it means when sign-up says your email is taken.", [
            ("Meaning", "There's already a RanEddie ID with that email — probably yours."),
            ("What to do", ["Sign in instead", "[Reset your password](/docs/raneddie-id-reset-password) if you've forgotten it"]),
        ]),
        ("Password rejected as leaked", "Why some passwords aren't allowed.", [
            ("Why", "We check new passwords against lists of passwords exposed in data breaches elsewhere. Those passwords are easy for attackers to guess."),
            ("What to do", "Choose a different, unique password."),
        ]),
        ("Review recent sign-ins", "See where your account was used.", [
            ("Steps", S("Open Security in your Account Center.", "Review Active sessions with device, browser and location.", "Revoke anything you don't recognise.")),
        ]),
        ("Account Center tour", "Everything you can do in your Account Center.", [
            ("Sections", ["**Overview** — your account at a glance", "**Personal information** — name, username, photo, email", "**Security** — password, authenticator, sessions", "**Connected products** — games and apps", "**Payments & plans** — subscriptions", "**Privacy** — your data and account", "**Preferences** — appearance and language"]),
        ]),
        ("Language and region settings", "Change the language RanEddie products use.", [
            ("Steps", S("Open Preferences in your Account Center.", "Choose your language.", "Products update the next time you open them.")),
        ]),
        ("Use your RanEddie ID with Lu devices", "Sign in once on your Lu devices.", [
            ("What it does", "Your RanEddie ID connects Lu Link, Cloudly Backup, Find My Lu and purchases."),
            ("Set up", "Sign in during setup or in Settings > RanEddie ID."),
        ]),
        ("Business and school accounts", "RanEddie ID for organisations.", [
            ("Managed accounts", "Organisations can create and manage RanEddie IDs for members, with single sign-on and admin controls."),
            ("Who to ask", "If your account is managed, your administrator handles password resets and access."),
        ]),
        ("Contact RanEddie ID support", "Get help with your account.", [
            ("Email", "Write to [contact@raneddie.com](mailto:contact@raneddie.com) from the email on your account."),
            ("Include", ["Your username", "What you were trying to do", "Any error messages"]),
            ("Never share", "Your password or verification codes — support will never ask for them."),
        ]),
    ],
    # ===================================================================== PRIVACY
    "Privacy": [
        ("RanEddie's privacy commitments", "How we think about your personal information.", [
            ("Our commitments", ["We collect what we need to run our products", "We don't sell your personal information", "We don't use the content of your email, documents or files for ads", "You can see, download and delete your data", "We protect your data with strong security"]),
        ]),
        ("What information RanEddie collects", "The types of data RanEddie products use.", [
            ("Information you give us", ["Account details like name, email and date of birth", "Content you create and upload", "Payment details"]),
            ("Information from using products", ["Device and app information", "Activity inside products, like what you watched or played", "Diagnostics and crash reports"]),
            ("Product-specific details", "Each product's privacy page explains what it stores."),
        ]),
        ("How RanEddie uses your information", "Why we use the data we collect.", [
            ("To run products", "Sign you in, store your files, sync progress and deliver what you ask for."),
            ("To keep you safe", "Detect fraud, spam, malware and account takeovers."),
            ("To improve", "Fix bugs and improve features, using aggregated information where possible."),
            ("To personalise", "Recommendations — which you can turn off."),
        ]),
        ("Download your data", "Get a copy of your information.", [
            ("Steps", S("Open Privacy in your [Account Center](https://id.raneddie.com/account).", "Select Download your data.", "Choose products and a format.", "We'll email you when the download is ready.")),
            ("Good to know", "Large exports can take a few days. Download links expire after 7 days."),
        ]),
        ("Delete your data", "Remove information from RanEddie products.", [
            ("Delete specific items", "Most products let you delete individual items — files, history, messages."),
            ("Delete activity", "Clear watch history, AI activity and search history in Privacy."),
            ("Delete everything", "[Delete your RanEddie ID](/docs/sign-in-delete-your-raneddie-id)."),
        ]),
        ("Personalised recommendations", "Control personalisation across RanEddie.", [
            ("Turn off", S("Open Privacy in your Account Center.", "Turn off Personalised recommendations.")),
            ("What changes", "You'll still see suggestions, but they won't be based on your activity."),
        ]),
        ("Advertising and RanEddie", "How ads work in RanEddie products.", [
            ("Where ads appear", "Some free products may show ads. Paid plans are ad-free where offered."),
            ("What's never used", "The content of your emails, documents, files and photos is never used for ads."),
            ("Your choices", "Turn off ad personalisation in Privacy."),
        ]),
        ("Cookies on RanEddie websites", "How raneddie.com and our services use cookies.", [
            ("Essential cookies", "Keep you signed in and keep your account secure."),
            ("Preferences", "Remember settings such as dark mode."),
            ("Manage", "Use your browser settings to block or delete cookies. Blocking essential cookies stops sign-in from working."),
        ]),
        ("Location information", "When RanEddie products use your location.", [
            ("Examples", ["Find My Lu", "Gimbly no-fly zones", "SkyPear nearest restaurants and delivery", "Weather on Lu Watch"]),
            ("Control it", "Allow or deny location access in your device settings for each app."),
        ]),
        ("Privacy for children and teens", "How we protect younger users.", [
            ("Under 13", "Children under 13 can't create a RanEddie ID. Products like Snake Brawl limit features for younger players, like generated nicknames and no real-money purchases."),
            ("Teens", "Teens get stricter privacy defaults."),
            ("Parents", "Use [Family settings](/docs/families-family-settings-overview)."),
        ]),
        ("Who can see your profile", "What other people see about you.", [
            ("Visible to others", "Your username and photo, in products where you interact with others."),
            ("Private", "Your email, date of birth, country and security settings."),
        ]),
        ("Sharing and permissions", "Control what you share with others.", [
            ("Files and albums", "Choose View or Edit and who has the link in Cloudly and workIT."),
            ("Review regularly", "Open Shared with others in Cloudly to see everything you've shared."),
        ]),
        ("Privacy in BlueBear Stream", "What BlueBear Stream stores.", [
            ("Stored", ["Profiles", "Watch history", "Ratings", "Downloads"]),
            ("Control", "Delete history per profile and turn off recommendations."),
        ]),
        ("Privacy on Lu devices", "How Lu protects your information.", [
            ("On-device", "Many features, like photo search and wake-phrase detection, run on the device."),
            ("App permissions", "Choose which apps can use your camera, microphone, location and photos."),
            ("Health data", "Health data is encrypted and only shared with apps you allow."),
        ]),
        ("Privacy in Snake Brawl", "Snake Brawl's approach to privacy.", [
            ("On your phone", "Progress, coins and settings are stored on your phone."),
            ("No ads or analytics", "Snake Brawl doesn't show ads or include analytics."),
            ("RanEddie ID", "If you connect your RanEddie ID, your save is backed up to the cloud."),
        ]),
        ("Privacy in rEmail", "How rEmail protects your mail.", [
            ("Not for ads", "rEmail doesn't use your email content for advertising."),
            ("Encryption", "Messages are encrypted in transit and at rest."),
            ("Spam filtering", "Automated systems scan for spam and threats to protect you."),
        ]),
        ("Privacy in Cloudly", "Your files stay yours.", [
            ("Ownership", "You own what you store in Cloudly."),
            ("Encryption", "Files are encrypted in transit and at rest."),
            ("Access", "Only you and the people you share with can open your files."),
        ]),
        ("Privacy with Gimbly", "Flying responsibly around other people.", [
            ("Privacy mode", "Blurs people who aren't added to your shot."),
            ("Respect others", ["Don't fly over private property without permission", "Don't record people without their consent", "Follow local laws"]),
        ]),
        ("Privacy at SkyPear", "What the SkyPear app stores.", [
            ("Stored", ["Orders", "Addresses", "Favourite restaurants", "Pear Points"]),
            ("Delete", "Clear order history and saved addresses in the app."),
        ]),
        ("Privacy in RanEddie Invest", "How financial information is handled.", [
            ("Required by law", "Identity verification and transaction records are required by financial regulations and are kept for the period the law requires."),
            ("Security", "Strong encryption and two-step verification protect your account."),
        ]),
        ("Privacy in Protector Y", "What Protector Y needs to protect you.", [
            ("Threat information", "Details about detected threats help protect everyone."),
            ("Your vault", "Your password vault is encrypted with a key only you have."),
        ]),
        ("Privacy in workIT", "Your documents stay private.", [
            ("Not for ads", "workIT content is never used for advertising."),
            ("Business accounts", "Organisations control retention and access for their members."),
        ]),
        ("Privacy in EditTime", "How EditTime handles your media.", [
            ("Local and cloud", "Projects can live on your computer or in Cloudly."),
            ("AI processing", "AI features only process media in your project."),
        ]),
        ("Privacy for baseline developers", "Responsibilities when you build on baseline.", [
            ("Your users' data", "You control the data your app stores in baseline and are responsible for your own privacy policy."),
            ("Our role", "baseline processes data on your behalf and keeps it secure."),
        ]),
        ("How long RanEddie keeps data", "Data retention explained.", [
            ("While you use it", "We keep your content while your account is active."),
            ("After deletion", "Deleted content is removed from active systems promptly and from backups within a limited period."),
            ("Legal requirements", "Some records, like financial transactions, are kept as the law requires."),
        ]),
        ("Data transfers between countries", "Where your data may be processed.", [
            ("Global services", "RanEddie products may process data in several countries, with safeguards to protect it."),
            ("Choose a region", "Cloudly and baseline customers can choose where their data is stored."),
        ]),
        ("Your privacy rights", "Rights you may have over your data.", [
            ("Depending on where you live", ["Access your data", "Correct it", "Delete it", "Download it", "Object to certain uses"]),
            ("How", "Most rights can be used in your Account Center. Contact us for anything else."),
        ]),
        ("Make a privacy request", "Contact us about your personal data.", [
            ("How", "Email [contact@raneddie.com](mailto:contact@raneddie.com) from the address on your account with 'Privacy request' in the subject."),
            ("Verification", "We may ask you to confirm your identity."),
        ]),
        ("Microphone and camera access", "Control which apps can use them.", [
            ("On Lu devices", "Settings > Privacy > Camera / Microphone."),
            ("In browsers", "Allow or block from the address bar."),
            ("Indicators", "Lu devices show a dot when the camera or microphone is in use."),
        ]),
        ("Diagnostics and crash reports", "Help us fix problems — your choice.", [
            ("What they include", "Technical details about errors, not your content."),
            ("Turn off", "Settings > Privacy > Diagnostics in each product."),
        ]),
        ("Third-party apps and your data", "Apps that connect to your RanEddie ID.", [
            ("Approval", "Apps only get the details you approve."),
            ("Review", "Disconnect apps from Connected products in your Account Center."),
        ]),
        ("Public Wi-Fi and privacy", "Stay private on networks you don't control.", [
            ("Tips", ["Use Protector Y's VPN", "Look for the padlock in your browser", "Avoid sensitive tasks on unknown networks"]),
        ]),
        ("Private browsing", "What private windows do and don't do.", [
            ("They do", "Stop your device from saving history and cookies after you close the window."),
            ("They don't", "Hide your activity from websites, your network or your internet provider."),
        ]),
        ("Privacy glossary", "Plain explanations of privacy terms.", [
            ("Terms", ["**Personal information** — information about you", "**Encryption** — scrambling data so only the right people can read it", "**Retention** — how long data is kept", "**Consent** — your permission", "**Anonymised** — data that can't identify you"]),
        ]),
        ("Privacy policy", "Where to find the full policy.", [
            ("Read it", "The full RanEddie ID privacy policy is at [id.raneddie.com/privacy](https://id.raneddie.com/privacy)."),
            ("Changes", "We'll tell you about important changes before they take effect."),
        ]),
    ],
    # ===================================================================== SECURITY
    "Security": [
        ("Security checklist", "Ten minutes to a safer account.", [
            ("Do these today", ["Use a unique password of at least 15 characters", "Turn on two-step verification", "Review active sessions", "Check your recovery email", "Install updates on your devices", "Install Protector Y"]),
        ]),
        ("Recognise phishing", "Spot fake messages that try to steal your account.", [
            ("Warning signs", ["Urgent threats like 'your account will be closed'", "Links to addresses that aren't raneddie.com", "Requests for passwords or codes", "Unexpected attachments"]),
            ("Remember", "RanEddie will never ask for your password or a verification code."),
        ]),
        ("I clicked a suspicious link", "What to do next.", [
            ("Act quickly", S("Don't enter any details on the page.", "Change your RanEddie ID password if you entered it.", "Revoke unknown sessions.", "Run a Protector Y scan.")),
        ]),
        ("My account was hacked", "Secure your RanEddie ID.", [
            ("Steps", S("Reset your password.", "Revoke all sessions in Security.", "Turn on two-step verification.", "Check your email, connected products and payment methods.", "Contact support if you can't get in.")),
        ]),
        ("Unknown sign-in alert", "You got an email about a sign-in you don't recognise.", [
            ("If it was you", "No action needed."),
            ("If it wasn't", "Change your password and revoke the session immediately."),
        ]),
        ("Keep your devices updated", "Why updates matter.", [
            ("Updates fix security holes", "Attackers target known weaknesses in out-of-date software."),
            ("Turn on automatic updates", "On Lu devices, RanEddie Core, Gimbly and Protector Y."),
        ]),
        ("Protect your phone", "Basic security for your phone.", [
            ("Steps", ["Use a screen lock", "Turn on Find My Lu", "Only install apps from trusted stores", "Review app permissions", "Back up to Cloudly"]),
        ]),
        ("Protect your computer", "Basic security for your computer.", [
            ("Steps", ["Install Protector Y", "Keep the operating system updated", "Use a standard (non-admin) account day to day", "Back up important files"]),
        ]),
        ("Lost or stolen device", "What to do right away.", [
            ("Steps", S("Use Find My Lu to locate or lock it.", "Revoke its session in your Account Center.", "Change your password.", "Report a stolen phone to your carrier.")),
        ]),
        ("Ransomware: what to know", "How ransomware works and how to stay safe.", [
            ("What it is", "Malware that locks your files and demands payment."),
            ("Prevention", ["Turn on Protector Y's ransomware shield", "Keep backups in Cloudly", "Don't open unexpected attachments"]),
        ]),
        ("Scam calls and messages", "People pretending to be RanEddie.", [
            ("We will never", ["Call asking for your password", "Ask for gift cards", "Ask you to install remote-access software"]),
            ("Report it", "Forward suspicious emails to contact@raneddie.com."),
        ]),
        ("Secure your home Wi-Fi", "Protect your network.", [
            ("Steps", ["Change the router's default password", "Use WPA3 or WPA2 encryption", "Update router firmware", "Use a guest network for visitors"]),
        ]),
        ("Backup codes", "A way in if you lose your authenticator.", [
            ("Save them", "Store backup codes somewhere safe and offline."),
            ("Each code works once", "Generate new ones when you run low."),
        ]),
        ("Security for teams", "Admin tools for organisations.", [
            ("Recommended", ["Require two-step verification", "Use single sign-on", "Review admin roles", "Set sharing limits in Cloudly"]),
        ]),
        ("Report a security vulnerability", "Found a security issue in a RanEddie product?", [
            ("How", "Email [contact@raneddie.com](mailto:contact@raneddie.com) with 'Security' in the subject and enough detail to reproduce the issue."),
            ("Please", "Don't access other people's data or disrupt services while testing."),
        ]),
        ("Encryption at RanEddie", "How we protect data in transit and at rest.", [
            ("In transit", "Connections to RanEddie services use modern TLS encryption."),
            ("At rest", "Stored data in Cloudly, rEmail and workIT is encrypted."),
        ]),
        ("Safe online shopping", "Shop safely in the BlueBear Shop, RanEddie Part and beyond.", [
            ("Tips", ["Check the address is correct", "Use a credit card or trusted payment method", "Be wary of deals that look too good"]),
        ]),
        ("Gaming account security", "Keep your RanEddie Games account safe.", [
            ("Tips", ["Never share your password with friends", "Ignore offers of free coins or items", "Turn on two-step verification"]),
        ]),
        ("Securing a baseline project", "Security best practices for developers.", [
            ("Checklist", ["Turn on row-level security for every table", "Never expose the service key", "Restrict auth redirect URLs", "Rotate keys if they leak"]),
        ]),
        ("Securing Cloudly resources", "Protect servers and storage.", [
            ("Checklist", ["Keep buckets private", "Use least-privilege access keys", "Close unused ports", "Turn on audit logs"]),
        ]),
        ("Email security in rEmail", "Stay safe in your inbox.", [
            ("Built in", ["Spam and phishing filtering", "Attachment scanning", "Warnings for unverified senders"]),
        ]),
        ("Password manager basics", "Why use one and how to start.", [
            ("Why", "A password manager remembers a unique password for every site."),
            ("Start", "Set up Protector Y's password manager and import passwords from your browser."),
        ]),
        ("Data breach: what to do", "Your details appeared in a breach.", [
            ("Steps", S("Change the password for the breached site.", "Change it anywhere you reused it.", "Turn on two-step verification.", "Watch for phishing that uses the breached details.")),
        ]),
        ("Safe use of public computers", "Using computers in libraries or hotels.", [
            ("Tips", ["Use a private window", "Never save passwords", "Sign out completely", "Avoid banking or investing"]),
        ]),
        ("Child safety online", "Help kids stay safe.", [
            ("Tips", ["Use family settings", "Talk about what to share", "Keep devices in shared spaces", "Teach them to tell you about anything upsetting"]),
        ]),
        ("Malware on phones", "Signs your phone may be infected.", [
            ("Signs", ["Battery drains fast", "Unknown apps", "Pop-ups everywhere", "Unexpected charges"]),
            ("Fix", "Run a Protector Y scan and remove unknown apps."),
        ]),
        ("Secure your RanEddie Invest account", "Extra steps for financial accounts.", [
            ("Steps", ["Turn on two-step verification", "Use a unique password", "Turn on login alerts", "Only withdraw to accounts in your name"]),
        ]),
        ("Securing smart-home devices", "Lu Home and connected devices.", [
            ("Tips", ["Change default passwords", "Keep devices updated", "Remove devices you no longer use"]),
        ]),
        ("Verify it's really RanEddie", "Check emails and websites are genuine.", [
            ("Our addresses", "Official sites end in raneddie.com. Sign-in happens only at id.raneddie.com."),
            ("If unsure", "Open the site yourself instead of clicking the link."),
        ]),
        ("Security glossary", "Common security terms explained.", [
            ("Terms", ["**2FA** — two-step verification", "**Phishing** — fake messages that steal details", "**Malware** — harmful software", "**VPN** — encrypted connection", "**Session** — a signed-in device"]),
        ]),
        ("Gift card and payment scams", "A common trick to watch for.", [
            ("The scam", "Someone pressures you to pay with gift cards or a transfer."),
            ("Rule", "RanEddie never asks for payment in gift cards."),
        ]),
        ("SIM swap protection", "Protect your phone number.", [
            ("What it is", "Criminals move your number to their SIM to receive your codes."),
            ("Protect yourself", ["Use an authenticator app instead of SMS", "Add a PIN with your carrier"]),
        ]),
        ("Social media account safety", "Protect accounts linked to your identity.", [
            ("Tips", ["Use unique passwords", "Turn on two-step verification", "Check connected apps"]),
        ]),
        ("Remote access scams", "Fake tech support.", [
            ("The scam", "Callers claim your computer is infected and ask you to install remote-access software."),
            ("What to do", "Hang up. RanEddie support won't call you unexpectedly."),
        ]),
        ("Safe downloads", "Avoid harmful files.", [
            ("Tips", ["Download from official stores and websites", "Let Protector Y scan downloads", "Be careful with files that end in .exe, .apk or .js from unknown sources"]),
        ]),
    ],
    # ===================================================================== DATA
    "Data & storage": [
        ("Where your data is stored", "Where RanEddie products keep your information.", [
            ("Cloud products", "Cloudly, rEmail, workIT and RanEddie ID store data in RanEddie data centres."),
            ("On your device", "Some data, like Snake Brawl progress or Gimbly flight logs, stays on your device unless you back it up."),
        ]),
        ("Move data to a new device", "Bring your stuff with you.", [
            ("Lu devices", "Restore from a Cloudly backup during setup."),
            ("Games", "Sign in with your RanEddie ID — cloud saves follow you."),
            ("Files", "Everything in Cloudly Drive is available on every device."),
        ]),
        ("Export your files from Cloudly", "Download everything at once.", [
            ("Steps", S("Open Privacy > Download your data.", "Select Cloudly Drive and Photos.", "Choose a format and size.", "Download when ready.")),
        ]),
        ("Import data into RanEddie products", "Bring data from other services.", [
            ("Examples", ["Import mail and contacts into rEmail", "Open common document formats in workIT", "Upload photos to Cloudly Photos", "Import passwords into Protector Y"]),
        ]),
        ("Storage across RanEddie", "How your storage is shared.", [
            ("Shared storage", "Cloudly storage is shared by Cloudly Drive, Photos, Backup, rEmail attachments and workIT files."),
            ("Check usage", "Settings > Storage in Cloudly."),
        ]),
        ("Free up storage", "Make room without losing what matters.", [
            ("Quick wins", ["Delete old device backups", "Empty Recently deleted", "Remove large attachments in rEmail", "Delete duplicate photos"]),
        ]),
        ("Back up everything", "A simple backup plan.", [
            ("Plan", ["Turn on Cloudly Backup for Lu devices", "Turn on Photo backup", "Save workIT files to Cloudly", "Keep an extra copy of important files on an external drive"]),
        ]),
        ("Restore from a backup", "Get your data back.", [
            ("Devices", "Choose Restore from Cloudly during setup."),
            ("Files", "Use Version history or Recently deleted in Cloudly."),
        ]),
        ("File versions", "Go back to earlier versions of a file.", [
            ("Steps", S("Select a file in Cloudly or workIT.", "Choose Version history.", "Restore the version you want.")),
        ]),
        ("Shared data in families", "What family members share.", [
            ("Shared", ["Family storage plans", "Core Pass family plans", "Shared albums"]),
            ("Private", "Each person's files, email and history stay private."),
        ]),
        ("Data after cancelling a subscription", "What happens to your stuff.", [
            ("Storage plans", "If you're over the free limit, you can still view and download files, but can't add new ones."),
            ("Games", "Cloud saves stay with your RanEddie ID."),
        ]),
        ("Data for deceased users", "Help for families.", [
            ("Contact us", "Family members can contact support to request account closure or access to certain data, with proof of authority."),
        ]),
        ("Offline access", "Use your data without a connection.", [
            ("Make available offline", ["Cloudly files", "workIT documents", "BlueBear Stream downloads", "Maps on Lu devices"]),
        ]),
        ("Sync explained", "How data stays the same everywhere.", [
            ("How it works", "Changes on one device upload to RanEddie's cloud and download to your other devices."),
            ("Conflicts", "If two devices change the same thing offline, you'll be asked which version to keep."),
        ]),
        ("Data limits and file sizes", "How big files can be.", [
            ("Limits", ["Cloudly Drive: very large individual files supported", "rEmail attachments: larger files are shared as Cloudly links", "Image uploads on raneddie.com: 4 MB"]),
        ]),
        ("Organise files with folders and tags", "Find things faster.", [
            ("Tips", ["Use a few top-level folders", "Add stars to important files", "Use search instead of deep folder trees"]),
        ]),
        ("Search your data", "Find anything across RanEddie products.", [
            ("Tips", ["Search Cloudly for text inside documents", "Search Photos for what's in pictures", "Search rEmail with filters like from: and has:attachment"]),
        ]),
        ("Data portability", "Take your data elsewhere.", [
            ("Formats", "Exports use common formats: documents, spreadsheets, images, video and standard mailbox files."),
        ]),
        ("Business data retention", "Policies for organisations.", [
            ("Admins can", ["Set retention rules", "Place legal holds", "Export data for compliance"]),
        ]),
        ("Data residency for developers", "Choose where data lives.", [
            ("Cloudly and baseline", "Pick a region when you create resources; data stays in that region unless you move it."),
        ]),
        ("Database backups on baseline", "Protect your app's data.", [
            ("Options", ["Daily backups", "Point-in-time recovery", "Manual exports with Postgres tools"]),
        ]),
        ("Understanding storage plans", "Choose the right amount of space.", [
            ("Tips", ["Check what uses the most space", "Share a family plan", "Upgrade or downgrade any time"]),
        ]),
        ("Photo and video quality in backups", "Original quality explained.", [
            ("Original", "Cloudly Photos keeps photos and videos at original quality."),
        ]),
        ("Data on RanEddie Core", "Where console data lives.", [
            ("On the console", "Installed games and local saves."),
            ("In the cloud", "Cloud saves, achievements, friends and purchases."),
        ]),
        ("Data on Gimbly", "Where your footage goes.", [
            ("On Gimbly", "Clips are stored on Gimbly until they transfer to your phone."),
            ("Back up", "Turn on Cloudly Photos backup to keep them safe."),
        ]),
        ("Health data on Lu", "How health and fitness data is stored.", [
            ("Encrypted", "Health data is encrypted on your device and in backups."),
            ("Share", "Only with apps you choose."),
        ]),
        ("Clear history", "Delete activity history across products.", [
            ("Where", ["BlueBear Stream watch history", "Fizz browsing history", "AI activity", "SkyPear order history"]),
        ]),
        ("Data glossary", "Common data terms.", [
            ("Terms", ["**Backup** — a copy for recovery", "**Sync** — keeping copies the same", "**Export** — download your data", "**Retention** — how long data is kept"]),
        ]),
        ("Move from another cloud to Cloudly", "Switch to Cloudly.", [
            ("Steps", S("Download your files from your old service.", "Install Cloudly on your computer.", "Move the files into your Cloudly folder.")),
        ]),
        ("Accidentally deleted data", "Getting it back.", [
            ("Check", ["Recently deleted in Cloudly", "Trash in rEmail", "Version history in workIT"]),
            ("Time limit", "Most deleted items can be restored for 30 days."),
        ]),
    ],
    # ===================================================================== BILLING
    "Billing & subscriptions": [
        ("Manage your subscriptions", "See and change everything you pay for.", [
            ("Steps", S("Open Payments & plans in your Account Center.", "See every subscription and renewal date.", "Change or cancel any plan.")),
        ]),
        ("Cancel a subscription", "Stop a plan from renewing.", [
            ("Steps", S("Open Payments & plans.", "Select the subscription.", "Choose Cancel.")),
            ("Good to know", "You keep access until the end of the period you paid for."),
        ]),
        ("Update your payment method", "Change the card you pay with.", [
            ("Steps", S("Open Payments & plans > Payment methods.", "Add a new card.", "Make it your default.")),
        ]),
        ("Payment declined", "Fix a failed payment.", [
            ("Check", ["The card hasn't expired", "Billing address matches", "There's enough balance", "Your bank isn't blocking the payment"]),
        ]),
        ("View receipts and invoices", "Find past payments.", [
            ("Steps", S("Open Payments & plans > History.", "Select a payment.", "Download the receipt.")),
        ]),
        ("Request a refund", "Ask for money back.", [
            ("How", "Open the payment in History and choose Request refund, or contact support."),
            ("Eligibility", "Depends on the product and local law."),
        ]),
        ("Unexpected charge", "You don't recognise a payment.", [
            ("Check", ["Family members' purchases", "Subscription renewals", "In-app purchases"]),
            ("Still unsure", "Contact support with the date and amount."),
        ]),
        ("Family plans", "Share subscriptions with family.", [
            ("Plans", ["Cloudly family storage", "Core Pass family", "BlueBear Stream profiles"]),
            ("Organiser", "The organiser pays and manages members."),
        ]),
        ("Student and education pricing", "Discounts for students and schools.", [
            ("Availability", "Some products offer education pricing. Check each product's plans page."),
        ]),
        ("Business billing", "Billing for organisations.", [
            ("Options", ["Invoices", "Purchase orders", "Per-seat billing"]),
        ]),
        ("Taxes on purchases", "Why prices include or add tax.", [
            ("Depends on location", "Sales tax or VAT is applied based on your billing address."),
        ]),
        ("Currency and pricing", "Prices in your local currency.", [
            ("Local prices", "Prices are shown in your local currency where available."),
        ]),
        ("Free trials", "Try before you pay.", [
            ("How trials work", "Trials convert to paid plans unless cancelled before they end. We'll remind you before you're charged."),
        ]),
        ("Gift cards", "Redeem RanEddie gift cards.", [
            ("Redeem", S("Open Payments & plans > Redeem.", "Enter the code.", "The balance is added to your account.")),
            ("Warning", "Never use gift cards to pay someone who contacted you unexpectedly."),
        ]),
        ("In-app purchases in games", "Buying coins and items.", [
            ("Snake Brawl", "Coin packs are bought through Google Play. Players under 13 can't buy coins."),
            ("Approvals", "Use family settings or store parental controls to approve purchases."),
        ]),
        ("Change your plan", "Upgrade or downgrade.", [
            ("Upgrade", "Takes effect immediately; you pay the difference."),
            ("Downgrade", "Takes effect at your next renewal."),
        ]),
        ("Billing for Cloudly and baseline", "Usage-based billing for developers.", [
            ("How it works", "Pay for compute, storage and bandwidth you use, with budgets and alerts to avoid surprises."),
            ("Set a budget", "Billing > Budgets in the Cloudly console."),
        ]),
        ("Part Care billing", "Paying for protection plans.", [
            ("Options", "Pay once or monthly. Cancel any time from Payments & plans."),
        ]),
        ("SkyPear payments", "Paying in the SkyPear app.", [
            ("Options", "Cards and digital wallets in the app; cash and cards in restaurants."),
        ]),
        ("BlueBear Parks payments", "Tickets and resort bookings.", [
            ("Deposits", "Some resort bookings take a deposit with the balance due before arrival."),
        ]),
        ("Billing address", "Update your address.", [
            ("Steps", S("Open Payments & plans > Payment methods.", "Edit the card.", "Update the address.")),
        ]),
        ("Subscription renewal reminders", "Know before you're charged.", [
            ("Reminders", "We email you before annual plans renew."),
        ]),
        ("Chargebacks", "Disputing a charge with your bank.", [
            ("Contact us first", "We can usually resolve problems faster. A chargeback may suspend your account while it's reviewed."),
        ]),
        ("RanEddie Invest fees", "Fees aren't the same as subscriptions.", [
            ("Where to look", "See [Understand fees](/docs/raneddie-invest-understand-fees)."),
        ]),
        ("Billing support", "Get help with payments.", [
            ("Contact", "Email [contact@raneddie.com](mailto:contact@raneddie.com) with your username and the payment date."),
        ]),
    ],
    # ===================================================================== FAMILIES
    "Families": [
        ("Family settings overview", "One place to manage your family's RanEddie products.", [
            ("What you can manage", ["Screen and play time", "Spending and purchase approvals", "Age ratings for games and video", "Who children can play and chat with", "AI features"]),
        ]),
        ("Create a family group", "Bring your family together.", [
            ("Steps", S("Open Family in your Account Center.", "Choose Create family.", "Invite members by email.")),
        ]),
        ("Add a child to your family", "Set up a child account.", [
            ("Steps", S("Open Family > Add child.", "Enter their name and date of birth.", "Choose settings for their age.")),
        ]),
        ("Screen time limits", "Set healthy limits.", [
            ("Steps", S("Open Family and choose your child.", "Set daily limits for devices and games.", "Choose downtime hours.")),
        ]),
        ("Approve purchases", "Ask to buy.", [
            ("How it works", "When your child tries to buy something, you get a request to approve or decline."),
        ]),
        ("Age ratings", "Choose what's appropriate.", [
            ("Games and video", "Set the highest age rating for RanEddie Games and BlueBear Stream."),
        ]),
        ("Kids and Gimbly", "Flying safely with children.", [
            ("Tips", ["Adults should supervise every flight", "Use beginner mode", "Fly in open spaces away from people"]),
        ]),
        ("Talking to kids about online safety", "Conversation starters.", [
            ("Topics", ["What's okay to share", "Strangers online", "Asking for help", "Kindness in games and chats"]),
        ]),
        ("Family sharing of purchases", "Share games and media.", [
            ("Shared", "Eligible purchases can be shared with your family group."),
        ]),
        ("When a child turns 13", "Changes at 13.", [
            ("What changes", "Children can create their own RanEddie ID. Parents can keep some controls by staying in the family group."),
        ]),
    ],
    # ===================================================================== ACCESSIBILITY
    "Accessibility": [
        ("Accessibility at RanEddie", "Our approach to accessible products.", [
            ("Commitment", "We design RanEddie products to work for everyone, including people who use assistive technology."),
            ("Feedback", "Tell us what would help from any product's Help menu."),
        ]),
        ("Screen readers", "Use RanEddie products with a screen reader.", [
            ("Supported", "RanEddie websites and apps support common screen readers on computers, phones and Lu devices."),
        ]),
        ("Captions and transcripts", "Follow along with text.", [
            ("Where", ["BlueBear Stream subtitles", "workIT Meet live captions", "EditTime auto-captions"]),
        ]),
        ("Keyboard navigation", "Use RanEddie websites without a mouse.", [
            ("Tips", ["Tab moves between controls", "Enter or Space activates them", "Esc closes menus and dialogs"]),
        ]),
        ("Display and text size", "Make things easier to see.", [
            ("Options", ["Dark mode on raneddie.com and Lu devices", "Larger text in device settings", "Zoom in your browser"]),
        ]),
        ("Accessible gaming", "Options in RanEddie games.", [
            ("Snake Brawl", "Left-handed controls, joystick size, auto-aim on tap and camera distance."),
            ("Core", "Controller remapping and visual and audio aids."),
        ]),
        ("Hearing support on Lu Buds", "Adjust audio for your hearing.", [
            ("Options", ["Transparency mode", "Balance and volume limits", "Live listen with your phone's microphone"]),
        ]),
        ("Voice control", "Use your voice to control devices.", [
            ("Where", "Lu devices, Lu Home and Gimbly support voice commands."),
        ]),
        ("Reduced motion", "Fewer animations.", [
            ("How", "RanEddie websites respect your device's reduce-motion setting."),
        ]),
        ("Report an accessibility problem", "Help us fix barriers.", [
            ("How", "Email [contact@raneddie.com](mailto:contact@raneddie.com) with 'Accessibility' in the subject, the product, and what happened."),
        ]),
    ],
    # ===================================================================== DEVELOPERS
    "Developers": [
        ("Build with RanEddie", "Platforms for developers.", [
            ("Platforms", ["**baseline** — a complete backend", "**Cloudly** — compute, functions and storage", "**Sign in with RanEddie ID** — authentication for your apps"]),
        ]),
        ("Sign in with RanEddie ID for developers", "Add RanEddie ID sign-in to your app.", [
            ("With baseline", "Turn on the RanEddie ID provider in Auth > Providers."),
            ("Redirects", "Register every redirect URL your app uses."),
        ]),
        ("API keys and secrets", "Handle credentials safely.", [
            ("Rules", ["Keep secrets on the server", "Use environment variables", "Rotate keys regularly", "Revoke leaked keys immediately"]),
        ]),
        ("Rate limits", "Request limits for RanEddie APIs.", [
            ("What happens", "Requests over the limit return status 429. Retry with backoff."),
        ]),
        ("Status and incidents", "Check if a service is having problems.", [
            ("Where", "Service notices appear in the Cloudly console and baseline dashboard."),
        ]),
        ("Developer support", "Get help building.", [
            ("Contact", "Email [contact@raneddie.com](mailto:contact@raneddie.com) with your project ID and logs."),
        ]),
        ("Webhooks", "Get notified about events.", [
            ("Use", "Cloudly and baseline can call your URL when events happen. Verify the signature on every webhook."),
        ]),
        ("Environments: development, staging, production", "Keep projects separate.", [
            ("Tip", "Use separate baseline projects or branches for each environment."),
        ]),
        ("Monitoring and logs", "Understand what your app is doing.", [
            ("Where", ["Cloudly console > Logs", "baseline dashboard > Logs"]),
        ]),
        ("Developer terms", "Rules for building on RanEddie platforms.", [
            ("Key points", ["Protect your users' data", "Don't misuse RanEddie ID", "Follow acceptable-use rules"]),
        ]),
    ],
}


# =========================================================================================
# Extra depth for every article in a section. Each topic article gets: why it matters,
# a rotating set of best practices, where it applies in each product, a rotating pair of
# common questions and related articles.
# `product_doc` is the per-product article suffix to link to (e.g. "privacy" -> /docs/lu-privacy).
EXTRAS = {
    "AI at RanEddie": {
        "why": "AI can save real time — summarising a long thread, finding a photo, cleaning up audio — but it works best when you understand what it's doing and where its limits are. Knowing how RanEddie's AI features work helps you get better results, spot mistakes early and decide which features you want switched on.",
        "practices": [
            "Treat AI output as a first draft, not a final answer.",
            "Check names, numbers, dates and quotes before you share anything AI helped write.",
            "Give the assistant context: the audience, the tone and the length you want.",
            "Point AI at the exact file, message or section you mean.",
            "Turn off features you don't use from each product's settings.",
            "Delete AI activity you don't need from your Account Center.",
            "Use thumbs-down or Report when something goes wrong — it helps us improve.",
            "Don't paste passwords, verification codes or other secrets into AI prompts.",
        ],
        "faq": [
            ("Can I use RanEddie products without AI?", "Yes. Most AI features are optional and can be turned off in each product's settings."),
            ("Does AI see all of my files?", "No. Assistants work on the content you choose to share with them in that moment."),
            ("Why did I get a different answer when I asked again?", "AI results can vary. Asking again, or rephrasing your request, often gives a better result."),
            ("Who is responsible for AI-generated content I publish?", "You are. Review anything AI helped create before you use or share it."),
        ],
        "product_doc": "ai-features", "product_label": "AI features in {name}",
    },
    "RanEddie ID": {
        "why": "Your RanEddie ID is the key to every RanEddie product — your files in Cloudly, your email in rEmail, your games, purchases and devices. Keeping it accurate and secure protects everything connected to it, and knowing how it works makes it easy to get back in if something goes wrong.",
        "practices": [
            "Use a unique password of at least 15 characters — a short phrase works well.",
            "Turn on two-step verification with an authenticator app.",
            "Keep your email address up to date so codes and alerts reach you.",
            "Review active sessions every few months and revoke anything unfamiliar.",
            "Sign in only at id.raneddie.com.",
            "Never share verification codes — RanEddie will never ask for them.",
            "Save backup codes somewhere safe and offline.",
            "Disconnect products and apps you no longer use.",
        ],
        "faq": [
            ("Is a RanEddie ID free?", "Yes. Creating and using a RanEddie ID is free. Some products offer paid plans."),
            ("Can I have more than one RanEddie ID?", "Yes, but each needs its own email address and accounts can't be merged later."),
            ("Where do I manage my account?", f"In your [Account Center](https://id.raneddie.com/account)."),
            ("What if I can't sign in at all?", "Start with [Recover an account you can't access](/docs/sign-in-recover-an-account-you-can-t-access)."),
        ],
        "product_doc": "sign-in", "product_label": "Sign in to {name}",
    },
    "Privacy": {
        "why": "Privacy is about knowing what information exists about you and having real control over it. RanEddie products store only what they need to work, and give you tools to see, download and delete your data. Understanding those tools helps you make choices that fit you.",
        "practices": [
            "Review the Privacy section of your Account Center once or twice a year.",
            "Turn off personalised recommendations if you'd rather not have them.",
            "Check which apps and products are connected to your RanEddie ID.",
            "Review app permissions for location, camera and microphone on your devices.",
            "Clear history you don't need, such as watch history or AI activity.",
            "Share files with specific people instead of public links when you can.",
            "Download a copy of your data before you delete anything important.",
            "Use separate profiles for different people in your household.",
        ],
        "faq": [
            ("Does RanEddie sell my personal information?", "No."),
            ("Are my emails, documents or files used for ads?", "No. The content of your emails, documents, files and photos is never used for advertising."),
            ("How do I see what data RanEddie has about me?", "Use [Download your data](/docs/privacy-download-your-data) in your Account Center."),
            ("Who can I contact about privacy?", "Email contact@raneddie.com with 'Privacy request' in the subject."),
        ],
        "product_doc": "privacy", "product_label": "{name} and your privacy",
    },
    "Security": {
        "why": "Most account problems start with something small — a reused password, a convincing fake email, an out-of-date device. A few habits make your RanEddie ID, your devices and everything connected to them dramatically harder to break into.",
        "practices": [
            "Use a password manager so every account has a unique password.",
            "Turn on two-step verification everywhere it's offered.",
            "Install updates promptly on every device.",
            "Be suspicious of urgent messages asking you to act now.",
            "Open sites yourself instead of clicking links in unexpected messages.",
            "Keep Protector Y running on your computers and phones.",
            "Back up important files to Cloudly so ransomware can't hold them hostage.",
            "Review active sessions and connected apps regularly.",
        ],
        "faq": [
            ("Will RanEddie ever ask for my password?", "No. RanEddie will never ask for your password or a verification code by email, phone or chat."),
            ("What should I do first if I think I was hacked?", "Reset your password and revoke all sessions. See [My account was hacked](/docs/security-my-account-was-hacked)."),
            ("How do I report a scam that uses RanEddie's name?", "Forward it to contact@raneddie.com and delete it."),
            ("Is two-step verification really necessary?", "It's the single most effective step you can take to protect your account."),
        ],
        "product_doc": "security", "product_label": "Keep your {name} account secure",
    },
    "Data & storage": {
        "why": "Your files, photos, saves and settings are spread across devices and the cloud. Knowing where each lives, how it syncs and how it's backed up means you can move to a new device, recover from mistakes and free up space without losing anything that matters.",
        "practices": [
            "Turn on Cloudly Backup for your devices.",
            "Turn on photo backup on your phone, preferably on Wi-Fi.",
            "Keep an extra copy of irreplaceable files on an external drive.",
            "Check Recently deleted before assuming something is gone.",
            "Use version history to undo unwanted changes.",
            "Delete backups of devices you no longer own.",
            "Name files clearly and keep a small number of top-level folders.",
            "Download your data before closing an account.",
        ],
        "faq": [
            ("How long can I restore deleted files?", "Most deleted items can be restored for 30 days."),
            ("Is my data encrypted?", "Data in RanEddie's cloud is encrypted in transit and at rest."),
            ("What uses the most storage?", "Usually videos, device backups and large attachments."),
            ("Can I choose where my data is stored?", "Cloudly and baseline customers can choose a region for their resources."),
        ],
        "product_doc": "download-or-delete-your-data", "product_label": "Download or delete your {name} data",
    },
    "Billing & subscriptions": {
        "why": "Subscriptions, one-off purchases and in-app items can add up across products and family members. Knowing where to see every charge, how renewals work and how to change or cancel a plan keeps your spending predictable and makes it easy to fix anything unexpected.",
        "practices": [
            "Review Payments & plans every month or two.",
            "Turn on purchase approvals for children in your family group.",
            "Keep your payment method and billing address up to date.",
            "Cancel trials you don't want before they end.",
            "Download receipts you may need for expenses or taxes.",
            "Use a family plan instead of separate subscriptions where it saves money.",
            "Set budgets and alerts for usage-based Cloudly and baseline billing.",
            "Contact support before disputing a charge with your bank.",
        ],
        "faq": [
            ("Do I lose access straight away when I cancel?", "No. You keep access until the end of the period you've paid for."),
            ("Where are my receipts?", "In Payments & plans > History in your Account Center."),
            ("Why was I charged tax?", "Tax is applied based on your billing address."),
            ("Can I get a refund?", "It depends on the product and local law. See [Request a refund](/docs/billing-request-a-refund)."),
        ],
        "product_doc": "plans-and-billing", "product_label": "Plans and billing for {name}",
    },
    "Families": {
        "why": "Families share devices, subscriptions and screens. Family settings let parents give children the right amount of freedom for their age — with sensible limits on time, spending, content and contact — while still letting the whole household share what they've bought.",
        "practices": [
            "Create separate accounts or profiles for every family member.",
            "Set age ratings appropriate to each child.",
            "Turn on purchase approvals.",
            "Agree on screen-time limits together.",
            "Review who children can play and chat with.",
            "Keep devices in shared spaces for younger children.",
            "Revisit settings as children grow older.",
            "Talk openly about online safety and what to do if something feels wrong.",
        ],
        "faq": [
            ("How many people can be in a family group?", "Up to six people, including the organiser."),
            ("Can children see my purchases and files?", "No. Each person's files, email and history stay private."),
            ("What happens when my child turns 13?", "They can create their own RanEddie ID. See [When a child turns 13](/docs/families-when-a-child-turns-13)."),
            ("Can I approve requests from my phone?", "Yes. Requests appear as notifications you can approve or decline."),
        ],
        "product_doc": "for-families", "product_label": "{name} for families",
    },
    "Accessibility": {
        "why": "Everyone should be able to use RanEddie products comfortably. Accessibility features — captions, screen-reader support, keyboard navigation, voice control and display settings — make products easier for people with disabilities and more comfortable for everyone.",
        "practices": [
            "Turn on captions for video and meetings.",
            "Use your device's text size and contrast settings.",
            "Try keyboard shortcuts on RanEddie websites.",
            "Turn on reduce motion if animations are uncomfortable.",
            "Use voice control on Lu devices and Gimbly.",
            "Adjust game controls such as joystick size and left-handed layouts.",
            "Use dark mode in low light.",
            "Tell us about anything that's hard to use.",
        ],
        "faq": [
            ("Do RanEddie websites work with screen readers?", "Yes — they're designed to work with common screen readers."),
            ("Can I change text size?", "Yes, through your device or browser settings."),
            ("How do I report an accessibility problem?", "See [Report an accessibility problem](/docs/accessibility-report-an-accessibility-problem)."),
            ("Are captions available in other languages?", "Captions in EditTime and workIT Meet support many languages."),
        ],
        "product_doc": "accessibility", "product_label": "Accessibility in {name}",
    },
    "Developers": {
        "why": "baseline and Cloudly let you build on the same foundations RanEddie uses. Following the platform's conventions for keys, environments, security rules and monitoring keeps your app reliable and your users' data safe as you grow.",
        "practices": [
            "Keep secrets on the server and in environment variables.",
            "Turn on row-level security for every baseline table.",
            "Use separate projects or branches for development and production.",
            "Set budgets and alerts on usage-based services.",
            "Verify webhook signatures.",
            "Monitor logs and set alerts for errors.",
            "Rotate keys regularly and immediately if one leaks.",
            "Choose a region close to your users.",
        ],
        "faq": [
            ("Where do I start?", "Create a baseline project — it includes a database, auth, storage and APIs."),
            ("Can I add RanEddie ID sign-in to my app?", "Yes, with the RanEddie ID provider in baseline Auth."),
            ("How am I billed?", "Cloudly and baseline bill for the resources you use."),
            ("Where do I get help?", "Email contact@raneddie.com with your project ID and logs."),
        ],
        "product_doc": None, "product_label": None,
    },
}

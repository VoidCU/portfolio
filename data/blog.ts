export type BlogPost = {
  slug: string;
  title: string;
  date: string; // "Month DD, YYYY"
  readTime: string; // "X min read"
  category: string;
  excerpt: string; // 1-2 sentence teaser
  content: string; // Full HTML content
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'wearing-many-hats',
    title: 'Wearing Many Hats: Projects, Programming, and the Chaos In Between',
    date: 'May 18, 2025',
    readTime: '7 min read',
    category: 'Life',
    excerpt: 'My life is basically a massive codebase. Different modules, running in parallel, with the occasional bug that pops up at the worst possible moment.',
    featured: true,
    content: `
<p>Sometimes I feel like my life is just a massive codebase. Different modules, running in parallel, sharing memory they probably should not, with the occasional bug that pops up at the worst possible moment. Right now I am balancing several programming projects at once. Each one has its own deadlines, its own difficult people, its own learning curve I did not ask for.</p>

<p>Let me give you a real example. There was a stretch last year where I had three clients live at the same time. One was a SaaS platform at Neuron Nest that absolutely could not go down. One was a photography studio that needed its culling pipeline fixed before a wedding shoot on Saturday. And one was a freelance ERP module for a client who messaged me on WhatsApp at hours that suggested he never slept.</p>

<h2>The 2am server</h2>

<p>The thing nobody tells you about running infrastructure in Nepal is that the problems are rarely the interesting ones. It is not some elegant distributed systems puzzle. It is the power going out during a deploy. It is a DNS change that propagated for everyone except the one client who happened to test it.</p>

<p>One night a production server went down at 2am. I woke up to seventeen messages. Half of them were the client, half were my own monitoring. I sat on the cold floor of my room with a laptop and a phone hotspot because the home internet had also chosen that exact moment to die. Two hours later it was back. Nobody thanked me because nobody knew. That is the job.</p>

<blockquote>Context switching is a skill. People treat it like a flaw. I treat it like a muscle I trained whether I wanted to or not.</blockquote>

<h2>The guilt of saying no</h2>

<p>Here is the part I am still bad at. Saying no. A friend referred me to a project last month and it sounded good and the money was fine and I said no because I knew, deep down, that I had nothing left to give it. I felt guilty for a week. I kept opening the chat to reconsider.</p>

<p>But the truth is that every yes you give is a no to something else, usually to sleep, or to a project you already committed to. I learned this the hard way by overcommitting and then doing mediocre work on all of it. Mediocre work everywhere is worse than great work in one place.</p>

<ul>
  <li>Every project teaches you something, even the ones you regret taking.</li>
  <li>You do not have to do it all perfectly. You have to ship it working.</li>
  <li>Bugs happen. In code, and in life. The skill is not avoiding them. It is responding without falling apart.</li>
</ul>

<h2>What I actually believe now</h2>

<p>Wearing many hats is not a strategy I picked. It is a thing that happened to me because the market here is small and you survive by being useful in more than one way. The developer who only writes React does not eat as well as the developer who writes React and can also fix the server and talk to the client and design the thing in Figma when the designer disappears.</p>

<p>I do not romanticize it. It is exhausting. But there is a strange clarity that comes from working across so many domains. You start seeing the same patterns everywhere. A scheduling bug in a photography pipeline looks a lot like a race condition in a SaaS queue. A difficult client and a flaky API both want the same thing: clear boundaries.</p>

<p>So I keep wearing the hats. I try to take them off at night. Most nights I forget at least one of them on. That is fine. The codebase compiles. It ships. The bugs get fixed eventually. And tomorrow there will be new ones, which honestly is the only thing I am sure about.</p>
`,
  },
  {
    slug: 'ai-is-the-new-china',
    title: 'AI Is Doing to Developers What China Did to Factory Workers',
    date: 'April 22, 2025',
    readTime: '8 min read',
    category: 'Opinion',
    excerpt: 'AI is the new China, and developers are now the new working class. The junior roles are getting autocompleted out of existence.',
    featured: true,
    content: `
<p>I want to say this plainly because the comfortable version is a lie. AI is the new China, and developers are now the new working class. The same way cheap factory labor reshaped manufacturing and never gave it back, AI is reshaping who gets paid to write software. And the people getting hit first are the juniors.</p>

<h2>The friends who cannot find work</h2>

<p>I have friends, good engineers, who graduated a year or two after me and cannot find a job. Not because they are bad. They write clean code. They know their data structures. The problem is that the entry-level tasks that used to train juniors, the small CRUD endpoint, the test you write to learn the codebase, the documentation pass, those tasks are now done by a model in twelve seconds.</p>

<p>When the bottom rung of the ladder disappears, you do not get fewer senior engineers later. You get a gap. A whole cohort that never got to climb. That is what scares me more than my own job.</p>

<blockquote>The factory did not close. It just stopped hiring the people who used to learn the trade inside it.</blockquote>

<h2>The hackathon moment</h2>

<p>There is a specific kind of panic I have seen at hackathons now. Someone stands up to demo and says, almost casually, "I just used GPT-4 for the backend." And you can feel the room recalculate. The person who spent eight hours hand-writing an auth flow suddenly feels stupid. The person who prompted their way to a working demo feels like they cheated and won at the same time.</p>

<p>I have been on both sides of that feeling. It is not fun on either side.</p>

<h2>But I am not only afraid</h2>

<p>Here is the honest part. I use these tools every single day. They make me faster. They let me ship things in Nepal, with my constraints, that would have taken a five-person team five years ago. I would be a hypocrite to pretend otherwise.</p>

<p>The work is moving up the stack. It is moving away from syntax and toward judgment. The valuable engineer is no longer the one who remembers the exact pandas API. It is the one who knows:</p>

<ul>
  <li>What to build and, more importantly, what not to build.</li>
  <li>Why this architecture will hurt you in eighteen months.</li>
  <li>How to take a vague client need and turn it into a system that survives contact with reality.</li>
  <li>Code review, onboarding, taste. The things a model still does badly.</li>
</ul>

<h2>So what do you do</h2>

<p>If you are junior right now, I am not going to lie to you and say it is fine. It is harder than it was for me. But the move is not to compete with the model on speed. You will lose. The move is to become the person who decides what the model should do, who catches it when it is confidently wrong, who owns the outcome when it ships.</p>

<p>Creativity over syntax. Judgment over recall. Ownership over output. The factory analogy holds, but here is the twist the factory workers never got: the tool that is replacing the junior task is sitting right there, free or nearly free, and you can learn to drive it better than anyone. The displaced factory worker could not buy the robot. You can. That is the whole difference, and it is not small.</p>
`,
  },
  {
    slug: 'three-truths',
    title: 'The Past, Present, and Death: Three Things That Are Always True',
    date: 'March 30, 2025',
    readTime: '6 min read',
    category: 'Philosophy',
    excerpt: 'People say death is the only truth of the universe. But the past and present are also truths. The only false thing might be our thoughts about the future.',
    content: `
<p>I hear a lot of people say that death is the only truth of the universe. It sounds deep. It gets nods. But I think it is incomplete. The past is also a truth. It happened, it cannot be edited, it is locked. And the present is a truth. You are here, reading this, in a body, right now. That is real.</p>

<p>The only thing that is not a truth is the future. Or more precisely, our thoughts about the future. We treat our predictions like facts. They are not. They are stories we tell ourselves about a thing that has not happened and may never happen the way we imagine.</p>

<h2>Why a developer is thinking about this</h2>

<p>Because I do it constantly in code, and so do you. We obsess over the future. We architect for a scale we do not have. We add abstraction layers for requirements that never arrive. We pick a message queue because what if we need to handle a million events a day, when we are currently handling forty.</p>

<blockquote>The future is the one place where you are allowed to be infinitely wrong and still feel productive.</blockquote>

<p>I have done this. I once spent two weeks building a plugin system for a SaaS product so that future modules could be added without touching core code. Beautiful design. We added exactly one module in the next year, and it would have been a fifteen-minute job without the plugin system. I optimized for a future that did not show up.</p>

<h2>The present is where you ship</h2>

<p>The past is data. You learn from it. The present is the only place you can actually act. The future is fog. And yet we spend most of our anxiety on the fog and most of our regret on the data, and almost none of our attention on the one place where we can do anything at all.</p>

<p>The shipped thing that exists today beats the perfect thing you are still imagining. I believe this more every year. Not because I have stopped caring about good architecture. I care a lot. But I have learned that you earn the right to refactor by first having something that works.</p>

<ul>
  <li>The past tells you what broke. Listen to it.</li>
  <li>The present is the only writable memory. Use it.</li>
  <li>The future is read-only and the file does not exist yet. Stop pretending you can read it.</li>
</ul>

<h2>The quiet version</h2>

<p>I am not religious about this. I do not meditate on mountaintops. I live in Kathmandu, I have deadlines, my mind races at night about things that will probably never happen. But on the good days, I remember that the only move available to me is the next small one, today, with what I actually have.</p>

<p>Death is true. Fine. The past is true. The present is true. And the story I am telling myself about next month is just a story. Knowing that does not fix everything. But it makes the present, the one truth I can touch, feel a little less crowded.</p>
`,
  },
  {
    slug: 'building-devanagari-ocr',
    title: 'Teaching a Computer to Read Nepali Handwriting (And What It Cost Me)',
    date: 'February 14, 2025',
    readTime: '9 min read',
    category: 'Machine Learning',
    excerpt: 'I built a CNN that hit 99.98% accuracy on handwritten Devanagari characters. Here is what those nights of training, and the GPU bills, actually cost.',
    featured: true,
    content: `
<p>The headline number is 99.98 percent. That is the test accuracy my convolutional network reached on handwritten Devanagari character recognition. It is the number I put on my resume. It is the number people ask about. But the number hides almost everything that actually happened, so let me tell you the parts that do not fit in a bullet point.</p>

<h2>Why this mattered to me</h2>

<p>Devanagari is the script of Nepali and Hindi and a lot of South Asian languages. The world built incredible OCR for Latin scripts decades ago. For Devanagari it always felt like an afterthought. The conjuncts are hard. The matras sit above and below the line. Handwriting varies wildly. So when I picked this for a deep dive, it was personal. This is my script. I grew up writing these characters by hand in school notebooks.</p>

<blockquote>Every dataset that works perfectly was built by someone who suffered through the messy version first.</blockquote>

<h2>The GPU problem in Nepal</h2>

<p>Here is a thing developers in richer places do not think about. GPU access. I did not have a beefy machine. Renting cloud GPUs is priced in dollars, and dollars are expensive when you earn in rupees. Every training run had a real cost I could feel in my wallet. So I could not just spray and pray with hyperparameters. I had to think before I burned a run.</p>

<p>That constraint, honestly, made me a better engineer. When each experiment costs you real money, you stop being lazy. You read the loss curves carefully. You change one thing at a time. You write down what you tried so you never accidentally pay twice for the same failed idea.</p>

<h2>The nights</h2>

<p>I trained mostly at night because that is when the power was stable and the internet was not fighting the whole neighborhood. I would kick off a run, watch the first few epochs to make sure it was not diverging, then try to sleep while it cooked. I would wake up and check the validation accuracy like checking a lottery ticket.</p>

<p>The architecture itself was not exotic. Stacked convolution and pooling, batch normalization, dropout to fight overfitting, a dense head. The wins did not come from a clever model. They came from boring discipline:</p>

<ul>
  <li>Augmentation that matched real handwriting: small rotations, shifts, elastic distortions. Not random nonsense.</li>
  <li>Cleaning the dataset by hand when the labels were wrong. Yes, by hand. For a long time.</li>
  <li>Learning rate scheduling instead of one fixed value and hope.</li>
  <li>Early stopping so I did not overtrain into a worse model.</li>
</ul>

<h2>What 99.98 percent actually means</h2>

<p>Let me be honest about this number, because people misread it. It is test accuracy on a held-out set of clean, segmented single characters. That is a controlled condition. In the wild, with someone scrawling a full word on a phone screen at an angle in bad light, you do not get 99.98 percent. Segmentation alone will eat you alive.</p>

<p>So I paired the model with an Android draw-and-predict app. You draw a character, it predicts. In that narrow, controlled setting the number mostly holds and it feels like magic. But I would never tell a client that an end-to-end document OCR system inherits that number. It does not. The character classifier is one strong link in a chain that has weaker links.</p>

<h2>What it cost, and what it gave</h2>

<p>It cost me sleep, some money I did not really have, and a few weeks where I was bad company because half my brain was watching a loss curve. What it gave me was deeper. It taught me that the gap between a research number and a product is enormous, and that closing it is the actual job. The model was the easy part. The truth in that one decimal place was the whole education.</p>
`,
  },
  {
    slug: 'fastapi-vs-django',
    title: 'FastAPI vs Django: Three Years In Production, Here Is the Real Answer',
    date: 'January 19, 2025',
    readTime: '8 min read',
    category: 'Backend',
    excerpt: 'Not a tutorial. Real opinions from shipping both in Nepal\'s market, including the project where one of them quietly failed me.',
    content: `
<p>Every comparison of FastAPI and Django online reads like it was written by someone who used both for a weekend tutorial. I have shipped both, in production, for paying clients, in a market where if it breaks I am the one who gets the angry call. So here is the version with scars on it.</p>

<h2>The short answer nobody likes</h2>

<p>It depends, and it depends on things that have nothing to do with the frameworks. It depends on your team, your timeline, and how much of the boring stuff you want to build yourself. That said, I do have strong opinions, so let me earn them.</p>

<h2>Where Django won for me</h2>

<p>I built an ERP-ish admin tool for a client who needed it yesterday. The whole value was in the admin panel, the user management, the permissions, the data tables that staff would stare at all day. Django gave me the admin for free. The ORM and migrations were mature and boring in the best way. Authentication was solved. I shipped in a fraction of the time it would have taken to assemble the same thing from parts.</p>

<blockquote>Django is batteries included, and in a small market where you bill by the project, those batteries are pure profit.</blockquote>

<p>The client did not care about async throughput. They cared about staff being able to edit records without breaking things. Django was the right call and it was not close.</p>

<h2>Where FastAPI won for me</h2>

<p>Then I had a project that was mostly an API feeding a React front end and a mobile app, with some machine learning inference in the request path. Here FastAPI shined. The async model meant I could handle slow external calls without blocking. The Pydantic validation caught bad data at the boundary instead of deep inside my code. And the automatic OpenAPI docs meant the front-end developer could work against a real spec without me writing a wiki page.</p>

<p>The ML integration mattered too. My inference code was Python anyway, and FastAPI let me serve it cleanly without the weight of a full web framework I did not need.</p>

<h2>The project where Django quietly failed me</h2>

<p>Here is the honest one. I started a real-time-ish feature on a Django project, notifications and live updates, and I fought the framework the whole way. Django can do async now, sure, but the ecosystem around it, the ORM, the middleware, a lot of third-party packages, still feels sync-first. I ended up bolting on extra infrastructure to make it work, and it was fragile. If I had reached for an async-native stack from the start, I would have saved a week and a lot of frustration. That one was my fault for picking the comfortable tool instead of the right one.</p>

<h2>My actual rule of thumb</h2>

<ul>
  <li>Heavy admin, content, internal tools, fast delivery, team that knows Django: pick Django.</li>
  <li>API-first, mobile or SPA front end, ML in the loop, async-heavy, performance you can feel: pick FastAPI.</li>
  <li>If you do not know yet, lean Django for speed of delivery. You can carve out a FastAPI service later for the hot path.</li>
</ul>

<h2>The thing both crowds get wrong</h2>

<p>FastAPI people love to wave benchmarks around. Django people love to say Django scales fine, look at Instagram. Both are right and both are missing the point. For most projects, in most companies, especially small ones like the ones I work with, the bottleneck is never the framework. It is the database query you forgot to index, the N plus one you did not notice, the third-party API that takes two seconds. Pick the framework that lets your team move, then go fix the real bottleneck.</p>
`,
  },
  {
    slug: 'cto-at-24',
    title: 'On Being a CTO at 24 in Kathmandu',
    date: 'December 12, 2024',
    readTime: '8 min read',
    category: 'Leadership',
    excerpt: 'The loneliness of it. Making decisions you are not sure about. Mentoring people ten years older than you. Here is what nobody tells you.',
    content: `
<p>I became a CTO at 24. I do not say that to brag. I say it because the title sounds a lot more impressive than the reality, and I think someone should write down the reality. In Nepal, in a small company, CTO does not mean you have a corner office and a team of architects. It means you are the person who is supposed to know, and there is nobody above you to ask.</p>

<h2>The loneliness</h2>

<p>That is the first thing. The loneliness. As a developer you always had someone senior to escalate to. As the technical head, you are the escalation. When a decision is genuinely hard, when both options have real downsides, you make the call and you carry it alone. If it goes wrong, it is yours. There is no one to share the weight with at 1am when you are second-guessing a database choice that the whole product now depends on.</p>

<blockquote>The hardest part of leading is not the work. It is making decisions you are honestly not sure about and then committing to them anyway, fully, so the team can move.</blockquote>

<h2>Mentoring people older than me</h2>

<p>Some of the people I have led were ten years older than me. Think about how strange that is. You are 24, telling someone who has been working since you were in school how the system should be structured. The trick I learned is that age is not the thing. Respect is. If you respect their experience and they respect your judgment, it works. The moment you pull rank because of a title, it dies.</p>

<p>I made that mistake early. I overrode an older engineer on something because I was the CTO and I could. I was right about the technical point and completely wrong about how I handled it. I lost trust I had to spend months rebuilding. Being right is worthless if you are right in a way that makes people stop wanting to work with you.</p>

<h2>Imposter syndrome is not a phase</h2>

<p>People talk about imposter syndrome like it is a thing you grow out of. I have not. I just got used to operating with it sitting in the room. Every architecture review, part of my brain whispers that someone with a real CS pedigree from a real institution would do this better. Maybe they would. But they are not here, and the work still needs doing, and over time I noticed that my decisions were mostly working out. The whisper got quieter. It never left.</p>

<h2>Nepal startup culture</h2>

<p>Leading technically here is its own thing. You are not just choosing a stack. You are choosing a stack that you can hire for in a small talent pool, that runs on infrastructure you can actually afford in rupees, that survives power cuts and flaky internet. The fancy answer from a Silicon Valley blog is often the wrong answer here. I have learned to translate global best practices into local reality, and that translation is half the job.</p>

<h2>What nobody tells you</h2>

<ul>
  <li>You will spend more time on people than on code, and you will not have been trained for the people part at all.</li>
  <li>Your job is to be wrong less often than the cost of indecision. Perfect is not on the menu.</li>
  <li>The team watches how you handle failure more than how you handle success. Stay calm when it breaks.</li>
  <li>Saying "I do not know, let me find out" builds more trust than pretending. It took me too long to learn that.</li>
</ul>

<h2>Would I do it again</h2>

<p>Yes. It aged me, in good ways and bad. I am a better engineer because I had to own outcomes instead of just tasks. But if you are about to step into a role like this young, know that the title is the smallest part. The real job is carrying uncertainty without passing the weight of it onto your team. That is the whole thing. Everything else is just code.</p>
`,
  },
  {
    slug: 'automating-1500-hours',
    title: 'I Automated 1,500 Hours of Manual Work. Here Is What Happened After.',
    date: 'November 28, 2024',
    readTime: '7 min read',
    category: 'Automation',
    excerpt: 'The hospital RPA project, the Playwright bots, and the weird feeling when your bot quietly replaces a person.',
    content: `
<p>Across a year of automation work I clawed back roughly 1,500 hours of manual labor. Data entry, report generation, repetitive form filling, the kind of work that is too important to skip and too dull to do well by hand. I am proud of the engineering. I am less settled about the rest of it, and I want to be honest about that.</p>

<h2>The work itself</h2>

<p>A lot of it was browser automation with Playwright. There was a healthcare-adjacent workflow where staff were manually moving data between systems that refused to talk to each other. Hours a day, every day, copying fields from one screen to another. It was error-prone because humans are not built for that, and the errors mattered because it was patient-related data.</p>

<p>So I built bots. They logged in, navigated, read the fields, validated them, wrote them to the other system, and logged every step so we had an audit trail. What took a person an afternoon took the bot a few minutes, and the bot did not get tired and skip a row at 4pm on a Friday.</p>

<blockquote>The bot did not get bored. That, more than speed, was the real upgrade. Boredom is where human errors live.</blockquote>

<h2>What the client said</h2>

<p>The client was thrilled, of course. The numbers were undeniable. Faster, cheaper, fewer mistakes. They wanted more processes automated immediately. From a pure business view it was a clean win, the kind that makes you look like a genius.</p>

<h2>The weird feeling</h2>

<p>Here is the part I do not see written about much. There was a person whose job was that copying work. Not their whole job, but a real chunk of it. And after the bot, that chunk was gone. I never met them. I just made a thing that quietly removed a few hours of their daily existence from the books.</p>

<p>I told myself the comforting story. Now they can do higher-value work. And sometimes that is true. But sometimes the higher-value work does not materialize, and the hours you saved the company are hours someone used to be paid for. I do not have a clean answer to this. I am suspicious of anyone who does.</p>

<h2>The ethical question nobody asks</h2>

<p>When I scope an automation project, the question on the table is always efficiency and cost. Never once has a client asked me what happens to the people currently doing the work. Never. It is just not in the conversation. And I, the person building the thing, also do not usually raise it, because it is awkward and it is not what I was hired to ask.</p>

<p>I am not pretending I have the moral high ground. I built the bots. I took the money. But I think the least I can do is not pretend the question is not there:</p>

<ul>
  <li>Automation that helps a person do their job better is a different thing from automation that erases the job.</li>
  <li>In a country with limited social safety nets, "they can retrain" is not always a real option.</li>
  <li>The efficiency is real. The displacement is also real. Both things are true at once.</li>
</ul>

<h2>Where I landed</h2>

<p>I still do automation work. It is some of the most satisfying engineering I do, taking a dumb repetitive process and making it disappear. But I have stopped pretending it is a pure good. It is a tool, and like every tool it cuts in the direction you point it. The hours I saved were real. So was the person on the other end of them. I keep both of those facts in the same hand now, even though it is heavier that way.</p>
`,
  },
  {
    slug: 'multitenant-saas-mistakes',
    title: 'Multi-Tenant SaaS from Scratch: Every Mistake I Made (And There Were Many)',
    date: 'November 5, 2024',
    readTime: '9 min read',
    category: 'Architecture',
    excerpt: 'Building the EdTech SaaS at Neuron Nest. RBAC gone wrong, tenant isolation bugs, and the meeting I will never forget.',
    content: `
<p>Building a multi-tenant SaaS from scratch teaches you humility faster than any course. At Neuron Nest I architected an EdTech platform where many schools, the tenants, share one system but must never, ever see each other's data. Simple to say. I made nearly every mistake there is to make on the way to making it true.</p>

<h2>Mistake one: thinking RBAC is simple</h2>

<p>Role-based access control sounds like a solved problem. Admin, teacher, student, done. It is never that. Real schools have a finance person who can see fees but not grades. A coordinator who manages some classes but not others. A super admin at the company level who can cross tenants for support, which is exactly the kind of power that, if it leaks, ends you.</p>

<p>My first RBAC design was a flat list of roles. It collapsed the moment real requirements arrived. I rebuilt it as a dynamic permission system where roles are bundles of granular permissions, scoped to a tenant and sometimes to a resource. That redesign cost me weeks I would not have spent if I had taken the problem seriously from day one.</p>

<blockquote>Every shortcut you take in your permission model becomes a security incident with a delay timer on it.</blockquote>

<h2>Mistake two: tenant isolation as an afterthought</h2>

<p>The big architectural question in multi-tenancy is how you separate data. Shared database with a tenant ID column, separate schemas, or separate databases. I went with a shared database and a tenant ID, which is cheap and operationally simple. The catch is that isolation now lives entirely in your code. One query that forgets the tenant filter and you have a leak.</p>

<p>I learned to never trust myself to remember the filter. I pushed isolation down into the data access layer so that it was nearly impossible to write a query that escaped the current tenant scope. If isolation depends on every developer remembering a WHERE clause forever, it will fail. It is only a matter of when.</p>

<h2>The meeting I will never forget</h2>

<p>Here is the story that still makes my stomach drop. During testing, a client looking at their dashboard saw a number that was not theirs. Aggregated data from another tenant had bled into their view. It was a reporting query, an analytics rollup, that I had written without the proper tenant scope because it ran in a context where I "knew" the tenant was set. I did not know. I assumed.</p>

<p>It was caught in testing, before any real harm, which is the only reason I can tell this story calmly. But sitting in that meeting, explaining how one client almost saw another client's numbers, was one of the worst professional moments I have had. Trust in a SaaS is everything, and I had nearly spent it on a missing clause.</p>

<h2>What I changed after</h2>

<ul>
  <li>Tenant scope became a non-negotiable part of every data path, enforced at the lowest layer, not the highest.</li>
  <li>Analytics and background jobs, the contexts where you "know" the tenant, got the strictest checks, because that is exactly where assumptions hide.</li>
  <li>We wrote tests specifically designed to try to leak data across tenants, and we treated a passing leak test as a release blocker.</li>
  <li>RBAC and tenancy got reviewed together, because a permission bug and an isolation bug are the same family of disaster.</li>
</ul>

<h2>The honest summary</h2>

<p>The platform works now. The RBAC is genuinely good, it cut client onboarding time noticeably because permissions are configurable instead of hardcoded. The isolation holds. But none of that was the result of a clean first design. It was the result of making a long list of mistakes, getting scared by the right ones, and rebuilding the foundation while the house was already occupied. If you are building multi-tenant from scratch, assume you will make these same mistakes. Build so that the cheap ones stay cheap and the expensive ones get caught in testing, not in a client meeting.</p>
`,
  },
  {
    slug: 'flutter-vs-react-native',
    title: 'Flutter vs React Native in 2024: I Have Shipped Both. Here Is My Take.',
    date: 'October 16, 2024',
    readTime: '7 min read',
    category: 'Mobile',
    excerpt: 'Not benchmarks. Real client expectations in Nepal, including the one who demanded iOS and Android for a 500 dollar budget.',
    content: `
<p>I have shipped apps in both Flutter and React Native, for real clients, on real budgets, in a market where the budget is usually smaller than the ambition. So this is not a benchmark post. Benchmarks are fun and mostly irrelevant to whether your client is happy. This is about which one I reach for and why.</p>

<h2>The client who set the scene</h2>

<p>Let me start with a true story that explains everything about mobile work here. A client wanted a full app. iOS and Android. Push notifications, payments, the works. The budget was 500 dollars. Total. For both platforms. When I gently explained that this was not a number that maps to that scope anywhere on Earth, he was genuinely confused, because to him 500 dollars was a lot of money, and it is.</p>

<blockquote>Cross-platform frameworks did not become popular because they are elegant. They became popular because clients want two apps and can pay for half of one.</blockquote>

<p>That tension, two platforms on one budget, is the entire reason Flutter and React Native matter in a market like Nepal. Native iOS plus native Android is a luxury most of my clients cannot afford. So the real question is which cross-platform tool wastes less of my time.</p>

<h2>What I actually think of each</h2>

<p>React Native: if the client already has a React web app or a React team, this is the obvious pick. Code sharing of logic and mental model is real. The ecosystem is huge. The downside is that you live close to the native edge, and when something breaks at the native bridge, you are debugging across two languages and a runtime, which is its own special pain.</p>

<p>Flutter: Dart is weird at first. Everyone says this and it is true. But it is weird for about a week and then it is fine, honestly pleasant. The big win is consistency. Flutter draws its own UI, so what I see on my screen is what the client sees on theirs, on both platforms, without the per-device surprises. For pixel-faithful design, Flutter has saved me real arguments with clients.</p>

<h2>Where each one won a project for me</h2>

<ul>
  <li>A project with an existing React web product and a tight timeline: React Native, because the team could move without learning a new world.</li>
  <li>A design-heavy app where the client cared deeply about it looking identical and polished everywhere: Flutter, no contest.</li>
  <li>An app that needed a lot of fiddly native integrations specific to one platform: honestly I considered going native for that part, and sometimes the right answer is a thin native layer regardless of framework.</li>
</ul>

<h2>The Dart thing, more honestly</h2>

<p>People treat Dart like a dealbreaker. It is not. It is a clean, boring, statically typed language that does its job. The tooling is good, hot reload is genuinely fast, and the lack of JavaScript's historical baggage is a relief. I went in skeptical, the same as everyone. I came out using it for the apps where I get to choose.</p>

<h2>My 2024 take</h2>

<p>If I am choosing freely, with no existing team or codebase pulling me, I lean Flutter for most client work here. The UI consistency and the single mental model save me time, and time is the budget the client never accounts for. If there is an existing React investment, React Native wins by default, not because it is better but because reuse beats purity. And if a client offers me 500 dollars for two platforms, I now know exactly what to say, which is the most valuable thing either framework ever taught me.</p>
`,
  },
  {
    slug: 'leetcode-obsession',
    title: '580 Problems Later: Why I Still Open LeetCode Every Morning',
    date: 'September 24, 2024',
    readTime: '6 min read',
    category: 'Career',
    excerpt: 'It is not about a FAANG job. It is about training the brain. And the moment a graph problem clicked because of something at work.',
    content: `
<p>I have solved more than 580 problems on LeetCode. I am in the top 3 percent globally. And I want to be clear about something up front: I am not grinding toward a FAANG interview. I am not even sure I want that life. So why do I still open LeetCode most mornings, with coffee, before the real work starts?</p>

<h2>It is brain training, not job training</h2>

<p>People assume competitive problem solving is purely interview prep. For me it became something closer to a gym routine for thinking. The same way a runner does not run only because there is a race coming, I solve problems because the practice keeps a specific part of my mind sharp. The part that breaks a vague mess into a clean structure.</p>

<blockquote>I do not solve LeetCode problems to get hired. I solve them so that when a real problem shows up at work, my brain already knows the shape of it.</blockquote>

<h2>The morning ritual</h2>

<p>It is a small thing. One problem, maybe two, before I open Slack or email, before the day's chaos has a chance to grab me. It is a win I bank before anyone can interrupt me. There is something grounding about starting the day by solving something fully, start to finish, when so much of real work is half-finished and ongoing and political.</p>

<h2>The moment it clicked at work</h2>

<p>Here is the story that made me a believer. I was stuck on a real problem, modeling relationships between entities in a system, dependencies that could cascade. I was tangled in it for an afternoon. Then it hit me: this is a graph. The cascade is just traversal. The cycle I was worried about is just cycle detection, which I had drilled a dozen times on toy problems.</p>

<p>The toy problems had built a pattern library in my head, and at the moment I needed it, my brain reached in and pulled out the right shape. I do not think I would have seen it as cleanly without the years of solving graph problems that, individually, looked pointless.</p>

<h2>What top 3 percent actually means</h2>

<p>Let me be honest, because rankings get oversold. Top 3 percent means I have put in a lot of consistent reps and I am comfortable across most problem categories. It does not mean I am a genius. It does not mean I am a better engineer than someone who never touches the site. Plenty of excellent engineers think LeetCode is a waste of time, and for the work they do, they might be right.</p>

<ul>
  <li>It is a ranking on one specific skill: solving well-defined algorithmic puzzles under constraints.</li>
  <li>It does not measure system design, taste, communication, or shipping, which are most of the actual job.</li>
  <li>But the skill it does measure, structured problem decomposition, transfers more than the skeptics admit.</li>
</ul>

<h2>Why I will not stop</h2>

<p>Because it is a habit that costs me twenty minutes and pays me back in clarity. Because finishing something cleanly first thing in the morning sets a tone. And because every so often, a problem I solved for fun two years ago quietly saves me an afternoon on something real. That trade has never once felt bad. So I will keep opening it tomorrow, same as today.</p>
`,
  },
  {
    slug: 'freelancing-in-nepal',
    title: 'The Real Cost of Freelancing as a Developer in Nepal',
    date: 'August 30, 2024',
    readTime: '8 min read',
    category: 'Career',
    excerpt: 'Payment gateways that do not work, clients who think 100 dollars is a fortune, and the one client from Norway who paid on time, every month.',
    content: `
<p>Freelancing as a developer in Nepal looks great from the outside. Work for international clients, earn in dollars, set your own hours. The reality has a lot of friction that nobody mentions in the motivational threads, and I think someone should lay it out honestly.</p>

<h2>Getting paid is the first hard problem</h2>

<p>This is the one that breaks people. The internet says use this payment platform or that one. Half of them do not properly support Nepal. The ones that do take cuts that feel like a tax for the crime of being born here. Receiving international payments cleanly, legally, without losing a chunk to fees and conversion, is a genuine engineering problem on top of the actual engineering.</p>

<blockquote>The hardest bug in freelancing is not in the code. It is in the gap between earning the money and actually holding it.</blockquote>

<h2>The 100 dollar client</h2>

<p>There are two kinds of clients in this market. Local clients, where you constantly fight the perception that software is cheap. To a local client, 100 dollars can feel like a fortune for a website, and explaining that 100 dollars is a few hours of serious work, not a whole platform, is a conversation I have had more times than I can count. It is not their fault. It is the local price of money. But it is exhausting.</p>

<p>Then there are international clients, where the same 100 dollars might be a rounding error, and the challenge flips. Now you are competing on trust and quality against the whole world, often while being underpriced precisely because you are from a country people assume should be cheap.</p>

<h2>The timezone grind</h2>

<p>Working with clients in the US or Europe means your meetings live at the edges of your day. Late nights for a US client, early mornings for some European ones. You do this for a while and your sleep schedule becomes a negotiation between several timezones, none of which is yours. I have taken calls at hours that no human should be making decisions at, and made decisions anyway.</p>

<h2>The Norway client</h2>

<p>Let me tell you about the good one, because it matters. A client from Norway. Every month, on time, the payment arrived. No haggling, no "can we do it cheaper," no disappearing for three weeks and then demanding everything by Monday. Clear scope, clear pay, clear respect. That one relationship taught me what the work could feel like when both sides are honest.</p>

<p>That is the thing about a single good client. It recalibrates you. After that, I had less patience for the ones who treated my time as free and my rates as an insult. I knew what the alternative felt like.</p>

<h2>The pride and the frustration, together</h2>

<ul>
  <li>Pride: I have built things for clients across the world, from my room in Kathmandu, with constraints they will never understand.</li>
  <li>Frustration: I have been underpaid for being from here, and undervalued by people here for the same work.</li>
  <li>Pride: the timezone grind made me independent and adaptable in ways a comfortable job never would have.</li>
  <li>Frustration: the cost of that independence is paid in sleep and stability nobody sees.</li>
</ul>

<h2>Would I recommend it</h2>

<p>Carefully. Freelancing here can be a real path, and for me it has been. But go in knowing the real costs, the payment friction, the price battles, the broken sleep, the loneliness of having no team to lean on. The dollars are real. So is everything you spend to earn them. Find your Norway client and hold onto them, and slowly let the rest go.</p>
`,
  },
  {
    slug: 'weap-and-water',
    title: 'Water Doesn\'t Code Itself: What I Learned Building Hydrological Models for NGOs',
    date: 'July 28, 2024',
    readTime: '8 min read',
    category: 'Climate',
    excerpt: 'The WEAP model for Godawari, CMIP6 bias correction, and how a web developer ended up modeling Nepal\'s water future to 2050.',
    content: `
<p>If you had told me a few years ago that I would be doing climate modeling, simulating water availability decades into the future, I would have laughed. I write web apps. I build SaaS. But software work in Nepal takes you to strange and meaningful places, and one of those places was hydrology.</p>

<h2>How a developer ends up doing climate science</h2>

<p>An NGO needed water resource modeling for a watershed near Godawari. They could not afford a big commercial consultancy and they could not afford expensive proprietary software with per-seat licenses priced for Western budgets. What they had was a problem, a deadline, and a developer willing to learn fast. That was me.</p>

<blockquote>In a developing country, the line between domains blurs. The person who can learn the tool is more available than the specialist who already knows it.</blockquote>

<h2>What WEAP actually is</h2>

<p>WEAP, the Water Evaluation and Planning system, lets you build a model of a watershed: where water comes from, where it goes, who uses it, and how that changes under different scenarios. You feed it rainfall, land use, demand, and it simulates how much water is available where, over time. For an NGO trying to plan for a community's water future, it is exactly the right tool.</p>

<h2>The CMIP6 part, in plain words</h2>

<p>To model the future you need future climate data. That comes from global climate models, the CMIP6 ensemble being the current generation. The problem is that global models work at a coarse scale. They are not built to tell you what happens in one specific small watershed in Nepal. Their raw output has systematic biases when you zoom into a local area.</p>

<p>So you do bias correction. You take the model's historical output, compare it against what actually happened locally, learn the offset, and apply that correction to the future projections. It is unglamorous statistical work, and it is the difference between a model that means something locally and a model that is just confidently wrong at the wrong scale.</p>

<ul>
  <li>Global climate data is the raw ingredient. It is not the meal.</li>
  <li>Bias correction is the step that makes a global projection say something honest about a local valley.</li>
  <li>Get this wrong and every downstream conclusion inherits the error.</li>
</ul>

<h2>What the model said about 2050</h2>

<p>The projections were sobering. Without going into numbers I am not qualified to defend in a journal, the direction was clear: water stress in the region gets worse as we move toward mid-century. Changing rainfall patterns, shifting timing, growing demand. Nepal sits below the Himalaya and people assume we are water-rich. At a national scale, maybe. At the scale of a specific community in a specific season, the future the model painted was not comfortable.</p>

<h2>What it taught me</h2>

<p>A few things stuck. First, that software skills are transferable to problems that matter far beyond software. The ability to wrangle data, automate a pipeline, and reason about a model is useful in hydrology, in medicine, in anything. Second, that the affordability gap in tools is real and harmful. This NGO did important work and was nearly priced out of the software it needed to do it. And third, that some of the most meaningful engineering I have done had no users, no dashboard, no launch. Just a model, an NGO, and a question about whether a community would have enough water in twenty-five years. That mattered more than any feature I have ever shipped.</p>
`,
  },
  {
    slug: 'mentoring-junior-devs',
    title: 'Why I Mentor Junior Developers Even When I Am Barely Keeping Up',
    date: 'June 30, 2024',
    readTime: '6 min read',
    category: 'Leadership',
    excerpt: 'The four engineers at Neuron Nest. The one who wrote perfect code but could not explain it. The one who explained everything but wrote terrible code.',
    content: `
<p>At Neuron Nest I mentor a small team of engineers. I want to be honest about something: I am often barely keeping up myself. There are days I feel like a fraud teaching anyone anything. And yet mentoring has become one of the most valuable things I do, partly for them and, in a way I did not expect, mostly for me.</p>

<h2>Two engineers, opposite problems</h2>

<p>Let me tell you about two of them, because together they taught me almost everything I know about this.</p>

<p>The first wrote beautiful code. Clean, efficient, well structured. You could read it and admire it. But ask him to explain his reasoning in a meeting, or to walk a non-technical stakeholder through a tradeoff, and he froze. The thinking was all there, locked inside, with no way out. His code was a finished building with no doors.</p>

<p>The second was the inverse. He could explain anything. He could stand in front of a whiteboard and make a complex idea feel obvious. People loved working with him. And then you opened his actual code and it was a mess. Tangled, fragile, the kind of thing that works today and breaks mysteriously next week.</p>

<blockquote>One had the engine but no steering wheel. The other had a beautiful steering wheel attached to almost no engine.</blockquote>

<h2>What I learned trying to help them</h2>

<p>My instinct was to fix the gap directly. Teach the quiet one to present, teach the talker to write clean code. That worked a little. But the deeper lesson was for me. I realized I had both of these people inside myself, depending on the day. Sometimes I write clean code and cannot explain why it is right. Sometimes I explain a grand plan and the implementation is held together with hope.</p>

<p>Mentoring forced me to articulate things I did only by instinct. When you have to teach someone why a piece of code is bad, you finally have to know why, in words, instead of just feeling it. The quiet engineer's struggle made me practice explaining. The talker's struggle made me re-examine what clean code actually requires. They were teaching me by being stuck.</p>

<h2>The selfish case for mentoring</h2>

<ul>
  <li>Explaining a concept exposes the holes in your own understanding instantly. There is no hiding from a confused junior.</li>
  <li>Reviewing someone else's code makes you a sharper reader of your own.</li>
  <li>Watching someone make a mistake you used to make shows you how far you have actually come, which you otherwise never notice.</li>
  <li>You learn that there is no single profile of a good engineer. People are strong and weak in completely different places, and a team works when those shapes fit together.</li>
</ul>

<h2>Why I will keep doing it</h2>

<p>Not because I have it all figured out. I do not. But because the act of pulling someone else up forces me to be more deliberate, more honest, and more articulate than I would ever be on my own. The four engineers I work with think I am teaching them. Most days, I am the one taking notes.</p>
`,
  },
  {
    slug: 'ai-for-photography',
    title: 'Building AI Tools for a Photography Studio (No, It Was Not What I Expected)',
    date: 'May 31, 2024',
    readTime: '7 min read',
    category: 'Machine Learning',
    excerpt: 'KS Photography Station. The AI culling pipeline. 2000 wedding photos, four hours of work cut to twenty minutes, and one very skeptical photographer.',
    content: `
<p>When I took on the technical head role at KS Photography Station, I expected to manage computers, set up storage, keep the studio software running. I did not expect to build a machine learning pipeline for culling wedding photos. But that is exactly the project that ended up mattering most, and it surprised me at every step.</p>

<h2>The problem nobody outside the industry knows</h2>

<p>Wedding photography is brutal in a way people do not see. A single wedding can produce two thousand photos, often more. Before any editing happens, someone has to cull. Go through every shot and decide: keep or discard. Eyes closed, out of focus, the same moment shot eight times, pick the best one. This is hours of mind-numbing, high-stakes clicking, and it has to happen for every event.</p>

<blockquote>The glamorous part of photography is the shutter click. The unglamorous part is the human sitting at a screen for hours deciding which clicks were worth it.</blockquote>

<h2>What I built</h2>

<p>An AI-assisted culling pipeline. Not a magic button that does the photographer's job, that is not how it works and anyone who claims it does is selling something. What it does is the first brutal pass. It flags the obvious rejects: shots that are clearly out of focus, faces with closed eyes, near-duplicate frames where it can group the bursts so the human only compares within a group instead of across the whole pile.</p>

<p>The pipeline scores and sorts so that when the photographer sits down, the worst is already filtered and the duplicates are grouped. The human still makes every real artistic decision. The machine just removes the part that was never artistic to begin with.</p>

<ul>
  <li>Focus and sharpness detection to flag the obvious technical rejects.</li>
  <li>Face and eye state checks to surface the closed-eye shots in group photos.</li>
  <li>Near-duplicate grouping so the burst of fifteen near-identical frames becomes one decision, not fifteen.</li>
</ul>

<h2>2000 photos, four hours to twenty minutes</h2>

<p>The number that made everyone pay attention: a culling pass that used to eat around four hours came down to roughly twenty minutes of human review on top of the automated pass. Not because the machine replaced judgment, but because it removed the noise before the judgment started. The photographer's attention went to the photos that actually deserved a decision.</p>

<h2>The skeptical photographer</h2>

<p>Here is my favorite part. The lead photographer was deeply skeptical. And he should have been. His instinct was that no algorithm understands what makes a wedding photo special, the emotion, the moment, the thing you cannot put in a loss function. He was completely right about that, and I told him so.</p>

<p>So I never sold it as a replacement for his eye. I sold it as a way to never spend his eye on a blurry throwaway again. After the first real event, where he got hours of his life back without giving up a single creative call, he flipped. He became the biggest advocate for it in the studio. The skeptic turned into the person explaining it to everyone else.</p>

<h2>What it taught me</h2>

<p>That the best AI tools do not try to do the human's job. They clear the runway so the human can do the part only a human can do. The photographer never wanted to spend four hours rejecting blurry shots. He wanted to spend that time on the photos that mattered. I did not replace his craft. I gave him more room for it. That is the kind of AI work I want to keep doing.</p>
`,
  },
  {
    slug: 'growing-up-with-computers-nepal',
    title: 'Growing Up With Computers in Nepal: From Internet Cafe to Engineering',
    date: 'April 27, 2024',
    readTime: '7 min read',
    category: 'Life',
    excerpt: 'The expensive internet cafe hours, the pirated software, and the first time I wrote a program that did something real.',
    content: `
<p>I did not grow up with a computer in my room and fast internet on tap. That is the version a lot of developers in richer countries had. My version started in an internet cafe, paying by the hour for access to a machine I did not own, and it shaped how I think about technology in ways I am still discovering.</p>

<h2>The cafe hours</h2>

<p>The internet cafe was where the world opened up. You paid by the hour, and that hour mattered because money was tight. You did not idle. You did not browse aimlessly the way people do now. You went in with a plan because the clock was literally running and your rupees were burning. I learned focus there before I learned it anywhere else, because distraction had a price I could feel.</p>

<blockquote>When access to a computer costs money by the hour, you stop wasting time on it. Scarcity teaches focus better than any productivity book.</blockquote>

<h2>Pirated software, and what it really meant</h2>

<p>Let me be honest about something that is uncomfortable but true for a lot of us here. The software I learned on was often pirated. Not because anyone was proud of it, but because legitimate licenses were priced for economies that were not ours. A piece of professional software might cost more than a family earned in months. The choice was not pirate versus buy. It was pirate versus never learn the tool at all.</p>

<p>I am not defending piracy as a principle. I pay for my tools now that I can. But I will not pretend the global software economy was ever fair to a kid in Kathmandu who wanted to learn. The same tools that were a casual purchase elsewhere were a locked door here, and a lot of us learned by picking the lock.</p>

<h2>The first program that did something real</h2>

<p>I remember the first time I wrote code that did something beyond printing to a screen. It was small, almost nothing by today's standards. But it took an input, did something useful with it, and gave back a result that I had not hard-coded. That moment, when the machine did my logic instead of just my typing, rewired something in me. I understood that I could make this thing obey ideas. That was the hook. I have never gotten off it.</p>

<h2>How tech education here works, and does not</h2>

<ul>
  <li>The formal education focuses heavily on theory, sometimes disconnected from how software is actually built and shipped.</li>
  <li>The real learning happens outside the classroom, in self-study, in projects, in late nights with a borrowed tutorial.</li>
  <li>Access to hardware, to fast internet, to paid tools and courses, is uneven, and that unevenness quietly decides who gets ahead.</li>
  <li>The students who make it are often the ones who taught themselves the gap between what school covered and what the industry needs.</li>
</ul>

<h2>Where it left me</h2>

<p>I am a full-stack engineer now, working with companies around the world from this same city. But I did not start with advantages. I started with rented hours on someone else's machine and a stubborn need to understand how things worked. I think that origin made me more resourceful and less precious about tools than I would have been otherwise. When you learn under constraint, you learn to build anyway. That habit never left, and honestly, it is the most useful thing I own.</p>
`,
  },
  {
    slug: 'docs-vs-production',
    title: 'The Gap Between the Documentation and Production Is Where You Grow',
    date: 'March 29, 2024',
    readTime: '6 min read',
    category: 'Engineering',
    excerpt: 'The library that works perfectly in the README. The 3am where nothing makes sense. The realization that everyone is just guessing.',
    content: `
<p>Every library works perfectly in its README. The quickstart is four lines, the example runs, the output is exactly what they promised. Then you use it in production and somewhere between the documentation and reality there is a gap, and that gap is where I have done most of my actual growing as an engineer.</p>

<h2>The README lies, gently</h2>

<p>It is not that documentation is dishonest. It is that documentation shows the happy path. The author had a clean environment, the simplest case, no legacy data, no concurrent users, no weird edge case from a client who entered an emoji into a field that expected a number. The README is a photograph of the tool in perfect lighting. Production is the tool in your messy house at night.</p>

<blockquote>Documentation describes how a tool works. Production teaches you how it breaks. Only one of those makes you better.</blockquote>

<h2>The 3am where nothing makes sense</h2>

<p>You know the one. The thing works on your machine. It worked in staging. It is failing in production and the error message is useless, something deep in a dependency you did not even know you had. The docs do not cover this case because nobody documents the case where their library meets your specific cursed combination of versions and data.</p>

<p>I have spent these nights more times than I want to admit. The home internet flickering, the monitoring screaming, and me reading a stack trace that points into code I have never seen, written by someone I will never meet, for a situation they never imagined. That is the gap. And the only way across it is through.</p>

<h2>The 2014 StackOverflow answer</h2>

<p>And then sometimes, salvation arrives in the form of a StackOverflow answer from 2014, with three upvotes, written by someone who hit the exact same wall a decade ago and was kind enough to write down what fixed it. There is a specific gratitude you feel for these strangers. They had no reason to document their pain for you, and they did it anyway. A lot of working software is held up by these quiet, ancient posts.</p>

<h2>The realization that everyone is guessing</h2>

<p>Here is the thing that changed how I work. At some point in the gap, you realize that the senior engineers, the library authors, the people who seem to just know, are also guessing. They guess better, because they have been burned more, but they are guessing. There is no manual for your exact situation. There never was. Everyone is reasoning from incomplete information and prior scars.</p>

<ul>
  <li>The expert is not someone who knows the answer. It is someone who has a good process for finding it under pressure.</li>
  <li>Reading the source of your dependencies stops being scary and starts being the obvious move.</li>
  <li>The confidence you want is not certainty. It is comfort with not knowing yet.</li>
</ul>

<h2>Why I am grateful for the gap</h2>

<p>Because the README never taught me anything. The gap did. Every painful night in the space between what the docs promised and what production delivered made me a deeper engineer than any tutorial could. I do not enjoy the 3am part. But I have made peace with it, because that is the room where I actually grow, every single time.</p>
`,
  },
  {
    slug: 'open-source-nobody-uses',
    title: 'I Keep Building Open Source Projects Nobody Uses. Here Is Why I Won\'t Stop.',
    date: 'February 24, 2024',
    readTime: '6 min read',
    category: 'Open Source',
    excerpt: 'More than 80 repos. Forks that go nowhere. The occasional star from a stranger in Germany. Why it matters anyway.',
    content: `
<p>I have more than 80 public repositories. If I am honest about it, most of them are used by exactly one person: me. Some have a handful of stars. A few got forked and then the forks went nowhere. By the metric the open source world loves, downloads and adoption and contributors, most of my projects are failures. And I am not going to stop building them.</p>

<h2>The graveyard, and why it is not sad</h2>

<p>Scrolling through my GitHub is like walking through a graveyard of ideas. Half-finished experiments. Tools I built for a problem I had once and never had again. Libraries that solved something for me and turned out to solve it for nobody else. It looks like a record of abandonment.</p>

<p>But I do not read it that way. I read it as a record of curiosity. Every one of those repos is a thing I wanted to understand badly enough to build. The fact that the world did not need it does not erase the fact that building it taught me something.</p>

<blockquote>I do not build open source to be used. I build it to understand. Being used is a nice side effect, not the point.</blockquote>

<h2>The star from Germany</h2>

<p>Every so often, something small happens that makes the whole thing worth it. A stranger, in this case someone in Germany whose name I will never know, stars one of my repos. Just one star. No issue, no message, no fork. But it means that somewhere, far from Kathmandu, a person looked at a thing I made and thought, this is worth remembering.</p>

<p>That tiny signal does more for me than it should. It is proof that the work escaped my own machine and touched someone. In a field where most of my output is private client work under NDA, the public repo is the part of me that is visible to the world, and a single star is the world quietly nodding back.</p>

<h2>What building for the builder means</h2>

<p>There is a phrase I keep coming back to: build for the builder. The first and most important user of anything I make is the version of me who learns by making it. If a project teaches me a new pattern, a new tool, a new way of thinking, it has already paid for itself before anyone else sees it.</p>

<ul>
  <li>The repo nobody uses still taught me the thing I now use everywhere in paid work.</li>
  <li>Writing code in public, even unused code, makes me write it more carefully.</li>
  <li>A portfolio of curiosity says more about an engineer than a portfolio of finished, popular products.</li>
  <li>The act of finishing and pushing, even a small thing, is a muscle, and most people never build it.</li>
</ul>

<h2>Why I will not stop</h2>

<p>Because the metric I am optimizing is not adoption. It is growth, mine. Because every repo is a small act of learning made permanent and public. And because every now and then, a stranger in another country leaves a single star, and for a moment the work is no longer just mine. That is enough. It has always been enough. I will keep building things nobody uses, because the person who needs them most has always been me.</p>
`,
  },
  {
    slug: 'game-theory-and-software',
    title: 'What Game Theory Taught Me About Software Architecture Decisions',
    date: 'January 27, 2024',
    readTime: '7 min read',
    category: 'Engineering',
    excerpt: 'Nash equilibrium and API design. Zero-sum versus positive-sum client relationships. The prisoner\'s dilemma of technical debt.',
    content: `
<p>I took a game theory course on Coursera back in 2023, mostly out of curiosity. I expected it to be abstract math with no bearing on my day job. Instead it quietly rewired how I think about architecture, clients, and the slow-motion negotiations that make up most of an engineer's real decisions.</p>

<h2>Software is full of games</h2>

<p>Game theory studies decisions where your outcome depends on what other people choose. Once you see that frame, you see it everywhere in software. The way different services in a system interact. The way you and a client negotiate scope. The way today's engineering decisions constrain tomorrow's. These are all games, in the technical sense: strategic situations with players, choices, and payoffs.</p>

<blockquote>Most architecture decisions are not technical problems. They are games being played by people who do not realize they are playing.</blockquote>

<h2>Nash equilibrium and API design</h2>

<p>A Nash equilibrium is a state where no player benefits from unilaterally changing their strategy, given what everyone else is doing. Stable, but not necessarily good. APIs reach these equilibria all the time. Two services settle into a way of talking to each other that is stable but ugly, and neither team wants to be the one to change first, because the one who moves first pays the cost while the other coasts.</p>

<p>Recognizing this helped me. When an integration is stuck in a bad-but-stable state, the fix is rarely technical. It is changing the payoffs, usually by getting both sides to move together so nobody eats the cost alone. The equilibrium will not break itself.</p>

<h2>Zero-sum versus positive-sum clients</h2>

<p>This one changed how I pick clients. A zero-sum relationship is one where the client believes that every dollar they save is a dollar they win from you, and vice versa. We are fighting over a fixed pie. These relationships are exhausting and they end badly, because someone always feels robbed.</p>

<p>A positive-sum relationship is one where we both understand that good work makes the pie bigger. The client succeeds, refers me, comes back. I do better work because I am not constantly defending my time. The same hours produce more value for both of us. I have learned to spot the difference early and to walk away from the zero-sum ones, because no rate is high enough to make a fixed-pie fight worth it.</p>

<ul>
  <li>Zero-sum client: haggles every invoice, treats your gain as their loss, churns.</li>
  <li>Positive-sum client: invests in the relationship, pays fairly, both sides compound over time.</li>
  <li>The math says the positive-sum relationship wins over any long horizon. The trick is surviving long enough to be in long relationships.</li>
</ul>

<h2>The prisoner's dilemma of technical debt</h2>

<p>Here is my favorite application. Technical debt is a prisoner's dilemma played against your future self and your team. In the short term, cutting corners pays off. You ship faster, you look good this sprint. If everyone cooperates and writes clean code, everyone wins long term. But each individual is tempted to defect, to cut the corner, because the cost lands later and on someone who might not be them.</p>

<p>The classic result is that without something changing the payoffs, rational players defect and everyone ends up worse. The cure in software is the same as in game theory: change the game so that cooperation is rewarded and defection is visible. Code review, shared ownership, and a culture where the person who left the mess is the person who cleans it. You cannot win the dilemma by willpower. You win it by redesigning the incentives.</p>

<h2>Why this stuck with me</h2>

<p>Because it gave me a vocabulary for things I was already feeling but could not name. The stuck integration, the draining client, the tempting shortcut. They are all games with structure, and structure can be changed. Game theory did not give me new technical skills. It gave me a clearer view of the human systems my technical work lives inside, and that view has been worth more than the code in the course ever was.</p>
`,
  },
  {
    slug: 'context-switching-superpower',
    title: 'Context Switching Is Not Killing Your Focus. It Is Building It.',
    date: 'December 16, 2023',
    readTime: '6 min read',
    category: 'Productivity',
    excerpt: 'The popular take says context switching destroys you. I am going to argue the opposite, from hydrology to web to mobile in a single day.',
    content: `
<p>The popular wisdom is loud and clear: context switching is the enemy. It shatters your focus, it costs you the mythical deep work, it makes you scattered and shallow. I have read all the threads. And after years of doing exactly what they warn against, going from hydrology to web to mobile in a single day, I am going to argue the opposite. Context switching, done a certain way, is not killing your focus. It is building something rarer.</p>

<h2>What a normal day looks like for me</h2>

<p>A normal day might have me debugging a SaaS backend in the morning, reviewing a Flutter mobile screen before lunch, then in the afternoon staring at a hydrological model and climate data for an NGO. Three domains, three mental models, three completely different problem shapes. The productivity blogs would tell me this is a recipe for mediocrity in all three.</p>

<blockquote>The advice to avoid context switching assumes the switches are random noise. Mine are not. They are reps across domains, and reps across domains build something single-domain focus cannot.</blockquote>

<h2>The pattern recognition payoff</h2>

<p>Here is what the warnings miss. When you work across wildly different domains, you start seeing the structures that are common to all of them. A scheduling conflict in a mobile app, a race condition in a backend queue, a competing-demand allocation in a water model. From far enough back, these are the same problem wearing different clothes.</p>

<p>I solve backend problems faster because I have seen the same shape in hydrology. I reason about climate model uncertainty better because I think about it like flaky distributed systems. The cross-domain switching trained a meta-skill: recognizing the deep pattern under the surface details. You cannot build that by going deep in one well forever. You build it by climbing in and out of many.</p>

<h2>The nuance the haters are right about</h2>

<p>I will not pretend it is free. There is a real cost to switching, and the cost is highest when the switches are involuntary and frequent within a single task. Being interrupted every five minutes while writing a function is genuinely destructive. That is true and I am not arguing with it.</p>

<p>The distinction is between micro-interruptions and domain switches:</p>

<ul>
  <li>Micro-interruptions inside a task, the Slack ping mid-function, are pure cost. Defend against these.</li>
  <li>Deliberate domain switches between blocks of focused work are a different animal. These build range.</li>
  <li>The skill is to switch domains at boundaries, not to switch attention in the middle of a thought.</li>
</ul>

<h2>What it actually trains</h2>

<p>Adaptability, first. When you are used to picking up a new domain quickly, no new technology scares you. You have a process for getting up to speed because you do it constantly. Second, transfer. The thing you learned in one field shows up unexpectedly useful in another, and your brain has learned to make that jump. Third, resilience to ambiguity. When you live across domains, you get comfortable not being the deepest expert in the room, and comfortable learning fast instead.</p>

<h2>The contrarian conclusion</h2>

<p>So no, I do not think my context switching is killing my focus. I think years of it built a kind of focus the single-domain specialist never develops: the ability to drop into any problem, find its shape, and connect it to everything else I have seen. The blogs are right that random interruption is poison. They are wrong that deliberate range is the same thing. Range is not the death of focus. It is focus that knows how to travel.</p>
`,
  },
  {
    slug: 'the-deployment-that-broke-everything',
    title: 'The Deployment That Broke Everything and What I Did Next',
    date: 'November 18, 2023',
    readTime: '7 min read',
    category: 'Engineering',
    excerpt: 'A 4pm Friday deploy. The Slack message. The rollback that did not work. Three hours of pure panic, and what I learned about shipping.',
    content: `
<p>I want to tell you about the deployment that broke everything, because the stories engineers tell are usually the clean ones, and the messy ones are where the real lessons live. This one is messy. It was a Friday. I deployed at 4pm. If you are an experienced engineer, you already know I had made my first mistake before anything went wrong.</p>

<h2>The 4pm Friday deploy</h2>

<p>There is a reason "no deploys on Friday" is a cliche. It is a cliche because it is true and we all ignore it anyway. I had a change that was ready, the pressure to ship was real, and 4pm felt fine. The change was not even that big. Small changes are how they get you. You let your guard down precisely when you should not.</p>

<blockquote>The size of the change has nothing to do with the size of the explosion. The smallest deploys cause the biggest fires because nobody watches them closely.</blockquote>

<h2>The Slack message</h2>

<p>Twenty minutes later, the Slack message. Something is broken. Then another. Then the tone shifted from "is something wrong?" to "everything is down." My stomach did the thing stomachs do. I switched into emergency mode, which is a specific state where your hands move faster than your fear, barely.</p>

<h2>The rollback that did not work</h2>

<p>Here is where it got bad. I went to roll back, which is supposed to be the safety net, the whole reason you can deploy with any confidence. And the rollback did not cleanly work. The new code had touched something that did not simply reverse, a data shape, a piece of state, the kind of change that a code rollback alone does not undo. So now I was not just broken, I was broken in a state that my safety net could not catch.</p>

<p>That is the moment the real panic arrives. Not when it breaks. When the thing you were counting on to save you also fails. For a few minutes I genuinely did not know how I was going to get out of it.</p>

<h2>Three hours</h2>

<p>What followed was three hours of the most focused, terrified work I have done. I stopped flailing and forced myself to be methodical:</p>

<ul>
  <li>First, stop the bleeding. Get the system into any stable state, even a degraded one, so users are not staring at errors.</li>
  <li>Second, understand exactly what the deploy changed, including the side effects the rollback could not reverse.</li>
  <li>Third, fix forward where rolling back was impossible. Sometimes the only way out is through.</li>
  <li>Fourth, verify carefully before declaring it over, because a second false "it is fixed" would have destroyed what trust I had left.</li>
</ul>

<p>Three hours later it was genuinely fixed and verified. I was drained in a way that is hard to describe. Not just tired. Hollowed out by sustained adrenaline.</p>

<h2>What I learned about shipping</h2>

<p>A few things, and they stuck permanently. Never deploy when you cannot babysit it, which means never at 4pm Friday. Your rollback is not a real safety net unless you have tested that it actually rolls back, including state and data, not just code. And the calm methodical approach during a crisis beats frantic action every time, even though every nerve in your body is screaming to just do something.</p>

<h2>Why I tell this story</h2>

<p>Because I see junior engineers terrified of breaking production, as if breaking it makes them frauds. It does not. Every engineer I respect has a story like this. The difference between a junior and a senior is not that the senior never breaks things. It is that the senior has broken things, survived, and built the habits that come only from that survival. I broke everything one Friday. I am a better engineer for it. You will be too, when it is your turn, and it will be your turn.</p>
`,
  },
  {
    slug: 'kubernetes-in-small-country',
    title: 'Running Kubernetes in Nepal: What Nobody Warned Me About',
    date: 'October 21, 2023',
    readTime: '7 min read',
    category: 'DevOps',
    excerpt: 'Power cuts during cluster maintenance. Internet that drops mid-deploy. The cost of cloud in rupees. Why I still chose Kubernetes anyway.',
    content: `
<p>Every Kubernetes tutorial assumes a world that does not match mine. Stable power. Fast, reliable internet. Cloud budgets measured in a currency that does not lose value if you blink. I run Kubernetes from Nepal, and the gap between the tutorial world and my world taught me more about resilience than any certification would.</p>

<h2>Power cuts during cluster maintenance</h2>

<p>Picture this. You are in the middle of a cluster operation, a node drain, a careful rolling update, the kind of thing where you want full attention and a stable environment. And the power goes out. Not a graceful shutdown. A hard cut. Load shedding has improved over the years in Nepal, but it is not gone, and it does not check your maintenance window before it hits.</p>

<blockquote>Kubernetes is designed to survive nodes dying. It is less prepared for the operator's laptop dying mid-command because the city lost power.</blockquote>

<p>I learned to never run a critical cluster operation without a charged laptop and a backup power plan. Sounds obvious until you have lost a session halfway through a delicate operation and had to reason about what state the cluster was left in while the lights were off.</p>

<h2>Internet that drops mid-deploy</h2>

<p>The second one. Internet here can drop without warning, sometimes for seconds, sometimes for longer. Now imagine that happening during a deploy, while you are streaming logs, watching a rollout, waiting on a health check. Your connection to the cluster vanishes and you do not know if the operation completed, half-completed, or never started.</p>

<p>This forced good habits on me that engineers with reliable connections never develop. I design operations to be idempotent and resumable. I never assume my session will survive. I check state explicitly rather than trusting that what I saw before the drop is still true. The flaky internet made me a more careful operator, the way scarcity always seems to teach the lessons abundance skips.</p>

<h2>The cost of cloud in rupees</h2>

<p>This is the quiet, constant pressure. Cloud is priced in dollars. I earn and budget in rupees. Every running node, every load balancer, every gigabyte, is a dollar cost that feels heavier when you convert it. The casual over-provisioning that engineers elsewhere do without thinking, just spin up more, is not casual here. It is a real decision with a real weight.</p>

<ul>
  <li>I right-size relentlessly because every idle resource is money I can feel.</li>
  <li>I shut down what does not need to run, instead of leaving it on out of laziness.</li>
  <li>I think hard about managed versus self-hosted, because the convenience premium of managed services adds up fast in a weaker currency.</li>
</ul>

<h2>Why I still chose Kubernetes anyway</h2>

<p>With all this friction, a fair question is why not pick something simpler. And I considered it. For some projects, simpler is the right call and I use it. But for the multi-tenant SaaS I lead, Kubernetes earned its place. The self-healing, the rolling updates, the declarative state that I can reason about and recover toward, those are exactly the properties you want in an environment that is constantly trying to knock you over.</p>

<p>The same chaos that makes Kubernetes harder to operate here is the chaos that makes its resilience features genuinely valuable. In a perfectly stable environment, a lot of Kubernetes is insurance you rarely claim. In my environment, I claim it. The cluster reschedules around a dead node, recovers toward its declared state, and keeps serving while I deal with whatever the city threw at me this time.</p>

<h2>The lesson under the lesson</h2>

<p>Running Kubernetes in Nepal taught me that the constraints are not just obstacles. They are a filter that forces you to actually understand your tools instead of cargo-culting a tutorial. I know my cluster more deeply than I would if everything just worked, because here, nothing just works, and understanding is the only thing that keeps it running.</p>
`,
  },
  {
    slug: 'sprint-journaling',
    title: 'I Started Journaling Every Sprint. Six Months Later, Here Is What Changed.',
    date: 'September 23, 2023',
    readTime: '6 min read',
    category: 'Productivity',
    excerpt: 'The practice, what I write, and the moment I realized the notes were showing me a problem I had been blind to.',
    content: `
<p>Six months ago I started journaling at the end of every sprint. Not a fancy system. Just a few honest paragraphs about what happened, what worked, what did not. I almost did not bother writing this because it sounds so small. But the effect compounded in a way I did not expect, and the most useful thing it revealed had nothing to do with code.</p>

<h2>The practice itself</h2>

<p>At the end of each sprint, before I let myself move on, I write. What did I plan to do, what did I actually do, and where the gap came from. What blocked me. What I underestimated, which is almost always something. How I felt during the sprint, because that turns out to matter more than I assumed. It takes maybe fifteen minutes. The cost is trivial. The payoff was not.</p>

<blockquote>Memory is a liar with a flattering bias. The sprint journal is the only honest witness to how the work actually went.</blockquote>

<h2>What I write, specifically</h2>

<ul>
  <li>The estimate versus the reality, with no excuses, just the number and the truth.</li>
  <li>The thing that surprised me, because the surprises are where the real information is.</li>
  <li>The decision I was unsure about and how it turned out, so I can calibrate my own judgment over time.</li>
  <li>The friction, the recurring annoyances that I would otherwise just absorb and forget.</li>
  <li>One honest line about how I actually felt, which I used to think was irrelevant to engineering and was wrong about.</li>
</ul>

<h2>The moment the pattern appeared</h2>

<p>Here is what made me a believer. After a few months, I went back and read the entries together instead of one at a time. And there it was, plain as anything: I was repeating the same mistakes. The same kind of task kept blowing past its estimate. The same friction showed up sprint after sprint, and I had been treating each instance as a one-off when it was clearly a pattern.</p>

<p>In the moment, each mistake felt fresh and forgivable. Read in sequence, they were obviously the same mistake on a loop. Memory had let me forgive myself every time by forgetting the last time. The journal would not let me.</p>

<h2>The hiring problem hiding in the notes</h2>

<p>The biggest revelation was not about my own work. Reading across the entries, I noticed that a particular category of work kept stalling, sprint after sprint, and it always traced back to the same gap on the team. We did not have the right strength in one specific area, and the symptom showed up as repeated delays that we kept blaming on bad luck or bad estimates.</p>

<p>It was not bad luck. It was a hiring problem, written invisibly across six months of notes. No single sprint would have told me that. The pattern only existed across the whole sequence, and without the journal, the pattern would have stayed invisible while we kept paying for it.</p>

<h2>The unexpected benefits</h2>

<p>Beyond catching patterns, a few things I did not see coming. My estimates got better, because I was finally confronting where they were wrong instead of quietly forgetting. My stress went down, because writing it out at the end of a sprint gave the week a real ending instead of letting it bleed into the next. And I built a record I can actually look back on, which means my growth became visible to me, which is its own quiet motivation.</p>

<h2>Why I am still doing it</h2>

<p>Because fifteen minutes a sprint bought me a clearer view of my own work than years of just doing it ever did. The journal does not let me lie to myself about how things went, and that honesty, painful as it sometimes is, is exactly what makes the next sprint better. If you are not writing down how your sprints actually go, you are flying on a memory that is quietly editing the evidence. Start writing. The patterns are already there. You just cannot see them yet.</p>
`,
  },
  {
    slug: 'on-finishing-what-you-start',
    title: 'On Finishing What You Start (Coming From Someone Who Has 80 Unfinished Repos)',
    date: 'August 26, 2023',
    readTime: '7 min read',
    category: 'Life',
    excerpt: 'The graveyard of side projects. Why they die. The three that made it. And what finishing actually means.',
    content: `
<p>I am going to write about finishing what you start, and I want you to know up front that I have more than 80 repositories, and most of them are unfinished. So this is not a lecture from someone who has it figured out. This is a confession and an investigation, from someone standing in the middle of his own graveyard of side projects, trying to understand why some lived and most died.</p>

<h2>The graveyard</h2>

<p>Every developer has one. The project that was going to be the thing. The idea you were sure about at 2am, that you started with real energy, and that now sits frozen at 60 percent, last commit months ago, README half-written. My GitHub is full of these. Skeletons of enthusiasm. Each one a moment where I cared enough to start and not enough to finish.</p>

<blockquote>Starting is cheap. Anyone can start. The graveyard is full of starts. Finishing is the rare thing, and it is rare for reasons that have almost nothing to do with the code.</blockquote>

<h2>Why they die</h2>

<p>I have thought about this a lot, and the projects do not die for the reasons I tell myself. It is rarely that the idea was bad or the problem was too hard. They die for quieter reasons:</p>

<ul>
  <li>The interesting part got solved. Once I understood the hard bit, the remaining 70 percent was just labor, and labor is not why I started.</li>
  <li>A newer, shinier idea showed up and stole the energy I was supposed to spend finishing this one.</li>
  <li>The project was never a commitment. It was a curiosity, and curiosity has no obligation to finish.</li>
  <li>Finishing means exposing it to judgment, and an unfinished project can never be judged a failure. The graveyard is also a hiding place.</li>
</ul>

<p>That last one is the uncomfortable one. Some projects stay unfinished because finishing them means finding out whether they were any good. As long as it is half-done, the dream is safe.</p>

<h2>The three that made it</h2>

<p>But some did make it to production, to real users, to actually mattering. And when I look at what was different about those three, it was not that they were better ideas. The difference was structural:</p>

<p>They had an external commitment. A client, a deadline, a person who was waiting and would notice if I disappeared. The accountability lived outside my own fragile motivation. My own enthusiasm is a terrible engine, it runs hot and dies fast. An obligation to another human runs steady.</p>

<p>They had a real, narrow definition of done. Not "the best version imaginable," which is never finished, but "this specific thing works for this specific person." A finish line I could actually cross, instead of a horizon that moves every time I get close.</p>

<h2>What finishing actually means</h2>

<p>Here is what I have come to believe. Finishing is not about the final commit. It is about crossing from "this is for me to play with" to "this is for someone to rely on." That crossing changes everything. The standards go up. The boring 70 percent becomes non-negotiable. The thing has to actually work, not just demonstrate the clever idea.</p>

<p>A hobby project and a commitment are different species, and I had been confusing them for years. The hobby project is allowed to die. That is fine, that is healthy, that is how you learn cheaply. The problem is only when you wanted a commitment and built a hobby, when you needed the thing to ship and never gave it the structure that makes shipping happen.</p>

<h2>What I am doing about it</h2>

<p>I have stopped feeling guilty about the graveyard. Those 80 repos are not 80 failures. Most were never meant to be finished. They were curiosity made visible, and they taught me things I use every day. But for the projects I actually want to ship, I have learned to give them what the surviving three had: an external commitment, a person waiting, and a narrow definition of done I can actually reach. Motivation does not finish projects. Structure does. I learned that from a graveyard, which is, I suppose, a finished thing in its own way.</p>
`,
  },
];

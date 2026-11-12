
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Megaphone,
  Monitor,
  Search,
  X,
  Radio,
  Users,
  CalendarDays,
  Code2,
  Star,
  Quote,
  ChevronDown,
  MoveUpRight,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "../animations/gsap";
import "../styles/moreSections.css";

const caseStudies = [
  ["ILG Luxury Group x DMS | Case Study", "ilg.jpg", "ilg.pdf"],
  ["Dubai Duty Free x DMS | Case Study", "dubai-duty-free.jpg", "dubai-duty-free.pdf"],
  ["Danube x DMS | Case Study", "danube.jpg", "danube.pdf"],
  ["KSA Influencers x DMS | Case Study", "lenskart-p.png", "ksa.pdf"],
  ["BNW Developers x DMS | Case Study", "bnw.jpg", "bnw.pdf"],
  ["AYS Developers x DMS | Case Study", "ays.jpg", "ays.pdf"],
  ["Jetour x DMS | Case Study", "jetour.jpg", "jetour.pdf"],
  ["Tranquil Developers x DMS | Case Study", "tranquil.jpg", "tranquil.pdf"],
].map(([title, image, pdf]) => ({
  title,
  image: `https://datamysite.com/public/case-studies/cover/${image}`,
  pdf: `https://datamysite.com/public/case-studies/${pdf}`,
}));

const metrics = [
  { value: 87, label: "Digital Media Buying" },
  { value: 96, label: "OOH Media Buying" },
  { value: 80, label: "Experiential Marketing" },
];

const services = [
  {
    icon: Monitor,
    title: "Digital Marketing",
    description: "Whether you are a startup, SME, or established enterprise, our team of experts ensures your digital marketing campaigns are tailored to your business objectives, audience, and industry trends.",
    url: "/digital-marketing",
  },
  {
    icon: Megaphone,
    title: "Outdoor Advertising",
    description: "We specialize in providing innovative outdoor advertising solutions designed to increase brand visibility and engagement across Dubai and the UAE.",
    url: "/outdoor-advertising",
  },
  {
    icon: Monitor,
    title: "Digital Advertising",
    description: "Maximise your reach with data-driven media buying across OTT platforms, premium websites, and apps for optimal results.",
    url: "/digital-advertising",
  },
  {
    icon: Users,
    title: "Influencer Marketing",
    description: "Access 4,500+ influencers across the GCC to boost your brand and drive targeted engagement.",
    url: "/influencer-marketing",
  },
  {
    icon: Code2,
    title: "Website Development",
    description: "At DataMySite (DMS), we don't just build websites — we engineer high-performing digital experiences designed to convert visitors into loyal customers.",
    url: "/website-development",
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "We offer result-driven SEO services tailored to boost your website's visibility, drive organic traffic, and improve search engine rankings across Dubai and the UAE.",
    url: "/seo-services",
  },
  {
    icon: Globe2,
    title: "Transit Media",
    description: "Through in-flight and airport advertising, powerful opportunities for reaching both international and domestic travelers, ideal for global campaigns.",
    url: "/transit-media",
  },
  {
    icon: Star,
    title: "Celebrity Marketing",
    description: "We specialize in celebrity marketing strategies to help your brand reach the right audience, increase credibility, and boost sales across Dubai and the UAE.",
    url: "/celebrity-marketing",
  },
  {
    icon: Users,
    title: "Public Relations - PR Coverage",
    description: "Elevate your brand's presence with TOP PR Media houses internationally that secure high-impact media placements and amplify your message.",
    url: "/public-relations-pr-coverage",
  },
  {
    icon: CalendarDays,
    title: "Event Marketing",
    description: "We offer event marketing services to ensure your event makes a lasting impact, whether it's a product launch, a corporate event or a trade show.",
    url: "/event-marketing",
  },
  {
    icon: Star,
    title: "Sponsorships",
    description: "Sponsorships are a powerful way to enhance brand visibility, build credibility, and connect with your target audience.",
    url: "/sponsorships",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description: "We specialize in crafting tailored lead-generation strategies that drive results for businesses in Dubai and across the UAE.",
    url: "/lead-generation",
  },
  {
    icon: Radio,
    title: "Radio Advertising",
    description: "Radio advertising remains a powerful medium in Dubai, reaching listeners during commutes, work hours, and leisure time.",
    url: "/radio-advertising",
  },
  {
    icon: Monitor,
    title: "Creative and CGI Advertising",
    description: "DataMySite's Creative and CGI Advertising services transform ordinary campaigns into extraordinary experiences.",
    url: "/creative-and-cgi-advertising",
  },
  {
    icon: Star,
    title: "Experiential Marketing",
    description: "We specialize in experiential marketing campaigns in Dubai and across the UAE, offering innovative solutions that leave lasting impressions and drive engagement, awareness, and leads.",
    url: "/experiential-marketing",
  },
  {
    icon: Globe2,
    title: "Global Marketing",
    description: "We combine strategic localization, cross-border media expertise, and data-driven execution to ensure your campaigns achieve measurable results — anywhere in the world.",
    url: "/global-marketing",
  },
];

const testimonials = [
  {
    initials: "AM",
    name: "Ahmed Al Mansoori",
    date: "2 months ago",
    text: "DataMySite team delivered an outstanding campaign for our real estate project. The billboard placements on Sheikh Zayed Road were perfectly targeted and the results exceeded our expectations. Highly professional and responsive team!",
  },
  {
    initials: "SH",
    name: "Sara Hassan",
    date: "3 months ago",
    text: "We worked with DataMySite for influencer marketing across the GCC and the reach was incredible. They have a massive network and know exactly which influencers to pair with each brand. Our product sold out within weeks of the campaign going live.",
  },
  {
    initials: "MT",
    name: "Mohammed Tariq",
    date: "4 months ago",
    text: "Got our brand featured in Gulf News and Forbes Middle East through DataMySite. The PR team was very professional — they handled the full content writing and editorial relationship. Excellent ROI and the backlinks have boosted our SEO rankings significantly.",
  },
  {
    initials: "RS",
    name: "Riya Sharma",
    date: "5 months ago",
    text: "We hired DataMySite for transit media across Dubai Metro and taxi fleet. The campaign ran across 5 key stations and the brand visibility was phenomenal. Within 3 weeks we saw a 40% spike in website traffic from Dubai. Very impressed!",
  },
  {
    initials: "KR",
    name: "Khalid Al Rashid",
    date: "6 months ago",
    text: "DataMySite helped us with a full 360 campaign — digital, OOH and influencer marketing for our automotive launch in UAE. The coordination across all channels was seamless and results were beyond expectations. Will definitely work with them again.",
  },
  {
    initials: "NA",
    name: "Nadia Al Farsi",
    date: "7 months ago",
    text: "We needed a strong SEO strategy for our e-commerce brand in Dubai. DataMySite delivered a detailed audit, fixed all technical issues and built quality backlinks. We went from page 4 to page 1 on Google in less than 3 months. Highly recommend!",
  },
  {
    initials: "FM",
    name: "Faisal Mahmood",
    date: "8 months ago",
    text: "Best advertising agency in Dubai, hands down. DataMySite managed our full campaign from concept to execution across billboards, metro, and social media. Communication was excellent throughout and delivery was always on time. 100% recommend.",
  },
  {
    initials: "LB",
    name: "Layla Benali",
    date: "9 months ago",
    text: "The team at DataMySite is incredibly knowledgeable about the UAE market. They recommended the perfect mix of transit and digital channels for our hospitality brand and managed everything professionally. A truly full-service agency.",
  },
  {
    initials: "OQ",
    name: "Omar Qureshi",
    date: "10 months ago",
    text: "Exceptional service from start to finish. DataMySite's expertise in outdoor advertising is unmatched in Dubai. They secured prime billboard spots that were exactly what our campaign needed, and the creative production quality was top notch.",
  },
];

const blogs = [
  {
    category: "MARKETING",
    title: "Marketing Budget Benchmarks for Dubai Businesses in 2026",
    description: "Understand how businesses can plan and allocate their marketing budgets in a competitive market.",
    image: "970261026030812.webp",
  },
  {
    category: "ADVERTISING",
    title: "Top Advertising Agencies in Dubai (2026): Who Does What Best",
    description: "A look at advertising services and the capabilities businesses should consider when choosing an agency.",
    image: "969261026030701.jfif",
  },
  {
    category: "INFLUENCER MARKETING",
    title: "Influencer vs Celebrity Marketing: Which Wins in the UAE",
    description: "Explore the differences between influencer and celebrity partnerships and how to choose a suitable approach.",
    image: "968261026030603.jfif",
  },
];

const faqs = [
  {
    category: "general",
    q: "What does an advertising agency in Dubai do?",
    a: "An advertising agency helps businesses plan, create and execute campaigns across relevant channels. DataMySite offers integrated advertising and marketing solutions, including outdoor advertising, digital campaigns, influencer marketing, PR, transit media and lead generation.",
  },
  {
    category: "general",
    q: "Why should I choose a full-service marketing agency?",
    a: "A full-service agency can coordinate different marketing channels under one strategy. This helps maintain consistent messaging, simplify campaign management and align activity with business objectives.",
  },
  {
    category: "general",
    q: "Does DataMySite provide advertising services across the UAE?",
    a: "DataMySite offers advertising and marketing solutions across Dubai and the UAE, with campaign options spanning outdoor, digital, transit, influencer and public relations channels.",
  },
  {
    category: "general",
    q: "How can I get started with DataMySite?",
    a: "You can contact the team through the website enquiry options or call/WhatsApp +971 52 528 7259 to discuss your campaign requirements.",
  },
  {
    category: "outdoor",
    q: "What types of outdoor advertising are available in Dubai?",
    a: "Outdoor advertising options include billboards, unipoles, lamp posts, bridge banners, flyers distribution and human billboards. The right format depends on your target audience, location and campaign objective.",
  },
  {
    category: "outdoor",
    q: "How much does billboard advertising cost in Dubai?",
    a: "Billboard advertising costs depend on location, format, visibility, campaign duration and availability. Contact the team with your preferred areas and campaign period for a tailored quotation.",
  },
  {
    category: "outdoor",
    q: "Which locations are best for outdoor advertising?",
    a: "The best locations depend on your audience and campaign objective. High-traffic roads, commercial districts, retail destinations and residential communities can each serve different campaign needs.",
  },
  {
    category: "outdoor",
    q: "What is the difference between billboards and unipoles?",
    a: "Both are outdoor advertising formats. Their structure, placement, size and visibility can differ. The suitable option depends on the campaign location, viewing distance and audience movement.",
  },
  {
    category: "outdoor",
    q: "Can outdoor advertising campaigns target specific areas?",
    a: "Yes. Campaigns can be planned around selected areas and audience movement patterns, subject to inventory availability and applicable permissions.",
  },
  {
    category: "digital",
    q: "What is DOOH advertising?",
    a: "Digital Out-of-Home (DOOH) advertising uses digital screens in public and commercial spaces to display campaign content. It can provide flexible creative scheduling and high-visibility placements.",
  },
  {
    category: "digital",
    q: "Where can digital screen advertising be placed in Dubai?",
    a: "Digital screens can be found in locations such as malls, hotels, elevators, transport hubs and other public or commercial environments. Availability depends on the selected media network.",
  },
  {
    category: "digital",
    q: "What is OTT advertising?",
    a: "Over-the-top (OTT) advertising places video ads within internet-delivered streaming content. It allows brands to reach audiences through connected devices and streaming platforms.",
  },
  {
    category: "digital",
    q: "Can digital advertising campaigns be measured?",
    a: "Digital campaigns can use platform and campaign reporting to monitor relevant performance indicators, such as reach, impressions, clicks and conversions, depending on the channel.",
  },
  {
    category: "transit",
    q: "What is transit media advertising?",
    a: "Transit media advertising places brand messages on or around transport environments, including taxis, buses, metro systems, airports, boats and other moving or passenger-facing media.",
  },
  {
    category: "transit",
    q: "Can I advertise on taxis and buses in Dubai?",
    a: "Taxi and bus advertising are transit media options. Campaign availability, routes, formats and durations depend on the relevant media inventory and approvals.",
  },
  {
    category: "transit",
    q: "Is airport advertising suitable for international brands?",
    a: "Airport advertising can be useful for brands seeking visibility among travellers and international audiences. The right placement depends on passenger profile, campaign objective and available inventory.",
  },
  {
    category: "transit",
    q: "How long should a transit advertising campaign run?",
    a: "Campaign duration depends on the objective, media format, budget and audience exposure needed. A campaign plan should account for the time required to build awareness and recall.",
  },
  {
    category: "influencer",
    q: "How does influencer marketing work in the UAE?",
    a: "Influencer marketing connects brands with creators whose audiences match the campaign's target market. Campaigns may include sponsored posts, videos, event appearances and other content formats.",
  },
  {
    category: "influencer",
    q: "What is the difference between nano, micro and macro influencers?",
    a: "These terms generally describe creators by audience size. Nano and micro influencers often have smaller, more focused communities, while macro influencers reach larger audiences. Selection should consider relevance and engagement, not follower count alone.",
  },
  {
    category: "influencer",
    q: "Can brands work with celebrities for marketing campaigns?",
    a: "Celebrity marketing can support brand awareness and credibility through partnerships with public personalities. Campaign scope, availability and suitability depend on the brand and selected personality.",
  },
  {
    category: "seo",
    q: "How can PR coverage help my business?",
    a: "PR coverage can increase brand visibility and support reputation-building by placing relevant stories or announcements in suitable media publications.",
  },
  {
    category: "seo",
    q: "What is event marketing?",
    a: "Event marketing uses live or virtual experiences to connect brands with audiences. It can include launches, activations, exhibitions, sponsorships and experiential campaigns.",
  },
  {
    category: "seo",
    q: "What are the benefits of sponsorship marketing?",
    a: "Sponsorships can help brands reach relevant communities, build associations and create visibility around events, activities or organisations that align with their audience.",
  },
  {
    category: "seo",
    q: "What is the best way to improve my website's SEO?",
    a: "SEO improvements typically involve technical health, useful content, relevant keywords, site speed, mobile usability and quality links. The right priorities depend on an audit of the website and its competitive landscape.",
  },
  {
    category: "seo",
    q: "What should I look for when hiring a website development company in Dubai?",
    a: "Look for a team that builds mobile-responsive, fast-loading, SEO-optimised websites from day one — not as an afterthought. You also need ongoing maintenance support and proven e-commerce capability. DataMySite's web development team builds custom full-stack websites, high-converting e-commerce stores, and offers ongoing maintenance covering security patches, performance tuning, and content updates.",
  },
  {
    category: "seo",
    q: "What is the reach of radio advertising across different languages in the UAE?",
    a: "Radio in the UAE reaches a uniquely diverse audience — with Arabic, English, Hindi, Urdu, and Malayalam stations each serving distinct demographic communities. This makes radio one of the most targeted mass-reach formats in the country for multilingual campaigns. DataMySite plans and places radio ads across English, Arabic, Hindi/Urdu, and other multilingual stations in the UAE, allowing brands to precisely target each expat community with culturally relevant messaging.",
  },
  {
    category: "seo",
    q: "What is cost-per-lead advertising and is it suitable for businesses in the UAE?",
    a: "Cost-per-lead (CPL) is a performance marketing model where you pay only for verified, qualified leads — not impressions, clicks, or views. It offers predictable, measurable ROI and is ideal for high-ticket sectors. DataMySite runs CPL campaigns for real estate developers, educational institutions, financial services, healthcare businesses, and e-commerce brands across the UAE — delivering qualified enquiries with full tracking and reporting transparency.",
  },
  {
    category: "seo",
    q: "What are the most creative and memorable advertising formats available in Dubai?",
    a: "Dubai's appetite for the spectacular makes it one of the best markets for high-impact creative advertising. The most memorable formats include anamorphic 3D billboard CGI content, Tesla and luxury vehicle wraps as moving billboards, hot air balloon advertising over the skyline, interactive mall activations, and TopGolf brand sponsorships. DataMySite specialises in all of these experiential and CGI formats — creating content designed to go viral on social media and generate organic earned impressions far beyond the original placement.",
  },
];

const faqCategories = [
  ["all", "All Questions", 28],
  ["general", "General", 4],
  ["outdoor", "Outdoor Advertising", 5],
  ["digital", "Digital & DOOH", 4],
  ["transit", "Transit Media", 4],
  ["influencer", "Influencer & Celebrity", 3],
  ["seo", "PR, Events, Digital & SEO", 8],
];

const site = (path) => `https://datamysite.com${path}`;

/* ─── DUAL COUNTER-ROTATING MARQUEE BANDS ────────────────────────── */
function Ticker() {
  const track1 = useRef(null);
  const track2 = useRef(null);

  useGSAP(() => {
    if (track1.current) {
      gsap.to(track1.current, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    }
    if (track2.current) {
      gsap.fromTo(
        track2.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 32,
          repeat: -1,
        }
      );
    }
  }, []);

  const words = [
    "OUTDOOR",
    "DOOH",
    "TRANSIT",
    "INFLUENCERS",
    "PR COVERAGE",
    "SEO",
    "RADIO",
    "EVENTS",
    "CGI",
    "PERFORMANCE",
  ];
  const line = words.join(" ✦ ") + " ✦ ";
  const repeated = line.repeat(3);

  return (
    <div className="dual-bands-wrap" aria-hidden="true">
      <div className="band band-primary">
        <div className="band-track" ref={track1}>
          <span>{repeated}</span>
          <span>{repeated}</span>
        </div>
      </div>
      <div className="band band-accent">
        <div className="band-track" ref={track2}>
          <span>{repeated}</span>
          <span>{repeated}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION HEADING ────────────────────────────────────────────── */
function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className={`more-heading ${dark ? "is-dark" : ""}`}>
      <span className="more-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

/* ─── CASE STUDIES ───────────────────────────────────────────────── */
function CaseStudies() {
  const rail = useRef(null);
  const section = useRef(null);
  const [isCaseHovered, setIsCaseHovered] = useState(false);

  const move = (direction) => {
    rail.current?.scrollBy({
      left: direction * (rail.current.clientWidth * 0.78),
      behavior: "smooth",
    });
  };

  // Continuous auto-slide for case studies gallery
  useEffect(() => {
    if (isCaseHovered) return;
    const timer = setInterval(() => {
      if (!rail.current) return;
      const maxScroll = rail.current.scrollWidth - rail.current.clientWidth;
      if (rail.current.scrollLeft >= maxScroll - 20) {
        rail.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        rail.current.scrollBy({
          left: rail.current.clientWidth * 0.45,
          behavior: "smooth",
        });
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [isCaseHovered]);

  useGSAP(() => {
    // Heading clip-path reveal
    const heading = section.current?.querySelector(".more-heading h2");
    if (heading) {
      gsap.fromTo(
        heading,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        }
      );
    }

    // Case tiles: staggered y + rotation
    const tiles = gsap.utils.toArray(".case-tile", section.current);
    if (tiles.length) {
      gsap.from(tiles, {
        y: 60,
        rotation: 2,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: rail.current, start: "top 88%", once: true },
      });
    }

    // Image scale on enter
    const images = gsap.utils.toArray(".case-image img", section.current);
    images.forEach((img) => {
      gsap.from(img, {
        scale: 1.15,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: img, start: "top 90%", once: true },
      });
    });
  }, { scope: section });

  return (
    <section className="more-section case-section" id="case-studies" ref={section}>
      <div className="more-container">
        <div className="case-heading-row">
          <SectionHeading
            eyebrow="SELECTED WORK"
            title="Ideas in action."
            description="At DataMySite, we believe in transparency and trust. Sharing case studies allows us to demonstrate the tangible impact of our marketing and advertising solutions."
          />
          <div className="case-controls">
            <a className="more-outline-link" href={site("/client-case-studies")}>
              View all projects <ArrowUpRight size={16} />
            </a>
            <button onClick={() => move(-1)} aria-label="Previous case studies">
              <ArrowLeft size={19} />
            </button>
            <button onClick={() => move(1)} aria-label="Next case studies">
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        <div
          className="horizontal-rail case-rail"
          ref={rail}
          onMouseEnter={() => setIsCaseHovered(true)}
          onMouseLeave={() => setIsCaseHovered(false)}
          onTouchStart={() => setIsCaseHovered(true)}
          onTouchEnd={() => setIsCaseHovered(false)}
        >
          {caseStudies.map((item, index) => (
            <a
              className="case-tile"
              href={item.pdf}
              target="_blank"
              rel="noreferrer"
              key={item.title}
            >
              <div className="case-image">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="case-index">0{index + 1}</span>
                <span className="case-open"><ArrowUpRight size={22} /></span>
              </div>
              <div className="case-caption">
                <span>CASE STUDY / 2026</span>
                <h3>{item.title}</h3>
                <p>View case study <MoveUpRight size={15} /></p>
              </div>
            </a>
          ))}
        </div>
        <div className="rail-hint">SWIPE OR USE THE ARROWS TO EXPLORE</div>
      </div>
    </section>
  );
}

/* ─── WHAT WE DO ─────────────────────────────────────────────────── */
function WhatWeDo() {
  const section = useRef(null);

  useGSAP(() => {
    // Metric rings counter + stroke animation
    const circles = gsap.utils.toArray(".metric-ring", section.current);
    circles.forEach((circle) => {
      const target = Number(circle.dataset.value);
      const number = circle.querySelector(".metric-value");
      const progress = circle.querySelector(".metric-progress");
      const circumference = 2 * Math.PI * 86;
      gsap.set(progress, { strokeDasharray: circumference, strokeDashoffset: circumference });

      gsap.to({ value: 0 }, {
        value: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: circle, start: "top 85%", once: true },
        onUpdate: function () {
          const value = Math.round(this.targets()[0].value);
          number.textContent = value;
          gsap.set(progress, {
            strokeDashoffset: circumference * (1 - value / 100),
          });
        },
      });
    });

    // Heading reveal
    const heading = section.current?.querySelector(".what-copy h2");
    if (heading) {
      gsap.from(heading, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 85%", once: true },
      });
    }

    // what-copy elements stagger from right
    const copyEls = gsap.utils.toArray(".what-copy > *", section.current);
    if (copyEls.length) {
      gsap.from(copyEls, {
        x: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current?.querySelector(".what-copy"), start: "top 82%", once: true },
      });
    }

    // Floating animation on metric-rings container
    const ringsEl = section.current?.querySelector(".metric-rings");
    if (ringsEl) {
      gsap.to(ringsEl, {
        y: -12,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, { scope: section });

  return (
    <section className="what-section" id="what-we-do" ref={section}>
      <div className="more-container">
        <span className="more-eyebrow">WHAT WE DO</span>
        <div className="what-layout">
          <div className="metric-rings">
            {metrics.map((metric) => (
              <div className="metric-item" key={metric.label}>
                <div className="metric-ring" data-value={metric.value}>
                  <svg viewBox="0 0 200 200" aria-hidden="true">
                    <circle className="metric-track" cx="100" cy="100" r="86" />
                    <circle className="metric-progress" cx="100" cy="100" r="86" />
                  </svg>
                  <strong><span className="metric-value">0</span>%</strong>
                </div>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="what-copy">
            <span>DataMySite</span>
            <h2>Marketing solutions for your business's growth.</h2>
            <p>Elevate your brand visibility and boost sales with integrated media, creative and marketing solutions.</p>
            <a href="#services" className="more-red-link">
              Discover what we do <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES WITH INTERACTIVE HOVER PEEK ────────────────────────── */
function Services() {
  const section = useRef(null);
  const peekRef = useRef(null);
  const [peekActive, setPeekActive] = useState(false);
  const [peekImg, setPeekImg] = useState("");

  const serviceImages = [
    "https://datamysite.com/public/assets/img/service/1.png",
    "https://datamysite.com/public/assets/img/service/2.png",
    "https://datamysite.com/public/assets/img/service/3.png",
    "https://datamysite.com/public/case-studies/cover/dubai-duty-free.jpg",
    "https://datamysite.com/public/case-studies/cover/danube.jpg",
    "https://datamysite.com/public/case-studies/cover/lenskart-p.png",
    "https://datamysite.com/public/case-studies/cover/bnw.jpg",
    "https://datamysite.com/public/case-studies/cover/ays.jpg",
    "https://datamysite.com/public/case-studies/cover/jetour.jpg",
    "https://datamysite.com/public/case-studies/cover/tranquil.jpg",
    "https://datamysite.com/public/case-studies/cover/ilg.jpg",
    "https://datamysite.com/public/assets/img/service/1.png",
    "https://datamysite.com/public/assets/img/service/2.png",
    "https://datamysite.com/public/assets/img/service/3.png",
    "https://datamysite.com/public/case-studies/cover/dubai-duty-free.jpg",
    "https://datamysite.com/public/case-studies/cover/danube.jpg",
  ];

  useGSAP(() => {
    // Heading reveal
    const heading = section.current?.querySelector(".more-heading h2");
    if (heading) {
      gsap.from(heading, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 85%", once: true },
      });
    }

    // Service items from x:-30
    const items = gsap.utils.toArray(".service-item", section.current);
    if (items.length) {
      gsap.from(items, {
        x: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current?.querySelector(".services-list"), start: "top 80%", once: true },
      });
    }
  }, { scope: section });

  const handleServiceEnter = (imgSrc) => {
    setPeekImg(imgSrc);
    setPeekActive(true);
  };

  const handleServiceLeave = () => {
    setPeekActive(false);
  };

  const handleMouseMove = (e) => {
    if (!peekRef.current) return;
    const x = e.clientX + 24;
    const y = e.clientY - 90;
    peekRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(4deg)`;
  };

  return (
    <section
      className="more-section services-section"
      id="services"
      ref={section}
      onMouseMove={handleMouseMove}
    >
      {/* Floating service peek thumbnail */}
      <div
        className={`service-peek ${peekActive ? "is-visible" : ""}`}
        ref={peekRef}
        aria-hidden="true"
      >
        {peekImg && <img src={peekImg} alt="" />}
      </div>

      <div className="more-container" style={{ position: "relative" }}>
        {/* Decorative background text */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(100px, 15vw, 200px)",
            fontWeight: 900,
            letterSpacing: "-.05em",
            color: "var(--navy, #1A2820)",
            opacity: 0.04,
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
            lineHeight: 1,
          }}
        >
          SERVICES
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <SectionHeading
            eyebrow="OUR SERVICES"
            title="Everything your brand needs to move forward."
            description="Marketing Solutions for Your Business's Growth. Elevate Your Brand Visibility and Boost Sales."
          />
          <div className="services-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              const imgSrc = serviceImages[index % serviceImages.length];
              return (
                <a
                  className="service-item"
                  href={site(service.url)}
                  key={service.title}
                  onMouseEnter={() => handleServiceEnter(imgSrc)}
                  onMouseLeave={handleServiceLeave}
                >
                  <span className="service-count">0{index + 1}</span>
                  <span className="service-icon"><Icon size={22} /></span>
                  <span className="service-info">
                    <strong>{service.title}</strong>
                    <small>{service.description}</small>
                  </span>
                  <span className="service-arrow"><ArrowUpRight size={21} /></span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CLIENTS WALL (INFINITE LOGO MARQUEE) ─────────────────────────── */
const clientLogos = [
  [38, "Nike"],
  [12, "Intel"],
  [35, "Whole Foods"],
  [31, "e&"],
  [1, "Dubai Duty Free"],
  [4, "DAMAC"],
  [17, "MakeMyTrip"],
  [6, "Lenskart"],
  [16, "Cerruti"],
  [3, "Danube Properties"],
  [2, "Jetour"],
  [39, "Géant"],
  [36, "Haldiram's"],
  [37, "GMG"],
  [25, "Al Rawabi"],
  [28, "Al Ain Farms"],
  [20, "SIVVI"],
  [40, "Aswaaq"],
  [7, "Logicom Group"],
  [5, "ILG"],
  [24, "MARQ Dubai"],
  [26, "Hayata"],
  [27, "Cavo"],
  [13, "Elite Group Holding"],
  [14, "BNW Developments"],
  [8, "Arabian Hills"],
  [19, "Tranquil Developers"],
  [21, "Prime Estate"],
  [18, "Oscar Luxury Auto"],
  [15, "AYS Developers"],
  [32, "USI Consultancy"],
  [34, "First Super Car Rental"],
  [33, "Royalty Tourism"],
  [29, "Darcey Flowers"],
  [30, "Peace Homes"],
  [9, "D's Damat"],
  [10, "Metamind Inspire"],
  [11, "Ask Kubeir"],
  [22, "Lasa Ona"],
  [23, "Just Love UAE"],
  [41, "Royal"],
];

function ClientsWall() {
  const row1 = clientLogos.slice(0, 21);
  const row2 = clientLogos.slice(21);

  return (
    <section className="clients-wall-section" id="clients">
      <div className="more-container">
        <div className="cl-head">
          <div>
            <span className="more-eyebrow">OUR CLIENTS</span>
            <h2 className="cl-title">
              Brands we <span className="cl-outline">work with</span>
            </h2>
          </div>
          <p className="cl-desc">
            At DataMySite, we are proud to partner with a diverse range of clients across various industries, from ambitious startups to established global enterprises.
          </p>
        </div>
      </div>

      <div className="cl-wall" aria-hidden="true">
        <div className="cl-row">
          {[...row1, ...row1].map(([num, name], idx) => (
            <div className="lgo" key={`r1-${num}-${idx}`}>
              <img
                src={`https://datamysite.com/public/assets/img/clients-final/${num}.png`}
                alt={`${name} logo`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML = `<span class="nm">${name}</span>`;
                }}
              />
            </div>
          ))}
        </div>
        <div className="cl-row rev">
          {[...row2, ...row2].map(([num, name], idx) => (
            <div className="lgo" key={`r2-${num}-${idx}`}>
              <img
                src={`https://datamysite.com/public/assets/img/clients-final/${num}.png`}
                alt={`${name} logo`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML = `<span class="nm">${name}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────── */
function Testimonials() {
  const rail = useRef(null);
  const section = useRef(null);
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth container-only scrolling with zero vertical jump
  const scrollToCard = (index) => {
    if (!rail.current) return;
    const target = rail.current.children[index];
    if (target) {
      const railLeft = rail.current.getBoundingClientRect().left;
      const targetLeft = target.getBoundingClientRect().left;
      const scrollOffset = targetLeft - railLeft + rail.current.scrollLeft;
      rail.current.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
      setActive(index);
    }
  };

  const move = (direction) => {
    const next = (active + direction + testimonials.length) % testimonials.length;
    scrollToCard(next);
  };

  // Continuous auto-slide timer that pauses on hover or touch
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % testimonials.length;
        if (rail.current && rail.current.children[next]) {
          const railLeft = rail.current.getBoundingClientRect().left;
          const targetLeft = rail.current.children[next].getBoundingClientRect().left;
          const scrollOffset = targetLeft - railLeft + rail.current.scrollLeft;
          rail.current.scrollTo({ left: scrollOffset, behavior: "smooth" });
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Sync active dot indicator when user manually swipes/scrolls on mobile
  useEffect(() => {
    const el = rail.current;
    if (!el) return;

    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!el || !el.children.length) return;
        const currentLeft = el.scrollLeft;
        let closestIndex = 0;
        let minDiff = Infinity;
        for (let i = 0; i < el.children.length; i++) {
          const child = el.children[i];
          const diff = Math.abs(child.offsetLeft - el.offsetLeft - currentLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
          }
        }
        setActive(closestIndex);
      }, 80);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useGSAP(() => {
    // Heading reveal
    const heading = section.current?.querySelector(".more-heading h2");
    if (heading) {
      gsap.from(heading, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 85%", once: true },
      });
    }

    // Cards animate in from y:40
    const cards = gsap.utils.toArray(".testimonial-card", section.current);
    if (cards.length) {
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rail.current, start: "top 85%", once: true },
      });
    }
  }, { scope: section });

  return (
    <section className="more-section testimonials-section" id="testimonials" ref={section}>
      <div className="more-container">
        <div className="testimonial-heading-row">
          <SectionHeading
            eyebrow="CLIENT TESTIMONIALS"
            title={<>Trusted by businesses across <em>Dubai & UAE.</em></>}
          />
          <a
            className="google-rating"
            href="https://www.google.com/maps/place/DMS+-+DataMySite+Marketing/@24.9978253,55.1727716,936m/data=!3m1!1e3!4m8!3m7!1s0x3e5f7347c3a1a1d1:0xad7a49fd99d3061!8m2!3d24.9978253!4d55.1727716!9m1!1b1!16s%2Fg%2F11ybf42kl_?entry=ttu"
            target="_blank"
            rel="noreferrer"
          >
            <span className="google-g">G</span>
            <span><strong>5.0 <b>★★★★★</b></strong><small>Based on 46 Google reviews</small></span>
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="testimonial-toolbar">
          <span><i /> What our clients say</span>
          <div>
            <button
              onClick={() => move(-1)}
              aria-label="Previous testimonial"
              className="slider-nav-btn"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => move(1)}
              aria-label="Next testimonial"
              className="slider-nav-btn"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="horizontal-rail testimonial-rail"
          ref={rail}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {testimonials.map((review, index) => (
            <article className="testimonial-card" key={review.name}>
              <div className="testimonial-top">
                <span className={`review-avatar avatar-${index}`}>{review.initials}</span>
                <div><strong>{review.name}</strong><small>{review.date}</small></div>
                <span className="review-stars">★★★★★</span>
              </div>
              <Quote className="quote-icon" size={30} />
              <p>{review.text}</p>
              <span className="review-google">GOOGLE REVIEW</span>
            </article>
          ))}
        </div>

        <div className="testimonial-bottom">
          <div className="testimonial-dots">
            {testimonials.map((review, index) => (
              <button
                key={review.name}
                className={active === index ? "active" : ""}
                onClick={() => scrollToCard(index)}
                aria-label={`Show review ${index + 1}`}
              />
            ))}
          </div>
          <span>{String(active + 1).padStart(2, "0")} / 09</span>
        </div>
      </div>
    </section>
  );
}

/* ─── BLOGS ──────────────────────────────────────────────────────── */
function Blogs() {
  const section = useRef(null);

  useGSAP(() => {
    // Heading reveal
    const heading = section.current?.querySelector(".more-heading h2");
    if (heading) {
      gsap.from(heading, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 85%", once: true },
      });
    }

    // Blog tiles staggered with y:50 + slight rotation
    const tiles = gsap.utils.toArray(".blog-tile", section.current);
    if (tiles.length) {
      gsap.from(tiles, {
        y: 50,
        rotation: 1.5,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section.current?.querySelector(".blog-cards"), start: "top 82%", once: true },
      });
    }
  }, { scope: section });

  return (
    <section className="more-section blogs-section" id="blogs" ref={section}>
      <div className="more-container">
        <div className="blog-heading-row">
          <SectionHeading
            eyebrow="BLOGS"
            title="What's going on in the industry?"
          />
          <a href={site("/blogs")} className="more-red-link">
            View all blogs <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="blog-cards">
          {blogs.map((blog) => (
            <article className="blog-tile" key={blog.title}>
              <a href={site("/blogs")} className="blog-image">
                <img
                  src={`https://datamysite.com/public/storage/blogs/${blog.image}`}
                  alt={blog.title}
                  loading="lazy"
                />
                <span><ArrowUpRight size={20} /></span>
              </a>
              <div className="blog-content">
                <span>{blog.category}</span>
                <h3><a href={site("/blogs")}>{blog.title}</a></h3>
                <p>{blog.description}</p>
                <a className="blog-read" href={site("/blogs")}>Read more <ArrowUpRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────── */
function FAQItem({ faq, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;

    if (isOpen) {
      // Animate open: height 0 → auto, opacity 0 → 1
      gsap.set(el, { height: 0, opacity: 0, display: "block" });
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Animate closed
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;
    gsap.to(icon, {
      rotation: isOpen ? 180 : 0,
      duration: 0.35,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  return (
    <article className={`faq-item ${isOpen ? "open" : ""}`} key={faq.number}>
      <button
        className="faq-question"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{String(faq.number).padStart(2, "0")}</span>
        <strong>{faq.q}</strong>
        <b ref={iconRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronDown size={18} />
        </b>
      </button>
      <div
        className="faq-answer"
        ref={answerRef}
        style={{ height: 0, opacity: 0, display: "none", overflow: "hidden" }}
      >
        <p>{faq.a}</p>
      </div>
    </article>
  );
}

function FAQ() {
  const section = useRef(null);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = faqs
    .map((faq, index) => ({ ...faq, number: index + 1 }))
    .filter((faq) => category === "all" || faq.category === category)
    .filter((faq) => `${faq.q} ${faq.a}`.toLowerCase().includes(search.toLowerCase()));

  const reset = () => {
    setCategory("all");
    setSearch("");
    setOpen(null);
  };

  useGSAP(() => {
    const heading = section.current?.querySelector(".more-heading h2");
    if (heading) {
      gsap.from(heading, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 85%", once: true },
      });
    }
  }, { scope: section });

  return (
    <section className="more-section faq-section" id="faq" ref={section}>
      <div className="more-container">
        <SectionHeading
          eyebrow="GOT QUESTIONS?"
          title="Frequently asked questions."
          description="Everything you need to know about advertising and marketing in Dubai and the UAE."
        />

        <div className="faq-layout">
          <aside className="faq-categories">
            <div className="faq-category-title">
              <span>EXPLORE TOPICS</span>
              <b>28 FAQs</b>
            </div>
            {faqCategories.map(([value, label, count]) => (
              <button
                key={value}
                className={category === value ? "active" : ""}
                onClick={() => {
                  setCategory(value);
                  setOpen(null);
                }}
              >
                {label}<span>{count}</span>
              </button>
            ))}
          </aside>

          <div className="faq-main">
            <div className="faq-search">
              <Search size={18} />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setOpen(null);
                }}
                placeholder="Search frequently asked questions..."
                aria-label="Search FAQs"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="faq-results">
              <span>Showing {filtered.length} of 28 questions</span>
              <button onClick={reset}>Reset filters</button>
            </div>

            <div className="faq-items">
              {filtered.map((faq) => (
                <FAQItem
                  key={faq.number}
                  faq={faq}
                  isOpen={open === faq.number}
                  onToggle={() => setOpen(open === faq.number ? null : faq.number)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="faq-no-results">
                  <Search size={25} />
                  <strong>No matching questions found</strong>
                  <p>Try another search term or choose a different category.</p>
                  <button onClick={reset}>Clear filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA + FOOTER ───────────────────────────────────────────────── */
function CTAFooter() {
  const [newsletter, setNewsletter] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const ctaSection = useRef(null);
  const ctaHeading = useRef(null);
  const ctaBg = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);

  const demoSubmit = (event, setMessage, message) => {
    event.preventDefault();
    setMessage(message);
  };

  useGSAP(() => {
    // Heading dramatic clip-path reveal
    if (ctaHeading.current) {
      gsap.from(ctaHeading.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ctaHeading.current, start: "top 80%", once: true },
      });
    }

    // Background gradient shift animation
    if (ctaBg.current) {
      gsap.to(ctaBg.current, {
        backgroundPosition: "100% 50%",
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // Floating orbs
    if (orb1.current) {
      gsap.to(orb1.current, {
        y: -30,
        x: 15,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
    if (orb2.current) {
      gsap.to(orb2.current, {
        y: 25,
        x: -20,
        duration: 5.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }
  }, { scope: ctaSection });

  return (
    <>
      <section className="final-cta" id="contact" ref={ctaSection}>
        {/* Animated background layer */}
        <div
          className="cta-animated-bg"
          ref={ctaBg}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #062F26 0%, #0B4A3A 40%, #0d5e49 70%, #062F26 100%)",
            backgroundSize: "250% 250%",
            backgroundPosition: "0% 50%",
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        {/* Decorative orbs */}
        <div
          className="cta-orb"
          ref={orb1}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224,75,67,0.18) 0%, transparent 70%)",
            top: "-60px",
            right: "10%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          className="cta-orb"
          ref={orb2}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(11,74,58,0.4) 0%, transparent 70%)",
            bottom: "-40px",
            left: "5%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div className="cta-glow" style={{ zIndex: 2, position: "relative" }} />
        <div className="more-container cta-inner" style={{ position: "relative", zIndex: 2 }}>
          <div>
            <span className="more-eyebrow">SCHEDULE YOUR APPOINTMENT TODAY</span>
            <h2 ref={ctaHeading}>Don't miss out on the opportunity to elevate your advertising game.</h2>
            <p>Smarter Marketing, Better Outcomes. Boost your brand's visibility, enhance campaign performance.</p>
          </div>
          <a href={site("/enquiry")} className="cta-button">
            Get Started – Free Consultation <ArrowUpRight size={19} />
          </a>
        </div>
      </section>

      <footer className="new-footer">
        <div className="more-container footer-columns">
          <div className="footer-brand">
            <img src="https://datamysite.com/public/assets/img/mini-logo-white.png" alt="DataMySite" />
            <p>Smarter Marketing, Better Outcomes. Boost your brand's visibility, enhance campaign performance.</p>
            <em style={{ display: "block", fontStyle: "italic", color: "rgba(255,255,255,0.55)", fontSize: "12px", marginBottom: "18px", lineHeight: 1.5 }}>
              Make Your Brand Impossible to Ignore
            </em>
            <strong>Call / WhatsApp</strong>
            <a href="tel:+971525287259">+971 52 528 7259</a>
            <a href="mailto:contact@datamysite.com">contact@datamysite.com</a>
            <p>Office - 205, Al Bayan Building, Dubai Investment Park, Dubai - UAE.</p>
          </div>

          <div>
            <h3>Services</h3>
            <div className="footer-links">
              {services.slice(0, 8).map((service) => (
                <a href={site(service.url)} key={service.title}>{service.title}</a>
              ))}
            </div>
          </div>

          <div>
            <h3>Quick Links</h3>
            <div className="footer-links">
              <a href={site("/blogs")}>Blogs</a>
              <a href={site("/services")}>Services</a>
              <a href={site("/about-us")}>About Us</a>
              <a href={site("/contact-us")}>Contact Us</a>
              <a href={site("/faq")}>FAQ</a>
              <a href={site("/client-case-studies")}>Case Studies</a>
              <a href={site("/privacy-policy")}>Privacy Policy</a>
              <a href={site("/terms-conditions")}>Terms & Conditions</a>
            </div>
            <h3 className="footer-subheading">Follow DataMySite</h3>
            <div className="footer-links">
              <a href="https://www.linkedin.com/company/datamysite/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://www.instagram.com/datamysite/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://www.pinterest.com/DataMySiteDubai/_profile/" target="_blank" rel="noreferrer">Pinterest ↗</a>
              <a href="https://x.com/DataMySite" target="_blank" rel="noreferrer">X ↗</a>
              <a href="https://www.youtube.com/@DataMySiteMarketing" target="_blank" rel="noreferrer">YouTube ↗</a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h3>Support</h3>
            <p>Need a Help?</p>
            <h3 className="footer-subheading">Subscribe Our Newsletter</h3>
            <p>Sign up now and get the edge!</p>
            <form onSubmit={(event) => demoSubmit(
              event,
              setNewsletterMessage,
              "Design preview only — no subscription was submitted."
            )}>
              <input
                type="email"
                value={newsletter}
                onChange={(event) => setNewsletter(event.target.value)}
                placeholder="Your Email"
                required
                aria-label="Your email"
              />
              <button type="submit">Subscribe <ArrowUpRight size={16} /></button>
            </form>
            {newsletterMessage && <small className="demo-message">{newsletterMessage}</small>}
          </div>
        </div>

        {/* Mega animated branding text */}
        <div className="footer-mega-text" aria-hidden="true">
          <span>DataMySite</span>
        </div>

        <div className="footer-copyright">
          <div className="more-container">
            Copyright © <strong>DataMySite</strong> 2026. All Rights Reserved. Powered By <strong>Dar Alafkar Marketing LLC.</strong>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://api.whatsapp.com/send/?phone=971525287259"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with DataMySite on WhatsApp"
      >
        <img src="https://datamysite.com/public/whatsapp-icon2.png" alt="" />
      </a>

      <div className="mobile-contact-bar">
        <a href="tel:+971525287259">Call</a>
        <a href="https://api.whatsapp.com/send/?phone=971525287259" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="#contact">Enquire</a>
      </div>
    </>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────── */
export default function MoreSections() {
  const page = useRef(null);

  useGSAP(() => {
    // Batch similar reveal elements
    ScrollTrigger.batch(".more-heading", {
      onEnter: (batch) =>
        gsap.from(batch, {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
        }),
      start: "top 88%",
      once: true,
    });
  }, { scope: page });

  return (
    <div ref={page}>
      <Ticker />
      <CaseStudies />
      <WhatWeDo />
      <Services />
      <ClientsWall />
      <Testimonials />
      <Blogs />
      <FAQ />
      <CTAFooter />
    </div>
  );
}

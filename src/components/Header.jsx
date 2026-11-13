
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

const navigation = [
  {
    name: "Digital",
    links: [
      ["Digital Marketing", "/digital-marketing"],
      ["Social Media Marketing", "/digital-marketing/social-media-marketing"],
      ["Content Creation & Marketing", "/digital-marketing/content-marketing"],
    ],
  },
  {
    name: "Outdoor",
    links: [
      ["Outdoor Advertising", "/outdoor-advertising"],
      ["Billboards Advertising", "/outdoor-advertising/billboards-advertising"],
      ["Flyers Distribution", "/outdoor-advertising/flyers-distribution"],
      ["Human Billboards", "/outdoor-advertising/human-billboards"],
      ["Unipoles", "/outdoor-advertising/unipoles"],
      ["Lamp Post", "/outdoor-advertising/lamp-post"],
      ["Bridge Banners", "/outdoor-advertising/bridge-banners"],
    ],
  },
  {
    name: "DOOH",
    links: [
      ["Digital Advertising", "/digital-advertising"],
      ["OTT Advertising", "/digital-advertising/ott-advertising"],
      ["DOOH Advertising", "/digital-advertising/dooh-advertising"],
      ["Hotel Digital Screens Advertising", "/digital-advertising/hotel-digital-screens-advertising"],
      ["Elevator Advertising", "/digital-advertising/elevator-advertising"],
    ],
  },
  {
    name: "Influencer",
    links: [
      ["Influencer Marketing", "/influencer-marketing"],
      ["Nano Influencer", "/influencer-marketing/nano-influencer"],
      ["Micro Influencer", "/influencer-marketing/micro-influencer"],
      ["Macro Influencer", "/influencer-marketing/macro-influencer"],
    ],
  },
  {
    name: "SEO",
    links: [
      ["SEO Services", "/seo-services"],
      ["Local SEO", "/seo-services/local-seo"],
      ["SEO in Abu Dhabi", "/seo-services/abu-dhabi"],
      ["SEO Audit", "/seo-services/seo-audit"],
      ["Technical SEO", "/seo-services/technical-seo"],
      ["Ecommerce SEO", "/seo-services/ecommerce-seo"],
      ["AI SEO Geo", "/seo-services/ai-seo-geo"],
      ["Arabic SEO", "/seo-services/arabic-seo"],
      ["SEO Consultant", "/seo-services/seo-consultant"],
      ["Small Business SEO", "/seo-services/small-business-seo"],
      ["Case Studies", "/seo-services/case-studies"],
      ["Price & Package", "/seo-services/price-and-package"],
    ],
  },
  {
    name: "Transit",
    links: [
      ["Transit Media", "/transit-media"],
      ["Airline Advertising", "/transit-media/airline-advertising"],
      ["Taxi Advertising", "/transit-media/taxi-advertising"],
      ["Bus Advertising", "/transit-media/bus-advertising"],
      ["Metro Ads", "/transit-media/metro-ads"],
      ["Airport Advertising", "/transit-media/airport-advertising"],
      ["Boat Advertising", "/transit-media/boat-advertising"],
      ["Tram Advertising", "/transit-media/tram-advertising"],
      ["Truck Advertising", "/transit-media/truck-advertising"],
    ],
  },
  {
    name: "Celebrity",
    links: [
      ["Celebrity Marketing", "/celebrity-marketing"],
      ["Sports Personalities", "/celebrity-marketing/sport-personalities"],
      ["Bollywood Celebrities", "/celebrity-marketing/bollywood-celebrities"],
    ],
  },
  {
    name: "PR",
    links: [
      ["Public Relations - PR Coverage", "/public-relations-pr-coverage"],
      ["Gulf News", "/public-relations-pr-coverage/gulf-news"],
      ["Forbes", "/public-relations-pr-coverage/forbes"],
      ["Khaleej Time", "/public-relations-pr-coverage/khaleej-time"],
      ["Arabian News", "/public-relations-pr-coverage/arabian-news"],
    ],
  },
  {
    name: "Leads",
    links: [
      ["Lead Generation", "/lead-generation"],
      ["Cost-Per-Lead (CPL)", "/lead-generation/cost-per-lead"],
    ],
  },
  {
    name: "Radio",
    links: [
      ["Radio Advertising", "/radio-advertising"],
      ["English Stations", "/radio-advertising/english-stations"],
      ["Arabic Stations", "/radio-advertising/arabic-stations"],
      ["Hindi / Urdu Stations", "/radio-advertising/hindi-urdu-stations"],
      ["Other Stations", "/radio-advertising/other-stations"],
    ],
  },
];

const mainLinks = [
  ["Home", "https://datamysite.com"],
  ["Services", "https://datamysite.com/services"],
  ["Case Studies", "https://datamysite.com/client-case-studies"],
  ["Blogs", "https://datamysite.com/blogs"],
  ["About Us", "https://datamysite.com/about-us"],
  ["Contact Us", "https://datamysite.com/contact-us"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuToggleRef = useRef(null);

  /* ── Scroll detection → .scrolled class ── */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Escape key closes mobile menu ── */
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        setActiveDropdown(null);
        requestAnimationFrame(() => menuToggleRef.current?.focus());
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /* ── Lock body scroll while mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    setActiveDropdown(null);
    requestAnimationFrame(() => menuToggleRef.current?.focus());
  }

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}`}
      ref={headerRef}
    >
      <div className="topbar">
        <div className="header-container topbar-inner">
          <a href="https://api.whatsapp.com/send/?phone=971525287259">
            +971 52 528 7259
          </a>

          <span className="topbar-message">
            Get Your Free Dubai Marketing Strategy Call
          </span>

          <nav className="top-links">
            {mainLinks.map(([label, url]) => (
              <a href={url} key={label}>{label}</a>
            ))}
          </nav>

          <a className="top-book" href="#contact">Book Now</a>
        </div>
      </div>

      <div className="navigation">
        <div className="header-container nav-inner">
          <a className="brand-logo" href="https://datamysite.com" aria-label="DataMySite home">
            <img
              src="https://datamysite.com/public/assets/img/logo.png"
              alt="DataMySite"
            />
          </a>

          <a className="mobile-phone" href="https://api.whatsapp.com/send/?phone=971525287259">
            +971 52 528 7259
          </a>

          <button
            className="menu-toggle"
            ref={menuToggleRef}
            onClick={() => {
              if (menuOpen) closeMenu();
              else setMenuOpen(true);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="service-navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          {/* Backdrop for mobile menu */}
          <div
            className={`nav-backdrop${menuOpen ? " visible" : ""}`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          <nav
            id="service-navigation"
            className={`service-navigation${menuOpen ? " mobile-open" : ""}`}
          >
            {navigation.map((item) => (
              <div
                className={`nav-dropdown${activeDropdown === item.name ? " is-open" : ""}`}
                key={item.name}
              >
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === item.name ? null : item.name)
                  }
                  aria-expanded={activeDropdown === item.name}
                >
                  {item.name}
                  <ChevronDown size={13} />
                </button>

                <div className="dropdown-panel">
                  {item.links.map(([label, url], index) => (
                    <a
                      href={`https://datamysite.com${url}`}
                      key={label}
                      onClick={closeMenu}
                    >
                      {label}
                      {index === 0 && <ArrowUpRight size={13} />}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

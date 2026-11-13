
import { useRef } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "../animations/gsap";
import "../styles/solutions.css";

const solutions = [
  {
    number: "01",
    category: "OUTDOOR ADVERTISING",
    title: "Billboards",
    accent: "Advertising",
    description:
      "Billboards dominate outdoor advertising with their commanding presence in high-traffic areas.",
    image: "https://datamysite.com/public/assets/img/service/1.png",
    link: "https://datamysite.com/outdoor-advertising/billboards-advertising",
    className: "solution-billboard",
  },
  {
    number: "02",
    category: "CREATOR ECONOMY",
    title: "Influencer",
    accent: "Marketing",
    description:
      "Access 4,500+ influencers across the GCC to boost your brand and drive targeted engagement.",
    image: "https://datamysite.com/public/assets/img/service/2.png",
    link: "https://datamysite.com/influencer-marketing",
    className: "solution-influencer",
  },
  {
    number: "03",
    category: "BRAND AUTHORITY",
    title: "PR",
    accent: "Coverage",
    description:
      "Elevate your brand’s presence with TOP PR Media houses internationally that secure high-impact media placements and amplify your message.",
    image: "https://datamysite.com/public/assets/img/service/3.png",
    link: "https://datamysite.com/public-relations-pr-coverage",
    className: "solution-pr",
  },
];

export default function Solutions() {
  const section = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".solution-card");

      gsap.from(".solutions-heading > *", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 78%",
        },
      });

      cards.forEach((card, index) => {
        const image = card.querySelector(".solution-image");
        const content = card.querySelector(".solution-content");

        gsap.from(card, {
          y: 90,
          opacity: 0,
          rotate: index === 1 ? 2 : -1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });

        gsap.from(image, {
          scale: 1.2,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });

        gsap.from(content.children, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 90%",
          },
        });
      });

      gsap.to(".solutions-watermark", {
        xPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      return () => {
        ScrollTrigger.refresh();
      };
    },
    { scope: section }
  );

  function handleMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 5,
      rotateX: -y * 5,
      transformPerspective: 900,
      duration: 0.25,
      ease: "power1.out",
    });
  }

  function handleMouseLeave(e) {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.55,
      ease: "power2.out",
    });
  }

  return (
    <section className="solutions-section" id="solutions" ref={section}>
      <div className="solutions-watermark" aria-hidden="true">
        SOLUTIONS · SOLUTIONS · SOLUTIONS ·
      </div>

      <div className="solutions-container">
        <div className="solutions-heading">
          <div className="solutions-heading-left">
            <span className="solutions-eyebrow">
              <span className="solutions-eyebrow-dot" />
              BEST SOLUTIONS
            </span>

            <h2>
              For your
              <br />
              business<span className="solutions-heading-period">.</span>
            </h2>
          </div>

          <div className="solutions-heading-right">
            {/* <span className="solutions-index">01 / WHAT WE DO</span> */}
            <p>
              We connect brands with people through bold ideas,
              powerful media and experiences that make an impact.
            </p>
            <a href="#services" className="solutions-all-link">
              Explore all services
              <span><MoveUpRight size={17} /></span>
            </a>
          </div>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution) => (
            <article
              className={`solution-card ${solution.className}`}
              key={solution.number}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className="solution-card-link"
                href={solution.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Explore ${solution.title} ${solution.accent}`}
              >
                <div className="solution-image-wrap">
                  <img
                    className="solution-image"
                    src={solution.image}
                    alt={`${solution.title} ${solution.accent}`}
                    loading="lazy"
                  />

                  <div className="solution-image-shade" />

                  <span className="solution-number">
                    {solution.number}
                  </span>

                  <span className="solution-image-category">
                    {solution.category}
                  </span>

                  <span className="solution-image-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </div>

                <div className="solution-content">
                  <span className="solution-card-label">
                    FEATURED SOLUTION
                  </span>

                  <h3>
                    {solution.title}
                    <span>{solution.accent}</span>
                  </h3>

                  <p>{solution.description}</p>

                  <span className="solution-read-more">
                    Discover more
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="solutions-footer">
          <span>CREATIVE THINKING. MEASURABLE IMPACT.</span>
          <span>SCROLL TO DISCOVER <MoveUpRight size={13} /></span>
        </div>
      </div>
    </section>
  );
}

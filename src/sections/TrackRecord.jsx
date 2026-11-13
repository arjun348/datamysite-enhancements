
import { useRef } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "../animations/gsap";
import "../styles/trackRecord.css";

const statistics = [
  {
    value: 1219,
    label: "Successful Project",
    number: "01",
  },
  {
    value: 20,
    label: "Team Experience",
    number: "02",
  },
  {
    value: 5,
    label: "Winning Awards",
    number: "03",
  },
  {
    value: 81,
    label: "Satisfied Clients",
    number: "04",
  },
];

export default function TrackRecord() {
  const section = useRef(null);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray(".track-counter");

      gsap.from(".track-copy > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".track-stat", {
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".track-stats-grid",
          start: "top 82%",
          once: true,
        },
      });

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);

        const value = { current: 0 };

        gsap.to(value, {
          current: target,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => {
            counter.textContent =
              Math.floor(value.current).toLocaleString("en-US") + " +";
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.to(".track-orb", {
        y: -55,
        x: 35,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".track-watermark", {
        xPercent: -15,
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

  return (
    <section className="track-section" id="track-record" ref={section}>
      <div className="track-orb track-orb-one" />
      <div className="track-orb track-orb-two" />

      <div className="track-watermark" aria-hidden="true">
        RESULTS · RESULTS · RESULTS ·
      </div>

      <div className="track-container">
        <div className="track-topline">
          <span>
            <span className="track-live-dot" />
            OUR TRACK RECORD
          </span>

          {/* <span className="track-section-number">
            02 / THE NUMBERS
          </span> */}
        </div>

        <div className="track-layout">
          <div className="track-copy">
            <span className="track-label">
              <TrendingUp size={15} />
              BUILT ON RESULTS
            </span>

            <h2>
              Our successful
              <br />
              projects<span>.</span>
            </h2>

            <p>
              Every great brand has a story. At DataMySite, we help you
              write the next chapter with powerful campaigns across
              billboards, DOOH, influencer marketing, PR coverage,
              lead generation, event marketing, and sponsorships.
              Your success story starts here.
            </p>

            <a
              href="https://datamysite.com/client-case-studies"
              className="track-link"
              target="_blank"
              rel="noreferrer"
            >
              Explore our work
              <span>
                <ArrowUpRight size={18} />
              </span>
            </a>

            <div className="track-note">
              <span className="track-note-line" />
              <span>CREATIVITY MEETS PERFORMANCE</span>
            </div>
          </div>

          <div className="track-stats-grid">
            {statistics.map((stat) => (
              <article className="track-stat" key={stat.number}>
                <div className="track-stat-top">
                  {/* <span>{stat.number}</span> */}
                  <ArrowUpRight size={17} />
                </div>

                <h3
                  className="track-counter"
                  data-target={stat.value}
                >
                  0 +
                </h3>

                <p>{stat.label}</p>

                <div className="track-stat-line">
                  <span />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="track-bottom">
          <span>DATA · CREATIVITY · IMPACT</span>
          <span>MAKING BRANDS IMPOSSIBLE TO IGNORE</span>
        </div>
      </div>
    </section>
  );
}

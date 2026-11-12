
import { useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, Star, LockKeyhole } from "lucide-react";
import { gsap, useGSAP } from "../animations/gsap";

export default function Hero() {
  const container = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

    intro
      .from(".hero-kicker", { y: 25, opacity: 0, duration: 0.7 })
      .from(".hero-title-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.13,
      }, "-=0.35")
      .from(".hero-description", { y: 25, opacity: 0, duration: 0.7 }, "-=0.45")
      .from(".hero-points li", {
        x: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
      }, "-=0.35")
      .from(".hero-form-card", {
        y: 50,
        opacity: 0,
        rotateX: 8,
        duration: 1,
      }, "-=0.8")
      .from(".hero-float-img", {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.9")
      .from(".hero-form-trust span", {
        y: 12,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
      }, "-=0.4");

    gsap.to(".hero-orb-one", {
      x: 35,
      y: -25,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".hero-orb-two", {
      x: -25,
      y: 30,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: container });

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 550);
  }

  return (
    <section className="hero-section" ref={container}>
      <div className="hero-background" />
      <div className="hero-grid-overlay" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      {/* Kinetic Speed lines */}
      <div className="speed-lines" aria-hidden="true">
        <i style={{ top: "15%", "--t": "2.2s", "--dl": "0s", width: "32%" }} />
        <i style={{ top: "35%", "--t": "3.1s", "--dl": "1.2s", width: "40%" }} />
        <i style={{ top: "55%", "--t": "2.6s", "--dl": "0.5s", width: "28%" }} />
        <i style={{ top: "72%", "--t": "3.5s", "--dl": "1.8s", width: "35%" }} />
        <i style={{ top: "85%", "--t": "2.8s", "--dl": "0.9s", width: "45%" }} />
      </div>

      {/* Rotating Agency Badge */}
      <div className="hero-badge" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <path
              id="heroBadgeCirc"
              d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
            />
          </defs>
          <text>
            <textPath href="#heroBadgeCirc">
              DUBAI'S #1 AGENCY • DATAMYSITE • DUBAI'S #1 AGENCY •
            </textPath>
          </text>
        </svg>
        <strong>20+</strong>
      </div>

      {/* Floating decorative image — bottom right, clipped to rounded rect */}
      <img
        className="hero-float-img"
        src="https://datamysite.com/public/assets/img/background/banner.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
      />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="kicker-dot" />
            DUBAI · UAE · BEYOND
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">Advertising and</span>
            <span className="hero-title-line">Marketing Agency</span>
            <span className="hero-title-line">
              in <em>Dubai.</em>
            </span>
          </h1>

          <p className="hero-description">
            People do not buy goods and services.
            <br />
            They buy relations, stories, and magic.
          </p>

          <ul className="hero-points">
            <li><Check size={17} /> Ideas that make brands memorable</li>
            <li><Check size={17} /> Campaigns built to move people</li>
          </ul>

          <a href="#solutions" className="hero-explore">
            Explore what we do
            <span><ArrowDownRight size={18} /></span>
          </a>
        </div>

        <form className="hero-form-card" onSubmit={handleSubmit}>
          <div className="form-topline">
            <span>LET'S MAKE SOMETHING MATTER</span>
            <span className="form-index">01 / 04</span>
          </div>

          <h2>Ready to get <span>results?</span></h2>
          <p>Drop us your details — our experts respond within 60 minutes.</p>

          {submitted ? (
            <div className="form-success animated-success">
              <div className="success-icon-badge">
                <Check size={32} />
              </div>
              <strong>Thank you for your interest!</strong>
              <p>Our Dubai marketing experts will review your request.</p>
              <span className="demo-notice">This is a frontend demo. No enquiry has been sent.</span>
              <button
                type="button"
                className="btn-resubmit"
                onClick={() => setSubmitted(false)}
              >
                Submit another enquiry ↺
              </button>
            </div>
          ) : (
            <>
              <label>
                <span>Your full name</span>
                <input name="name" placeholder="John Smith" required />
              </label>

              <label>
                <span>Phone number</span>
                <input name="phone" type="tel" placeholder="+971" required />
              </label>

              <label>
                <span>Email address</span>
                <input name="email" type="email" placeholder="john@company.com" required />
              </label>

              <label>
                <span>Tell us what you need</span>
                <textarea
                  name="description"
                  rows="2"
                  placeholder="A little about your project..."
                />
              </label>

              <button
                className={`form-submit ${submitting ? "is-submitting" : ""}`}
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="btn-spinner-wrap">
                    <span className="btn-spinner" /> Processing...
                  </span>
                ) : (
                  <>
                    Get Free Consultation
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </>
          )}

          <div className="hero-form-trust">
            <span><Star size={14} /> No spam, ever</span>
            <span><Check size={14} /> Reply in 60 min</span>
            <span><LockKeyhole size={14} /> 100% Private</span>
          </div>
        </form>
      </div>

      <div className="hero-bottom-note">
        <span>INTEGRATED BRAND EXPERIENCES</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}

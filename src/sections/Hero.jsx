
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, Check, Star, LockKeyhole } from "lucide-react";
import { gsap, useGSAP } from "../animations/gsap";

const submitConfetti = [
  [-46, -34, -110, "#e04b43"],
  [-30, -58, 75, "#0b4a3a"],
  [-12, -42, 140, "#e5aa37"],
  [12, -56, -65, "#e04b43"],
  [33, -42, 105, "#0b4a3a"],
  [48, -22, -125, "#e5aa37"],
  [-53, 5, 65, "#0b4a3a"],
  [-34, 28, -80, "#e04b43"],
  [-15, 44, 130, "#e5aa37"],
  [13, 47, -115, "#0b4a3a"],
  [34, 28, 85, "#e04b43"],
  [53, 4, -55, "#e5aa37"],
];

export default function Hero() {
  const container = useRef(null);
  const [submissionState, setSubmissionState] = useState("idle");
  const submissionLock = useRef(false);
  const submissionTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(submissionTimer.current), []);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
    if (submissionLock.current) return;

    window.clearTimeout(submissionTimer.current);
    submissionLock.current = true;
    setSubmissionState("preparing");
    submissionTimer.current = window.setTimeout(() => {
      submissionLock.current = false;
      setSubmissionState("ready");
    }, 700);
  }

  function handleFieldChange() {
    if (submissionState === "ready") setSubmissionState("idle");
  }

  const preparing = submissionState === "preparing";
  const confirmationReady = submissionState === "ready";

  return (
    <section className="hero-section" ref={container}>
      <div className="hero-background" aria-hidden="true">
        <div className="hero-background-pan" />
      </div>
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

        <form className="hero-form-card" onSubmit={handleSubmit} aria-busy={preparing}>
          <div className="form-topline">
            <span>LET'S MAKE SOMETHING MATTER</span>
            {/* <span className="form-index">01 / 04</span> */}
          </div>

          <h2>Ready to get <span>results?</span></h2>
          <p>Outline your project below, then connect with our team directly.</p>

          <label>
            <span>Your full name</span>
            <input name="name" placeholder="John Smith" onChange={handleFieldChange} />
          </label>

          <label>
            <span>Phone number</span>
            <input name="phone" type="tel" placeholder="+971" onChange={handleFieldChange} />
          </label>

          <label>
            <span>Email address</span>
            <input name="email" type="email" placeholder="john@company.com" onChange={handleFieldChange} />
          </label>

          <label>
            <span>Tell us what you need</span>
            <textarea
              name="description"
              rows="2"
              placeholder="A little about your project..."
              onChange={handleFieldChange}
            />
          </label>

          <div className="hero-submit-wrap">
            {confirmationReady ? (
              <section className="form-confirmation" role="status" aria-live="polite">
                <div className="form-confirmation-icon">
                  <Check size={20} aria-hidden="true" />
                </div>
                <div className="form-confirmation-content">
                  <span className="form-confirmation-eyebrow">NEXT STEP</span>
                  <h3>Let’s talk about your project.</h3>
                  <p>Start a conversation to share your goals and explore the right next steps for your project.</p>
                  <a
                    className="form-confirmation-link"
                    href="https://api.whatsapp.com/send/?phone=971525287259"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat with our team
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </section>
            ) : (
              <button
                className={`form-submit${preparing ? " is-preparing" : ""}`}
                type="submit"
                disabled={preparing}
              >
                {preparing ? (
                  <span className="btn-spinner-wrap">
                    <span className="btn-spinner" aria-hidden="true" /> Preparing...
                  </span>
                ) : (
                  <>
                    Get Free Consultation
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            )}
            {confirmationReady && (
              <span className="submit-confetti" aria-hidden="true">
                {submitConfetti.map(([x, y, rotation, color], index) => (
                  <i
                    key={index}
                    style={{
                      "--confetti-x": `${x}px`,
                      "--confetti-y": `${y}px`,
                      "--confetti-rotation": `${rotation}deg`,
                      "--confetti-color": color,
                      "--confetti-delay": `${(index % 4) * 25}ms`,
                    }}
                  />
                ))}
              </span>
            )}
          </div>

          {!confirmationReady && (
            <p className="form-submit-feedback" role="status" aria-live="polite" aria-atomic="true">
              {preparing ? "Preparing your next step. Your details remain on this page." : ""}
            </p>
          )}

          <div className="hero-form-trust">
            <span><Star size={14} /> No auto-send</span>
            <span><Check size={14} /> Direct contact</span>
            <span><LockKeyhole size={14} /> Details stay here</span>
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

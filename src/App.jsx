import { useEffect, useState } from "react";
import "./App.css";

const BENEFITS = [
  "Stay in your people's feed all week without spending hours in an editor.",
  "Look like you have a media team even if it's just you and a volunteer.",
  "Reach visitors where they already are instead of hoping they remember Sunday's message.",
];

const STEPS = [
  [
    "01",
    "Upload your sermon video (or paste a link).",
    "Use the sermon recording you already have. No editor timeline to manage.",
  ],
  [
    "02",
    "Our AI finds clip-worthy moments and creates ready-to-post vertical videos with captions.",
    "Pulpit Engine turns the sermon into short clips built for Facebook.",
  ],
  [
    "03",
    "We post to your church's Facebook page on the schedule you choose.",
    "Your page stays active through the week without another task on the church calendar.",
  ],
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="menu-icon">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function useMotionReady() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    document.body.setAttribute("data-motion", "ready");

    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const grids = Array.from(document.querySelectorAll(".card-grid"));

    grids.forEach((grid) => {
      Array.from(grid.querySelectorAll(".card.reveal")).forEach((card, index) => {
        card.style.setProperty("--reveal-delay", `${index * 80}ms`);
      });
    });

    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -32px 0px" },
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in-view"));
    }

    return () => {
      observer?.disconnect();
      document.body.removeAttribute("data-motion");
    };
  }, []);
}

function useMagneticButtons() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const buttons = Array.from(document.querySelectorAll(".btn-magnetic"));
    const cleanups = buttons.map((button) => {
      const onMove = (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width - 0.5) * 10).toFixed(2));
        button.style.setProperty("--my", (((event.clientY - rect.top) / rect.height - 0.5) * 10).toFixed(2));
      };
      const onLeave = () => {
        button.style.setProperty("--mx", "0");
        button.style.setProperty("--my", "0");
        button.style.setProperty("--btn-scale", "1");
      };
      const onDown = () => button.style.setProperty("--btn-scale", "0.97");
      const onUp = () => button.style.setProperty("--btn-scale", "1");

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);
      button.addEventListener("pointerdown", onDown);
      button.addEventListener("pointerup", onUp);
      button.addEventListener("pointercancel", onUp);

      return () => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
        button.removeEventListener("pointerdown", onDown);
        button.removeEventListener("pointerup", onUp);
        button.removeEventListener("pointercancel", onUp);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!open) return;
      if (!event.target.closest(".site-nav")) setOpen(false);
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="nav-logo" href="/" onClick={closeMenu}>
        Pulpit Engine
      </a>
      <button
        className="nav-mobile-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((current) => !current)}
      >
        <MenuIcon open={open} />
      </button>
      <div className="nav-links-right">
        <a href="#benefits">Benefits</a>
        <a href="#how-it-works">How It Works</a>
        <a className="nav-cta" href="#contact">
          Get Early Access
        </a>
      </div>
      <div id="mobile-nav" className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <a href="#benefits" onClick={closeMenu}>
          Benefits
        </a>
        <a href="#how-it-works" onClick={closeMenu}>
          How It Works
        </a>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Get Early Access
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero section-shell">
      <div className="section-inner hero-inner">
        <h1 className="reveal">
          <span className="gradient-text">Turn Sunday sermons into daily Facebook posts. Automatically.</span>
        </h1>
        <p className="hero-sub reveal">
          Upload your sermon once. Pulpit Engine finds the best moments, creates captioned clips, and posts them to your church&apos;s Facebook page for you.
        </p>
        <div className="hero-actions reveal">
          <a className="btn btn-primary btn-magnetic" href="#contact">
            Get Early Access
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="section-shell benefits-section">
      <div className="section-inner">
        <span className="section-label reveal">Why pastors use Pulpit Engine</span>
        <h2 className="reveal">Keep the sermon working after Sunday.</h2>
        <p className="lead reveal">
          Pulpit Engine is built for pastors who want consistent church content without handing their week to an editing timeline.
        </p>
        <div className="card-grid benefits-grid">
          {BENEFITS.map((benefit) => (
            <article className="card cap-card reveal" key={benefit}>
              <span className="benefit-mark" aria-hidden="true">
                <ArrowIcon />
              </span>
              <p className="cap-body">{benefit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell how-section">
      <div className="section-inner">
        <span className="section-label reveal">How it works</span>
        <h2 className="reveal">You preach once. The week gets planned.</h2>
        <p className="lead reveal">
          Three steps take the pressure off your staff and turn one sermon into a steady Facebook presence.
        </p>
        <div className="card-grid">
          {STEPS.map(([number, title, body]) => (
            <article className="card cap-card step-card reveal" key={number}>
              <span className="step-index">{number}</span>
              <h3 className="cap-title">{title}</h3>
              <p className="cap-body">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell cta-dark">
      <div className="section-inner contact-inner">
        <span className="section-label reveal">Founding Churches</span>
        <h2 className="reveal">Want early access?</h2>
        <p className="lead reveal">
          Founding churches get our lowest founder rate for life. We&apos;re opening a small group of churches on this new version of Pulpit Engine. If you want in early (and want us listening closely to your feedback), send your email below and we&apos;ll reach out personally.
        </p>
        <form action="mailto:jake@pulpitengine.com" method="post" encType="text/plain" className="email-capture reveal">
          <label className="sr-only" htmlFor="early-access-email">
            Your email address
          </label>
          <input id="early-access-email" type="email" name="email" placeholder="Your email address" required />
          <button type="submit" className="btn btn-primary btn-magnetic">
            Email Jake
            <ArrowIcon />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Pulpit Engine <span aria-hidden="true">|</span> Sermon clips and Facebook posts for churches.
      </p>
      <a href="mailto:jake@pulpitengine.com">jake@pulpitengine.com</a>
    </footer>
  );
}

export default function PulpitEngine() {
  useMotionReady();
  useMagneticButtons();

  useEffect(() => {
    document.title = "Pulpit Engine | Sermon Clips for Churches";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) favicon.setAttribute("href", "/favicon.svg");
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { useState, useEffect, useRef } from "react";

// ── Intersection Observer Hook ──
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ── Colors ──
const C = {
  green: "#006747",
  greenLight: "#00855B",
  greenDark: "#004D35",
  greenDeep: "#02291E",
  yellow: "#F2C75C",
  yellowLight: "#F7D97E",
  yellowDim: "rgba(242,199,92,0.12)",
  cream: "#F5F1E6",
  creamMuted: "rgba(245,241,230,0.55)",
  creamFaint: "rgba(245,241,230,0.3)",
  bg: "#021A13",
};

// ── Nav ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(2,26,19,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(242,199,92,0.1)` : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 800, color: C.yellow,
          fontFamily: "'Playfair Display', serif",
        }}>P</div>
        <span style={{
          fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.cream,
          letterSpacing: "-0.02em",
        }}>Pulpit Engine</span>
      </div>
      <a href="#start" style={{
        padding: "10px 24px", borderRadius: 8,
        background: `linear-gradient(135deg, ${C.yellow}, ${C.yellowLight})`,
        color: C.greenDeep, fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700, fontSize: 14, textDecoration: "none",
        letterSpacing: "0.02em", textTransform: "uppercase",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: `0 2px 12px rgba(242,199,92,0.2)`,
      }}
      onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 20px rgba(242,199,92,0.35)"; }}
      onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 2px 12px rgba(242,199,92,0.2)"; }}
      >Start Free Trial</a>
    </nav>
  );
}

// ── Hero ──
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "120px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
        width: "160%", height: "90%", borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(0,103,71,0.15) 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "10%", right: "-10%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(242,199,92,0.04) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <Reveal>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 18px", borderRadius: 100,
          border: `1px solid rgba(0,103,71,0.4)`,
          background: `rgba(0,103,71,0.1)`,
          marginBottom: 36,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.yellow }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.yellow,
            fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
          }}>AI-powered sermon content</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6.5vw, 76px)",
          color: C.cream, lineHeight: 1.08, maxWidth: 950,
          margin: "0 auto 12px", letterSpacing: "-0.02em", fontWeight: 700,
        }}>
          You Prepare & Preach.
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6.5vw, 76px)",
          color: C.yellow, lineHeight: 1.08, maxWidth: 950,
          margin: "0 auto 32px", letterSpacing: "-0.02em", fontWeight: 700,
        }}>
          We Create & Post.
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(17px, 2.2vw, 21px)",
          color: C.creamMuted, lineHeight: 1.7, maxWidth: 640,
          margin: "0 auto 48px",
        }}>
          Pulpit Engine is AI-powered software that turns your sermon recordings into 
          12 production-ready video clips every week. Captioned, formatted, and posted to 
          your church's social media automatically. Disciple your congregation 
          seven days a week, not just on Sunday and Wednesday.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#start" style={{
            padding: "16px 36px", borderRadius: 10,
            background: `linear-gradient(135deg, ${C.yellow}, ${C.yellowLight})`,
            color: C.greenDeep, fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: 16, textDecoration: "none",
            boxShadow: `0 4px 24px rgba(242,199,92,0.25)`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(242,199,92,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(242,199,92,0.25)"; }}
          >Start Your Free 30-Day Trial</a>
          <a href="#how" style={{
            padding: "16px 36px", borderRadius: 10,
            border: `1px solid rgba(245,241,230,0.12)`,
            color: C.cream, fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, fontSize: 16, textDecoration: "none",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "rgba(0,103,71,0.5)"; e.target.style.background = "rgba(0,103,71,0.08)"; }}
          onMouseLeave={e => { e.target.style.borderColor = "rgba(245,241,230,0.12)"; e.target.style.background = "transparent"; }}
          >See How It Works</a>
        </div>
      </Reveal>

      <Reveal delay={0.45}>
        <div style={{
          marginTop: 72, display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            ["12", "Clips per week"],
            ["6", "Days of content"],
            ["15", "Min to set up"],
            ["0", "Hours of your time"],
          ].map(([num, label], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: 52,
                color: C.yellow, lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: C.creamFaint, marginTop: 6,
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>{label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Problem ──
function Problem() {
  const items = [
    { title: "You're called to preach, not post.", text: "You didn't go to seminary to learn Instagram algorithms. But in today's world, if your message isn't on social media, it's only reaching the people in the room." },
    { title: "Hiring a team costs $5,000 to $10,000 a month.", text: "Professional content teams are out of reach for most churches. So the work falls on a volunteer, a pastor's kid, or nobody at all. And the content stops." },
    { title: "Your best sermon moments disappear by Monday.", text: "That 90 seconds on Sunday where the Holy Spirit moved through every word your pastor spoke. It's sitting on a hard drive instead of in someone's feed when they need it most." },
  ];
  return (
    <section style={{
      padding: "120px 24px",
      background: `linear-gradient(180deg, transparent 0%, rgba(0,103,71,0.04) 50%, transparent 100%)`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            color: C.yellow, textTransform: "uppercase", letterSpacing: "0.1em",
            fontWeight: 600, marginBottom: 16, textAlign: "center",
          }}>The reality</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 50px)",
            color: C.cream, textAlign: "center", lineHeight: 1.12,
            maxWidth: 750, margin: "0 auto 64px", letterSpacing: "-0.02em",
          }}>
            Churches don't have a content problem.<br />
            <span style={{ color: C.yellow }}>They have a capacity problem.</span>
          </h2>
        </Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{
                padding: 36, borderRadius: 16,
                background: "rgba(0,103,71,0.06)",
                border: "1px solid rgba(0,103,71,0.15)",
                height: "100%",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(242,199,92,0.2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,103,71,0.15)"}
              >
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 22,
                  color: C.cream, marginBottom: 14, lineHeight: 1.3,
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                  color: C.creamMuted, lineHeight: 1.7,
                }}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Discipleship Angle ──
function Discipleship() {
  return (
    <section style={{ padding: "100px 24px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <Reveal>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: C.yellow, textTransform: "uppercase", letterSpacing: "0.1em",
          fontWeight: 600, marginBottom: 16,
        }}>More than marketing</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4.5vw, 44px)",
          color: C.cream, lineHeight: 1.15,
          margin: "0 auto 24px", letterSpacing: "-0.02em",
        }}>
          This isn't social media marketing.<br />
          <span style={{ color: C.yellow }}>This is digital discipleship.</span>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 18,
          color: C.creamMuted, lineHeight: 1.7,
          maxWidth: 620, margin: "0 auto",
        }}>
          Your congregation doesn't stop needing encouragement on Monday. 
          They don't stop wrestling with Tuesday's temptation or Wednesday's grief. 
          Pulpit Engine puts your pastor's voice in their feed exactly when they need it most, 
          turning one Sunday sermon into a week of spiritual nourishment. That's not 
          content strategy. That's shepherding at scale.
        </p>
      </Reveal>
    </section>
  );
}

// ── How It Works ──
function HowItWorks() {
  const steps = [
    { num: "01", title: "Your church records the service", desc: "Sunday morning, Wednesday evening. Your streaming platform uploads the recording automatically. You don't touch a thing." },
    { num: "02", title: "Our AI finds the best moments", desc: "We transcribe the full sermon, then our AI identifies the most powerful teaching moments, stories, and quotable statements. Short punchy clips, medium application points, and longer story-driven segments." },
    { num: "03", title: "Every clip gets the full treatment", desc: "Each clip is cropped to vertical, captioned with animated text, and paired with a caption written in your pastor's actual voice. Not generic church-speak. Him." },
    { num: "04", title: "Content posts automatically, all week", desc: "Two clips per day, Monday through Saturday. Your pastor gets a briefing email with links to watch every clip before it goes live. Sunday is a rest day." },
  ];
  return (
    <section id="how" style={{ padding: "120px 24px", maxWidth: 900, margin: "0 auto" }}>
      <Reveal>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: C.yellow, textTransform: "uppercase", letterSpacing: "0.1em",
          fontWeight: 600, marginBottom: 16, textAlign: "center",
        }}>How it works</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 50px)",
          color: C.cream, textAlign: "center", lineHeight: 1.12,
          maxWidth: 700, margin: "0 auto 72px", letterSpacing: "-0.02em",
        }}>
          One recording. Twelve clips.<br />
          <span style={{ color: C.yellow }}>Zero effort.</span>
        </h2>
      </Reveal>

      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 28, top: 12, bottom: 12, width: 2,
          background: `linear-gradient(to bottom, ${C.green}, rgba(0,103,71,0.1))`,
          borderRadius: 1,
        }} />
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{
              display: "flex", gap: 32, marginBottom: i < steps.length - 1 ? 52 : 0,
              position: "relative",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, rgba(0,103,71,0.15), rgba(0,103,71,0.05))`,
                border: `1px solid rgba(0,103,71,0.3)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.yellow,
                position: "relative", zIndex: 1,
              }}>{step.num}</div>
              <div style={{ paddingTop: 4 }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 24,
                  color: C.cream, marginBottom: 10, lineHeight: 1.3,
                }}>{step.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                  color: C.creamMuted, lineHeight: 1.7,
                }}>{step.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── What You Get ──
function WhatYouGet() {
  const features = [
    ["AI sermon clip extraction", "Our AI analyzes the full transcript and selects the 12 most impactful moments. Quotable one-liners, applied teaching, personal stories."],
    ["Vertical format, ready everywhere", "Every clip is auto-cropped from your landscape recording to 9:16. Ready for Facebook Reels, Instagram Reels, YouTube Shorts, and TikTok."],
    ["Animated captions burned in", "Professional word-by-word animated captions so your message connects even when someone's scrolling on mute at lunch."],
    ["Your pastor's voice, not ours", "Our AI studies your pastor's sermons to learn how he speaks. Every caption matches his warmth, his vocabulary, his pastoral tone."],
    ["Two posts per day, six days a week", "Sunday's sermon feeds Monday through Wednesday. Wednesday's sermon carries Thursday through Saturday. Consistent, automatic, relentless."],
    ["Weekly briefing with video previews", "Your pastor gets an email with clickable links to watch every clip and read every caption. Full visibility, zero logins, no dashboards."],
  ];
  return (
    <section style={{
      padding: "120px 24px",
      background: `linear-gradient(180deg, transparent 0%, rgba(0,103,71,0.04) 50%, transparent 100%)`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            color: C.yellow, textTransform: "uppercase", letterSpacing: "0.1em",
            fontWeight: 600, marginBottom: 16, textAlign: "center",
          }}>What you get</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 50px)",
            color: C.cream, textAlign: "center", lineHeight: 1.12,
            maxWidth: 800, margin: "0 auto 72px", letterSpacing: "-0.02em",
          }}>
            A full content operation for less than<br />
            <span style={{ color: C.yellow }}>a part-time intern.</span>
          </h2>
        </Reveal>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {features.map(([title, desc], i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{
                padding: "32px 28px", borderRadius: 14,
                background: "rgba(0,103,71,0.04)",
                border: "1px solid rgba(0,103,71,0.12)",
                height: "100%",
                transition: "border-color 0.3s, background 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(242,199,92,0.2)"; e.currentTarget.style.background = "rgba(0,103,71,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,103,71,0.12)"; e.currentTarget.style.background = "rgba(0,103,71,0.04)"; }}
              >
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 20,
                  color: C.cream, marginBottom: 10, lineHeight: 1.3,
                }}>{title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                  color: C.creamMuted, lineHeight: 1.7,
                }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ──
function Pricing() {
  return (
    <section id="start" style={{ padding: "120px 24px", maxWidth: 700, margin: "0 auto" }}>
      <Reveal>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: C.yellow, textTransform: "uppercase", letterSpacing: "0.1em",
          fontWeight: 600, marginBottom: 16, textAlign: "center",
        }}>Pricing</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 50px)",
          color: C.cream, textAlign: "center", lineHeight: 1.12,
          margin: "0 auto 56px", letterSpacing: "-0.02em",
        }}>
          Simple. Transparent. <span style={{ color: C.yellow }}>Risk-free.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{
          borderRadius: 20, overflow: "hidden",
          border: `1px solid rgba(0,103,71,0.3)`,
          background: `linear-gradient(170deg, rgba(0,103,71,0.1) 0%, ${C.bg} 50%)`,
        }}>
          <div style={{
            padding: "44px 40px 32px", textAlign: "center",
            borderBottom: "1px solid rgba(0,103,71,0.15)",
          }}>
            <div style={{
              display: "inline-block", padding: "6px 18px", borderRadius: 100,
              background: C.yellowDim, marginBottom: 28,
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.yellow,
                fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
              }}>Start with 30 days free</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
              <span style={{
                fontFamily: "'Playfair Display', serif", fontSize: 68,
                color: C.cream, lineHeight: 1, letterSpacing: "-0.03em",
              }}>$1,000</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                color: C.creamFaint,
              }}>/month</span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: C.creamFaint, marginTop: 8,
            }}>after your free trial</p>
          </div>

          <div style={{ padding: "32px 40px" }}>
            {[
              "12 production-ready vertical video clips per week",
              "AI-powered animated captions on every clip",
              "All captions written in your pastor's voice",
              "Two posts per day, six days a week",
              "Facebook Reels posting (Instagram, YouTube, TikTok coming soon)",
              "Weekly staff briefing with clickable video previews",
              "All hosting, AI, and monitoring costs included",
              "Voice profile tuning and ongoing optimization",
              "Dedicated Slack channel for support",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18,
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 7, flexShrink: 0, marginTop: 1,
                  background: `rgba(0,103,71,0.2)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: C.yellow, fontSize: 12, fontWeight: 700,
                }}>&#10003;</div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                  color: "rgba(245,241,230,0.7)", lineHeight: 1.45,
                }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: "8px 40px 40px", textAlign: "center" }}>
            <a href="mailto:jake@pulpitengine.com" style={{
              display: "block", padding: "18px 36px", borderRadius: 12,
              background: `linear-gradient(135deg, ${C.yellow}, ${C.yellowLight})`,
              color: C.greenDeep, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700, fontSize: 17, textDecoration: "none",
              boxShadow: `0 4px 24px rgba(242,199,92,0.25)`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(242,199,92,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(242,199,92,0.25)"; }}
            >Start Your Free 30-Day Trial</a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div style={{
          marginTop: 32, padding: "28px 32px", borderRadius: 14,
          border: "1px solid rgba(0,103,71,0.15)",
          background: "rgba(0,103,71,0.04)",
          textAlign: "center",
        }}>
          <h4 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 21,
            color: C.cream, marginBottom: 10,
          }}>90-Day Money-Back Guarantee</h4>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: C.creamMuted, lineHeight: 1.65, maxWidth: 520, margin: "0 auto",
          }}>
            30 days free plus 60 days paid. If your church isn't seeing the impact 
            after 90 days, we refund every dollar. No questions. No friction. 
            We stand behind this because it works.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// ── FAQ ──
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["What does our church actually need to do?", "One 15-minute phone call. Give us access to your streaming platform and Facebook Page. After that, the system runs itself. Your pastor receives a weekly email showing what's going out. That's the full extent of your team's involvement."],
    ["How does the AI know our pastor's voice?", "We analyze your pastor's actual sermon recordings. Not a form he fills out. We study how he speaks: his vocabulary, his warmth, his cadence, the way he lands a point. Every caption is written to match. Your congregation will think he typed it himself."],
    ["Is this just a social media marketing tool?", "No. This is a discipleship tool. Your pastor's most powerful moments reach your congregation throughout the week, not just on Sunday. When a member is struggling on a Tuesday night and your pastor's voice shows up in their feed with exactly what they need to hear, that's not marketing. That's ministry."],
    ["What if we only preach on Sundays?", "The system is built for churches that preach twice a week, but we can absolutely adapt it for Sunday-only churches. Your clips would spread across the full week from one sermon."],
    ["What platforms do you post to?", "Phase 1 posts to Facebook Reels. Every clip is already vertical and captioned for Instagram Reels, YouTube Shorts, and TikTok. We're rolling those platforms out soon and your content will be ready from day one."],
    ["Can we review content before it goes live?", "Absolutely. Your pastor gets a briefing email with clickable links to watch every clip and read every caption before anything posts. If something needs adjusting, we handle it."],
    ["What does the free trial include?", "Everything. We set up your entire system, run it for 30 days, and you see the full product in action. 12 clips per week, daily posts, weekly briefings. If it's not for you, walk away with zero charge."],
    ["How fast can we be up and running?", "Most churches are live within 48 hours of the onboarding call. Your team's time commitment is about 15 minutes."],
  ];

  return (
    <section style={{ padding: "120px 24px", maxWidth: 750, margin: "0 auto" }}>
      <Reveal>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: C.yellow, textTransform: "uppercase", letterSpacing: "0.1em",
          fontWeight: 600, marginBottom: 16, textAlign: "center",
        }}>Questions</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 44px)",
          color: C.cream, textAlign: "center", lineHeight: 1.12,
          margin: "0 auto 56px", letterSpacing: "-0.02em",
        }}>
          Everything you need to know.
        </h2>
      </Reveal>

      <div>
        {faqs.map(([q, a], i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div
              style={{
                borderBottom: "1px solid rgba(0,103,71,0.12)",
                cursor: "pointer",
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "22px 0", gap: 24,
              }}>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 500,
                  color: open === i ? C.yellow : C.cream,
                  transition: "color 0.2s", lineHeight: 1.4,
                }}>{q}</h3>
                <span style={{
                  color: C.creamFaint, fontSize: 24, fontWeight: 300,
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  transition: "transform 0.3s", flexShrink: 0, lineHeight: 1,
                }}>+</span>
              </div>
              <div style={{
                maxHeight: open === i ? 400 : 0, overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                  color: C.creamMuted, lineHeight: 1.7, paddingBottom: 24,
                }}>{a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Final CTA ──
function FinalCTA() {
  return (
    <section style={{
      padding: "120px 24px 80px", textAlign: "center", position: "relative",
    }}>
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "140%", height: "60%", borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(0,103,71,0.1) 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />
      <Reveal>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5.5vw, 56px)",
          color: C.cream, lineHeight: 1.1,
          maxWidth: 750, margin: "0 auto 24px", letterSpacing: "-0.02em",
        }}>
          Your congregation needs your voice<br />
          <span style={{ color: C.yellow }}>more than once a week.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 18,
          color: C.creamMuted, lineHeight: 1.7,
          maxWidth: 540, margin: "0 auto 44px",
        }}>
          30 days free. 90-day guarantee. 15 minutes to set up. 
          You focus on shepherding your people. We'll make sure your voice reaches them every single day.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <a href="mailto:jake@pulpitengine.com" style={{
          display: "inline-block", padding: "18px 48px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.yellow}, ${C.yellowLight})`,
          color: C.greenDeep, fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700, fontSize: 17, textDecoration: "none",
          boxShadow: `0 4px 24px rgba(242,199,92,0.25)`,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(242,199,92,0.4)"; }}
        onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(242,199,92,0.25)"; }}
        >Get Started Free</a>
      </Reveal>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer style={{
      padding: "48px 24px", textAlign: "center",
      borderTop: "1px solid rgba(0,103,71,0.1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: C.yellow,
          fontFamily: "'Playfair Display', serif",
        }}>P</div>
        <span style={{
          fontFamily: "'Playfair Display', serif", fontSize: 17,
          color: C.creamFaint,
        }}>Pulpit Engine</span>
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        color: "rgba(245,241,230,0.18)",
      }}>AI-powered discipleship content for the modern church.</p>
    </footer>
  );
}

// ── App ──
export default function PulpitEngine() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; overflow-x: hidden; }
      `}</style>
      <Nav />
      <Hero />
      <Problem />
      <Discipleship />
      <HowItWorks />
      <WhatYouGet />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

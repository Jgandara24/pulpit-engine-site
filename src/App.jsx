import { useState, useEffect, useRef } from "react";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(44px)",
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

const MAILTO = "mailto:jake@pulpitengine.com?subject=Pulpit%20Engine%20Interest%20-%20%5BChurch%20Name%5D&body=Hi%2C%20I'm%20a%20%5BPastor%20%2F%20Staff%20Name%5D%20at%20%5BChurch%20Name%5D.%20We%20want%20to%20put%20our%20ministry%20on%20autopilot.%20Reach%20me%20at%3A%20%5BPhone%20Number%5D";
const RED = "#cc0000";
const hd = "'Inter Tight', 'Inter', sans-serif";
const bd = "'Inter', sans-serif";

// ── Nav ──
function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64, padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: s ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: s ? "blur(24px)" : "none",
      borderBottom: s ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
      transition: "all 0.4s",
    }}>
      <span style={{
        fontFamily: hd, fontSize: 14, fontWeight: 800,
        letterSpacing: "0.18em", color: "#0a0a0a",
      }}>PULPIT ENGINE</span>
      <a href={MAILTO} style={{
        padding: "9px 22px", background: "#0a0a0a", color: "#fff",
        fontFamily: hd, fontWeight: 700, fontSize: 11,
        letterSpacing: "0.12em", textTransform: "uppercase",
        textDecoration: "none", transition: "background 0.2s",
      }}
      onMouseEnter={e => e.target.style.background = "#333"}
      onMouseLeave={e => e.target.style.background = "#0a0a0a"}
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
      padding: "140px 24px 120px", background: "#fff",
    }}>
      <Reveal>
        <h1 style={{
          fontFamily: hd, fontSize: "clamp(42px, 7.5vw, 96px)",
          fontWeight: 900, lineHeight: 0.95,
          color: "#0a0a0a", letterSpacing: "0.06em",
          margin: "0 auto 20px",
        }}>PULPIT ENGINE</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p style={{
          fontFamily: hd, fontSize: "clamp(14px, 2vw, 20px)",
          fontWeight: 500, letterSpacing: "0.12em",
          color: "#888", textTransform: "uppercase",
          margin: "0 auto 48px",
        }}>Put your church's content marketing on cruise control.</p>
      </Reveal>

      <Reveal delay={0.22}>
        <p style={{
          fontFamily: bd, fontSize: "clamp(16px, 1.8vw, 19px)",
          fontWeight: 400, color: "#0A0A0A", lineHeight: 1.8,
          maxWidth: 580, margin: "0 auto 56px",
        }}>
          AI-powered software that transforms your sermon recordings into 
          60+ production-ready video clips every month. Captioned, formatted vertical, 
          and posted to your church's social media automatically. 
          You prepare and preach. We create and post.
        </p>
      </Reveal>

      <Reveal delay={0.32}>
        <a href={MAILTO} style={{
          display: "inline-block", padding: "20px 56px",
          background: RED, color: "#fff",
          fontFamily: hd, fontWeight: 700, fontSize: 15,
          letterSpacing: "0.1em", textTransform: "uppercase",
          textDecoration: "none", transition: "background 0.25s, transform 0.2s",
        }}
        onMouseEnter={e => { e.target.style.background = "#e60000"; e.target.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.target.style.background = RED; e.target.style.transform = "translateY(0)"; }}
        >Start Your Free 30-Day Trial</a>
      </Reveal>

      <Reveal delay={0.5}>
        <div style={{
          marginTop: 100, display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            ["60+", "CLIPS / MONTH"],
            ["2x", "DAILY POSTS"],
            ["365", "DAYS OF MOMENTUM"],
          ].map(([num, label], i) => (
            <div key={i} style={{
              textAlign: "center", padding: "0 48px",
              borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
            }}>
              <div style={{
                fontFamily: hd, fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900,
                color: "#0a0a0a", lineHeight: 1, letterSpacing: "-0.03em",
              }}>{num}</div>
              <div style={{
                fontFamily: hd, fontSize: 10, fontWeight: 700,
                color: "#bbb", marginTop: 10, letterSpacing: "0.18em",
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
  return (
    <section style={{ padding: "140px 24px", background: "#fafafa" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{
            fontFamily: hd, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", color: "#bbb", marginBottom: 24,
          }}>THE PROBLEM</p>
          <h2 style={{
            fontFamily: hd, fontSize: "clamp(26px, 4.5vw, 46px)",
            fontWeight: 800, color: "#0a0a0a", lineHeight: 1.12,
            maxWidth: 750, margin: "0 auto 80px", letterSpacing: "-0.01em",
          }}>
            PASTORS WERE CALLED TO PREACH THE WORD,<br />NOT FIGURE OUT SOCIAL MEDIA.
          </h2>
        </Reveal>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 1, background: "rgba(0,0,0,0.05)",
        }}>
          {[
            ["Your calling isn't content creation.", "You didn't go to seminary to learn Instagram. But without a digital presence, your message only reaches the people who show up on Sunday."],
            ["Hiring a team costs $5K\u201310K/month.", "Most churches can't justify that budget. So content falls on a volunteer, gets inconsistent, and eventually stops."],
            ["Your best moments vanish by Monday.", "The most powerful 90 seconds of your sermon is sitting on a hard drive while your congregation scrolls past content that doesn't feed their soul."],
          ].map(([title, text], i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ padding: "52px 40px", background: "#fff", height: "100%", textAlign: "left" }}>
                <h3 style={{
                  fontFamily: hd, fontSize: 17, fontWeight: 700,
                  color: "#0a0a0a", marginBottom: 16, lineHeight: 1.35,
                }}>{title}</h3>
                <p style={{
                  fontFamily: bd, fontSize: 15, fontWeight: 400,
                  color: "#888", lineHeight: 1.8,
                }}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Discipleship ──
function Discipleship() {
  return (
    <section style={{ padding: "140px 24px", background: "#0a0a0a", textAlign: "center" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            fontFamily: hd, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", color: RED, marginBottom: 24,
          }}>MORE THAN MARKETING</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{
            fontFamily: hd, fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 800, color: "#fff", lineHeight: 1.15,
            margin: "0 auto 32px", letterSpacing: "-0.01em",
          }}>
            THIS ISN'T SOCIAL MEDIA MARKETING.<br />THIS IS DIGITAL DISCIPLESHIP.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{
            fontFamily: bd, fontSize: 17, fontWeight: 400,
            color: "rgba(255,255,255,0.45)", lineHeight: 1.85,
            maxWidth: 560, margin: "0 auto",
          }}>
            Your congregation doesn't stop needing encouragement on Monday. 
            They don't stop wrestling with Tuesday's temptation or Wednesday's grief. 
            Pulpit Engine puts your pastor's voice in their feed exactly when they need it most. 
            That's not content strategy. That's shepherding at scale.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── How It Works ──
function HowItWorks() {
  const steps = [
    ["01", "You record your service.", "Sunday morning, Wednesday evening. Your streaming platform uploads the recording automatically. You don't touch a thing."],
    ["02", "Our AI engine analyzes the sermon.", "We transcribe every word, map every speaker, and identify the most powerful teaching moments, stories, and quotable statements across the full transcript."],
    ["03", "Every clip gets engineered for impact.", "Cropped to vertical 9:16. Captioned with animated text. Paired with a caption written in your pastor's actual voice. Production-ready for every platform."],
    ["04", "Content posts on autopilot, all week.", "2x daily output. Monday through Saturday. Your pastor gets a briefing email with links to preview every clip before it goes live. Sunday is a rest day."],
  ];
  return (
    <section id="how" style={{ padding: "140px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            fontFamily: hd, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", color: "#bbb", marginBottom: 24, textAlign: "center",
          }}>THE AI ENGINE</p>
          <h2 style={{
            fontFamily: hd, fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 800, color: "#0a0a0a", textAlign: "center",
            lineHeight: 1.12, maxWidth: 700, margin: "0 auto 80px",
          }}>
            YOU PREACH THE WORD.<br />
            <span style={{ color: RED }}>WE AMPLIFY THE MESSAGE.</span>
          </h2>
        </Reveal>

        {steps.map(([num, title, desc], i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{
              display: "flex", gap: 40, alignItems: "flex-start",
              padding: "44px 0",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}>
              <div style={{
                fontFamily: hd, fontSize: 52, fontWeight: 900,
                color: "rgba(0,0,0,0.04)", lineHeight: 1, flexShrink: 0, minWidth: 80,
              }}>{num}</div>
              <div>
                <h3 style={{
                  fontFamily: hd, fontSize: 19, fontWeight: 700,
                  color: "#0a0a0a", marginBottom: 12, lineHeight: 1.35,
                }}>{title}</h3>
                <p style={{
                  fontFamily: bd, fontSize: 15, fontWeight: 400,
                  color: "#888", lineHeight: 1.8,
                }}>{desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Output Banner ──
function OutputBanner() {
  return (
    <section style={{ padding: "88px 24px", background: "#0a0a0a", textAlign: "center" }}>
      <Reveal>
        <p style={{
          fontFamily: hd, fontSize: "clamp(13px, 1.5vw, 16px)",
          fontWeight: 700, color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.2em", marginBottom: 16,
        }}>MONTHLY ENGINE OUTPUT</p>
        <h3 style={{
          fontFamily: hd, fontSize: "clamp(28px, 5vw, 60px)",
          fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.01em",
        }}>
          <span style={{ color: RED }}>60</span> CLIPS. <span style={{ color: RED }}>2x</span> A DAY. <span style={{ color: RED }}>ZERO</span> MANUAL LABOR.
        </h3>
      </Reveal>
    </section>
  );
}

// ── Specs ──
function Specs() {
  const items = [
    ["AI Sermon Clip Extraction", "Our engine identifies the most impactful moments across your weekly sermons. Short hooks, medium teaching points, and longer story-driven segments."],
    ["Vertical Format, Every Platform", "Every clip auto-cropped from landscape to 9:16. Formatted for Facebook Reels, Instagram Reels, YouTube Shorts, and TikTok."],
    ["Animated Captions Burned In", "Professional word-by-word animated text overlay. Your message connects even on mute. Engineered for scroll-stopping retention."],
    ["Voice-Matched AI Captions", "Our AI studies your pastor's sermons to learn vocabulary, warmth, cadence, and theology. Every written caption matches his voice."],
    ["2x Daily, Fully Automated", "Sunday's sermon fuels the first half of the week. Wednesday's carries the second half. Constant digital momentum, zero manual posting."],
    ["Weekly Pastor Briefing", "Email with clickable links to watch every clip and read every caption before it goes live. Full visibility, zero dashboards."],
  ];
  return (
    <section style={{ padding: "140px 24px", background: "#fafafa" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            fontFamily: hd, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", color: "#bbb", marginBottom: 24, textAlign: "center",
          }}>SPECIFICATIONS</p>
          <h2 style={{
            fontFamily: hd, fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 800, color: "#0a0a0a", textAlign: "center",
            lineHeight: 1.12, margin: "0 auto 72px",
          }}>HIGH-PERFORMANCE CONTENT AUTOMATION.</h2>
        </Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 1, background: "rgba(0,0,0,0.05)",
        }}>
          {items.map(([t, d], i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{ padding: "44px 36px", background: "#fff", height: "100%" }}>
                <h3 style={{
                  fontFamily: hd, fontSize: 13, fontWeight: 700,
                  color: "#0a0a0a", marginBottom: 14,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>{t}</h3>
                <p style={{
                  fontFamily: bd, fontSize: 15, fontWeight: 400,
                  color: "#999", lineHeight: 1.8,
                }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Value Stack ──
function ValueStack() {
  const lineItems = [
    ["Full-Time Video Editor", "$4,500"],
    ["Social Media Manager", "$3,500"],
    ["Graphic Designer & Copywriter", "$2,000"],
  ];
  return (
    <section style={{ padding: "140px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{
            fontFamily: hd, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", color: "#bbb", marginBottom: 24,
          }}>THE MATH</p>
          <h2 style={{
            fontFamily: hd, fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800, color: "#0a0a0a", lineHeight: 1.12,
            margin: "0 auto 64px",
          }}>STOP HIRING A TEAM.<br /><span style={{ color: RED }}>START AN ENGINE.</span></h2>
        </Reveal>

        {/* The Stack */}
        <Reveal delay={0.1}>
          <div style={{
            border: "1px solid rgba(0,0,0,0.08)",
            background: "linear-gradient(180deg, rgba(250,250,250,0.8), rgba(255,255,255,1))",
            backdropFilter: "blur(8px)",
            marginBottom: 2,
          }}>
            <div style={{
              padding: "32px 40px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
            }}>
              <p style={{
                fontFamily: hd, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", color: "#bbb", marginBottom: 4,
              }}>WHAT CHURCHES TYPICALLY PAY</p>
            </div>

            {lineItems.map(([label, price], i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 40px",
                borderBottom: "1px solid rgba(0,0,0,0.04)",
              }}>
                <span style={{
                  fontFamily: bd, fontSize: 16, fontWeight: 400, color: "#666",
                }}>{label}</span>
                <span style={{
                  fontFamily: hd, fontSize: 16, fontWeight: 700, color: "#0a0a0a",
                }}>{price}/mo</span>
              </div>
            ))}

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "24px 40px",
              background: "rgba(0,0,0,0.02)",
            }}>
              <span style={{
                fontFamily: hd, fontSize: 14, fontWeight: 700,
                letterSpacing: "0.08em", color: "#0a0a0a",
              }}>TOTAL REAL-WORLD VALUE</span>
              <span style={{
                fontFamily: hd, fontSize: 24, fontWeight: 900, color: "#0a0a0a",
                letterSpacing: "-0.02em",
              }}>$10,000/mo</span>
            </div>
          </div>
        </Reveal>

        {/* The Engine Price */}
        <Reveal delay={0.25}>
          <div style={{
            border: `2px solid ${RED}`,
            background: "#fff",
            padding: "48px 40px",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
              padding: "5px 20px", background: RED,
            }}>
              <span style={{
                fontFamily: hd, fontSize: 11, fontWeight: 700,
                color: "#fff", letterSpacing: "0.14em",
              }}>90% LESS</span>
            </div>

            <p style={{
              fontFamily: hd, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", color: "#bbb", marginBottom: 20,
            }}>PULPIT ENGINE</p>

            <div style={{
              display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6,
            }}>
              <span style={{
                fontFamily: hd, fontSize: 72, fontWeight: 900,
                color: "#0a0a0a", lineHeight: 1, letterSpacing: "-0.04em",
              }}>$1,000</span>
              <span style={{
                fontFamily: bd, fontSize: 20, fontWeight: 400, color: "#bbb",
              }}>/mo</span>
            </div>

            <p style={{
              fontFamily: bd, fontSize: 15, fontWeight: 400,
              color: "#999", marginTop: 12, marginBottom: 32,
            }}>60+ clips/month. 2x daily. Fully automated.</p>

            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24,
              marginBottom: 36,
            }}>
              {[
                "AI-powered clip extraction",
                "Animated captions burned in",
                "Voice-matched to your pastor",
                "Vertical format, every platform",
                "Weekly briefing with previews",
                "All costs included",
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: RED, flexShrink: 0 }} />
                  <span style={{
                    fontFamily: bd, fontSize: 13, fontWeight: 500, color: "#666",
                  }}>{item}</span>
                </div>
              ))}
            </div>

            <a href={MAILTO} style={{
              display: "block", padding: "18px 40px",
              background: RED, color: "#fff",
              fontFamily: hd, fontWeight: 700, fontSize: 15,
              letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", textAlign: "center",
              transition: "background 0.25s",
            }}
            onMouseEnter={e => e.target.style.background = "#e60000"}
            onMouseLeave={e => e.target.style.background = RED}
            >Start Your Free 30-Day Trial</a>
          </div>
        </Reveal>

        {/* Guarantee */}
        <Reveal delay={0.35}>
          <div style={{
            marginTop: 20, padding: "24px 32px",
            border: "1px solid rgba(0,0,0,0.06)",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: hd, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", color: "#0a0a0a", marginBottom: 6,
            }}>90-DAY MONEY-BACK GUARANTEE</p>
            <p style={{
              fontFamily: bd, fontSize: 14, fontWeight: 400,
              color: "#999", lineHeight: 1.65,
            }}>
              30 days free + 60 days paid. Not satisfied after 90 days? Full refund. No questions.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── FAQ ──
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["What does our church need to do?", "One 15-minute phone call. Give us access to your streaming platform and Facebook Page. After that, the entire system runs on autopilot. Your pastor receives a weekly email showing what's going out."],
    ["How does the AI know our pastor's voice?", "We analyze your pastor's actual sermon recordings. His vocabulary, his warmth, his cadence, the way he lands a point. Every caption is written to match. Your congregation will think he typed it himself."],
    ["Is this just social media marketing?", "No. This is a discipleship tool. Your pastor's most powerful moments reach your congregation every day of the week. When a member is struggling on a Tuesday night and your pastor's voice shows up in their feed, that's ministry, not marketing."],
    ["What if we only preach on Sundays?", "The system is engineered for two sermons per week, but we adapt for Sunday-only churches. Your clips spread across the full week from one sermon."],
    ["What platforms do you post to?", "Phase 1 posts to Facebook Reels. Every clip is already vertical and captioned for Instagram Reels, YouTube Shorts, and TikTok. Those platforms are rolling out soon."],
    ["Can we review content before it goes live?", "Absolutely. Your pastor gets a briefing email with clickable links to watch every clip and read every caption before anything posts."],
    ["What does the free trial include?", "Everything. Full setup, 30 days of operation, 60+ clips, daily posts, weekly briefings. If it's not for you, walk away. Zero charge."],
    ["How fast can we launch?", "Most churches are live within 48 hours. Your team's time commitment is about 15 minutes."],
  ];

  return (
    <section style={{ padding: "140px 24px", background: "#fafafa" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Reveal>
          <p style={{
            fontFamily: hd, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.22em", color: "#bbb", marginBottom: 24, textAlign: "center",
          }}>FAQ</p>
          <h2 style={{
            fontFamily: hd, fontSize: "clamp(22px, 3vw, 34px)",
            fontWeight: 800, color: "#0a0a0a", textAlign: "center",
            lineHeight: 1.15, margin: "0 auto 60px",
          }}>EVERYTHING YOU NEED TO KNOW.</h2>
        </Reveal>

        {faqs.map(([q, a], i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 0", gap: 24,
              }}>
                <h3 style={{
                  fontFamily: hd, fontSize: 15, fontWeight: 600,
                  color: open === i ? RED : "#0a0a0a",
                  transition: "color 0.2s", lineHeight: 1.4,
                }}>{q}</h3>
                <span style={{
                  fontFamily: hd, fontSize: 22, fontWeight: 300,
                  color: "#ccc", flexShrink: 0,
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  transition: "transform 0.3s",
                }}>+</span>
              </div>
              <div style={{
                maxHeight: open === i ? 400 : 0, overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                <p style={{
                  fontFamily: bd, fontSize: 15, fontWeight: 400,
                  color: "#888", lineHeight: 1.8, paddingBottom: 28,
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
    <section style={{ padding: "140px 24px", background: "#0a0a0a", textAlign: "center" }}>
      <Reveal>
        <h2 style={{
          fontFamily: hd, fontSize: "clamp(26px, 5vw, 52px)",
          fontWeight: 900, color: "#fff", lineHeight: 1.08,
          maxWidth: 700, margin: "0 auto 8px", letterSpacing: "0.01em",
        }}>SHIFT THE POWER OF YOUR PULPIT</h2>
        <h2 style={{
          fontFamily: hd, fontSize: "clamp(26px, 5vw, 52px)",
          fontWeight: 900, color: RED, lineHeight: 1.08,
          maxWidth: 700, margin: "0 auto 36px", letterSpacing: "0.01em",
        }}>INTO AUTOPILOT.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{
          fontFamily: bd, fontSize: 17, fontWeight: 400,
          color: "rgba(255,255,255,0.4)", lineHeight: 1.8,
          maxWidth: 480, margin: "0 auto 52px",
        }}>
          30 days free. 90-day guarantee. 15 minutes to set up. 
          You focus on shepherding your people. The engine handles the rest.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <a href={MAILTO} style={{
          display: "inline-block", padding: "20px 60px",
          background: RED, color: "#fff",
          fontFamily: hd, fontWeight: 700, fontSize: 16,
          letterSpacing: "0.1em", textTransform: "uppercase",
          textDecoration: "none", transition: "background 0.25s, transform 0.2s",
        }}
        onMouseEnter={e => { e.target.style.background = "#e60000"; e.target.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.target.style.background = RED; e.target.style.transform = "translateY(0)"; }}
        >Get Started Free</a>
      </Reveal>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer style={{
      padding: "44px 40px", background: "#fff",
      borderTop: "1px solid rgba(0,0,0,0.05)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    }}>
      <span style={{
        fontFamily: hd, fontSize: 12, fontWeight: 700,
        letterSpacing: "0.16em", color: "#ccc",
      }}>PULPIT ENGINE</span>
      <p style={{
        fontFamily: bd, fontSize: 12, fontWeight: 400, color: "#ccc",
      }}>High-performance content automation for the modern church.</p>
    </footer>
  );
}

// ── App ──
export default function PulpitEngine() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #fff; overflow-x: hidden; }
        ::selection { background: #cc0000; color: #fff; }
      `}</style>
      <Nav />
      <Hero />
      <Problem />
      <Discipleship />
      <HowItWorks />
      <OutputBanner />
      <Specs />
      <ValueStack />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

import { useState, useEffect, useRef } from "react";

const colors = {
  navy: "#0D1B2A",
  navyLight: "#1B2D45",
  teal: "#1B998B",
  gold: "#C8A951",
  goldLight: "#E8D5A0",
  red: "#E74C3C",
  green: "#2ECC71",
  white: "#FFFFFF",
  cream: "#F8F6F0",
  textMuted: "rgba(255,255,255,0.5)",
  textLight: "rgba(255,255,255,0.7)",
};

// Animated counter
function Counter({ end, suffix = "", prefix = "", duration = 2000, color = colors.gold }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref} style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700, color, lineHeight: 1 }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Fade-in on scroll
function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

// Pulsing dot
function Pulse({ color = colors.red }) {
  return (
    <span style={{ display: "inline-block", position: "relative", width: 10, height: 10, marginRight: 8 }}>
      <span style={{
        position: "absolute", width: 10, height: 10, borderRadius: "50%", background: color,
        animation: "pulse 2s infinite"
      }} />
      <span style={{
        position: "absolute", width: 10, height: 10, borderRadius: "50%", background: color, opacity: 0.4,
        animation: "pulseRing 2s infinite"
      }} />
    </span>
  );
}

export default function DataLensLanding() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: colors.navy, color: colors.white, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        ::selection { background: ${colors.gold}; color: ${colors.navy}; }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100, padding: "1rem 2rem",
        background: scrollY > 100 ? "rgba(13,27,42,0.95)" : "transparent",
        backdropFilter: scrollY > 100 ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700 }}>
          Data<span style={{ color: colors.gold }}>Lens</span>
          <span style={{ fontSize: "0.65rem", color: colors.textMuted, marginLeft: 8, letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif" }}>達視數據</span>
        </div>
        <a href="mailto:quinn@datalens.digital" style={{
          padding: "0.5rem 1.2rem", background: "transparent", border: `1px solid ${colors.gold}`,
          color: colors.gold, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em",
          textDecoration: "none", cursor: "pointer", transition: "all 0.3s",
        }}>免費健診</a>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "6rem 2rem 4rem",
        position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse at 30% 20%, rgba(27,153,139,0.08) 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, rgba(200,169,81,0.05) 0%, transparent 50%),
                     ${colors.navy}`
      }}>
        {/* Grid lines background */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${colors.gold} 1px, transparent 1px), linear-gradient(90deg, ${colors.gold} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <FadeIn>
          <div style={{ fontSize: "0.7rem", color: colors.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "2rem", fontWeight: 600 }}>
            Decision-Led Analytics
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            fontWeight: 900, lineHeight: 1.1, maxWidth: 700, marginBottom: "1.5rem"
          }}>
            你的廣告費<br />
            <span style={{ color: colors.gold }}>有多少是白花的？</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p style={{ fontSize: "1.1rem", color: colors.textLight, maxWidth: 500, lineHeight: 1.6, fontWeight: 300 }}>
            我們幫你找出答案。不是給你更多報表，<br />是給你能立刻行動的<strong style={{ color: colors.white }}>決策框架</strong>。
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <a href="#pain" style={{
            display: "inline-block", marginTop: "2.5rem", padding: "1rem 2.5rem",
            background: `linear-gradient(135deg, ${colors.gold}, #D4B65E)`,
            color: colors.navy, fontWeight: 700, fontSize: "0.95rem",
            textDecoration: "none", letterSpacing: "0.03em",
            boxShadow: "0 8px 30px rgba(200,169,81,0.25)",
            transition: "all 0.3s",
          }}>
            看看你的盲點 ↓
          </a>
        </FadeIn>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
          animation: "float 2s ease-in-out infinite", opacity: 0.3, fontSize: "1.5rem"
        }}>↓</div>
      </section>

      {/* ═══ BURNING MONEY STATS ═══ */}
      <section id="pain" style={{
        padding: "5rem 2rem", textAlign: "center",
        background: `linear-gradient(180deg, ${colors.navy} 0%, ${colors.navyLight} 100%)`
      }}>
        <FadeIn>
          <div style={{ fontSize: "0.7rem", color: colors.red, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
            <Pulse /> 你正在燒的錢
          </div>
        </FadeIn>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem", maxWidth: 900, margin: "2rem auto 0",
        }}>
          {[
            { num: 200, suffix: "+", label: "台幣/次", sub: "醫美熱門關鍵字 CPC 旺季價", color: colors.red },
            { num: 30, suffix: "%", label: "診所倒閉率", sub: "東區醫美近兩年淘汰比例", color: colors.red },
            { num: 8000, prefix: "$", label: "NTD / 每位到店客人", sub: "你的真實獲客成本，你知道嗎？", color: colors.gold },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{
                padding: "2rem 1.5rem",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, width: "3px", height: "100%",
                  background: s.color
                }} />
                <Counter end={s.num} suffix={s.suffix} prefix={s.prefix || ""} color={s.color} />
                <div style={{ fontSize: "0.85rem", color: colors.textLight, marginTop: "0.5rem", fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: "0.75rem", color: colors.textMuted, marginTop: "0.3rem" }}>{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ THE 3 QUESTIONS YOU CAN'T ANSWER ═══ */}
      <section style={{
        padding: "5rem 2rem",
        background: `linear-gradient(180deg, ${colors.navyLight} 0%, ${colors.navy} 100%)`
      }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.7rem", color: colors.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.8rem", fontWeight: 600 }}>
              你的老闆測驗
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700 }}>
              三個你<span style={{ color: colors.red }}>答不出來</span>的問題
            </h2>
          </div>
        </FadeIn>

        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {[
            { icon: "🎯", q: "昨天成交 10 萬的客人，是看了哪則廣告來的？", pain: "廣告後台只有點擊數，沒有成交數" },
            { icon: "🔄", q: "皮秒客人做完第一次，多少人回來做第二次？", pain: "預約系統不追蹤回購率" },
            { icon: "😴", q: "LINE 好友幾萬人，多少是半年沒消費的？", pain: "LINE OA 只會群發，不會分群" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                display: "flex", gap: "1.2rem", alignItems: "flex-start",
                padding: "1.5rem", background: "rgba(255,255,255,0.03)",
                borderLeft: `3px solid ${colors.gold}`, cursor: "default",
                transition: "all 0.3s",
              }}>
                <div style={{ fontSize: "2rem", flexShrink: 0, lineHeight: 1 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.4, marginBottom: "0.4rem" }}>{item.q}</div>
                  <div style={{ fontSize: "0.8rem", color: colors.red, fontFamily: "'JetBrains Mono', monospace" }}>→ {item.pain}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ fontSize: "1rem", color: colors.textMuted }}>
              如果這三題你都答不出來——<span style={{ color: colors.gold }}>你的廣告費正在替別人賺錢。</span>
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ═══ THE FIX — VISUAL PROCESS ═══ */}
      <section style={{
        padding: "5rem 2rem",
        background: colors.navy, position: "relative",
      }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.7rem", color: colors.teal, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.8rem", fontWeight: 600 }}>
              我們怎麼幫你
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
              四步。<span style={{ color: colors.teal }}>從盲飛到精準打擊。</span>
            </h2>
          </div>
        </FadeIn>

        <div style={{
          maxWidth: 800, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px",
        }}>
          {[
            { step: "01", title: "健診", desc: "免費 30 分鐘，找出你的數據斷點", icon: "🔍", time: "30 min" },
            { step: "02", title: "定義決策", desc: "你需要做什麼決策？先問對問題", icon: "🎯", time: "1-2 週" },
            { step: "03", title: "建框架", desc: "串接系統，建立決策用的 KPI 架構", icon: "⚡", time: "3-4 週" },
            { step: "04", title: "交付", desc: "一看就懂、能立刻行動的決策儀表板", icon: "📊", time: "Week 6" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "2rem 1.5rem", background: "rgba(255,255,255,0.02)",
                borderTop: `2px solid ${colors.teal}`, textAlign: "center",
                position: "relative",
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
                  color: colors.teal, letterSpacing: "0.1em", marginBottom: "0.8rem"
                }}>{s.step}</div>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.3rem" }}>{s.title}</div>
                <div style={{ fontSize: "0.8rem", color: colors.textLight, lineHeight: 1.5 }}>{s.desc}</div>
                <div style={{
                  marginTop: "0.8rem", fontSize: "0.65rem", color: colors.teal,
                  fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em"
                }}>{s.time}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ LIVE DASHBOARD MOCK ═══ */}
      <section style={{
        padding: "5rem 2rem", textAlign: "center",
        background: `linear-gradient(180deg, ${colors.navy} 0%, #0A1628 100%)`
      }}>
        <FadeIn>
          <div style={{ fontSize: "0.7rem", color: colors.gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.8rem", fontWeight: 600 }}>
            你會看到的
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 3vw, 2rem)", marginBottom: "0.5rem" }}>
            不是 50 張圖表。是<span style={{ color: colors.gold }}>5 個能行動的數字。</span>
          </h2>
          <p style={{ fontSize: "0.85rem", color: colors.textMuted, marginBottom: "2.5rem" }}>每天早上打開，10 秒看完，立刻決策。</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{
            maxWidth: 650, margin: "0 auto",
            background: "#111C2E", borderRadius: "8px", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
          }}>
            {/* Dashboard header */}
            <div style={{
              padding: "0.8rem 1.2rem", background: "#0F1926",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.05)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Pulse color={colors.green} />
                <span style={{ fontSize: "0.75rem", color: colors.textLight, fontFamily: "'JetBrains Mono', monospace" }}>
                  醫美診所 ∙ 即時決策儀表板
                </span>
              </div>
              <span style={{ fontSize: "0.65rem", color: colors.textMuted }}>LIVE</span>
            </div>

            {/* KPI cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
              padding: "1px", background: "rgba(255,255,255,0.03)"
            }}>
              {[
                { label: "True ROAS", value: "4.2x", change: "+18%", up: true },
                { label: "皮秒回購率", value: "34%", change: "+12%", up: true },
                { label: "CAC", value: "$3,200", change: "-15%", up: true },
              ].map((kpi, i) => (
                <div key={i} style={{ padding: "1.2rem", background: "#111C2E", textAlign: "center" }}>
                  <div style={{ fontSize: "0.6rem", color: colors.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{kpi.label}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: colors.white }}>{kpi.value}</div>
                  <div style={{ fontSize: "0.7rem", color: kpi.up ? colors.green : colors.red, fontWeight: 600, marginTop: "0.2rem" }}>
                    {kpi.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Decision insight */}
            <div style={{
              margin: "1rem", padding: "1rem 1.2rem",
              background: `linear-gradient(135deg, rgba(200,169,81,0.1) 0%, rgba(27,153,139,0.05) 100%)`,
              border: `1px solid rgba(200,169,81,0.2)`, borderRadius: "4px",
              display: "flex", gap: "0.8rem", alignItems: "center", textAlign: "left"
            }}>
              <div style={{ fontSize: "1.5rem" }}>💡</div>
              <div>
                <div style={{ fontSize: "0.55rem", color: colors.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.2rem" }}>Decision Insight</div>
                <div style={{ fontSize: "0.8rem", color: colors.white, lineHeight: 1.5 }}>
                  「電波」關鍵字 ROAS 是「皮秒」的 <strong style={{ color: colors.gold }}>3.2 倍</strong>。建議立即調整預算配比。
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ WHO — MINIMAL ═══ */}
      <section style={{ padding: "4rem 2rem", textAlign: "center", background: colors.navy }}>
        <FadeIn>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: colors.navyLight,
            border: `2px solid ${colors.gold}`, display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem", fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: colors.gold
          }}>Q</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: "0.3rem" }}>Quinn Chen 陳易榆</div>
          <div style={{ fontSize: "0.75rem", color: colors.textMuted, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>CEO, DataLens 達視數據</div>

          <div style={{
            display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", maxWidth: 500, margin: "0 auto"
          }}>
            {["Georgia Tech MS CS", "Brandeis MA Econ+Finance", "Data Engineer", "EN / 中文 / 日本語"].map((c, i) => (
              <span key={i} style={{
                fontSize: "0.65rem", padding: "0.3rem 0.8rem",
                border: "1px solid rgba(255,255,255,0.1)", color: colors.textLight,
                letterSpacing: "0.03em"
              }}>{c}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{
        padding: "5rem 2rem", textAlign: "center",
        background: `linear-gradient(135deg, ${colors.navyLight} 0%, #0A1628 100%)`,
        position: "relative"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.02,
          backgroundImage: `radial-gradient(${colors.gold} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }} />

        <FadeIn>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 4vw, 2.8rem)", fontWeight: 700,
            marginBottom: "0.8rem", position: "relative"
          }}>
            30 分鐘。<span style={{ color: colors.gold }}>免費。</span>
          </h2>
          <p style={{ fontSize: "0.95rem", color: colors.textLight, marginBottom: "2.5rem", maxWidth: 400, margin: "0 auto 2.5rem" }}>
            我幫你看一件事：你的廣告費裡，<br />有多少正在替競爭對手工作。
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a href="mailto:quinn@datalens.digital" style={{
            display: "inline-block", padding: "1.1rem 3rem",
            background: `linear-gradient(135deg, ${colors.gold}, #D4B65E)`,
            color: colors.navy, fontWeight: 700, fontSize: "1rem",
            textDecoration: "none", letterSpacing: "0.03em",
            boxShadow: "0 8px 30px rgba(200,169,81,0.3)",
            position: "relative"
          }}>
            預約免費健診 →
          </a>
          <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: colors.textMuted }}>
            quinn@datalens.digital
          </div>
        </FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        padding: "2rem", textAlign: "center", background: "#060D18",
        fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em"
      }}>
        © 2026 DataLens 達視數據 — Decision-Led Analytics
      </footer>
    </div>
  );
}

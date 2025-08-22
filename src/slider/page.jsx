import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollStack, {
  ScrollStackItem,
} from "../Components/ScrollStack/ScrollStack";

/**
 * ErpPitchDeck — final stable single-file implementation
 * - No external reactbits imports or dynamic CDN fetches (avoids sandbox fetch errors)
 * - Local replacements for DarkVeil background and ScrollStack animation
 * - Vertical snap-scroll sections, right-side dot nav, keyboard nav
 * - Revenue slider limited to 10..1000 (users × $30/month)
 */

const SLIDES = [
  {
    id: "hero",
    title: "Turn Membership Into Predictable Revenue",
    subtitle:
      "Offer your members a white‑label business platform that accelerates growth, reduces churn, and creates a new monthly income stream for your association.",
    img: "/images/hero_image.png",
    placeholder: "[Screenshot placeholder — Branded Member Portal]",
  },
  {
    id: "why",
    title: "Why Associations Adopt This",
    bullets: [
      "New recurring revenue without building software",
      "Increased member retention & daily engagement",
      "Actionable, anonymized industry benchmarks",
    ],
    placeholder: "[Screenshot placeholder — Member Insights]",
    video: "/videos/why_video.mp4",
  },
  {
    id: "features",
    title: "Core Features Members Need",
    subtitle:
      "Accounting, CRM, Inventory, HR, Projects — all integrated under one brand.",
  },
  {
    id: "governance",
    title: "Security, Compliance & Ownership",
    bullets: [
      "Regional hosting & dedicated instances",
      "Encrypted backups & audit logs",
      "Members own their data and can export it anytime",
    ],
    placeholder: "[Screenshot placeholder — Security & Settings]",
  },
  {
    id: "commercials",
    title: "Commercial Options (high level)",
    bullets: [
      "Foundation: flat per-company fee",
      "Growth: tiered pricing + onboarding",
      "Enterprise: dedicated instance & SLAs",
    ],
  },
  {
    id: "revenue",
    title: "Instant Revenue Estimator",
    subtitle:
      "Drag to estimate members and see the monthly and yearly revenue (association gross).",
  },
  {
    id: "pilot",
    title: "Launch a Pilot in Weeks",
    subtitle:
      "We co-brand, onboard 5–10 members, and publish adoption metrics. No long-term lock-in.",
    placeholder: "[Screenshot placeholder — Pilot Dashboard]",
  },
];

const FEATURES = [
  {
    title: "Finance & Billing",
    member: "Automated invoicing, payment reconciliation, tax-ready ledgers.",
    association:
      "Members gain accurate books; association shows clear ROI through subscription revenue.",
    placeholder: "[Screenshot: Invoices & Ledger]",
    img: "/images/hero_image.png",
  },
  {
    title: "CRM & Sales",
    member:
      "Lead tracking, opportunities, and automated follow-ups to grow revenue.",
    association:
      "Members convert more; association becomes the growth enabler.",
    placeholder: "[Screenshot: CRM Pipeline]",
    img: "/images/hero_image.png",
  },
  {
    title: "Inventory & Operations",
    member: "Stock control, order management, and shipment visibility.",
    association: "Operational efficiency reduces churn and support load.",
    placeholder: "[Screenshot: Stock & Orders]",
    img: "/images/hero_image.png",
  },
  {
    title: "People & Payroll",
    member: "Attendance, payroll, and employee self-service in one place.",
    association:
      "Compliance becomes simpler for members, strengthening trust in your benefits.",
    placeholder: "[Screenshot: Payroll & HR]",
    img: "/images/hero_image.png",
  },
  {
    title: "Reports & Insights",
    member: "Real-time KPIs and cash-flow dashboards.",
    association:
      "Anonymized benchmarks create exclusive association-level insights you can publish.",
    placeholder: "[Screenshot: Dashboards & Benchmarks]",
    img: "/images/hero_image.png",
  },
];

/* Local DarkVeil: subtle, readable, and not dependent on external libs */
function DarkVeilLocal() {
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: -2 }}>
      <div
        style={{
          position: "absolute",
          left: -160,
          top: -160,
          width: 520,
          height: 520,
          borderRadius: 9999,
          filter: "blur(90px)",
          background:
            "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.16), rgba(99,102,241,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -140,
          bottom: -140,
          width: 520,
          height: 520,
          borderRadius: 9999,
          filter: "blur(84px)",
          background:
            "radial-gradient(circle at 70% 70%, rgba(14,165,233,0.12), rgba(99,102,241,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(3,7,18,0.82)",
        }}
      />
    </div>
  );
}

/* Simple BrowserFrame to present screenshots or placeholders */
function BrowserFrame({ label, children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        borderRadius: 14,
        padding: 16,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.04)",
        boxShadow: "0 20px 40px rgba(2,6,23,0.6)",
      }}
    >
      <div
        style={{
          height: 10,
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            background: "#ff5f56",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            background: "#ffbd2e",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 10,
            background: "#27c93f",
          }}
        />
        <div
          style={{
            marginLeft: 12,
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
          }}
        >
          {label || "portal.example"}
        </div>
      </div>
      <div
        style={{ padding: 16, color: "rgba(255,255,255,0.95)", minHeight: 160 }}
      >
        {children}
      </div>
    </div>
  );
}

/* Local ScrollStack: reveals a vertical list of feature cards with subtle animation */
// function ScrollStackLocal({ items }) {
//   return (
//     <div style={{ display: "grid", gap: 18 }}>
//       {items.map((it, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 28, scale: 0.995 }}
//           whileInView={{ opacity: 1, y: 0, scale: 1 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.6, delay: i * 0.04 }}
//           style={{
//             background: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
//             padding: 18,
//             borderRadius: 12,
//             boxShadow: "0 12px 30px rgba(2,6,23,0.6)",
//             border: "1px solid rgba(255,255,255,0.04)",
//           }}
//         >
//           <div style={{ fontSize: 18, fontWeight: 800, color: "#eef2ff" }}>{it.title}</div>
//           <div style={{ marginTop: 8, color: "#cbd5e1" }}>
//             <strong>Members:</strong> {it.member}
//           </div>
//           <div style={{ marginTop: 6, color: "#9bd6ff" }}>
//             <strong>Association:</strong> {it.association}
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

function ScrollStackLocal({ items }) {
  return (
    <div className="scrollbar h-[60vh] w-full overflow-hidden">
      <ScrollStack
        className="w-full h-full "
        // color background

        
      >
        {items.map((it, i) => (
          <ScrollStackItem key={i}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full items-center px-8 ">
              {/* Text card */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="w-full max-w-4xl mx-auto px-8 py-12 rounded-2xl border border-white/10 bg-white/5 shadow-2xl flex flex-col items-center text-center"
              >
                <div className="text-lg font-bold text-indigo-100">
                  {it.title}
                </div>
                <div className="mt-2 text-slate-300">
                  <strong>Members:</strong> {it.member}
                </div>
                <div className="mt-1 text-sky-300">
                  <strong>Association:</strong> {it.association}
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.995 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="flex justify-center"
              >
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full max-w-lg h-auto rounded-2xl object-cover"
                />
              </motion.div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}

export default function ErpPitchDeck() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [active, setActive] = useState(0);

  // revenue state
  const [users, setUsers] = useState(100);
  const price = 30; // $30 per user per month
  const monthly = users * price;

  // animated displayed counter for monthly amount
  const [displayed, setDisplayed] = useState(monthly);
  const rafRef = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const start = displayed;
    const end = monthly;
    const duration = 420;
    const t0 = performance.now();

    function step(now) {
      const t = Math.min(1, (now - t0) / duration);
      const v = Math.floor(start + (end - start) * t);
      setDisplayed(v);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [monthly]);

  // IntersectionObserver to highlight current slide
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx")) || 0;
            setActive(idx);
          }
        });
      },
      { threshold: 0.45 }
    );

    const nodes = sectionsRef.current.filter(Boolean);
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (i) => {
    const el = sectionsRef.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowDown")
        scrollTo(Math.min(active + 1, SLIDES.length - 1));
      if (e.key === "ArrowUp") scrollTo(Math.max(active - 1, 0));
      if (
        e.key === "ArrowLeft" &&
        SLIDES[active] &&
        SLIDES[active].id === "revenue"
      )
        setUsers((u) => Math.max(10, u - 10));
      if (
        e.key === "ArrowRight" &&
        SLIDES[active] &&
        SLIDES[active].id === "revenue"
      )
        setUsers((u) => Math.min(1000, u + 10));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
    >
      <DarkVeilLocal />

      <div
        ref={containerRef}
        style={{
          height: "100vh",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
          background: "linear-gradient(180deg,#071133,#021024)",
          color: "#eef2ff",
        }}
      >
        {SLIDES.map((s, idx) => (
          <section
            key={s.id}
            ref={(el) => (sectionsRef.current[idx] = el)}
            data-idx={idx}
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "64px 24px",
              scrollSnapAlign: "start",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                maxWidth: 1100,
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 520px",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.02 }}
                >
                  {s.title}
                </motion.h2>

                {s.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 }}
                    style={{ marginTop: 12, color: "#cbd5e1", fontSize: 18 }}
                  >
                    {s.subtitle}
                  </motion.p>
                )}

                {s.bullets && (
                  <ul style={{ marginTop: 18, color: "#c7d2fe", fontSize: 18 }}>
                    {s.bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: 10 }}>
                        • {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* {s.id === "features" && (
                  <div style={{ marginTop: 22 }}>
                    <ScrollStackLocal items={FEATURES} />
                  </div>
                )} */}
                {s.id === "features" && (
                  <div className="w-[250%] overflow-hidden">
                    <ScrollStackLocal items={FEATURES} />
                  </div>
                )}

                {s.id === "commercials" && (
                  <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
                    <div
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>Foundation</div>
                      <div style={{ marginTop: 6 }}>
                        Flat monthly per company. Core modules & support.
                      </div>
                    </div>
                    <div
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>Growth</div>
                      <div style={{ marginTop: 6 }}>
                        Tiered pricing, priority onboarding, integrations.
                      </div>
                    </div>
                    <div
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>Enterprise</div>
                      <div style={{ marginTop: 6 }}>
                        Dedicated instances and custom SLAs.
                      </div>
                    </div>
                  </div>
                )}

                {s.id === "revenue" && (
                  <div style={{ marginTop: 20 }}>
                    <div style={{ color: "#94a3b8", marginBottom: 8 }}>
                      {s.subtitle}
                    </div>
                    <div
                      style={{ display: "flex", gap: 20, alignItems: "center" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <div style={{ color: "#9ca3af", fontSize: 14 }}>
                          Active member companies
                        </div>
                        <input
                          aria-label="members"
                          type="range"
                          min={10}
                          max={1000}
                          step={1}
                          value={users}
                          onChange={(e) => setUsers(Number(e.target.value))}
                        />
                        <div
                          style={{
                            marginTop: 8,
                            fontWeight: 800,
                            fontSize: 20,
                          }}
                        >
                          {users.toLocaleString()} members
                        </div>
                      </div>

                      <div
                        style={{
                          padding: 20,
                          borderRadius: 12,
                          background: "rgba(255,255,255,0.02)",
                          minWidth: 260,
                        }}
                      >
                        <div style={{ color: "#94a3b8", fontSize: 13 }}>
                          Projected association revenue
                        </div>
                        <div
                          style={{
                            marginTop: 8,
                            fontSize: 36,
                            fontWeight: 900,
                            color: "#34d399",
                          }}
                        >
                          ${displayed.toLocaleString()}
                        </div>
                        <div style={{ marginTop: 6, color: "#9ca3af" }}>
                          /month • ${(displayed * 12).toLocaleString()}/year
                        </div>
                        <div
                          style={{
                            marginTop: 12,
                            color: "#cbd5e1",
                            fontSize: 13,
                          }}
                        >
                          Example: present this gross number to members as an
                          association benefit. Operator fees are negotiated
                          privately.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: 560 }}>
                    <div style={{ borderRadius: 12 }}>
                      <div
                        style={{
                          padding: 5,
                          textAlign: "center",
                          color: "#cbd5e1",
                          minHeight: 140,
                        }}
                      >
                        {s.video ? (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ maxWidth: "100%", borderRadius: 12 }}
                          >
                            <source src={s.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={s.img}
                            alt={s.placeholder}
                            style={{ maxWidth: "100%", borderRadius: 12 }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Right-side dot nav */}
      <div
        style={{
          position: "fixed",
          right: 28,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SLIDES.map((sl, i) => (
            <button
              key={sl.id}
              onClick={() => scrollTo(i)}
              style={{
                width: active === i ? 72 : 12,
                height: 12,
                borderRadius: active === i ? 999 : 6,
                background: active === i ? "#7c3aed" : "rgba(255,255,255,0.06)",
                transition: "all 240ms ease",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Go to ${sl.title}`}
            />
          ))}
        </div>
      </div>

      {/* style */}

      <style jsx>{`
        .scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #7c3aed transparent;
        }

        .scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar::-webkit-scrollbar-thumb {
          background-color: #7c3aed;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}

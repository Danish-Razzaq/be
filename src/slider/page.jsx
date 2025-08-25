import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import ScrollStack, {
  ScrollStackItem,
} from "../Components/ScrollStack/ScrollStack";
import DarkVeilLocal from "../Components/DarkVeil/DarkVeil";
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
    img: "/images/owner.png",
  },
  {
    id: "commercials",
    title: "Commercial Options (high level)",
    bullets: [
      "Foundation: flat per-company fee",
      "Growth: tiered pricing + onboarding",
      "Enterprise: dedicated instance & SLAs",
    ],
    placeholder: "[Screenshot placeholder — Pricing Tiers]",
    img: "/images/Commercial.png",
  },
  {
    id: "revenue",
    title: "Instant Revenue Estimator",
    subtitle:
      "Drag to estimate members and see the monthly and yearly revenue (association gross).",
    placeholder: "[Screenshot placeholder — Instant Revenue Estimator]",
    img: "/images/Revenue.png",
  },
  {
    id: "pilot",
    title: "Launch a Pilot in Weeks",
    subtitle:
      "We co-brand, onboard 5–10 members, and publish adoption metrics. No long-term lock-in.",
    placeholder: "[Screenshot placeholder — Pilot Dashboard]",
    img: "/images/pilot.png",
  },
];

const FEATURES = [
  {
    title: "Finance & Billing",
    member: "Automated invoicing, payment reconciliation, tax-ready ledgers.",
    association:
      "Members gain accurate books; association shows clear ROI through subscription revenue.",
    placeholder: "[Screenshot: Invoices & Ledger]",
    img: "/images/Finance&Billing.png",
  },
  {
    title: "CRM & Sales",
    member:
      "Lead tracking, opportunities, and automated follow-ups to grow revenue.",
    association:
      "Members convert more; association becomes the growth enabler.",
    placeholder: "[Screenshot: CRM Pipeline]",
    img: "/images/hero.png",
  },
  {
    title: "Inventory & Operations",
    member: "Stock control, order management, and shipment visibility.",
    association: "Operational efficiency reduces churn and support load.",
    placeholder: "[Screenshot: Stock & Orders]",
    img: "/images/helpingdesk.png",
  },
  {
    title: "People & Payroll",
    member: "Attendance, payroll, and employee self-service in one place.",
    association:
      "Compliance becomes simpler for members, strengthening trust in your benefits.",
    placeholder: "[Screenshot: Payroll & HR]",
    img: "/images/payroll.png",
  },
  {
    title: "Reports & Insights",
    member: "Real-time KPIs and cash-flow dashboards.",
    association:
      "Anonymized benchmarks create exclusive association-level insights you can publish.",
    placeholder: "[Screenshot: Dashboards & Benchmarks]",
    img: "/images/Reports&Insights.png",
  },
];

/* Local DarkVeil: subtle, readable, and not dependent on external libs */
// function DarkVeilLocal() {
//   return (
//     <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: -2 }}>
//       <div
//         style={{
//           position: "absolute",
//           left: -160,
//           top: -160,
//           width: 520,
//           height: 520,
//           borderRadius: 9999,
//           filter: "blur(90px)",
//           background:
//             "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.16), rgba(99,102,241,0))",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           right: -140,
//           bottom: -140,
//           width: 520,
//           height: 520,
//           borderRadius: 9999,
//           filter: "blur(84px)",
//           background:
//             "radial-gradient(circle at 70% 70%, rgba(14,165,233,0.12), rgba(99,102,241,0))",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: "rgba(3,7,18,0.82)",
//         }}
//       />
//     </div>
//   );
// }

function ScrollStackLocal({ items }) {
  return (
    <div className="scrollbar lg:h-[75vh] h-[100vh] w-full overflow-hidden">
      <ScrollStack>
        {items.map((it, i) => (
          <ScrollStackItem key={i}>
            <div
              className="
                grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10
                w-full h-full items-center  px-1  sm:px-6 md:px-8
              "
            >
              {/* Text */}
              <div
                className="
                  px-1 py-6 md:px-8 md:py-12
                  rounded-2xl border border-white/10 bg-white/5 shadow-lg
                  flex flex-col justify-center
                  text-center md:text-left
                  max-w-lg mx-auto md:mx-0
                "
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                  {it.title}
                </h3>
                <p className="mt-2 text-white text-sm md:text-base">
                  <strong>Members:</strong> {it.member}
                </p>
                <p className="mt-1 text-[#30cfce] text-sm md:text-base">
                  <strong>Association:</strong> {it.association}
                </p>
              </div>

              {/* Image */}
              <div className="flex justify-center mt-6 md:mt-0">
                <img
                  src={it.img}
                  alt={it.title}
                  className="
                    w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
                    rounded-xl object-cover shadow-md
                  "
                />
              </div>
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
        height: "100vh",
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
      // ref={containerRef}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <DarkVeilLocal
          hueShift={0}
          noiseIntensity={0.05}
          scanlineIntensity={0.15}
          speed={0.6}
          warpAmount={0.02}
        />
      </div>

      <div
        ref={containerRef}
        style={{
          // height: "100vh",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
          // background: "linear-gradient(180deg,#071133,#021024)",
          color: "#eef2ff",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/*  Show logo top left side  */}
        <div
          className=" mx-auto px-3 pt-3"
          style={{
            maxWidth: 1100,
            width: "100%",
            display: "grid",
            alignItems: "center",
          }}
        >
          <img src="images/logo.png" alt="Logo" className="h-16" />
        </div>

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
              padding: "32px 12px",
              scrollSnapAlign: "start",
              boxSizing: "border-box",
            }}
            className="-mt-14"
          >
            <div
              style={{
                maxWidth: 1100,
                width: "100%",
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 1024 ? "1fr" : "1fr 520px",
                gap: window.innerWidth < 1024 ? 24 : 48,
                alignItems: "center",
              }}
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    fontSize: window.innerWidth < 768 ? 28 : 40,
                    fontWeight: 800,
                    lineHeight: 1.02,
                  }}
                >
                  {s.title}
                </motion.h2>

                {s.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 }}
                    style={{
                      marginTop: 12,
                      // color: "#cbd5e1",
                      fontSize: window.innerWidth < 768 ? 16 : 18,
                    }}
                  >
                    {s.subtitle}
                  </motion.p>
                )}

                {s.bullets && (
                  <ul
                    style={{
                      marginTop: 18,
                      // color: "#cbd5e1",
                      fontSize: window.innerWidth < 768 ? 16 : 18,
                    }}
                  >
                    {s.bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: 10 }}>
                        • {b}
                      </li>
                    ))}
                  </ul>
                )}

                {s.id === "features" && (
                  <div
                    style={
                      {
                        // marginTop: 22,
                        // width: "210%",
                        // minHeight: "60vh",
                        // overflow: "hidden"
                      }
                    }
                    className="lg:w-[210%]  w-full"
                  >
                    <ScrollStackLocal items={FEATURES} />
                  </div>
                )}

                {s.id === "commercials" && (
                  <div
                    style={{
                      marginTop: 22,
                      display: "grid",
                      gridTemplateColumns:
                        window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        padding: 16,
                        borderRadius: 12,
                      }}
                      className="bg-gray-500/35"
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
                      }}
                      className="bg-gray-500/35"
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
                      }}
                      className="bg-gray-500/35"
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
                    <div style={{ color: "white", marginBottom: 8 }}>
                      {s.subtitle}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection:
                          window.innerWidth < 768 ? "column" : "row",
                        gap: 20,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <div style={{ color: "white", fontSize: 14 }}>
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
                          style={{
                            width: window.innerWidth < 768 ? "100%" : "auto",
                          }}
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
                          minWidth: window.innerWidth < 768 ? "100%" : 260,
                        }}
                      >
                        <div style={{ color: "white", fontSize: 13 }}>
                          Projected association revenue
                        </div>
                        <div
                          style={{
                            marginTop: 8,
                            fontSize: window.innerWidth < 768 ? 28 : 36,
                            fontWeight: 900,
                            color: "#34d399",
                          }}
                        >
                          ${displayed.toLocaleString()}
                        </div>
                        <div style={{ marginTop: 6, color: "white" }}>
                          /month • ${(displayed * 12).toLocaleString()}/year
                        </div>
                        <div
                          style={{
                            marginTop: 12,
                            color: "white",
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
                  <div
                    style={{ width: window.innerWidth < 1024 ? "100%" : 560 }}
                  >
                    <div style={{ borderRadius: 12 }}>
                      <div
                        style={{
                          padding: 5,
                          textAlign: "center",
                          color: "#cbd5e1",
                          minHeight: window.innerWidth < 768 ? 200 : 140,
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
          right: window.innerWidth < 768 ? 12 : 28,
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
                width: active === i ? (window.innerWidth < 768 ? 48 : 72) : 12,
                height: 12,
                borderRadius: active === i ? 999 : 6,
                background: active === i ? "#7c3aed" : "#79E7F3",
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
          scrollbar-color: #34d399 transparent;
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

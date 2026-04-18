"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#ffffff" }}>

      {/* HERO */}
      <section style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          transform: `translateY(${scrollY * 0.2}px)`,
          fontSize: "clamp(120px, 25vw, 300px)",
          color: "rgba(0,0,0,0.03)",
          fontFamily: "'CenturyGothic', sans-serif",
        }}>
          VHERSO
        </div>

        <div style={{
          zIndex: 2,
          textAlign: "center",
          maxWidth: 800,
          padding: "0 2rem"
        }}>
          <p style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)",
            marginBottom: "1.5rem"
          }}>
            About the brand
          </p>

          <h1 style={{
            fontFamily: "'CenturyGothic', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 0.95,
            color: "#080808",
          }}>
            WHERE FASHION<br />MEETS ART
          </h1>
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section style={{
        padding: "6rem 2rem",
        borderTop: "1px solid rgba(0,0,0,0.06)"
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center"
        }}>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: 1.9,
            color: "rgba(0,0,0,0.6)",
          }}>
            Vherso is a contemporary lifestyle brand where fashion meets art.
          </p>
        </div>
      </section>

      {/* MAIN TEXT */}
      <section style={{
        padding: "6rem 2rem",
        borderTop: "1px solid rgba(0,0,0,0.06)"
      }}>
        <div style={{
          maxWidth: 700,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem"
        }}>

          <p style={p}>
            Founded by two brothers with a shared vision, Vherso was created to transform clothing into a visual and emotional experience. Each piece is designed as a canvas, a way to translate places, atmospheres, and moments into something you can wear.
          </p>

          <p style={p}>
            Every collection explores a different destination, blending culture, design, and storytelling into a unified visual identity.
          </p>

          <p style={p}>
            We are not just creating garments, but a sense of connection, a brand for those who see style as a form of expression and belonging. Attention to detail, authenticity, and aesthetic coherence are at the core of everything we do.
          </p>

          <p style={p}>
            Beyond clothing, Vherso is building an experience. Through digital storytelling, curated drops, and future physical spaces, we aim to create environments where fashion, art, and culture coexist, transforming every interaction with the brand into something immersive and meaningful.
          </p>

        </div>
      </section>

      {/* VISUAL BREAK */}
      <section style={{
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5"
      }}>
        <h2 style={{
          fontSize: "clamp(3rem, 10vw, 8rem)",
          color: "rgba(0,0,0,0.05)",
          fontFamily: "'CenturyGothic', sans-serif",
          letterSpacing: "0.05em"
        }}>
          EXPERIENCE
        </h2>
      </section>

      {/* VALUES */}
      <section style={{
        padding: "5rem 2rem",
        borderTop: "1px solid rgba(0,0,0,0.06)"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "2px"
        }}>
          {["AUTHENTIC", "ART DRIVEN", "LIMITED", "CULTURE"].map((v, i) => (
            <div key={v} style={{
              background: i % 2 === 0 ? "#f2f2f2" : "#f7f7f7",
              padding: "2.5rem 1.5rem",
              minHeight: "160px",
              display: "flex",
              alignItems: "flex-end"
            }}>
              <span style={{
                fontSize: "1.4rem",
                letterSpacing: "0.08em",
                color: "#080808"
              }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "6rem 2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(0,0,0,0.06)"
      }}>
        <h2 style={{
          fontSize: "clamp(2rem,4vw,3rem)",
          marginBottom: "2rem",
          color: "#080808"
        }}>
          Join the experience.
        </h2>

        <Link href="/shop" style={{
          background: "#080808",
          color: "#fff",
          padding: "1rem 2.5rem",
          letterSpacing: "0.2em",
          fontSize: "0.7rem",
          textTransform: "uppercase"
        }}>
          SHOP NOW
        </Link>
      </section>

    </div>
  );
}

const p = {
  fontSize: "0.95rem",
  lineHeight: 1.9,
  color: "rgba(0,0,0,0.55)",
};
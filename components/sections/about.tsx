/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import React from "react"

export default function About() {
  return (
    <div className="snes-box">
      <h2 className="snes-text">About Me</h2>

      <div className="snes-content">
        <p className="mb-3">
          I build fast, clean full-stack web apps with{' '}
          <span
            className="spoiler"
            style={{
              backgroundColor: '#000',
              color: '#000',
              padding: '0 4px',
              borderRadius: '4px',
              cursor: 'help',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.textShadow = '0 0 5px #fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            Next.js/Angular + Spring
          </span>
          . I like turning vague requirements into shipped features, and I care a lot about UI polish and
          stable APIs.
        </p>

        <ul className="snes-list space-y-2">
          <li>
            <span>
              <b>What I’m good at:</b> designing REST APIs, structuring frontends, making DX smooth
            </span>
          </li>
          <li>
            <span>
              <b>Recent win:</b> streamlined planning & resource flows (cut manual coordination by ~30%)
            </span>
          </li>
          <li>
            <span>
              <b>Current focus:</b> performance, accessibility, and solid testing habits
            </span>
          </li>
        </ul>

        <div className="mt-5">
          <h3 className="snes-subtitle">Contact</h3>
          <div className="flex flex-wrap gap-3 mt-2">
            <a className="snes-button" href="mailto:anaselmarzouqy@gmail.com">Email Me</a>
            <a
              className="snes-button"
              href="https://www.linkedin.com/in/epsilome/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            {/* Drop your PDF at /public/Anas-EL-MARZOUQY-CV.pdf */}
            <a className="snes-button" href="/Anas-EL-MARZOUQY-CV.pdf" target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

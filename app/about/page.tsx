import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ContactCTA } from "@/components/Footer";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "A UK-registered private limited company specialising in public relations, community relations and strategic stakeholder communications. Company number 17469585.",
};
const values = [
  [
    "Inclusive development",
    "Building initiatives that consider the different experiences, needs and priorities within a community.",
  ],
  [
    "Legal empowerment",
    "Making information about rights and responsibilities more accessible, with appropriate signposting.",
  ],
  [
    "Social cohesion",
    "Creating space for dialogue and trust between people and organisations with different perspectives.",
  ],
  [
    "Sustainable impact",
    "Building relationships and ways of working that can continue beyond the immediate challenge.",
  ],
];
export default function About() {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title={
          <>
            Where possibility
            <br />
            meets <em>purpose.</em>
          </>
        }
        description="We believe the space between communities and institutions can become a place of understanding, partnership and meaningful change."
      />
      <section className="section">
        <div className="container split-section">
          <img
            src="/images/community.webp"
            alt="A facilitator creating space for a group conversation"
          />
          <div>
            <span className="eyebrow">WELLSPRING & WATERSHED</span>
            <h2>
              Built around people.
              <br />
              <em>Grounded in connection.</em>
            </h2>
            <p>
              Wellspring &amp; Watershed is a UK-registered private limited
              company specialising in public relations, community relations and
              strategic stakeholder communications. Our company number is 17469585.
            </p>
            <p>
              We deliver structured frontline engagement programmes focused on
              social cohesion, legal empowerment, neighbourhood governance and
              inclusive advocacy. We act as an intermediary across agencies and
              contribute specialist expertise within collaborative partnerships.
            </p>
            <p>
              From statutory public consultation to our dedicated 24/7
              rapid-response desk, we help partners respond to complex challenges
              with clarity and care. Safeguarding, inclusion and the experience of
              the people affected remain at the centre of our work.
            </p>
          </div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT GUIDES US</span>
              <h2>
                Values that shape
                <br />
                <em>the way we work.</em>
              </h2>
            </div>
            <p>
              Four commitments.
              <br />
              One connected approach.
            </p>
          </div>
          <div className="values-grid">
            {values.map(([title, copy], i) => (
              <div className="value" key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container intro-grid">
          <span className="eyebrow">OUR MISSION & VISION</span>
          <div>
            <h2>
              Communities with a voice.
              <br />
              <em>Partnerships with a future.</em>
            </h2>
            <div className="intro-copy">
              <p>
                Our mission is to strengthen communities through inclusive
                participation, trusted relationships and effective coordination
                between the organisations that serve them.
              </p>
              <p>
                Our vision is a more connected society in which institutions and
                communities collaborate with clarity, confidence and shared
                purpose — and progress is shaped by the people it affects.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

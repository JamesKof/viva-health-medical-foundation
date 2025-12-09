import { Heart, HandCoins, Megaphone, Users } from "lucide-react";
import { Link } from "react-router-dom";

const VOLUNTEER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe7vJKmCjINn7aX7KVfysHMiWIALOMJJPhiLl6BJY4T6YdK2w/viewform";

const volunteerOptions = [
  {
    icon: Users,
    title: "Volunteer",
    description: "Join our team of dedicated healthcare volunteers making a difference.",
  },
  {
    icon: HandCoins,
    title: "Cash Donation",
    description: "Your financial support directly funds medical screenings and medications.",
  },
  {
    icon: Megaphone,
    title: "Publicity",
    description: "Help spread the word about our programs and reach more communities.",
  },
];

export const VolunteerSection = () => {
  return (
    <section id="volunteer" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
              <Heart className="w-4 h-4" />
              Want to Volunteer?
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Partner With Us
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We believe in the power of partnerships to drive positive change
              in healthcare. That's why we are always open to collaborating
              with like-minded organizations, businesses, and individuals who
              share our vision of improving healthcare access and quality for
              underserved communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
              <a
                href={VOLUNTEER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Become a Volunteer
              </a>
            </div>
          </div>

          {/* Volunteer Opportunities & Paths */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {volunteerOptions.map((option) => (
                <div
                  key={option.title}
                  className="group bg-card rounded-2xl p-6 shadow-soft card-lift cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <option.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <article className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Member Volunteer
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  (Registered member of VivaHealth Medical Foundation)
                </p>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-foreground/80 mb-2 uppercase">
                      Obligations
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        <span className="font-medium">Membership Registration:</span> Completes the official VivaHealth
                        membership form and pays any applicable annual dues.
                      </li>
                      <li>
                        <span className="font-medium">Commitment:</span> Participates actively in at least 3 Viva outreach
                        or community activities per year.
                      </li>
                      <li>
                        <span className="font-medium">Meetings:</span> Attends member meetings, capacity-building
                        sessions, and internal briefings when possible.
                      </li>
                      <li>
                        <span className="font-medium">Code of Conduct:</span> Upholds Viva&apos;s values of compassion,
                        professionalism, and accountability.
                      </li>
                      <li>
                        <span className="font-medium">Reporting:</span> Submits short reports or feedback after events
                        they volunteer in.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-foreground/80 mb-2 uppercase">
                      Benefits
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Receives a VivaHealth ID card and certificate of membership.</li>
                      <li>Priority placement for limited volunteer slots on outreaches and special projects.</li>
                      <li>Access to periodic training in health promotion, leadership, and project coordination.</li>
                      <li>Networking with professionals, health practitioners, and NGO partners through Viva events.</li>
                      <li>Eligibility for leadership roles such as team lead, regional rep, or coordinator.</li>
                      <li>Eligible for official recommendation letters or internship references.</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="bg-card rounded-2xl p-6 shadow-soft border border-border/60">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  Non-member Volunteer
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  (Occasional volunteer or supporter who joins specific activities)
                </p>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-foreground/80 mb-2 uppercase">
                      Obligations
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Joins upon invitation for specific Viva projects or community activities.</li>
                      <li>Completes a short volunteer briefing or orientation before events.</li>
                      <li>Follows all event guidelines and respects team leads and community partners.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-foreground/80 mb-2 uppercase">
                      Benefits
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Flexible involvement without long-term membership commitments.</li>
                      <li>Receives a volunteer certificate for each outreach or project supported.</li>
                      <li>
                        Gains hands-on experience in public health outreach, community service, and teamwork.
                      </li>
                      <li>
                        Clear pathway to later apply and become a full Member Volunteer within VivaHealth.
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

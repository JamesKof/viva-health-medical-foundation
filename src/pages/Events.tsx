import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageSEO } from "@/components/PageSEO";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Event = Tables<"events">;

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      setEvents(data || []);
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  const now = new Date();
  const upcoming = events.filter((event) => new Date(event.event_date) >= now);
  const past = events.filter((event) => new Date(event.event_date) < now).reverse();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <main className="min-h-screen bg-background">
      <PageSEO
        title="Events & Outreaches"
        description="Upcoming and past Viva Health Medical Foundation outreaches, clinics, and community programmes."
      />
      <Navbar />

      <section className="pt-32 pb-8 container mx-auto px-4">
        <p className="text-sm font-medium text-primary mb-2">Events</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 max-w-3xl">
          Upcoming outreaches and stories from the field
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Stay updated on Viva Health clinics, screenings, and community outreach programmes. Join as a volunteer, partner,
          or supporter.
        </p>
      </section>

      <section className="pb-16 container mx-auto px-4 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Upcoming Events
          </h2>
          {isLoading && !events.length ? (
            <p className="text-sm text-muted-foreground">Loading events...</p>
          ) : upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              There are no upcoming events scheduled at the moment. Please check back soon or follow our social channels
              for announcements.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <article
                  key={event.id}
                  className="bg-card rounded-2xl p-5 shadow-soft border border-border/60 flex flex-col gap-3"
                >
                  <p className="text-xs font-medium text-primary tracking-wide uppercase">
                    {formatDate(event.event_date)}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                  )}
                  <div className="mt-auto pt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </span>
                    {event.max_attendees && (
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-4 h-4" /> Max {event.max_attendees} participants
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-muted-foreground" /> Past Outreaches
          </h2>
          {past.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Past outreaches will appear here as we continue to grow our programmes and impact.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <article
                  key={event.id}
                  className="bg-muted/40 rounded-2xl p-5 border border-border/40 flex flex-col gap-3"
                >
                  <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                    {formatDate(event.event_date)}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                  )}
                  <div className="mt-auto pt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </span>
                    {event.max_attendees && (
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-4 h-4" /> Max {event.max_attendees} participants
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Events;

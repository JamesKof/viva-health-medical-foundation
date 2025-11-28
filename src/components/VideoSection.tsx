import { useState, useRef } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    id: "-MEexAkiM54",
    title: "Viva Health Medical Foundation Outreach",
  },
  {
    id: "tPrK-f9iXEk",
    title: "Community Health Initiative",
  },
  {
    id: "t4pbxjoUK3c",
    title: "Healthcare for All Campaign",
  },
];

export const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-foreground/[0.02]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
            <Play className="w-4 h-4" />
            Watch Our Impact
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Viva Health Magazine
          </h2>
          <p className="text-lg text-muted-foreground">
            See our healthcare outreach programs in action and the lives we're
            transforming together.
          </p>
        </div>

        {/* Video Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-card shadow-lifted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-card shadow-lifted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
              >
                <div className="group relative rounded-2xl overflow-hidden shadow-soft card-lift bg-card">
                  {activeVideo === video.id ? (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div
                      className="relative aspect-video cursor-pointer"
                      onClick={() => setActiveVideo(video.id)}
                    >
                      {/* Thumbnail */}
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lifted">
                          <Play className="w-6 h-6 text-accent-foreground ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Title */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

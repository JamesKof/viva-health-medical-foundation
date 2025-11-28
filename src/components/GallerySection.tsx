import { useState } from "react";
import { X, ZoomIn, Calendar, MapPin } from "lucide-react";
import outreach1 from "@/assets/blog/outreach-1.jpeg";
import accraGirls from "@/assets/blog/accra-girls.jpg";
import mentalHealth from "@/assets/blog/mental-health.png";

const galleryItems = [
  {
    id: 1,
    image: outreach1,
    title: "Medical Outreach 2024",
    location: "Accra, Ghana",
    date: "March 2024",
    category: "Outreach",
  },
  {
    id: 2,
    image: accraGirls,
    title: "Accra Girls Senior High School Visit",
    location: "Accra, Ghana",
    date: "February 2024",
    category: "Education",
  },
  {
    id: 3,
    image: mentalHealth,
    title: "Mental Health Awareness Campaign",
    location: "Greater Accra Region",
    date: "January 2024",
    category: "Awareness",
  },
  {
    id: 4,
    image: outreach1,
    title: "Community Health Screening",
    location: "Tema, Ghana",
    date: "December 2023",
    category: "Outreach",
  },
  {
    id: 5,
    image: accraGirls,
    title: "Youth Health Education Program",
    location: "Kasoa, Ghana",
    date: "November 2023",
    category: "Education",
  },
  {
    id: 6,
    image: mentalHealth,
    title: "Volunteer Training Workshop",
    location: "Accra, Ghana",
    date: "October 2023",
    category: "Training",
  },
];

const categories = ["All", "Outreach", "Education", "Awareness", "Training"];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Moments of <span className="text-primary">Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore photos from our medical outreaches, community events, and health education programs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-soft cursor-pointer card-lift"
              onClick={() => setSelectedImage(item)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-background mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-background/70">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </span>
                  </div>
                </div>
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center text-background">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div
              className="max-w-4xl w-full mx-4 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full rounded-2xl shadow-lifted"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-background mb-2">
                  {selectedImage.title}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm text-background/70">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedImage.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedImage.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

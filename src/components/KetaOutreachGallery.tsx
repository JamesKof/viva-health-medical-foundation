import { useState } from "react";
import { X, ZoomIn, Camera } from "lucide-react";

// Keta Outreach images
import loadingSupplies from "@/assets/keta-outreach/loading-supplies.jpg";
import teamBriefing from "@/assets/keta-outreach/team-briefing.jpg";
import waterSupplies from "@/assets/keta-outreach/water-supplies.jpg";
import volunteersCoordinating from "@/assets/keta-outreach/volunteers-coordinating.jpg";
import medicalStaffPpe from "@/assets/keta-outreach/medical-staff-ppe.jpg";
import photographerDocumenting from "@/assets/keta-outreach/photographer-documenting.jpg";

const ketaImages = [
  { id: 1, image: loadingSupplies, caption: "Loading medical supplies for the outreach" },
  { id: 2, image: teamBriefing, caption: "Team leader briefing volunteers" },
  { id: 3, image: waterSupplies, caption: "Essential supplies for the community" },
  { id: 4, image: volunteersCoordinating, caption: "Volunteers coordinating logistics" },
  { id: 5, image: medicalStaffPpe, caption: "Medical staff in protective equipment" },
  { id: 6, image: photographerDocumenting, caption: "Documenting the outreach" },
];

export const KetaOutreachGallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof ketaImages[0] | null>(null);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Camera className="w-4 h-4" />
            Your Donations in Action
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Keta <span className="text-primary">Outreach</span> Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the direct impact of donor contributions during our recent medical outreach in Keta, Volta Region.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ketaImages.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm text-background font-medium">{item.caption}</p>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center text-background">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.image}
                alt={selectedImage.caption}
                className="w-full rounded-2xl shadow-lifted"
              />
              <p className="mt-4 text-center text-background text-lg">{selectedImage.caption}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { collections } from "@/src/lib/collection-images";
import { useState, useEffect } from "react";
import { useCollectionsStore } from "@/src/store/useCollectionsStore";
import { SlideIn } from "@/src/animations";
import { SelectedCollection } from "@/src/store/useCollectionsStore";

export default function Collections() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const unSelect = useCollectionsStore((s) => s.unselect);
  const select = useCollectionsStore((s) => s.select);
  const selectedItems = useCollectionsStore((s) => s.selected);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);
  }, [selectedItems]);

  const showMoreBtnHandler = () => {
    setShowAll(!showAll);
  };

  const handleSelection = (item: SelectedCollection) => {
    if (selectedItems.some((c) => c.id === item.id)) {
      unSelect(item.id);
    } else {
      select(item);
    }
  };

  return (
    <section
      id="collections"
      className="overflow-x-clip pb-24 pt-10 md:pb-32 md:pt-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/white-bg.png')" }}
    >
      <div className="container-x">
        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="w-full min-w-0 md:w-auto">
            <span className="eyebrow text-gold-deep">The Lookbook </span>
            <h2 className="mt-3 max-w-xl font-display text-balance text-2xl leading-tight text-onyx sm:text-4xl md:text-5xl">
              Crafted for you
            </h2>
          </div>
          <p className="w-full min-w-0 max-w-sm text-sm text-onyx/60 md:w-auto">
            Tap the <span className="text-gold-deep">+</span> on any piece to
            add it to your enquiry.
          </p>
        </div>
      </div>

      <div className="container-x mt-10 min-w-0">
        <div className="grid min-w-0 w-full grid-cols-1 gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((item, i) => {
            if (isMobile && !showAll && i >= 2) return null;

            const selected = selectedItems.some((c) => c.id === item.id);
            const selectionPayload = {
              id: item.id,
              name: item.name,
              price: item.price,
            };

            return (
              <SlideIn
                key={item.id}
                direction="up"
                delay={(i % 3) * 0.08}
                className={`group relative w-full min-w-0 overflow-hidden rounded-sm transition-shadow duration-500 ${
                  selected
                    ? "ring-2 ring-gold shadow-[0_0_0_4px_rgba(93,132,172,0.15)]"
                    : ""
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-soft">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 78vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-couture group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/10 to-transparent" />

                  {/* Select toggle */}
                  <button
                    type="button"
                    onClick={() => handleSelection(selectionPayload)}
                    aria-pressed={selected}
                    aria-label={
                      selected
                        ? `Remove ${item.name} from your enquiry`
                        : `Add ${item.name} to your enquiry`
                    }
                    className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 ease-couture ${
                      selected
                        ? "border-gold bg-gold text-onyx"
                        : "border-ivory/40 bg-onyx/30 text-ivory hover:border-gold hover:text-gold"
                    }`}
                  >
                    {selected ? <Check size={16} /> : <Plus size={16} />}
                  </button>

                  {selected && (
                    <span className="eyebrow absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-onyx">
                      Selected
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="mt-3 font-display text-2xl text-ivory">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-ivory/15 pt-4">
                      <span className="text-sm font-medium text-gold-bright">
                        {item.price}
                      </span>
                      {/* <a
                        href="#contact"
                        aria-label={`Enquire about ${item.name}`}
                        onClick={() => select(selectionPayload)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
                      >
                        <ArrowUpRight size={16} />
                      </a> */}
                    </div>
                  </div>
                </div>
              </SlideIn>
            );
          })}
        </div>

        <button
          className={`cursor-pointer eyebrow text-gold-deep hover:text-gold ${
            !isMobile && "hidden"
          }`}
          onClick={showMoreBtnHandler}
        >
          {showAll ? "Show less " : "Show More"}
        </button>
      </div>
    </section>
  );
}

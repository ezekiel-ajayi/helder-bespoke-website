"use client";

import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { collections } from "@/src/lib/collection-images";
import { useState, useEffect } from "react";
import { useCollectionsStore } from "@/src/store/useCollectionsStore";
import { FadeIn, PopIn, StaggerGroup, StaggerItem } from "@/src/animations";

export default function Collections() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const isSelected = useCollectionsStore((s) => s.isSelected);
  const toggle = useCollectionsStore((s) => s.toggle);
  const select = useCollectionsStore((s) => s.select);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);
  }, []);

  const showMoreBtnHandler = () => {
    setShowAll(!showAll);
  };

  return (
    <section
      id="collections"
      className=" pb-24 pt-10 md:pb-32 md:pt-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/white-bg.png')" }}
    >
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <FadeIn direction="down" as="span">
              <span className="eyebrow text-gold-deep">The Lookbook </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="mt-3 max-w-xl font-display text-balance text-2xl leading-tight text-onyx sm:text-4xl md:text-5xl">
                Crafted for you
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.14} direction="none">
            <p className="max-w-sm text-sm text-onyx/60">
              Tap the <span className="text-gold-deep">+</span> on any piece
              to add it to your enquiry — select as many as you like, then
              review your picks in the form below.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-x mt-10">
        <StaggerGroup
          staggerChildren={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 w-full"
        >
          {collections.map((item, i) => {
            if (isMobile && !showAll && i >= 2) return null;

            const selected = isSelected(item.id);
            const selectionPayload = {
              id: item.id,
              name: item.name,
              tag: item.tag,
              price: item.price,
            };

            return (
              <StaggerItem
                key={item.id}
                variant="fade"
                className={`group relative w-full overflow-hidden rounded-sm transition-shadow duration-500 ${
                  selected ? "ring-2 ring-gold shadow-[0_0_0_4px_rgba(93,132,172,0.15)]" : ""
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
                    onClick={() => toggle(selectionPayload)}
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
                    <AnimatePresence mode="wait" initial={false}>
                      {selected ? (
                        <PopIn key="check" spring>
                          <Check size={16} />
                        </PopIn>
                      ) : (
                        <PopIn key="plus" spring>
                          <Plus size={16} />
                        </PopIn>
                      )}
                    </AnimatePresence>
                  </button>

                  {selected && (
                    <PopIn className="absolute left-4 top-4 z-10">
                      <span className="eyebrow rounded-full bg-gold px-3 py-1 text-onyx">
                        Selected
                      </span>
                    </PopIn>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="eyebrow text-gold-bright">{item.tag}</span>
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
                      <a
                        href="#contact"
                        aria-label={`Enquire about ${item.name}`}
                        onClick={() => select(selectionPayload)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <button
          className={`cursor-pointer eyebrow text-gold-deep hover:text-gold ${!isMobile && "hidden"}`}
          onClick={showMoreBtnHandler}
        >
          {showAll ? "Show less " : "Show More"}
        </button>
      </div>
    </section>
  );
}

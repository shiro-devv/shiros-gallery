import { useState, useEffect, useCallback, useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface GalleryImage {
  src: string
  alt?: string
}

interface GalleryAppProps {
  images: GalleryImage[]
}

const PER_PAGE = 15

function useScrollInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function AnimatedEntry({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useScrollInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
        inView
          ? "translate-y-0 blur-0 opacity-100"
          : "translate-y-12 blur-sm opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function DoubleBezel({
  children,
  className = "",
  outerRadius = "rounded-[1.5rem]",
  innerRadius = "rounded-[calc(1.5rem-0.375rem)]",
}: {
  children: React.ReactNode
  className?: string
  outerRadius?: string
  innerRadius?: string
}) {
  return (
    <div
      className={`${outerRadius} bg-white/[0.03] ring-1 ring-white/[0.04] p-1.5 ${className}`}
    >
      <div
        className={`${innerRadius} overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`}
      >
        {children}
      </div>
    </div>
  )
}

export function GalleryApp({ images }: GalleryAppProps) {
  const [page, setPage] = useState(1)
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi | null>(null)

  const totalPages = Math.ceil(images.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const pageImages = images.slice(start, start + PER_PAGE)

  const openCarousel = (gridIndex: number) => {
    setCarouselIndex(gridIndex)
    setCarouselOpen(true)
  }

  const closeCarousel = useCallback(() => {
    setCarouselOpen(false)
    setApi(null)
  }, [])

  useEffect(() => {
    if (!api || !carouselOpen) return
    api.scrollTo(carouselIndex)
  }, [api, carouselOpen, carouselIndex])

  useEffect(() => {
    if (!carouselOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCarousel()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [carouselOpen, closeCarousel])

  useEffect(() => {
    document.body.style.overflow = carouselOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [carouselOpen])

  const goToPage = (p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderPages = () => {
    const items: (number | "ellipsis")[] = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        items.push(i)
      } else if (items[items.length - 1] !== "ellipsis") {
        items.push("ellipsis")
      }
    }
    return items.map((item, idx) =>
      item === "ellipsis" ? (
        <PaginationItem key={`e${idx}`}>
          <span className="flex size-8 items-center justify-center text-muted-foreground/40 tracking-widest">
            ...
          </span>
        </PaginationItem>
      ) : (
        <PaginationItem key={item}>
          <PaginationLink
            isActive={item === page}
            onClick={() => goToPage(item)}
            className={
              item === page
                ? "!bg-foreground !text-background !border-foreground rounded-full text-xs font-medium"
                : "rounded-full text-xs text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.04]"
            }
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      )
    )
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-muted-foreground text-lg">No images found</p>
        <p className="text-muted-foreground text-sm mt-2">
          Add images to the src/assets folder
        </p>
      </div>
    )
  }

  return (
    <div className="noise-overlay">
      <main className="relative z-10 min-h-[100dvh]">
        <section className="pt-16 pb-8 md:pt-24 md:pb-12">
          <div className="px-4 sm:px-6 text-center">
            <AnimatedEntry>
              <span className="inline-block rounded-full border border-white/[0.06] px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70 mb-6">
                Collection
              </span>
            </AnimatedEntry>
            <AnimatedEntry delay={60}>
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal leading-[1.05] tracking-[-0.03em] text-foreground">
                Shiro's Gallery
              </h1>
            </AnimatedEntry>
            <AnimatedEntry delay={120}>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground/70 font-sans">
                {images.length} images
              </p>
            </AnimatedEntry>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {pageImages.map((img, i) => (
                  <AnimatedEntry
                    key={start + i}
                    delay={(i % 10) * 60}
                  >
                    <button
                      onClick={() => openCarousel(i)}
                      className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[1.5rem]"
                    >
                      <DoubleBezel>
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <img
                            src={img.src}
                            alt={img.alt || `Gallery image ${start + i + 1}`}
                            className="h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:brightness-[1.02]"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />
                        </div>
                      </DoubleBezel>
                    </button>
                  </AnimatedEntry>
              ))}
            </div>
          </div>
        </section>

        {totalPages > 1 && (
          <section className="pb-24 md:pb-32">
            <AnimatedEntry>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => goToPage(page - 1)}
                      className={
                        page <= 1
                          ? "pointer-events-none opacity-30 rounded-full"
                          : "rounded-full text-muted-foreground/60 hover:text-foreground"
                      }
                    />
                  </PaginationItem>
                  {renderPages()}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => goToPage(page + 1)}
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-30 rounded-full"
                          : "rounded-full text-muted-foreground/60 hover:text-foreground"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </AnimatedEntry>
          </section>
        )}

        {carouselOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm">
            <button
              onClick={closeCarousel}
              className="group absolute right-5 top-5 z-10"
              aria-label="Close carousel"
            >
              <DoubleBezel
                outerRadius="rounded-full"
                innerRadius="rounded-full"
                className="bg-white/[0.06] ring-white/[0.08]"
              >
                <div className="flex size-10 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10L10 22M10 10l12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </DoubleBezel>
            </button>

            <div className="flex w-full max-w-6xl items-center px-6">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {pageImages.map((img, idx) => (
                    <CarouselItem key={start + idx}>
                      <div className="flex items-center justify-center p-2">
                        <DoubleBezel
                          outerRadius="rounded-[2rem]"
                          innerRadius="rounded-[calc(2rem-0.375rem)]"
                          className="bg-white/[0.04] ring-white/[0.06]"
                        >
                          <div className="flex items-center justify-center bg-black/20">
                            <img
                              src={img.src}
                              alt={img.alt || `Gallery image ${start + idx + 1}`}
                              className="max-h-[70vh] w-auto max-w-full object-contain"
                            />
                          </div>
                        </DoubleBezel>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 md:-left-6 bg-white/[0.06] text-white/70 border-white/[0.08] hover:bg-white/[0.12] hover:text-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.92]" />
                <CarouselNext className="right-0 md:-right-6 bg-white/[0.06] text-white/70 border-white/[0.08] hover:bg-white/[0.12] hover:text-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.92]" />
              </Carousel>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <span className="rounded-full border border-white/[0.06] bg-white/[0.04] px-4 py-1.5 text-xs font-mono tracking-widest text-white/40 backdrop-blur-sm">
                {carouselIndex + 1} / {pageImages.length}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "E-Commerce Store — Modest Wear",
    description:
      "A complete Shopify-powered e-commerce store built for performance and conversion. Custom theme, optimized product pages, and seamless checkout flow.",
    image: "/project-1.jpeg",
    tag: "Store Building",
  },
  {
    title: "E-Commerce Store — Marlon",
    description:
      "A complete Shopify-powered e-commerce store built for performance and conversion. Custom theme, optimized product pages, and seamless checkout flow.",
    image: "/project-2.png",
    tag: "Full Growth",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards slide in from left with stagger
      const cards = cardsRef.current?.querySelectorAll("article");
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          02 / Projects
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          Featured E-Commerce Projects
        </h2>
      </div>

      {/* Two project cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: { title: string; description: string; image: string; tag: string };
  index: number;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden border border-border/50 bg-card",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Tag badge */}
        <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {project.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-baseline justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Project No. {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Divider line */}
        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>
    </article>
  );
}

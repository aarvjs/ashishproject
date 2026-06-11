import { Metadata } from "next";
import { FAQSection } from "@/components/FAQSection";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) - Sabka Saathi Digital Services",
  description: "Find clear answers to your questions about our software development services, project timelines, support, custom SaaS, and mobile app developments.",
  alternates: {
    canonical: "https://sabkasathi.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) - Sabka Saathi Digital Services",
    description: "Find clear answers to your questions about our software development services, project timelines, support, custom SaaS, and mobile app developments.",
    url: "https://sabkasathi.com/faq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions (FAQ) - Sabka Saathi Digital Services",
    description: "Find clear answers to your questions about our software development services, project timelines, support, custom SaaS, and mobile app developments.",
  },
};

export default function FAQPage() {
  const helpPoints = [
    "24/7 Expert Support",
    "Clear Project Timelines",
    "Transparent Collaboration",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        {/* Header Section */}
        <PageHero
          badge="Help Center"
          title="Frequently Asked"
          titleHighlight="Questions"
          subtitle="We understand that starting a digital journey can raise many questions. Here are clear answers to some of the most common queries regarding our services and workflow."
          type="faq"
          trustPoints={helpPoints}
          ctaText="Read FAQ Answers"
          ctaHref="#faq-list"
        />

        <section id="faq-list" className="py-16 container mx-auto px-4 pb-24">
          <FAQSection />
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

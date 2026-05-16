import { Hero } from '@/components/home/Hero';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { PropertyCategories } from '@/components/home/PropertyCategories';
import { AfricaMap } from '@/components/home/AfricaMap';
import { InfrastructureSection } from '@/components/home/InfrastructureSection';
import { PartnersMarquee } from '@/components/home/PartnersMarquee';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedProperties />
      <PropertyCategories />
      <AfricaMap />
      <InfrastructureSection />
      <PartnersMarquee />
      <Testimonials />
      <CTASection />
    </>
  );
}

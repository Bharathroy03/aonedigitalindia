import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aone Digital India — Your Trusted Electronics Destination',
  description:
    'Discover premium mobile phones and home appliances at Aone Digital India. Top brands, genuine products, best prices, and excellent after-sales service.',
  alternates: {
    canonical: '/',
  },
};

import Hero from '@/components/hero/Hero';
import BrandsSection from '@/components/brands/BrandsSection';
import CategoriesSection from '@/components/categories/CategoriesSection';
import WhyChooseUsSection from '@/components/why-choose-us/WhyChooseUsSection';
import OffersSection from '@/components/offers/OffersSection';
import GallerySection from '@/components/gallery/GallerySection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import FAQSection from '@/components/faq/FAQSection';
import ContactSection from '@/components/contact/ContactSection';
import ParallaxProvider from '@/providers/ParallaxProvider';

import { getFeaturedBrands } from '@/services/brands.service';
import {
  getAllCategories,
  getFeaturedOffers,
  getAllGallery,
  getFeaturedTestimonials,
  getFeaturedFAQ,
} from '@/services/content.service';
import { getFeaturedProducts } from '@/services/products.service';

export default async function HomePage() {
  // Parallel fetch on Server Component (fallback to json automatically via initialStates)
  const [brands, categories, offers, images, reviews, faqs, products] = await Promise.all([
    getFeaturedBrands().catch(() => []),
    getAllCategories().catch(() => []),
    getFeaturedOffers().catch(() => []),
    getAllGallery().catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getFeaturedFAQ().catch(() => []),
    getFeaturedProducts(20).catch(() => []),
  ]);

  return (
    <ParallaxProvider>
      <Hero />
      <BrandsSection brands={brands} />
      <CategoriesSection categories={categories} />
      <WhyChooseUsSection />
      <OffersSection offers={offers} />
      <GallerySection images={images} />
      <TestimonialsSection reviews={reviews} />
      <FAQSection faqs={faqs} />
      <ContactSection productList={products} />
    </ParallaxProvider>
  );
}

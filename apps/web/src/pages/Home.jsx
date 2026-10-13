import BookingSteps from "../components/home/BookingSteps";
import HeroSection from "../components/home/HeroSection";
import PopularFields from "../components/home/PopularFields";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularFields />
      <BookingSteps />
    </>
  );
}
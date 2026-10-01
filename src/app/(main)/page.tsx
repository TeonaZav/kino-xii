import ComingSoon from "@/src/features/home/components/ComingSoon";
import Hero from "@/src/features/home/components/Hero";
import NowPlaying from "@/src/features/home/components/NowPlaying";
import RecentlyViewed from "@/src/features/home/components/RecentlyViewed";

export default function Page() {
  return (
    <>
      <Hero />
      <RecentlyViewed />
      <NowPlaying />
      <ComingSoon />
    </>
  );
}

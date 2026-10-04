import Hero from "@/src/features/home/components/hero/Hero";
import NowPlaying from "@/src/features/home/components/nowPlaying/NowPlaying";
import ComingSoon from "@/src/features/home/components/comingSoon/ComingSoon";
import RecentlyViewed from "@/src/features/home/components/RecentlyViewed";

export default function Page() {
  return (
    <>
      <Hero />
      {/* <RecentlyViewed /> */}
      <NowPlaying />
      <ComingSoon />
    </>
  );
}

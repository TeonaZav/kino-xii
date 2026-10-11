import { Suspense } from "react";

import ProfilePageContent from "@/src/features/profile/components/ProfilePageContent";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfilePageContent />
    </Suspense>
  );
}

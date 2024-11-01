import { AuthLayout } from "@/components/layouts/auth-layout";
import { ProfileView } from "@/components/profile/profile-view";

export default function ProfilePage() {
  return (
    <AuthLayout requireAuth>
      <ProfileView />
    </AuthLayout>
  );
} 
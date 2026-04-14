import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthGuard } from "@/features/auth/ui/auth-guard";
import { AdminGuard } from "@/features/auth/ui/admin-guard";
import { AdminDashboardPage } from "@/pages/admin/dashboard/ui/AdminDashboardPage";
import { AdminLoginPage } from "@/pages/admin/login/ui/AdminLoginPage";
import { LoginPage } from "@/pages/auth/login/ui/LoginPage";
import { OAuthCallbackPage } from "@/pages/auth/oauth-callback/ui/OAuthCallbackPage";
import { TermsPage as AuthTermsPage } from "@/pages/auth/terms/ui/TermsPage";
import { GreenroomPage } from "@/pages/greenroom/room/ui/GreenroomPage";
import { HomePage } from "@/pages/home/ui/HomePage";
import { AccountPage } from "@/pages/my-page/account/ui/AccountPage";
import { HistoryDetailPage } from "@/pages/my-page/history-detail/ui/HistoryDetailPage";
import { HistoryPage } from "@/pages/my-page/history/ui/HistoryPage";
import { NotificationSettingPage } from "@/pages/notification-settings/ui/NotificationSettingPage";
import { NotificationsPage } from "@/pages/notifications/ui/NotificationsPage";
import { PrivacyPolicyPage } from "@/pages/my-page/privacy-policy/ui/PrivacyPolicyPage";
import { TermsPage as MyPageTermsPage } from "@/pages/my-page/terms/ui/TermsPage";
import { PodcastChoicePage } from "@/pages/greenroom/podcast-choice/ui/PodcastChoicePage";
import { PodcastPage } from "@/pages/greenroom/podcast/ui/PodcastPage";
import { IssuancePage } from "@/pages/ticket/issuance/ui/IssuancePage";
import { TrackingCompletePage } from "@/pages/tracking/complete/ui/TrackingCompletePage";
import { TrackingFailPage } from "@/pages/tracking/fail/ui/TrackingFailPage";
import { TrackingPage } from "@/pages/tracking/ui/TrackingPage";

function ProtectedLayout() {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}

function AdminProtectedLayout() {
  return (
    <AdminGuard>
      <Outlet />
    </AdminGuard>
  );
}

function NotFoundPage() {
  return <Navigate to="/" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/terms" element={<AuthTermsPage />} />
      <Route path="/oauth/callback/google" element={<OAuthCallbackPage />} />
      {/* <Route path="/test-login" element={<TestLoginPage />} /> */}
      {/* <Route path="/test-signup" element={<TestSignupPage />} /> */}
      {/* <Route path="/test-refresh" element={<TestRefreshPage />} /> */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/admin" element={<AdminProtectedLayout />}>
        <Route index element={<AdminDashboardPage />} />
      </Route>

      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="issuance" element={<IssuancePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="history/:id" element={<HistoryDetailPage />} />
        <Route path="greenroom" element={<GreenroomPage />} />
        <Route path="greenroom/podcast-choice" element={<PodcastChoicePage />} />
        <Route path="greenroom/podcast" element={<PodcastPage />} />
        <Route path="tracking/:id" element={<TrackingPage />} />
        <Route
          path="tracking/complete/:id"
          element={<TrackingCompletePage />}
        />
        <Route path="tracking/fail/:id" element={<TrackingFailPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route
          path="notification-settings"
          element={<NotificationSettingPage />}
        />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-of-service" element={<MyPageTermsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

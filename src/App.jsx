import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/protectedRoutes';
import ProfileCompletionModal from './Components/ProfileCompletionModal';
import axiosInstance from './utils/axios';

const Homepage = lazy(() => import('./Components/Homepage'));
const Homepage2 = lazy(() => import('./Components/Homepage2'));
const Aieditor = lazy(() => import('./Components/Aieditor'));
const BusinessGrowth = lazy(() => import('./Components/BusinessGrowth'));
const Testimonials = lazy(() => import('./Components/Testimonials'));
const JoinPage = lazy(() => import('./Components/Join/Join'));
const SignupPage = lazy(() => import('./Components/Signup/Signup'));
const Login = lazy(() => import('./Components/Login/Login'));
const CreateProfile = lazy(() => import('./Components/CreateProfile/Page'));
const VideoEditorDashboard = lazy(() => import('./Components/EditorDashboard/editorDashboard'));
const ContactUs = lazy(() => import('./Components/Contactus/Contactus'));
const ReviewPage = lazy(() => import('./Components/ReviewPage'));
const ChatInterface = lazy(() => import('./Components/ChatPage/ChatInterface'));
const PricingTiers = lazy(() => import('./Components/Profile/pricing-tiers'));
const Home = lazy(() => import('./Components/ExploreEditor/Page'));
const Dashboard = lazy(() => import('./Components/ClientDashboard/Dashboard'));
const AboutUs = lazy(() => import('./Components/AboutUs/Aboutus'));
const JobPage = lazy(() => import('./Components/JobPage/Jobpage'));
const ProfilePage = lazy(() => import('./Components/Profile/profile-page'));
const EmailVerification = lazy(() => import('./Components/Signup/EmailVerification'));
const PasswordRecovery = lazy(() => import('./Components/Login/password_recovery'));
const JobPosting = lazy(() => import('./Components/JobPost/Page'));
const ProjectPage = lazy(() => import('./Components/ProjectManagement/Page'));
const PaymentPage = lazy(() => import('./Components/PaymentPage/Payment'));
const JobProfile = lazy(() => import('./Components/JobProfilePage/Page'));
const ProjectWorkspace = lazy(() => import('./Components/ProjectManagement/ProjectWorkspace'));
const FAQPage = lazy(() => import('./Components/Faqs/FaqsPage'));
const EditorPaymentDetails = lazy(() => import('./Components/EditorPaymentDetails/Page'));
const FindEditorsPage = lazy(() => import('./Components/EditorsPage/Page'));
const WorkYourWay = lazy(() => import('./Components/WorkYourWay'));
const HowItWorks = lazy(() => import('./Components/HowitWorks'));
const PopularServices = lazy(() => import('./Components/PopularService'));
const Suite = lazy(() => import('./Components/Suite'));
const TrendingGigs = lazy(() => import('./Components/GigsSection'));
const OnboardingPage = lazy(() => import('./Components/TypeOfEditorPopup'));
const TeamMembers = lazy(() => import('./Components/TeamMembers/TeamMembers'));
const PortfolioPage = lazy(() => import('./Components/Portfolio'));
const BlogPage = lazy(() => import('./Components/Blog'));
const DashboardPage = lazy(() => import('./Components/Dashboard'));
const ChatClientDashboard = lazy(() => import('./Components/ChatClientSection/page'));
const ChatDashboard = lazy(() => import('./Components/ChatEditorSection/dashboard'));
const ClientProfile = lazy(() => import('./Components/ClientProfile/Page'));
const GigDashboard = lazy(() => import('./Components/GigsDashboard/Page'));
const CreateGigForm = lazy(() => import('./Components/GigsDashboard/GigForm'));
const Settings = lazy(() => import('./Components/Settings/settings'));
const JobDescriptionPage = lazy(() => import('./Components/JobDescription/Page'));
const GigMainPage = lazy(() => import('./Components/GigSection/Page'));

function NavbarPage() {
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        try {
          const response = await axiosInstance.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data.data;
          // Dispatch is handled in Login.jsx or Signup.jsx
          if (
            userData.role === "FREELANCER" &&
            !userData.isProfileComplete &&
            localStorage.getItem("hasSkippedFreelancerModal") !== "true"
          ) {
            setShowModal(true);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          localStorage.removeItem("token");
        }
      } else if (
        user?.role === "FREELANCER" &&
        !user.isProfileComplete &&
        localStorage.getItem("hasSkippedFreelancerModal") !== "true"
      ) {
        setShowModal(true);
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleModalClose = (skip = false) => {
    if (skip) {
      localStorage.setItem("hasSkippedFreelancerModal", "true");
    }
    setShowModal(false);
  };

  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "5rem" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Homepage />
                  <TrendingGigs />
                  <Aieditor />
                  <PopularServices />
                  <Homepage2 />
                  <BusinessGrowth />
                  <WorkYourWay />
                  <Suite />
                  <Testimonials />
                </>
              }
            />
            <Route path="/hireeditor" element={<Home />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/freelancerProfile" element={<ProfilePage />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/editor-dashboard" element={<VideoEditorDashboard />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/findwork" element={<JobPage />} />
            <Route path="/jobposting" element={<JobPosting />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/pricing" element={<PricingTiers />} />
            <Route path="/client-dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/verify-email/:email" element={<EmailVerification />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route path="/jobprofile" element={<JobProfile />} />
            <Route path="/project-workspace" element={<ProjectWorkspace />} />
            <Route path="/editor-payment" element={<EditorPaymentDetails />} />
            <Route path="/editors" element={<FindEditorsPage />} />
            <Route path="/pop" element={<OnboardingPage />} />
            <Route path="/team" element={<TeamMembers />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/editorchat" element={<ChatDashboard />} />
            <Route path="/clientchat" element={<ChatClientDashboard />} />
            <Route path="/clientProfile" element={<ClientProfile />} />
            <Route path="/gigs-dashboard" element={<GigDashboard />} />
            <Route path="/create-gig" element={<CreateGigForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/job/:jobId" element={<JobDescriptionPage />} />
            <Route path="/gigpage" element={<GigMainPage />} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          </Routes>
        </Suspense>
        {showModal && <ProfileCompletionModal onClose={handleModalClose} />}
      </div>
      <Footer />
    </Router>
  );
}

export default NavbarPage;
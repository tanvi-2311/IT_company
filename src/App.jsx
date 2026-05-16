import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import AiIntegration from './pages/AiIntegration'
import HireDeveloper from './pages/HireDeveloper'
import HireDedicatedDevelopers from './pages/HireDedicatedDevelopers'
import AiService from './pages/AiService'
import AboutFeature from './pages/AboutFeature'
import IndustryFeature from './pages/IndustryFeature'
import ResourceFeature from './pages/ResourceFeature'
import Portfolio from './pages/Portfolio'
import ServiceDetail from './pages/ServiceDetail'
import AdminPanel from './pages/AdminPanel'
import DeveloperProfile from './pages/DeveloperProfile'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import Sitemap from './pages/Sitemap'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-secondary selection:bg-primary selection:text-white">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className={`flex-grow ${!isAdminRoute ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-integration-services" element={<AiIntegration />} />
          <Route path="/hire-dedicated-developers" element={<HireDedicatedDevelopers />} />
          <Route path="/hire/hire-dedicated-developers" element={<HireDedicatedDevelopers />} />
          <Route path="/ai/:slug" element={<AiService />} />
          <Route path="/hire/:slug" element={<HireDeveloper />} />
          <Route path="/about/:slug" element={<AboutFeature />} />
          <Route path="/industry/:slug" element={<IndustryFeature />} />
          <Route path="/resource/:slug" element={<ResourceFeature />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/developer/:talentId" element={<DeveloperProfile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />
          {/* Admin Panel - Only accessible locally */}
          {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
            <Route path="/admin/developers" element={<AdminPanel />} />
          )}
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster position="top-right" />
    </div>
  )
}

export default App

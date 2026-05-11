import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import AiIntegration from './pages/AiIntegration'
import HireDeveloper from './pages/HireDeveloper'
import AiService from './pages/AiService'
import AboutFeature from './pages/AboutFeature'
import IndustryFeature from './pages/IndustryFeature'
import ResourceFeature from './pages/ResourceFeature'
import Portfolio from './pages/Portfolio'
import ServiceDetail from './pages/ServiceDetail'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-secondary selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-integration-services" element={<AiIntegration />} />
          <Route path="/ai/:slug" element={<AiService />} />
          <Route path="/hire/:slug" element={<HireDeveloper />} />
          <Route path="/about/:slug" element={<AboutFeature />} />
          <Route path="/industry/:slug" element={<IndustryFeature />} />
          <Route path="/resource/:slug" element={<ResourceFeature />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default App

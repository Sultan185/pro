'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Linkedin, Phone, Github, Download, ExternalLink, Home as HomeIcon, Calendar, Monitor, Globe, Building2, Code, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const masterpiecesProjects = [
    {
      id: 'gdawel',
      name: 'Gdawel',
      description: 'Multi-Tenancy ERP System',
      tags: ['Laravel', 'Vue', 'Microservices'],
      url: 'https://gdawel.app/',
    },
    {
      id: 'basma',
      name: 'Basma',
      description: 'HRM Management - Multi Database Architecture',
      tags: ['Laravel', 'MySQL', 'Multi-tenancy'],
      url: 'https://pasma.hashstudio.dev',
    },
    {
      id: 'archive',
      name: 'Archive',
      description: 'Document Archiving System - Filament Expert',
      tags: ['Filament', 'Livewire', 'FilamentCI'],
      url: 'https://www.mnsah.com.sa/',
    }
  ]

  const fromScratchProjects = [
    {
      id: 'parfum',
      name: 'Parfum',
      description: 'Premium Perfume E-Commerce Platform',
      tags: ['Laravel', 'MySQL', 'E-Commerce'],
      url: 'https://parfum.sa/',
    },
    {
      id: '2me',
      name: '2ME',
      description: 'E-Commerce Platform',
      tags: ['Laravel', 'MySQL', 'E-Commerce'],
      url: 'https://2me.com.eg/shop/',
    }
  ]

  const experiences = [
    { name: 'Hash Studio', duration: '1 Year Onsite', icon: Building2, url: 'https://hashstudio.com/' },
    { name: 'ACWAD Turkey', duration: '1 Year Remotely', icon: Building2, url: '#' },
    { name: 'Mnsah', duration: '1 Year Remote part Time', icon: Globe, url: 'https://www.mnsah.com.sa/' }
  ]

  return (
    <main className="min-h-screen bg-dark text-text-primary overflow-hidden relative">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-glow/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Custom Cursor Glow */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-50 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 sm:mb-24"
        >
          <div className="glass-effect terminal-border p-6 sm:p-10 lg:p-12 border border-gray-800 relative overflow-hidden">
            {/* Animated Corner Accents */}
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Top Navigation */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <motion.h2 
                className="text-primary text-lg sm:text-xl font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Code size={20} className="animate-pulse" />
                Hero Section
              </motion.h2>
              <div className="flex gap-4 text-xs sm:text-sm text-text-secondary items-center">
                <motion.div 
                  className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <HomeIcon size={16} />
                  <span>Somali</span>
                </motion.div>
                <motion.a
                  href="https://wa.me/201099793552"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Phone size={16} />
                  <span>WhatsApp</span>
                </motion.a>
                <motion.button 
                  className="hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Github size={16} />
                </motion.button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                {/* Profile Image with Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 lg:hidden flex justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-glow-orange-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
                    <Image
                      src="/profile.jpeg"
                      alt="Mohamed Ashraf Sultan"
                      width={192}
                      height={192}
                      className="object-cover w-full h-full"
                      priority
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = '/profile.jpg'
                      }}
                    />
                  </motion.div>
                </motion.div>

                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-pulse-slow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Mohamed Ashraf Sultan
                </motion.h1>
                <motion.p 
                  className="text-xl sm:text-2xl text-text-secondary mb-8 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Sparkles size={24} className="text-primary animate-pulse" />
                  Backend Architect | Laravel Expert
                </motion.p>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,107,0,0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-3 rounded-lg font-semibold shadow-glow-orange transition-all"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    href="/Mohamed_Ashraf_Sultan_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download size={18} />
                    Download CV
                  </motion.a>
                </div>

                {/* Experience Badges */}
                <div className="flex flex-wrap gap-3">
                  {experiences.map((exp, index) => {
                    const IconComponent = exp.icon
                    return (
                      <motion.a
                        key={exp.name}
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          boxShadow: '0 0 20px rgba(255,107,0,0.3)'
                        }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="glass-effect border border-gray-700 rounded-full px-4 py-2.5 flex items-center gap-2 text-sm bg-dark-light hover:border-primary transition-all cursor-pointer relative group"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <IconComponent size={16} className="text-primary" />
                        </motion.div>
                        <span className="font-medium text-text-primary">{exp.name}</span>
                        <span className="text-text-secondary text-xs">({exp.duration})</span>
                        {/* Link Icon on Hover */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="ml-1 text-primary"
                        >
                          <ExternalLink size={12} />
                        </motion.div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Profile Image + Terminal Window */}
              <div className="space-y-6">
                {/* Large Profile Image - Desktop Only */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden lg:block mb-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border-4 border-primary shadow-glow-orange-lg group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-blue-glow/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <Image
                      src="/profile.jpeg"
                      alt="Mohamed Ashraf Sultan"
                      width={256}
                      height={256}
                      className="object-cover w-full h-full relative z-0"
                      priority
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = '/profile.jpg'
                      }}
                    />
                    {/* Floating Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary shadow-glow-orange z-20"
                    >
                      <span className="text-primary font-mono text-sm">{"<Developer/>"}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Terminal Window */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect border border-primary/50 rounded-xl shadow-glow-orange overflow-hidden bg-dark-light/50 relative"
                >
                  {/* Scanning Line Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-20"
                    animate={{ y: [0, 200, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="bg-dark-light px-4 py-2.5 flex items-center justify-between border-b border-gray-800">
                    <div className="flex gap-1.5">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-red-500"
                        whileHover={{ scale: 1.3 }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-yellow-500"
                        whileHover={{ scale: 1.3 }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-green-500 animate-pulse"
                        whileHover={{ scale: 1.3 }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary font-mono">terminal.sh</span>
                  </div>
                  <div className="p-6 font-mono text-sm relative z-10">
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <span className="text-green-400 animate-pulse">$</span>
                      <span className="text-cyan-300">php artisan migrate --seed</span>
                    </motion.div>
                    <motion.div 
                      className="mt-4 h-1.5 bg-gradient-to-r from-primary to-orange-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 2, delay: 0.9 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-3 text-green-400 text-xs"
                    >
                      ✓ Database seeded successfully
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Masterpieces Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24"
        >
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              The <span className="text-primary">Masterpieces</span>
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterpiecesProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5 }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`glass-effect rounded-xl p-6 transition-all duration-300 border backdrop-blur-sm cursor-pointer relative overflow-hidden block ${
                  hoveredCard === project.id 
                    ? 'border-blue-glow shadow-glow-blue-lg' 
                    : 'border-primary/50 shadow-glow-orange'
                }`}
                style={{
                  background: 'rgba(42, 42, 42, 0.5)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Animated Corner Glow */}
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
                  style={{
                    background: hoveredCard === project.id 
                      ? 'radial-gradient(circle, rgba(0,191,255,0.3) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, transparent 70%)'
                  }}
                  animate={hoveredCard === project.id ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Project Number Badge */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center font-mono text-xs text-primary"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {index + 1}
                </motion.div>

                <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                  <Sparkles size={20} className="animate-pulse" />
                  {project.name}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    className="ml-auto"
                  >
                    <ExternalLink size={18} className="text-primary hover:text-blue-glow transition-colors" />
                  </motion.div>
                </h3>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,107,0,0.2)' }}
                      className="text-xs px-3 py-1.5 rounded-full bg-dark-light border border-gray-700 text-text-secondary hover:border-primary hover:text-primary transition-all cursor-pointer"
                      onClick={(e) => e.preventDefault()}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* From Scratch Projects Section */}
        <motion.section
          id="from-scratch"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24"
        >
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              From Scratch <span className="text-primary">Projects</span>
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fromScratchProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5 }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`glass-effect rounded-xl p-6 transition-all duration-300 border backdrop-blur-sm cursor-pointer relative overflow-hidden block ${
                  hoveredCard === project.id 
                    ? 'border-blue-glow shadow-glow-blue-lg' 
                    : 'border-primary/50 shadow-glow-orange'
                }`}
                style={{
                  background: 'rgba(42, 42, 42, 0.5)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Animated Corner Glow */}
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
                  style={{
                    background: hoveredCard === project.id 
                      ? 'radial-gradient(circle, rgba(0,191,255,0.3) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, transparent 70%)'
                  }}
                  animate={hoveredCard === project.id ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Project Number Badge */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center font-mono text-xs text-primary"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {index + 1}
                </motion.div>

                <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                  <Sparkles size={20} className="animate-pulse" />
                  {project.name}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    className="ml-auto"
                  >
                    <ExternalLink size={18} className="text-primary hover:text-blue-glow transition-colors" />
                  </motion.div>
                </h3>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,107,0,0.2)' }}
                      className="text-xs px-3 py-1.5 rounded-full bg-dark-light border border-gray-700 text-text-secondary hover:border-primary hover:text-primary transition-all cursor-pointer"
                      onClick={(e) => e.preventDefault()}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24"
        >
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Tech <span className="text-primary">Stack</span>
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass-effect border border-blue-glow/50 rounded-xl shadow-glow-blue overflow-hidden bg-dark-light/50"
          >
            <div className="bg-dark-light px-4 py-2.5 flex items-center gap-2 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm overflow-x-auto">
              <pre className="text-text-primary">
                <span className="text-purple-400">public function</span> <span className="text-yellow-300">getSkills</span><span className="text-text-primary">() {'{'}</span>
                {'\n  '}<span className="text-cyan-400">return</span> <span className="text-text-primary">{'{'}</span>
                {'\n    '}<span className="text-green-400">Backend</span><span className="text-text-primary">: [</span><span className="text-orange-400">PHP</span><span className="text-text-primary">, </span><span className="text-orange-400">Laravel</span><span className="text-text-primary">, </span><span className="text-orange-400">NodeJS</span><span className="text-text-primary">]</span>
                {'\n    '}<span className="text-green-400">Frontend</span><span className="text-text-primary">: [</span><span className="text-orange-400">Livewire</span><span className="text-text-primary">, </span><span className="text-orange-400">TailwindCS</span><span className="text-text-primary">, </span><span className="text-orange-400">React</span><span className="text-text-primary">, </span><span className="text-orange-400">Vue</span><span className="text-text-primary">]</span>
                {'\n    '}<span className="text-green-400">Filament</span><span className="text-text-primary">: [</span><span className="text-orange-400">MySQL</span><span className="text-text-primary">, [</span><span className="text-orange-400">MONGODB</span><span className="text-text-primary">]]</span>
                {'\n    '}<span className="text-green-400">Tools</span><span className="text-text-primary">: [</span><span className="text-orange-400">Docker</span><span className="text-text-primary">, </span><span className="text-orange-400">Linux</span><span className="text-text-primary">, </span><span className="text-orange-400">Git</span><span className="text-text-primary">]</span>
                {'\n  '}<span className="text-text-primary">{'}'}</span>
                {'\n'}<span className="text-text-primary">{'}'}</span>
              </pre>
            </div>
          </motion.div>
        </motion.section>

        {/* Footer / CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-12 relative"
        >
          {/* Floating Elements */}
          <motion.div
            className="absolute top-0 left-1/4 text-4xl"
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            💻
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-1/4 text-4xl"
            animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🚀
          </motion.div>

          <motion.h2 
            className="text-3xl sm:text-5xl font-bold mb-12 relative z-10"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent animate-pulse-slow">
              Scalable.
            </span>
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10 relative z-10">
            <motion.a
              whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:mohamedsoltan1852@gmail.com"
              className="w-14 h-14 rounded-full glass-effect border border-gray-700 flex items-center justify-center hover:border-primary hover:shadow-glow-orange transition-all bg-dark-light group relative"
            >
              <Mail size={22} className="text-text-primary group-hover:text-primary transition-colors" />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -30 }}
                className="absolute text-xs text-primary font-semibold"
              >
                Email
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com/in/mohamed-soltan-36551a21a"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full glass-effect border border-gray-700 flex items-center justify-center hover:border-primary hover:shadow-glow-orange transition-all bg-dark-light group relative"
            >
              <Linkedin size={22} className="text-text-primary group-hover:text-primary transition-colors" />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -30 }}
                className="absolute text-xs text-primary font-semibold"
              >
                LinkedIn
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="tel:+201099793552"
              className="w-14 h-14 rounded-full glass-effect border border-gray-700 flex items-center justify-center hover:border-primary hover:shadow-glow-orange transition-all bg-dark-light group relative"
            >
              <Phone size={22} className="text-text-primary group-hover:text-primary transition-colors" />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -30 }}
                className="absolute text-xs text-primary font-semibold"
              >
                Phone
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, rotate: 5, y: -5 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full glass-effect border border-gray-700 flex items-center justify-center hover:border-primary hover:shadow-glow-orange transition-all bg-dark-light group relative"
            >
              <Github size={22} className="text-text-primary group-hover:text-primary transition-colors" />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -30 }}
                className="absolute text-xs text-primary font-semibold"
              >
                GitHub
              </motion.span>
            </motion.a>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px rgba(255,107,0,0.6)',
              backgroundColor: '#ff6b00',
              color: '#ffffff'
            }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-lg font-bold text-lg shadow-glow-orange transition-all font-mono relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">sudo contact me</span>
          </motion.button>

          {/* Floating Particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.section>

        {/* Decorative Animated Elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="fixed bottom-8 right-8 text-6xl opacity-20 pointer-events-none hidden lg:block"
        >
          ✨
        </motion.div>
      </div>
    </main>
  )
}

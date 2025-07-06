import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useState, useEffect } from 'react';

import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const glowAnimation = {
    boxShadow: [
      "0 0 20px rgba(138, 43, 226, 0.3)",
      "0 0 40px rgba(138, 43, 226, 0.6)",
      "0 0 20px rgba(138, 43, 226, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section 
          className="home-enhanced"
          {...slideAnimation('left')}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black opacity-95" />
            
            {/* Floating Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-purple-400"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: particle.x,
                  top: particle.y,
                  opacity: particle.opacity,
                }}
                animate={{
                  y: [particle.y, particle.y - 100, particle.y],
                  x: [particle.x, particle.x + 50, particle.x],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Geometric Patterns */}
            <div className="absolute top-20 left-20 w-32 h-32 border border-purple-500 opacity-20 rotate-45" />
            <div className="absolute bottom-40 right-20 w-24 h-24 border border-purple-400 opacity-15 rotate-12" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-300 opacity-10 -rotate-12" />
            
            {/* Mouse Follower Glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Header */}
          <motion.header 
            {...slideAnimation("down")}
            className="relative z-10"
          >
            <motion.div
              animate={floatingAnimation}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 10l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="text-white font-bold text-xl">
                <span className="text-purple-400">Style</span>Forge
              </div>
            </motion.div>
          </motion.header>

          {/* Main Content */}
          <motion.div className="home-content-enhanced relative z-10" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              {/* Animated Title */}
              <div className="relative">
                <h1 className="head-text-enhanced">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-white">
                    CREATE
                  </span>
                  <br className="xl:block hidden" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-purple-400">
                    MAGIC.
                  </span>
                </h1>
                
                {/* Glowing underline */}
                <motion.div
                  className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"
                  animate={{
                    width: ["0%", "60%", "0%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-8"
            >
              {/* Enhanced Description */}
              <div className="glass-card p-6 max-w-md">
                <p className="text-gray-300 text-base leading-relaxed">
                  Transform your ideas into reality with our 
                  <span className="text-purple-400 font-semibold"> revolutionary 3D customization</span> platform. 
                  Unleash your creativity and design shirts that tell your unique story.
                </p>
                
                {/* Feature highlights */}
                <div className="mt-4 flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-purple-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    AI-Powered 
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    Real-time 3D
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    Unlimited Designs
                  </div>
                </div>
              </div>

              {/* Enhanced Button */}
              <motion.div
                animate={glowAnimation}
                className="w-fit"
              >
                <CustomButton
                  type="filled"
                  title="Start Creating"
                  handleClick={() => state.intro = false}
                  customStyles="neo-button px-8 py-4 font-bold text-base"
                />
              </motion.div>

              {/* Social proof */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-black flex items-center justify-center text-white text-xs font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <span>Join 10,000+ designers creating amazing shirts</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Action Elements */}
          <motion.div
            className="absolute bottom-10 right-10 hidden lg:block"
            animate={floatingAnimation}
          >
            
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
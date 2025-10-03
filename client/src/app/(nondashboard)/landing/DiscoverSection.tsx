"use client";
import { motion } from "framer-motion";
import { Search, Calendar, Heart, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const DiscoverSection = () => {
  const steps = [
    {
      icon: Search,
      title: "বাসা খুঁজুন",
      description: "আপনার পছন্দের এলাকায় যাচাইকৃত ব্যাচেলর বাসার তালিকা দেখুন এবং পছন্দের একটি বেছে নিন।",
      step: "০১",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      icon: Calendar,
      title: "ভিজিট বুক করুন",
      description: "মালিকের সাথে যোগাযোগ করুন এবং বাসা দেখার জন্য সময় নির্ধারণ করুন।",
      step: "০২", 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Heart,
      title: "নতুন ঠিকানায় স্বাগতম",
      description: "চুক্তি সম্পন্ন করুন এবং আপনার নতুন ব্যাচেলর বাসায় স্বাচ্ছন্দ্যে থাকুন।",
      step: "০৩",
      color: "text-rose-600", 
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)'
      }}
    >
      {/* Advanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-teal-200/30 rounded-full"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-blue-200/30 rounded-lg rotate-12"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-teal-300/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 relative"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                কীভাবে 
              </span>
              <span className="relative mx-2">
                <span className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  কাজ করে
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full origin-left"
                ></motion.div>
              </span>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ?
              </span>
            </h2>
            
            {/* Question mark decoration */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-8 text-6xl text-teal-200 opacity-30"
            >
              ?
            </motion.div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            মাত্র তিনটি সহজ ধাপে খুঁজে নিন আপনার স্বপ্নের ব্যাচেলর বাসা এবং শুরু করুন নতুন জীবন
          </motion.p>
          
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center mt-8 space-x-2"
          >
            {[1, 2, 3].map((step, index) => (
              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-center"
              >
                <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></div>
                {index < 2 && <div className="w-8 h-0.5 bg-gradient-to-r from-teal-300 to-blue-300 mx-2"></div>}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-teal-300 to-blue-300 transform -translate-y-1/2"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-rose-300 transform -translate-y-1/2"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative z-10"
            >
              <DiscoverCard {...step} />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-24"
        >
          {/* Enhanced CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <h3 
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              প্রস্তুত হয়ে গেছেন?
            </h3>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              আজই শুরু করুন এবং খুঁজে নিন আপনার আদর্শ ব্যাচেলর বাসা
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 text-xl overflow-hidden"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10">এখনই শুরু করুন</span>
              <ArrowRight className="h-6 w-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center px-12 py-5 border-2 border-teal-600 text-teal-600 font-bold rounded-2xl hover:bg-teal-50 transition-all duration-500 text-xl overflow-hidden"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {/* Background slide effect */}
              <div className="absolute inset-0 bg-teal-50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              
              <span className="relative z-10 group-hover:text-teal-700 transition-colors duration-300">
                আরও জানুন
              </span>
            </motion.button>
          </div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
              বিনামূল্যে রেজিস্ট্রেশন
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              তাৎক্ষণিক অ্যাক্সেস
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              ২৪/৭ কাস্টমার সাপোর্ট
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const DiscoverCard = ({
  icon: Icon,
  title,
  description,
  step,
  color,
  bgColor
}: {
  icon: any;
  title: string;
  description: string;
  step: string;
  color: string;
  bgColor: string;
}) => (
  <div className="group relative">
    {/* Floating step number with advanced styling */}
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="absolute -top-6 -right-6 z-20"
    >
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
          <span style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>{step}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
      </div>
    </motion.div>
    
    {/* Main card with advanced effects */}
    <div className="relative bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 group-hover:border-teal-200 overflow-hidden transform group-hover:-translate-y-2">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="currentColor" strokeWidth="1" className={color}/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className={color}/>
        </svg>
      </div>
      
      {/* Enhanced icon section */}
      <div className="relative mb-8 text-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`inline-flex items-center justify-center w-24 h-24 ${bgColor} rounded-2xl mb-6 transition-all duration-500 shadow-xl relative overflow-hidden`}
        >
          {/* Icon glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <Icon className={`h-12 w-12 ${color} relative z-10 transition-transform duration-500`} />
          
          {/* Floating particles around icon */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1.5 h-1.5 ${bgColor} rounded-full opacity-0 group-hover:opacity-70`}
                style={{
                  left: `${25 + i * 15}%`,
                  top: `${25 + i * 15}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Content with enhanced typography */}
      <div className="relative z-10 text-center">
        <h3 
          className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-teal-700 transition-colors duration-300"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
        >
          {title}
        </h3>
        <p 
          className="text-gray-600 leading-relaxed text-xl group-hover:text-gray-700 transition-colors duration-300"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
        >
          {description}
        </p>
      </div>
      
      {/* Bottom progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full bg-gradient-to-r ${color.replace('text-', 'from-')} to-transparent`}
        ></motion.div>
      </div>
    </div>
  </div>
);

export default DiscoverSection;
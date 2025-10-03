"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Shield, Heart, MapPin, Star, Users } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      staggerChildren: 0.1 
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

const FeaturedSection = () => {
  const features = [
    {
      icon: Shield,
      title: "যাচাইকৃত নিরাপদ বাসা",
      description: "প্রতিটি বাসা আমাদের দল দ্বারা যাচাই করা এবং নিরাপত্তার গ্যারান্টি সহ।",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      icon: Search,
      title: "স্মার্ট সার্চ সিস্টেম",
      description: "আপনার পছন্দ অনুযায়ী এলাকা, দাম এবং সুবিধা দিয়ে সহজেই খুঁজে নিন।",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Heart,
      title: "ব্যাচেলর ফ্রেন্ডলি",
      description: "বিশেষভাবে ব্যাচেলরদের জন্য উপযুক্ত এবং স্বাগত জানানো বাসাসমূহ।",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    },
    {
      icon: MapPin,
      title: "সকল এলাকায় সেবা",
      description: "ঢাকা, চট্টগ্রাম, সিলেট সহ দেশের প্রধান শহরগুলোতে আমাদের সেবা।",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Star,
      title: "রিভিউ ও রেটিং",
      description: "পূর্ববর্তী ভাড়াটিয়াদের সৎ মতামত এবং রেটিং দেখে সিদ্ধান্ত নিন।",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Users,
      title: "কমিউনিটি সাপোর্ট",
      description: "অভিজ্ঞ ভাড়াটিয়াদের সাথে যোগাযোগ এবং পরামর্শ নেওয়ার সুবিধা।",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
      }}
    >
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0d9488" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                কেন 
              </span>
              <span className="relative mx-4">
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  আমাদের
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transform scale-x-0 animate-pulse"></div>
              </span>
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                পছন্দ করবেন?
              </span>
            </h2>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-2 border-teal-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full opacity-20 blur-sm"></div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            ব্যাচেলরদের জন্য বিশেষভাবে ডিজাইন করা আমাদের প্ল্যাটফর্মে রয়েছে অত্যাধুনিক সুবিধা এবং নির্ভরযোগ্য সেবা
          </motion.p>
          
          {/* Subtitle decoration */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 mx-auto mt-8 rounded-full"
          ></motion.div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/search"
              className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 text-xl overflow-hidden"
              style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center">
                <Search className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span>এখনই খুঁজে দেখুন</span>
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.div>
              </div>
            </Link>
          </motion.div>
          
          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-gray-500 text-lg"
            style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
          >
            বিনামূল্যে রেজিস্ট্রেশন • তাৎক্ষণিক অ্যাক্সেস • ২৪/৭ সাপোর্ট
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  bgColor 
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}) => (
  <div className="group relative h-full">
    {/* Hover glow effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
    
    {/* Main card */}
    <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full border border-gray-100 group-hover:border-teal-200 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className={color.replace('text-', 'text-')}/>
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className={color.replace('text-', 'text-')}/>
        </svg>
      </div>
      
      {/* Icon container with advanced effects */}
      <div className="relative mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 ${bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Icon className={`h-10 w-10 ${color} relative z-10 group-hover:rotate-12 transition-transform duration-500`} />
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 ${bgColor} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 
          className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors duration-300"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
        >
          {title}
        </h3>
        <p 
          className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300"
          style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
        >
          {description}
        </p>
      </div>
      
      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color.replace('text-', 'from-')} to-transparent w-0 group-hover:w-full transition-all duration-700`}></div>
    </div>
  </div>
);

export default FeaturedSection;
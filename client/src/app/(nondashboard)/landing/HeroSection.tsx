"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setFilters } from '@/state'
import { MapPin, Star, Shield } from 'lucide-react'

const HeroSection = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLocationSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      const response = await fetch(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
        trimmedQuery
      )}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}&type=place,address`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: trimmedQuery,
            coordinates: [lng, lat],
          })
        );
        const params = new URLSearchParams({
          location: trimmedQuery,
          lat: lat.toString(),
          lng: lng.toString(),
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("error search location:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLocationSearch();
    }
  };

  return (
    <section className="relative min-h-screen bg-white">
      {/* Professional background with subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white"></div>
      
      {/* Geometric accent elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-teal-50 rounded-full opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-teal-100 rounded-lg rotate-45 opacity-40"></div>
      <div className="absolute top-1/2 right-10 w-2 h-16 bg-teal-200 rounded-full opacity-30"></div>
      
      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Trust indicator */}
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[
                    { key: 'avatar-1', gradient: 'from-teal-400 to-teal-600' },
                    { key: 'avatar-2', gradient: 'from-blue-400 to-blue-600' },
                    { key: 'avatar-3', gradient: 'from-green-400 to-green-600' }
                  ].map((avatar) => (
                    <div 
                      key={avatar.key}
                      className={`w-8 h-8 bg-gradient-to-r ${avatar.gradient} rounded-full border-2 border-white shadow-sm`}
                    ></div>
                  ))}
                </div>
                <span className="font-medium" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                  ৫০০০+ সন্তুষ্ট ভাড়াটিয়া
                </span>
              </div>

              {/* Main headline */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                  <span className="text-teal-600">ঝামেলাহীন </span>
                  <span className="relative">
                    <span>বাসা</span>
                    <div className="absolute -bottom-2 left-0 right-0 h-3 bg-teal-100 -z-10 rounded"></div>
                  </span>{' '}
                  খুঁজুন <span className="text-teal-600"> ঘরে বসে</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                  ঢাকা, চট্টগ্রাম, সিলেট সহ সারাদেশে যাচাইকৃত ও নিরাপদ ব্যাচেলর থাকার ব্যবস্থা।
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  "১০০% যাচাইকৃত ও নিরাপদ প্রপার্টি",
                  "সরাসরি মালিকের সাথে যোগাযোগ",
                  "বিনামূল্যে রেজিস্ট্রেশন ও সার্চ"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Search Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-8"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                    এখনই খুঁজুন
                  </h2>
                  <p className="text-gray-700 text-md" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                    আপনার পছন্দের এলাকায় বাসা খুঁজে নিন
                  </p>
                </div>

                {/* Search Form */}
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="এলাকা বা জেলার নাম লিখুন..."
                      className="pl-12 pr-4 h-14 text-lg border-2 border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white transition-all duration-200 placeholder:text-gray-500"
                      style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                    />
                  </div>
                  
                  <Button
                    onClick={handleLocationSearch}
                    className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                    style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                  >
                    বাসা খুঁজুন
                  </Button>
                </div>
                
                {/* Quick Links */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-md text-gray-700 mb-3 font-bold" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>জনপ্রিয় এলাকা:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Dhanmondi', 'Uttara', 'Bashundhara', 'Gulshan'].map((area) => (
                      <button
                        key={area}
                        onClick={() => setSearchQuery(area)}
                        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 rounded-lg transition-all duration-200 border border-gray-200 hover:border-teal-200"
                        style={{ fontFamily: 'Hind Siliguri, sans-serif' }}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, text: "১০০% যাচাইকৃত", desc: "প্রতিটি বাসা সরাসরি যাচাই করা" },
                { icon: Star, text: "৫০০০+ ভাড়াটিয়া", desc: "বিশ্বস্ত রিভিউ ও রেটিং" },
                { icon: MapPin, text: "২০০+ এলাকায় সেবা", desc: "সারাদেশে ব্যাপক নেটওয়ার্ক" }
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="text-center p-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-4">
                      <Icon className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                      {badge.text}
                    </h3>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: 'Hind Siliguri, sans-serif' }}>
                      {badge.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
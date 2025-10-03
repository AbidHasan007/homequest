"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetApplicationsQuery,
  useGetTenantQuery
} from '@/state/api';
import { 
  Home, 
  FileText, 
  Calendar, 
  CreditCard, 
  Search, 
  Bell, 
  Heart,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  ArrowRight,
  MapPin,
  DollarSign,
  User,
  Phone,
  Sparkles,
  Target,
  Award,
  Zap,
  Eye,
  Star,
  Building,
  Wallet,
  Activity,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
  SlidersHorizontal,
  Lightbulb,
  Shield,
  Users,
  BarChart3,
  HelpCircle,
  Wifi,
  Car
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/Loading';

const TenantDashboard = () => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    { skip: !authUser?.cognitoInfo?.userId }
  );
  const { data: residences, isLoading: residencesLoading } = useGetCurrentResidencesQuery(
    authUser?.cognitoInfo?.userId || "",
    { skip: !authUser?.cognitoInfo?.userId }
  );
  const { data: applications, isLoading: applicationsLoading } = useGetApplicationsQuery(
    { 
      userId: authUser?.cognitoInfo?.userId || "", 
      userType: "tenant" 
    },
    { skip: !authUser?.cognitoInfo?.userId }
  );

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Check if user is new (no applications or residences)
  useEffect(() => {
    if (!applicationsLoading && !residencesLoading) {
      const isNewUser = (!applications || applications.length === 0) && 
                       (!residences || residences.length === 0);
      setShowOnboarding(isNewUser);
    }
  }, [applications, residences, applicationsLoading, residencesLoading]);

  if (!authUser || residencesLoading || applicationsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <Sparkles className="w-6 h-6 text-teal-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 font-medium">আপনার ড্যাশবোর্ড প্রস্তুত করা হচ্ছে...</p>
        </motion.div>
      </div>
    );
  }

  // Calculate key metrics
  const activeResidences = residences?.length || 0;
  const totalApplications = applications?.length || 0;
  const pendingApplications = applications?.filter((app: any) => app.status === 'Pending')?.length || 0;
  const scheduledTours = applications?.filter((app: any) => app.status === 'Tour_Scheduled')?.length || 0;
  const approvedApplications = applications?.filter((app: any) => app.status === 'Approved')?.length || 0;

  // Get current month for rent payment reminder
  const currentMonth = new Date().toLocaleString('bn-BD', { month: 'long' });
  
  // Enhanced quick actions with better UX
  const quickActions = [
    {
      icon: Search,
      title: "Search",
      subtitle: "স্মার্ট সার্চ দিয়ে পছন্দের বাসা",
      action: () => router.push('/search'),
      gradient: "from-teal-500 to-cyan-600",
      hoverGradient: "from-teal-600 to-cyan-700",
      iconColor: "text-white",
      badge: activeResidences === 0 ? "New" : null,
      priority: 1
    },
    {
      icon: FileText,
      title: "Applications",
      subtitle: `${pendingApplications} টি প্রক্রিয়াধীন আবেদন`,
      action: () => router.push('/tenants/applications'),
      gradient: "from-blue-500 to-indigo-600",
      hoverGradient: "from-blue-600 to-indigo-700",
      iconColor: "text-white",
      badge: pendingApplications > 0 ? pendingApplications.toString() : null,
      priority: 2
    },
    {
      icon: Home,
      title: "My Residences",
      subtitle: activeResidences > 0 ? "বর্তমান বাসার তথ্য" : "এখনো কোন বাসা নেই",
      action: () => router.push('/tenants/residences'),
      gradient: activeResidences > 0 ? "from-green-500 to-emerald-600" : "from-gray-400 to-gray-500",
      hoverGradient: activeResidences > 0 ? "from-green-600 to-emerald-700" : "from-gray-500 to-gray-600",
      iconColor: "text-white",
      badge: activeResidences > 0 ? "active" : null,
      priority: activeResidences > 0 ? 1 : 3
    },
    {
      icon: Wallet,
      title: "Payments",
      subtitle: "নিরাপদ অনলাইন লেনদেন",
      action: () => router.push('/tenants/payments'),
      gradient: "from-purple-500 to-violet-600",
      hoverGradient: "from-purple-600 to-violet-700",
      iconColor: "text-white",
      badge: activeResidences > 0 ? "Pay" : null,
      priority: activeResidences > 0 ? 2 : 4
    }
  ].sort((a, b) => a.priority - b.priority);

  // Enhanced status cards with better metrics
  const statusCards = [
    {
      title: "Active Residences",
      value: activeResidences,
      icon: Building,
      gradient: "from-emerald-400 to-green-600",
      change: activeResidences > 0 ? "+১ এই মাসে" : "কোন সক্রিয় বাসা নেই",
      trend: activeResidences > 0 ? "up" : "neutral",
      percentage: activeResidences > 0 ? "100%" : "0%",
      description: activeResidences > 0 ? "আপনার বর্তমান আবাসন" : "নতুন বাসা খুঁজুন"
    },
    {
      title: "Total Applications",
      value: totalApplications,
      icon: FileText,
      gradient: "from-blue-400 to-indigo-600",
      change: `${pendingApplications} টি অপেক্ষমাণ`,
      trend: totalApplications > 0 ? "up" : "neutral",
      percentage: totalApplications > 0 ? `${Math.round((approvedApplications/totalApplications)*100)}%` : "0%",
      description: "সফলতার হার"
    },
    {
      title: "Scheduled Tours",
      value: scheduledTours,
      icon: CalendarIcon,
      gradient: "from-purple-400 to-violet-600",
      change: scheduledTours > 0 ? "শীঘ্রই ভিজিট" : "কোন ভিজিট নেই",
      trend: scheduledTours > 0 ? "up" : "neutral",
      percentage: scheduledTours > 0 ? "আসছে" : "শূন্য",
      description: "আপনার সময়সূচী"
    },
    {
      title: "Approved Applications",
      value: approvedApplications,
      icon: Award,
      gradient: "from-teal-400 to-cyan-600",
      change: approvedApplications > 0 ? "অভিনন্দন!" : "এখনও কোনটি নেই",
      trend: approvedApplications > 0 ? "up" : "neutral",
      percentage: approvedApplications > 0 ? "সফল" : "০টি",
      description: "অনুমোদনের স্থিতি"
    }
  ];

  // Recent activities
  const recentActivities = [
    ...(applications?.slice(0, 3).map((app: any) => ({
      id: app.id,
      type: 'application',
      title: `${app.property?.name || 'Property'} এর জন্য আবেদন`,
      subtitle: `স্ট্যাটাস: ${getStatusInBangla(app.status)}`,
      time: new Date(app.applicationDate).toLocaleDateString('bn-BD'),
      icon: FileText,
      status: app.status
    })) || [])
  ];

  function getStatusInBangla(status: string) {
    const statusMap: Record<string, string> = {
      'Pending': 'অপেক্ষমাণ',
      'Tour_Scheduled': 'ভিজিট নির্ধারিত',
      'Tour_Completed': 'ভিজিট সম্পন্ন',
      'Approved': 'অনুমোদিত',
      'Denied': 'প্রত্যাখ্যাত'
    };
    return statusMap[status] || status;
  }

  function getStatusColor(status: string) {
    const colorMap: Record<string, string> = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Tour_Scheduled': 'bg-blue-100 text-blue-800',
      'Tour_Completed': 'bg-purple-100 text-purple-800',
      'Approved': 'bg-green-100 text-green-800',
      'Denied': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {tenant?.name || 'ভাড়াটিয়া'}! 
              </h1>
              <p className="text-gray-600">
                আজ {new Date().toLocaleDateString('bn-BD')} - আপনার রেন্টাল যাত্রার সারসংক্ষেপ
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => router.push('/search')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                নতুন বাসা খুঁজুন
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statusCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <CardContent className="relative p-6">
                  {/* Header with icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    {card.trend === 'up' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center text-green-500"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </motion.div>
                    )}
                  </div>

                  {/* Main content */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {card.title}
                    </p>
                    
                    <div className="flex items-baseline space-x-2">
                      <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-4xl font-bold text-gray-900"
                      >
                        {card.value}
                      </motion.p>
                      <span className={`text-sm px-2 py-1 rounded-full font-medium bg-gradient-to-r ${card.gradient} text-white`}>
                        {card.percentage}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {card.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>অগ্রগতি</span>
                        <span>{card.change}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: card.trend === 'up' ? '75%' : '25%' }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${card.gradient} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
              <p className="text-gray-600">এক ক্লিকে আপনার প্রয়োজনীয় কাজ সম্পন্ন করুন</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Zap className="w-6 h-6 text-yellow-500" />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                onHoverStart={() => setActiveSection(`action-${index}`)}
                onHoverEnd={() => setActiveSection(null)}
                className="group relative"
              >
                <div
                  onClick={action.action}
                  className={`
                    relative overflow-hidden cursor-pointer
                    bg-gradient-to-br ${action.gradient} hover:bg-gradient-to-br ${action.hoverGradient}
                    p-8 rounded-2xl shadow-xl hover:shadow-2xl 
                    border border-white/20 backdrop-blur-sm
                    transition-all duration-500 ease-out
                    transform hover:scale-[1.02]
                  `}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badge */}
                  {action.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                    >
                      {action.badge}
                    </motion.div>
                  )}
                  
                  {/* Icon with glow effect */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <action.icon className={`relative w-10 h-10 ${action.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-xl text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {action.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed group-hover:translate-x-1 transition-transform duration-300 delay-75">
                      {action.subtitle}
                    </p>
                  </div>
                  
                  {/* Arrow indicator */}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ 
                      x: activeSection === `action-${index}` ? 0 : -10, 
                      opacity: activeSection === `action-${index}` ? 1 : 0 
                    }}
                    className="absolute bottom-6 right-6"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Current Residence */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="h-fit overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              {/* Enhanced header with gradient */}
              <div className="relative bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 p-6 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                <CardTitle className="relative flex items-center gap-3 text-xl font-bold">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Home className="w-6 h-6" />
                  </div>
                  Present Rent
                  {activeResidences > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="ml-auto"
                    >
                      <div className="flex items-center space-x-1 bg-green-500/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Active</span>
                      </div>
                    </motion.div>
                  )}
                </CardTitle>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl"></div>
              </div>

              <CardContent className="p-0">
                {activeResidences > 0 && residences && residences[0] ? (
                  <div className="space-y-0">
                    {/* Main residence info */}
                    <div className="relative p-6 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <h3 className="font-bold text-2xl text-gray-900 leading-tight">
                              {residences[0].title || residences[0].name}
                            </h3>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-5 h-5 mr-2 text-teal-500" />
                              <span className="text-lg">
                                {residences[0].location?.address}, {residences[0].location?.city}
                              </span>
                            </div>
                          </div>
                          
                          {/* Property image placeholder */}
                          <div className="ml-4 w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-lg">
                            <Building className="w-8 h-8 text-teal-600" />
                          </div>
                        </div>

                        {residences[0].lease && (
                          <div className="grid grid-cols-2 gap-6 mt-6">
                            {/* Rent info */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 }}
                              className="relative group"
                            >
                              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1 rounded-2xl shadow-lg">
                                <div className="bg-white p-4 rounded-xl h-full">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl">
                                      <DollarSign className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">মাসিক ভাড়া</p>
                                      <p className="text-2xl font-bold text-emerald-600">
                                        ৳{(residences[0].lease.rent || 0).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>

                            {/* Days info */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 }}
                              className="relative group"
                            >
                              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-2xl shadow-lg">
                                <div className="bg-white p-4 rounded-xl h-full">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                                      <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                        {residences[0].lease.status === 'active' ? 'দিন কাটিয়েছেন' : 'শুরু হবে'}
                                      </p>
                                      <p className="text-2xl font-bold text-blue-600">
                                        {residences[0].lease.daysLived || residences[0].lease.daysUntilStart || 0} দিন
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Action buttons */}
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex gap-4"
                      >
                        <Button 
                          variant="outline" 
                          onClick={() => router.push('/tenants/residences')}
                          className="flex-1 group relative overflow-hidden border-2 border-teal-200 hover:border-teal-300 bg-white hover:bg-teal-50 transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <Eye className="w-4 h-4 mr-2" />
                          বিস্তারিত দেখুন
                        </Button>
                        
                        <Button 
                          onClick={() => router.push('/tenants/payments')}
                          className="flex-1 group relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <CreditCard className="w-4 h-4 mr-2" />
                          ভাড়া দিন
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center py-16 px-6"
                  >
                    <div className="relative">
                      {/* Animated background elements */}
                      <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-100 rounded-full blur-2xl opacity-40"></div>
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        className="mb-6"
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <Home className="w-12 h-12 text-gray-400" />
                        </div>
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="font-bold text-2xl text-gray-700 mb-3"
                      >
                        কোন সক্রিয় বাসা নেই
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-500 mb-8 text-lg leading-relaxed"
                      >
                        আপনার পছন্দের বাসা খুঁজে নিন এবং আবেদন করুন
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <Button 
                          onClick={() => router.push('/search')}
                          className="group relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <Search className="w-5 h-5 mr-3" />
                          বাসা খুঁজুন
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Recent Activities Card */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              {/* Enhanced header */}
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                <CardTitle className="relative flex items-center gap-3 text-lg font-bold">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  Recent Activities
                  {recentActivities.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="ml-auto"
                    >
                      <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                        {recentActivities.length} টি
                      </div>
                    </motion.div>
                  )}
                </CardTitle>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-indigo-400/20 rounded-full blur-xl"></div>
              </div>

              <CardContent className="p-0">
                {recentActivities.length > 0 ? (
                  <div className="space-y-0">
                    {/* Activities list */}
                    <div className="max-h-80 overflow-y-auto">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="group relative border-b border-gray-100/50 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-300"
                        >
                          {/* Timeline connector */}
                          {index < recentActivities.length - 1 && (
                            <div className="absolute left-6 top-12 w-px h-8 bg-gradient-to-b from-blue-200 to-transparent"></div>
                          )}
                          
                          <div className="flex items-start gap-4 p-4">
                            {/* Enhanced icon */}
                            <div className="relative">
                              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                <activity.icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-start justify-between">
                                <p className="font-semibold text-gray-900 text-sm leading-relaxed group-hover:text-blue-900 transition-colors duration-300">
                                  {activity.title}
                                </p>
                                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                                  {activity.time}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs px-3 py-1 font-medium ${getStatusColor(activity.status)} shadow-sm`}>
                                  {activity.subtitle.replace('স্ট্যাটাস: ', '')}
                                </Badge>
                              </div>
                              
                              {/* Progress indicator */}
                              <div className="w-full bg-gray-200 rounded-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-1 rounded-full w-3/4"></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Action button */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-100">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Button 
                          variant="outline" 
                          onClick={() => router.push('/tenants/applications')}
                          className="w-full group relative overflow-hidden border-2 border-blue-200 hover:border-blue-300 bg-white hover:bg-blue-50 transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <FileText className="w-4 h-4 mr-2" />
                          সব আবেদন দেখুন
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center py-12 px-6"
                  >
                    <div className="relative">
                      {/* Animated background */}
                      <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-blue-100 rounded-full blur-2xl opacity-40"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-indigo-100 rounded-full blur-xl opacity-50"></div>
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        className="mb-4"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-blue-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                      </motion.div>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-500 text-sm font-medium"
                      >
                        কোন সাম্প্রতিক কার্যকলাপ নেই
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Quick Tips */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              {/* Enhanced header */}
              <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-5 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                <CardTitle className="relative flex items-center gap-3 text-lg font-bold">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  Quick Tips
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="ml-auto"
                  >
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>৩টি</span>
                    </div>
                  </motion.div>
                </CardTitle>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-teal-400/20 rounded-full blur-lg"></div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      icon: DollarSign,
                      title: 'সময়মত ভাড়া দিন',
                      description: 'প্রতি মাসের ১-৫ তারিখের মধ্যে ভাড়া পরিশোধ করুন',
                      gradient: 'from-emerald-500 to-green-600',
                      bgGradient: 'from-emerald-50 to-green-50',
                      delay: 0.9
                    },
                    {
                      icon: User,
                      title: 'প্রোফাইল আপডেট করুন',
                      description: 'সম্পূর্ণ প্রোফাইল বাড়িওয়ালাদের আকৃষ্ট করে',
                      gradient: 'from-blue-500 to-indigo-600',
                      bgGradient: 'from-blue-50 to-indigo-50',
                      delay: 1.0
                    },
                    {
                      icon: BarChart3,
                      title: 'তুলনা করুন',
                      description: 'একাধিক বিকল্প দেখে সেরা সিদ্ধান্ত নিন',
                      gradient: 'from-purple-500 to-pink-600',
                      bgGradient: 'from-purple-50 to-pink-50',
                      delay: 1.1
                    }
                  ].map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: tip.delay }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="group relative"
                    >
                      <div className={`relative p-4 bg-gradient-to-br ${tip.bgGradient} rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}>
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-2 right-2 w-8 h-8 border border-white/30 rounded-full"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 border border-white/20 rounded-full"></div>
                        </div>
                        
                        <div className="relative flex items-start space-x-4">
                          {/* Icon */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: tip.delay + 0.1, type: "spring", stiffness: 200 }}
                            className="flex-shrink-0"
                          >
                            <div className={`p-3 bg-gradient-to-br ${tip.gradient} rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                              <tip.icon className="w-5 h-5 text-white" />
                            </div>
                          </motion.div>
                          
                          {/* Content */}
                          <div className="flex-1 space-y-2">
                            <h4 className="font-bold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300">
                              {tip.title}
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                              {tip.description}
                            </p>
                            
                            {/* Progress indicator */}
                            <div className="pt-2">
                              <div className="w-full bg-white/60 rounded-full h-1">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ delay: tip.delay + 0.3, duration: 0.8 }}
                                  className={`h-full bg-gradient-to-r ${tip.gradient} rounded-full shadow-sm`}
                                ></motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Additional helpful link */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 pt-4 border-t border-gray-200/50"
                >
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-300 group"
                  >
                    <HelpCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    আরো টিপস পেতে চান?
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Application Progress */}
        {pendingApplications > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  আবেদনের অগ্রগতি
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-orange-800">
                      {pendingApplications} টি আবেদন প্রক্রিয়াধীন
                    </p>
                    <Badge className="bg-orange-100 text-orange-800">
                      {Math.round((approvedApplications / Math.max(totalApplications, 1)) * 100)}% সাফল্যের হার
                    </Badge>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(approvedApplications / Math.max(totalApplications, 1)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-orange-600 mb-4">
                    আপনার আবেদনগুলো পর্যালোচনা করা হচ্ছে। বাড়িওয়ালারা শীঘ্রই যোগাযোগ করবেন।
                  </p>
                  <Button 
                    onClick={() => router.push('/tenants/applications')}
                    variant="outline"
                    className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    আবেদনের স্ট্যাটাস দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TenantDashboard;
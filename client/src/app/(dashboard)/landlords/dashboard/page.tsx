"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useGetAuthUserQuery,
  useGetLandlordPropertiesQuery,
  useGetApplicationsQuery,
  useGetLandlordQuery
} from '@/state/api';
import { 
  Home, 
  Building, 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  Eye,
  Plus,
  Settings,
  Bell,
  Star,
  MapPin,
  Phone,
  Mail,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Award,
  Target,
  Sparkles,
  Filter,
  Search,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Edit,
  Trash2,
  Camera,
  MessageSquare,
  Heart,
  Shield,
  Wifi,
  Car,
  Trees,
  Lightbulb,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/Loading';

const LandlordDashboard = () => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const { data: authUser } = useGetAuthUserQuery();
  const { data: landlord } = useGetLandlordQuery(
    authUser?.cognitoInfo?.userId || "",
    { skip: !authUser?.cognitoInfo?.userId }
  );
  const { data: properties, isLoading: propertiesLoading } = useGetLandlordPropertiesQuery(
    authUser?.cognitoInfo?.userId || "",
    { skip: !authUser?.cognitoInfo?.userId }
  );
  const { data: applications, isLoading: applicationsLoading } = useGetApplicationsQuery(
    { 
      userId: authUser?.cognitoInfo?.userId || "", 
      userType: "landlord" 
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

  if (!authUser || propertiesLoading || applicationsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <Building className="w-6 h-6 text-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 font-medium">আপনার প্রপার্টি ড্যাশবোর্ড লোড হচ্ছে...</p>
        </motion.div>
      </div>
    );
  }

  // Calculate key metrics for landlords
  const totalProperties = properties?.length || 0;
  const totalApplications = applications?.length || 0;
  const pendingApplications = applications?.filter((app: any) => app.status === 'Pending')?.length || 0;
  const scheduledTours = applications?.filter((app: any) => app.status === 'Tour_Scheduled')?.length || 0;
  const approvedApplications = applications?.filter((app: any) => app.status === 'Approved')?.length || 0;
  const activeLeases = properties?.reduce((sum: number, prop: any) => sum + (prop.leases?.filter((lease: any) => lease.status === 'ACTIVE')?.length || 0), 0) || 0;
  const monthlyRevenue = properties?.reduce((sum: number, prop: any) => {
    return sum + (prop.leases?.filter((lease: any) => lease.status === 'ACTIVE')?.reduce((leaseSum: number, lease: any) => leaseSum + (lease.rent || 0), 0) || 0);
  }, 0) || 0;

  // Enhanced quick actions for landlords
  const quickActions = [
    {
      icon: Plus,
      title: "Add Property",
      subtitle: "নতুন প্রপার্টি যুক্ত করুন",
      action: () => router.push('/landlords/properties/add'),
      gradient: "from-emerald-500 to-green-600",
      hoverGradient: "from-emerald-600 to-green-700",
      iconColor: "text-white",
      badge: totalProperties === 0 ? "Start" : null,
      priority: 1
    },
    {
      icon: FileText,
      title: "Applications",
      subtitle: `${pendingApplications} টি নতুন আবেদন`,
      action: () => router.push('/landlords/applications'),
      gradient: "from-blue-500 to-indigo-600",
      hoverGradient: "from-blue-600 to-indigo-700",
      iconColor: "text-white",
      badge: pendingApplications > 0 ? pendingApplications.toString() : null,
      priority: pendingApplications > 0 ? 1 : 3
    },
    {
      icon: Building,
      title: "Properties",
      subtitle: `${totalProperties} টি প্রপার্টি পরিচালনা`,
      action: () => router.push('/landlords/properties'),
      gradient: totalProperties > 0 ? "from-purple-500 to-violet-600" : "from-gray-400 to-gray-500",
      hoverGradient: totalProperties > 0 ? "from-purple-600 to-violet-700" : "from-gray-500 to-gray-600",
      iconColor: "text-white",
      badge: totalProperties > 0 ? "Active" : null,
      priority: 2
    },
    {
      icon: BarChart3,
      title: "Analytics",
      subtitle: "আয় ও পারফরম্যান্স ট্র্যাক করুন",
      action: () => setShowAnalytics(!showAnalytics),
      gradient: "from-orange-500 to-red-600",
      hoverGradient: "from-orange-600 to-red-700",
      iconColor: "text-white",
      badge: monthlyRevenue > 0 ? "Live" : null,
      priority: monthlyRevenue > 0 ? 2 : 4
    }
  ].sort((a, b) => a.priority - b.priority);

  // Enhanced status cards for landlords
  const statusCards = [
    {
      title: "Total Properties",
      value: totalProperties,
      icon: Building,
      gradient: "from-blue-400 to-indigo-600",
      change: totalProperties > 0 ? "+১ এই মাসে" : "প্রথম প্রপার্টি যোগ করুন",
      trend: totalProperties > 0 ? "up" : "neutral",
      percentage: totalProperties > 0 ? "সক্রিয়" : "০টি",
      description: "আপনার পোর্টফলিও"
    },
    {
      title: "Active Rentals",
      value: activeLeases,
      icon: Users,
      gradient: "from-emerald-400 to-green-600",
      change: `${activeLeases} জন ভাড়াটিয়া`,
      trend: activeLeases > 0 ? "up" : "neutral",
      percentage: activeLeases > 0 ? `${Math.round((activeLeases/Math.max(totalProperties, 1))*100)}%` : "০%",
      description: "অকুপেন্সি রেট"
    },
    {
      title: "Monthly Revenue",
      value: `৳${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-purple-400 to-violet-600",
      change: monthlyRevenue > 0 ? "+১২% গত মাসের চেয়ে" : "আয় শুরু হয়নি",
      trend: monthlyRevenue > 0 ? "up" : "neutral",
      percentage: monthlyRevenue > 0 ? "বৃদ্ধি" : "০ টাকা",
      description: "রাজস্ব প্রবাহ"
    },
    {
      title: "New Applications",
      value: pendingApplications,
      icon: FileText,
      gradient: "from-orange-400 to-red-600",
      change: pendingApplications > 0 ? "পর্যালোচনা প্রয়োজন" : "কোন নতুন আবেদন নেই",
      trend: pendingApplications > 0 ? "up" : "neutral",
      percentage: pendingApplications > 0 ? "নতুন" : "শূন্য",
      description: "অপেক্ষমাণ আবেদন"
    }
  ];

  // Recent activities for landlords
  const recentActivities = [
    ...(applications?.slice(0, 4).map((app: any) => ({
      id: app.id,
      type: 'application',
      title: `${app.property?.name || 'Property'} এর জন্য নতুন আবেদন`,
      subtitle: `আবেদনকারী: ${app.tenant?.name || 'Unknown'}`,
      time: new Date(app.applicationDate).toLocaleDateString('bn-BD'),
      icon: FileText,
      status: app.status,
      action: () => router.push(`/landlords/applications/${app.id}`)
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
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Tour_Scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
      'Tour_Completed': 'bg-purple-100 text-purple-800 border-purple-200',
      'Approved': 'bg-green-100 text-green-800 border-green-200',
      'Denied': 'bg-red-100 text-red-800 border-red-200'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-4xl font-bold ">
                    Welcome, <span className=" text-teal-500">{landlord?.name || 'বাড়িওয়ালা'} !</span>
                  </h1>
                  <p className="text-gray-600 text-lg">
                    আজ {new Date().toLocaleDateString('bn-BD')} - আপনার প্রপার্টি পোর্টফলিও ওভারভিউ
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border"
              >
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700">
                  {currentTime.toLocaleTimeString('bn-BD', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </motion.div>
              
              <Button 
                onClick={() => router.push('/landlords/newproperty')}
                className="group bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                প্রপার্টি যোগ করুন
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
                        className="text-3xl font-bold text-gray-900"
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
                        <span>পারফরম্যান্স</span>
                        <span>{card.change}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: card.trend === 'up' ? '80%' : '30%' }}
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
              <p className="text-gray-600">আপনার প্রপার্টি ব্যবসা দ্রুত পরিচালনা করুন</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Zap className="w-6 h-6 text-indigo-500" />
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
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg border-2 border-white"
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
          {/* Enhanced Property Portfolio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="h-fit overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              {/* Enhanced header with gradient */}
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 p-6 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                <CardTitle className="relative flex items-center gap-3 text-xl font-bold">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Building className="w-6 h-6" />
                  </div>
                  প্রপার্টি পোর্টফলিও
                  {totalProperties > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="ml-auto"
                    >
                      <div className="flex items-center space-x-1 bg-green-500/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>{totalProperties} টি সক্রিয়</span>
                      </div>
                    </motion.div>
                  )}
                </CardTitle>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl"></div>
              </div>

              <CardContent className="p-0">
                {totalProperties > 0 && properties && properties.length > 0 ? (
                  <div className="space-y-0">
                    {/* Property list */}
                    <div className="max-h-96 overflow-y-auto">
                      {properties.slice(0, 3).map((property: any, index: number) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="group relative border-b border-gray-100/50 last:border-b-0 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/30 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4 p-6">
                            {/* Property image placeholder */}
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                                <Home className="w-8 h-8 text-indigo-600" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-sm"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-900 transition-colors duration-300">
                                    {property.name || property.title}
                                  </h3>
                                  <div className="flex items-center text-gray-600 mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{property.location?.address}</span>
                                  </div>
                                </div>
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  সক্রিয়
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 mt-3">
                                <div className="text-center">
                                  <p className="text-xs text-gray-500">ভাড়া</p>
                                  <p className="font-semibold text-sm text-indigo-600">৳{property.rent?.toLocaleString()}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-gray-500">ভাড়াটিয়া</p>
                                  <p className="font-semibold text-sm text-purple-600">
                                    {property.leases?.filter((lease: any) => lease.status === 'ACTIVE')?.length || 0}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-gray-500">স্ট্যাটাস</p>
                                  <p className="font-semibold text-sm text-green-600">উপলব্ধ</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-indigo-50/30 border-t border-gray-100">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex gap-4"
                      >
                        <Button 
                          variant="outline" 
                          onClick={() => router.push('/landlords/properties')}
                          className="flex-1 group relative overflow-hidden border-2 border-indigo-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <Eye className="w-4 h-4 mr-2" />
                          সব প্রপার্টি দেখুন
                        </Button>
                        
                        <Button 
                          onClick={() => router.push('/landlords/properties/add')}
                          className="flex-1 group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <Plus className="w-4 h-4 mr-2" />
                          নতুন যোগ করুন
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
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-40"></div>
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        className="mb-6"
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-indigo-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <Building className="w-12 h-12 text-gray-400" />
                        </div>
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="font-bold text-2xl text-gray-700 mb-3"
                      >
                        এখনো কোন প্রপার্টি নেই
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-500 mb-8 text-lg leading-relaxed"
                      >
                        আপনার প্রথম প্রপার্টি যোগ করুন এবং ভাড়াটিয়া খোঁজা শুরু করুন
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <Button 
                          onClick={() => router.push('/landlords/properties/add')}
                          className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <Plus className="w-5 h-5 mr-3" />
                          প্রপার্টি যোগ করুন
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Recent Activities & Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Recent Activities Card */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              {/* Enhanced header */}
              <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-5 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                <CardTitle className="relative flex items-center gap-3 text-lg font-bold">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Activity className="w-5 h-5" />
                  </div>
                  সাম্প্রতিক কার্যকলাপ
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
                <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-red-400/20 rounded-full blur-xl"></div>
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
                          onClick={activity.action}
                          className="group relative border-b border-gray-100/50 last:border-b-0 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/30 transition-all duration-300 cursor-pointer"
                        >
                          {/* Timeline connector */}
                          {index < recentActivities.length - 1 && (
                            <div className="absolute left-6 top-12 w-px h-8 bg-gradient-to-b from-orange-200 to-transparent"></div>
                          )}
                          
                          <div className="flex items-start gap-4 p-4">
                            {/* Enhanced icon */}
                            <div className="relative">
                              <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                <activity.icon className="w-5 h-5 text-orange-600" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-start justify-between">
                                <p className="font-semibold text-gray-900 text-sm leading-relaxed group-hover:text-orange-900 transition-colors duration-300">
                                  {activity.title}
                                </p>
                                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                                  {activity.time}
                                </span>
                              </div>
                              
                              <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                {activity.subtitle}
                              </p>
                              
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs px-3 py-1 font-medium ${getStatusColor(activity.status)} shadow-sm border`}>
                                  {getStatusInBangla(activity.status)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Action button */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-orange-50/30 border-t border-gray-100">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Button 
                          variant="outline" 
                          onClick={() => router.push('/landlords/applications')}
                          className="w-full group relative overflow-hidden border-2 border-orange-200 hover:border-orange-300 bg-white hover:bg-orange-50 transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/10 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
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
                        <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-orange-100 rounded-full blur-2xl opacity-40"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-50"></div>
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        className="mb-4"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-orange-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <Activity className="w-8 h-8 text-gray-400" />
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

            {/* Enhanced Landlord Tips */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              {/* Enhanced header */}
              <div className="relative bg-gradient-to-r from-teal-500 to-cyan-600 p-5 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                <CardTitle className="relative flex items-center gap-3 text-lg font-bold">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  বাড়িওয়ালার টিপস
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
                <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-cyan-400/20 rounded-full blur-lg"></div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      icon: Camera,
                      title: 'আকর্ষণীয় ছবি যোগ করুন',
                      description: 'উচ্চ মানের ছবি ভাড়াটিয়াদের আকৃষ্ট করে',
                      gradient: 'from-blue-500 to-indigo-600',
                      bgGradient: 'from-blue-50 to-indigo-50',
                      delay: 0.9
                    },
                    {
                      icon: Star,
                      title: 'প্রতিযোগিতামূলক ভাড়া নির্ধারণ',
                      description: 'এলাকার বাজার দর অনুযায়ী ভাড়া রাখুন',
                      gradient: 'from-emerald-500 to-teal-600',
                      bgGradient: 'from-emerald-50 to-teal-50',
                      delay: 1.0
                    },
                    {
                      icon: MessageSquare,
                      title: 'দ্রুত রেসপন্স করুন',
                      description: 'আগ্রহী ভাড়াটিয়াদের দ্রুত জবাব দিন',
                      gradient: 'from-orange-500 to-red-600',
                      bgGradient: 'from-orange-50 to-red-50',
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
      </div>
    </div>
  );
};

export default LandlordDashboard;
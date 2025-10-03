"use client";

import { CustomFormField } from "@/components/FormField";
import Header from "@/components/Header";
import { Form } from "@/components/ui/form";
import { PropertyFormData, propertySchema } from "@/lib/schemas";
import { useCreatePropertyMutation, useGetAuthUserQuery, useGetVerificationStatusQuery } from "@/state/api";
import { AmenityEnum, HighlightEnum, PropertyTypeEnum } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building,
  DollarSign,
  MapPin,
  Camera,
  Settings,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  Star,
  Bed,
  Bath,
  Square,
  Car,
  PawPrint,
  Users,
  Zap,
  Shield,
  Wifi,
  Trees,
  Dumbbell,
  Waves,
  Coffee,
  ShoppingCart,
  School,
  Hospital,
  ChevronRight,
  Plus,
  X,
  Upload,
  AlertCircle,
  HelpCircle
} from "lucide-react";
const NewProperty = () => {
  const [createProperty, { isLoading: isMutationLoading, error: mutationError }] = useCreatePropertyMutation();
  const { data: authUser } = useGetAuthUserQuery();
  const { data: verificationStatus } = useGetVerificationStatusQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  // Debug mutation state
  console.log("Mutation state - isLoading:", isMutationLoading, "error:", mutationError);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema) as any,
    defaultValues: {
      name: "",
      description: "",
      pricePerMonth: 1000,
      securityDeposit: 500,
      isPetsAllowed: true,
      isBachelorFriendly: true,
      genderPreference: "No Preference",
      isParkingIncluded: true,
      photoUrls: [],
      amenities: [],
      highlights: [],
      beds: 1,
      baths: 1,
      squareFeet: 1000,
      propertyType: PropertyTypeEnum.Rooms,
      address: "",
      city: "",
      state: "",
      country: "Bangladesh",
      postalCode: "",
    },
  });

  // Update form address when verification data is loaded
  useEffect(() => {
    if (verificationStatus?.address) {
      form.setValue("address", verificationStatus.address);
    }
  }, [verificationStatus, form]);

  const watchedValues = form.watch();
  
  const steps = [
    {
      id: 1,
      title: "Basic Info",
      subtitle: "Property details",
      icon: Home,
      fields: ["name", "description", "propertyType"]
    },
    {
      id: 2,
      title: "Pricing",
      subtitle: "Rent & deposits",
      icon: DollarSign,
      fields: ["pricePerMonth", "securityDeposit"]
    },
    {
      id: 3,
      title: "Features",
      subtitle: "Rooms & amenities",
      icon: Settings,
      fields: ["beds", "baths", "squareFeet", "isPetsAllowed", "isParkingIncluded", "isBachelorFriendly", "amenities", "highlights"]
    },
    {
      id: 4,
      title: "Location",
      subtitle: "Address details",
      icon: MapPin,
      fields: ["address", "city", "state", "postalCode", "country"]
    },
    {
      id: 5,
      title: "Photos",
      subtitle: "Property images",
      icon: Camera,
      fields: ["photoUrls"]
    }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = () => {
    const currentFields = currentStepData?.fields || [];
    const errors = form.formState.errors;
    return !currentFields.some(field => errors[field as keyof typeof errors]);
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (isSubmitting) return;
    
    console.log("=== FORM SUBMISSION STARTED ===");
    console.log("Form validation errors:", form.formState.errors);
    console.log("Form is valid:", form.formState.isValid);
    console.log("Auth user:", authUser);
    
    try {
      setIsSubmitting(true);
      console.log("Form data received:", data);
      
      if (!authUser?.cognitoInfo?.userId) {
        console.log("No auth user found");
        toast.error("No Landlord ID found. Please sign in again.");
        return;
      }

      const formData = new FormData();
      
      // Debug: Log each field being processed
      Object.entries(data).forEach(([key, value]) => {
        console.log(`Processing field: ${key}`, value);
        
        if (key === "photoUrls") {
          const files = value as File[];
          console.log(`Photos to upload: ${files?.length || 0}`);
          if (files && Array.isArray(files)) {
            files.forEach((file: File) => {
              formData.append("photos", file);
            });
          }
          return;
        }
        
        if (key === "amenities" || key === "highlights") {
          if (Array.isArray(value)) {
            const joinedValue = (value as string[]).join(",");
            console.log(`${key} joined:`, joinedValue);
            formData.append(key, joinedValue);
          } else if (typeof value === "string") {
            formData.append(key, value);
          } else {
            formData.append(key, "");
          }
          return;
        }
        
        if (Array.isArray(value)) {
          // Avoid sending JSON arrays for scalar fields; join if string array
          const arr = value as unknown[];
          if (arr.every((v) => typeof v === "string")) {
            formData.append(key, (arr as string[]).join(","));
          } else {
            formData.append(key, String(value));
          }
          return;
        }
        
        // Handle null/undefined values
        if (value === null || value === undefined) {
          formData.append(key, "");
          return;
        }
        
        formData.append(key, String(value));
      });

      formData.append("landlordCognitoId", authUser.cognitoInfo.userId);
      
      // Add coordinates from verification data if available and address matches
      if (verificationStatus?.latitude && verificationStatus?.longitude && 
          data.address === verificationStatus.address) {
        formData.append("latitude", verificationStatus.latitude.toString());
        formData.append("longitude", verificationStatus.longitude.toString());
        console.log("✅ Added verified coordinates to property:", {
          latitude: verificationStatus.latitude,
          longitude: verificationStatus.longitude,
          address: verificationStatus.address
        });
      } else if (verificationStatus?.latitude && verificationStatus?.longitude) {
        // Address was modified - still use coordinates but warn
        formData.append("latitude", verificationStatus.latitude.toString());
        formData.append("longitude", verificationStatus.longitude.toString());
        console.log("⚠️ Using coordinates from verification but address was modified:", {
          verifiedAddress: verificationStatus.address,
          formAddress: data.address,
          coordinates: { lat: verificationStatus.latitude, lng: verificationStatus.longitude }
        });
      } else {
        console.log("ℹ️ No verified coordinates available, backend will use geocoding");
      }
      
      // Debug: Log all form data entries
      console.log("FormData entries:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      
      console.log("createProperty function:", typeof createProperty);
      
      // Try the mutation and get the promise
      const mutationResult = createProperty(formData);
      console.log("Mutation result:", mutationResult);
      
      const result = await mutationResult.unwrap();
      console.log("Property created successfully:", result);
      
      toast.success("Property created successfully!");
      router.push("/landlords/properties");
    } catch (error: any) {
      console.log("=== ERROR CAUGHT ===");
      console.log("Error:", error);
      console.log("Error JSON:", JSON.stringify(error, null, 2));
      
      // Try to extract meaningful error information
      let message = "Failed to create property";
      
      try {
        // RTK Query error structure
        if (error?.data) {
          console.log("RTK Query error data:", error.data);
          message = error.data.message || error.data.error || JSON.stringify(error.data);
        }
        // Standard error object
        else if (error?.message) {
          message = error.message;
        }
        // Error with status (network errors)
        else if (error?.status) {
          if (error.status === 'FETCH_ERROR') {
            message = "Network error. Please check your connection.";
          } else if (error.status === 'PARSING_ERROR') {
            message = "Server response parsing error.";
          } else {
            message = `Request failed with status: ${error.status}`;
          }
        }
        // String error
        else if (typeof error === "string") {
          message = error;
        }
        // Serialization error (common with RTK Query)
        else if (error && typeof error === "object" && Object.keys(error).length === 0) {
          message = "Request failed (serialization error). Please check the form data and try again.";
        }
      } catch (parseError) {
        console.log("Error parsing error:", parseError);
        message = "An unexpected error occurred while processing your request.";
      }
      
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => router.push("/landlords/dashboard")}
              className="group flex items-center gap-2 hover:bg-indigo-50 border-indigo-200"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Dashboard
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="group flex items-center gap-2 hover:bg-purple-50 border-purple-200"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "ফর্মে ফিরুন" : "প্রিভিউ দেখুন"}
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Add new property
              </h1>
              <p className="text-gray-600 text-lg">
                বিস্তারিত তথ্য দিয়ে আপনার প্রপার্টি লিস্টিং তৈরি করুন
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Step Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-6 border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-teal-500" />
                  Progress
                </CardTitle>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  step {currentStep} of {totalSteps} ({Math.round(progress)}% complete)
                </p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setCurrentStep(step.id)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300
                      ${currentStep === step.id 
                        ? 'bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300 shadow-md' 
                        : currentStep > step.id 
                          ? 'bg-green-50 border border-green-200 hover:bg-green-100' 
                          : 'hover:bg-gray-50 border border-gray-200'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg
                      ${currentStep === step.id 
                        ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white' 
                        : currentStep > step.id 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 text-gray-500'
                      }
                    `}>
                      {currentStep > step.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${currentStep === step.id ? 'text-indigo-900' : 'text-gray-700'}`}>
                        {step.title}
                      </p>
                      <p className={`text-sm ${currentStep === step.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                        {step.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10"></div>
                <div className="relative">
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                    {currentStepData && (
                      <>
                        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg">
                          <currentStepData.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span>{currentStepData.title}</span>
                          <p className="text-sm text-gray-600 font-normal mt-1">
                            {currentStepData.subtitle}
                          </p>
                        </div>
                      </>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    
                    toast.error("Please fix the form errors before submitting");
                  })} className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                          <div className="space-y-6">
                            <div className="grid gap-6">
                              <CustomFormField 
                                name="name" 
                                label="প্রপার্টির নাম" 
                                placeholder="যেমন: সুন্দর ২ বেডরুমের ফ্ল্যাট"
                              />
                              <CustomFormField
                                name="description"
                                label="বিবরণ"
                                type="textarea"
                                placeholder="আপনার প্রপার্টির বিস্তারিত বিবরণ দিন..."
                              />
                              <CustomFormField
                                name="propertyType"
                                label="প্রপার্টির ধরন"
                                type="select"
                                options={Object.values(PropertyTypeEnum)
                                  .filter(value => typeof value === 'string')
                                  .map((type) => ({
                                    value: type,
                                    label: type,
                                  }))}
                              />
                            </div>
                          </div>
                        )}

                        {/* Step 2: Pricing */}
                        {currentStep === 2 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="relative">
                                <CustomFormField
                                  name="pricePerMonth"
                                  label="মাসিক ভাড়া (টাকা)"
                                  type="number"
                                  placeholder="15000"
                                />
                                <div className="absolute -top-2 -right-2">
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    প্রয়োজনীয়
                                  </Badge>
                                </div>
                              </div>
                              <CustomFormField
                                name="securityDeposit"
                                label="সিকিউরিটি ডিপোজিট (টাকা)"
                                type="number"
                                placeholder="30000"
                              />
                            </div>
                            
                            {/* Pricing Preview */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
                            >
                              <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                মূল্য সারসংক্ষেপ
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">মাসিক ভাড়া:</span>
                                  <span className="font-semibold text-indigo-900">
                                    ৳{watchedValues.pricePerMonth?.toLocaleString() || '0'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">ডিপোজিট:</span>
                                  <span className="font-semibold text-purple-900">
                                    ৳{watchedValues.securityDeposit?.toLocaleString() || '0'}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )}

                        {/* Step 3: Features */}
                        {currentStep === 3 && (
                          <div className="space-y-8">
                            {/* Room Details */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                রুমের বিবরণ
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CustomFormField
                                  name="beds"
                                  label="বেডরুম সংখ্যা"
                                  type="number"
                                />
                                <CustomFormField
                                  name="baths"
                                  label="বাথরুম সংখ্যা"
                                  type="number"
                                />
                                <CustomFormField
                                  name="squareFeet"
                                  label="আয়তন (বর্গফুট)"
                                  type="number"
                                />
                              </div>
                            </div>

                            {/* Property Features */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Settings className="w-4 h-4" />
                                বৈশিষ্ট্যসমূহ
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <CustomFormField
                                  name="isPetsAllowed"
                                  label="পোষা প্রাণী অনুমোদিত"
                                  type="switch"
                                />
                                <CustomFormField
                                  name="isParkingIncluded"
                                  label="পার্কিং সুবিধা"
                                  type="switch"
                                />
                                <CustomFormField
                                  name="isBachelorFriendly"
                                  label="ব্যাচেলর ফ্রেন্ডলি"
                                  type="switch"
                                />
                              </div>
                            </div>

                            {/* Amenities */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                সুবিধাসমূহ
                              </h4>
                              <CustomFormField
                                name="amenities"
                                label="সুবিধাসমূহ"
                                type="checkbox-list"
                                options={Object.values(AmenityEnum).map((amenity) => ({
                                  value: amenity,
                                  label: amenity,
                                }))}
                              />
                            </div>

                            {/* Highlights */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                বিশেষ বৈশিষ্ট্য
                              </h4>
                              <CustomFormField
                                name="highlights"
                                label="বিশেষ বৈশিষ্ট্য"
                                type="checkbox-list"
                                options={Object.values(HighlightEnum).map((highlight) => ({
                                  value: highlight,
                                  label: highlight,
                                }))}
                              />
                            </div>
                          </div>
                        )}

                        {/* Step 4: Location */}
                        {currentStep === 4 && (
                          <div className="space-y-6">
                            {/* Address field with pre-filled data info */}
                            <div className="space-y-2">
                              {verificationStatus?.address && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>আপনার যাচাইকৃত ঠিকানা থেকে স্বয়ংক্রিয়ভাবে পূরণ করা হয়েছে</span>
                                  </div>
                                  {verificationStatus?.latitude && verificationStatus?.longitude && (
                                    <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-2">
                                      <MapPin className="w-3 h-3" />
                                      <span>
                                        সঠিক স্থানাঙ্ক অন্তর্ভুক্ত: {verificationStatus.latitude.toFixed(6)}, {verificationStatus.longitude.toFixed(6)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                              <CustomFormField 
                                name="address" 
                                label="সম্পূর্ণ ঠিকানা"
                                placeholder="বাড়ি নং, রাস্তার নাম, এলাকা"
                                disabled
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <CustomFormField 
                                name="city" 
                                label="শহর" 
                                placeholder="ঢাকা"
                              />
                              <CustomFormField
                                name="state"
                                label="বিভাগ/রাজ্য"
                                placeholder="ঢাকা বিভাগ"
                              />
                              <CustomFormField
                                name="postalCode"
                                label="পোস্টাল কোড"
                                placeholder="1000"
                              />
                            </div>
                            <CustomFormField 
                              name="country" 
                              label="দেশ" 
                              disabled 
                            />
                          </div>
                        )}

                        {/* Step 5: Photos */}
                        {currentStep === 5 && (
                          <div className="space-y-6">
                            <div className="text-center">
                              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mx-auto mb-4">
                                <Camera className="w-8 h-8 text-indigo-600" />
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-2">প্রপার্টির ছবি যোগ করুন</h4>
                              <p className="text-gray-600 mb-6">উচ্চ মানের ছবি ভাড়াটিয়াদের আকৃষ্ট করে</p>
                            </div>
                            <CustomFormField
                              name="photoUrls"
                              label="প্রপার্টির ছবিসমূহ"
                              type="file"
                              accept="image/*"
                            />
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Enhanced Navigation */}
                    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="group flex items-center gap-2 hover:bg-gray-50"
                      >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        পূর্ববর্তী
                      </Button>

                      <div className="flex items-center gap-2">
                        {steps.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index + 1 <= currentStep 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>

                      {currentStep < totalSteps ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center gap-2"
                        >
                          পরবর্তী
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              প্রকাশ করা হচ্ছে...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              প্রপার্টি প্রকাশ করুন
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewProperty;
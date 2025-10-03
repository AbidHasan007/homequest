"use client";

import React, { useState, useEffect } from 'react';
import { useGetAuthUserQuery, useUpdateTenantSettingsMutation } from '@/state/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Globe, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Camera, 
  Edit3, 
  Save, 
  X,
  Check,
  AlertCircle,
  Settings,
  Lock,
  Smartphone,
  MessageSquare,
  Heart,
  Home,
  CreditCard,
  Download,
  Trash2,
  LogOut,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TenantSettings = () => {
    const { data: authUser, isLoading } = useGetAuthUserQuery();
    const [updateTenant] = useUpdateTenantSettingsMutation();
    
    // Local state management
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    
    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        bio: '',
        profileImage: '',
    });
    
    // Notification preferences
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketingEmails: false,
        leaseReminders: true,
        paymentReminders: true,
        propertyUpdates: true,
        reviewRequests: true,
    });
    
    // Privacy settings
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        allowMessages: true,
        allowReviews: true,
    });
    
    // Security settings
    const [security, setSecurity] = useState({
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: '1h',
        deviceTracking: true,
    });

    // Initialize form data when user data loads
    useEffect(() => {
        if (authUser?.userInfo) {
            const userInfo = authUser.userInfo as any;
            setFormData({
                name: userInfo.name || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.phoneNumber || '',
                bio: userInfo.bio || '',
                profileImage: userInfo.profileImage || '',
            });
        }
    }, [authUser]);

    // Handle form field changes
    const handleFieldChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    // Handle notification changes
    const handleNotificationChange = (setting: string, value: boolean) => {
        setNotifications(prev => ({ ...prev, [setting]: value }));
        setIsDirty(true);
    };

    // Handle privacy changes
    const handlePrivacyChange = (setting: string, value: any) => {
        setPrivacy(prev => ({ ...prev, [setting]: value }));
        setIsDirty(true);
    };

    // Handle security changes
    const handleSecurityChange = (setting: string, value: any) => {
        setSecurity(prev => ({ ...prev, [setting]: value }));
        setIsDirty(true);
    };

    // Save all settings
    const handleSaveSettings = async () => {
        if (!authUser?.cognitoInfo?.userId) return;
        
        setSaveStatus('saving');
        try {
            await updateTenant({
                cognitoId: authUser.cognitoInfo.userId,
                ...formData,
            });
            setSaveStatus('saved');
            setIsDirty(false);
            setIsEditing(false);
            
            // Reset save status after 3 seconds
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };

    // Cancel changes
    const handleCancel = () => {
        if (authUser?.userInfo) {
            const userInfo = authUser.userInfo as any;
            setFormData({
                name: userInfo.name || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.phoneNumber || '',
                bio: userInfo.bio || '',
                profileImage: userInfo.profileImage || '',
            });
        }
        setIsEditing(false);
        setIsDirty(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Settings size={24} className="text-white" />
                            </div>
                            Settings & Preferences
                        </h1>
                        <p className="text-gray-600 mt-2">Manage your account, privacy, and notification preferences</p>
                    </div>
                    
                    {/* Save Status & Actions */}
                    <div className="flex items-center gap-3">
                        <AnimatePresence>
                            {saveStatus === 'saving' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-2 text-blue-600"
                                >
                                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm font-medium">Saving...</span>
                                </motion.div>
                            )}
                            {saveStatus === 'saved' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-2 text-green-600"
                                >
                                    <Check size={16} />
                                    <span className="text-sm font-medium">Saved!</span>
                                </motion.div>
                            )}
                            {saveStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-2 text-red-600"
                                >
                                    <AlertCircle size={16} />
                                    <span className="text-sm font-medium">Error saving</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {isDirty && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="flex items-center gap-2"
                                >
                                    <X size={16} />
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSaveSettings}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                                    disabled={saveStatus === 'saving'}
                                >
                                    <Save size={16} />
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Settings Interface */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 p-1">
                    <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
                        <User size={16} />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2 py-3">
                        <Bell size={16} />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="flex items-center gap-2 py-3">
                        <Shield size={16} />
                        Privacy
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2 py-3">
                        <Lock size={16} />
                        Security
                    </TabsTrigger>
                </TabsList>

                {/* Profile Settings Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Information */}
                        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <User size={20} className="text-blue-600" />
                                    Personal Information
                                </h3>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="flex items-center gap-2"
                                >
                                    <Edit3 size={16} />
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* Profile Photo */}
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                            {formData.name?.[0]?.toUpperCase() || 'T'}
                                        </div>
                                        {isEditing && (
                                            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                                                <Camera size={14} />
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{formData.name || 'Tenant Name'}</h4>
                                        <p className="text-sm text-gray-600">Profile photo</p>
                                        {isEditing && (
                                            <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                                                Change photo
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleFieldChange('name', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleFieldChange('email', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            placeholder="City, Country"
                                            disabled={!isEditing}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => handleFieldChange('bio', e.target.value)}
                                        disabled={!isEditing}
                                        rows={4}
                                        placeholder="Tell us about yourself..."
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <Settings size={20} className="text-green-600" />
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Download size={16} className="text-blue-600" />
                                        <span className="font-medium">Download Data</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </button>

                                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Key size={16} className="text-green-600" />
                                        <span className="font-medium">Change Password</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </button>

                                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={16} className="text-purple-600" />
                                        <span className="font-medium">Payment Methods</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </button>

                                <button className="w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Trash2 size={16} className="text-red-600" />
                                        <span className="font-medium">Delete Account</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Bell size={20} className="text-yellow-600" />
                                Notification Preferences
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">Choose how you want to be notified about important updates</p>
                        </div>

                        <div className="space-y-6">
                            {/* Email Notifications */}
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Mail size={16} className="text-blue-600" />
                                    Email Notifications
                                </h4>
                                <div className="space-y-3">
                                    {[
                                        { key: 'emailNotifications', label: 'General email notifications', desc: 'Receive important updates via email' },
                                        { key: 'leaseReminders', label: 'Lease reminders', desc: 'Get notified about lease renewals and expiration' },
                                        { key: 'paymentReminders', label: 'Payment reminders', desc: 'Receive rent and payment due date reminders' },
                                        { key: 'propertyUpdates', label: 'Property updates', desc: 'Get notified about property maintenance and changes' },
                                        { key: 'marketingEmails', label: 'Marketing emails', desc: 'Receive promotional content and offers' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.label}</p>
                                                <p className="text-sm text-gray-600">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications[item.key as keyof typeof notifications] as boolean}
                                                    onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SMS Notifications */}
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Smartphone size={16} className="text-green-600" />
                                    SMS Notifications
                                </h4>
                                <div className="space-y-3">
                                    {[
                                        { key: 'smsNotifications', label: 'General SMS notifications', desc: 'Receive important updates via text message' },
                                        { key: 'reviewRequests', label: 'Review requests', desc: 'Get SMS when landlords request reviews' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">{item.label}</p>
                                                <p className="text-sm text-gray-600">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications[item.key as keyof typeof notifications] as boolean}
                                                    onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Push Notifications */}
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Bell size={16} className="text-purple-600" />
                                    Push Notifications
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">Browser notifications</p>
                                        <p className="text-sm text-gray-600">Get instant notifications in your browser</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications.pushNotifications}
                                            onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Privacy Tab */}
                <TabsContent value="privacy" className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Shield size={20} className="text-green-600" />
                                Privacy Settings
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">Control who can see your information and how it&apos;s used</p>
                        </div>

                        <div className="space-y-6">
                            {/* Profile Visibility */}
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Eye size={16} className="text-green-600" />
                                    Profile Visibility
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
                                        <select
                                            value={privacy.profileVisibility}
                                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="public">Public - Anyone can see</option>
                                            <option value="landlords">Landlords Only</option>
                                            <option value="private">Private - Only you</option>
                                        </select>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">Show email address</p>
                                                <p className="text-sm text-gray-600">Let others see your email</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={privacy.showEmail}
                                                    onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">Show phone number</p>
                                                <p className="text-sm text-gray-600">Let others see your phone</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={privacy.showPhone}
                                                    onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Communication Preferences */}
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <MessageSquare size={16} className="text-blue-600" />
                                    Communication
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Allow messages</p>
                                            <p className="text-sm text-gray-600">Let landlords send you messages</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={privacy.allowMessages}
                                                onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Allow reviews</p>
                                            <p className="text-sm text-gray-600">Let landlords review you after lease</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={privacy.allowReviews}
                                                onChange={(e) => handlePrivacyChange('allowReviews', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Lock size={20} className="text-red-600" />
                                Security Settings
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">Keep your account safe and secure</p>
                        </div>

                        <div className="space-y-6">
                            {/* Password Security */}
                            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Key size={16} className="text-red-600" />
                                    Password & Authentication
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Two-factor authentication</p>
                                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                        </div>
                                        <Button
                                            variant={security.twoFactorAuth ? "default" : "outline"}
                                            onClick={() => handleSecurityChange('twoFactorAuth', !security.twoFactorAuth)}
                                            className="flex items-center gap-2"
                                        >
                                            {security.twoFactorAuth ? (
                                                <>
                                                    <Check size={16} />
                                                    Enabled
                                                </>
                                            ) : (
                                                <>
                                                    <Lock size={16} />
                                                    Enable
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-red-200">
                                        <div>
                                            <p className="font-medium text-gray-800">Change Password</p>
                                            <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                                        </div>
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Key size={16} />
                                            Change
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Login Security */}
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Shield size={16} className="text-yellow-600" />
                                    Login Security
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Login alerts</p>
                                            <p className="text-sm text-gray-600">Get notified of suspicious login attempts</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={security.loginAlerts}
                                                onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">Session timeout</p>
                                            <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                                        </div>
                                        <select
                                            value={security.sessionTimeout}
                                            onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                                            className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        >
                                            <option value="30m">30 minutes</option>
                                            <option value="1h">1 hour</option>
                                            <option value="4h">4 hours</option>
                                            <option value="never">Never</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Account Actions */}
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <AlertCircle size={16} className="text-gray-600" />
                                    Account Actions
                                </h4>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Download size={16} className="mr-2" />
                                        Download my data
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <LogOut size={16} className="mr-2" />
                                        Sign out all devices
                                    </Button>
                                    <Button variant="destructive" className="w-full justify-start">
                                        <Trash2 size={16} className="mr-2" />
                                        Delete account permanently
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TenantSettings
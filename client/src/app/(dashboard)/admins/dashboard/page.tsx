"use client";
import React from "react";
import Link from "next/link";
import { Shield, Users, Building, FileText, BarChart, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  const adminFeatures = [
    {
      title: "Verification Management",
      description: "Review and approve landlord identity verification documents",
      icon: CheckCircle,
      href: "/admins/verification",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      title: "Safety Management",
      description: "Monitor and manage location safety indicators based on tenant reviews",
      icon: Shield,
      href: "/admins/safety",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "User Management",
      description: "Manage tenants, landlords, and admin accounts",
      icon: Users,
      href: "/admins/users",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "Property Management",
      description: "Oversee all properties and listings on the platform",
      icon: Building,
      href: "/admins/properties",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Reports & Analytics",
      description: "View platform statistics and generate reports",
      icon: BarChart,
      href: "/admins/reports",
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage and monitor your real estate platform from this central dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              href={feature.href}
              className="block group"
            >
              <div className={`
                p-6 rounded-lg border-2 transition-all duration-200
                hover:shadow-lg hover:scale-105 cursor-pointer
                ${feature.color}
              `}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2 group-hover:underline">
                      {feature.title}
                    </h3>
                    <p className="text-sm opacity-80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">--</div>
            <div className="text-sm text-gray-600">Total Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">--</div>
            <div className="text-sm text-gray-600">Active Tenants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">--</div>
            <div className="text-sm text-gray-600">Landlords</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">--</div>
            <div className="text-sm text-gray-600">Safety Indicators</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
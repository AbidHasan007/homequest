import React from "react";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

type SafetyLevel = "LOW" | "MEDIUM" | "HIGH";

interface SafetyBadgeProps {
  level: SafetyLevel;
  reason?: string;
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const SafetyBadge: React.FC<SafetyBadgeProps> = ({ 
  level, 
  reason, 
  className = "", 
  showText = true,
  size = "md"
}) => {
  const getSafetyConfig = (level: SafetyLevel) => {
    switch (level) {
      case "HIGH":
        return {
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-300",
          icon: ShieldCheck,
          text: "Safe Zone",
          description: "High tenant satisfaction in this area"
        };
      case "MEDIUM":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-300",
          icon: Shield,
          text: "Neutral Zone",
          description: "Mixed reviews for this area"
        };
      case "LOW":
        return {
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-300",
          icon: ShieldAlert,
          text: "Caution Zone",
          description: "Lower tenant satisfaction in this area"
        };
      default:
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-300",
          icon: Shield,
          text: "Unknown",
          description: "No safety data available"
        };
    }
  };

  const config = getSafetyConfig(level);
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div 
      className={`
        inline-flex items-center gap-2 rounded-full border
        ${config.bgColor} ${config.borderColor} ${config.color}
        ${sizeClasses[size]} ${className}
      `}
      title={reason || config.description}
    >
      <Icon className={iconSizes[size]} />
      {showText && (
        <span className="font-medium">{config.text}</span>
      )}
    </div>
  );
};

export default SafetyBadge;
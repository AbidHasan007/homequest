"use client";

import React from "react";
import { useGetReviewsQuery } from "@/state/api";

// export default function ReviewList({ userId }: { userId: string }) {
//   const { data: reviews, isLoading } = useGetReviewsQuery(userId, { skip: !userId });

//   if (!userId) return null;
//   if (isLoading) return <div className="text-sm text-gray-500">Loading reviews...</div>;
//   if (!reviews || reviews.length === 0) return <div className="text-sm text-gray-500">No reviews yet.</div>;

//   return (
//     <div className="space-y-3">
//       {reviews.map((r: any) => (
//         <div key={r.id} className="border border-gray-200 rounded-md p-3">
//           <div className="flex items-center justify-between">
//             <div className="text-yellow-500">{"★".repeat(r.rating)}<span className="text-gray-300">{"★".repeat(5 - r.rating)}</span></div>
//             <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</div>
//           </div>
//           {r.comment && <p className="text-sm text-gray-700 mt-1">{r.comment}</p>}
//         </div>
//       ))}
//     </div>
//   );
// }

// interface ReviewListProps { propertyId: number; }
interface ReviewListProps {
  propertyId: number;
  type: "TENANT_TO_LANDLORD" | "LANDLORD_TO_TENANT";
};


export default function ReviewList({ propertyId, type }: ReviewListProps) {
  const { data: reviews, isLoading, error } = useGetReviewsQuery({ propertyId, type });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border border-gray-200 p-3 rounded-lg animate-pulse">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
        <p className="text-sm">Error loading reviews. Please try again later.</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm">No reviews yet.</p>
        <p className="text-xs text-gray-400 mt-1">
          {type === "TENANT_TO_LANDLORD" 
            ? "Reviews from tenants will appear here" 
            : "Reviews for tenants will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map(r => (
        <div key={r.id} className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="text-yellow-500 text-sm">
                {"★".repeat(r.rating)}
                <span className="text-gray-300">{"★".repeat(5 - r.rating)}</span>
              </div>
              <span className="text-xs text-gray-500">({r.rating}/5)</span>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(r.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          {r.comment && (
            <p className="text-gray-700 text-sm mb-2 leading-relaxed">{r.comment}</p>
          )}
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              By: {r.type === "TENANT_TO_LANDLORD" 
                ? (r.tenant?.name || "Anonymous Tenant")
                : (r.landlord?.name || "Anonymous Landlord")}
            </span>
            {r.lease && (
              <span className="text-gray-400">
                Lease #{r.lease.id}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};



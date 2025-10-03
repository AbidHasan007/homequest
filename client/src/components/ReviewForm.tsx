// "use client";

// import React, { useMemo, useState } from "react";
// import { useCreateReviewMutation, useGetLeasesQuery, useGetReviewsQuery, useGetAuthUserQuery } from "@/state/api";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// export default function ReviewForm({ leaseId }: { leaseId: number }) {
//   const { data: auth } = useGetAuthUserQuery();
//   const { data: leases } = useGetLeasesQuery(0);
//   const { data: existingReviews } = useGetReviewsQuery(auth?.cognitoInfo?.userId ?? "", { skip: !auth?.cognitoInfo?.userId });
//   const [createReview, { isLoading }] = useCreateReviewMutation();

//   const [rating, setRating] = useState<number>(5);
//   const [comment, setComment] = useState<string>("");

//   const hasReviewed = useMemo(() => {
//     return (existingReviews || []).some((r: any) => r.leaseId === leaseId);
//   }, [existingReviews, leaseId]);

//   const canReview = useMemo(() => {
//     // Minimal check: allow if logged in and hasn’t reviewed. Server enforces lease membership.
//     return !!auth?.cognitoInfo?.userId && !hasReviewed;
//   }, [auth, hasReviewed]);

//   const onSubmit = async () => {
//     try {
//       if (!canReview) return;
//       await createReview({ leaseId, rating, comment }).unwrap();
//       setComment("");
//     } catch (e: any) {
//       toast.error(e?.data?.message || e?.message || "Failed to submit review");
//     }
//   };

//   return (
//     <div className="space-y-3">
//       <div className="flex items-center gap-2">
//         {[1,2,3,4,5].map((n) => (
//           <button key={n} type="button" onClick={() => setRating(n)} className={n <= rating ? "text-yellow-500" : "text-gray-300"}>
//             ★
//           </button>
//         ))}
//       </div>
//       <textarea
//         className="w-full border border-gray-200 rounded-md p-2"
//         rows={3}
//         placeholder="Share your experience"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         disabled={!canReview}
//       />
//       <Button disabled={!canReview || isLoading} onClick={onSubmit} className="bg-teal-700 text-white">
//         {hasReviewed ? "Already reviewed" : "Submit Review"}
//       </Button>
//     </div>
//   );
// }

"use client";

import React, { useMemo, useState } from "react";
import {
  useCreateReviewMutation,
  useGetLeasesQuery,
  useGetReviewsQuery,
  useGetAuthUserQuery,
} from "@/state/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ReviewFormProps {
  leaseId: number;
  locationId: number;
  type: "TENANT_TO_LANDLORD" | "LANDLORD_TO_TENANT";
}

export default function ReviewForm({ leaseId, locationId, type }: ReviewFormProps) {
  const { data: auth } = useGetAuthUserQuery();
  const { data: leases } = useGetLeasesQuery(0);
  const { data: existingReviews } = useGetReviewsQuery(
    { userId: auth?.cognitoInfo?.userId, type: undefined },
    { skip: !auth?.cognitoInfo?.userId }
  );

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  // ✅ check if already reviewed this lease
  const hasReviewed = useMemo(() => {
    return (existingReviews || []).some((r: any) => r.leaseId === leaseId);
  }, [existingReviews, leaseId]);

  const canReview = useMemo(() => {
    return !!auth?.cognitoInfo?.userId && !hasReviewed;
  }, [auth, hasReviewed]);

  const onSubmit = async () => {
    try {
      if (!canReview) return;

      // 👇 figure out review type
      const role = auth?.userRole; // assuming your auth has role = "TENANT" | "LANDLORD"
      const reviewType =
        role === "TENANT" ? "TENANT_TO_LANDLORD" : "LANDLORD_TO_TENANT";

      await createReview({
        leaseId,
        locationId,
        rating,
        comment,
        type: reviewType,
      }).unwrap();

      setComment("");
    } catch (e: any) {
      toast.error(
        e?.data?.message || e?.message || "Failed to submit review"
      );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={n <= rating ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full border border-gray-200 rounded-md p-2"
        rows={3}
        placeholder="Share your experience"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={!canReview}
      />
      <Button
        disabled={!canReview || isLoading}
        onClick={onSubmit}
        className="bg-teal-700 text-white"
      >
        {hasReviewed ? "Already reviewed" : "Submit Review"}
      </Button>
    </div>
  );
}

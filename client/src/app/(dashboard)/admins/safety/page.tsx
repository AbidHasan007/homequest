"use client";
import React, { useState } from "react";
import {
  useGetAllSafetyIndicatorsQuery,
  useUpdateSafetyIndicatorMutation,
  useCalculateSafetyIndicatorsMutation,
} from "@/state/api";
import SafetyBadge from "@/components/SafetyBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RefreshCw, Calculator } from "lucide-react";

const SafetyManagementPage = () => {
  const { data: safetyIndicators = [], isLoading, refetch } = useGetAllSafetyIndicatorsQuery();
  const [updateSafetyIndicator] = useUpdateSafetyIndicatorMutation();
  const [calculateSafetyIndicators] = useCalculateSafetyIndicatorsMutation();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLevel, setEditLevel] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [editReason, setEditReason] = useState("");

  const handleEdit = (indicator: any) => {
    setEditingId(indicator.id);
    setEditLevel(indicator.level);
    setEditReason(indicator.reason || "");
  };

  const handleSave = async (locationId: number) => {
    try {
      await updateSafetyIndicator({
        locationId,
        level: editLevel,
        reason: editReason,
      }).unwrap();
      setEditingId(null);
      setEditReason("");
    } catch (error) {
      console.error("Failed to update safety indicator:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditLevel("MEDIUM");
    setEditReason("");
  };

  const handleCalculateAll = async () => {
    try {
      await calculateSafetyIndicators().unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to calculate safety indicators:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p>Loading safety indicators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Safety Management</h1>
        <div className="flex gap-3">
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleCalculateAll}>
            <Calculator className="w-4 h-4 mr-2" />
            Recalculate All
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Safety Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reviews Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {safetyIndicators.map((indicator: any) => (
              <tr key={indicator.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {indicator.location.address}
                  </div>
                  <div className="text-sm text-gray-500">
                    {indicator.location.city}, {indicator.location.state}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === indicator.id ? (
                    <Select value={editLevel} onValueChange={(value: any) => setEditLevel(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <SafetyBadge level={indicator.level} reason={indicator.reason} />
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === indicator.id ? (
                    <Input
                      value={editReason}
                      onChange={(e) => setEditReason(e.target.value)}
                      placeholder="Enter reason..."
                      className="w-full"
                    />
                  ) : (
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {indicator.reason}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {indicator.location.reviews?.length || 0} reviews
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(indicator.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === indicator.id ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSave(indicator.locationId)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(indicator)}
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {safetyIndicators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No safety indicators found.</p>
          <Button onClick={handleCalculateAll}>
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Safety Indicators
          </Button>
        </div>
      )}
    </div>
  );
};

export default SafetyManagementPage;
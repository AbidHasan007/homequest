"use client"
import SettingsForm from '@/components/SettingsForm';
import { useGetAuthUserQuery, useUpdateLandlordSettingsMutation } from '@/state/api';
import React from 'react'

const LandlordSettings = () => {
    const {data: authUser, isLoading} = useGetAuthUserQuery();
    const [updateLandlord] = useUpdateLandlordSettingsMutation();
        if(isLoading) return <div>Loading...</div>
        const initialData = {
            name: authUser?.userInfo.name,
            email: authUser?.userInfo.email,
            phoneNumber: authUser?.userInfo.phoneNumber
        };
        const handleSubmit = async(data: typeof initialData) =>{
        await updateLandlord({
            cognitoId: authUser?.cognitoInfo?.userId,
             ...data,})
    }
  return (
    <SettingsForm 
    initialData={initialData}
    onSubmit={handleSubmit}
    userType="landlord"
    />
  )
}

export default LandlordSettings
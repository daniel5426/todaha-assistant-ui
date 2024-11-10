"use client";
import { useAuthContext } from "@/states/auth";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/lib/axiosConfig";
import useToast from "@/hooks/use-toast";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import axios from "axios";
import { createPortalSession } from '@/app/lib/data';

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL1!; // Adjust based on Next.js environment variable usage
export default function AccountPage() {
    const { state, updateUserInfo } = useAuthContext();
    const user = state.user;
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const { toaster } = useToast();
    const t = useTranslations('Account');
    const isRTL = useLocale() === 'he';

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        company_name: '',
        phone_number: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await updateUserInfo();
            setIsLoading(false);
            setFormData({
                username: user.username || '',
                email: user.email || '',
                full_name: user.full_name || '',
                company_name: user.company_name || '',
                phone_number: user.phone_number || ''
            });
        };
        fetchData();
    }, []);


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            username: user?.username || '',
            email: user?.email || '',
            full_name: user?.full_name || '',
            company_name: user?.company_name || '',
            phone_number: user?.phone_number || ''
        });
    };

    const handlePortal = async () => {
        setIsLoading(true);
        try {
            console.log(user.stripe_customer_id)
            const { url } = await createPortalSession(user.stripe_customer_id);
            window.location.href = url;
        } catch (error) {
            console.error('Error:', error);
            toaster.error(t('errorPortalAccess'));
        } finally {
            setIsLoading(false);
        }
    };


    const handleSave = async () => {
        try {
            setIsSaving(true);
            // Only send the fields that can be updated
            const updateData = {
                full_name: formData.full_name,
                company_name: formData.company_name,
                phone_number: formData.phone_number,
                // Preserve other user fields that shouldn't be modified
                username: user?.username,
                email: user?.email,
                token_used: user?.token_used,
                token_limit: user?.token_limit,
                password: "kdjfkdjf",
            };
            
            await axiosInstance.post('/admin/update-user', updateData);
            await updateUserInfo();
            setFormData({
                username: user?.username || '',
                email: user?.email || '',
                full_name: formData?.full_name || '',
                company_name: formData?.company_name || '',
                phone_number: formData?.phone_number || ''
            });

            toaster.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toaster.error('Error updating profile');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl">User not found</h2>
                    <p className="text-base-content/60">Please log in to view your profile</p>
                </div>
            </div>
        );
    }

    // Calculate token usage percentage
    const tokenPercentage = user?.token_limit 
        ? (user.token_used / user.token_limit) * 100 
        : 0;

    return (
        <div className="container mx-auto p-6">
            <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
                <div className="card-body relative">
                    {/* Edit/Save buttons in top right corner */}
                    <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                        {!isEditing ? (
                            <button 
                                className="btn btn-primary btn-sm"
                                onClick={handleEdit}
                            >
                                {t('edit')}
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button 
                                    className="btn btn-ghost btn-sm"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                >
                                    {t('cancel')}
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : t('save')}
                                </button>
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold mb-6">{t('accountInformation')}</h2>
                    
                    {/* Main content container */}
                    <div className="max-w-3xl w-full">
                        {/* Form Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">{t('email')}</span>
                                    </label>
                                    <p className="h-12 px-4 flex items-center border rounded-lg bg-base-200">
                                        {user?.email || '-'}
                                    </p>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">{t('firstName')}</span>
                                    </label>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            className="input input-bordered" 
                                            value={formData.full_name}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                full_name: e.target.value
                                            }))}
                                        />
                                    ) : (
                                        <p className="h-12 px-4 flex items-center border rounded-lg bg-base-200">
                                            {user?.full_name }
                                        </p>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">{t('companyName')}</span>
                                    </label>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            className="input input-bordered" 
                                            value={formData.company_name}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                company_name: e.target.value
                                            }))}
                                        />
                                    ) : (
                                        <p className="h-12 px-4 flex items-center border rounded-lg bg-base-200">
                                            {user?.company_name || '-'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">{t('username')}</span>
                                    </label>
                                    <p className="h-12 px-4 flex items-center border rounded-lg bg-base-200">
                                        {user?.username || '-'}
                                    </p>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">{t('phoneNumber')}</span>
                                    </label>
                                    {isEditing ? (
                                        <input 
                                            type="tel" 
                                            className="input input-bordered" 
                                            value={formData.phone_number}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                phone_number: e.target.value
                                            }))}
                                        />
                                    ) : (
                                        <p className="h-12 px-4 flex items-center border rounded-lg bg-base-200">
                                            {user?.phone_number || '-'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-8"></div>
                        <div className="stats shadow w-full">
                            <div className="stat">
                                <div className="stat-title">{t('chatbots')}</div>
                                <div className="stat-value">{user.assistant?.chatbots?.length || 0}</div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">{t('subscription')}</div>
                                <div className="stat-value capitalize text-primary">
                                    {user?.subscription_type || 'free'}
                                </div>
                                <div className="stat-desc mt-2">
                                    {user?.subscription_end_date && (
                                        <div className="text-sm mb-2">
                                            {t('validUntil')}: {new Date(user.subscription_end_date).toLocaleDateString()}
                                        </div>
                                    )}
                                    <button 
                                        onClick={handlePortal}
                                        className="btn btn-xs btn-primary"
                                    >
                                        {t('manageSubscription')}
                                    </button>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">{t('tokenUsage')}</div>
                                <div className="stat-value text-base">
                                    {user?.token_used || 0} / {user?.token_limit || 0}
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-grow">
                                        <progress 
                                            className={`progress w-full ${
                                                tokenPercentage > 90 
                                                    ? 'progress-error' 
                                                    : tokenPercentage > 70 
                                                        ? 'progress-warning' 
                                                        : 'progress-primary'
                                            }`}
                                            value={tokenPercentage} 
                                            max="100"
                                        ></progress>
                                    </div>
                                    <span className="text-sm text-base-content/70 min-w-[40px]">
                                        {Math.round(tokenPercentage)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
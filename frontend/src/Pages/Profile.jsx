import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';
import avatar from '../assets/avatar.png';

const Profile = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [image, setImage] = useState(null);
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = reader.result;
            setImage(base64);
            await updateProfile({ profilePic: base64 });
        }
    };

    return (
        <div className='h-screen pt-20'>
            <div className='max-w-2xl mx-auto p-4 py-8'>
                <div className='bg-base-300 rounded-xl p-6 space-y-8'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>Profile</h1>
                        <p className='mt-2'>Your Profile Information</p>
                    </div>
                    {/* Image upload */}
                    <div className='flex flex-col items-center gap-4'>
                        <div className='relative'>
                            <img
                                src={image || authUser?.user.profilePic || avatar}
                                alt='Profile'
                                className='w-32 h-32 rounded-full object-cover border-2'
                            />
                            <label
                                htmlFor='image'
                                className={`absolute bottom-0 right-0 p-3 bg-base-content rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
                                    }`}
                            >
                                <Camera className='w-6 h-6 text-base-200' />
                                <input
                                    type='file'
                                    id='image'
                                    accept='image/*'
                                    className='hidden'
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className='text-sm text-zinc-400'>
                            {isUpdatingProfile
                                ? 'Updating Profile...'
                                : 'Click on the camera icon to upload an image'}
                        </p>
                    </div>

                    <div className='space-y-6'>
                        <div className='space-y-1.5'>
                            <div className='text-sm text-zinc-700 flex items-center gap-2'>
                                <User className='w-4 h-4' />
                                Fullname
                            </div>
                            <p className='px-6 py-2.5 bg-base-200 rounded-lg border'>
                                {authUser?.user.fullname || 'Not set'}
                            </p>
                        </div>

                        <div className='space-y-1.5'>
                            <div className='text-sm text-zinc-700 flex items-center gap-2'>
                                <Mail className='w-4 h-4' />
                                Email
                            </div>
                            <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>
                                {authUser?.user.email || 'Not set'}
                            </p>
                        </div>
                    </div>
                    <div className='mt-3 bg-base-300 rounded-xl p-6'>
                        <h2 className='text-lg font-medium m2-4'>Account Information</h2>
                        <div className='space-y-3 text-sm'>
                            <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                                <span>Member Since</span>
                                <span>{authUser.user.createdAt?.split('T')[0]}</span>
                            </div>
                            <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                                <span>Account Status</span>
                                <span className='text-green-500'>Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

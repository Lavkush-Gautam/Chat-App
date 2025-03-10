import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  const { signup, isSigningUp } = useAuthStore()
  const validateForm = () => {
    if (!formData.fullname || !formData.email || !formData.password
    ) {
      return toast.error('All fields are required')
    }
    if (!formData.password.length < 6) {
      return toast.error('Password must be 6 character long')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()
    if (success) signup(formData)
  }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className=''>Get Started with your free account</p>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <User className='h-5 w-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  placeholder='Full name'
                  className='input input-bordered w-full pl-10'
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <Mail className='h-5 w-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  placeholder='Example@.com'
                  className='input input-bordered w-full pl-10'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <Lock className='h-5 w-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='*******'
                  className='input input-bordered w-full pl-10'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5 text-base-content/40' />
                  ) : (
                    <Eye className='w-5 h-5 text-base-content/40' />
                  )}
                </button>
              </div>
            </div>
            <button type='submit' className='btn btn-primary w-full '>
              {isSigningUp ? (
                <>
                  <Loader className='w-5 h-5 animate-spin' />
                  Loading....
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
              Already Have an Account?{' '}
              <Link to='/login' className='link link-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right part */}
      <AuthImagePattern title='Join our Community' subtitle='Connect with Friends, share moments,and stay in touch with your loved once' />
    </div>
  )
}

export default SignupPage
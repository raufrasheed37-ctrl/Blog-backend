"use client"
import React from 'react'
import Link from "next/link";
import { useState } from "react"
import { z } from 'zod';
import { useRouter, useSearchParams } from "next/navigation";
import useAuthStore from '@/store/authstore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});


export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const result = loginSchema.safeParse(formData);

      if (!result.success) {
        const newErrors = {};
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0];

          if (fieldName) {
            newErrors[fieldName] = issue.message;
          }
        });

        setErrors(newErrors);
        return;
      }

      await login(result.data.email, result.data.password);

      if (useAuthStore.getState().token) {
        router.push(nextPath);
      } else {
        setErrors({ form: useAuthStore.getState().error || "Login failed" });
      }
    } catch (error) {
      setErrors({ form: error?.message || 'Something went wrong' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className=" flex items-center justify-center py-22 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 rounded-2xl border border-zinc-500 bg-zinc-900 shadow-sm backdrop-blur-xl p-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">
                SIGN IN
              </h2>
              <p className="mt-2 text-center text-sm">
                Or{" "}
                <Link
                  href={`/register?next=${encodeURIComponent(nextPath)}`}
                  className="font-medium text-orange-500 hover:text-orange-400"
                >
                  Create new account
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-white focus:border-white  focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div> <br />
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-white focus:border-white  focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  {/* <br /> */}
                  <input type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={()=> setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="text-sm"> Show Password</label>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                  )}
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className=" w-full flex justify-center py-2 px-4 border border-transparent  font-semibold rounded-md text-zinc-950 bg-orange-500 hover:bg-orange-400"
                >
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>
              </div>
            </form>
            {errors.form && (
              <p className="text-sm text-red-400">{errors.form}</p>
            )}
            <p className="mt-2 text-sm">
                <Link
                  href="/"
                  className="font-medium text-orange-500 hover:text-orange-400"
                >
                  ← Back to Homepage
                </Link>
              </p>
          </div>

        </div>
  );
}

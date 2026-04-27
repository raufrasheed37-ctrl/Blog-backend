"use client"
import React from 'react'
import Link from "next/link";
import { useState } from "react"


export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 rounded-2xl border border-zinc-500 bg-zinc-900 shadow-sm p-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm">
                Or{" "}
                <Link
                  href="/login"
                  className="font-medium text-orange-500 hover:text-orange-400"
                >
                  sign in to your existing account
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Username
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div> <br />
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-white focus:border-white  focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div> <br />
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={ showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
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
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className=" w-full flex justify-center py-2 px-4 border border-transparent  font-semibold rounded-md text-zinc-950 bg-orange-500 hover:bg-orange-400"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="mt-2 text-sm">
              <Link
                href="/"
                className="font-medium text-orange-500 hover:text-orange-400"
              >
                Back to Homepage
              </Link>
            </p>
          </div>
        </div>
  );
}

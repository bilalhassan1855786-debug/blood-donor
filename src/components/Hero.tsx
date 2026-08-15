"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white">

      {/* Background circles */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-red-300/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12 md:py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center">

          {/* LEFT SIDE */}
          <div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full mb-3 sm:mb-6">
                <span className="text-lg sm:text-2xl">🩸</span>
                <span className="font-semibold text-xs sm:text-sm">
                  Emergency Blood Donation Network
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black leading-tight mb-3 sm:mb-6">
                Save
                <span className="text-yellow-300"> Lives </span>
                Through Blood Donation
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-red-100 mb-4 sm:mb-8 max-w-2xl leading-relaxed">
                Join Pakistan's growing blood donation network.
                Help patients, hospitals, and emergency cases
                through a secure and professional donor system.
              </p>

            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >

              <Link
                href="/become-donor"
                className="
                  bg-white
                  text-red-600
                  px-3
                  py-2
                  sm:px-5
                  sm:py-3
                  md:px-7
                  md:py-4
                  rounded-lg
                  sm:rounded-xl
                  font-bold
                  text-xs
                  sm:text-sm
                  md:text-base
                  hover:scale-105
                  transition
                  shadow-lg
                  sm:shadow-xl
                "
              >
                🩸 Become Donor
              </Link>

              <Link
                href="/book-blood"
                className="
                  border-2
                  border-white
                  px-3
                  py-2
                  sm:px-5
                  sm:py-3
                  md:px-7
                  md:py-4
                  rounded-lg
                  sm:rounded-xl
                  font-bold
                  text-xs
                  sm:text-sm
                  md:text-base
                  hover:bg-white
                  hover:text-red-600
                  transition
                "
              >
                🚨 Request Blood
              </Link>

            </motion.div>

            {/* Statistics */}
            <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5"
>

              <div className="bg-white/10 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center backdrop-blur">
                <div className="text-lg sm:text-2xl md:text-3xl font-black">1000+</div>
                <div className="text-xs sm:text-sm">Donors</div>
              </div>

              <div className="bg-white/10 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center backdrop-blur">
                <div className="text-lg sm:text-2xl md:text-3xl font-black">50+</div>
                <div className="text-xs sm:text-sm">Cities</div>
              </div>

              <div className="bg-white/10 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center backdrop-blur">
                <div className="text-lg sm:text-2xl md:text-3xl font-black">5000+</div>
                <div className="text-xs sm:text-sm">Lives Saved</div>
              </div>

            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >

            {/* Floating blood drops - hidden on mobile */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="hidden sm:block absolute top-10 left-20 text-3xl sm:text-4xl lg:text-5xl"
            >
              🩸
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="hidden md:block absolute top-20 right-20 text-3xl lg:text-4xl"
            >
              🩸
            </motion.div>

            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="hidden sm:block absolute bottom-10 left-10 text-3xl sm:text-4xl lg:text-5xl"
            >
              🩸
            </motion.div>

            {/* Logo */}
            <div
  className="
    relative
    animate-pulse
    drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]
  "
>

              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl" />

              <Image
                src="/logo.png"
                alt="Emergency Blood Donation Network"
                width={300}
                height={300}
                priority
                className="
                  relative
                  rounded-full
                  shadow-xl
                  sm:shadow-2xl
                  border-4
                  sm:border-8
                  border-white/20
                  w-56
                  h-56
                  sm:w-96
                  sm:h-96
                "
              />

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
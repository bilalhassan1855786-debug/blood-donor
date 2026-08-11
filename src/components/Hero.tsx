"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white">

      {/* Background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <span className="text-2xl">🩸</span>
                <span className="font-semibold">
                  Emergency Blood Donation Network
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                Save
                <span className="text-yellow-300"> Lives </span>
                Through Blood Donation
              </h1>

              <p className="text-xl text-red-100 mb-8 max-w-2xl">
                Join Pakistan's growing blood donation network.
                Help patients, hospitals, and emergency cases
                through a secure and professional donor system.
              </p>

            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >

              <Link
                href="/become-donor"
                className="
                  bg-white
                  text-red-600
                  px-7
                  py-4
                  rounded-xl
                  font-bold
                  hover:scale-105
                  transition
                  shadow-xl
                "
              >
                🩸 Become Donor
              </Link>

              <Link
                href="/book-blood"
                className="
                  border-2
                  border-white
                  px-7
                  py-4
                  rounded-xl
                  font-bold
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
  className="grid grid-cols-3 gap-5"
>

              <div className="bg-white/10 p-4 rounded-xl text-center backdrop-blur">
                <div className="text-3xl font-black">1000+</div>
                <div className="text-sm">Donors</div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl text-center backdrop-blur">
                <div className="text-3xl font-black">50+</div>
                <div className="text-sm">Cities</div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl text-center backdrop-blur">
                <div className="text-3xl font-black">5000+</div>
                <div className="text-sm">Lives Saved</div>
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

            {/* Floating blood drops */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute top-10 left-20 text-5xl"
            >
              🩸
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute top-20 right-20 text-4xl"
            >
              🩸
            </motion.div>

            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute bottom-10 left-10 text-5xl"
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
                width={450}
                height={450}
                priority
                className="
                  relative
                  rounded-full
                  shadow-2xl
                  border-8
                  border-white/20
                "
              />

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
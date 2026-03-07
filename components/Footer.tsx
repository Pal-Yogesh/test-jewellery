"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[url('/ring-bw.webp')] bg-cover bg-center w-full h-auto text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-black/60 z-0" />

  
      <div className="relative z-10">
        {/* Newsletter */}
        <motion.div
          className="border-b border-stone-800 py-16 lg:py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-6">
              Stay Connected
            </h3>
            <p className="text-lg sm:text-xl text-stone-300 font-light mb-8 max-w-2xl mx-auto">
              Be the first to discover our latest collections, exclusive events, and jewellery insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="  Enter your email address"
                className="bg-stone-800 border-stone-700 text-white py-2 placeholder:text-stone-400 flex-1"
              />
              <button className="bg-amber-500 flex items-center py-2 text-stone-900 hover:bg-amber-400 px-8">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-start mb-6">
                  <div className="text-2xl font-serif tracking-wider text-white mb-1">
                    Brand
                  </div>
                  <div className="text-[10px] tracking-[.25em] uppercase text-stone-400">
                    Makers Collective
                  </div>
                </div>
                <p className="text-stone-300 font-light leading-relaxed mb-6">
                  India&apos;s first jewellery makers collective — connecting 40+ independent designers
                  with those who appreciate the art of adornment. Handcrafted with love since 2018.
                </p>
                <div className="flex space-x-4">
                  {["Instagram", "Facebook", "Twitter", "YouTube"].map((name, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-[#C8102E] hover:text-white transition-colors text-stone-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-[10px] font-bold">{name[0]}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Collections */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-serif text-white mb-6">Collections</h4>
                <ul className="space-y-3">
                  {[
                    "New Arrivals",
                    "Bridal Edit",
                    "Festive Picks",
                    "Everyday Luxe",
                    "Silver Essentials",
                    "Kundan & Jadau"
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-stone-300 hover:text-white transition-colors font-light">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-serif text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    "About Us",
                    "Our Designers",
                    "Custom Orders",
                    "Gift Cards",
                    "Size Guide",
                    "Care Instructions"
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-stone-300 hover:text-white transition-colors font-light">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-serif text-white mb-6">Contact</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#C8102E] mt-1 shrink-0" />
                    <div>
                      <p className="text-stone-300 font-light text-sm">Brand Studio</p>
                      <p className="text-stone-400 font-light text-sm">
                        42, Linking Road, Bandra West,
                        Mumbai 400050, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#C8102E] shrink-0" />
                    <p className="text-stone-300 font-light text-sm">+91 22 2600 0000</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#C8102E] shrink-0" />
                    <p className="text-stone-300 font-light text-sm">hello@Brand.in</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-stone-800">
                  <p className="text-stone-400 font-light text-sm mb-2">Also visit us at:</p>
                  <p className="text-stone-300 font-light text-sm">
                    DLF Emporio, Vasant Kunj, New Delhi
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-stone-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-stone-400 font-light text-sm text-center sm:text-left">
                © 2025 Brand Makers Collective. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((item) => (
                  <a key={item} href="#" className="text-stone-400 hover:text-white transition-colors font-light">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
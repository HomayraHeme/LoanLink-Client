import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../Theme/ThemeContext';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const ContactUs = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Theme colors
  const bgColor = isDark ? 'bg-gray-900' : 'bg-green-100';
  const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
  const textColor = isDark ? 'text-gray-100' : 'text-gray-800';
  const subText = isDark ? 'text-gray-400' : 'text-gray-600';
  const headingColor = isDark ? 'text-emerald-300' : 'text-emerald-800';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-300';

  return (
    <section className={`${bgColor} ${textColor} py-24 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* --- Header --- */}
        <motion.div
          className="text-center space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            className={`text-5xl sm:text-6xl font-extrabold ${headingColor}`}
            variants={fadeUp}
            custom={0}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className={`max-w-2xl mx-auto text-lg ${subText}`}
            variants={fadeUp}
            custom={1}
          >
            Whether you need loan assistance, have partnership ideas, or just want to say hi — our team is ready to help.
          </motion.p>
        </motion.div>

        {/* --- Contact Info & Form Section --- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* --- Contact Information --- */}
          <motion.div
            className={`p-8 rounded-2xl shadow-lg ${cardBg}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className={`text-3xl font-bold mb-6 ${headingColor}`}
              variants={fadeUp}
              custom={0}
            >
              Contact Information
            </motion.h2>

            <motion.div className="space-y-5" variants={fadeUp} custom={1}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-600 text-white">
                  <FaEnvelope />
                </div>
                <p>support@loanlink.com</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-600 text-white">
                  <FaPhoneAlt />
                </div>
                <p>+880 1700-123456</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-emerald-600 text-white">
                  <FaMapMarkerAlt />
                </div>
                <p>123 Green Street, Dhaka, Bangladesh</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2}>
              <h3 className="text-lg font-semibold mt-10 mb-3">Business Hours</h3>
              <p className={`${subText}`}>
                Sunday - Thursday: 9:00 AM – 6:00 PM <br />
                Friday & Saturday: Closed
              </p>
            </motion.div>
          </motion.div>

          {/* --- Contact Form --- */}
          <motion.form
            className={`p-8 rounded-2xl shadow-lg border ${borderColor} ${cardBg}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.h2
              className={`text-3xl font-bold mb-6 ${headingColor}`}
              variants={fadeUp}
              custom={0}
            >
              Send Us a Message
            </motion.h2>

            <motion.div className="space-y-5" variants={fadeUp} custom={1}>
              <div>
                <label className="block text-sm mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full p-3 rounded-md border ${borderColor} bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full p-3 rounded-md border ${borderColor} bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className={`w-full p-3 rounded-md border ${borderColor} bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-primary w-full hover:scale-105 transition-transform"
              >
                Send Message
              </button>
            </motion.div>
          </motion.form>
        </div>

        {/* --- Map Section --- */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe
            title="LoanLink Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.901119624035!2d90.39120377485827!3d23.750870078695323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b5e1234e21%3A0x4e7bcb3e47cd51b2!2sDhaka!5e0!3m2!1sen!2sbd!4v1707220000000"
            className="w-full h-[400px] border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactUs;

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      contactSchema.parse(formData);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.issues.forEach((issue) => { if (issue.path[0]) newErrors[issue.path[0] as string] = issue.message; });
        setErrors(newErrors);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Bharathwaj',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (_error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 bg-white/[0.03] border rounded-lg text-white text-sm placeholder-gray-600 transition-all duration-300 input-glow ${errors[field] ? 'border-red-500' : 'border-white/10'
    }`;

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-red-600">CONTACT</span> GRID
          </h2>
          <div className="h-1 w-16 bg-red-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to discuss your next project? Let&apos;s connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-xl p-8"
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-600 rounded-full" />
              Get In Touch
            </h3>

            <div className="space-y-5">
              {[
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Email', value: 'tvlbharathwaj@gmail.com' },
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', value: '+91 7708145221' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">{item.label}</h4>
                    <p className="text-gray-500 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-gray-400 text-xs font-mono tracking-wider mb-3">FIND ME ON</h4>
              <div className="flex gap-2">
                {[
                  { path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', href: 'https://github.com/Bharathwaj7' },
                  { path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', href: 'https://www.linkedin.com/in/tvl-bharathwaj-12a463270/' },
                ].map((item, i) => (
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-red-600/20 hover:border-red-600/30 transition-all duration-300">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d={item.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass rounded-xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-red-600 rounded-full" />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-gray-400 text-xs font-mono tracking-wider mb-2">NAME</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClasses('name')} placeholder="Your name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-400 text-xs font-mono tracking-wider mb-2">EMAIL</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses('email')} placeholder="your.email@example.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-400 text-xs font-mono tracking-wider mb-2">MESSAGE</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className={inputClasses('message')} placeholder="Your message here..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${isSubmitting
                    ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                    : 'bg-red-600 hover:bg-red-500 hover:shadow-lg hover:shadow-red-600/20 text-white'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-900/20 border border-green-600/20 text-green-400 rounded-lg text-sm">
                    ✓ Message sent! I&apos;ll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-900/20 border border-red-600/20 text-red-400 rounded-lg text-sm">
                    ✗ Failed to send. Please email me directly at tvlbharathwaj@gmail.com
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
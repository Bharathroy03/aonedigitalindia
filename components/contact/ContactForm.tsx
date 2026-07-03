'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

import { contactFormSchema, type ContactFormData } from '@/lib/zod/schemas';
import productsFallback from '@/data/products.json';
import { Button } from '@/components/ui/Button';

interface ContactFormProps {
  productList?: any[];
}

export const ContactForm: React.FC<ContactFormProps> = ({ productList: initialProducts }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [productList, setProductList] = useState<any[]>(initialProducts || productsFallback);

  useEffect(() => {
    if (initialProducts) {
      setProductList(initialProducts);
    }
  }, [initialProducts]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      product: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    setReferenceCode(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMsg(result.message || 'Thank you! We received your message.');
        if (result.reference) {
          setReferenceCode(result.reference);
        }
        reset();
      } else {
        setErrorMsg(result.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('A network error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-8 sm:p-10 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />

      <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2 text-left">
        Send Us a Message
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-body mb-8 text-left">
        Fill out the form below, and our electronics advisor will contact you shortly.
      </p>

      {/* Success Alert */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-400 flex items-start gap-3 text-left">
          <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-green-600 dark:text-green-500" />
          <div className="text-sm font-body">
            <p className="font-bold">{successMsg}</p>
            {referenceCode && (
              <p className="mt-1 text-xs opacity-90">
                Your reference code: <strong className="font-mono bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded text-green-700 dark:text-green-300">{referenceCode}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 text-rose-800 dark:text-rose-400 flex items-start gap-3 text-left">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-500" />
          <p className="text-sm font-body font-semibold">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left" noValidate aria-label="Contact inquiry form">
        {/* Honeypot Spam Prevention */}
        <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" tabIndex={-1} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-bold font-body uppercase text-slate-550 dark:text-slate-400">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`h-11 px-4 rounded-xl border bg-transparent font-body text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <span className="text-xs text-rose-500 font-body">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold font-body uppercase text-slate-550 dark:text-slate-400">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`h-11 px-4 rounded-xl border bg-transparent font-body text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
              }`}
              placeholder="name@example.com"
            />
            {errors.email && <span className="text-xs text-rose-500 font-body">{errors.email.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-xs font-bold font-body uppercase text-slate-550 dark:text-slate-400">
              Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={`h-11 px-4 rounded-xl border bg-transparent font-body text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
              }`}
              placeholder="e.g. +91 98765 43210"
            />
            {errors.phone && <span className="text-xs text-rose-500 font-body">{errors.phone.message}</span>}
          </div>

          {/* Interested Product */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="product" className="text-xs font-bold font-body uppercase text-slate-550 dark:text-slate-400">
              Product Interest (Optional)
            </label>
            <select
              id="product"
              {...register('product')}
              className="h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-950 font-body text-sm text-slate-900 dark:text-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select a product...</option>
              {productList.map((prod) => (
                <option key={prod.id} value={prod.name}>
                  {prod.name}
                </option>
              ))}
            </select>
            {errors.product && <span className="text-xs text-rose-500 font-body">{errors.product.message}</span>}
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-xs font-bold font-body uppercase text-slate-550 dark:text-slate-400">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            className={`h-11 px-4 rounded-xl border bg-transparent font-body text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
            }`}
            placeholder="e.g. Price Inquiry, Store Visit request"
          />
          {errors.subject && <span className="text-xs text-rose-500 font-body">{errors.subject.message}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-xs font-bold font-body uppercase text-slate-550 dark:text-slate-400">
            Your Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={`px-4 py-3 rounded-xl border bg-transparent font-body text-sm text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none ${
              errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
            }`}
            placeholder="Type your message here..."
          />
          {errors.message && <span className="text-xs text-rose-500 font-body">{errors.message.message}</span>}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isSubmitting}
            leftIcon={<Send className="h-4.5 w-4.5" />}
          >
            Send Inquiry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

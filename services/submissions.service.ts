/**
 * Submissions Service
 *
 * Handles writing contact form submissions and newsletter subscriptions
 * to Supabase. Uses service_role client (server-side only).
 */

import { createAdminClient } from '@/lib/supabase/server';
import type { ContactInsert, SubscriberInsert } from '@/lib/supabase/types';

// ─── Contact Form ─────────────────────────────────────────────────────────────

export interface ContactSubmissionData {
  name:      string;
  email:     string;
  phone?:    string;
  subject?:  string;
  message:   string;
  product?:  string;
  ipAddress?: string;
}

export interface SubmissionResult {
  success: boolean;
  id?:     string;
  error?:  string;
}

/**
 * Save a contact form submission to Supabase.
 * Uses service_role to bypass RLS — safe because this is server-only.
 */
export async function saveContactSubmission(
  data: ContactSubmissionData
): Promise<SubmissionResult> {
  const supabase = createAdminClient();

  const insert: ContactInsert = {
    name:       data.name,
    email:      data.email,
    phone:      data.phone ?? null,
    subject:    data.subject ?? null,
    message:    data.message,
    product:    data.product ?? null,
    ip_address: data.ipAddress ?? null,
    status:     'new',
  };

  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert(insert)
    .select('id')
    .single();

  if (error) {
    console.error('[submissions.service] saveContactSubmission:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, id: result?.id };
}

/**
 * Get all contact submissions (admin only).
 */
export async function getContactSubmissions(status?: string) {
  const supabase = createAdminClient();

  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[submissions.service] getContactSubmissions:', error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Update submission status.
 */
export async function updateSubmissionStatus(
  id: string,
  status: 'new' | 'read' | 'replied' | 'archived'
): Promise<boolean> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[submissions.service] updateSubmissionStatus:', error.message);
    return false;
  }

  return true;
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

/**
 * Subscribe an email to the newsletter.
 * Handles duplicate gracefully (upsert).
 */
export async function subscribeToNewsletter(
  email: string,
  name?: string
): Promise<SubmissionResult> {
  const supabase = createAdminClient();

  const insert: SubscriberInsert = {
    email: email.toLowerCase().trim(),
    name:  name ?? null,
    status: 'active',
  };

  const { data: result, error } = await supabase
    .from('newsletter_subscribers')
    .upsert(insert, { onConflict: 'email', ignoreDuplicates: false })
    .select('id')
    .single();

  if (error) {
    console.error('[submissions.service] subscribeToNewsletter:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, id: result?.id };
}

/**
 * Unsubscribe an email from the newsletter.
 */
export async function unsubscribeFromNewsletter(email: string): Promise<boolean> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ status: 'unsubscribed' })
    .eq('email', email.toLowerCase().trim());

  if (error) {
    console.error('[submissions.service] unsubscribeFromNewsletter:', error.message);
    return false;
  }

  return true;
}

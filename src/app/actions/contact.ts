'use server'

import { db } from '@/lib/firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import nodemailer from 'nodemailer'

// Interface for contact form data
export interface ContactFormData {
  name: string
  mobile: string
  email: string
  product: string
  message: string
}

// Interface for response
export interface ContactFormResponse {
  success: boolean
  message: string
  submissionId?: string
}

// Product labels for display
const productLabels: { [key: string]: string } = {
  'Sesame Oil': '🫒 Sesame Oil',
  'Groundnut Oil': '🥜 Groundnut Oil',
  'Coconut Oil': '🥥 Coconut Oil',
  'Bulk Order': '📦 Bulk Order',
  'Export': '🌍 Export Services',
  'Private Labelling': '🏭 Private Labelling / OEM',
  'Other': '📋 Other',
}

// Create Gmail transporter for contact form emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

/**
 * Generate HTML email for contact form submission
 */
function generateContactEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📨 New Enquiry Received</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Sree Raajaganapathy Oil Mill</p>
          </div>

          <!-- Product Badge -->
          <div style="background: #fff; padding: 20px; text-align: center; border-bottom: 2px solid #e5e7eb;">
            <div style="display: inline-block; background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              ${productLabels[data.product] || data.product}
            </div>
          </div>

          <!-- Contact Details -->
          <div style="background: white; padding: 24px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600;">👤 Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: 500; width: 120px;">Name:</td>
                <td style="padding: 12px 0; color: #1f2937; font-weight: 600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Mobile:</td>
                <td style="padding: 12px 0; color: #1f2937; font-weight: 600;">
                  <a href="tel:${data.mobile}" style="color: #dc2626; text-decoration: none;">
                    ${data.mobile}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Email:</td>
                <td style="padding: 12px 0; color: #1f2937; font-weight: 600;">
                  <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">
                    ${data.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Product:</td>
                <td style="padding: 12px 0; color: #1f2937; font-weight: 600;">${productLabels[data.product] || data.product}</td>
              </tr>
            </table>
          </div>

          <!-- Message -->
          <div style="background: white; padding: 24px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600;">💬 Message</h2>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
              <p style="margin: 0; color: #1f2937; line-height: 1.8; white-space: pre-wrap;">
                ${data.message || 'No message provided'}
              </p>
            </div>
          </div>

          <!-- Metadata -->
          <div style="background: #f9fafb; padding: 24px; border-top: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 16px; font-weight: 600;">📊 Submission Details</h2>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              <strong>Submitted at:</strong> ${new Date().toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Kolkata',
              })}
            </p>
          </div>

          <!-- Action Buttons -->
          <div style="background: white; padding: 24px; text-align: center; border-bottom: 1px solid #e5e7eb;">
            <a href="mailto:${data.email}" style="display: inline-block; background: #dc2626; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-right: 10px; font-weight: 600;">
              📧 Reply via Email
            </a>
            <a href="https://wa.me/${data.mobile.replace(/\D/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
              📱 WhatsApp
            </a>
            <p style="margin: 16px 0 0 0; color: #6b7280; font-size: 12px;">
              Mobile: ${data.mobile} | Email: ${data.email}
            </p>
          </div>

          <!-- Footer -->
          <div style="background: white; padding: 24px; text-align: center; border-radius: 0 0 12px 12px; border-top: 2px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This submission has been automatically saved to your Firestore database.
            </p>
            <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 12px;">
              Sree Raajaganapathy Oil Mill - Premium Cooking Oils
            </p>
          </div>

        </div>
      </body>
    </html>
  `
}

/**
 * Submit contact form - saves to Firestore and sends email
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactFormResponse> {
  try {
    // Validate required fields
    if (!formData.name || !formData.mobile || !formData.email || !formData.product) {
      return {
        success: false,
        message: 'Please fill in all required fields (Name, Mobile, Email, and Product)',
      }
    }

    // Validate mobile format (10 digits)
    const mobileRegex = /^[0-9]{10}$/
    if (!mobileRegex.test(formData.mobile.replace(/\s/g, ''))) {
      return {
        success: false,
        message: 'Please enter a valid 10-digit mobile number',
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address',
      }
    }

    // Add to Firestore
    // Structure: rajaoil (collection) -> others (document) -> contactForm (subcollection)
    const contactFormRef = collection(db, 'rajaoil', 'others', 'contactForm')

    const docRef = await addDoc(contactFormRef, {
      // ===== USER INFORMATION =====
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim().toLowerCase(),
      product: formData.product,
      message: formData.message?.trim() || '',

      // ===== ADMIN FIELDS =====
      status: 'new', // Options: 'new', 'contacted', 'converted', 'archived'
      contacted: false,
      adminNotes: '', // Internal notes for admin team

      // ===== TIMESTAMPS =====
      createdAt: serverTimestamp(),
      contactedAt: null, // Will be set when admin contacts customer
      updatedAt: serverTimestamp(),
    })

    console.log('✅ Contact form saved to Firestore:', docRef.id)

    // Send email notification
    try {
      const htmlContent = generateContactEmailHTML(formData)

      const mailOptions = {
        from: `"Raja Oil Enquiry" <${process.env.GMAIL_USER}>`,
        to: 'karthisclan@gmail.com',
        replyTo: formData.email,
        subject: `📨 New Enquiry: ${formData.product} - ${formData.name}`,
        html: htmlContent,
      }

      await transporter.sendMail(mailOptions)
      console.log('✅ Contact notification email sent')
    } catch (emailError) {
      console.error('⚠️ Email sending failed:', emailError)
      // Don't fail the submission if email fails, data is already saved
    }

    return {
      success: true,
      message: 'Thank you for your enquiry! We will contact you soon.',
      submissionId: docRef.id,
    }
  } catch (error) {
    console.error('❌ Contact form submission error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    }
  }
}

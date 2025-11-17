'use server'

import { db } from '@/lib/firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import nodemailer from 'nodemailer'

// Interface for contact form data
export interface ContactFormData {
  name: string
  phone: string
  subject: string
  message: string
}

// Interface for response
export interface ContactFormResponse {
  success: boolean
  message: string
  submissionId?: string
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
  const subjectLabels: { [key: string]: string } = {
    general: '📋 General Inquiry',
    product: '🫒 Product Information',
    order: '📦 Order & Delivery',
    wholesale: '🏭 Wholesale/Bulk Orders',
    feedback: '💬 Feedback & Suggestions',
    support: '🆘 Customer Support',
  }

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
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📨 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">sreeraajaganapathy Oil Mill</p>
          </div>

          <!-- Subject Badge -->
          <div style="background: #fff; padding: 20px; text-align: center; border-bottom: 2px solid #e5e7eb;">
            <div style="display: inline-block; background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              ${subjectLabels[data.subject] || data.subject}
            </div>
          </div>

          <!-- Contact Details -->
          <div style="background: white; padding: 24px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600;">👤 Sender Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: 500; width: 120px;">Name:</td>
                <td style="padding: 12px 0; color: #1f2937; font-weight: 600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Phone:</td>
                <td style="padding: 12px 0; color: #1f2937; font-weight: 600;">
                  <a href="tel:${data.phone}" style="color: #dc2626; text-decoration: none;">
                    ${data.phone || 'Not provided'}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Subject:</td>
                <td style="padding: 12px 0; color: #1f2937; font-weight: 600;">${subjectLabels[data.subject] || data.subject}</td>
              </tr>
            </table>
          </div>

          <!-- Message -->
          <div style="background: white; padding: 24px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600;">💬 Message</h2>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
              <p style="margin: 0; color: #1f2937; line-height: 1.8; white-space: pre-wrap;">
                ${data.message}
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
            <a href="mailto:${data.phone ? data.phone : 'N/A'}" style="display: inline-block; background: #dc2626; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-right: 10px; font-weight: 600;">
              Reply
            </a>
            <p style="margin: 16px 0 0 0; color: #6b7280; font-size: 12px;">
              You can also contact them at: ${data.phone || 'N/A'}
            </p>
          </div>

          <!-- Footer -->
          <div style="background: white; padding: 24px; text-align: center; border-radius: 0 0 12px 12px; border-top: 2px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This submission has been automatically saved to your Firestore database.
            </p>
            <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 12px;">
              sreeraajaganapathy Oil Mill - Premium Cooking Oils
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
    // Validate form data
    if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields (Name, Phone, Subject, and Message)',
      }
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[0-9\s\-\+()]{10,}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      return {
        success: false,
        message: 'Please enter a valid phone number',
      }
    }

    // Add to Firestore
    // Structure: rajaoil (collection) -> others (document) -> contactForm (subcollection)
    const contactFormRef = collection(db, 'rajaoil', 'others', 'contactForm')

    const docRef = await addDoc(contactFormRef, {
      // ===== USER INFORMATION =====
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject,
      message: formData.message.trim(),

      // ===== ADMIN FIELDS =====
      status: 'new', // Options: 'new', 'replied', 'archived'
      replied: false,
      replyMessage: '', // Admin will fill this when replying to the user
      adminNotes: '', // Internal notes for admin team

      // ===== TIMESTAMPS =====
      createdAt: serverTimestamp(),
      repliedAt: null, // Will be set when admin replies
    })

    console.log('✅ Contact form saved to Firestore:', docRef.id)

    // Send email notification
    try {
      const htmlContent = generateContactEmailHTML(formData)

      const mailOptions = {
        from: `"Raja Oil Contact" <${process.env.GMAIL_USER}>`,
        to: 'karthisclan@gmail.com',
        replyTo: formData.phone || formData.name,
        subject: `📨 New Contact Form: ${formData.subject} - ${formData.name}`,
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
      message: 'Thank you for your message! We will get back to you soon.',
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

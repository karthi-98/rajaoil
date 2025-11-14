import { NextRequest, NextResponse } from 'next/server'
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { sendOrderNotificationEmail } from '@/lib/email'
import type { CartItem } from '@/lib/types'

interface OrderRequest {
  items: CartItem[]
  total: number
  subtotal?: number
  shippingCost?: number
  customerName: string
  customerPhone: string
  doorNo: string
  address: string
  district: string
  state: string
  pincode: string
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderRequest = await request.json()

    // Validate required fields
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      )
    }

    if (!orderData.customerName || !orderData.customerPhone) {
      return NextResponse.json(
        { success: false, error: 'Customer name and phone are required' },
        { status: 400 }
      )
    }

    if (!orderData.doorNo || !orderData.address || !orderData.district || !orderData.state || !orderData.pincode) {
      return NextResponse.json(
        { success: false, error: 'Complete delivery address is required' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const timestamp = Date.now()
    const orderId = `ORD-${timestamp}`

    // Prepare order document
    const orderDocument = {
      orderId,
      items: orderData.items,
      subtotal: orderData.subtotal || orderData.total,
      shippingCost: orderData.shippingCost || 0,
      total: orderData.total,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      deliveryAddress: {
        doorNo: orderData.doorNo,
        address: orderData.address,
        district: orderData.district,
        state: orderData.state,
        pincode: orderData.pincode,
      },
      notes: orderData.notes || '',
      status: 'pending', // pending, processing, completed, cancelled
      paymentStatus: 'pending', // pending, paid, failed
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    // Save to Firebase: rajaoil (collection) -> others (document) -> orders (subcollection)
    const rajaoilRef = doc(db, 'rajaoil', 'others')
    const ordersCollectionRef = collection(rajaoilRef, 'orders')

    const docRef = await addDoc(ordersCollectionRef, orderDocument)
    console.log('✅ Order saved to Firebase:', docRef.id)

    // Send email notification
    const emailData = {
      orderId,
      items: orderData.items,
      total: orderData.total,
      subtotal: orderData.subtotal,
      shippingCost: orderData.shippingCost,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      doorNo: orderData.doorNo,
      address: orderData.address,
      district: orderData.district,
      state: orderData.state,
      pincode: orderData.pincode,
      notes: orderData.notes,
      createdAt: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
    }

    const emailSent = await sendOrderNotificationEmail(emailData)

    return NextResponse.json({
      success: true,
      orderId,
      firebaseId: docRef.id,
      emailSent,
      message: 'Order placed successfully!'
    })
  } catch (error) {
    console.error('❌ Order creation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process order. Please try again.'
      },
      { status: 500 }
    )
  }
}

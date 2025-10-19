import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useOrders } from '../components/OrderContext';
import { useToast } from '../components/ToastContext';


export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { showToast } = useToast();
  

  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });



  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [paymentProof, setPaymentProof] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const shippingFee = 2000; // 2,000 flat shipping
  const total = getCartTotal() + shippingFee;

  // Bank details for payment
  const bankDetails = {
    accountNumber: '1229251026',
    bankName: 'Zenith Bank',
    accountName: 'Moonlight Clothings'
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        showToast('Please upload a valid image file (JPG, PNG, GIF, or WebP)', 'error');
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        showToast('File size must be less than 5MB', 'error');
        return;
      }
      
      setPaymentProof(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    // Check required fields
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state) {
      showToast('Please fill in all required fields', 'error');
      return false;
    }
    
    // Validate name length
    if (formData.name.trim().length < 3) {
      showToast('Please enter a valid name', 'error');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    
    // Validate phone number (more lenient - just check if it has 10-11 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      showToast('Please enter a valid phone number (10-11 digits)', 'error');
      return false;
    }
    
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const handleCompleteOrder = () => {
    if (!paymentProof) {
      showToast('Please upload payment proof to complete your order', 'error');
      return;
    }

    if (isProcessing) return; // Prevent double submission
    
    setIsProcessing(true);

    try {
      // Create order
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: typeof item.price === 'number' ? item.price : 0,
          quantity: item.quantity || 1,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          image: item.image
        })),
        subtotal: getCartTotal(),
        shipping: shippingFee,
        total: total,
        customerInfo: formData,
        paymentMethod: 'Bank Transfer - ' + bankDetails.bankName,
        paymentProof: proofPreview // Store the preview in order
      };

      const newOrder = createOrder(orderData);
      setCreatedOrderNumber(newOrder.orderNumber);
      clearCart();
      setStep(3);
      
      showToast(`Order ${newOrder.orderNumber} placed successfully!`, 'success');
      
      // Redirect to order detail after 3 seconds
      setTimeout(() => {
        navigate(`/orders/${newOrder.id}`);
      }, 3000);
    } catch (error) {
      showToast('Failed to create order. Please try again.', 'error');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>
          Your cart is empty
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Add some products to your cart before checking out.
        </p>
        <button
          onClick={() => navigate('/shop')}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#4169E1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2.5rem',
        color: '#222'
      }}>
        Checkout
      </h1>

      {/* Progress Steps */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: step >= 1 ? '#4169E1' : '#e0e0e0',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {step > 1 ? '✓' : '1'}
          </div>
          <span style={{ fontWeight: step === 1 ? 'bold' : 'normal', color: '#666' }}>
            Shipping Info
          </span>
        </div>

        <div style={{ width: '50px', height: '2px', backgroundColor: step >= 2 ? '#4169E1' : '#e0e0e0' }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: step >= 2 ? '#4169E1' : '#e0e0e0',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {step > 2 ? '✓' : '2'}
          </div>
          <span style={{ fontWeight: step === 2 ? 'bold' : 'normal', color: '#666' }}>
            Payment
          </span>
        </div>

        <div style={{ width: '50px', height: '2px', backgroundColor: step >= 3 ? '#4169E1' : '#e0e0e0' }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: step >= 3 ? '#32CD32' : '#e0e0e0',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {step === 3 ? '✓' : '3'}
          </div>
          <span style={{ fontWeight: step === 3 ? 'bold' : 'normal', color: '#666' }}>
            Complete
          </span>
        </div>
      </div>

      {/* Step 1: Shipping Information */}
      {step === 1 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr',
          gap: '2rem'
        }}>
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h2 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.5rem', color: '#222' }}>
              📦 Shipping Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    placeholder="08012345678"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontFamily: 'Arial, sans-serif'
                  }}
                  placeholder="Street address, apartment, suite, etc."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    placeholder="Lagos"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      color: '#333'
                    }}
                  >
                    <option value="" style={{ color: '#999' }}>Select State</option>
                    <option value="Abia">Abia</option>
                    <option value="Adamawa">Adamawa</option>
                    <option value="Akwa Ibom">Akwa Ibom</option>
                    <option value="Anambra">Anambra</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Ebonyi">Ebonyi</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="FCT">Federal Capital Territory</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nasarawa">Nasarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Sokoto">Sokoto</option>
                    <option value="Taraba">Taraba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamfara</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinueToPayment}
              style={{
                width: '100%',
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#4169E1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3a5bc7'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4169E1'}
            >
              Continue to Payment →
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #FFD700',
            borderRadius: '12px',
            padding: '2rem',
            height: 'fit-content',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.3rem', color: '#222' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '1rem' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      Qty: {item.quantity || 1}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#FFD700', fontWeight: 'bold' }}>
                      ₦{(item.price * (item.quantity || 1)).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#666' }}>
                <span>Subtotal:</span>
                <span>₦{getCartTotal().toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#666' }}>
                <span>Delivery Fee:</span>
                <span>₦{shippingFee.toLocaleString()}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '2px solid #FFD700',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#222'
              }}>
                <span>Total:</span>
                <span style={{ color: '#FFD700' }}>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr',
          gap: '2rem'
        }}>
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h2 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.5rem', color: '#222' }}>
              💳 Payment Method
            </h2>

            {/* Payment Method Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                onClick={() => setPaymentMethod('bank-transfer')}
                style={{
                  padding: '1.5rem',
                  border: paymentMethod === 'bank-transfer' ? '3px solid #4169E1' : '2px solid #e0e0e0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: paymentMethod === 'bank-transfer' ? '#f0f7ff' : 'white',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #4169E1',
                    backgroundColor: paymentMethod === 'bank-transfer' ? '#4169E1' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {paymentMethod === 'bank-transfer' && (
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white' }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                      🏦 Bank Transfer
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      Pay directly to our bank account (All Nigerian Banks supported)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div style={{
              backgroundColor: '#f8f9fa',
              border: '2px solid #4169E1',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.2rem', color: '#222' }}>
                📋 Bank Account Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                    Bank Name:
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {bankDetails.bankName}
                    </span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.bankName)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#4169E1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                    Account Number:
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.3rem', letterSpacing: '2px' }}>
                      {bankDetails.accountNumber}
                    </span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountNumber)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#4169E1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                    Account Name:
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {bankDetails.accountName}
                    </span>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountName)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#4169E1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                    Amount to Pay:
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#FFD700',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    color: '#222'
                  }}>
                    ₦{total.toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#fff3cd',
                borderRadius: '6px',
                border: '1px solid #ffc107',
                fontSize: '0.9rem',
                color: '#856404'
              }}>
                ⚠️ <strong>Important:</strong> After making payment, please upload your payment receipt/proof below to complete your order.
              </div>
            </div>

            {/* Upload Payment Proof */}
            <div style={{
              backgroundColor: '#f8f9fa',
              border: '2px dashed #4169E1',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: 0, marginBottom: '1rem', fontSize: '1.2rem', color: '#222' }}>
                📸 Upload Payment Proof
              </h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Upload a screenshot or photo of your payment confirmation
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="payment-proof-upload"
              />

              {proofPreview ? (
                <div>
                  <img
                    src={proofPreview}
                    alt="Payment Proof"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      border: '2px solid #4169E1'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <label
                      htmlFor="payment-proof-upload"
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#666',
                        color: 'white',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                      }}
                    >
                      Change Image
                    </label>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="payment-proof-upload"
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    backgroundColor: '#4169E1',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  📤 Choose File
                </label>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                 Back
              </button>

              <button
                onClick={handleCompleteOrder}
                style={{
                  flex: 2,
                  padding: '1rem',
                  backgroundColor: !paymentProof || isProcessing ? '#ccc' : '#32CD32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: paymentProof && !isProcessing ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  opacity: isProcessing ? 0.7 : 1
                }}
                disabled={!paymentProof || isProcessing}
              >
                {isProcessing ? ' Processing...' : 'Complete Order '}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #FFD700',
            borderRadius: '12px',
            padding: '2rem',
            height: 'fit-content',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.3rem', color: '#222' }}>
              Order Summary
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: 0, marginBottom: '1rem', fontSize: '1rem', color: '#666' }}>
                Shipping To:
              </h4>
              <div style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#333' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{formData.name}</div>
                <div>{formData.address}</div>
                <div>{formData.city}, {formData.state}</div>
                <div style={{ marginTop: '0.5rem' }}>📞 {formData.phone}</div>
              </div>
            </div>

            <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#666' }}>
                <span>Items ({cart.length}):</span>
                <span>₦{getCartTotal().toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#666' }}>
                <span>Delivery Fee:</span>
                <span>₦{shippingFee.toLocaleString()}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '2px solid #FFD700',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#222'
              }}>
                <span>Total:</span>
                <span style={{ color: '#FFD700' }}>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          backgroundColor: '#fff',
          border: '2px solid #32CD32',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}></div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#32CD32' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Thank you for your order! We've received your payment proof and will verify it shortly.
            You'll receive a confirmation email once your payment is confirmed.
          </p>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
              Your Order Number:
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4169E1' }}>
              {createdOrderNumber}
            </div>
          </div>

          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem',
            fontSize: '0.95rem',
            color: '#856404',
            textAlign: 'left'
          }}>
            <strong>📧 Next Steps:</strong>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>We'll verify your payment within 24 hours</li>
              <li>You'll receive email confirmation once verified</li>
              <li>Track your order status in the Orders page</li>
            </ul>
          </div>

          <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Redirecting to your order details in 3 seconds...
          </p>
        </div>
      )}
    </div>
  );
}



import React, { useState } from "react";
import { CreditCard, Check, X, Zap, Crown, Rocket } from "lucide-react";

function PaymentIntegrationPage() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: '',
    });
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

    const plans = [
        {
            id: 'basic',
            name: 'Basic Plan',
            price: '₹499',
            duration: '/month',
            icon: Zap,
            color: 'from-blue-400 to-blue-600',
            features: [
                'Access to 10 courses',
                'Basic support',
                'Course certificates',
                'Mobile app access',
                'Community forum access'
            ]
        },
        {
            id: 'premium',
            name: 'Premium Plan',
            price: '₹999',
            duration: '/month',
            icon: Crown,
            color: 'from-purple-400 to-purple-600',
            popular: true,
            features: [
                'Unlimited course access',
                'Priority support 24/7',
                'All certificates',
                'Download videos offline',
                'Exclusive webinars',
                'Interview preparation'
            ]
        },
        {
            id: 'enterprise',
            name: 'Enterprise Plan',
            price: '₹1,999',
            duration: '/month',
            icon: Rocket,
            color: 'from-orange-400 to-red-600',
            features: [
                'Everything in Premium',
                'Personal mentor support',
                '1-on-1 doubt sessions',
                'Job assistance',
                'Custom learning path',
                'Placement guarantee'
            ]
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePayment = () => {
        console.log('Payment Data:', formData);
        console.log('Payment Method:', paymentMethod);
        console.log('Selected Plan:', selectedPlan);

        setShowPaymentSuccess(true);
        setFormData({
            firstName: '',
            lastName: '',
            cardNumber: '',
            cvv: '',
            expiryMonth: '',
            expiryYear: '',
        });
        setPaymentMethod(null);
    };

    const handleClosePopup = () => {
        setSelectedPlan(null);
        setPaymentMethod(null);
        setShowPaymentSuccess(false);
    };

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
    };

    return (
        <div className="flex flex-col h-screen overflow-y-auto p-8">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                    Payment
                </h2>
            </div>

            {/* Main Payment Area - Plan Selection */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-6xl">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Plan, Bhidu!</h3>
                        <p className="text-gray-600">Select the perfect plan for your learning journey</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => {
                            const IconComponent = plan.icon;
                            return (
                                <div
                                    key={plan.id}
                                    className={`relative bg-white/50 backdrop-blur-sm border ${
                                        plan.popular ? 'border-purple-400 shadow-xl scale-105' : 'border-white/30'
                                    } rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
                                    onClick={() => handlePlanSelect(plan.id)}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                            MOST POPULAR
                                        </div>
                                    )}
                                    
                                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                                    
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                                        <span className="text-gray-600">{plan.duration}</span>
                                    </div>
                                    
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <button
                                        onClick={() => handlePlanSelect(plan.id)}
                                        className={`w-full bg-gradient-to-r ${plan.color} text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg`}
                                    >
                                        Select Plan
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Payment Method Popup */}
            {selectedPlan && !showPaymentSuccess && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleClosePopup}
                >
                    <div 
                        className="w-full max-w-md bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 space-y-4 shadow-2xl transition-all duration-300 animate-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={handleClosePopup}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition p-2 rounded-full hover:bg-white/30"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Selected Plan Summary */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100 mb-4">
                            <h4 className="text-sm text-gray-600 mb-1">Selected Plan</h4>
                            <h3 className="text-xl font-bold text-gray-800">{plans.find(p => p.id === selectedPlan)?.name}</h3>
                            <p className="text-2xl font-bold text-indigo-600 mt-1">
                                {plans.find(p => p.id === selectedPlan)?.price}
                                <span className="text-sm text-gray-600">{plans.find(p => p.id === selectedPlan)?.duration}</span>
                            </p>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900">Select Payment Method</h3>

                        {/* Payment Method Selection */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('creditCard')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors duration-200
                                    ${paymentMethod === 'creditCard'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-white/30 border border-white/30'
                                    }`}
                            >
                                <CreditCard className="w-5 h-5" />
                                Credit Card
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod('gpay')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors duration-200
                                    ${paymentMethod === 'gpay'
                                        ? 'bg-green-500 text-white'
                                        : 'text-gray-700 hover:bg-white/30 border border-white/30'
                                    }`}
                            >
                                GPay
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod('paypal')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors duration-200
                                    ${paymentMethod === 'paypal'
                                        ? 'bg-yellow-500 text-white'
                                        : 'text-gray-700 hover:bg-white/30 border border-white/30'
                                    }`}
                            >
                                PayPal
                            </button>
                        </div>

                        {/* Credit Card Form */}
                        {paymentMethod === 'creditCard' && (
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 space-y-4 border border-white/30 shadow-inner">
                                <h3 className="text-lg font-medium text-gray-900">Credit Card Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700">Expiry Month</label>
                                        <input
                                            type="text"
                                            id="expiryMonth"
                                            name="expiryMonth"
                                            value={formData.expiryMonth}
                                            onChange={handleInputChange}
                                            placeholder="MM"
                                            className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700">Expiry Year</label>
                                        <input
                                            type="text"
                                            id="expiryYear"
                                            name="expiryYear"
                                            value={formData.expiryYear}
                                            onChange={handleInputChange}
                                            placeholder="YYYY"
                                            className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            className="mt-1 block w-full p-2 border border-white/30 rounded-lg bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* GPay / PayPal Info */}
                        {(paymentMethod === 'gpay' || paymentMethod === 'paypal') && (
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 space-y-4 border border-white/30 shadow-inner">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {paymentMethod === 'gpay' ? 'GPay' : 'PayPal'} Details
                                </h3>
                                <p className="text-gray-700">
                                    Click the button below to proceed with {paymentMethod === 'gpay' ? 'GPay' : 'PayPal'} payment.
                                </p>
                            </div>
                        )}

                        {/* Confirm Payment Button */}
                        {paymentMethod && (
                            <button
                                onClick={handlePayment}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl mt-4 transition-colors"
                            >
                                Confirm Payment - {plans.find(p => p.id === selectedPlan)?.price}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Payment Success Popup */}
            {showPaymentSuccess && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleClosePopup}
                >
                    <div 
                        className="text-center p-8 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={handleClosePopup}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition p-2 rounded-full hover:bg-white/30"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
                        <p className="text-gray-700 mb-2">Your transaction has been completed.</p>
                        <p className="text-sm text-gray-600 mb-6">Welcome to {plans.find(p => p.id === selectedPlan)?.name}, bhidu! 🎉</p>
                        <button
                            onClick={handleClosePopup}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors"
                        >
                            Start Learning
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentIntegrationPage;
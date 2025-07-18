/**
 * Utility functions for Philippine Peso currency formatting
 */

export const formatPHP = (amount: number): string => {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatPHPShort = (amount: number): string => {
  if (amount >= 1000000) {
    return `₱${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `₱${(amount / 1000).toFixed(1)}K`;
  }
  return `₱${amount.toFixed(0)}`;
};

export const parsePHP = (phpString: string): number => {
  return parseFloat(phpString.replace(/[₱,]/g, '')) || 0;
};

export const calculateVAT = (amount: number, vatRate: number = 0.12): number => {
  return amount * vatRate;
};

export const calculateServiceCharge = (amount: number, serviceRate: number = 0.10): number => {
  return amount * serviceRate;
};

export const calculateTotal = (
  subtotal: number,
  vatRate: number = 0.12,
  serviceRate: number = 0.10
): {
  subtotal: number;
  vat: number;
  serviceCharge: number;
  total: number;
} => {
  const vat = calculateVAT(subtotal, vatRate);
  const serviceCharge = calculateServiceCharge(subtotal, serviceRate);
  const total = subtotal + vat + serviceCharge;

  return {
    subtotal,
    vat,
    serviceCharge,
    total,
  };
};
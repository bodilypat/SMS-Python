/* *************************************************** */
/* File: src/features/sales/components/SaleSummary.jsx */
/* *************************************************** */
import { useMemo } from "react";

const SaleSummary = ({
    subtotal = 0,
    discount = 0,
    tax = 0,
    shipping = 0,
    total = null,
    taxRate = null,
    currency = "USD"
}) => {
    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
            }),
        [currency]
    );

    const safeSubtotal = Math.max(Number(subtotal) || 0, 0);
    const safeDiscount = Math.max(Number(discount) || 0, 0);
    const safeTax = Math.max(Number(tax) || 0, 0);
    const safeShipping = Math.max(Number(shipping) || 0, 0);

    const calculatedTotal = Math.max(
        safeSubtotal -
        safeDiscount + 
        safeTax +
        safeShipping,
        0
    );

    const grandTotal = 
        total === null || total === undefined 
            ? calculatedTotal 
            : Math.max(Number(total) || 0, 0);

    const effectiveTaxRate = 
        taxRate !== null && taxRate !== undefined
            ? Number(taxRate) || 0 
            : null; 
        return (
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Sale Summary 
                    </h2>

                    <p className="text-lg text-gray-500">
                        Review the totals before completing the sale.
                    </p>
                </div>

                <div className="space-y-3">

                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                            Subtotal
                        </span>

                        <span className="font-medium text-gray-900">
                            {formatter.format(safeSubtotal)}
                        </span>
                    </div>

                    {/* Discount */}
                    {sefeDiscount > 0 && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                                Discount
                            </span>

                            <span className="font-medium text-red-600">
                                -{formatter.format(safeDiscount)}
                            </span>
                        </div>
                    )}

                    {/* Tax */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                            Tax 
                            {effectiveTaxRate > 0 && (
                                <span className="ml-l text-xs text-gray-400">
                                    ({effectiveTaxRate}%)
                                </span>
                            )}
                        </span>

                        <span className="font-medium text-gray-900">
                            {formatter.format(safeTax)}
                        </span>
                    </div>

                    {/* Shipping */}
                    {safeShipping > 0 && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                                Shipping 
                            </span>
                        
                            <span className="font-medium text-gray-900">
                                {formatter.format(safeShipping)}
                            </span>
                        </div>
                    )}

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-base font-semibold text-gray-900">
                                Grand Total 
                            </span>

                            <span className="text-xl font-bold text-gray-900">
                                {formatter.format(grandTotal)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default SaleSummary;



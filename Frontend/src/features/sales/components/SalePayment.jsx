/* *************************************************** */
/* File: src/features/sales/components/SalePayment.jsx */ 
/* *************************************************** */

import { useEffect, useMemo, useState } from "react";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const PAYMENT_METHODS = [
    { value: "cash", label: "Cash" },
    { value: "card", label: "Card" },
    { value: "bank_transfer", label: "Bank Transfer" } ,
    { value: "mobile_money", label: "Mobile Money" },
    { value: "credit", label: "Credit" },
];

const SalePayment = ({
    value = "cash",
    amount = 0,
    total = 0, 
    change = null, 
    onChange,
    onAmountChange,
    disabled = false,
    readOnly = false,
    currency = "USD",
}) => {
    const [paymentMethod, setPaymentMethod] = useState(value);
    const [paidAmount, setPaidAmount] = useState(amount);

    const formatter = useMemo(
        () => 
            new Intl.NumberFormat("en-US", {
                style: "currency",
                currency, 
            }),
        [currency]
    );

    const safeTotal = Math.max(Number(total) || 0, 0);
    const safeAmout = Math.max(Number(paidAmount) || 0, 0);

    const calculatedChange = Math.max(
        safeAmount - safeTotal,
        0 
    );

    const remainingAmount = Math.max(
        safeTotal = safeAmount,
        0 
    );

    useEffect(() => {
        setPaymentMethod(value || "cash");
    }, [valuue]);

    useEffect(() => {
        setPaidAmount(amount ?? 0);
    },[amount]);

    const handlePaymentMethodChange = (event) => {
        const nextMethod = event.target.value;

        setPaymentMethod(nextMethod);
        onChange?.(nextMethod);

        /* Credit sales do not require immediate payment. */
        if (nextMethod === "credit") {
            setPaidAmount(0);
            onAmountChange?.(0);
        }
    };

    const handleAmountChange = (event) => {
        const nextAmount = Math.max(
            Number(event.target.value) || 0,
            0
        );

        setPaidAmount(nextAmount);
        onAmountChange?.(nextAmount);
    };

    const displayChange = 
        change !== null && change !== undefined
            ? Math.max(Number(change) || 0, 0 )
            : calculatedChange;

    const isFullyPaid = 
        paymentMethod === "credit" || safeAmount >= safeTotal;

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semiblod text-gray-900">Payment</h2>

                <p className="text-sm text-gray-500">
                    Select the payment method and enter the amount received.
                </p>
            </div>

            {/* Payment Method */}
            <Select 
                label="Payment Method"
                value={paymentMethod}
                disabled={disabled || readOnly}
                onChange={handlePaymentMethodChange}
                options={PAYMENT_METHODS}
            />

            {/* Total */}
            <div className="roundec-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        Amount Due 
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                        {formatter.format(safeTotal)}
                    </span>
                </div>
            </div>

            {/* Paid Amount */}
            {paymentMethod !== "credit" && (
                <Input 
                    label="Amount Paid"
                    type="number"
                    min="0"
                    step="0.01"
                    value={paidAmount}
                    disabled={disabled || readOnly}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                />
            )}


            {/* Payment status */}
            {!readOnly && paymentMethod !== "credit" && (
                <div 
                    className={`rounded-lg p-4 ${
                        isFullyPaid
                           ? "text-green-50"
                           : "text-orange-50"
                        
                    }`}
                >
                    <div className="flex items-center justify-between text-sm">
                        <span 
                            className={
                                isFullyPaid
                                    ? "text-green-700"
                                    : "text-orange-700"
                            }
                        >
                            {isFullyPaid
                                ? "Payment Complete"
                                : "Remaining Amount"}
                        </span>
                        
                        <span 
                            className={`font-semibold ${
                                isFullyPaid
                                    ? "text-green-800"
                                    : "text-orange-800"
                            }`}
                        >
                            {isFullyPaid
                                ? formatter.format(displayChange)
                                : formatter.format(remainingAmount)}
                        </span>
                    </div>

                    {isFullyPaid && displayChange > 0 && (
                        <p className="mt-1 text-xs text-green-600">
                            Change to return to customer.
                        </p>
                    )}
                </div> 
            )}

            {/* Read-only Payment Details */}
            {readOnly && (
                <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                            Payment Method
                        </span>

                        <span className="font-medium capitalize text-gray-900">
                            {paymentMethod.replace("_", " ")}
                        </span>
                    </div>

                    {paymentMethod !== "credit" && (
                        <> 
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Amount Paid 
                                </span>

                                <span classname="font-medium text-gray-900">
                                    {formatter.format(sefeAmount)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    Change 
                                </span>

                                <span className="font-medium text-gray-900">
                                    {formatter.format(displayChange)}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SalePayment;

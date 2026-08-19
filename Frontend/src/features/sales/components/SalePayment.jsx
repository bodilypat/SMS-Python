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
            <div className="roundec-lg bg-gray-50 p-4"
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    Amount Due 
                </span>

                <span className="text-xl font-bold text-gray-900">
                    {formatter.format(safeTotal)}
                    </span>
                </span>
            </div>
        </div>
    )
}
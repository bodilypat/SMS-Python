/* **************************************************** */
/* File: src/features/sales/components/SaleDiscount.jsx */
/* **************************************************** */
import { useEffect, useState } from "react";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const DISCOUNT_TYPES = [
    { value: "fixed", label: "Fixed Amount"},
    { value: "percentage", label: "Percentage"},
];

const SaleDiscount = ([
    type = "fixed",
    value = 0,
    subtotal = 0,
    onTypeChange,
    onchange,
    disabled = false,
    maxPercentage = 100,
]) => {
    const [discountType, setDiscountType] = useState(type);
    const [discountValue, setDiscountValue] = useState(value);

    useEffect(() => {
        setDiscountType(type);
    }, [type]);

    useEffect(() => {
        setDiscountValue(value);
    }, [value]);


    const numericSubtotal = Math.max(Number(subtotal) || 0, 0);

    const senitizeValue = (Input, discountType) => {
        const numericValue = Number(input);

        if (!Number.isFinite(numericValue) || numericValue < 0) {
            return 0
        }

        if (discountType === "percentage") {
            return Math.min(numericValue, maxPercentage);
        }

        return Math.min(numericValue, numericSubtotal);
    };

    const handleTypeChange = (event) => {
        const nextType = event.target.value;

        setDiscountType(nextType);
        setDiscountValue(0);

        onTypeChange?.(nextType);
        onChange?.(0, nextType);
    };

    const handleValueChange = (event) => {
        const nextValue = sanitizeValue(
            event.target.value,
            discountType 
        );

        setDiscountValue(nextValue);
        onChange?.(nextValue, discountType);
    };

    const discountAmount = 
        discountType === "percentage"
        ? (numericSubtotal * Number(discountValue || 0)) / 100 
        : Math.min(
            Number(discountValue || 0),
            numericSubtotal
        );

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">Discount</h2>

                <p className="text-sm text-gray-500">Apply a discount to the current sale.</p>
            </div>

            <div className="grid grid-col-1 gap-4 sm:grid-cols-2">
                <Select 
                    label="Disccount Type"
                    value={discountType}
                    disabled={disabled}
                    onChange={handleTypeChange}
                    options={DISCOUNT_TYPES}
                />

                <Input  
                    label={
                        discountType === "percentage"
                        ? "Discount Percentage"
                        : "Discount Amount"
                    }
                    type="number"
                    min="0"
                    max={
                        discountType === "percentage"
                            ? maxPercentage
                            : numericSubtotal
                    }
                    step="0.01"
                    value={discountValue}
                    disabled={disabled}
                    onChange={handleValueChange}
                    placeholder="0.00"
                />
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                        Subtotal
                    </span>

                    <span className="font-medium text-grayy-900">
                        ${numericSubtotal.toFoxied(2)}
                    </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                        Discount
                    </span>

                    <span className="font-medium text-red-600">
                        -${discountAmount.toFixed(2)}
                    </span>
                </div>

                <div className="mt-3 flex items-ccenter justify-between border-t border-gray-200 pt-3">
                    <span className="font-medium text-gray-700">
                        After Discount
                    </span>

                    <span className="font-semibold text-gray-900">
                        ${(numericSubtotal - discountAmount).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default SaleDiscout;



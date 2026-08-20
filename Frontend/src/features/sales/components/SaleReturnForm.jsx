/* ******************************************************* */
/* File : src/features/sales/components/SaleReturnForm.jsx */ 
/* ******************************************************* */
import { useEffect, useMemo, useState } from "react";

import Button from"../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const RETURN_REASONS = [
    { value: "defective", label: "Defective Product" },
    { value: "wrong_product", label: "Wrong Product" },
    { value: "customer_changed_mind", label: "customer changed Mid"},
    { value: "damageed", label: "Damged Product" },
    { value: "incorrect_order", label: "Incorrect Order" },
    { value: "other", label: "Other"},
];

const REFUND_METHODS = [
    { value: "original", label: "Original Payment Method" },
    { value: "cash", label: "Cash" },
    { value: "card", label: "Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "mobile_money", label: "Mobile Money" },
    { value: "credit", label: "Store Credit" },
];

const SaleReturnForm = ({
    sale,
    items = [],
    initialValues = {},
    onSubmit,
    onCancel,
    loading = false,
    disabled = false,
    currency = "USD",
}) => {
    const [returnItems, setReturnItems] = useState(
        initialValues.items || []
    );

    const [reason, setReason] = useState(
        initialValues.reason || ""
    );

    const [refundMethod, setRefundMethod] = useState(
        initialValues.refundMethod || "original"
    );

    const [notes, setNotes] = useState(
        initialValues.notes || ""
    );

    const [error, setError] = useState("");

    const formatter = useMemo(
        () => 
            new Intl.NumberFormat("en-US", {
                style: "currency", 
                currency, 
            }),
        [currency]
    );

    const sourceItems = useMemo(() => {
        if (items.length) {
            return items;
        }

        return sale?.items || sale?.saleItems || [];
    }, [items, sale]);

    useEffect(() => {
        if (!initialValues.items) {
            setReturnItems([]);
            return;
        }

        setReturnItems(initialValues.items);
    }, [initialValues.items]);

    const getItemId = (item) => 
        item.id ?? 
        item.saleItemId ??
        item.productId;

    const getItemName = (item) =>
        item.productName || 
        item.product?.name || 
        item.name || 
        "Unnamed Product";

    const getItemSku = (item) => 
        item.sku ||
        item.product?.sku || 
        "-";

    const getOriginalQuantity = (item) =>
        Number(
            item.quantity ??
                item.soldQuantity ??
            0
        ) || 0;

    const getAlreadyReturnedQuantity = (item) =>
        Number(
            item.returnedQuantity ??
            item.quantityReturned ??
            0 
        ) || 0;
    
    const getUnitPrice = (item) =>
        Number(
            item.unitPrice ??
            item.price ??
            item.sellingPrice ??
            0
        ) || 0;

    const getItemReturnQuantity = (itemId) => {
        const returnItem = returnItems.find(
            (item) =>
                String(
                    item.saleItemId ??
                        item.id 
                ) === String(itemId)
        );

        return Number(returnItem?.quantity) || 0;
    };

    const updateReturnQuantity = (
        item,
        quantity 
    ) => {
        const itemId = getItemId(item);
        const maxQuantity = 
            getReturnableQuantity(item);

        const nextQuantity = Math.max(
            0,
            Math.min(
                Number(quantity) || 0,
                maxQuantity
            )
        );

        setReturnItems((currentItems) => {
            const exists = currentItems.some(
                (returnItem) =>
                    String(
                        returnItem.saleItemId ??
                            returnItem.id 
                    ) === String(itemId)
            );

            if (nextQuantity === 0) {
                return currentItems.filter(
                    (returnItem) =>
                        String(
                            returnItem.saleItemId ??
                                returnItem.id 
                        ) !== String(itemId)
                );
            }

            if (!exists) {
                return [
                    ...currentItems,
                    {
                        saleItemId: itemId,
                        productId:
                            item.productId ?? 
                            item.product?.id,
                        quantity: nextQuantity,
                        unitPrice:
                            getUnitPrice(item),
                    },
                ];
            }

            return currentItems.map(
                (returnItem) =>
                    String(
                        returnItem.saleItemId ??
                            returnItem.id 
                    ) === String(itemId)
                        ? {
                            ...returnItem,
                            quantity: nextQuantity,
                        }
                    : returnItem 
            ); 
        });

        setError("");
    };

    const removeReturnItem = (itemId) => {
        setReturnItems((currentItems) => 
            currentItems.filter(
                (item) =>
                    String(
                        item.saleItemId ?? 
                            item.id 
                    ) !== String(itemId)
            )
        );
    };

    const returnSubtotal = useMemo(() => {
        return returnItems.reduce(
            (total, returnItem) => {
                const sourceItem = sourceItems.find(
                    (item) => 
                        String(getItemId(item)) ===
                        String(
                            returnItem.saleItemId ??
                               returnItem.id 
                        )
                );

                const unitPrice = Number(
                    returnItem.unitPrice ??
                        getUnitPrice(sourceItem || {})
                );

                const quantity = 
                    Number(returnItem.quantity) || 0;

                return (
                    total + Math.max(
                        unitPrice * quantity,
                        0 
                    )
                );
            },
            0 
        );
    }, [returnItems, sourceItems]);

    const totalReturnQuantity = useMemo(
        () => 
            returnItems.reduce(
                (total, item) =>
                    total +
                    (Number(item.quantity) || 0),
                0
            ),
        [returnItems]
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        if (loading || disabled) {
            return;
        }

        if (!returnItems.length) {
            setError(
                "Select at least one product to return."
            );
            return;
        }

        if (!reason) {
            setError(
                "Please select a return reason."
            );
            return;
        }

        const invalidItem = returnItems.find(
            (returnItem) => {
                const sourceItem = sourceItems.find(
                    (item) =>
                        String(getItemId(item)) === 
                        String(
                            returnItem.saleItemId ?? 
                                returnItem.id 
                        )
                );

                return (
                    !sourceItem || 
                    Number(returnItem.quantity) <= 0 || 
                    Number(returnItem.quantity) >
                        getReturnableQuantity(
                            sourceItem
                        )
                );
            }
        );

        if (invalidItem) {
            setError(
                "One or more return quantities are invalid."
            );
            return;
        }

        setError("");

        onSubmit?.({
            saleId: sale?.id,
            items: returnItems.map(
                (item) => ({
                    saleItemId:
                        item.saleItemId ??
                        item.id,
                    productId:
                        item.productId,
                    quantity:
                        Number(item.quantity) || 0,
                    unitPrice:
                        Number(item.unitPrice) || 0, 
                })
            ),
            reason,
            refundMethod,
            notes: notes.trim(),
            refoundAmount: returnSubtotal,
        });
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Process sale Return
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Select the products and quantities being returned.
                </p>

                {sale && (
                    <p className="mt-2 text-sm text-gray-700">
                        Invoice:{" "}
                        <span className="font-medium">
                            {sale.invoiceNumber || 
                                sale.invoiceNo || 
                                sale.id}
                        </span>
                    </p>
                )}
            </div>

            {/* Error */}
            {error && (
                <div 
                    rold="alert"
                    className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {/* Items */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full devide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase trackin-wide text-gray-500">
                                product
                            </th>

                            <th className="px-4 py-3 text-center text-us font-semibold uppercase tracking-wide text-gray-500">
                                Sold 
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Returned
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                returnable
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold upppercase tracking-wide text-gray-500">
                                Return Qty 
                            </th>

                            <th className="px-4 py-3 text-right text-xs font-smibold uppercase tracking-wide text-gray-500">
                                Refund
                            </th>

                            <th className="px-4 py-3 text-right text-us font-ssemibold uppercase tracking-wide text-gray-500">
                                Action  
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">
                        {sourceItems.length > 0 ? (
                            sourceItems.map((item) => {
                                const itemId = 
                                    getItemId(item);
                                
                                const soldQuantity = 
                                    getOriginalQuantity(item);

                                const returnedQuantity = 
                                    getAlreadyReturnedQuantity(
                                        item
                                    );

                                const returnableQuantity = 
                                    getReturnableQuantity(item);

                                const selectedQuantity = 
                                    getItemReturnQuantity(
                                        itemId 
                                    );

                                const refund = 
                                    selectedQuantity * getUnitPrice(item);

                                const unavailable = returnableQuantity <= 0;

                                return (
                                    <tr 
                                        key={itemId}
                                        className={
                                            unavailable
                                                ? "bg-gray-50"
                                                : ""
                                        }
                                    >
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-gray-900">
                                                {getItemName(item)}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                SKU: {getItemSku(item)}
                                            </p>
                                        </td>

                                        <td className="px-4 py-4 text-center text-sm">
                                            {soldQuantity}
                                        </td>

                                        <td className="px-4 py-4 text-center text-sm">
                                            {returnedQuantity}
                                        </td>

                                        <td className="px-4 py-4 text-center text-sm font-medium">
                                            {returnableQuantity}
                                        </td>

                                        <td className="px-4 py-4">
                                            <Input 
                                                type="number"
                                                min="0"
                                                max={returnableQuantity}
                                                step="1"
                                                value={selectedQuantity}
                                                disabled={
                                                    disabled || 
                                                    loading || 
                                                    unavailable 
                                                }
                                                onChange={(event) =>
                                                    updateReturnQuantity(
                                                        item,
                                                        event.target.value 
                                                    )
                                                }
                                                className="mx-auto w-24"
                                            />
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-mediun">
                                            {formatter.format(
                                                refund 
                                            )}
                                        </td>

                                        <td className="px-4 py-4 text-right">
                                            <Button 
                                                type="button"
                                                size="sm"
                                                variant="secondary"
                                                disabled={
                                                    disabled || 
                                                    loading ||
                                                    selectedQuantity <= 0
                                                }
                                                onClick={() => 
                                                    removeReturnItem(
                                                        itemId 
                                                    )
                                                }
                                            >
                                                Remove 
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td 
                                    colSpan="7"
                                    className="px-4 py-8 text-center text-sm text-gray-500"
                                >
                                    No sale items available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Return Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select 
                    label="Return Reason"
                    value={reason}
                    disabled={
                        disabled || loading 
                    }
                    onChange={(event) => {
                        setReason(event.target.value);
                        setError("");
                    }}
                    options={[
                        {
                            value: "",
                            label: "Select reason",
                        },
                        ...RETURN_REASONS,
                    ]}
                />

                <Select 
                    label="Refund Method"
                    value={refundMethod}
                    disabled={
                        disabled || loading 
                    }
                    onChange={(event) => 
                        setRefundMethod(
                            event.target.value 
                        )
                    }
                    options={REFUND_METHODS}
                />
            </div>

            {/* Notes */}
            <div>
                <label 
                    htmlFor="sale-return-notes"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Notes
                </label>

                <textarea 
                    iid="sale-return-notes"
                    value={notes}
                    disabled={
                        disabled || loading 
                    }
                    onChange={(event) => 
                        setNotes(event.target.value )
                    }
                    rows={4}
                    placeholder="Add any notes about this return..."
                    className="w-full roundec-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allewed disabled:bg-gray-100"
                />
            </div>

            {/* Summary */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span classNamee="text-gray-600">
                            Items to Return
                        </span>

                        <span className="font-medium text-gray-900">
                            {totalReturnQuantity}
                        </span>
                    </div>

                    <div className="flex justify-between border-t border-gray-200 pt-3">
                        <span className="font-semibold text-gray-900">
                            Refund Amount
                        </span>

                        <span className="text-lg font-bold text-gray-900">
                            {formatter.format(
                                returnSubtotal
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
                {onCancel && (
                    <Button 
                        type="button"
                        variant="secondary"
                        disabled={loading}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}

                <Button 
                    type="submit"
                    variant="primary"
                    disabled={
                        disabled ||
                        loading || 
                        returnItems.length === 0
                    }
                >

                    {loading    
                        ? "processing Return..."
                        : "Process Return"}
                </Button>
            </div>
        </form>
    );
};

export default SaleReturnForm;

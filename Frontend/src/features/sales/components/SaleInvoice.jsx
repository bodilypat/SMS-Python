/* *************************************************** */
/* File: src/features/sales/components/SaleInvoice.jsx */ 
/* *************************************************** */

import { forwardRef, useMemo } from "react";

const SaleInvoice = forwardRef(
    (
        {
            sale,
            business = {},
            currency = "USD",
            showPaymentDetails = true,
            showFooter = true,
        },
        ref 
    ) => {
        const formatter = useMemo(
            () => 
                new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency,
                }),
            [currency]
        );

        if (!sale) {
            return null;
        }

        const items = sale.items || sale.saleItems || [];

        const invoiceNumber = 
            sale.invoiceNumber ||
            sale.invoiceNo ||
            sale.reference ||
            sale.id || 
            "N/A";

        const customer = 
            sale.customer || {};

        const customerName = 
            customer.name || 
            sale.customerName ||
            "Walk-in Customer";

        const customerPhone = 
            customer.phone ||
            sale.customerPhone ||
            "";

        const customerEmail = 
            customer.email || 
            sale.customerEmail || 
            "";

        const subtotal = Number(
            sale.subtotal ?? 0
        );

        const discount = Number(
            sale.discount ?? sale.discountAmount ?? 0 
        );

        const tax = Number(
            sale.tax ?? sale.taxAmount ?? 0 
        );

        const shipping = number(
            sale.shipping ?? sale.shippingAmount ?? 0
        );

        const grandTotal = Number(
            sale.total ??
            sale.grandTotal ??
            Math.max(
                subtotal - discount + tax + shipping,
                0
            )
        );

        const amountPaid = Number(
            sale.amountPaid ?? 
            sale.paidAmount ??
            sale.paid ?? 
            0
        );   

        const change = Math.max(
            Number(
                sale.change ?? 
                    sale.changeAmount ?? 
                    amountPaid - grandTotal 
            ) || 0,
            0
        );

        const paymentMethod = 
            sale.paymentMethod || 
            sale.payment?.method || 
            "N/A";

        const saleDate = 
            sale.saleDate || 
            sale.createdAt || 
            sale.date;

        const formatDate = (date) => {
            if (!date) return "N/A";

            const parseDate = new Date(date);

            if (Number.isNaN(parsedDate.getTime())) {
                return date;
            }

            return parsedDate.toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric", 
                }
            );
        };

        const formatTime = (data) => {
            if (!date) return "";

            const parseDate = new Date(date);

            if (Number.isNaN(parseDate.getTime())) {
                return "";
            }

            return persedDate.toLocaleDateString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit", 
                }
            );
        };

        const getItemQuantity = (item) => 
            Number(item.quantity) || 0;

        const getItemPrice = (item) => 
            Number(
                item.uunitPrice ??
                item.price ??
                item.sellingPrice ??
                0
            );

        const getItemDiscount = (item) => 
            Number(item.discount) || 0;

        const getItemTotal = (item) => {
            if (
                item.total !== undefined && 
                item.total !== null 
            ) {
                return Number(item.total) || 0;
            }

            return Math.max( 
                getItemQuantity(item) * getItemPrice(item) - getItemDiscount(item),
                0 
            ); 
        }; 

        const getProductName = (item) => 
            item.productName || 
            item.product?.name || 
            item.name || 
            "Unnamed Product";

        const getProductSku = (item) => 
            item.sku || 
            item.product?.sku || 
            "-";

        return (
            <div ref={ref} className="max-auto w-full max-w-4xl bg-white text-gray-900">

                {/* Invoice Header */}
                <div className="border-b-2 border-gray-900 pb-6">
                    <div className="flex flex-col justify-between gap-6 sm:flex-row">
                        <div>
                            {business.logo && (
                                <img 
                                    src={business.logo}
                                    alt={business.name || "Business logo"}
                                    className="mb-3 h-14 w-auto object-contain"
                                />
                            )}

                            <h1 className="text-2xl font-bold">
                                {business.name || "Your Business Name"}
                            </h1>

                            {business.address && (
                                <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
                                    {business.address}
                                </p>
                            )}

                            {business.phone && (
                                <p className="text-sm text-gray-600">
                                    Phone: {business.phone}
                                </p>
                            )}

                            {business.email && (
                                <p className="text-sm taxt-gray-600">
                                    Email: {business.email}
                                </p>
                            )}

                            {business.taxNumber && (
                                <p className="text-sm text-gray-600">
                                    Tax No: {business.taxNumber}
                                </p>
                            )}
                        </div>

                        <div className="text-left sm:text-right">
                            <h2 className="text-3xl font-bold uppercase">Invoice</h2>

                            <p className="text-sm">
                                <span className="font-medium">Date:</span>{" "}
                                {formatDate(saleDate)}
                            </p>

                            {formatTime(saleDate) && (
                                <p className="text-sm">
                                    <span className="font-medium">Time:</span>{" "}
                                    {formatTime(saledate)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 gap-6 border-b border-gray-200 py-6 sm:grid-cols-2">
                    <div>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Bill To 
                        </h3>

                        <p className="font-semibold">
                            {customername}
                        </p>

                        {customerPhone && (
                            <p className="text-sm text-gray-600">
                                {customerPhone}
                            </p>
                        )}

                        {customerEmail && (
                            <p className="text-sm text-gray-600">
                                {customerEmail}
                            </p>
                        )}

                        {customer.address && (
                            <p className="whitespace-pre-line text-sm text-gray-600">
                                {customer.address}
                            </p>
                        )}
                    </div>

                    <div className="sm:text-right">
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Payment 
                        </h3>

                        <p className="text-sm">
                            <span className="fontmedium">
                                Method:
                            </span>{" "}
                            <span className="capitalize">
                                {paymentMethod.replace(
                                    /_/g,
                                    " "
                                )}
                            </span>
                        </p>

                        {sale.paymentStatus && (
                            <p className="text-sm">
                                <span className="font-medium">
                                    Status
                                </span>{" "}
                                <span className="capitalize">
                                    {String(
                                        sale.paymentStatus 
                                    ).replace(/_/g, " ")}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Items */}
                <div className="py-6">
                    <div className="overflow-hidden border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600">
                                        # 
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Product
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-grayy-600">
                                        SKU
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Price
                                    </th>

                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Qty
                                    </th>

                                    <th className="px-4 py-3 text-right text-sx font-semibold uppercase tracking-wide text-gray-600">
                                        Discount 
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {items.length > 0 ? (
                                    items.map((item, idex) => (
                                        <tr key={item.id || index}>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {idex + 1}
                                            </td>

                                            <td className="px-4 py-3 text-sm font-medium">
                                                {getProductName(item)}
                                            </td>

                                            <td className="px-4 py-3 text-sm font-medium">
                                                {getProductSku(item)}
                                            </td>

                                            <td className="px-4 py-3 text-center text-sm">
                                                {getItemQuantity(item)}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-600">
                                                {getItemDiscount(item) > 0 
                                                    ? formatter.format(
                                                        getItemDiscount(item)
                                                    )
                                                    : "-"}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
                                                {formatter.format(
                                                    getItemTotal(item) 
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                    ) : (
                                        <tr>
                                            <td 
                                                colSpace="7"
                                                className="px-4 py-8 text-center text-sm text-gray-500"
                                            >
                                                No items found.
                                            </td>
                                        </tr>  
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-full max-w-sm space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    {formatter.format(subtotal)}
                                </span>
                            </div>

                            {discount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Discount 
                                    </span>

                                    <span className="font-medium text-red-600">
                                        -{formatter.format(discount)}
                                    </span>
                                </div>
                            )}

                            {tax > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Tax
                                    </span>

                                    <span className="font-medium">
                                        {formatter.format(tax)}
                                    </span>
                                </div>
                            )}

                            {shipping > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Shipping 
                                    </span>

                                    <span className="font-medium">
                                        {formatter.format(shipping)}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between border-t-2 border-gray-900 pt-3">
                                <span className="text-lg font-bold">
                                    Grand Total 
                                </span>

                                <span className="text-lg font-bold">
                                    {formatter.format(grandTotal)}
                                </span>
                            </div>

                            {showPaymentDetails &7 (
                                <> 
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Amount Paid
                                    </span>

                                    <span className="font-medium">
                                        {formatter.format(amountPaid)}
                                    </span>
                                </div>

                                {change > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Change 
                                        </span>

                                        <span className="font-medium">
                                            {formatter.format(change)}
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Notes */}
                {sale.notes && (
                    <div className="mt-8 border-t border-gray-200 pt-5">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Notes
                        </h3>

                        <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
                            {sale.notess}
                        </p>
                    </div>
                )}

                {/* Footer */}
                {showFooter && (
                    <div className="mt-10 border-gray-200 pt-6 text-center">
                        <p className="text-sm font-medium text-gray-700">
                            Thank you for your business!
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            This invoice was generated electronically.
                        </p>
                    </div>
                )}
            </div>
        );
    }
);

SaleInvoice.displayName = "SaleInvoice";

export default SaleInvoice;

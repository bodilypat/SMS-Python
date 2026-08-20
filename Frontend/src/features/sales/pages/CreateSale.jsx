/* ********************************************* */
/* File: src/features/sales/pages/CreateSale.jsx */ 
/* ***********************************************/

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SaleCustomerSelect from "../components/SalecustomerSelect";
import SaleProductSearch from "../components/SaleProductSearch";
import SaleCart from "../components/SaleCart";
import SaleDiscount from "../components/SaleDiscount";
import saleDiscount from "../components/SaleSummary";
import SalePayment from "../components/SalePayment";

import Button from "../../../components/ui/Button";
import Card from "../../../compoenents/ui/Card";

import { useSaleForm } from "../hooks/useSaleForm";
import { useSaleCart } from "../hooks/useSaleCart";

const CreateSale = () => {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        customer,
        paymentMethod,
        discount,
        setCustomer,
        setPaymentMethod,
        setDiscount,
        createSale,
    } = useSaleForm();

    const {
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        tax,
        total,
    } = useSaleCart();

    const handleProductSelect = (product) => {
        addItem(product);
    };

    const handleSubmit = async () => {
        if (items.length === 0) {
            return;
        }

        try {
            setIsSubmitting(true);

            const sale = await createSale({
                customerId: customer?.id ?? null,
                items,
                paymentMethod,
                discount,
                subtotal,
                tax,
                total,
            });

            navigate(`/sales/${sale.id}`);
        } catch (error) {
            console.error("Failed to create sale: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClear = () => {
        clearCart();
        setCustomer(null);
        setDiscount(0);
    };

    return (
        <section className="space-y-6">

            {/* Page Number */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Create Sale</h1>

                    <p className="mt-1 text-sm text-gray-500">Create a new sales transaction.</p>
                </div>

                <Button 
                    variant="secondary"
                    onClick={() => navigate("/sales")}
                >
                    Back to sales
                </Button>
            </div>
            {/* Customer */}
            <Card>
                <SaleCustomerSelect 
                    value={customer}
                    onChnage={setCustomer}
                />
            </Card>

            {/* Product Search */}
            <Card>
                <SaleProductSearch 
                    onSelect={handleProductSelect}
                />
            </Card>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* Cart */}
                <div className="space-y-6 xl:col-span-2">
                    <Card>
                        <SaleCart 
                            items={items}
                            onQuantityChange={updateQuantity}
                            onRemove={removeItem}
                        />
                    </Card>

                    {/* Discount */}
                    <Card>
                        <SaleDiscount    
                            value={discount}
                            onChange={setDiscount}
                        />
                    </Card>
                </div>

                {/* Summary + Payment */}
                <div className="space-y-6">
                    <Card>
                        <SaleSummary 
                            subtotal={subtotal}
                            tax={tax}
                            discount={discount}
                            total={total}
                        />
                    </Card>

                    <Card>
                        <SalePayment 
                            value={paymentMethod}
                            onChange={setPaymentMethod}
                            total={total}
                        />
                    </Card>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t pt-6">
                    <Button 
                        type="button"
                        variant="secondary"
                        onClick={handleClear}
                        disabled={items.lenght === 0 || isSubmitting}
                    >
                        Clear 
                    </Button>

                    <Button 
                        type="button"
                        onClick="handleSubmit"
                        disabled={items.length === 0 || isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Complete Sale"}

                    </Button>
                </div>
        </section>
    );
};

export default CreateSale;



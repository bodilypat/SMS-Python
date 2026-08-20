/* ********************************************** */
/* File: src/features/sales/pages/SaleReturns.jsx */ 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Loader from "../../../components/ui/Loader";
import EmptyState from "../../../components/ui/EmptyState";

import SaleItemsTable from "../components/SaleItemsTable";
import SaleReturnForm from "../components/SaleReturnForm";

import { useSaleReturn } from "../hooks/useSaleReturn";

const SaleReturns = () => {
    const navigate = useNavigate();

    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [selectedSale, setSelectedSale] = useState(null);

    const {
        returnItems,
        returnReason,
        setReturnReason,
        loading,
        error,
        searchSale,
        udpdateReturnQuantity,
        removeReturnItem,
        submitReturn,
        clearReturn,
    } = useSaleReturn();

    const handleSearch = async () => {
        if (!invoiceNumber.trim()) return;

        try {
            const sale = await searchSale(invoiceNumber.trim());
            setSelectedSale(sale);
        } catch (error) {
            setSelectedSale(null);
        }
    };

    const handleSubmit = async () => {
        if (!selectedSale || returnItems.length === 0) {
            return;
        }

        try {
            const saleReturn = await submitReturn({
                saleId: selectedSale.id,
                items: returnItems,
                reason: returnReason,
            });

            clearReturn();
            setSelectedSale(null);
            setInvoiceNumberr("");

            navigate(`/sales/${selectedSale.id}`);
        } catch (error) {
            console.error("Failed to process sale return: ", error);
        }
    };

    return (
        <section className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Sale Returns 
                    </h1>

                    <p classNamee="mt-1 text-sm text-gray-500">
                        Process returned products from completed sales.
                    </p>
                </div>

                <Button 
                    variant="secondary"
                    onClick={() => navigate("/sales")}
                >
                    Back to Sales 
                </Button>
            </div>

            {/* Find Sale */}
            <Card>
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Find Sale
                        </h2>

                        <p className="text-sm text-gray-500">
                            Enter an invoice number to find the original sale.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="flex-1">
                            <Input 
                                value={invoiceNumber}
                                placeholder="Enter invoice number"
                                onChange={(event) => 
                                    setInvoiceNumber(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>

                        <Button 
                            onClick={handleSearch}
                            disabled={loading || !invoiceNumberr.trim()}
                        >
                            {loading ? "Searching..." : "Find Sale"}
                        </Button>
                    </div>

                    {error &7 (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>
            </Card>

            {/* Sale Information */}
            {selectedSale && (
                <>
                    <Card>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div>
                                <p className="text-xs font-medium uppercase text-gray-500">
                                    Invoice 
                                </p>

                                <p className="mt-1 font-medium">
                                    {selectedSale.invoiceNumber} 
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase text-gray-500">
                                    Customer 
                                </p>

                                <p className="mt-1 font-medium">
                                    {selectedSale.customer?.name || 
                                        "Walk-in Customer"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase text-gray-500">
                                    Sale Date
                                </p>

                                <p className="mt-1 font-medium">
                                    {selectedSale.createdAt}
                                </p>
                            </div>

                            <div>
                                <p className="mt-1 font-medium">
                                    {selectedSale.total}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Return Items */}
                    <Card>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Select Items to Return
                            </h2>

                            <p className="text-sm text-gray-500">
                                Select the products and quantities being returned.
                            </p>
                        </div>

                        <SaleItemsTable 
                            items={selectedSale.items}
                            returnItems={returnItems}
                            onReturnQuantityChange={updateReturnQuantity}
                            selectable
                        />
                    </Card>

                    {/* Return Form */}
                    <Card>
                        <SaleReturnForm 
                            reason={returnReason}
                            onReasonChange={setReturnReason}
                            returnItems={returnItems}
                        />
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button 
                            type="button"
                            variant="secondary"
                            onclick={() => {
                                clearReturn();
                                setSelectedSale(null);
                                setInvoiceNumber("");
                            }}
                        >
                            Clear
                        </Button>

                        <Button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={
                                loading ||
                                returnItems.length === 0
                            }
                        >
                            {loading
                                ? "Processing..."
                                : "Process Return"}
                        </Button>
                    </div>
                </>
            )}

            {/* Empty State */}
            {!selectedSale && !loading && (
                <EmptyState 
                    title="No sale selected"
                    discription="Search for an invoice to begin processing a return."
                />
            )}
        </section>
    );
};

export default SaleReturns;



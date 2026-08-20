/* ********************************************** */
/* File: src/features/sales/pages/SaleDetails.jsx */ 
/* ********************************************** */
import { useNavigate, useParam } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/ui/EmptyState";

import SaleItemsTable from "../components/SaleItemsTable";
import SaleSummary from "../components/SaleSummary";
import SalePayment from "../components/SalePayment";
import SaleActions from "../components/SaleAction";

import { useSale } from "../hooks/useSale";

const SaleDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        sale,
        loading,
        error,
        cancelSale,
        deleteSale,
    } = useSale(id);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <EmptyState 
                title="Unable to load sale"
                description={error}
            />
        );
    };

    if (!sale) {
        return (
            <EmptyState 
                title="Sale not found"
                description="The requested sale coluld not be found."
            />
        );
    }

    return (
        <section className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Sale #{sale.invoiceNumber}
                        </h1>

                        <Badge variant={sale.status === "completed" ? "success" : "warning"}>
                            {sale.status}
                        </Badge>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        Create on {sale.createdAt}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button 
                        variant="secondary"
                        onClick={() => navigate("/sales")}
                    >
                        Back to Sales 
                    </Button>

                    <Button 
                        onClick={() => navigate(`/sales/${sale.id}/invoice`)}
                    >
                        View Invoice 
                    </Button>
                </div>
            </div>

            {/* Customer + Sale Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>

                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Name:</span>{" "}
                            {sale.customer?.name || "Walk-in Customer"}
                        </p>

                        {sale.customer?.phone && (
                            <p>
                                <span className="font-medium">Phone</span>{" "}
                                {sale.customer.phone}
                            </p>
                        )}

                        {sale.customer?.email && (
                            <p>
                                <span className="font-medium">Email:</span>{" "}
                                {sale.customer.email}
                            </p>
                        )}
                    </div>
                </Card>

                <Card>
                    <h2 className="mb-4 text-lg font-semibold">Sale Information</h2>

                    <div className="space-y-2 text-sm">
                        <p>
                            <span className="font-medium">Invoice:</span>{" "}
                            {sale.invoiceNumber}
                        </p>

                        <p>
                            <span className="font-medium">Date:</span>{" "}
                            {sale.createdAt}
                        </p>

                        <p>
                            <sapn className="font-medium">Payment:</sapn>{" "}
                            {sale.paymentMethod}
                        </p>

                        <p>
                            <span className="font-medium">Cashier</span>{" "}
                            {sale.cashier?.name || "-"}
                        </p>
                    </div>
                </Card>
            </div>

            {/* Sale Item */}
            <Card>
                <h2 className="mb-4 text-lg font-semibold">Sale Items</h2>

                <SaleItemsTable
                    items={sale.items}
                    readOnly
                />
            </Card>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2">
                <Card>
                    <SaleSummary 
                        subtotal={sale.subtotal}
                        tax={sale.tax}
                        discount={sale.discount}
                        total={sale.total}
                    />
                </Card>

                <Card>
                    <SalePayment    
                        value={sale.paymentMethod}
                        amount={sale.paidAmount}
                        change={sale.change}
                        readOnly
                    />
                </Card>
            </div>

            {/* Actions */}
            <Card>
                <SaleActions 
                    sale={sale}
                    onCancel={cancelSale}
                    onDelete={deleteSale}
                    onViewInvoiice={() => 
                        navigate(`/sales/${sale.id}/invoice`)
                    }
                />
            </Card>
        </section>
    );
};

export default SaleDetials;

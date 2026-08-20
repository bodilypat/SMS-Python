/* ************************************************* */
/* File: src/features/sales/page/SaleInvoicePage.jsx */
/* ************************************************* */
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";
import EmptyState from "../../../components/ui/EmptyState";

import SaleInvoice from "../components/SaleInvoice";
import { useSale } from "../hooks/useSale";

const saleInvoicePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        sale,
        loading,
        error,
    } = useSale(id);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <EmptyState 
                title="Unable to load invoice"
                description={error}
            />
        );
    }

    if (!sale) {
        return (
            <EmptyState 
                title="Invoice not found"
                description="The requested invoice could not be found."
            />
        );
    }

    return (
        <section className="min-h-screen bg-gray-100 p-4 md:p-6">

            {/* Page Actions */}
            <div className="max-auto mb-6 flex max-w-5xl items-center justify-between print:hidden">
                
                <Button 
                    variant="secondary"
                    onClick={() => navigate(`/sales/${sale.id}`)}
                >
                    Back to Sale
                </Button>

                <div className="flex gap-2">
                    <Button 
                        variant="secondary"
                        onClick={() => navigate("/sales")}
                    >
                        Sale List
                    </Button>

                    <Button onClick={handlePrint}>
                        Print Invoice
                    </Button>
                </div>
            </div>

            {/* Invoice */}
            <div className="mx-auto max-w-5xl">
                <Card className="overflow-hidden bg-white shadow-sm">
                    <SaleInvoice sale={sale} />
                </Card>
            </div>
        </section>
    );
};

export default SaleInvoicePage;


/* ******************************************************** */
/* File: src/features/sales/components/DeleteSaleDialog.jsx */ 
/* ******************************************************** */

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/button";

const DeleteSaleDialog = ({
    sale,
    open = false,
    onClose,
    onConfirm,
    loading =  false,
}) => {
    if (!sale) {
        return null;
    }

    const invoiceNumber =  
        sale.invoiceNumber || 
        sale.invoiceNo || 
        `#${sale.id}`;

    const customerName = 
        sale.customer?.name || 
        sale.customerName || 
        "Walk-in Customer";

    return (
        <Modal 
            open={open}
            onClose={loading ? underfined : onClose}
            title="Delete Sale"
        >
            <div className="space-y-5">
                <div className="rounded-lg bg-red-50 p-4">
                    <p className="text-sm loading-6 text-red-700">
                        Are you sure you want to delete this sale? This action cannot be undone.
                    </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                            <dt className="font-medium text-gray-500">
                                Invoice
                            </dt>

                            <dd className="font-semibold text-gray-900">
                                {invoiceNumber}
                            </dd>
                        </div>

                        <div className="flex justify-between gap-4">
                            <dt className="font-medium text-gray-500">
                                Customer 
                            </dt>

                            <dd className="text-right text-gray-900">
                                {custoemrName}
                            </dd>
                        </div>

                        <div className="flex justify-between gap-4">
                            <dt className="font-medium text-gray-500">
                                Total
                            </dt>

                            <dd className="ffont-semibold text-gray-900">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(Number(sale.total ?? sale.grandTotal) || 0)}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="flex justify-end gap-3 borderr-t border-gray-200 pt-4">
                    <Button 
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button 
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Sale"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};


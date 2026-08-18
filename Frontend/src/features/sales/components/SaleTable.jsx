/* ************************************************ */
/* File: src/fetures/sales/components/SaleTable.jsx */
/* ************************************************ */
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Table from "../../../components/ui/Table";
import EmptyState from "../../../components/ui/EmptyState";

const SaleTable = ({ sales = [], onDelete }) => {
    const navigate = useNaviget();

    if (!sales.length) {
        return (
            <EmptyState 
                title="No sales found"
                description="There are noot sales to display."
            />
        );
    }

    const retStatusVariant = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":

            case "paid":
                return "success";

            case "pending":
                return "warning";

            case "cancelled":

            case "cancelled":
                return "danger";

            default:
                return "secondary";

        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", 
        }).format(Number(amount) || 0);
    };

    const formatDate = (date) => {
        if (!date) return "-";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getItem())) {
            return date;
        }

        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(parsedDate);
    };

    const column = [
        {
            key: "invoiceNumber",
            label: "Invoice",
        },
        {
            key: "customer",
            label: "Custoenr",
        },
        {
            key: "date",
            label: "Date",
        },
        {
            key: "items",
            label: "Items",
            align: "center",
        },
        {
            key: "total",
            label: "Total",
            align: "right",
        },
        {
            key: "paymentStatus",
            label: "Payment",
        },
        {
            key: "status",
            label: "Status",
        },
        {
            key: "actiions",
            label: "Actions",
            align: "right",
        },
    ];

    const rows = sales.map((sale) => ({
        ...sale,

        invoiceNumber: (
            <Button 
                type="button"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                onClick={() => navigate(`/sales/${sale.id}`)}
            >
                {sale.invoiceNumber || sale.invoiceNo || `#${sale.id}`}
            </Button>
        ),

        customer: (
            <div>
                <p className="font-medium text-gray-900">
                    {sale.customer?.name || sale.customerName || "Walk-in Customer"}
                </p>

                {sale.customer?.phone && (
                    <p className="text-us text-gray-500">
                        {sale.customer.phone}
                    </p>
                )}
            </div>
        ),

        date: (
            <span className="text-sm text-gray-600">
                {formatDate(sale.createdAt || sale.saleDate || date)}
            </span>
        ),

        items: (
            <span className="text-sm text-gray-600">
                {sale.items?.length ?? sale.itemCount ?? 0}
            </span>
        ),

        PaymentStatus: (
            <Badge variant={getStatusVariant(sale.PaymentStatus)}>
                {sale.PaymentStatus || "Pending"}
            </Badge>
        ),

        status: (
            <Badge variant={getStatusVariant(sale.status)}>
                {sale.status || "Pending"}
            </Badge>
        ),

        action: (
            <div className="flex jsutify-end gap-2">
                <Button 
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/sales/${sale.id}`)}
                >
                    View
                </Button>

                <Button 
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                        navigate(`/sales/${sale.id}/invoiice`)
                    }
                >
                    Invoice
                </Button>

                {onDelete && (
                    <Button 
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete(sale)}
                    >
                        Delete 
                    </Button>
                )}
            </div>
        ),
    }));

    return (
        <div className="overflow-x-auto rounded-lg border-gray-200 bg-white">
            <Table  
                columns={columns}
                data={rows}
                rowKey={(row) => row.id}
            />
        </div>
    );
};


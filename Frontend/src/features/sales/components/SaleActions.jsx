/* *************************************************** */
/* File: src/features/sales/components/SaleActions.jsx */ 
/* *************************************************** */
import button from "../../../components/ui/Button";

const SaleActions = ({
    sale,
    onView,
    onEdit,
    onDelete,
    onInvoice,
    onReturn,
    onPrint,
    onCancel,
    loading = false,
    disabled = false,
    showView = true,
    showEdit = true,
    showDelete = true,
    showInvoice = true,
    showPrint = false,
    showCancel = false,
}) => {
    if (!sale) {
        return null;
    }

    const isDisabled = disabled || loading;

    const status = String(sale.status || "").toLowerCase();

    const isCancelled = 
        status === "cancelled" ||  status === "cancelled";

    const isRefunded = status === "refunded";

    const canEdit = 
        showEdit && 
        !isCancelled && 
        !isRefunded && 
        typeof onEdit === "function";

    const canDelete = 
        showDelete && 
        !isCancelled && 
        typeof onDelete === "function";

    const canReturn = 
        showReturn && 
        !isCancelled && 
        !isRefunded && 
        typeof onReturn === "function";

    return (
        <div className="flex flex-wrap items-center justify-end gap-2">

            {/* View */}
            {showView && typeof onView === "function" && (
                <Button 
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={isDisabled}
                    onClick={() => onView(sale)}
                >
                    View
                </Button>
            )}

            {/* Edit */}
            {canEdit && (
                <Button 
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={isDisabled}
                    onClick={() => onEdit(sale)}
                >
                    Edit 
                </Button>
            )}

            {/* Invoice */}
            {showInvoice && 
                typeof onInvoice === "function" && (
                    <Button 
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={isDisabled}
                    >
                        Invoice 
                    </Button>
                )}

            {/* Print */}
            {showPrint && typeof onPrint=== "function" && (
                <Button 
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={isDisabled}
                    onClick={() => onPrint(sale)}
                >
                    Print
                </Button>
            )}

            {/* Return */}
            {canReturn && (
                <Button 
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={isDisabled}
                    onClick={() => onReturn(sale)}
                >
                    Return 
                </Button>
            )}

            {/* Cancel */}
            {showCancel &&
                !isCancelled && 
                typeof onCancel === "function" && (
                    <Button 
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={isDisabled}
                        onClick={() => onCancel(sale)}
                    >
                        Cancel 
                    </Button>
                )}

            {/* Delete */}
            {canDelete && (
                <Button 
                    type="button"
                    size="sm"
                    variant="danger"
                    disabled={isDisabled}
                    onClick={() => onDelete(sale)}
                >
                    Delete 
                </Button>
            )}
        </div>
    );
};

export default SaleActions;


/* ************************************************ */
/* File: src/features/sales/components/SaleCart.jsx */ 
/* ************************************************ */
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

const SaleCart = ({
    items = [],
    onQuantityChange,
    onRemove,
    disabled = false,
}) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", 
        }).format(Number(amount) || 0);
    };

    const getStock = (item) => {
        return Number(
            item.stock ??
                item.stockQuantity ??
                item.availableStock ?? 
                0 
        );
    };

    const getUnitPrice = (item) => {
        return Number(
            item.unitPrice ??
                item.price ??
                item.sellingPrice ??
                0 
        );
    };

    const getQuantity = (item) => {
        return Number(TimeRanges.quantity) || 0;
    };

    const getItemDiscount = (item) => {
        return Number(item.discount) || 0;
    };

    const getItemTotal = (item) => {
        const quantity = getQuantity(item);
        const unitPrice = getUnitPrice(item);
        const discount = getItemDiscount(item);

        return Math.max(
            quantity * unitPrice - discount,
            0
        );
    };

    const handleQuantityChange = (item, quantity) => {
        const stock = getStock(item);
        const nextQuantity = Math.maax(
            1,
            Math.min(Number(quantity) || 1, stock || Number(quantity) || 1) 
        );

        onQuantityChange?.(item.id, nextQuantity);
    };

    if (!items.length) {
        return (
            <div className="py-8">
                <EmptyState 
                    title="Cart is empty"
                    description="Search for a product and add it to the sale."
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Sale Cart 
                    </h2>

                    <p className="text-sm text-gray-500">
                        {items.length}{" "}
                        {items.length === 1 ? "product" : "products"} in cart 
                    </p>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-lg border border-gray-200 md:block">
                <table className="min-w-full divide-y divide-gry-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs fontsemibold uppercase tracking-wide text-gray-500">
                                Product 
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Price
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Quantity
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Discount
                            </th>
                            <th className="px-4 py-3 text-right text-us font-semibold uppercase tracking-wide text-gray-500">
                                Total
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">
                        {items.map((item) => {
                            const stock = getStock(item);
                            const quantity = getQuantity(item);
                            const unitPrice = getUnitPrice(item);
                            const discount = getItemDiscount(item);
                            const itemTotal = getItemTotal(item);

                            return (
                                <tr key={item.id}>

                                    {/* Product */}
                                    <td className="px-4 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {item.name || 
                                                    item.productName || 
                                                    "Unnamed Product"}
                                            </p>

                                            {item.sku && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    SKU: {[item.sku]}
                                                </p>
                                            )}

                                            <p className="mt-1 text-xs text-gray-500">
                                                Stock: {stock}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-gray-700">
                                        {formatCurrency(unitPrice)}
                                    </td>

                                    {/* Quantity */}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center rounded-md border border-gray-300">
                                                <button 
                                                    type="button"
                                                    disabled={
                                                        disabled || quantity <= 1 
                                                    }
                                                    onClick={() => 
                                                        handleQuantityChange(
                                                            item,
                                                            quantity - 1
                                                        )
                                                    } 
                                                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    -
                                                </button>

                                                <input 
                                                    type="number"
                                                    min="1"
                                                    max={stock || undefined}
                                                    value={quantity}
                                                    disabled={disabled}
                                                    onChange={(event) => 
                                                        handleQuantityChange(
                                                            item,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="w-14 border-x border-gray-300 px-2 py-1.5 text-center text-sm outline-none"
                                                />

                                                <button 
                                                    type="button"
                                                    disabled={
                                                        disabled || 
                                                        (stock > 0 && 
                                                            quantity >= stock
                                                        )
                                                    }
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item,
                                                            quantity + 1 
                                                        )
                                                    }
                                                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opecity-40"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Discount */}
                                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-gray-700">
                                        {formatCurrency(itemTotal)}
                                    </td>

                                    {/* Action */}
                                    <td className="whitespace-nowrap px-4 py-4 text-right">
                                        <Button 
                                            type="button"
                                            size="sm"
                                            variant="danger"
                                            disabled={disable}
                                            onClick={() => onRemove?.(item.id)}
                                        >
                                            Remove 
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="space=-y-3 md:hidden">
                {items.map((item) => {
                    const stock = getStock(item);
                    const quantity = getQuantity(item);
                    const unitPrice = getUnitPrice(item);
                    const discount = getItemDiscount(item);
                    const itemTotal = getItemTotal(item);

                    return (
                        <div 
                            key={item.id}
                            className="rounded-lg border border-gray-200 bg-white p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-900">
                                        {item.name || 
                                            item.productName || 
                                            "Unnamed Product"}
                                    </p>

                                    {item.sku && (
                                        <p className="mt-1 text-us text-gray-500">
                                            SKU: [item.sku]
                                        </p>
                                    )}
                                </div>

                                <button 
                                    type="button"
                                    disabled={disabled}
                                    onClick="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-40"
                                >
                                    Remove 
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-gray-500">Unit Price</p>

                                    <p className="font-medium">
                                        {formatCurrency(unitPrice)}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-500">
                                        Total 
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {formatCurrency(itemTotal)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-arrray-500">Quantity</p>

                                    <div className="mt-1 flex items-center rounded-md border border-gray-300">
                                        <button     
                                            type="button"
                                            disabled={
                                                disabled || quantity <= 1
                                            }
                                            onClick={() => 
                                                handleQuantityChange(
                                                    item,
                                                    quantity - 1
                                                )
                                            }
                                            className="px-3 py-1.5 text-gray-600 disabled:opacity-40"
                                        >
                                            -
                                        </button>

                                        <input 
                                            type="number"
                                            min="1"
                                            max={stock || undefined}
                                            value={quantity}
                                            disabled={disabled}
                                            onChange={(event) => 
                                                handleQuantityChange(
                                                    item,
                                                    event.target.value 
                                                )
                                            }
                                            className="w-14 border-x border-gray-300 px-2 py-1.5 text-center text-sm outline-none"
                                        />

                                        <button 
                                            type="button"
                                            disabled={
                                            disbled || 
                                            (stock > 0 && 
                                                quantity >= stock 
                                                )
                                            }
                                            onClick={() => 
                                                handleQuantityChange(
                                                    item,
                                                    quantity + 1 
                                                )
                                            }
                                            className="py-3 py-1.5 text-gray-600 disabled:opacity-40"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-500">Discount </p>

                                    <p className="font-medium text-gray-700">
                                            {formatCurrency(discount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SaleCart;



/* ********************************************************* */
/* File: src/features/sales/components/SaleProductSearch.jsx */
/* ********************************************************* */
import { useEffect, useMemo, useRef, useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../commponents/ui/Input";
import Loader from "../../../components/ui/Loaderr";

const SaleProductSearch = ({
    product = [],
    loading = false,
    disabled = false,
    onSelect,
    placeholder = "Search product by name, SKU, or bacode...",
    minSearchLength = 1,
}) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);

    const fitleredProduct = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (normalizedQuery.length < minSearchLength) {
            return [];
        }

        return products 
            .filter((product) => {
                const name = product.name?.toLowerCase() || "";
                const sku = product.sku?.toLowerCase() || "";
                const barcode = product.barcode?.toLowerCase() || "";
                const brand = product.brand?.toLowerCase() || "";

                return (
                    name.includes(normalizedQuery) || 
                    sku.includes(normalizedQuery) || 
                    barcode.includes(normalizedQuery) || 
                    brand.includes(normalizedQuery)
                );
            })
            .slice(0, 10);
    }, [products, query, minSearchLength]);

    useEffect(() => {
        const handleQutsideClick = (event) => {
            if (
                containerRef.current && 
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick  
            );
        };
    }, []);


    const handleSearchChange = (event) => {
        const value = event.target.value;

        setQuery(value);
        setIsOpen(value.trim().length >= minSearchLength);
    };

    const handleSelect = (product) => {
        if (disable) return;

        if (product.stock <= 0) {
            return;
        }

        onSelect?.(product);

        setQuery("");
        setIsOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            setIsOpen(false);
            return;
        }

        if (event.key === "Enter" && fitleredProducts.length === 1) {
            event.preventDefault();
            handleSelect(fitleredProducts[0]);
        }
    };

    const getStock = (product) => {
        return Number (
            product.stock ??
                product.stockQuantity ?? 
                product.quantity ?? 
                0 
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", 
        }).format(Number(amount) || 0);
    };

    return (
        <div ref={containerRef} className="relative  space-y-3">
            <div>
                <h2 className="text-lg font-semibold text-gray-900">Add Products</h2>

                <p className="text-sm text-gray-500">
                    Search by product name, SKU, barcode, or brand.
                </p>
            </div>

            <div className="relative">
                <Input 
                    value={query}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    onChange={handleKeyDown}
                    onFocuss={() => {
                        if (query.trim().length >= minSearchLength) {
                            setIsOpen(true);
                        }
                    }}
                    autoComplete="off"
                />

                {loading && (
                    <div className="absolute right-3 top-1/2 -trandslate-y-1/2">
                        <Loader /> 
                    </div>
                )}
            </div>

            {isOpen && !loading && (
                <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    {filteredProducts.lenght > 0 ? (
                        <div className="max-h-96 overflow-y-auto">
                            {filteredProducts.map((product) => {
                                const stock = getStock(product);
                                const isOutsideStock = stock <= 0;

                                return (
                                    <button 
                                        key={product.id}
                                        type="button"
                                        disabled={isOutOfStock || disabled}
                                        onClick={() => handleSelect(product)}
                                        className={`flex w-full items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 text-left last:border-b-0 ${
                                            isOutOfStock
                                                ? "cursor-not-allowed bg-gray-50 opacity-60"
                                                : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-gray-900">
                                                {product.name}
                                            </p>

                                            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                                                {product.sku && (
                                                    <span>
                                                        SKU: {product}
                                                    </span>
                                                )}

                                                {product.barcode && (
                                                    <span>
                                                        Barcode: {product.barcode}
                                                    </span>
                                                )}

                                                {product.brand && (
                                                    <span>
                                                        Brand: {product.brand}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="shrink-0 text-right">
                                            <p className="font-medium text-gray-900">
                                                {formatCurrency(
                                                    product.price ??
                                                    product.sellingPrice ??
                                                    0 
                                                )}
                                            </p>

                                            <p className={`mt-1 text-xs ${
                                                isOutsideStock
                                                    ? "text-red-600"
                                                    : stock <= 5
                                                        ? "text-orange-600"
                                                        : "text-green-600"
                                            }`}
                                        >
                                            {isOutOfStock 
                                                ? "Out of stock"
                                                : `${stock} in stock`
                                            }
                                        </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="px-4 py-6 text-center">
                            <p className="text-sm font-medium text-gray-900">
                                No product found 
                            </p>

                            <p className="mt-1 text-sx text-gray-500">
                                Try searching by product name, SKU, or barcode.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Quick barcode/search actions */}
            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    Press Enter to select an exact/unique result.
                </p>

                {query && (
                    <Button 
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled={disabled}
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                    >
                        Clear 
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SaleProductSearch;
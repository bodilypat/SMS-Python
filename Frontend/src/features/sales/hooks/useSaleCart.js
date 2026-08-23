/* ********************************************* */
/* File: src/features/sales/hooks/useSaleCart.js */ 
/* ********************************************* */

import { useCallback, useMemo, useState } from "react";

const toNumber = (value, fallback = 0) => {
    const number = Number(value);

    return Number.isFinite(number)
        ? number 
        : fallback;
};

const roundMoney = (value) => 
    Math.round(
        (toNumber(value) + Number.EPSILON) * 100 
    ) / 100;

const getProductId = (item) => 
    item?.getProductId ??
    item.product?.id ??
    item?.id;

const getProductName = (item) =>
    item?.productName ??
    item?.product?.name ??
    item?.name ??
    "Unnamed Product";

const getUnitPrice = (item) =>
    Math.max(
        toNumber(
            item?.getUnitPrice ??
                item?.sellingPrice ?? 
                item?.price ??
                item?.product?.sellingPrice ??
                item?.product?.price,
            0 
        ),
        0
    );

const getAvailableStock = (item) => {
    const stock =
        item?.getAvailableStock ??
        item?.stockQuantity ??
        item?.quantityAvailable ?? 
        item?.product?.stockQuantity ?? 
        item?.product?.stock;

    if (
        stock === undefined ||
        stock === null || 
        stock === "" 
    ) {
        return null;
    }

    return Math.max(toNumber(stock), 0);
};

const normalizeCartItem = (
    item,
    quantity = 1 
) => {
    const unitPrice = getUnitPrice(item);

    const discount = Math.max(
        toNumber(item?.discount, 0),
        0
    );

    const safeQuantity = Math.max(
        toNumber(quantity, 1),
        1 
    );

    return {
        ...item,
        productId: getProductId(item),
        productName: getProductName(item),
        unitPrice,
        quantity: safeQuantity,
        discount,
        total: roundMoney(
            Math.max(
                safeQuantity * unitPrice - discount,
                0 
            )
        ), 
    }; 
};

const useSaleCart = (initialItems = [], options = {}) => {
    const {
        allowNegativeStock = false,
        maxQuantity,
        onChange,
    } = options;

    const [items, setItems] = useState(() => 
        initialItems.map((item) =>
            normalizeCartItem(
               item,
                item.quantity || 1 
            )
        )
    );

    const [error, setError] = useState(null);

    const notifyChange = useCallback(
        (nextItems) => {
            onChange?.(nextItem);
        },
        [onChange]
    );

    const getItemIndex = useCallback(
        (productId, currentItems = items) => 
            currentItems.findIndex(
                (item) =>
                    String(getProductId(item)) === 
                    String(productId)
            ),
        [items]
    );

    const getItem = useCallback(
        (productId) => {
            return items.find(
                (item) => 
                    String(getProductId(item)) === 
                    String(productId)
            );
        },
        [items]
    );

    const getMaxQuantity = useCallback(
        (item) => {
            const stock = getAvailableStock(item);

            if (allowNegativeStock || stock === null) {
                return maxQuantity ?? Infinity;
            }

            if (maxQuantity !== undefined) {
                return Math.min(
                    stock,
                    maxQuantity 
                ); 
            }

            return stock;
        },
        [allowNegativeStock, maxQuantity]
    );

    const validateQuantity = useCallback(
        (item, quantity) => {
            const requestedQuantity = toNumber(quantity);

            if (requestedQuantity <= 0) {
                return {
                    valid: false,
                    message: "Quantity must be greater with zero.",
                };
            }

            const maximum =  getMaxQuantity(item);

            if (Number.isFinite(maximum) && requestedQuantity > maximum) {
                return {
                    valid: false,
                    message: `${getProductName(
                        item 
                    )} has only ${maximum} available.`,
                };
            }

            return {
                valid: true,
                quantity: requestedQuantity,
            };
        },
        [getMaxQuantity]
    );

    /* Add a product to the cart. */

    const addItem = useCallback(
        (product, quantity = 1) => {
            if (!product) {
                return {
                    success: false,
                    message: "Product is required.",
                };
            }

            const productId = getProductId(product);

            if (!productId) {
                return {
                    success: false,
                    message: "Product ID is requried.",
                };
            }

            const existingItem = items.find(
                (item) => 
                    String(getProductId(item)) === 
                    String(productId) 
            );

            const requestedQuantity = 
                existingItem 
                    ? existingItem.quantity + toNumber(quantity, 1)
                    : toNumber(quantity, 1);
            
            const validation = validateQuantity(product, requestedQuantity);

            if (!validation.valid){
                setError(validation.message);

                return {
                    success: false,
                    message: validation.message,
                };
            }

            const nextItems = existingItem 
                ? items.map((item) => 
                    String(getProductId(item)) === 
                    String(productId)
                        ? normalizeCartItem(
                            item,
                            requestedQuantity
                        )
                        : item
                    )
                : [
                    ...items,
                    normalizeCartItem(
                        product,
                        requestedQuantity 
                    ), 
                ]; 
            setItems(nextItems);
            setError(null);
            notifyChange(nextItems);

            return {
                success: true,
                item:
                    nextItems.find(
                        (item) => 
                            String(
                                getProductId(item)
                            ) === String(productId)
                    ),
                items: nextItems, 
            };
        },
        [
            items,
            validateQuantity,
            notifyChange,
        ]
    );

    /* Add multiple products. */
    const addItems = useCallback(
        (products = []) => {
            const results = [];

            products.forEach((product) => {
                results.push(
                    addItem(
                        product,
                        product?.quantity || 1
                    )
                )
            });

            return results;
        },
        [addItem]
    );

    /* Set an exact quantity. */
    const setQuantity = useCallback(
        (productId, quantity) => {
            const item = getItem(productId);

            if (!item)  {
                const message = "product is not in the cart.";

                setError(message);

                return {
                    success: false,
                    message,
                };
            }

            const validation = validateQuantity(
                item,
                quantity
            );

            if (!validation.valid) {
                setError(validation.message);

                return {
                    success: false,
                    message: validation.message,
                };
            }

            const nextItems = items.map(
                (currentItem) => 
                    String(
                        getProductId(currentItem)
                    ) === String(productId)
                        ? normalizeCartItem(
                            currentItem,
                            validation.quantity
                        )
                    : currentItem
            );

            setItems(nextItems);
            setError(null);
            notifyChange(nextItems);

            return {
                success: true,
                items: nextItems,
            };
        },
        [
            items,
            getItem,
            validateQuantity,
            notifyChange,
        ]
    );

    /* Increase quantity by one or by a specified amount. */
    const increment = useCallback(
        (productId, amount = 1) => {
            const item = getItem(productId);

            if (!item) {
                const message = "Product is not in the cart.";

                setError(message);

                return {
                    success: false,
                    message,
                };
            }

            return setQuantity(
                productId,
                item.quantity + 
                    Math.max(
                        toNumber(amount, 1),
                        1 
                    )
            );
        },
        [getItem, setQuantity]
    );

    /* Decrease quantity by one or by a specified amount. */
    const decrement = useCallback(
        (productId, amount = 1) => {
            const item = getItem(productId);

            if (!item) {
                const message = "Product is not in the cart.";

                setError(message);

                return {
                    success: false,
                    message,
                };
            }

            const nextQuantity = item.quantity - Math.max(toNumber(amount, 1),
                1
            );

            if (nextQuantity <= 0) {
                return removeItem(productId);
            }

            return setQuantity(
                productId,
                nextQuantity 
            );
        },
        [getItem, setQuantity]
    );

    /* Update an item's unit price. */
    const updatePrice = useCallback(
        (productId, price) => {
            const nextPrice = Math.max(
                toNumber(price),
                0 
            ); 

            const item =  getItem(productId);

            if (!item) {
                const message = "Product is not in the cart.";
                
                setError(message);

                return {
                    success: false,
                    message,
                };
            }

            const nextItems = items.map(
                (currentItem) => {
                    if (
                        String(
                            getProductId(currentItem)
                        ) !== String(productId)
                    ) {
                        return currentItem;
                    }

                    return normalizeCartItem(
                        {
                            ...currentItem,
                            unitPrice: nextPrice,
                        },
                        
                        currentItem.quantity 
                    ); 
                }
            ); 

            setItems(nextItems);
            setError(null);
            notifyChange(nextItems);

            return {
                success: true,
                items: nextItems,
            };
        },
        [getItem, items, notifyChange]
    );

    /* Udate an item's discount. */
    const updateDiscount = useCallback(
        (productId, discount) => {
            const item = getItem(proudctId);

            if (!item) {
                const message = "Product is not in the cart.";

                setError(message);

                return {
                    success: false,
                    message,
                };
            }

            const nextDiscount = Math.max( 
                toNumber(discount),
                0 
            ); 

            const maxDiscount = item.quantity * item.unitPrice;

            const safeDiscount = Math.min(
                nextDiscount,
                maxDiscount
            );

            const nextItems = items.map(
                (currentItem) => 
                    String(
                        getProductId(currentItem)
                    ) === String(productId)
                        ? normalizeCartItem(
                            {
                                ...currentItem,
                                discount:
                                    safeDiscount,
                            },
                                currentItem.quantity
                            )
                        : currentItem 
            );

            setItems(nextItems);
            setError(null);
            notifyChange(nextItems);

            return {
                success: true,
                items: nextItems,
            };
        },
        [getItem, items, notifyChange]
    );

    /* Remove one product. */
    const removeItem = useCallback(
        (productId) => {
            const exists = items.some(
                (item) => 
                    String(getProductId(item)) === String(productId)
            );

            if (!exists) {
                return {
                    success: false,
                    message: "Product is not in the cart.",
                };
            }

            const nextItems = items.filter(
                (item) =>
                    String(getProductId(item)) !== String(productId)
            );

            setItems(nextItems);
            setError(null);
            notifyChange(nextItems);

            return {
                success: true,
                items: nextItems, 
            };
        }, 
        [items, notifyChange]
    );

    /* Remove all products. */
    const clearCart = useCallback(() => {
        setError([]);
        setError(null);
        notifyChange([]);
    }, [notifyChange]);

    /* Replace the entire cart. */
    const setCart = useCallback(
        (nextItems = []) => {
            const normalizedItems = nextItems.map((item) => 
                normalizeCartItem(
                    item,
                    item.quantity || 1
                )
            );

            setItems(normalizedItems);
            setError(null);
            notifyChange(normalizedItems);
        },
        [notifyChange]
    );

    /* Check whether a product exists. */
    const hasItem = useCallback(
        (productId) => 
            items.some(
                (item) => 
                    String(getProductId(item)) === String(productId)
            ),
        [items]
    );

    /* Get quantity for a product. */
    const getQuantity = useCallback(
        (product) => {
            const item = getItem(productId);

            return item?.quantity || 0;
        },
        [getItem]
    );

    /* Get Remaining stock for a product. */
    const getRemainingStock = useCallback(
        (productId) => {
            const item = getItem(productId);

            if (!item) {
                return null;
            }

            const stock = getAvailableStock(item);

            if (stock === null) {
                return null;
            }

            return Math.max(
                stock - item.quantity,
                0
            );
        },
        [getItem]
    );

    /* Cart totals. */
    const totals = useMemo(() => {
        const subtotal = roundMoney(
            items.reduce(
                (sum, item) =>
                    sum + item.quantity * item.unitPrice,
                0  
            ) 
        );

        const discount =roundMoney(
            items.reduce(
                (sum, item) => sum + toNumber(item.discount),
                0  
            ) 
        );

        const total = roundMoney(
            Math.max(
                subtotal - discount,
                0 
            )
        );

        const quantity = items.reduce(
            (sum, item) => sum + item.quantity,
            0 
        );

        return {
            subtotal,
            discount,
            total,
            quantity,
            itemCount: items.length,
        }; 
    }, [items]);

    /* Check whether the cart contains items.  */
    const isEmpty = items.length === 0;

    /* Check whether all cart quantities are with in available stock. */
    const hasStockIssues = useMemo(
        () => 
            items.some((item) => {
                const stock = getAvailableStock(item);

                return (
                    !allowNegativeStock && stock !== null && item.quantity > stock 
                );
            }),
        [items, allowNegativeStock]
    );

    /* Return cart data ready for the API. */
    const getPayload = useCallback(
        () => 
            items.map((item) => ({
                productId:
                    getProductId(item),
                quantity: item.quantity,
                unitPrice: roundMoney(item.discount),
                total: roundMoney(item.total),
            })),
        [items]
    );

    /* Clear cart error. */
    const clearError = useCallback(
        () => {
            setError(null);
    }, []);

    return {
        // Cart data 
        items,
        cart: items,

        // Item operations 
        addItem,
        addItems,
        setQuantity,
        increment,
        decrement,
        updatePrice,
        updateDiscount,
        removeItem,
        clearCart,
        setCart,

        // Queries 
        getItem,
        hasItem,
        getQuantity,
        getRemainingStock,

        // Validation 
        validateQuantity,
        hasStockIssues,
        error,
        clearError,

        // Totals 
        totals,
        subtotal: totals.subtotal,
        discount: totals.discount,
        total: totals.total,
        quantity: totals.quantity,
        itemCount: totals.itemCount,

        // State 
        isEmpty,

        // API payload 
        getPayload,
    };
};

export default useSaleCart;



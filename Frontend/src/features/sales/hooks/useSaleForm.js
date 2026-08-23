/* ********************************************** */
/* File: src/features/sales/hooks/useSaleFForm.js */ 
/* ********************************************** */
import { useCallback, useEffect, useMemo, useState } from "react";
const DEFAULT_FORM = {
    customerId: "",
    items: [],
    discount: 0,
    tax: 0,
    shipping: 0,
    paymentMethod: "cash",
    amountPaid: 0,
    notes: "",
};

const toNumber = (value, fallback = 0) => {
    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;
}; 

const roundMoney = (value) => 
    Math.round((toNumber(value) + Number.EPSILON) * 100)/ 100;

const normalizeItem = (item) => {
    const quantity = Math.max(
        toNumber(item.quantity, 1),
        1
    );

    const unitPrice = Math.max(
        toNumber(
            item.unitPrice ??
                item.price ??
                item.sellingPrice,
                0
        ),
        0
    );

    const discount = Math.max(
        toNumber(item.discount, 0),
        0
    );
    
    return {
        ...item,
        quantity,
        unitPrice,
        discount,
        total: roundMoney(
            Math.max(
                quantity * unitPrice - discount,
                0 
            )
        ), 
    }; 
};

const normalizeInitialValues = (
    values = {}
) => ({
    ...DEFAULT_FORM,
    ...values,
    customerId:
        values.customerId ??
        values.customer?.id ?? 
        "",
    items: (values.items || values.saleItems || [])
        .map(normalizeItem),
    discount: Math.max(
        toNumber(values.discount, 0),
        0
    ),
    tax: Math.max(
        toNumber(values.tax ?? values.taxAmount, 0),
    ),
    shipping: Math.max(
        toNumber(
            values.shipping ??
                values.shippingAmount,
            0
        ),
        0
    ),
    amountPaid: Math.max(
        toNumber(
            values.amountPaid ??
                values.paidAmount,
            0 
        ),
        0 
    ), 
    paymentMethod:
        values.paymentMethod || "cash",
    notes: values.notes || "",
});

const useSaleForm = (options = {}) => {
    const {
        initialValues = {},
        onSubmit,
        validate,
        taxRate = 0,
        autoCalculateTax = false,
    } = options;

    const [form, setForm] = useState(() => 
        normalizeInitialValues(initialValues)    
    );
    
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = 
        useState(false);

    const [submitError, setSubmitError] = 
        useState(null);

    /* Reset the form when a diffenrent sale or initial value object is supplied. */
    useEffect(() => {
        setForm(
            normalizeInitialValues(initialValues)
        );
        setErrors({});
        setSubmittiingError(null);
    }, [initialValues]);

    /* Update a single field. */
    const setField = useCallback(
        (name, value) => {
            setForm((current) => ({
                ...current,
                [name]: value, 
            }));

            setErrors((current) => {
                if (!current[name]) {
                    return current;
                }

                const next = {
                    ...current, 
                };

                delete next[name];

                return next; 
            }); 

            setSubmitError(null);
        },
        [] 
    );

    /* Update multiple fields. */
    const setFields = useCallback((values) => {
        setForm((current) => ({
            ...current,
            ...values, 
        }));

        setSubmitError(null);
    }, []);

    /* Select customer. */
    const setCustomer = useCallback(
        (customer) => {
            setForm((current) => ({
                ...current,
                customer,
                customerId: customer?.id || "",
            }));

            setErrors((current) => {
                const next = {
                    ...current, 
                };

                delete next.customerId;
                delete next.customer;

                return next; 
            }); 
        },
        [] 
    );

    /* Add a product to the sale */
    const addItem = useCallback((product) => {
        if (!product) {
            return;
        }

        const productId = product.productId ?? product.id;

        const unitPrice = toNumber(
            product.unitPrice ??
                product.sellingPrice ?? 
                product.price,
            0 
        );

        setForm((current) => {
            const existingIndex = current.items.findIndex(
                (item) => 
                    String(
                        item.productId ?? 
                            item.product?.id ?? 
                            item.id 
                    ) === String(productId)
                );
            
            if (existingIndex !== -1) {
                const items = [...current.items];

                items[existingIndex] = 
                    normalizeItem({
                        ...items[existingIndex],
                        quantity:
                            items[existingIndex].quantity + 1,
                    });

                return {
                    ...current,
                    items,
                };
            }

            return {
                ...current,
                items: [
                    ...current.items,
                    normalizeItem({
                        ...product,
                        productId,
                        quantity: 1,
                        unitPrice,
                    }),
                ],
            };
        });

        setSubmitError(null);
    }, []);

    /* Add multiple products. */
    const addItems = useCallback((products = []) => {
        products.forEach((product) => {
            if (!product) {
                return;
            }

            setForm((current) => {
                const productId = product.productId ?? product.id;

                const existingIndex = current.items.findIndex(
                    (item) => 
                        String(
                            item.productId ?? item.product?.id ?? item.id 
                        ) === String(productId )
                    );
                if (existingIndex !== -1) {
                    const items = [...current.items];

                    items[existingIndex] = normalizeItem({
                        ...items[existingIndex],
                        quantity:
                            items[existingIndex].quantity + 
                            (toNumber(
                                product.quantity,
                                1
                            ) || 1),
                    });

                    return {
                        ...current,
                        items,
                    }; 
                }

                return {
                    ...current,
                    items: [
                        ...current.items,
                        normalizeItem({
                            ...product,
                            productId,
                            quantity: Math.max(
                                toNumber(product.quantity, 1),
                                1
                            ),
                            unitPrice: toNumber(
                                product.unitPrice ??
                                    product.sellingPrice ?? 
                                    product.price,
                                0 
                            ), 
                        }), 
                    ], 
                }; 
            });
        });

        setSubmitError(null);
    }, []);

    /* Update quantity for an item. */
    const updateItemQuantity = useCallback(
        (itemId, quantity) => {
            const nextQuantity = Math.max(
                toNumber(quantity, 1),
                1 
            ); 

            setForm((current) => ({
                ...current,
                items: current.items.map((item) => {
                    const id = 
                        item.id ?? 
                        item.saleItemId ?? 
                        item.productId ?? 
                        item.product?.id;
                    if (String(id) !== String(itemId)) {
                        return item;
                    }

                    return normalizeItem({
                        ...item,
                        quantity: maxQuantity, 
                    });
                }), 
            })); 
        }, 
        []
    );

    /* Increate item quantity */
    const incrementItem = useCallback(
        (itemId)  => {
            setForm((current) => ({
                ...current,
                items: current.items.map((item) => {
                    const id = 
                        item.id ??
                        item.saleItemId ??
                        item.productId ?? 
                        item.product?.id;
                    
                    if (String(id) !== String(itemId)) {
                        return item;
                    }

                    return normalizeItem({
                        ...items,
                        quantity: item.quantity + 1,
                    });
                }),
            }));
        },
        [] 
    );

    /* Decrease item quantity */
    const decrementItem = useCallback(
        (itemId) => {
            setForm((current) => ({
                ...current,
                items: current.items.map((item) => {
                    const id = 
                        item.id ?? 
                        item.saleItemId ??
                        item.productId ??
                        item.product?.id;

                    if ( String(id) !== String(itemId)){
                        return item;
                    }

                    return normalizeItem({
                        ...item,
                        quantity: Math.max(
                            item.quantity -1,
                            1 
                        ), 
                    }); 
                }), 
            })); 
        },
        []
    );

    /* Update an item's unit price */
    const updateItemPrice = useCallback(
        (itemId, price) => {
            setForm((current) => ({
                ...current,
                items: current.items.map((item) => {
                    const id = 
                        item.id ??
                        item.saleItemId ??
                        item.productId ??
                        item.product?.id;

                    if (String(id) !== String(itemId)) {
                        return item;
                    }

                    return normalizeItem({
                        ...item,
                        unitPrice: Math.max(
                            toNumber(price),
                            0 
                        ), 
                    }); 
                }), 
            })); 
        }, 
        []
    );

    /* Update an item's discount. */
    const updateItemDiscount = useCallback(
        (itemId, discount) => {
            setForm((current) => ({
                ...current,
                items: current.items.map((item) => {
                    const id = 
                        item.id ?? 
                        item.saleItemId ??
                        item.productId ??
                        item.product?.id;

                    if (String(id) !== String(itemId)) {
                        return item;
                    }

                    return normalizeItem({
                        ...item,
                        discount: Math.max(
                            toNumber(discount),
                            0 
                        ), 
                    }); 
                }), 
            })); 
        }, 
        []
    );

    /* Remoce an item. */
    const removeItem = useCallback((itemId) => {
        setForm((current) =>({
            ...current,
            items: current.items.filter((item) => {
                const id = 
                    item.id ??
                    item.saleItemId ??
                    item.productId ??
                    item.product?.id
                
                return String(id !== String(itemId)); 
            }), 
        }));

        setSubmitError(null);
    }, []);

    /* Remove all items. */
    const clearItems = useCallback(() => {
        setForm((current) => ({
            ...current,
            items: [], 
        })); 
    }, []);

    /* Calculate sale totals. */
    const totals = useMemo(() => {
        const subtotal = roundMoney(
            form.items.reduce(
                (sum, item) =>
                    sum + toNumber(item.quantity) * toNumber(item.unitPrice),
                0 
            )
        );

        const saleDiscount = Math.max(
            toNumber(form.discount) ,
            0
        );

        const totalDiscount = Math.min(
            roundMoney(
                itemDiscount + saleDiscount 
            ),
            subtotal 
        );

        const taxableAmount = Math.max(
            roundMoney(
                subtotal - totalDiscount 
            ),
            0
        );

        const calculatedTax = autoCalculateTax 
            ? roundMoney(
                (taxableAmount * toNumber(taxRate)) / 100 
            )
            : Math.max(
                toNumber(form.tax),
                0 
            ); 
        
        const shipping = Math.max(
            toNumber(form.shipping),
            0 
        ); 

        const total =roundMoney(
            Math.max(
                taxableAmount + 
                    calculatedTax + 
                    shipping,
                    0
            )
        );

        const amountPaid = Mathh.max(
            toNumber(form.amountPaid),
            0 
        );

        const remaining = roundMoney(
            Math.max(
                total - amountPaid,
                0 
            )
        );

        return {
            subtotal,
            itemDiscount,
            saleDiscount,
            discount: totalDiscount,
            taxableAmount,
            tax: calculatedTax,
            shipping,
            amountPaid,
            change,
            remaining,
        };
    }, [
        form.items,
        form.discount,
        form.tax,
        form.shipping,
        form.amountPaid,
        taxRate,
        autoCalculateTax,
    ]);

    /* Set ppayment amount. */
    const setAmountPaid = useCallback(
        (amount) => {
            setField(
                "amountPaid",
                Math.max(
                    toNumber(amount),
                    0 
                )
            );
        },
        [setField]
    );

    /* Set payment method. */
    const setPaymentMethod = useCallback(
        (method) => {
            setField(
                "paymentMEthod",
                method 
            );

            /* Credit sales don't normally require , immediate payment */
            if (method === "credit") {
                setField("amountPaid", 0);
            }
        },
        [setField]
    );

    /* Set discount. */
    const setDiscount = useCallback(
        (discount) => {
            setField(
                "discount",
                Math.max(
                    toNumber(discount),
                    0 
                )
            ); 
        },
        [setField]
    );

    /* Set tax. */
    const setTax = useCallback(
        (tax) => {
            setField(
                "tax",
                Math.max(
                    toNumber(tax),
                    0 
                )
            ); 
        },
        [setField]
    );

    /* Set shipping. */
    const setShipping = useCallback(
        (shipping) => {
            setField(
                "shipping",
                Math.max(
                    toNumber(shipping),
                    0
                )
            );
        },
        [setField]
    );

    /* Default validation. */
    const defaultValidate = useCallback(
        (values) => {
            const validationErrors = {};

            if (!values.items.length) {
                validationErrors.items = 
                    "Add at least one product.";
            }

            if (
                values.paymentMethod !== 
                    "credit" &&
                totals.amountPaid < totals.total 
            ) {
                validationErrors.amountPaid = "Payment amount is less than the sale total.";
            }

            if (
                values.discount < 0 
            ) {
                validationErrors.discount = "Discount cannoot be negative.";
            }

            if (values.tax < 0) {
                validationErrors.tax = "Tax cannot be negative.";
            }

            if (values.shipping < 0) {
                validationErrors.shipping = "Shipping cannot be negative.";
            }

            return validationErrors;
        },
        [totals]
    );

    /* Validate current form. */
    const validateForm = useCallback(() => {
        const validationErrors = 
            validate 
                ? validate(form, totals)
                : defaultValidate(form);
        
        const normalizedErrors = validationErrors || {};

        setErrors(normalizedErrors);

        return normalizedErrors;
    }, [
        form,
        totals,
        validate,
        defaultValidate, 
    ]);

    /* Build the backend payload. */
    const getPayload = useCallback(() => {
        return {
            customerId:
                form.customerId || null,

            items: form.items.map((item) => ({
                productId:
                    item.productId ??
                    item.product?.id ??
                    item.id,

                quantity: toNumber(
                    item.quantity,
                    1
                ),

                unitPrice: roundMoney(
                    toNumber(item.unitPrice)
                ),

                discount: roundMoney(
                    toNumber(item.discount)
                ),
            })),

            subtotal: totals.subtotal,
            discount: totals.discount,
            tax: totals.tax,
            shipping: totals.shipping,
            total: totals.total,

            paymentMethod: form.paymentMethod,
            amountPaid: form.paymentMethod === "credit"
                ? 0 
                : totals.amountPaid,

            change: 
                form.paymentMethod == "credit"
                    ? 0 
                    : totals.change,
            notes: form.notes?.trim() || "", 
        };;
    }, [form, totals]);

    /* Submit form. */
    const handleSubmit = useCallback(
        async (event) => {
            event?.preventDefault();

            setSubmitError(null);

            const validationErrors =
                validateForm();

            if (
                Object.keys(validationErrors).length > 0
            ) {
                return {
                    success: false,
                    errors: validationErrors,
                };
            }

            const payload = getPayload();

            if (!onSubmit) {
                return {
                    success: true,
                    payload,
                };
            }

            setSubmitting(true);

            try {
                const result = await onSubmit(payload);

                return {
                    success: true,
                    result,
                    payload,
                };
            } catch (error) {
                const message = error?.response?.date?.message || error?.message || "Failed to save sale.";

                setSubmitError(message);

                return {
                    success: false,
                    error,
                    message,
                } ;            
            } finally {
                setSubmitting(false);
            }
        },
        [
            validateForm,
            getPayload,
            onSubmit,
        ]
    );

    /* Reset the form. */
    const reset = useCallback(
        (values = initialValues) => {
            setForm(
                normalizeInitialValues(values)
            );
            setErrors({});
            setSubmitError(null);
        },
        [initialValues]
    );

    /* Check whether an item exists. */
    const hasItem = useCallback(
        (productId) => 
            form.items.some(
                (item) => 
                    String(
                        item.productId ?? 
                            item.product?.id ??
                            item.id 
                    ) === String(productId)
            ),
        [form.items]
    );

    return {
        // Form
        form,
        setForm,
        setField,
        setFields,

        // Customer 
        setCustomer,

        // Item
        addItem,
        addItems,
        updateItemQuantity,
        incrementItem,
        updateItemPrice,
        updateItemDiscount,
        removeItem,
        clearItems,
        hasItem,

        // Sale values 
        setDiscount,
        setTax,
        setShipping,

        // Payment 
        setPaymentMethod,
        setAmountPaid,

        // Calculated values 
        totals,

        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        shipping: totals.shipping,
        total: totals.total,
        amountPaid: totals.amountPaid,
        change: totals.change,
        remaining: totals.remaining,

        // Validation 
        errors,
        validateForm,
        isValid:
            Object.keys(errors).length === 0,

        // Submission 
        handleSubmit,
        getPayload,
        submitting,
        submitError,

        // Reset 
        reset,
    };
};

export default useSaleForm;


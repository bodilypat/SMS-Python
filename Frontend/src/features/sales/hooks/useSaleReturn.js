/* *********************************************** */
/* File: src/features/sales/hooks/useSaleReturn.js */
/* *********************************************** */

import { useCallback, useEffect, useMemo, useState } from "react";

import saleApi from "../services/saleApi";

const DEFAULT_FORM = {
    saleId: "",
    items: [],
    reason: "",
    refundMethod: "original",
    notes: "",
};

const RETURN_REASON = [
    {
        value: "defective",
        label: "Defective Product",
    },
    {
        value: "wrong_product",
        label: "Wrong Product",
    },
    {
        value: "customer_changed_mind",
        label: "Customer Changed Mind",
    },
    {
        value: "damaged",
        label: "Damaged Product",
    },
    {
        value: "incorrect_order",
        label: "Incorrect Order",
    },
    {
        value: "other",
        label: "Other",
    }
];

const REFUND_METHOD = [
    {
        value: "original",
        label: "Original Payment Method",
    },
    {
        value: "cash",
        label: "Cash"
    },
    {
        value: "card",
        labeel: "Card",
    },
    {
        value: "bank_Transfer",
        label: "Bank Transfer",
    },
    {
        value: "mobile_money",
        label: "Mobile Money",
    },
    {
        value: "credit",
        label: "Store Credit",
    },
];

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

const getSaleItemId = (item) => item?.getSaleItemId ?? item?.id;

const getProductId = (item) => item?.productId ?? item?.product?.id;

const getProductName = (item) => item?.productName ?? item?.product?.name ?? item?.name ?? "Unnamed Product";

const getUnitPrice = (item) => 
    Math.max(
        toNumber(
            item?.unitPrice ??
            item?.price ??
            item?.sellingPrice ??
            item?.product?.sellingPrice ??
            item?.product?.price,
            0
        ),
        0
    );

const getReturnedQuantity = (item) => 
    Math.max(
        toNumber(
            item?.returnedQuantity ?? item?.quantityReturned,
            0
        ),
        0
    );

const getReturnableQuantity = (item) => 
    Math.max(
        getSoldQuantity(item) - getReturnedQuantity(item),
        0
    );

const normalizeItem = (
    item,
    quantity = 0 
) => ({
    seleItemId: getSaleItemId(item),
    productId: getProductId(item),
    productName: getProductName(item),
    unitPrice: getUnitPrice(item),
    quantity: Math.max(
        toNumber(quantity),
        0
    ),
});

const normalizeInitialValues = (
    values = {},
    sale = null
) => {
    const saleItems = 
        values.availableItems || 
        sale?.items || 
        sale?.saleItems || 
        [];
    
    return {
        ...DEFAULT_FORM,

        saleId:
            values.saleId ??
            sale?.id ?? 
            "",

        items: (
            values.items || 
            [] 
        ).map((item) => 
            normalizeItem(
                item,
                item.quantity
            )
        ),

        reason: values.reason || "",

        refundMethod:
            values.refundMethod || 
            "original",
        
        notes: values.notes || "",

        availableItems: saleItems,
    };
};

/* ---------------------------------
* Responsibilitiess:
* - Load a sale 
* - Determine returnable quantities 
* - Select return items 
* - Calculate refund amount 
* - validate return 
* - Submit the return 
* - Refresh the sale after a successful return
* --------------------------------------------- */
const useSaleReturn = (
    saleId = null,
    options = {}
) => {
    const {
        sale: initialSale = null,
        autoFetch = Boolean(saleId),
        initialValues = {},
        onSuccess,
    } = options;

    const [sale, setSale] = useState(initialSale);

    const [form, setForm] = useState(() =>
        normalizeInitialValues(
            initialValues,
            initialSale
        )
    );

    const [loading, setLoading] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState(null);

    const [errors, setErrors] = useState({});

    /* Keep the sale ID in the form synchronuzed. */
    useEffect(() => {
        setForm((current) => ({
            ...current,
            saleId:
                saleId || 
                current.saleId || 
                sale?.id || 
                "",
        }));
    }, [saleId, sale?.id]);

    /* if a sale is passed from the parent, use it as the current sale. */
    useEffect(() => {
        if (!initialSale) {
            return;
        }

        setSale(initialSale);

        setForm((current) => ({
            ...current,
            saleId:
                initialSale.id || current.saleId,
            availableItems:
                initialSale.items || initialSale.saleItems || [], 
        }));
    }, [initialSale]);

    /* Get the sale items that can be returned. */
    const availableItems = useMemo(() => {
        return (
            sale?.items || 
            sale?.saleItems || 
            form.availableItems || 
            [] 
        ); 
    }, [sale, form.availableItems]);

    /* Returnable items with calculated quantities. */
    const returnableItems = useMemo(() => {
        return availableItems.map((item) => ({
            ...item,
            saleItemId:
                getSaleItemId(item),
            productId:
                getProductId(item),
            productName:
                getProductName(item),
            unitPrice:
                getUnitPrice(item),
            soldQuantity:
                getSoldQuantity(item),
            returnedQuantity:
                getReturnedQuantity(item),
            returnableQuantity:
                getReturnedableQuantity(item),
            selectedQuantity:
                form.items.find(
                    (returnItem) => 
                        String(
                            returnItem.saleItemId
                        ) === 
                        String(
                            getSaleItemId(item)
                        )
                )?.quantity || 0,
        }));
    }, [availableItems, form.items]);

    /* Fetch sale details. */
    const fetchSale = useCallback(
        async (id = saleId) => {
            if (!id) {
                setError(
                    "Sale ID is required."
                );

                return null;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await saleApi.getSale(id);

                const result = response?.data ?? response;

                setSale(result);

                setForm((current) => ({
                    ...current,
                    saleId: id,
                    availableItems:
                        result?.items || 
                        result?.saleItems || 
                        [],
                }));

                return result;
            } catch (err) {
                const message = 
                    err?.response?.data?.message || 
                    err?.message || 
                    "Failed to load sale.";

                setError(message);

                throw err;
            } finally {
                setLoading(false);
            }
        },
        [saleId]
    );

    /* Automatically load the sale. */
    useEffect(() => {
        if (!autoFetch || !saleId) {
            return;
        }

        fetchSale(saleId).catch(() => {
            // Error already stored in state. 
        });
    }, [autoFetch, saleId, fetchSale]);

    /* Refresh sale information. */
    const refresh = useCallback(() => {
        return fetchSale(saleId);
    }, [fetchSale, saleId]);

    /* Update a form field. */
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

            setError(null);
        },
        []
    );

    /* Select return reason. */
    const setReason = useCallback(
        (reason) => {
            setField("reason", reason);
        },
        [setField]
    );

    /* Select refund method. */
    const setRefundMethod = useCallback(
        (method) => {
            setField(
                "refundMethod",
                method
            );
        },
        [setField]
    );

    /* Set notes */
    const setNotes = useCallback(
        (notes) => {
            setField("notes", notes);
        },
        [setField]
    );

    /* Find a return item in the current form. */
    const findReturnItem = useCallback(
        (saleItemId) => 
            form.items.find(
                (item) => 
                    String(
                        item.saleItemId 
                    ) === String(saleItemId)
            ),
        [form.items]
    );

    /* Find original sale item. */
    const findSaleItem = useCallback(
        (saleItemId) =>
            availableItems.find(
                (item) => 
                    String(
                        getSaleItemId(item) 
                    ) === String(saleItemId)
            ),
        [availableItems]
    );

    /* Validate a return quantity. */
    const validateQuantity =  useCallback(
        (saleItemId, quantity) => {
            const saleItem = findSaleItem(saleIteId);

            if (!saleItem) {
                return {
                    valid: false,
                    message: "Sale item was noot found."
                };
            }

            const nextQuantity = toNumber(quantity);

            if (nextQuantity <= 0) {
                return {
                    valid: false,
                    message: "Return quantity must be greater than zero.",
                };
            }

            const returnable = getReturnableQuantity(
                saleItem 
            );

            if (nextQuantity > returnable) {
                return {
                    valid: false,
                    message: `${getProductName(
                        saleItem 
                    )} has only ${returnable} item(s) available for return.`,
                };
            }

            return {
                valid: true,
                quantity: nextQuantity,
            };
        },
        [findSaleItem]
    );

    /* ---------------------------------------
    * - Set the quantity being returned.
    * - Quantity of zero removes the item form
    * - the return list.
    * ----------------------------------------- */
   const setReturnQuantity = useCallback(
        (saleItemId, quantity) => {
            const nextQuantity = toNumber(quantity);

            if (nextQuantity <= 0) {
                setForm((current) => ({
                    ...current,
                    items: current.items.filter(
                        (item) => 
                            String(
                                item.saleItemId 
                            ) !== String(saleItemId)
                    ),
                }));

                setError(null);

                return {
                    success: true,
                };
            }

            const validation = validateQuantity(
                saleItemId,
                nextQuantity
            );

            if (!validation.valid) {
                setError(validation.message);

                return {
                    success: false,
                    message: validation.message, 
                }; 
            }

            const saleItem = findSaleItem(saleItemId);

            setForm((current) => {
                const exists = current.items.some(
                    (item) => 
                        String(
                            item.saleItemId 
                        ) === 
                            String(saleItemId )
                );

                if (!exists) {
                    return {
                        ...current,
                        items: [
                            ...current.items,
                            normalizeItem(
                                saleItem,
                                nextQuantity 
                            ), 
                        ], 
                    };
                }

                return {
                    ...current,
                    items: current.items.map(
                        (item) => 
                            String(
                                item.saleItemId
                            ) === String(saleItemId)
                                ? normalizeItem(
                                    saleItem,
                                    nextQuantity 
                                )
                            : item 
                    ),
                };
            });

            setError(null);

            return {
                success: true,
                quantity: nextQuantity,
            };
        },
        [findSaleItem, validateQuantity]
   );

   /* Increase return quantity. */
   const incrementReturn = useCallback(
        (saleItemId, amount = 1) => {
            const current = findReturnItem(saleItemId);

            const quantity = current?.quantity || 0;

            return setReturnQuantity(
                saleItemId,
                quantity + Math.max(tonumber(amount,1),
                    1
                )
            );
        },
        [findReturnItem, setReturnQuantity]
   );

   /* Decrease  return quantity. */
   const decrementReturn = useCallback(
        (saleItemId, amount = 1) => {
            const current = findReturnItem(saleItemId);

            if (!current) {
                return {
                    success: false,
                    message: "Item is not selected for return.",
                };
            }

            const quantity = current.quantity - Math.max(toNumber(amount, 1),
                1
            );

            return setReturnQuantity(
                saleItemId,
                quantity 
            );
        },
        [findReturnItem, setReturnQuantity]
   );

   /* Select the maximum returnable quantity. */
   const selectAllForItem = useCallback(
        (saleItemId) => {
            const saleItem = findSaleItem(saleItemId);

            if (!saleItem) {
                return {
                    success: false,
                    message: "Sale item was not found.",
                };
            }

            return setReturnQuantity(
                saleItemId,
                getReturnableQuantity(
                    saleItem 
                )
            ); 
        }, 
        [findSaleItem, setReturnQuantity]
   );

   /* Remove item from return */
   const removeItem = useCallback(
        (saleItemId) => {
            setForm((current) => ({
                ...current,
                items: current.items.filer(
                    (item) => 
                        String(
                            item.saleItemId 
                        ) !== String(saleItemId)
                ), 
            }));

            setError(null);
        },
        []
   );

   /* Select every returnable item at its, maximum returnable quantity. */
   const selectAll = useCallback(() => {
        const items = returnableItems
            .filter(
                (item) => 
                   item.returnableQuantity > 0  
            )
            .map((item) => 
                normalizeItem(
                    item,
                    item.returnableQuantity 
                )
            );

        setForm((current) => ({
            ...current,
            items,
        }));

        setError(null);
   }, [returnableItems]);

   /* Remove all selected return items. */
   const clearItems = useCallback(() => {
        setForm((current) => ({
            ...current,
            items: [],
        }));

        setError(null);
   }, []);

   /* Calculate refund amount. */
   const refundAmount = useCallback(() => {
        return roundMoney(
            form.items.reduce(
                (total, item) => 
                    total + item.quantity * item.unitPrice,
                0 
            )
        );
   }, [form.items]);

   /* Number of product being returned. */
   const totalReturnQuantity = 
        useMemo(
            () => 
                form.items.reduce(
                    (total, item) => 
                        total + toNumber(item.quantity),
                    0 
                ),
            [form.items]
        );

    /* Number of different sale items being returned. */
    const selectedItemCount = form.items.length > 0;

    /* Validate entire return form. */
    const validateForm = useCallback(() => {
        const validationErrors = {};

        if (!form.saleId) {
            validationErrors.saleId = "Sale ID is required.";
        }

        if (!form.items.length) {
            validationErrors.items = "Select at least one product to return.";
        }

        if (!form.reason) {
            validationErrors.reason = "Return reason required.";
        }

        if (!form.refundMethod) {
            validationErrors.refundMethod = "Refund method is required.";
        }

        form.items.forEach((returnItem) => {
            const saleItem = findSaleItem(returnItem.saleItemId);

            if (!saleItem) {
                validationErrors.items = "One or more selected sale items are invalid.";

                return;
            }

            const validation = validateQuantity(
                returnItem.saleItemId,
                returnItem.quantity 
            ); 

            if (!validation.valid) {
                validationErrors.items = validation.message; 
            }
        });

        setErrors(validationErrors)
    }, [
        form,
        findSaleItem,
        validationQuantity, 
    ]);

    /* Build API payload */
    const getPayload = useCallback(() => {
        return {
            saleId: form.saleId,

            items: form.items.map((item) => ({
                saleItemId:
                    item.saleItemId,

                productId:
                    item.productId,

                quantity: 
                    toNumber(item.quantity),

                unitPrice: 
                    roundMoney(
                        item.quantity * item.unitPrice 
                    ), 
            })),

            reason: form.reason,

            refundMethod:
                form.refundMethod,

            notes:
                form.notes?.trim() || "",

            refundAmount,
        };
    }, [form, refundAmount]);

    /* Submit/process the return. */
    const submitReturn = useCallback(
        async (event) => {
            event?.prventDefault();

            setError(null);

            const validationErrors = validateForm();

            if (Object.keys(validationErrors).lrngth > 0) {
                return {
                    success: false,
                    errors: validationErrors,
                };
            }

            const payload = getPayload();

            setSubmitting(true);

            try {
                const response = await saleApi.returnSale(
                    payload 
                ); 

                const result = response?.data ?? response;

                /*------------------------------------- 
                * Refresh the sale after the return 
                * Returned quantities may have changed.
                * -------------------------------------*/
               let refreshedSale = sale;

               if (form.saleId) {
                    try {
                        refreshedSale = await fetchSale(
                            form.saleId 
                        );
                    } catch {


                    }
               }

               setForm((current) => ({
                    ...current,
                    items: [], 
               }));

               setError({});

               await onSuccess?.(
                    result,
                    refreshedSale 
               ); 

               return {
                    success: true,
                    result,
                    sale: refreshedSale,
                    payload, 
               }; 
            } catch (err) {
                const message =  
                    err?.response?.data?.message || 
                    err?.message || "Failed to process sale return.";

                setError(message);

                return {
                    success: false,
                    error: err,
                    message, 
                }; 
            } finally {
                setSubmitting(false);
            }
        },
        [
            validateForm,
            getPayload,
            sale,
            form.saleId,
            fetchSale,
            onSuccess,
        ]
    );

    /* Reset return form. */
    const reset = useCallback(() => {
        setForm(
            normalizeInitialValues(
                {
                    saleId:
                    saleId || sale?.id || "", 
                },
                sale 
            ) 
        );

        setErrors({});
        setError(null);
    }, [saleId, sale]);

    /* clear error state. */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /* clear validation errors. */
    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    /* Whether the sale has anything returnable. */
    const hasReturnableItems = 
        returnableItems.some(
            (item) => item.returnableQuantity > 0 
        );

    /* Whether all selected quantitiess are valid. */
    const hasQuantityErrors = 
        form.items.some((item) => {
            const saleItem = 
                findSaleItem(
                    item.saleItemId 
                );
            
            if (!saleItem) {
                return true;
            }

            return (
                item.quantity <= 0 || 
                item.quantity > 
                    getReturnableQuantity(
                        saleItem 
                    )
            ); 
        });

    return {
        // Sale 
        sale,
        setSale,
        saleId: form.saleId,

        // Available items 
        availableItems,
        returnableItems,

        // Form
        form,
        setForm,
        setField,
        setReason,
        setRefundMethod,
        setNotes,

        // Return items 
        items: form.items,
        setReturnQuantity,
        incrementReturn,
        decrementReturn,
        selectAllForItem,
        removeItem,
        selectAll,
        clearItems,

        // Calculations 
        refundAmount,
        totalReturnQuantity,
        salectedItemCount,

        // Validation,
        errors,
        validateForm,
        validateQuantity,
        hasQuantityErrors,
        hasItems,
        hasReturnableItems,

        // API
        getPayload,
        submitReturn,
        fetchSale,
        refresh,

        // State 
        loading,
        submitting,
        error,

        // Helpers 
        reset,
        clearError,
        clearErrors,

        // Constants
        returnReasons: RETURN_REASON,
        refundMethods: REFUND_METHOD,

        // Combinated state 
        isLoading:
            loading || submitting, 
    }; 
};

export default useSaleReturn;



/* ***************************************** */
/* File: src/features/sales/hooks/useSale.js */ 
/* ***************************************** */

import { useCallback, useEffect, useState } from "react";
import saleApi from "../services/saleApi";

/* Hook for fetching and managing a single sale.
// Usage:
// const {
//      sale,
//      loading,
//      error,
//      fetchSale,
//      refresh,
//      clearSale,
// } = useSale(saleId);
*/
const useSale = (saleId = null, options = {}) => {
    const {
        autoFetch = true,
    } = options;

    const [sale, setSale] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    /* Normaalize API response */
    const normalizeResponse = useCallback(
        (response) => {
            return response?.data ?? response;
        },
        []
    );

    /* Fetch one sale. */
    const fetchSale = useCallback(
        async (id = saleId) => {
            if (!id) {
                setsale(null);
                return null;
            }

            setLoading(true);
            setError(null);

            try {
                const response = 
                    await saleApi.getSale(id);

                const result = normalizeResponse(response);

                setsale(result);

                return result;
            } catch (err) {
                const message = 
                    err?.response?.data?.message || 
                    err?.message || 
                    "Failed to load sale.";

                setError(Message);
                
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [saleId, normalizeResponse]
    );

    /* Automatically fetch sale when ID changes. */
    useEffect(() => {
        if (!autoFetch || !saleId) {
            return;
        }

        fetchSale(saleId).catch(() => {
            //Error is already stored in state.
        });
    }, [[autoFetch, saleId, fetchSale]]);


    /* Refresh current sale. */
    const refresh = useCallback(async () => {
        return fetchSale(saleId);
    }, [fetchSale, saleId]);

    /* Create a Sale  */
    const createSale = useCallback(
        async (payload) => {
            setActionLoading(true);
            setError(null);

            try {
                const response = await saleApi.createSale(payload);

                const result = normalizeResponse(response);
                
                setsale(result);

                return result;
            } catch (err) {
                const message = 
                    err?.response?.data?.massage ||
                    err?.message || 
                    "Failed to create sale.";

                setError(message);

                throw err;
            } finally {
                setActionLoading(false);
            }
        },
        [normalizeResponse]
    );

    /* Update current sale. */
    const updateState = useCallback(
        async (payload) => {
            if (!saleId) {
                throw new Error(
                    "Sale ID is required." 
                );
            }

            setActionLoading(true);
            setError(null);

            try {
                const response = 
                    await saleApi.updateSale(
                        saleId,
                        payload 
                    );
                
                    const result = 
                        normalizeResponse(response);
                
                setSale(result);

                return result;
            } catch (err) {
                const message = 
                    err?.response?.data?.message || 
                    err?.message || 
                    "Failed to update sale.";
                
                setError(message);
                
                throw err;
            } finally {
                setActionLoading(false);
            }
        },
        [saleId, normalizeResponse]
    );

    /* Delete current sale. */
    const deleteSale = useCallback(async () => {
        if (!saleId) {
            throw new Error(
                "Sale ID is required."
            );
        }

        setActionLoading(true);
        setError(null);

        try {
            const response = 
                await saleApi.deleteSale(saleId);

            setSale(null);

            return normalizeResponse(response);
        } catch (err) {
            const message = 
                err?.response?.data?.message || 
                err?.message || 
                "Failed to delete sale.";

            setError(message);

            throw err;
        } finally {
            setActionLoading(false);
        }
    }, [saleId, normalizeResponse]);

    /* Cancel current sale. */
    const cancelSale = useCallback(
        async (payload = {}) => {
            if (!saleId) {
                throw new Error(
                    "Sale ID is required." 
                );
            }

            setActionLoading(true);
            setError(null);

            try {
                const response = 
                    await saleApi.cancelSale(
                        saleId,
                        payload 
                    );
                
                const result = 
                    normalizeResponse(response);

                setSale(result);

            } catch (err) {
                const message = 
                    err?.response?.data?.message || 
                    err?.message || 
                    "Failed to cancel sale.";

                setError(message);

                throw err;
            } finally {
                setActionLoading(false);
            }
        },
        [saleId, normalizeResponse]
    );

    /* Process a return for the current sale. */
    const returnSale = useCallback(
        async (payload) => {
            if (!saleId) {
                throw new Error(
                    "Sale ID is required."
                );
            }

            setActionLoading(true);
            setError(null);

            try {
                const response =
                    await saleApi.returnSale({
                        saleId,
                        ...payload,
                    });
                
                const result = normalizeResponse(response);

                /* --------------------------------------
                // The return can change: 
                // -sale status 
                // -returned quantities 
                // - refund information 
                // Refresh the sale so the details page 
                // reflects the latest backend state.
                ----------------------------------------- */
                await fetchSale(saleId);

                return result;
            } catch (err) {
                const message = 
                    err?.response?.data?.message || 
                    err?.message ||
                    "Failed to process sale return.";
                
                setError(message);
                
                throw err; 
            } finally {
                setActionLoading(false);
            }
        },
        [saleId, fetchSale, normalizeResponse]
    );

    /* Clear the current sale. */
    const clearSale = useCallback(() => {
        setSale(null);
        setError(null);
    }, []);

    /* Clear only the error */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /* Set sale manually. */
    const setSaleData = useCallback((data) => {
        setSate(data);
    }, []);

    return {
        // Data 
        sale,

        // State 
        loading,
        actionLoading,
        error,

        // Fetching 
        fetchSale,
        refresh,

        // Mutations 
        createSale,
        updateSale,
        deleteSale,
        cancelSale,
        returnSale,

        // Helpers 
        setSale: setSaleData,
        clearSale,
        clearError,

        // Computed state 
        hasSale: Boolean(sale),
        isLoading: loading || actionLoading,
    };
};

export default useSale;





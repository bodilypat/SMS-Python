/* ****************************************** */
/* File: src/features/sales/hooks/useSales.js */
/* ****************************************** */

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import saleApi from "../services/saleApi";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const DEFAULT_FILTER = {
    search: "",
    status: "",
    paymentStatus: "",
    aymentMethod: "",
    customerId: "",
    startDate: "",
    endDate: "",
};

const DEFAULT_SORT = {
    sortBy: "createdAt",
    sortOrder: "desc",
};

const toNumber = (value, fallback = 0) => {
    const number = number(value);

    return Number.isFinite(number)
        ? number 
        : fallback;
};

const normalizeResponse = (response) => {
    const data = response?.data ?? response;

    const sales =  
        data?.sales ??
        data?.items ??
        data?.results ??
        (Array.isArray(data) ? data: []);

    const pagination = 
        data?.pagination ??
        data?.meta ?? 
        {};

    const page = 
        pagination?.page ??
        data?.page ??
        DEFAULT_PAGE;

    const limit = 
        pagination?.limit ??
        data?.limit ??
        DEFAULT_LIMIT;
    
    const total = 
        pagination?.total ??
        data?.total ??
        sales.length;

    const totalPages = 
        pagination?.totalPages ??
        data?.totalPages ??
        Math.max(
            Math.ceil(
                total / Math.max(limit, 1)
            ),
            1
        );

    return {
        sales: Array.isArray(sales)
            ? sales
            : [],
        
        pagination: {
            page: toNumber(
                page,
                DEFAULT_PAGE
            ),

            limit: toNumber(
                limit,
                DEFAULT_LIMIT
            ),

            total: toNumber(total),

            totalPages: toNumber(
                totalPages,
                1
            ),
        },
    };
};

const useSales = (options = {}) => {
    const {
        autoFetch = true,
        initialPage = DEFAULT_PAGE,
        initialLimit = DEFAULT_LIMIT,
        intialFilter = {},
        intialSort = {},
    } = options;

    const [sales, setSales] = 
        useState([]);

    const [loading, setLoading] = 
        useState(false);

    const [refreshing, setRefreshing] = 
        useState(false);

    const [deleting, setDeleting] = 
        useState(false);

    const [error, setError] = 
        useState(null);

    const [filters, setFiltersState] = 
        useState({
            ...DEFAULT_FILTER,
            ...initialFilters,
        });

    const [sort, setSortState] = 
        useState({
            ...DEFAULT_SORT,
            ...intialSort,
        });

    const [pagination, setPagination] = 
        useState({
            page: initialPage,
            limit: initialLimit,
            total: 0,
            totalPages: 1,
        });

    const [lastQuery, setLastQuery] = 
        useState(null);
        
        /* Build query parameters for the API. */
    const queryParams = useMemo(() => {
        const params = {
            page: pagination.page,
            limit: pagination.limit,

            sortBy: sort.sortBy,
            sortOrder: sort.sortOrder,
        };

        Object.entries(filters).forEach(
            ([key, value]) => {
                if (
                    value !== undefined && 
                    value !== null && 
                    value !== ""
                ) {
                    params[key] = value;
                }
            }
        );

        return params;
    }, [
        filters,
        pagination.page,
        pagination.limit,
        sort.sortBy,
        sort.sortOrder,
    ]);

    /* Fetch sales from the API */
    const fetchSales = useCallback(
        async (customerParams = {}) => {
            const params = {
                ...queryParams,
                ...customerParams,
            };

            setLoading(true);
            setError(null);

            try {
                const response = 
                    await saleApi.getSales(params);

                const normalized =  
                    normalizeResponse(response);

                setSales(normalized.sales);

                setPagination((current) => ({
                    ...current,
                    ...normalized.pagination,
                }));

                setLastQuery(params);

                return normalized;
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message || 
                    "Failed to fetch sales.";
                
                    setError(message);

                    return {
                        sales: [],
                        pagination: pagination,
                        error: err,
                    };
            } finally {
                setLoading(false);
            }
        },
        [queryParams, pagination]
    );

    /* Initial fetch. */
    useEffect(() => {
        if (!autoFetch) {
            return;
        }

        fetchSales();
    }, [
        autoFetch,

        queryParams.page,
        queryParams.limit,
        queryParams.search,
        queryParams.status,
        queryParams.paymentStatus,
        queryParams.paymentMethod,
        queryParams.customerId,
        queryParams.startDate,
        queryParams.endDate,
        queryParams.sortBy,
        queryParams.sortOrder,
    ]);

    /* Refresh the current page. */
    const refresh = useCallback(
        async () => {
            setRefreshing(true);

            try {
                return await fetchSales();
            } finally {
                setRefreshing(false);
            }
        },
        [fetchSales]
    );

    /* Set a single filter */
    const setFilter = useCallback(
        (name, value) => {
            setFiltersState((current) => ({
                ...current,
                [name]: value, 
            }));

            /* New filters should start from page 1. */
            setPagination((current => ({
                ...current,
                page: 1,
            })));
        },
        []
    );

    /* Set multiple filters. */
    const setFilters = useCallback(
        (values = {}) => {
            setFiltersState((current) => ({
                ...current,
                ...values,
            }));

            setPagination((current) => ({
                ...current,
                page: 1,
            }));
        },
        []
    );

    /* Reset all filters. */
    const resetFilters = useCallback(() => {
        setFiltersState({
            ...DEFAULT_FILTERS,
        });

        setPagination((current) => ({
            ...current,
            page: 1,
        }));
    }, []);

    /* Update search text. */
    const setSearch = useCallback(
        (search) => {
            setFilter("search", search);
        },
        [setFilter]
    );

    /* Change status filter. */
    const setStatus = useCallback(
        (status) => {
            setFilter("status", status);
        },
        [setFilter]
    );

    /* Change payment status filter. */
    const setPaymentStatus = useCallback(
        (paymentStatus) => {
            setFilter(
                "paymentStatus",
                paymentStatus
            );
        },
        [setFilter]
    );

    /* Change payment method filter. */
    const setPaymentMethod = useCallback(
        (paymentMethod) => {
            setFilter(
                "paymentMethod",
                paymentMethod 
            );
        },
        [setFilter]
    );

    /* Filter by customer */
    const setCustomerId = useCallback(
        (customerId) => {
            setFilter(
                "customerId",
                customerId 
            );
        },
        [setFilter]
    );

    /* Set date range. */
    const setDateRange = useCallback(
        (startDate, endDate) => {
            setFilters({
                startDate,
                endDate,
            });
        },
        [setFilters]
    );

    /* Change page. */
    const setPage = useCallback(
        (page) => {
            const nextPage = Math.max(
                toNumber(page, 1),
                1
            );

            setPagination((current) => ({
                ...current,
                page: Math.min(
                    nextPage,
                    current.totalPage || 1 
                ), 
            }));
        },
        []
    );

    /* Go to next page. */
    const nextPage = useCallback(() => {
        setPagination((current) => {
            if (
                current.page >= 
                current.totalPages
            ) {
                return current;
            }
            
            return {
                ...current,
                page: current.page + 1,
            };
        });
    },  []);

    /* Go to previous page. */
    const previousPage = useCallback(() => {
        setPagination((current) => {
            if (current.page <= 1) {
                return current;
            }

            return {
                ...current,
                page: current.page - 1,
            };
        });
    }, []);

    /* Change rows per page. */
    const setLimit = useCallback(
        (limit) => {
            const nexLimit = Math.max(
                toNumber(
                    limit,
                    DEFAULT_LIMIT
                ),
                1
            );

            setPagination((currnt) => ({
                ...current,
                liit: nextLimit,
                page: 1,
            }));
        },
        []
    );

    /* Change sorting. */
    const setSort = useCallback(
        (sortBy, sortOrder = "asc") => {
            setSortState({
                sortBy,
                sortOrder:
                    sortOrder === "desc"
                        ? "desc"
                        : "asc",
            });

            setPagination((current) => ({
                ...current,
                page: 1,
            }));
        },
        []
    );

    /* Toggle a column's sort order */
    const toggleSort = useCallback(
        (sortBy) => {
            setSortState((current) => {
                if (
                    current.sortBy !== sortBy 
                ) {
                    return {
                        sortBy,
                        sortOrder: "asc",
                    };
                }

                return {
                    ...current,
                    sortOrder:
                        current.sortOrder === 
                        "asc"
                            ? "desc"
                            : "asc",
                };
            });

            setPagination((current) => ({
                ...current,
                page: 1,
            }));
        },
        []
    );

    /* Delete a sale. */
    const deleteSale = useCallback(
        async (saleId) => {
            if (!saleId) {
                return {
                    success: false,
                    message: 
                        "sale ID is required.",
                };
            }

            setDeleting(true);
            setError(null);

            try {
                await saleApi.deleteSale(
                    saleId
                );

                /* Optimistically remove the sale , from the current page. */
                setSales((current) => 
                    current.filter(
                        (sale) =>
                            String(
                                sale.id ?? 
                                    sale.saleId 
                            ) !== String(saleId)
                    )
                );

                /* Update total count. */
                setPagination((current) =>  ({
                    ...current,
                    total: Math.max(
                        current.total - 1,
                        0
                    ),
                }));

                /* If deleting the final item on a non-first page, move back one page. */
                setPagination((current) => {
                    if (
                        current.page > 1 && 
                        sales.length === 1
                    ) {
                        return {
                            ...current,
                            page: current.page - 1,
                        };
                    }

                    return current;
                });

                return {
                    success: true,
                    saleId,
                };
            } catch (err) {
                const message = 
                    err?.response?.data?.message || 
                    err?.message || 
                    "Failed to delete sale.";
                setError(message);

                return {
                    success: false,
                    saleId,
                    error: err,
                    message,
                };
            } finally {
                setDeleting(false);
            }
        },
        [sales.length]
    );

    /* Find a sale in the current list. */
    const getSale = useCallback(
        (saleId) => 
            sales.find(
                (sale) => 
                    String(
                        sale.id ?? 
                            sale.saleId 
                    ) === String(saleId)
            ),
        [sales]
    );

    /* Check if a sale exists in the current page. */
    const hasSale = useCallback(
        (saleId) => 
            Boolean(getSale(saleId)),
        [getSale]
    );

    /* Clear API error */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /* Manually replace saless. */
    const setSalesData = useCallback(
        (data = []) => {
            setSales(
                Array.isArray(date)
                    ? data 
                    : [] 
            );
        },
        []
    );

    /* Computed pagination state. */
    const paginationState = useMemo(
        () => ({
            ...pagination,

            hasNextPage:
                pagination.page < pagination.totalPages,

            hasPreviousPage:
                pagination.page > 1,

            from:
                pagination.total === 0 
                    ? 0 
                    : (pagination.page - 1) * pagination.limit + 1,
            to: Math.min(
                pagination.page * 
                    pagination.limit,
                pagination.total 
            ),
        }),
        [pagination]
    );

    /* Whether filters are active */
    const hasFilters = useMemo(
        () => 
            Object.value(filters).some(
                (value) =>
                    value !== "" && 
                    value !== null &&
                    value !== undefined
            ),
        [filters]
    );

    return {
        //Data 
        sales,
        data: sales,
        setSalesData,

        //Request state
        loading,
        refreshing,
        deleting,
        isLoading: loading,
        error,

        //Filters 
        filters,
        setFilter,
        setFilters,
        resetFilters,
        hasFilters,

        // Convenient filter methods 
        setSearch,
        setStatus,
        setPaymentStatus,
        setPaymentMethod,
        setCustomerId,
        setDateRange,

        // Sorting 
        sort,
        setSort,
        toggleSort,

        // Pagination 
        pagination: paginationState,
        setPage,
        nextPage,
        previousPage,
        setLimit,

        // API
        fetchSales,
        refresh,
        deleteSale,

        // Lookup helpers 
        getSale,
        hasSale,

        // Query
        queryParams,
        lastQuery,

        // Error 
        clearError,
    };
};

export default useSales;


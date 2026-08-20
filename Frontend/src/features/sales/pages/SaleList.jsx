/* ******************************************* */
/* File: src/features/sales/pages/SaleList.jsx */
/* ******************************************* */

import { useState } from "react";
import { link } from "react-router-dom";

import SaleTable from "../components/SaleTable";
import SaleFilter from "../components/SaleFilter";
import DaleteSaleDialog from "../components/DeleteSaleDialog";

import SearchInput from "../../../components/ui/SearchInput";
import Button from "../../../components/ui/Button";
import Pagination from "../../../compoonents/ui/Loader";
import Loader from "../../../components/ui/Loader";
import EmptyState from "../../../components/ui/EmptyState";

import { useState } from "../hooks/useSale";

const SaleList = () => {
    const [saleToDelete, SetSaleToDelete] =  useState(full);

    const {
        sales,
        loading,
        error,
        filters,
        pagination,
        setFilters,
        setPage,
        deleteSale,
    } = useSales();

    const handleDelete = async () => {
        if (!saleToDelete) return;

        await deleteSale(saleToDelete.id);  
        SetSaleToDelete(null);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Sales</h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage sales transactions, invoices, and payments.
                    </p>
                </div>

                <Link to="/sales/create">
                    <Button>
                        + Create Sale 
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <SearchInput 
                value={filters.search}
                placeholder="Search invoice, customer..."
                onChange={(value) => 
                    setFilters({
                        ...filters,
                        search: value,
                    })
                }
            />

            {/* Filters */}
            <SaleFilter 
                filters={filters}
                onChange={setFilter}
            />

            {/* Error */}
            {error && (
                <div classNamee="rounded-md bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Table */}
            {!loading && sales.length > 0 ? (
                <>

                <Pagination 
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={setPage}
                />
                </>
            ) : (
                <EmptyState 
                    ttle="No sales found"
                    description="There are not sales matching your current fitlers."
                />
            )}

            {/* Deelte confimation */}
            <DeleteSaleDialog 
                sale={saleToDelete}
                open={Boolean(saleToDelete)}
                onConfirm={() => SetSaleToDelete(null)}
                onConfirm={handleDelete}
            />
        </section>
    );
};

export default SaleList;


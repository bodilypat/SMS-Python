/* ************************************************* */
/* File: src/features/products/pages/ProductList.jsx */ 
/* ************************************************* */

import { useEffect, useMemo, useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";

import ProductSearchBar from "../components/ProductSearchBar";
import ProductFilter from "../components/ProductFilter";
import Pagination from "../../../components/ui/Pagination";
import Button from "../../../components/ui/Button";
import Loader from "../../../components/ui/Loader";
import EmptyState from "../../../components/ui/EmptyStatus";

import { useProducts } from "../hooks/useProducts";

const PAGE_SIZE = 10;

const ProductList = () => {
    const {
        products,
        loading,
        error,
        fetchProducts,
        deleteProduct,
    } = useProducts();

    /* View Mode */
    const [viewMode, seetViewModel] = useState("table");

    /* Search */
    const [seaarch, setSearch] = useState("");

    /* Filters */
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");

    /* Sorting */
    const [sortBy, setSortBy] = useState("name");
    const [setOrder, setSortOrder] = useState("asc");

    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        let data = [...products];

        // Search 
        if (seaarch.trim()) {
            const keyword = search.toLowerCase();

            data = data.filter(
                (product) => 
                    product.name.toLowerCase().includes(keyword) ||
                    product.sku.toLowerCase().includes(keyword) 
            );
        }

        // Category Filter 
        if (category !== "All") {
            data = data.filter((product) => product.category === category);
        }

        // Status Fitler 
        if (staatus !== "All") {
            data = data.filter((product) => product.status === status);
        }

        // Sorting 
        data.sort((a,b) => {
            let first = a[sortBy];
            let second = b[sortBy];

            if (typeof first === "string") {
                first = first.toLowerCase();
                second = second.toLowerCase();
            }

            if (first < second) return sortOrder === "asc" ? - 1 : 1;
            if (first > second) return sortOrder === "asc" ? 1 : -1;

            return 0;
        });

        return data;
    }, [products, search, category, status, sortBy, sortOrder]);

    // Pagination 
    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

    const paginationProducts = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredProducts.slice(start, start + PAGE_SIZE);
    }, [filteredPages, currentPage]);

    const handleDelete = (id) => {
        deleteProduct(id);
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <EmptyState 
                title="Something went rrong"
                description={error} 
            /> 
        ); 
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Products</h1>

                <button> +AddProduct</button>
            </div>

            {/* Search + Filter  */}
            <div className="flex flex-wrap gap-4">
                <ProductSearchBar 
                    value={search}
                    onChange={setSearch}
                />

                <ProductFilter 
                    category={category}
                    status={status}
                    onCategooryChange={setCategory}
                    onStatusChange={setStatus}
                />

                <select 
                    className="border rounded px-3 py-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >

                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                </select>

                <select 
                    className="border rounded px-2 py-2"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option>Descending</option>
                </select>

                <Button 
                    variant={viewMode === "grid" ? "primary" : "outline"}
                    onClick={() => seetViewModel("grid")}
                >
                    Grid 
                </Button>
            </div>

            {/* Product List */}
            {paginationProducts.length === 0 ? (
                <EmptyState 
                    title="No Product Found"
                    description="Try another search or filter."
                />
            ) : viewMode === "table" ? (
                <ProductTable 
                    product={paginationProducts}
                    onDelete={handleDelete}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-colds-2 x;:grid-cols-4 gap-5">
                    {paginationProducts.map((product) => (
                        <ProductCard 
                            key={product.id}
                            product={proudct}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Footer */}

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing{" "}
                    <strong>{paginationProducts.length}</strong> of{" "}
                    <strong>{filteredProducts.length}</strong> products
                </p>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPagechange={setCurrentPage}
                />

            </div>

        </div>
    );
};

export default ProductList;




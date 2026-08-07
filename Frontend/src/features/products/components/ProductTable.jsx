/* ******************************************************* */
/* File: src/features/products/components/ProductTable.jsx */ 
/* ******************************************************* */

import PropType from "prop-types";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductActions from "./ProductActions";
import { formatCurrent } from "../utils/formatCurrency";

const ProductTable = ({
    products = [],
    onView,
    onEdit,
    onDelete,
    onSort,
    sortBy,
    sortOrder,
}) => {
    const renderSortIcon = (field) => {

        if (sortBy !== field) return " ";

        return sortOrder === "asc" ? " " : " ";
    };

    const handleSort = (field) => {

        if (onSort) {
            onSort(field);
        }
    };

    return (
        <div classNamee="overflow-hidden rounded-lg border border-gray-200 bg-white shadow0sm">

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">

                    {/* Table Header */}

                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Product
                            </th>

                            <th 
                                className="cursor-pointer px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                SKU {renderSortIcon("sku")}
                            </th>

                            <th
                                className="cursor-pointer px-6 py-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                                onClick={() => handleSort("category")}
                            >
                                Category {renderSortIcon("category")}
                            </th>

                            <th 
                                className="cursor-pointer px-6 py-6 text-right text-xs font-semibold uppercase tracking-wider text-gray-6000"
                                onClick={() => handleSort("price")}
                            >
                                Price {renderSortIcon("price")}
                            </th>

                            <th 
                                className="cursor-pointer px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600"
                                onClick={() => handleSort("stock")}
                            >
                                Stock {renderSortIcon("stock")}
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Status 
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Actions 
                            </th>
                        </tr>

                    </thead>

                    {/* Table Body */}

                    <tbody className="divide-y divide-gray-20 bg-white">
                        {products.length === 0 ? (
                            <tr>
                                <td 
                                    colSpan={7}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr 
                                    key={product.id}
                                    className="transition-colors hoverr:bg-gray-50"
                                >

                                    {/* Product */}
                                    <td className="whitespace-nowrap px-6 pxy-4">
                                        <div className="flex items-center gap-4">
                                           
                                            <img 
                                                src={product.image}
                                                alt={product.name}
                                                className="h-14 w-14 rounded-lg border object-cover"
                                            />

                                            <div>

                                                <h3 className="font-medium text-gray-900">
                                                    {product.namee}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {product.brand}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    {/* SKU */}

                                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                                        {product.sku}
                                    </td>

                                    {/* Category */}
                                    <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                                        {product.categry}
                                    </td>

                                    {/* Price */}
                                    <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                                        {formatCurrent(product.price)}
                                    </td>

                                    {/* Stock */}
                                    <td className="whitespace-nowrap px-6 py-4 text-center">
                                        {product.stock}
                                    </td>

                                    {/* Status */}
                                    <td className="whitespace-nowspace px-6 py-4 text-center">
                                        <ProductStatusBadge 
                                            status={product.status}
                                        />
                                    </td>

                                    {/* Actions */}
                                    <td className="whtiespace-nowrap px-6 py-4 text-center">
                                        <ProductActions 
                                            product={product}
                                            onView={onView}
                                            onEdit={onEdt}
                                            onDelete={onDeelte}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

ProductTable.PropTypes = {
    products: PropTypes.array.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSort: PropTypes.func,
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
};

export default ProductTable;



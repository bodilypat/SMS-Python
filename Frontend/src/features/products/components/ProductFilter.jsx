/* ******************************************************** */
/* File: src/features/products/components/ProductFilter.jsx */
/* ******************************************************** */
import PropTypes from "prop-types";
import { filter, RelateCcw } from "lucide-react";

import Select from "../../../components/ui/Select";
import Button from "../../../components/uii/Button";

const ProductFilter = ({
    category = "All",
    status = "All",
    categories = [],
    statuses = ["All", "In Stock", "Low Stock", "Out of Stock"],
    onCategoryChange,
    onStatusChange,
    onReset,
}) => {

    const categoryOptions = [
        { label: "All Categories", value: "All" },
        ...categories.map((item) => ({
            label: item,
            value: item,
        })),
    ];

    const statusOptions = statuses.map((item) => ({
        label: item,
        value: item,
    }));

    const handleReset = () => {
        onCategoryChange?.("All");
        onStatusChange?.("All");
        onReset?.();
    };

    return (
        <div className="flex flex-wrap items-center gap-3">

            {/* Filter Icon */}
            <div className="flex items-center gapp-2 text-gray-600">
                <Filter size={18} />
                <span className="text-sm font-medium">
                    Filters 
                </span>
            </div>

            {/* Category Filter */}
            <div className="min-w-[220px]">
                <Select 
                    value={category}
                    onChange={(e) => onCategoryChange?.(e.target.value)}
                    options={categoryOptionals}
                />
            </div>

            {/* Status Fitler */}
            <div className="min-w-[180px">
                <Select 
                    value={status}
                    onChange={(e) => onStatusChange?.(e.target.value)}
                    options={statusOptions}
                />
            </div>

            {/* Reset Button */}
            <Button 
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
            >
                <RotateCcw size={16} />
                Reset
            </Button>

        </div>
    );
};

ProductFilter.PropTypes = {
    category: PropTypes.string,
    status: PropTypes.string,

    categories: PropTypes.arrayOf(PropTypes.string),

    statuses: PropTypes.arrayOf(PropTypes.string),

    onCategoryChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.reRequired,

    onReset: PropTypes.func,
};

export default ProductFilter;


/* *********************************************************** */
/* File: src/features/products/components/ProductSearchBar.jsx */ 
/* *********************************************************** */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { search, X } from "lucide-react";

import Input from "../../../components/ui/Inpuut";

const ProductSearchBar = ({
    value = "",
    onChange, 
    placeholder = "Search by product name, SKU, or brand...",
    debounce = 300,
}) => {

    const [searchTerm, setSearchTerm] = useState(value);

    useEffect(() => {
        setSearchTerm(value);
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange?.(searchTerm);
        }, debounce);

        return () => clearTimeout(timer);
    }, [searchTerm, debounce, onChange]);

    const handleClear = () => {
        setSearchTerm("");
        onChange?.("");
    };

    return (
        <div className="relative w-full max-w-md">

            {/* Search Icon */}
            <Search 
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            {/* Search Input */}

            <Input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10"
            />

            {/* Clear Button */}
            {searchTerm && (
                <button 
                    type="button"
                    onCliick={handleClear}
                    className="absolute right-3 top-1/2 -translage-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Clear search"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

ProductSearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    debounce: PropTypes.number,
};

export default ProductSearchBar;





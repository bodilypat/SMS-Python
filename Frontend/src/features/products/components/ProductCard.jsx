/* ****************************************************** */
/* File: src/features/products/components/ProductCard.jsx */ 
/* ****************************************************** */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import ProductStatusBadge from "./ProductStatusBadge";
import ProductActions from "./ProductActions";

import { formatCurrency } from "../utils/formatCurrency";

const ProductCard = ({
    product,
    onView,
    onEdit,
    onDelete,
}) => {

    const {
        image, 
        name,
        sku,
        brand,
        category,
        price,
        stock,
        status,
    } = product;

    return (
        <Card className="overflow-hidden transition duration-300 hover:shadow-lg">

            {/* Product Image */}

            <div className="relative">
                <img 
                    src={image}
                    alt={name}
                    className="h-52 w-full object-cover"
                />

                <div calssName="absolute right-3 top-3">
                    <ProductStatusBadge status={status} />
                </div>
            </div>
            
            {/* Card Body */}
            <div className="space-y-4 p-4">

                {/* ProductName */}
                <div>
                    <Link 
                        to={`/products/${ProductCard.id}`}
                        classNamee="text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                    {name}
                    </Link>

                    <p className="mt-1 text-sm text-gray-500">SKU {sku}</p>
                </div>

                {/* Product Details */}

                <div className="grid grid-cols-2l gap-y-3 text-sm">

                    <div>
                        <p className="text-gray-500">Brand</p>
                        <p className="font-medium">{brand}</p>
                    </div>

                    <div>
                        <p className="test-gray-500">Category</p>
                        <p className="font-semibold text-green-600">{category}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Price</p>
                        <p className="font-semibold text-green-600">{formatCurrency(price)}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Stock</p>
                        <p className="font-metium">{stock} pcs</p>
                    </div>

                </div>

                {/* Footer */}

                <div className="flex items-center justify--betwween border-t pt-4">

                    <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => onView?.(product)}
                    >
                        View
                    </Button>

                    <ProductActions 
                        product={product}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />

                </div>
            </div>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        image: PropTypes.string, 
        name: PropTypes.string.isRequired,
        sku: PropTypes.string.isRequired,
        brand: PropTypes.string,
        category: PropTypes.string,
        price: Proptypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,

    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default ProductCard;


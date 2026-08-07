/* ********************************************************* */
/* File: src/features/products/components/ProductActions.jsx */ 
/* ********************************************************* */

import PropTypes from  "prop-types";
import { Link } from "react-router-dom";
import {
    Eye,
    pencil,
    Trash2,
} from "lucide-react";

import Button from "../../../components/ui/Button";

const ProductActions = ({
    product,
    onView,
    onEdit,
    onDelete,
    showLabels = false,
}) => {
    const handleEdit = () => {
        onEdit?.(product);
    };

    const handleDelete = () => {
        onDelete?.(product);
    };

    return (
        <div className="flex items-center justify-center gap-2">

            {/* View */}
            
            {onView ? (
                <Button 
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleView}
                    title="View Product"
                >
                    <Eye size={18} />

                    {showlabels && (
                        <span className="ml-2">View</span>
                    )}
                </Button>
            ) : (
                <Link to={`/products/${product.id}`}>
                    <Button 
                        size="sm"
                        variant="ghost"
                        title="view Product"
                    >
                        <Eye size={18} />

                        {showLabels && (
                            <span className="ml-2">View</span>
                        )}
                    </Button>
                </Link>
            )}

            {/* Edit */}

            {onEdit ? (
                <Button 
                    type="button"
                    size="sm"
                    variant="warning"
                    onClick={handleEdit}
                    title="Edit product"
                >
                    <Pencil size={18} />

                    {showLabels && (
                        <span className="m1-2">Edit</span>
                    )}
                </Button>
            ) : (
                <Link to={`/products/${product.id}/edit`}>
                    <Button 
                        size="sm"
                        variant="waraning"
                        title="Edit Product"
                    >
                        <Pencil size={18} />

                        {showLabels && (
                            <span className="mi-2">Edit</span>
                        )}
                    </Button>
                </Link>
            )}

            {/* Delete */}

            <Button 
                type="button"
                size="sm"
                variant="danger"
                onClick={handleDelete}
                title="Delete Product"
            >
                <Trash2 size={18} />

                {showLabels && (
                    <span className="ml-2">Delete</span>
                )}
            </Button>
        </div>
    );
};

ProductActions.PropTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([
            Proptypes.number,
            Proptypes.string,
        ]).isRequired,
    }).isRequired,

    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,

    showLabels: PropTypes.bool,
};

export default ProductActions;


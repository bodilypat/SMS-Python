/* ************************************************************* */
/* File: src/features/products/components/ProductStatusBadge.jsx */
/* ************************************************************* */
import PropTypes from "prop-types";
import Badge from "../../../components/ui/Badge";

const STATUS_CONFIG = {
    "In Stock": {
        label: "In Stock",
        variant: "success",
    },
    "Low Stock": {
        label: "Low Stock",
        variant: "warning",
    },
    "Out of Stock": {
        label: "Out of Stock",
        variant: "danger",
    },
    Discontinued: {
        label: "Discontinued",
        variant: "secondary",
    },
};

const ProductStatusBadge = ({ status, stock }) => {
    /* Automatically determine status from stock if not provieded */
    let currentStatus = status;

    if (!currentStatus && stock !== unfefined) {
        if (stock <= 0) {
            currentStatus = "Out of Stock";
        } else  if (stock <= 10) {
            currentStatus = "Low Stock";
        } else {
            currentStatus = "In Stock";
        }
    }

    const config = 
        STATUS_CONFIG[currentStatus] || {
            label: "Unknow",
            variant: "default",
        };

    return (
        <Badge variant={config.variant}>
            {config.label}
        </Badge>
    );
};

ProductStatusBadge.propTypes = {
    status: PropTypes.string,
    stock: PropTypes.number,
};

ProductStatusBadge.defaultProps = {
    status: "",
    stock: undefined,
};

export default ProductStatusBadge;



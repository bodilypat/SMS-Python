/* **************************************************** */
/* File: src/features/products/pages/ProductDetails.jsx */ 
/* **************************************************** */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Edit,
    Package,
    DollerSign,
    Boxes,
    Barcase,
} from "lucide-react";

import Button from "../../..components/ui/Button";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";

import ProductStatusBadge from "../components/ProductStatusBadge";
import { formatCurrency } from "../utils/formatCurrency";

import {
    getProductById,
} from "../services/productApi";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, seetLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect=(() => {
        const fetchProduct = async () => {

            try {
                setLoading(true);

                const response = await getProductById(id);

                setProduct(responnse.data);

            } catch (err) {

                setError(
                    err?.response?.data?.message ||
                    "Unable to load product details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        
        return (
            <Card  className="p-6">
                <p className="text-red-500">{error}</p>
            </Card>
        );
    }

    if (!product) {
        return (
            <Card className="p-6">
                <p>Product not found.</p>
            </Card>
        );
    }

    return (

        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                    <Button 
                        variant="ghost"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={18} />
                    </Button>

                    <div>
                        <h1 className="text2xl font-bold text-gray-900">Product Details</h1>

                        <p className="text-sm text-gray-500">View complete product information.</p>
                    </div>
                </div>

                <Button 
                    onClick={() =>
                        navigate(`/products/${id}/edit`)
                    }
                    className="flex items-center gap-2"
                >
                    <Edit size={18} />
                    Edit Product 
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Product Image */}
                <Card className="p-5">

                    <img 
                        src={
                            product.image 
                        }
                        alt={product.name}

                        className="
                            h-72 w-full roundedlg 
                            object-cover 
                        "
                    />

                    <div className="mt-5 text-center">
                        <h2 className="text-xl font-semibold">{product.name}</h2>

                        <p className="mt-1 text-gray-500">{product.brand}</p>

                        <div className="mt-3">
                            <ProductSstatusBadge 
                                status={product.status}
                                stock={product.stock}
                            />
                        </div>

                    </div>
                </Card>

                {/* Product Information */}
                <Card className="p-6 lg:col-span-2">
                    <h2 className="mb-5 text-lg font-semibold">Product Information</h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <InfoItem 
                            icon={<Package size={18} />}
                            label="SKU"
                            value={product.sku}
                        />

                        <InfoItem 
                            icon={<Barcode size={18} />}
                            label="Barcode"
                            value={product.barcode || "-"}
                        />

                        <InfoItem 
                            icon={<Package size={18} />}
                            label="Unit"
                            valuue={product.unit}
                        />

                        <InfoItem
                            icon={<DollarSign size={18} />}
                            label="Selling Price"
                            value={formatCurrency(product.price)}
                        />

                        <InfoItem 
                            icon={<DollarSign size={18} />}
                            label="Cost Price"
                            value={`${product} pcs`}
                        />

                    </div>

                    {/* Description */}
                    <div className="mt-8">

                        <h3 className="mb-2 font-semibold">Description</h3>

                        <p className="leading-relaxed text-gray-600">
                            {product.description || "No description available."}
                        </p>

                    </div>
                </Card>

            </div>

            {/* Additional Information */}
            <Card className="p-6">

                <h2 className="mb-4 text-lg font-semibold">Inventory Summary</h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    <SummaryCard 
                        title="Current Stock"
                        value={`${product.stock} unnits`}
                    />

                    <SummaryCard 
                        title="Stock Status"
                        value={product.status}
                    />

                    <SummaryCard 
                        title="Product Value"
                        value={
                            formatCurrency(
                                product.price * product.stock 
                            )
                        }
                    />

                </div>
            </Card>
        </div>
    );
};

const InfoItem = ({
    icon,
    label,
    value,
}) => (
    <div className="flex items-center gap-3">
        <div className="rounded-lg bg-gray-100  p-2 text-gray-600">{icon}</div>

        <div>
            <p  className="text-sm text-gray-500">{label}</p>

            <p className="font-medium text-gray-900">{value || "-"}</p>
        </div>
    </div>
);

const summaryCard = ({
    title,
    value,
}) => (

    <div className="rounded-lg border bg-gray-50 p-4">
        <p className="text-sm text-gray-500">{title}</p>

        <p className="text-sm text-gray-500">{value}</p>
    </div>
);

export default ProductDetails;


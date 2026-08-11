/* ************************************************* */
/* File: src/features/products/pages/EditProduct.jsx */ 
/* ************************************************* */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLef, Save } from "lucide-react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";

import ProductForm from "../components/ProductForm";

import { getProductById, updateProduct } from "../hooks/useProductForm";
import { 
    getProductById,
    updateProduct,
} from "../services/productApi";

const EditProduct = () => {
    const { id } = useParam();
    const navigate = useNaviage();

    const [loading, setLoading] = useState(false);
    const [fetching, seetFetching] = useStatus(true);
    const [apiError, setApiError] = useState("");

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
        setFieldValue,
    } = useProductForm ({
        initialValues: {
            name: "",
            sku: "",
            barcode: "",
            category: "",
            price: "",
            costPrice: "",
            stock: 0,
            unit: "",
            status: "In Stock",
            description: "",
            image: null,
        },
    });

    /* Load existing product */
    useEffect(() => {
        const fetcProduct = async () => {

            try {
                seetFetching(true);
                const response = await getProductById(id);
                const product = response.data;

                resetForm({
                    name: product.name || "",
                    sku: product.sku || "",
                    barcode: product.barcode || "",
                    brand: product.brand || "",
                    category: product.category || "",
                    constPrice: product.constPrice || "",
                    stock: product.stock || 0,
                    unit: product.unit || 0,
                    unit: product.unit || "",
                    status: product.status || "In Stock",
                    description: product.description || "",
                    image: product.image || null,
                });
            } catch (error) {
                setApiError(
                    error?.response?.data?.message || 
                    "Unable to load product."
                );
            } finally {
                seetFetching(false);
            }
        };

        fetchProduct();
    }, [id, resetForm]);

    /* Update product */
    const onsubmit = async (formValue) => {
        try {
            setLoading(true);
            setApiError("");

            await updateProduct(
                id,
                formValues 
            );

            navigate("/products", {
                replace: true,
                state: {
                    success:
                    "product updated successffully.",
                },
            });
        } catch (error) {
            setApiError(
                error?.response?.data?.message ||
                "Unable to update product."
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3">

                <Button 
                    variant="ghost"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={18} />
                </Button>

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                </div>

            </div>

            {/* Error Message */}

            {apiError && (
                <div 
                    className=" 
                        rounded-md border border-red-200 
                        bg-red-50 px-4 py-3 
                        text-red-600
                    "
                >
                    {apiError}

                </div>
            )}

            {/* Product Form */}
            <Card className="p-6">

                <ProductForm 
                    values={values}
                    errors={errors}
                    onChange={handleChange}
                    setFieldValue={setFieldValue}
                    loading={loading}

                    onSubmit={() => 
                        handleSubmit(onSubmit)
                    }

                    onCancel={() => 
                        navigate("/products")
                    }

                    submitLabel="Update product"

                    submitIcon={
                        <Save size={18} />
                    }
                />

            </Card>
        </div>
    );
};

export default EditProduct; 


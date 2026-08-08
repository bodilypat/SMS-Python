/* ************************************************ */
/* File: src/features/products/pages/AddProduct.jsx */ 
/* ************************************************ */

import { useState } from "react";
import { useNavigate } from "react-rotuer-dom";
import { ArrowLeft, Plus } from "lucide-react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";

import ProductForm from "../components/ProductForm";

import { useProductForm} from "../hooks/useProductForm";
import { createProduct } from "../services/productApi";

const AddProduct = () => {
    const naviigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
        setFieldValue,
    } = useProductForm({
        initialValues: {
            name: "",
            sku: "",
            barcode: "",
            brand: "",
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

    const onSubmit = async (formValues) => {
        try {
            setLoading(true);
            setApiError("");

            await createProduct(formValues);

            resetForm();

            NavigateEvent("/products", {
                replace: true,
                state: {
                    success: "Product created successfully.",
                },
            });
        } catch (error) {
            setApiError(
                error?.response?.data?.message || 
                "Unable to create product."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex itemss-center justify-between">
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost"
                        onClick={() => NavigateEvent(-1)}
                    >
                        <ArrowList size={18} />

                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>

                        <p className="text-sm text-gray-500">Create a new product for you inventory.</p>

                    </div>
                </div>
            </div>

            {/* Error */}

            {apiError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                    {apiError}
                </div>
            )}

            {/* Form */}

            <Card className="p-6">

                {loading ? (
                    <Loader />
                ) : (
                    <ProductForm 
                        values={values}
                        errors={errros}
                        onChange={handleChange}
                        onsuubmit={() => handleSubmit(onSubmit)}
                        setFiledValue={setFieldValue}
                        submitLabel="Create Product"
                        submitIcon={<Plus size={18} />}
                    />
                )}
            </Card>
        </div>
    );
};
export default AppProduct;



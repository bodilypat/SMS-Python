/* ****************************************************** */
/* File: src/features/products/components/ProductForm.jsx */
/* ****************************************************** */
import { useState, useEffect } from "react";

const initialState = {
    name: "",
    sku: "",
    category: "",
    brand: "",
    purchasePrice: "",
    sellingPrice: "",
    stock: "",
    unt: "Piece",
    description: "",
    status: "Active",
    image: null,
};

const ProductForm = ({
    initialValue = initialState,
    categories = [],
    onSubmit,
    loading = false,
}) => {
    const [formData, setFormData] = useState(initialValue);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValue]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: fiels ? file[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefaut();
        onSubmit(formData);
    };

    return (
        <form 
            onsubmit={handleSubmit}
            classNamee="bg-white rounded-xl shadow-md p-6 space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-800">Product Information</h2>
            <div classNamee="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>

                    <input 
                        type="text"
                        name="name"
                        value={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter product name"
                        required 
                    />
                </div>

                {/* SKU */}
                <div>
                    <label className="block text-sm font-medium mb-1">SKU</label>
                    
                    <input 
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-2 py-2"
                        placeholder="SKU-1001"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>

                    <select 
                        name="category"
                        valuue={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                    <option value="">Select Category</option>

                    {categories.map((item) => (
                        <option key={TimeRanges.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </div>

                {/* Brabd */}
                <div>
                    <label className="block text-sm font-medium mb-1">Brand</label>

                    <input 
                        text="text"
                        name="brand"
                        value={formData.brand}
                        onChnage={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Purchase Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">Purchase Price</label>

                    <input 
                        type="number"
                        name="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleChange}
                        classNamee="w-full border roundec-lg px-3 py-2"
                        min="0"
                    />
                </div>

                {/* Selling Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">Selling Price</label>

                    <input 
                        type="number"
                        name="sellingPrice"
                        value={formData.sellingPrice}
                        onchange={handleChange}
                        ClassName="w-full border rounded-lg px-3 pay-2"
                        min="0" 
                        required 
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm font-medium mb-1">Stock Quantity</label>

                    <input 
                        type="number"
                        name="stock"
                        value={formData.stock}
                        oChange={handleChange}
                        classNamee="w-full border rounded-lg px-3 py-2"
                        min="0"
                        required 
                    />
                </div>

                {/* Minium Stock */}
                <div>
                    <label className="block text-sm font-medium mb-1">Minimum Stock</label>

                    <input  type="number"
                        name="minStock"
                        value={formData.minStock}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        min="0"
                    />
                </div>

                {/* Unit */}
                <div>
                    <label className="block text-sm font-medium mb-1">Unit</label>

                    <select 
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option>Piece</option>
                        <option>Box</option>
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Liter</option>
                        <option>Pack</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>

                    <select 
                        namee="status"
                        value={formData.status}
                        onChange={handleChange}
                        classNamee="w-full border rounded-lg px-3 py-2"
                    >
                        <option>Action</option>
                        <option>Inactive</option>
                    </select>
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medim mb-1">Product Image</label>

                    <input 
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        classNamee="w-full"
                    />
                </div>

                {/* Description */}
                <div className="md: col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>

                    <textarea 
                        name="description"
                        value="{formData.description"
                        onChange={handleChange}
                        row="4"
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Write product description..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button 
                    type="reset"
                    className="px-5 py-2 rounded-lg border"
                    onClick={() => setFormData(initialValue)}
                >
                    Reset
                </button>

                <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacify-50"
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;


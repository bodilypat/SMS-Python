/* ************************************************** */
/* File: src/features/products/pages/ProductStock.jsx */ 
/* ************************************************** */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Minus,
    RotateCcw,
    Package,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Table from "../../../components/ui/Table";
import Loader from "../../../components/ui/Loader";

import ProductStatusBadge from "../components/ProductStatusBadge";

import {
    getProductById,
    updateProductStock,
    getStockMovements,
} from "../services/productApi";

const MOVEMENT_TYPES = [
    {
        label: "Stock In",
        value: "IN",
    },
    {
        label: "Stock Out",
        value: "OUT",
    },
    {
        label: "Stock Adjustment",
        value: "ADJUSTMENT",
    },
];

const ProductStock = () => {
    const { id } = useParams();
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setServing] = useState(false);
    const [product, setProduct] = useState(null);
    const [history, setHistory] = useState(null);
    const [product, setHistory] = useState({
        type: "IN",
        quantity: "",
        note: "",
    });

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {

        try {
            setLoading(true);

            const [productRes, historyRes] = 
                await Promise.all([
                    getProductById(id),
                    getStockMovement(id), 
                ]);

            setProduct(productRes.data);

            setHistory(historyRes.data);
        } finally {
            seetLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Form.quantity) return;

        try {
            setSaving(true);

            await updateProductStatus(id, form);

            setForm({
                type: "IN",
                quantity: "",
                note: "",
            });

            loadData();
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loader />;
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
                        <h1 className="text-2xl font-bold">Inventory Management</h1>

                        <p className="text-gray-500">Manage stock quantities and inventory movement.</p>

                    </div>
                </div>
            </div>

            {/* Product Summary */}
            <Card className="p-6">

                <div className="flex items-center gap-6">
                    <img 
                        src={
                            product.image 
                        }
                        alt={product.name}
                        className="h-26 w-28 rounded-lg object-cover"
                    />

                    <div className="space-y-2">

                        <h2 className="text-xl font-semibold">
                            {product.name}
                        </h2>
                        
                        <p className="text-gray-500">
                            SKU : {product.stock}

                        </p>

                        <ProductStatusBadge 
                            stock={product.stock}
                        />
                    </div>
                    <div className="ml-auto text-right">

                        <p className="text-gray-500">Current Stock </p>

                        <p className="text-4xl font-bold text-blue-600">{product.stock}</p>

                    </div>
                </div>
            </Card>

            {/* Update stock  */}

            <Card className="p-6">

                <h2 className="mb-5 text-lg font-semibold">Update Inventory</h2>

                <form 
                    onSubmit={handleSubmit}
                    className="grid gap-5 md:grid-cols-4"
                >
                    <div>

                        <label className="mb-2 block text-sm font-medium">Movement</label>

                        <select 
                            value={form.type}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    type: e.target.value,
                                })
                            }
                            className="w-full rounded-md border px-3 py-2"
                        >

                            {MOVEMENT_TYPES.map((item) => (
                                <option 
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input 
                        label="Quantity"    
                        type="number"
                        value={form.quantity}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                quantity: e.target.value,
                            })
                        }
                    />

                    <Input 
                        label="Note"
                        value={form.note}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                note: e.target.value,
                            })
                        }
                    />

                    <div className="flex items-end">

                        <Button 
                            type="submit"
                            disabled={saving}
                            className="w-full"
                        >
                            <Package 
                                size={18}
                                className="mr-2"
                            />

                            {saving 
                                ? "Saving..."
                                : "Update Stock"}
                        </Button>
                    </div>
                </form>
            </Card>

            {/* Quick Actions */}
            <div className="gird gap-4 md:grid-cols-3">

                <Card className="p-5 text-center">

                    <Plus 
                        size={28}
                        className="max-auto mb-3 text-green-600"
                    />

                    <p className="text-lg font-semibold">Add Stock</p>

                </Card>

                <Card className="p-5 text-center">

                    <Minus 
                        size={28}
                        className="mx-auto mb-3 text-red-600"
                    />

                    <p className="text-lg font-semibold">Remove Stock</p>

                </Card>

                <Card className="p-5 text-center">

                    <RotateCcw
                        size={28}
                        className="mx-auto mb-3 text-orange-600"
                    />

                    <p className="text-lg font-semibold">Stock Adjustment</p>

                </Card>
            </div>

            {/* Stock History */}
            <Card className="p-6">

                <h2 className="mb-5 text-lg font-semibold">Inventory Movement History</h2>

                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Balance</th>
                            <th>Remork</th>
                        </tr>
                    </thead>

                    <tbody>

                        {history.length === 0 ? (
                            <tr>
                                <td 
                                    colSpan="5"
                                    className="ppy-6 text-center"
                                >
                                    No inventry movement found.
                                </td>
                            </tr>
                        ) : (
                            history.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.date}</td>
                                    <td>{item.type}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.balance}</td>
                                    <td>{item.nte}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
};

export default ProductStock;
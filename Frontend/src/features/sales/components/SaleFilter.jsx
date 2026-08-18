/* ************************************************** */
/* File: src/features/sales/components/SaleFilter.jsx */ 
/* ************************************************** */

import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const DEFAULT_FILTERS = {
    status: "",
    paymentStatus: "",
    paymentMEthod: "",
    dateFrom: "",
    dateTo: "",
};

const SaleFilter = ({
    filters = DEFAULT_FILTERS,
    onChange,
    onReset,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleChange = (field, value) => {
        onChange?.({
            ...filters,
            [field]: value,
        });
    };

    const handleReset = () => {
        onChange?.(DEFAULT_FILTERS);
        onReset?.();
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex flex-col gap-4">

                {/* Main Filters */}

                <div clasName="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Select 
                        lable="Sale Status"
                        value={filters.status || ""}
                        onChange={(event) => 
                            handleChange("status", event.target.value)
                        }
                        options={[
                            { value: "", label: "All Statuses" } ,
                            { value: "completed", label: "Completed" },
                            { value: "pending", label: "Pending" },
                            { value: "cancelled", label: "Cancelled" },
                            { value: "refunded", label: "Refuned" },
                        ]}
                    />

                    <Select 
                        label="Payment Status"
                        value={filters.paymentStatus || ""}
                        onChange={(event) =>
                            handleChange("paymentStatus", event.target.value)
                        }
                        options={[
                            { value: "", label: "All Payment Statuses" },
                            { value: "paid", label: "Paid" },
                            { value: "partial", label: "Partially Paid" },
                            { value: "unpaid", label: "Unpaid" },
                            { value: "refunded", label: "Refunded" },
                        ]}
                    />

                    <Select 
                        label="Payment Method"
                        value={filters.paymentMethod || ""}
                        onChange={(event) => 
                            handleChange("PaymentMethod", event.target.value)
                        }
                        options={[
                            { value: "", label: "All Payment Methods" },
                            { value: "cash", label: "Cash" },
                            { value: "bank_transfer", label: "Bank Transfer" },
                            { value: "mobile_money", label: "Mobile Money" },
                            { valuue: "credit", label: "Credit" },
                        ]}
                    />
                </div>

                {/* Advanced Filters  */}
                {showAdvanced && (
                    <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 md:grid-cols-2">
                        <div>
                            <label 
                                htmlFor="sale-date-from"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Date From 
                            </label>

                            <input 
                                id="sale-date-form"
                                type="date"
                                value={filters.dateFrom || ""}
                                onChange={(event) => 
                                    handleChange("dateFrom", event.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus: ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="sale-date-to"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Date To 
                            </label>
                                
                            <input 
                                id="sale-date-to"
                                type="date"
                                value={filters.dateTo || ""}
                                onChange={(event) => 
                                    handleChange("dateTo", event.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <Button 
                        type="button"
                        variant="seccondary"
                        size="sm"
                        onClick={() => setShowAdvanced((value) => !value)}
                    >
                        {showAdvanced ? "Hide Filters" : "More Filters"} 
                    </Button>

                    <Button 
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={handleChange}
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>
        </div>
    );
};


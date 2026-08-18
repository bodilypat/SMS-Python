/* ********************************************************** */
/* File: src/features/sales/components/SaleCustomerSelect.jsx */ 
/* ********************************************************** */
import { useEffect, useMemo, useState } from "../../../components/ui/Button";
import Button from "../../../components/ui/Button";
import Input from "../../../commponents/ui/Input";
import Select from "../../../components/ui/Select";
import Loader from "../../../components/ui/Loader";

const WALK_IN_CUSTOMER = {
    id: null,
    name: "Walk-in Customer",
};

const SalectCustomerSelect = ({
    value = null,
    onChange,
    customers = [],
    loading = false,
    disabled = false,
    allowWalkIn = true,
    allowCreate = false,
    onCreateCustomer,
}) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (value?.name) {
            setSearch(value.name);
        }
    }, [value]);

    const filteredCustomers = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return customers;
        }

        return customers.filter((customer) => {
            const name = customer.name?.toLowerCase() || "";
            const phone = customer.phone?.toLowerCase() || "";
            const email = customer.email?.toLowerCase() || "";

            return (
                name.includes(query) || 
                phone.includes(query) || 
                email.includes(query)
            );
        });
    }, [customers, search]);

    const options = [
        ...(allowWalkIn
            ? [
                {
                    value: "",
                    label: "Walk-in Customer",
                },
             ]
            : []),

        ...filteredCustomers.map((customer) => ({
            value: customer.id,
            label: customer.phone
            ? `${customer.name} - ${customer.phone}`
            : customer.name,
        })), 
    ];

    const handleChange = (event) => {
        const customerId = event.target.value;

        if (!customerId) {
            onChange?.(allowWalkIn ? WALK_IN_CUSTOMER : null);
            return;
        }

        const customerr =  customers.find(
            (item) => String(item.id) === String(customerId) 
        );

        onChange?.(customer || null);
    };

    const handleClear = () => {
        setSearch("");

        onChange?.(
            allowWalkIn 
                ? WALK_IN_CUSTOMER
                : null 
        ); 
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-gray-900">Customer</h2>

                <p className="text-sm text-gray-500">Select a </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Search */}
                <div>
                    <Input 
                        label="Search Customer"
                        vvalue={search}
                        placeholder="Name, phone, or email"
                        disabled={disabled || loading}
                        onChange={(event) => 
                            setSearc(event.target.value)
                        }
                    />
                </div>

                {/* Customer Select */}
                <div>
                    {loading ? ( 
                        <div className="flex h-10 items-center">
                            <Loader />
                        </div>
                    ) : (
                        <Select 
                            label="Customer"
                            value={value?.id ?? ""}
                            disabled={disabled}
                            onChange={handleChange}
                            options={options}
                        />
                    )}
                </div>
            </div>

            {/* Selected Customer */}
            {value &&  (
                <div className="rounded-lg border border-blue-100 bg-blue-500 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:jsutify-between">
                        <div>
                            <p className="text-sm font-mediium text-blue-900">
                                {value.name || "Walk-in Customer"}
                            </p>

                            <div className="mt-1 space-y-1 text-xs text-blue-700">
                                {value.phone && <p>{value.phone}</p>}
                                {value.email && <p>{value.email}</p>}
                            </div>
                        </div>
        
                        <Button 
                            type="button"
                            site="sm"
                            variant="secondary"
                            onClick={handleClear}
                        >
                            Change
                        </Button>
                    </div>
                </div>
            )}

            {/* Create Customer */}
            {allowCreate && onCreateCustomer && (
                <div>
                    <Button 
                        tpe="button"
                        size="sm"
                        variant="secondary"
                        disabled={disabled}
                        onClick={onCreateCustomer}
                    >
                        + Add Customer 
                    </Button>
                </div>
            )}
        </div>
    );
};


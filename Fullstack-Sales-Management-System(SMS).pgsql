Fullstack-Sale-Management-System(SMS)
│   
├── Frontend (React.js)
│   │
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                                            
│   │	│   ├── images/
│   │	│   ├── icons/
│   │	│   └── styles/
│   │	│
│   │   ├── components/                                          # Shared reusable components 
│   │	│   ├── ui/
│   │   │   │   ├── Button.jsx 
│   │   │   │   ├── Input.jsx 
│   │   │   │   ├── Modal.jsx 
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Table.jsx 
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── SearchInput.jsx 
│   │   │   │   ├── Select.jsx 
│   │   │   │   ├── Badge.jsx 
│   │   │   │   ├── Loader.jsx
│   │   │   │	└── EmptyState.jsx 
│   │	│   ├── chart/
│   │	│   ├── forms/
│   │	│   └── layouts/
│   │	│ 
│   │   ├── layouts/                                            
│   │	│   ├── MainLayout.jsx 
│   │	│   ├── AuthLayout.jsx 
│   │	│   └── DashboardLayout.jsx 
│   │	│
│   │   ├── hooks/                                             # Custom hook
│   │	│   ├── useAuth.js                                
│   │	│   ├── useFetch.js                                                                  
│   │   │   └── usePagination.js   
│   │   ├── services/                                                                 
│   │   │   └── api.js       
│   │   ├── routes/
│   │	│   ├── AppRoutes.jsx                                                                                
│   │   │   └──  ProtectedRoute.js                             
│   │   ├── utils/                                             
│   │	│   ├── helper.js                                           
│   │	│   ├── constants.js
│   │	│   ├── validators.js 
│   │   │   └── formatters.js
│   │   │
│   │   ├── features/                                             
│   │	│	├── auth/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js  
│   │	│   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   ├── DashboardHeader.jsx                      # Page title and action buttons 
│   │   │   │   │   ├── StatCard.jsx                             # KPI cards ( Revenue, Orders, Customer, Products)
│   │   │   │   │   ├── SalesChart.jsx                           # Monthy sales chart 
│   │   │   │   │   ├── RevenueChart.jsx                         # Revenue Trend chart 
│   │   │   │   │   ├── RecentSales.jsx                          # Latest sales transactions 
│   │   │   │   │   ├── TopProducts.jsx                          # Best-selling products 
│   │   │   │   │   ├── LowStockProducts.jsx                     # Product with low inventory 
│   │   │   │   │   ├── SalesOverview.jsx                        # Sales summary cards 
│   │   │   │   │   ├── CustomerGrowth.jsx                       # New customer analytics 
│   │   │   │   │   ├── ActivityTimeline.jsx                     # Recent system activity 
│   │   │   │	│   └── DashboardSkeleton.jsx                    # Loading placeholder 
│   │   │   │   ├── pages/
│   │   │   │	│   └── Dashboard.jsx 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useDashboard.js 
│   │   │   │   ├── store/
│   │   │   │	│   └── dashboardSlice.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── dashboardApi.js 
│   │   │   │   ├── utils/
│   │   │   │   │   ├── dashboardHelpers.js 
│   │   │   │	│   └── chartConfig.js
│   │   │   │   ├── dashboardSelectors.js
│   │   │   │   ├── dashboardConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── products/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ProductActions.jsx                       # View, Edit, Delete buttons
│   │   │   │   │   ├── ProductCard.jsx                          # Card layout for grid view
│   │   │   │   │   ├── ProductDetailsCard.jsx
│   │   │   │   │   ├── ProductFilter.jsx                        # Category and status filter
│   │   │   │   │   ├── ProductForm.jsx                          # Shared form for add/edit product
│   │   │   │   │   ├── ProductGallery.jsx
│   │   │   │   │   ├── ProductImageUpload.jsx                   # Upload product images
│   │   │   │   │   ├── ProductPriceInfo.jsx
│   │   │   │   │   ├── ProductSearchBar.jsx                     # Search by product name, SKU, or brand
│   │   │   │   │   ├── ProductStatusBadge.jsx                   # Stock status indicator 
│   │   │   │   │   ├── ProductStockInfo.jsx
│   │   │   │   │   ├── ProductTable.jsx                         # Product data table    
│   │   │   │	│   └── DeleteProductDialog.jsx                  # Delete confirmation dialog
│   │   │   │	│
│   │   │   │   ├── pages/
│   │   │   │   │   ├── ProductList.jsx                          # Display all products with search, filters, sorting, and pagination
│   │   │   │   │   ├── AddProduct.jsx                           # Create a new product  
│   │   │   │   │   ├── EditProduct.jsx                          # Update an existing product 
│   │   │   │   │   ├── ProductDetails.jsx                       # View detailed product information
│   │   │   │	│   └── ProductStockPage.jsx                     # Manage stock quantities and inventory movement 
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useProducts.js 
│   │   │   │   │   ├── useProduct.js 
│   │   │   │   │   ├── useProductForm.js 
│   │   │   │	│   └── useProductStock.js 
│   │   │   │   ├── store/
│   │   │   │   │   ├── productsSlice.js 
│   │   │   │   │   ├── productsSelectors.js 
│   │   │   │	│   └── productsThunks.js
│   │   │   │   ├── services/
│   │   │   │	│   └── productApi.js 
│   │   │   │   ├── utils/
│   │   │   │   │   ├── productValidation.js 
│   │   │   │   │   ├── productHelpers.js
│   │   │   │	│   └── formatCurrency.js
│   │   │   │   ├── constants/
│   │   │   │	│   └── productConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── categories/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CategoryTable.jsx                        # Table list categories 
│   │   │   │   │   ├── CategoryCard.jsx                         # Card view for categories 
│   │   │   │   │   ├── CategoryForm.jsx                         # Reusable add/edit form 
│   │   │   │   │   ├── CategoryModal.jsx                        # Modal for category actions 
│   │   │   │   │   ├── CategoryFilter.jsx                       # Filter by status 
│   │   │   │   │   ├── CategorySearch.jsx                       # Search categories by name 
│   │   │   │   │   ├── CategoryActions.jsx                      # View, edit, and delete buttons
│   │   │   │   │   ├── CategoryStatusBadge.jsx                  # Active/Inactive status badge 
│   │   │   │	│   └── DeleteCategoryDialog.jsx                 # Delete confirmation dialog
│   │   │   │   ├── pages/ 
│   │   │   │   │   ├── CategoryList.jsx                         # Display all product categories 
│   │   │   │   │   ├── AddCategory.jsx                          # Create a new category 
│   │   │   │   │   ├── EditCategory.jsx                         # Update an existing categories 
│   │   │   │	│   └── CategoryDetails.jsx                      # View category information and related products 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useCategories.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── categoryApi.js 
│   │   │   │   ├── store/
│   │   │   │   │   ├── categoriesSlice.js 
│   │   │   │   │   ├── categoriesSelector
│   │   │   │	│   └── categoriesSlice.js 
│   │   │   │   ├── categoriesSelectors.js
│   │   │   │   ├── categoriesConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── customers/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── CustomerTable.jsx                        # Customer data table 
│   │   │   │   │   ├── CustomerCard.jsx                         # Card view 
│   │   │   │   │   ├── CustomerForm.jsx                         # Add/Edit customer form 
│   │   │   │   │   ├── CustomerModal.jsx                        # Modal Dialog 
│   │   │   │   │   ├── CustomerFilter.jsx                       # Filter by status, type  
│   │   │   │   │   ├── CustomerSearch.jsx                       # Search customer 
│   │   │   │   │   ├── CustomerActions.jsx                      # View, Edit, Delete button 
│   │   │   │   │   ├── CustomerStatusBadge.jsx                  # Active/Inactive badge
│   │   │   │   │   ├── CustomerAvatar.jsx                       # Customer profile image/avatar
│   │   │   │   │   ├── CustomerAddressCard.jsx                  # Address information 
│   │   │   │   │   ├── CustomerPurchaseHistory.jsx              # Recent orders/details 
│   │   │   │	│   └── DeleteCustomerDialog.jsx                 # Delete confirmation
│   │   │   │   ├── components/
│   │   │   │   │   ├── CustomerList.jsx                         # List all customers with search, filters , sorting and pagination 
│   │   │   │   │   ├── AddCustomer.jsx                          # Register a new customer 
│   │   │   │   │   ├── EditCustomer.jsx                         # Update customer Information 
│   │   │   │   │   ├── CustomerDetails.jsx                      # Display customer profile, contact information and statistics 
│   │   │   │	│   └── CustomerTrasaction.jsx                   # Show purchase history invoices and payments 
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useCustomers.js
│   │   │   │	│   └── useCustomerForm.jsx
│   │   │   │   ├── services/
│   │   │   │	│   └── customerApi.js 
│   │   │   │   ├── store/
│   │   │   │   │   ├── customerSlice.js 
│   │   │   │   │   ├── customerSelectors.js
│   │   │   │	│   └── customerThunk.js                         # Optional if using Redux Toolkit async thunks
│   │   │   │   ├── utils/
│   │   │   │   │   ├── customerHelpers.js 
│   │   │   │   │   ├── customerValidation.js 
│   │   │   │   │   ├── customerConstants.js 
│   │   │   │	│   └── formatCustomer.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── suppliers/
│   │   │   │   ├── components/
│   │   │   │   │   ├── SupplierTable.jsx                        # Supplier data table 
│   │   │   │   │   ├── SupplierCard.jsx                         # Card view 
│   │   │   │   │   ├── SupplierForm.jsx                         # Add/Edit supplier form 
│   │   │   │   │   ├── SupplierModal.jsx                        # Modal dialog 
│   │   │   │   │   ├── SupplierFilter.jsx                       # Filter by status, location 
│   │   │   │   │   ├── SupplierSearch.jsx                       # Search suppliers 
│   │   │   │   │   ├── SupplierActions.jsx                      # View, Edit, Delete buttons 
│   │   │   │   │   ├── SupplierStatusBadge.jsx                  # Active/Inactive badge 
│   │   │   │   │   ├── SupplierContactCard.jsx                  # Contact inforamtion  
│   │   │   │   │   ├── SupplierProducts.jsx                     # Products supplier 
│   │   │   │   │   ├── SupplierPurchaseHistory.jsx              # Purchase history 
│   │   │   │	│   └── DeleteSupplierDialog.jsx                 # Delete confirmation
│   │   │   │   ├── pages/
│   │   │   │   │   ├── SupplierList.jsx                         # Display suppliers with search filters, sorting and pagination  
│   │   │   │   │   ├── AddSupplier.jsx                          # Register a new supplier 
│   │   │   │   │   ├── EditSupplier.jsx                         # Update supplier inforamtion 
│   │   │   │   │   ├── SupplierDetails.jsx                      # View supplier profile products and purchase statistics 
│   │   │   │	│   └── SupplierPurchases.jsx                    # Display purchase orders and transaction history 
│   │   │   │   ├── hooks/                
│   │   │   │   │   ├── useSuppliers.js 
│   │   │   │	│   └── useSupplierForm.js 
│   │   │   │   ├── store/
│   │   │   │   │   ├── supplierSlice.js 
│   │   │   │	│   └── supplierSelectors.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── supplierApi.js
│   │   │   │   ├── utils/
│   │   │   │   │   ├── supplierHelpers.js 
│   │   │   │   │   ├── supplierValidation.js 
│   │   │   │   │   ├── supplierConstants.js 
│   │   │   │	│   └── formatSupplier.js
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── sales/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── purchases/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── inventory/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── payments/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── reports/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js 
│   │	│   ├── settings/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   └── profile/
│   │   │       ├── pages/
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       ├── store/
│   │   │       ├── services/
│   │   │       ├── utils/
│   │   │    	└── index.js
│   │	│   
│   │   ├── styles/                                                                                    
│   │   │   └── global.css                                     
│   │   ├── App.js                                             # Main routing & layout integration    
│   │   ├── index.js                                           # ReactDOM render, React based sms frontend.                           
│   │   └── reportWebVitals.js                                       
│   └──                     
├── static/                                                    # Optional static files
│
├── backend(Python)
│   │
│   ├── app/
│   │   ├── __init__.py                          
│   │   ├── main.py                                           # FastAPI entry point
│   │   ├── core/                                             # App configuration & security
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   ├── dependencies.py
│   │   │   ├── logging.py
│   │   │   ├── exceptions.py 
│   │   │   ├── events.py 
│   │   │   └── __init__.py
│   │   ├── api/                                             # Routes (instead of controllers + routes)
│   │   │   ├── __init__.py
│   │   │   ├── v1/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── store/
│   │   │   │   ├── services/
│   │   │   │   ├── utils/
│   │   │   │	└── index.js 
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   ├── categories.py
│   │   │   ├── sales.py
│   │   │   ├── purchases.py
│   │   │   ├── customers.py
│   │   │   ├── dashboard.py
│   │   │   └── suppliers.py                                 # Combines all routes
│   │   ├── schemas/                                          # Pydantic schemas
│   │   │   ├── user.py
│   │   │   ├── auth.py
│   │   │   ├── product.py
│   │   │   ├── category.py
│   │   │   ├── sale.py
│   │   │   ├── purchase.py
│   │   │   ├── customer.py
│   │   │   ├── dashboard.py
│   │   │   └── supplier.py
│   │   ├── services/                                        # Business logic
│   │   │   ├── user_service.py
│   │   │   ├── auth_service.py
│   │   │   ├── product-service.py
│   │   │   ├── category_service.py
│   │   │   ├── sale_service.py
│   │   │   ├── purchase_service.py
│   │   │   ├── customer_service.py
│   │   │   ├── dashboard_service.py
│   │   │   └── supplier_service.py
│   │   ├── repositories/                                    # DB Logic Layer (Optional but clean)
│   │   │   ├── user_repo.py
│   │   │   ├── auth_repo.py
│   │   │   ├── product_repo.py
│   │   │   ├── category_repo.py
│   │   │   ├── sale_repo.py
│   │   │   ├── purchase_repo.py
│   │   │   ├── customer_repo.py
│   │   │   ├── 
│   │   │   └── supplier_repo.py                
│   │   ├── models/                                           # SQLAlchemy model
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   ├── category.py
│   │   │   ├── sale.py
│   │   │   ├── sale_item.py
│   │   │   ├── purchase.py
│   │   │   ├── purchase_item.py
│   │   │   ├── customer.py 
│   │   │   └── supplier.py        
│   │   ├── database/                          
│   │   │   ├── base.py                                       # Base model
│   │   │   ├── session.py                                    # DB session
│   │   │   ├── seed.py
│   │   │   ├── init_db.py
│   │   │   └── __init__.py
│   │   ├── middlewares/                          
│   │   │   ├── error_handler.py
│   │   │   └── auth.py
│   │   ├── utils/                          
│   │   │   ├── response.py
│   │   │   ├── validators.py
│   │   │   └── constants.py                                              
│   │   └── providers/
│   │       ├── email.py
│   │       ├── payment.py
│   │       └── sms.js
│	├── alembic/                                              # Migrations (important for PostgreSQL)
│	├── tests/
│   │   ├── test_auth.py
│   │   ├── test_products.py
│   │   ├── test_sales.py
│   │   └── conftest.py
│	├── requirements.txt
│	├── .env
│	├── .gitignore
│   └── README.md 
│   



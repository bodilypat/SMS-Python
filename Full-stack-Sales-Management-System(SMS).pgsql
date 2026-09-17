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
│   │	│   ├── api.js                                         # Axios instance for FastAPI
│   │	│   ├── authService.js                                
│   │	│   ├── productService.js
│   │	│   ├── categoriesService.js                     
│   │	│   ├── saleService.js
│   │	│   ├── purchaseService.js                         
│   │	│   ├── customerService.js
│   │	│   ├── supplierService.js
│   │   │   └── reportService.js       
│   │   ├── routes/
│   │	│   ├── AppRoutes.jsx                                                                                
│   │	│   ├── ProtectedRoute.jsx 
│   │	│   ├── ProductRoutes.jsx
│   │	│   ├── CategoryRoutes.jsx 
│   │	│   ├── CustomerRoutes.jsx 
│   │   │   └──                               
│   │   ├── utils/                                             
│   │	│   ├── helper.js                                           
│   │	│   ├── constants.js
│   │   │   └── validators.js
│   │   │
│   │   ├── features/                                             
│   │	│	├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginForm.jsx 
│   │   │   │   │   ├── Registerform.jsx 
│   │   │   │   │   ├── ForgotPasswordForm.jsx
│   │   │   │   │   ├── ResetPasswordForm
│   │   │   │   │   ├── ChangePasswrodForm.jsx  
│   │   │   │   │   ├── AuthGuard.jsx 
│   │   │   │   │   ├── GuestGuard.jsx
│   │   │   │   │   ├── PermissionGuard.jsx                          
│   │   │   │	│   └── RoleGuard.jsx 
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Login.jsx  
│   │   │   │   │   ├── Register.jsx 
│   │   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   │   ├── ResetPassword.jsx                          
│   │   │   │	│   └── Unauthorized.jsx 
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useAuth.js                     
│   │   │   │	│   └── usePermission.js
│   │   │   │   ├── services/
│   │   │   │	│   └── authApi.js
│   │   │   │   ├── utils/
│   │   │   │   │   ├── authHelpers.js    
│   │   │   │	│   └── tokenHelpers.js
│   │   │   │   ├── constants/
│   │   │   │	│   └── authConstants.js
│   │   │   │	└── index.js  
│   │	│   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   ├── StatCard.jsx                             
│   │   │   │   │   ├── SalesOverview.jsx                        
│   │   │   │   │   ├── RevenueChart.jsx                         
│   │   │   │   │   ├── SalesByCategory.jsx
│   │   │   │   │   ├── RecentSales.jsx                          
│   │   │   │   │   ├── TopProducts.jsx                          
│   │   │   │   │   ├── TopCustomers.jsx
│   │   │   │   │   ├── LowStockProducts.jsx                         
│   │   │   │	│   └── QuickActions.jsx
│   │   │   │   ├── pages/
│   │   │   │	│   └── Dashboard.jsx 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useDashboard.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── dashboardApi.js 
│   │   │   │   ├── utils/
│   │   │   │	│   └── dashboardHelpers.js
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── customers/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CustomerForm.jsx                         
│   │   │   │   │   ├── CustomerTable.jsx                        
│   │   │   │   │   ├── CustomerCard.jsx                         
│   │   │   │   │   ├── CustomerDetails.jsx                        
│   │   │   │   │   ├── CustomerFilter.jsx                         
│   │   │   │   │   ├── CustomerSearch.jsx                        
│   │   │   │	│   └── CustomerStats.jsx                   
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Customers.jsx
│   │   │   │   │   ├── AddCustomer.jsx
│   │   │   │   │   ├── EditCustomer.jsx
│   │   │   │	│   └── CustomerDetails.jsx 
│   │   │   │   ├── services/
│   │   │   │	│   └── customerApi.js 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useCustomers.js 
│   │   │   │   ├── utils/
│   │   │   │	│   └── customerHelpers.js 
│   │   │   │   ├── constants/
│   │   │   │	│   └── customerConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── sales/
│   │   │   │   ├── components/
│   │   │   │   │   ├── SaleForm.jsx 
│   │   │   │   │   ├── SaleTable.jsx 
│   │   │   │   │   ├── SaleDetails.jsx
│   │   │   │   │   ├── SaleItems.jsx 
│   │   │   │   │   ├── ProductSelector.jsx 
│   │   │   │   │   ├── CustomerSelector.jsx 
│   │   │   │   │   ├── QuantityInput.jsx 
│   │   │   │   │   ├── DiscountInput.jsx 
│   │   │   │   │   ├── TaxInput.jsx 
│   │   │   │   │   ├── SaleSummary.jsx 
│   │   │   │   │   ├── PaymentSelector.jsx 
│   │   │   │   │   ├── SaleStatus.jsx
│   │   │   │   │   ├── PaymentFilters.jsx 
│   │   │   │	│   └── SalesSearch.jsx
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Sales.jsx 
│   │   │   │   │   ├── NewSale.jsx 
│   │   │   │   │   ├── EditSale.jsx 
│   │   │   │	│   └── SaleDetails.jsx 
│   │   │   │   ├── hooks/                
│   │   │   │   │   ├── useSales.js 
│   │   │   │	│   └── useCreateSale.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── salesApi.js
│   │   │   │   ├── utils/
│   │   │   │   │   ├── saleCalculations.js 
│   │   │   │	│   └── saleHelpers.js
│   │   │   │   ├── constants/
│   │   │   │	│   └── salesConstants.js
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── products/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ProductTable.jsx                         # Product data table 
│   │   │   │   │   ├── ProductForm.jsx                          # Shared form for add/edit product 
│   │   │   │   │   ├── ProductCard.jsx                          # Card layout for grid view 
│   │   │   │   │   ├── ProductDetails.jsx                         
│   │   │   │   │   ├── ProductFilter.jsx                        
│   │   │   │	│   └── ProductSearch.jsx                  
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Products.jsx
│   │   │   │   │   ├── AddProduct.jsx                           
│   │   │   │   │   ├── EditProduct.jsx                                              
│   │   │   │	│   └── ProductDetails.jsx    
│   │   │   │   ├── services/
│   │   │   │	│   └── productApi.js                      
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useProducts.js 
│   │   │   │   ├── utils/
│   │   │   │	│   └── productConstants.js
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── categories/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CategoryForm.jsx 
│   │   │   │   │   ├── CategoryTable.jsx                          
│   │   │   │   │   ├── CategoryCard.jsx                         
│   │   │   │   │   ├── CategoryDetails.jsx                        
│   │   │   │	│   └── CategoryFilters.jsx
│   │   │   │   ├── pages/ 
│   │   │   │   │   ├── Categories.jsx
│   │   │   │   │   ├── AddCategory.jsx                          # Create a new category 
│   │   │   │   │   ├── EditCategory.jsx                         # Update an existing categories 
│   │   │   │	│   └── CategoryDetails.jsx                      # View category information and related products 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useCategories.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── categoryApi.js 
│   │   │   │   ├── utils/
│   │   │   │	│   └── categoryHelpers.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── inventory/
│   │   │   │   ├── components/
│   │   │   │   │   ├── InventoryTable.jsx 
│   │   │   │   │   ├── InventoryCard.jsx                          
│   │   │   │   │   ├── InventoryFilters.jsx                         
│   │   │   │   │   ├── InventorySearch.jsx                        
│   │   │   │   │   ├── StockInForm.jsx 
│   │   │   │   │   ├── StockOutForm.jsx
│   │   │   │   │   ├── StockAdjustmentForm.jsx 
│   │   │   │   │   ├── StockMovementTable.jsx
│   │   │   │	│   └── InventoryStats.jsx
│   │   │   │   ├── pages/ 
│   │   │   │   │   ├── Inventory.jsx 
│   │   │   │   │   ├── StockIn.jsx  
│   │   │   │   │   ├── StockOut.jsx  
│   │   │   │   │   ├── StockAdjustment.jsx 
│   │   │   │	│   └── StockHistory.jsx 
│   │   │   │   ├── services/
│   │   │   │	│   └── inventoryA pi.js 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useInventory.js 
│   │   │   │   ├── utils/
│   │   │   │	│   └── InventoryHelpers.js 
│   │   │   │   ├── constants/
│   │   │   │	│   └── InventoryConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── payments/
│   │   │   │   ├── components/
│   │   │   │   │   ├── PaymentTable.jsx 
│   │   │   │   │   ├── PaymentForm.jsx
│   │   │   │   │   ├── PaymentDetails.jsx                         
│   │   │   │   │   ├── PaymentMethod.jsx                        
│   │   │   │   │   ├── PaymentStatus.jsx 
│   │   │   │   │   ├── PaymentSummary.jsx
│   │   │   │   │   ├── PaymentFilters.jsx 
│   │   │   │   │   ├── PaymentSearch.jsx
│   │   │   │   │   ├── RefundForm.jsx 
│   │   │   │	│   └── PaymentStats.jsx
│   │   │   │   ├── pages/ 
│   │   │   │   │   ├── Payments.jsx 
│   │   │   │   │   ├── PaymentDetails.jsx  
│   │   │   │   │   ├── RecordPayment.jsx  
│   │   │   │	│   └── RefundPayment.jsx 
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── usePayments.js
│   │   │   │	│   └── usePayment.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── PaymentApi.js 
│   │   │   │   ├── utils/
│   │   │   │   │   ├── PaymentHelpers.js 
│   │   │   │	│   └── PaymentFormatter.js  
│   │   │   │   ├── constants/
│   │   │   │	│   └── PaymentConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── invoices/
│   │   │   │   ├── components/
│   │   │   │   │   ├── InvoiceTable.jsx 
│   │   │   │   │   ├── InvoiceDetails.jsx                          
│   │   │   │   │   ├── InvoiceHeader.jsx                         
│   │   │   │   │   ├── InvoiceItems.jsx                        
│   │   │   │   │   ├── InvoiceSummary.jsx 
│   │   │   │   │   ├── InvoiceCustomer.jsx
│   │   │   │   │   ├── InvoiceStatus.jsx
│   │   │   │   │   ├── InvoiceFilters.jsx 
│   │   │   │   │   ├── InvoiceSearch.jsx
│   │   │   │   │   ├── PaymentStatus.jsx
│   │   │   │	│   └── InvoiceActions.jsx
│   │   │   │   ├── pages/ 
│   │   │   │   │   ├── Invoices.jsx 
│   │   │   │   │   ├── InvoiceDetails.jsx  
│   │   │   │	│   └── PrintInvoice.jsx 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useInvoices.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── invoiceApi.js
│   │   │   │   ├── utils/
│   │   │   │   │   ├── InvoiceHelpers.js 
│   │   │   │	│   └── InvoiceFormater.js 
│   │   │   │   ├── constants/
│   │   │   │	│   └── InvoiceConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── reports/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ReportFilters.jsx 
│   │   │   │   │   ├── ReportHeader.jsx                          
│   │   │   │   │   ├── ReportSummary.jsx                         
│   │   │   │   │   ├── SaleReportTable.jsx                        
│   │   │   │   │   ├── SalesChart.jsx 
│   │   │   │   │   ├── RevenueChart.jsx
│   │   │   │   │   ├── ProductSalesTable.jsx
│   │   │   │   │   ├── CustomerSalesTable.jsx 
│   │   │   │   │   ├── InventoryReportTable.jsx
│   │   │   │   │   ├── PaymentReportTable.jsx
│   │   │   │   │   ├── ProfitLossSummry.jsx
│   │   │   │   │   ├── ReportExport.jsx
│   │   │   │	│   └── InvoiceActions.jsx
│   │   │   │   ├── pages/ 
│   │   │   │   │   ├── Reports.jsx 
│   │   │   │   │   ├── SalesReport.jsx 
│   │   │   │   │   ├── RevenueReport.jsx
│   │   │   │   │   ├── ProductReport.jsx 
│   │   │   │   │   ├── CustomerReport.jsx 
│   │   │   │   │   ├── InventoryReport.jsx 
│   │   │   │   │   ├── PaymentReport.jsx   
│   │   │   │	│   └── ProfitLossReport.jsx 
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useSalesReport.js 
│   │   │   │   │   ├── useProductReport.js 
│   │   │   │   │   ├── useCustomerReport.js 
│   │   │   │	│   └── useInventoryReport.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── reportApi.js
│   │   │   │   ├── utils/
│   │   │   │   │   ├── reportHelpers.js 
│   │   │   │   │   ├── reportFormatter.js
│   │   │   │	│   └── reportCalculations.js 
│   │   │   │   ├── constants/
│   │   │   │	│   └── reportConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   └── users/
│   │   │       ├── components/
│   │   │       │   ├── UserTable.jsx 
│   │   │       │   ├── UserForm.jsx 
│   │   │       │   ├── UserDetails.jsx 
│   │   │       │   ├── UserAvatar.jsx 
│   │   │       │   ├── UserStatus.jsx 
│   │   │       │   ├── UserRole.jsx 
│   │   │       │   ├── UserFilters.jsx 
│   │   │       │   ├── UserSearch.jsx 
│   │   │       │   ├── RoleSelector.jsx 
│   │   │       │   ├── PermissionSelector.jsx 
│   │   │       │   ├── PasswordForm.jsx 
│   │   │    	│   └── UserActions.jsx
│   │   │       ├── pages/
│   │   │       │   ├── Users.jsx
│   │   │       │   ├── NewUser.jsx
│   │   │       │   ├── UserDetails.jsx
│   │   │       │   ├── EditUser.jsx
│   │   │    	│   └── UserProfile.jsx
│   │   │       ├── hooks/
│   │   │       │   ├── useUsers.js 
│   │   │    	│   └── useUser.js
│   │   │       ├── services/
│   │   │   	│   └── userApi.js
│   │   │       ├── utils/
│   │   │   	│   └── userHelpers.js
│   │   │       ├── constants/
│   │   │   	│   └── userConstants.js
│   │   │    	└── index.js
│   │	│   
│   │   ├── styles/                                                                                    
│   │   │   └── global.css                                     
│   │   ├── App.js                                             # Main routing & layout integration    
│   │   ├── index.js                                           # ReactDOM render, React based sms frontend.                           
│   │   └── reportWebVitals.js                                       
│   └──                     
├── static/                                                    # Optional static files
├── .gitignore 
└── README.md

├── backend(Python)
│   ├── app/
│   │   ├── __init__.py                          
│   │   ├── main.py                                           # FastAPI entry point
│   │   ├── core/                                             # App configuration & security
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   ├── dependencies.py
│   │   │   └── __init__.py
│   │   ├── db/                          
│   │   │   ├── base.py                                       # Base model
│   │   │   ├── session.py                                    # DB session
│   │   │   ├── init_db.py
│   │   │   └── __init__.py
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
│   │   ├── api/                                             # Routes (instead of controllers + routes)
│   │   │   ├── deps.py
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   ├── categories.py
│   │   │   ├── sales.py
│   │   │   ├── purchases.py
│   │   │   ├── customers.py
│   │   │   ├── dashboard.py
│   │   │   └── suppliers.py                                 # Combines all routes
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



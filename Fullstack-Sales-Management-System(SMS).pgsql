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
│   │   │   │   ├── Select.jsx 
│   │   │   │   ├── Textarea.jsx
│   │   │   │   ├── Checkbox.jsx
│   │   │   │   ├── Modal.jsx 
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Table.jsx 
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── SearchInput.jsx 
│   │   │   │   ├── Badge.jsx 
│   │   │   │   ├── Alert.jsx 
│   │   │   │   ├── Dropdown.jsx 
│   │   │   │   ├── Spinner.jsx 
│   │   │   │   ├── Loader.jsx 
│   │   │   │   ├── EmptyState.jsx 
│   │   │   │   ├── ConfirmDialog.jsx 
│   │   │   │	└── ErrorMessage.jsx 
│   │	│   ├── forms/
│   │	│   ├── chart/
│   │	│   ├── tables/
│   │	│   └── feedback/
│   │	│ 
│   │   ├── layouts/                                            
│   │	│   ├── MainLayout.jsx 
│   │	│   ├── AuthLayout.jsx 
│   │	│   ├── DashboardLayout.jsx 
│   │	│   ├── Sidebar.jsx 
│   │	│   ├── Header.jsx 
│   │	│   ├── Footer.jsx
│   │	│   └── Breadcrumbs.jsx 
│   │   ├── config/                                           
│   │	│   ├── apiConfig.js                                       
│   │	│   ├── appConfig.js
│   │   │   └── navigation.js 
│   │	│
│   │   ├── services/                                          # Global API infra 
│   │	│   ├── api.js                                         # Axios instance
│   │	│   ├── apiError.js
│   │   │   └── interceptors.js 
│   │	│
│   │   ├── hooks/                                             # Global hooks
│   │	│   ├── useDebounce.js 
│   │	│   ├── useFetch.js 
│   │	│   ├── usePagination.js                          
│   │	│   ├── useModal.js                                                             
│   │   │   └── useLocalStorage.js      
│   │   ├── routes/
│   │	│   ├── AppRoutes.jsx                                                                                
│   │	│   ├── ProtectedRoute.jsx
│   │	│   ├── PublicRoute.jsx
│   │   │   └── RouteError.jsx    
│   │   │
│   │   ├── store/                                            # Global state                                      
│   │	│   ├── index.js                                         
│   │	│   ├── authStore.js
│   │   │   └── uiStore.js 
│   │	│
│   │   ├── utils/                                             
│   │	│   ├── helpers.js                                           
│   │	│   ├── formatters.js
│   │	│   ├── validators.js
│   │	│   ├── dateUtils.js
│   │   │   └── constants.js
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
│   │   │   │   │   ├── ChangePassword.jsx
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
│   │   │   │
│   │	│   ├── products/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ProductTable.jsx                         # Product data table 
│   │   │   │   │   ├── ProductForm.jsx                          # Shared form for add/edit product 
│   │   │   │   │   ├── ProductCard.jsx                          # Card layout for grid view 
│   │   │   │   │   ├── ProductDetails.jsx  
│   │   │   │   │   ├── ProductSearch.jsx                            
│   │   │   │   │   ├── ProductFilter.jsx  
│   │   │   │   │   ├── ProductStatus.jsx                      
│   │   │   │	│   └── ProductActions.jsx                  
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Products.jsx
│   │   │   │   │   ├── AddProduct.jsx                           
│   │   │   │   │   ├── EditProduct.jsx                                              
│   │   │   │	│   └── ProductDetails.jsx    
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useProducts.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── productApi.js                      
│   │   │   │   ├── utils/
│   │   │   │   │   ├── ProductHelpers.js 
│   │   │   │	│   └── productFormatter.js
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── categories/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CategoryForm.jsx 
│   │   │   │   │   ├── CategoryTable.jsx                          
│   │   │   │   │   ├── CategoryCard.jsx                         
│   │   │   │   │   ├── CategoryDetails.jsx                        
│   │   │   │   │   ├── CategorySearch.jsx 
│   │   │   │   │   ├── CategoryFilters.jsx 
│   │   │   │	│   └── CategoryActions.jsx
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
│   │   │   │   ├── constants/
│   │   │   │	│   └── categoryConstants.js
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── customers/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CustomerForm.jsx                         
│   │   │   │   │   ├── CustomerTable.jsx                        
│   │   │   │   │   ├── CustomerCard.jsx                         
│   │   │   │   │   ├── CustomerDetails.jsx                        
│   │   │   │   │   ├── CustomerSearch.jsx
│   │   │   │   │   ├── CustomerFilters.jsx                         
│   │   │   │   │   ├── CustomerStats.jsx                        
│   │   │   │	│   └── CustomerActions.jsx                   
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
│   │   │   │   │   ├── customerHelpers.js 
│   │   │   │	│   └── customerFormatters.js 
│   │   │   │   ├── constants/
│   │   │   │	│   └── customerConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── suppliers/
│   │   │   │   ├── components/
│   │   │   │   │   ├── SupplierForm.jsx                         
│   │   │   │   │   ├── SupplierTable.jsx                        
│   │   │   │   │   ├── SupplierCard.jsx                         
│   │   │   │   │   ├── SupplierDetails.jsx                        
│   │   │   │   │   ├── SupplierSearch.jsx
│   │   │   │   │   ├── SupplierFilters.jsx                                                 
│   │   │   │	│   └── SupplierActions.jsx                   
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Suppliers.jsx
│   │   │   │   │   ├── AddSupplier.jsx
│   │   │   │   │   ├── EditSupplier.jsx
│   │   │   │	│   └── SupplierDetails.jsx 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useSuppliers.js
│   │   │   │   ├── services/
│   │   │   │	│   └── supplierApi.js  
│   │   │   │   ├── utils/
│   │   │   │   │   ├── supplierHelpers.js 
│   │   │   │	│   └── supplierFormatters.js 
│   │   │   │   ├── constants/
│   │   │   │	│   └── supplierConstants.js 
│   │   │   │	└── index.js 
│   │   │   │
│   │	│   ├── purchases/
│   │   │   │   ├── components/
│   │   │   │   │   ├── PurchaseForm.jsx                         
│   │   │   │   │   ├── PurchaseTable.jsx                        
│   │   │   │   │   ├── PurchaseDetails.jsx                         
│   │   │   │   │   ├── PurchaseItems.jsx                        
│   │   │   │   │   ├── ProductSelector.jsx
│   │   │   │   │   ├── SupplierSelector.jsx                                                 
│   │   │   │   │   ├── QuantityInput.jsx 
│   │   │   │   │   ├── PurchaseSummary.jsx 
│   │   │   │   │   ├── PurchaseStatus.jsx
│   │   │   │	│   └── PurchaseSearch.jsx                   
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Purchases.jsx
│   │   │   │   │   ├── NewPurchase.jsx
│   │   │   │   │   ├── EditPurchase.jsx
│   │   │   │	│   └── PurchaseDetails.jsx 
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── usePurchases.js 
│   │   │   │	│   └── useCreatePurchase.js
│   │   │   │   ├── services/
│   │   │   │	│   └── purchaseApi.js  
│   │   │   │   ├── utils/
│   │   │   │   │   ├── purchaseCalculations.js 
│   │   │   │	│   └── purchaseHelpers.js 
│   │   │   │   ├── constants/
│   │   │   │	│   └── purchaseConstants.js 
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
│   │   │   │	│   └── SalesSearch.jsx
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Sales.jsx 
│   │   │   │   │   ├── NewSale.jsx 
│   │   │   │   │   ├── EditSale.jsx 
│   │   │   │	│   └── SaleDetails.jsx 
│   │   │   │   ├── hooks/                
│   │   │   │   │   ├── useSales.js 
│   │   │   │   │   ├── useSale.js
│   │   │   │	│   └── useCreateSale.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── saleApi.js
│   │   │   │   ├── utils/
│   │   │   │   │   ├── saleCalculations.js 
│   │   │   │   │   ├── saleHelpers.js
│   │   │   │	│   └── saleFormatter.js
│   │   │   │   ├── constants/
│   │   │   │	│   └── saleConstants.js
│   │   │   │	└── index.js 
│   │   │   │
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
│   │	│   ├── inventory/
│   │   │   │   ├── components/
│   │   │   │   │   ├── InventoryTable.jsx 
│   │   │   │   │   ├── InventoryCard.jsx                          
│   │   │   │   │   ├── InventoryFilters.jsx                         
│   │   │   │   │   ├── InventorySearch.jsx                        
│   │   │   │   │   ├── InventoryStats.jsx
│   │   │   │   │   ├── StockInForm.jsx 
│   │   │   │   │   ├── StockOutForm.jsx
│   │   │   │   │   ├── StockAdjustmentForm.jsx 
│   │   │   │	│   └── StockMovementTable.jsx
│   │   │   │   ├── pages/ 
│   │   │   │   │   ├── Inventory.jsx 
│   │   │   │   │   ├── StockIn.jsx  
│   │   │   │   │   ├── StockOut.jsx  
│   │   │   │   │   ├── StockAdjustment.jsx 
│   │   │   │	│   └── StockHistory.jsx 
│   │   │   │   ├── hooks/
│   │   │   │	│   └── useInventory.js 
│   │   │   │   ├── services/
│   │   │   │	│   └── inventoryA pi.js 
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
│   │	│   ├── global.css 
│   │	│   ├── variables.css                                                                                
│   │   │   └── print.css                                     
│   │   ├── App.js                                             # Main routing & layout integration                           
│   │   └── main.jsx                                           # ReactDOM render, React based sms frontend.                                 
│   ├── .env 
│   ├── .env.example
│   ├── package.json
│   └── README.md                     
│
├── backend(Python)
│   ├── app/
│   │   ├── __init__.py                          
│   │   ├── main.py                                           # FastAPI entry point
│   │   ├── core/                                             # Application infrastructure 
│   │   │   ├── __init__.py                                   
│   │   │   ├── config.py                                     # Settings / environment 
│   │   │   ├── security.py                                   # JWT, password hashing 
│   │   │   ├── dependencies.py                               # FastAPI dependencies 
│   │   │   ├── permissions.py                                # Permission check 
│   │   │   ├── exceptions                                    # Application exceptions 
│   │   │   └── logging.py                                    # Logging configuration  
│   │   │
│   │   ├── db/                                               # Database infrastruction 
│   │   │   ├── __init__.py                                   # 
│   │   │   ├── base.py                                       # SQLAlchemy  DeclarativeBase 
│   │   │   ├── session.py                                    # Engine + session  
│   │   │   └── seed.py                                       # Optional seed data
│   │   │
│   │   ├── models/                                           # SQLAlchemy model
│   │   │   ├── __init__.py 
│   │   │   ├── user.py                                   
│   │   │   ├── role.py 
│   │   │   ├── permission.py 
│   │   │   ├── product.py 
│   │   │   ├── customer.py 
│   │   │   ├── supplier.py 
│   │   │   ├── purchase.py 
│   │   │   ├── purchase_item.py 
│   │   │   ├── sale.py
│   │   │   ├── sale_item.py
│   │   │   ├── inventory.py
│   │   │   ├── stock_movement.py 
│   │   │   ├── invoice.py 
│   │   │   ├── payment.py 
│   │   │   └── audit_log.py 
│   │   ├── schemas/                                          # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── common.py 
│   │   │   ├── auth.py
│   │   │   ├── user.py
│   │   │   ├── role.py 
│   │   │   ├── permission.py 
│   │   │   ├── product.py
│   │   │   ├── category.py
│   │   │   ├── customer.py 
│   │   │   ├── supplier.py 
│   │   │   ├── purchase.py 
│   │   │   ├── sale.py
│   │   │   ├── Inventory.py 
│   │   │   ├── stock_movement.py 
│   │   │   ├── invoice.py 
│   │   │   ├── payment.py 
│   │   │   ├── dashboard.py
│   │   │   └── report.py 
│   │   │
│   │   ├── repositories/                                        # Database access 
│   │   │   ├── __init__.py                                 
│   │   │   ├── base_repository.py 
│   │   │   ├── user_reposiory.py 
│   │   │   ├── role_repository.py 
│   │   │   ├── product_repository.py 
│   │   │   ├── category_repository.py 
│   │   │   ├── customer_repository.py 
│   │   │   ├── supplier_repository.py 
│   │   │   ├── purchase_repository.py 
│   │   │   ├── sale_repository.py
│   │   │   ├── inventory_repository.py
│   │   │   ├── invoice_repository.py 
│   │   │   ├── payment_repository.py 
│   │   │   └── report_repository.py 
│   │   │
│   │   ├── services/                                            # Business logic 
│   │   │   ├── __init__.py 
│   │   │   ├── auth_service.py
│   │   │   ├── user_service.py
│   │   │   ├── role_service.py 
│   │   │   ├── product_service.py
│   │   │   ├── category_service.py
│   │   │   ├── customer_service.py 
│   │   │   ├── supplier_service.py 
│   │   │   ├── purchase_service.py 
│   │   │   ├── sale_service.py
│   │   │   ├── Inventory_service.py 
│   │   │   ├── invoice_service.py 
│   │   │   ├── payment_service.py 
│   │   │   ├── dashboard_service.py 
│   │   │   └── report_repository.py 
│   │   │
│   │   ├── api/                                                 # HTTP API 
│   │   │   ├── __init__.py 
│   │   │   ├── router.py                                        # Main API router 
│   │   │   ├── deps.py                                          # Route-specific dependencies 
│   │   │   ├── auth.py 
│   │   │   ├── users.py 
│   │   │   ├── products.py
│   │   │   ├── categories.py
│   │   │   ├── customers.py 
│   │   │   ├── suppliers.py 
│   │   │   ├── purchases.py
│   │   │   ├── sales.py
│   │   │   ├── inventory.py 
│   │   │   ├── invoices.py 
│   │   │   ├── payment.py 
│   │   │   ├── dashboard.py 
│   │   │   └── reports.py 
│   │   │
│   │   ├── middleware/                                          # HTTP moddleware
│   │   │   ├── __init__.py                           
│   │   │   ├── error_handler.py 
│   │   │   ├── request_id.py 
│   │   │   └── logging.py 
│   │   │
│   │   ├── utils/            
│   │   │   ├── __init__.py               
│   │   │   ├── constants.py 
│   │   │   ├── pagination.py 
│   │   │   ├── response.py
│   │   │   ├── validators.py 
│   │   │   └── formatters.py                                               
│   │   │
│   │   └── providers/                                           # External integration
│   │       ├── __init__.py 
│   │       ├── email.py
│   │       ├── sms.py 
│   │       ├── payment_gateway.py
│   │       └── storage.py
│	├── alembic/                                              # Migrations (important for PostgreSQL)
│   │   ├── versions/
│   │   ├── env.py 
│   │   └── script.py.mako 
│	├── tests/
│   │   ├── conftest.py 
│   │   ├── unit/ 
│   │   │   ├── test_auth_service.py 
│   │   │   ├── test_product_service.py 
│   │   │   ├── test_sale_service.py 
│   │   │   └── test_inventory_service.py                                     
│   │   └── integration/
│   │       ├── test_auth.py 
│   │       ├── test_product.py 
│   │       ├── test_customer.py 
│   │       ├── test_purchases.py 
│   │       ├── test_sales.py 
│   │       ├── test_inventory.py 
│   │       ├── test_payments.py 
│   │       └── test_report.py 
│	├── requirements.txt
│	├── .env
│	├── .env.example 
│	├── .gitignore
│   └── README.md 
│   



export const navigations = [
  {
    name: 'Profiles',
    children: [
      { name: 'Profile 1', path: '/dashboards/profile' },
      { name: 'Profile 2', path: '/dashboards/profile-v2' },
    ],
  },

  {
    name: 'Accounts',
    children: [
      { name: 'Account 1', path: '/dashboards/account' },
      { name: 'Account 2', path: '/dashboards/account-v2' },
    ],
  },
  {
    name: 'User & Contact',
    children: [
      { name: 'Add User', path: '/dashboards/add-user' },
      { name: 'User List 1', path: '/dashboards/user-list' },
      { name: 'User List 2', path: '/dashboards/user-list-v2' },
      { name: 'User Grid 1', path: '/dashboards/user-grid' },
      { name: 'User Grid 2', path: '/dashboards/user-grid-v2' },
      { name: 'Contact List', path: '/dashboards/contact-list' },
      { name: 'Contact Grid', path: '/dashboards/contact-grid' },
    ],
  },

  {
    name: 'Invoice',
    children: [
      { name: 'Invoice List 1', path: '/dashboards/invoice-list' },
      { name: 'Invoice List 2', path: '/dashboards/invoice-list-v2' },
      { name: 'Invoice Details 1', path: '/dashboards/invoice-details' },
      { name: 'Invoice Details 2', path: '/dashboards/invoice-details-v2' },
      { name: 'Create Invoice 1', path: '/dashboards/create-invoice' },
      { name: 'Create Invoice 2', path: '/dashboards/create-invoice-v2' },
    ],
  },

  {
    name: 'Ecommerce',
    children: [
      { name: 'Cart', path: '/dashboards/cart' },
      { name: 'Payment', path: '/dashboards/payment' },
      { name: 'Billing Address', path: '/dashboards/billing-address' },
      { name: 'Product Details', path: '/dashboards/product-details' },
      { name: 'Shop 1', path: '/dashboards/shop' },
      { name: 'Shop 2', path: '/dashboards/shop-v2' },
      { name: 'Checkout 1', path: '/dashboards/checkout' },
      { name: 'Checkout 2', path: '/dashboards/checkout-v2' },
      { name: 'Payment Complete 1', path: '/dashboards/payment-complete' },
      { name: 'Payment Complete 2', path: '/dashboards/payment-complete-v2' },
    ],
  },

  {
    name: 'Admin Ecommerce',
    children: [
      { name: 'Product List', path: '/dashboards/product-list' },
      { name: 'Product Grid', path: '/dashboards/product-grid' },
      { name: 'Create Product', path: '/dashboards/create-product' },
      { name: 'Order Management', path: '/dashboards/order-management' },
      { name: 'Product Management', path: '/dashboards/product-management' },
      { name: 'Customer Management', path: '/dashboards/customer-management' },
    ],
  },

  {
    name: 'Projects',
    children: [
      { name: 'Project List 1', path: '/dashboards/project-v1' },
      { name: 'Project List 2', path: '/dashboards/project-v2' },
      { name: 'Project List 3', path: '/dashboards/project-v3' },
      { name: 'Team Member', path: '/dashboards/team-member' },
      { name: 'Project Details', path: '/dashboards/project-details' },
    ],
  },

  {
    name: 'Data Table',
    path: '/dashboards/data-table-v2',
    // children: [{ name: 'Data Table', path: '/dashboards/data-table-v2' }],
  },
];

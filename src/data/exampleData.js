// examle data for landing page navigation links
export const NavLinks = [
  { key: "home", label: "Home", path: "/" },
  /* {
    key: "products",
    label: "Products",
    path: "/products",
    subLinks: [
      { label: "Product Grid", path: "/products#product-grid" },
      { label: "Product List", path: "/products#product-list" },
      { label: "Featured Product", path: "/products#featured-product" },
      { label: "Featured Product + Grid", path: "/products#featured-product-grid" },
      { label: "Bento Product Grid", path: "/products#bento-product-grid" },
      { label: "Product Carousel", path: "/products#product-carousel" },
      { label: "Category Tabs + Grid", path: "/products#category-tabs-grid" },
    ],
  }, */
  /* { key: "pricing", label: "Pricing", path: "/pricing" }, */
  { key: "services", label: "Services", path: "/services" },
  { key: "about", label: "About", path: "/about" },
  /* { key: "404", label: "404", path: "/404" }, */
];

// Mock data for development. Replace with API data later.
export const MockServices = [
  {
    id: 1,
    name: "Brand Strategy",
    description: "A focused strategy engagement to clarify your positioning and direction.",
    included: ["Discovery workshop", "Brand positioning", "Strategic roadmap"],
    price: "$2,400",
    billingPeriod: "usage",
    duration: "3-4 weeks",
    members: 2,
  },
  {
    id: 2,
    name: "Web Design",
    description: "Thoughtful digital experiences designed around your audience and goals.",
    included: ["UX direction", "Visual design system", "Responsive prototypes"],
    price: "$4,800",
    billingPeriod: "usage",
    duration: "6-8 weeks",
    members: 3,
  },
  {
    id: 3,
    name: "Ongoing Support",
    description: "Flexible design support for teams that need an experienced partner on call.",
    included: ["Monthly design hours", "Priority requests", "Design reviews"],
    price: "$1,200",
    billingPeriod: "month",
    duration: "Monthly",
    members: 1,
  },
];

export const MockPricing = [
  {
    id: 1,
    name: "Starter",
    description: "A focused plan for individuals and small teams getting started.",
    price: "$29",
    billingPeriod: "month",
    benefits: ["Core features", "Email support", "1 team member"],
    duration: "Monthly",
  },
  {
    id: 2,
    name: "Professional",
    description: "Advanced tools for growing teams that need more flexibility.",
    price: "$79",
    billingPeriod: "month",
    benefits: ["All Starter benefits", "Advanced analytics", "Up to 10 members"],
    duration: "Monthly",
  },
  {
    id: 3,
    name: "Enterprise",
    description: "A tailored plan with dedicated support for larger organizations.",
    price: "$199",
    billingPeriod: "year",
    benefits: ["Unlimited features", "Priority support", "Dedicated success manager"],
    duration: "Annual",
  },
];

export const MockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    type: "Electronics",
    price: "$349",
    available: 24,
    status: "active",
    sku: "WH-001",
    description: "Premium wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Leather Backpack",
    type: "Accessories",
    price: "$129",
    available: 0,
    status: "inactive",
    sku: "LB-002",
    description: "Handcrafted leather backpack with laptop sleeve.",
  },
  {
    id: 3,
    name: "USB-C Hub",
    type: "Electronics",
    price: "$79",
    available: 156,
    status: "active",
    sku: "UC-003",
    description: "7-in-1 USB-C hub with HDMI and card reader.",
  },
  {
    id: 4,
    name: "Coffee Maker",
    type: "Appliances",
    price: "$199",
    available: 8,
    status: "active",
    sku: "CM-004",
    description: "Programmable drip coffee maker with thermal carafe.",
  },
  {
    id: 5,
    name: "Desk Lamp",
    type: "Furniture",
    price: "$89",
    available: 42,
    status: "active",
    sku: "DL-005",
    description: "Adjustable LED desk lamp with wireless charging base.",
  },
  {
    id: 6,
    name: "Phone Stand",
    type: "Accessories",
    price: "$29",
    available: 203,
    status: "active",
    sku: "PS-006",
    description: "Minimalist aluminum phone stand for desk.",
  },
];

export const MockProfile = {
  name: "Reisalin Stout",
  email: "ryza@atelier.com",
  phone: "+1 (555) 234-5678",
  address: "67 village of Rasenboden",
  city: "Kurken Island",
  country: "Sardonica",
};

// Dashboard Overview Mock Data
export const MockDashboardStats = [
  {
    label: "Total Revenue",
    value: "$124,592",
    change: "+12.5%",
    trend: "up",
    color: "bg-primary-orange-strong",
  },
  {
    label: "Active Users",
    value: "8,234",
    change: "+8.2%",
    trend: "up",
    color: "bg-primary-purple-strong",
  },
  {
    label: "Total Orders",
    value: "1,429",
    change: "-2.4%",
    trend: "down",
    color: "bg-primary-sage-strong",
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "0.0%",
    trend: "neutral",
    color: "bg-primary-black-strong dark:bg-primary-grey-strong",
  },
];

export const MockDashboardActivities = [
  {
    user: "Sarah Johnson",
    action: "Completed checkout",
    time: "2 minutes ago",
    icon: "CreditCard",
    color: "bg-primary-orange-strong"
  },
  {
    user: "Michael Chen",
    action: "Added 3 items to cart",
    time: "12 minutes ago",
    icon: "Package",
    color: "bg-primary-purple-strong"
  },
  {
    user: "Emma Williams",
    action: "Updated profile settings",
    time: "28 minutes ago",
    icon: "Settings",
    color: "bg-primary-sage-strong"
  },
  {
    user: "James Martinez",
    action: "Registered new account",
    time: "1 hour ago",
    icon: "User",
    color: "bg-primary-black-strong dark:bg-primary-grey-strong"
  },
  {
    user: "Olivia Brown",
    action: "Requested refund",
    time: "2 hours ago",
    icon: "AlertCircle",
    color: "bg-primary-orange-strong"
  },
  {
    user: "David Lee",
    action: "Left product review",
    time: "3 hours ago",
    icon: "Package",
    color: "bg-primary-purple-strong"
  },
];

export const MockPerformanceMetrics = [
  { category: "Product Sales", value: 45, icon: "ShoppingCart", color: "bg-primary-orange-strong" },
  { category: "User Growth", value: 62, icon: "Users", color: "bg-primary-purple-strong" },
  { category: "Engagement", value: 78, icon: "Activity", color: "bg-primary-sage-strong" },
  { category: "Market Share", value: 51, icon: "TrendingUp", color: "bg-primary-black-strong dark:bg-primary-grey-strong" },
];

export const MockKeyMetrics = [
  { label: "Avg. Order Value", value: "$156.42", change: "+5.2%" },
  { label: "Customer Retention", value: "87.3%", change: "+2.1%" },
  { label: "Cart Abandonment", value: "22.5%", change: "-3.8%" },
  { label: "Repeat Customers", value: "43.2%", change: "+7.4%" },
];

export const MockTopProducts = [
  {
    name: "Premium Analytics Dashboard",
    category: "Software",
    revenue: "$24,892",
    orders: 156,
    growth: "+15.3%",
    trend: "up",
  },
  {
    name: "Business Consulting Package",
    category: "Services",
    revenue: "$18,420",
    orders: 42,
    growth: "+8.7%",
    trend: "up",
  },
  {
    name: "Enterprise Solution",
    category: "Software",
    revenue: "$31,256",
    orders: 28,
    growth: "-2.4%",
    trend: "down",
  },
  {
    name: "Marketing Strategy Kit",
    category: "Services",
    revenue: "$12,890",
    orders: 87,
    growth: "+22.1%",
    trend: "up",
  },
  {
    name: "Development Tools Suite",
    category: "Software",
    revenue: "$9,345",
    orders: 134,
    growth: "+5.2%",
    trend: "up",
  },
];

// Analytics Chart Mock Data
export const MockAnalyticsChartData = [
  { month: "Jan", revenue: 18234, users: 612 },
  { month: "Feb", revenue: 22156, users: 745 },
  { month: "Mar", revenue: 25891, users: 891 },
  { month: "Apr", revenue: 22156, users: 1023 },
  { month: "May", revenue: 22156, users: 1156 },
  { month: "Jun", revenue: 34567, users: 1289 },
  { month: "Jul", revenue: 37891, users: 1434 },
  { month: "Aug", revenue: 41234, users: 1567 },
  { month: "Sep", revenue: 37891, users: 1723 },
];
import {
  HistoryItem,
  NavLink,
  NotificationItem,
  ProductUIData,
  User,
} from "@/app/types/index";

// LINKS DATA -> PAGE
export const links: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    iconPath: "/dashboard_nav_icon.svg",
  },
  {
    label: "Staffs",
    href: "/dashboard/staffs",
    iconPath: "/dashboard_topbar_user_icon.svg",
  },
  {
    label: "Sales",
    href: "/dashboard/sales",
    iconPath: "/dashboard_nav_sales_icon.svg",
  },
  {
    label: "Items",
    href: "/dashboard/items",
    iconPath: "/dashboard_nav_items_icon.svg",
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    iconPath: "/dashboard_nav_notification_icon.svg",
  },
  {
    label: "History",
    href: "/dashboard/history",
    iconPath: "/dashboard_nav_history_icon.svg",
  },
  {
    label: "Store Profile",
    href: "/dashboard/store-profile",
    iconPath: "/dashboard_nav_store_profile_icon.svg",
  },

  {
    label: "Logout",
    href: "/",
    iconPath: "/Logout-icon.svg",
    isLogout: true,
  },
];

// MOCK STORE PROFILE DATA -> PAGE
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
  {
    id: "2",
    productId: "3452G",
    type: "updated",
    createdAt: "2024-10-01",
  },
  {
    id: "3",
    productId: "3452G",
    type: "updated",
    createdAt: "2024-10-01",
  },
  {
    id: "4",
    productId: "3452G",
    type: "updated",
    createdAt: "2024-10-01",
  },
  {
    id: "5",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
  {
    id: "6",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
  {
    id: "7",
    productId: "3456V",
    type: "added",
    createdAt: "2024-10-01",
  },
  {
    id: "8",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
];

// MOCK HISTORY UI DATA -> PAGE
export const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "1",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
  {
    id: "2",
    productId: "3452G",
    type: "updated",
    createdAt: "2024-10-01",
  },
  {
    id: "3",
    productId: "3452G",
    type: "updated",
    createdAt: "2024-10-01",
  },
  {
    id: "4",
    productId: "3452G",
    type: "updated",
    createdAt: "2024-10-01",
  },
  {
    id: "5",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
  {
    id: "6",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
  {
    id: "7",
    productId: "3456V",
    type: "added",
    createdAt: "2024-10-01",
  },
  {
    id: "8",
    productId: "3456V",
    type: "sold",
    createdAt: "2024-10-01",
  },
];

// MOCK PRODUCTS UI DATA -> PAGE
export const MOCK_PRODUCTS: ProductUIData[] = [
  {
    id: "p1",
    image: "/dashboard_card_sales_icon.svg",
    name: "Laundry Detergent",
    code: "001",
    price: 1500,
    stock: 40,
  },
  {
    id: "p2",
    image: "/dashboard_card_sales_icon.svg",
    name: "Laundry Detergent",
    code: "001",
    price: 1500,
    stock: 50,
  },
  {
    id: "p3",
    image: "/dashboard_card_sales_icon.svg",
    name: "Sponges",
    code: "021",
    price: 1240,
    stock: 9,
  },
  {
    id: "p4",
    image: "/dashboard_card_sales_icon.svg",
    name: "Sponges",
    code: "021",
    price: 1240,
    stock: 9,
  },
  {
    id: "p5",
    image: "/dashboard_card_sales_icon.svg",
    name: "Dish Soap",
    code: "901",
    price: 1200,
    stock: 100,
  },
  {
    id: "p6",
    image: "/dashboard_card_sales_icon.svg",
    name: "Hand Sanitizer",
    code: "083",
    price: 1500,
    stock: 59,
  },
  {
    id: "p7",
    image: "/dashboard_card_sales_icon.svg",
    name: "Hand Sanitizer",
    code: "083",
    price: 1500,
    stock: 59,
  },
  {
    id: "p8",
    image: "/dashboard_card_sales_icon.svg",
    name: "Dustpan",
    code: "001",
    price: 1710,
    stock: 91,
  },
  {
    id: "p9",
    image: "/dashboard_card_sales_icon.svg",
    name: "Laundry Detergent",
    code: "006",
    price: 1500,
    stock: 50,
  },
  {
    id: "p10",
    image: "/dashboard_card_sales_icon.svg",
    name: "Sponges",
    code: "021",
    price: 1540,
    stock: 50,
  },
  {
    id: "p11",
    image: "/dashboard_card_sales_icon.svg",
    name: "Hand Sanitizer",
    code: "083",
    price: 1500,
    stock: 72,
  },
  {
    id: "p12",
    image: "/dashboard_card_sales_icon.svg",
    name: "Laundry Detergent",
    code: "061",
    price: 1300,
    stock: 50,
  },
  {
    id: "p13",
    image: "/dashboard_card_sales_icon.svg",
    name: "Dustpan",
    code: "001",
    price: 1900,
    stock: 50,
  },
  {
    id: "p14",
    image: "/dashboard_card_sales_icon.svg",
    name: "Dustpan",
    code: "001",
    price: 1900,
    stock: 50,
  },
  {
    id: "p15",
    image: "/dashboard_card_sales_icon.svg",
    name: "Laundry Detergent",
    code: "001",
    price: 1900,
    stock: 70,
  },
  {
    id: "p16",
    image: "/dashboard_card_sales_icon.svg",
    name: "Hand Sanitizer",
    code: "083",
    price: 1800,
    stock: 50,
  },
  {
    id: "p17",
    image: "/dashboard_card_sales_icon.svg",
    name: "Sponges",
    code: "021",
    price: 2100,
    stock: 10,
  },
];

// MOCK STAFFS UI DATA -> PAGE

export const MOCK_STAFFS: User[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "john.doe@company.com",
    name: "John Doe",
    role: "ADMIN",
    businessId: "business-123",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "jane.smith@company.com",
    name: "Jane Smith",
    role: "STAFF",
    businessId: "business-123",
    createdAt: new Date("2024-03-20"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    email: "bob.wilson@company.com",
    name: "Bob Wilson",
    role: "STAFF",
    businessId: "business-123",
    createdAt: new Date("2024-06-10"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    email: "alice.johnson@company.com",
    name: "Alice Johnson",
    role: "ADMIN",
    businessId: "business-123",
    createdAt: new Date("2024-02-28"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    email: "michael.brown@company.com",
    name: null,
    role: "STAFF",
    businessId: "business-123",
    createdAt: new Date("2024-07-05"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    email: "sarah.davis@company.com",
    name: "Sarah Davis",
    role: "STAFF",
    businessId: "business-123",
    createdAt: new Date("2024-04-12"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    email: "david.martinez@company.com",
    name: "David Martinez",
    role: "STAFF",
    businessId: "business-123",
    createdAt: new Date("2024-08-18"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    email: "emily.taylor@company.com",
    name: "Emily Taylor",
    role: "ADMIN",
    businessId: "business-123",
    createdAt: new Date("2024-05-22"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    email: "chris.anderson@company.com",
    name: null,
    role: "STAFF",
    businessId: "business-123",
    createdAt: new Date("2024-09-30"),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    email: "lisa.thompson@company.com",
    name: "Lisa Thompson",
    role: "STAFF",
    businessId: "business-123",
    createdAt: new Date("2024-11-14"),
  },
];


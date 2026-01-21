import { NavLink } from "../types";

// LINKS DATA
export const links: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    iconPath: "/dashboard_nav_icon.svg",
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

//STORE PROFILE DATA

export type AppDataType = "sold" | "updated" | "added";

export interface NotificationItem {
  id: string;
  productId: string;
  type: AppDataType;
  createdAt: string;
}

export const notifications: NotificationItem[] = [
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

//HISTORY PAGE DATA

export interface HistoryItem {
  id: string;
  productId: string;
  type: AppDataType;
  createdAt: string;
}

export const historyLists: HistoryItem[] = [
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

// PRODUCTS DATA
export interface Product {
  id: string;
  image: string;
  name: string;
  code: string;
  price: number;
  stock: number;
}

export const MOCK_PRODUCTS: Product[] = [
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

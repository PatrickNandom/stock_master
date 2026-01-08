//STORE PROFILE DATA
export type NotificationType = "sold" | "updated" | "added";

export interface NotificationItem {
  id: string;
  productId: string;
  type: NotificationType;
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

export type HistoryType = "sold" | "updated" | "added";

export interface HistoryItem {
  id: string;
  productId: string;
  type: NotificationType;
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
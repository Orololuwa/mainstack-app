export enum TransactionStatus {
  SUCCESSFUL = "successful",
  PENDING = "pending",
  FAILED = "failed",
}

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

export interface TransactionMetadata {
  name?: string;
  type?: string;
  email?: string;
  quantity?: number;
  country?: string;
  product_name?: string;
}

export interface Transaction {
  amount: number;
  metadata?: TransactionMetadata;
  payment_reference?: string;
  status: TransactionStatus;
  type: TransactionType;
  date: string;
}

export type TransactionResponse = Transaction[];

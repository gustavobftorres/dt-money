import { createContext, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  createTransaction: (data: CreateTransactionInput) => void;
}

export const TransactionsContext = createContext({} as TransactionContextType);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEY = "dt-money:transactions-v1";

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Transaction[];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function createTransaction(data: CreateTransactionInput) {
    const newTransaction: Transaction = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...data,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
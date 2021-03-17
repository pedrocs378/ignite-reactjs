import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { api } from '../services/api'

interface Transaction {
	id: number
	title: string
	amount: number
	type: string
	category: string
	createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextProps {
	transactions: Transaction[]
	createTransaction: (transaction: TransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
	children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps)

function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([])

	useEffect(() => {
		api.get('/transactions').then(response => {
			setTransactions(response.data.transactions)
		})
	}, [])

	async function createTransaction(transactionInput: TransactionInput) {
		const response = await api.post('/transactions', {
			...transactionInput,
			createdAt: new Date()
		})

		setTransactions([...transactions, response.data.transactions])
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	)
}

function useTransactions() {
	const context = useContext(TransactionsContext)

	return context
}

export { TransactionsProvider, useTransactions }

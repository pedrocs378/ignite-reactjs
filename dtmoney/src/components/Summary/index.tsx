
import { useMemo } from 'react'

import { useTransactions } from '../../hooks/useTransactions'

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

import { Container } from "./styles"

function Summary() {
	const { transactions } = useTransactions()

	const summary = useMemo(() => {
		return transactions.reduce((acc, transaction) => {
			if (transaction.type === 'deposit') {
				acc.deposits += transaction.amount
				acc.total += transaction.amount
			} else {
				acc.withdraws += transaction.amount
				acc.total -= transaction.amount
			}

			return acc
		}, {
			deposits: 0,
			withdraws: 0,
			total: 0
		})
	}, [transactions])

	return (
		<Container>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt="Entradas" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(summary.deposits)}
				</strong>
			</div>
			<div>
				<header>
					<p>Saídas</p>
					<img src={outcomeImg} alt="Entradas" />
				</header>
				<strong>
					- {new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL'
				}).format(summary.withdraws)}
				</strong>
			</div>
			<div className="item-highlight">
				<header>
					<p>Entradas</p>
					<img src={totalImg} alt="Entradas" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(summary.total)}
				</strong>
			</div>
		</Container>
	)
}

export { Summary }

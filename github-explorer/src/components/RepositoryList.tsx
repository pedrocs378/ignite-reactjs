import { useEffect, useState } from "react";
import axios from 'axios'

import { RepositoryItem, Repository } from "./RepositoryItem";

import '../styles/repositories.scss'

export function RepositoryList() {
	const [repositories, setRepositories] = useState<Repository[]>([])

	useEffect(() => {
		axios
			.get('https://api.github.com/orgs/rocketseat/repos')
			.then(response => {
				setRepositories(response.data)
			})
	}, [])

	return (
		<section className="repository-list">
			<h1>Lista de repositórios</h1>

			<ul>
				{repositories.map(repository => {
					return (
						<RepositoryItem
							key={repository.id}
							repository={repository}
						/>
					)
				})}
			</ul>
		</section>
	)
}
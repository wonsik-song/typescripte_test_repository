export interface Repository<T, U> {
	save(data: T): void

	delete(id: U): void

	update(data: T): void

	get(id: U): T | undefined
}

import { IPerson } from './person.interface'

export interface IResponse {
    count: number
    next: string | null
    previous: string
    results: IPerson[]
}

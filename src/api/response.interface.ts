export interface IResponse {
    count: number
    next: string | null
    previous: string
    results: IPerson[]
}

export interface IPerson {
    name: string
    gender: string
    url: string
}

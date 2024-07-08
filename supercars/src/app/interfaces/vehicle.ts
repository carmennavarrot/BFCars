export interface Vehicle {
    filter(arg0: (vehicle: any) => any): string
    _id: string
    brand: string
    model: string
    description: string
    image: string
    pricePerDay: number
    year: number
    available: boolean
    __v: number
}

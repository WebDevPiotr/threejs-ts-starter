export type Event = {
    type: string,
    data: any
}

export type Callback = (event: Event) => void
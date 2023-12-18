export default class RabbitMessageRequest<T> {
    data: T;
    type: string;
    retry: number | null;

    public constructor(data: T, type: string, retry: number | null) {
        this.data = data;
        this.type = type;
        this.retry = retry;
    }

    public static create<T>(data: T, type: string, retry: number | null): RabbitMessageRequest<T> {
        return new RabbitMessageRequest(data, type, retry);
    }
}

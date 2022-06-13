export default class RabbitMessageRequest<T> {
    retry: number | null;
    data: T;

    public constructor(data: T, retry: number | null) {
        this.data = data;
        this.retry = retry;
    }

    public static create<T>(
        data: T,
        retry: number | null,
    ): RabbitMessageRequest<T> {
        return new RabbitMessageRequest(data, retry);
    }
}

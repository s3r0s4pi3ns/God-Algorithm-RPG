export interface Factory<T> {
    create: (params?: Partial<T>) => T;
}
export interface Locale<T> {
    name: string;
    data: LocalTranslationsWrapper<T>;
}
export interface LocalTranslationsWrapper<T> {
    [key: string]: T;
}

import { Promise } from 'es6-shim';
export interface Writer {
    Write(): Promise<any>;
}
import { Signal } from "@angular/core";

export interface RepoResource<T>{
    value: Signal<T | undefined>;
    isLoading: Signal<boolean>;
    error: Signal<unknown>;
    reload: () => void
}
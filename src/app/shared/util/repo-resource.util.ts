import { HttpResourceRef } from "@angular/common/http";
import { RepoResource } from "@shared/type/repo-resource";

export function toRepoResource<T>(httpRef: HttpResourceRef<T>): RepoResource<T>{
    return {
        value: httpRef.value,
        isLoading: httpRef.isLoading,
        error: httpRef.error,
        reload: () => httpRef.reload()
    }
}
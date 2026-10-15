import { computed } from "@angular/core";
import { HttpResourceRef } from "@angular/common/http";
import { RepoResource } from "@shared/type/repo-resource";

export function toRepoResource<T>(httpRef: HttpResourceRef<T>): RepoResource<T>{
    return {
        // value() lanza una excepción si el recurso está en error; se expone undefined
        // para que la vista muestre la tabla vacía en lugar de cortar el render
        value: computed(() => httpRef.hasValue() ? httpRef.value() : undefined),
        isLoading: httpRef.isLoading,
        error: httpRef.error,
        reload: () => httpRef.reload()
    }
}

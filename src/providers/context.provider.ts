import * as requestContext from "request-context";

export class ContextProvider {
    private static readonly nameSpace = "request";

    static get<T>(key: string): T {
        return requestContext.get(ContextProvider._getKeyWithNamespace(key));
    }

    static set(key: string, value: any): void {
        requestContext.set(ContextProvider._getKeyWithNamespace(key), value);
    }

    private static _getKeyWithNamespace(key: string): string {
        return `${ContextProvider.nameSpace}.${key}`;
    }
}

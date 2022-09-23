import { Type } from "typescript";

/**
 * https://stackoverflow.com/questions/69299609/map-array-of-values-to-generic-type-in-typescript
 */
type Constructor<T> = { new(): T }

export class Container {
    private services = new Map<any, any>;

    register<T, K extends T = T>(key: Constructor<T>, instance: K) {
        this.services.set(key, instance);
    }

    get<T, K extends T = T>(key?: Constructor<T>): K {
        if (this.services.has(key)) {
            return this.services.get(key);
        }

        throw new ReferenceError('No instance registered for the type: ' + key);
    }
}

export default Container;
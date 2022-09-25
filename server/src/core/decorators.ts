export function Controller(path: string = '/') {
    return function(target: any) {
        Object.defineProperty(target, 'path', { value: path });  
    }
}

interface RequestMappingOptions {
    auth?: boolean
};
type RequestMappingDecorator = (path: string, options?: RequestMappingOptions) => MethodDecorator;
export interface RouteInfo extends RequestMappingOptions {
    httpMethod: string,
    path: string,
    method: string,
}

const createMappingDecorator = (httpMethod: string): RequestMappingDecorator => {
    return (path: string, options?: RequestMappingOptions) => {
        return function(target: any, key: any) {
            const routesPropDesc = Object.getOwnPropertyDescriptor(target.constructor, 'routes');

            const routes = (routesPropDesc?.value || []) as Array<RouteInfo>;
    
            routes.push({
                method: key,
                httpMethod: httpMethod,
                path,
                ...options
            });
    
            Object.defineProperty(target.constructor, 'routes', {
                value: routes,
                configurable: true,
                writable: true
            });
        }
    }
}

export const Get = createMappingDecorator('get');
export const Post = createMappingDecorator('post');
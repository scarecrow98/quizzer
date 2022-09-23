export interface RouteInfo {
    httpMethod: string;
    path: string;
    method: string;
}

export function Controller(path: string = '/') {
    return function(target: any) {
        Object.defineProperty(target, 'path', { value: path });  
    }
}

type RequestMappingDecorator = (path: string) => MethodDecorator;

const createMappingDecorator = (httpMethod: string): RequestMappingDecorator => {
    return (path: string) => {
        return function(target: any, key: any) {
            const routesPropDesc = Object.getOwnPropertyDescriptor(target.constructor, 'routes');

            const routes = (routesPropDesc?.value || []) as Array<RouteInfo>;
    
            routes.push({
                method: key,
                httpMethod: httpMethod,
                path
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
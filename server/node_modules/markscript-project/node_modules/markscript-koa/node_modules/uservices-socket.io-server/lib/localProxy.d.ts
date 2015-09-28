import { Service } from 'uservices';
export declare function createLocalProxy<T>(server: SocketIO.Server | SocketIO.Namespace, serviceSpec: Service<any, any>, service: T): void;

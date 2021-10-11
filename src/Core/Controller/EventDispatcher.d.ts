import { Event, Callback } from './types';
declare class EventDispatcher {
    private eventMap;
    subscribe(eventName: string, callback: Callback): void;
    unsubscribe(eventName: string, callback: Callback): void;
    emit(eventName: string, event: Event): void;
    clear(): void;
}
export default EventDispatcher;

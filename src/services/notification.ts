import {suuid} from "./uuid";

export enum IEvent {
    rooms="rooms",
    login="login",
    messages="messages",
}

export type IListener = (payload: any) => void;

export type IListenerList = Map<string, IListener>;

export class NotificationService {
    private static _instance = new NotificationService();

    public static instance() {
        return NotificationService._instance;
    }

    private listeners = new Map<string, IListenerList>();

    public subscribe(event: IEvent, eventSelector: string|undefined, listener: IListener) {
        let strEvent = event.toString();
        if(eventSelector) {
            strEvent = strEvent + eventSelector;
        }
        const eventListeners = this.listeners.get(strEvent) || new Map<string, IListener>();
        const id = suuid();
        eventListeners.set(id, listener);
        this.listeners.set(strEvent, eventListeners);
        return id;
    }

    public unsubscribe(event: IEvent, eventSelector: string|undefined, listenerId: string) {
        let strEvent = event.toString();
        if(eventSelector) {
            strEvent = strEvent + eventSelector;
        }
        const eventListeners = this.listeners.get(strEvent);
        if (!eventListeners) {
            return;
        }
        eventListeners.delete(listenerId);
        if(eventListeners.size===0) {
            this.listeners.delete(strEvent);
        }
    }

    public notify(event: IEvent, eventSelector: string|undefined, payload: any) {
        let strEvent = event.toString();
        if(eventSelector) {
            strEvent = strEvent + eventSelector;
        }
        console.log(`notify event event=${event} eventSelector=${eventSelector} strEvent=${strEvent}`)
        const eventListeners = this.listeners.get(strEvent);
        if (!eventListeners) {
            console.log(`not found listeners for ${strEvent}`)
            console.dir(this.listeners)
            return;
        }
console.log("notify strEvent=", strEvent)
        console.log("listener count = ", eventListeners.size)
        eventListeners.forEach((listener: IListener) => {
            try {
                listener(payload);
            } catch(err) {
                console.error(err);
            }
        });
    }
}
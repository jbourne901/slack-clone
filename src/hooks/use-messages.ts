import {IMessage, IRoom, RoomsService} from "../services/rooms";
import {useEffect, useState} from "react";
import {IEvent, NotificationService} from "../services/notification";

type IValue = IMessage[];
const event = IEvent.messages;

export const useMessages = (roomId: string|undefined) => {

    let mounted=true;
    const [value, setValue] = useState<IValue>([]);

    const updateValue = (value: IValue) => {
        console.log("updateValue value=")
        console.dir(value)
        setValue(value);
    };

    let listenerId: string|undefined;
    useEffect(() => {
        const fetchData = async () => {
            if(!roomId) {
                return;
            }
            const v = await RoomsService.instance().getMessages(roomId);
            console.log("useEffect v=")
            console.dir(v)
            setValue(v);
            listenerId = NotificationService.instance().subscribe(event, roomId, (v: IValue) => updateValue(v) );
        }

        if(mounted && roomId) {
            fetchData();
        }

        return () => {
            mounted=false;
            if(listenerId) {
                NotificationService.instance().unsubscribe(event, roomId, listenerId);
                listenerId = undefined;
            }
        };
    }, [roomId]);

    return value;
}
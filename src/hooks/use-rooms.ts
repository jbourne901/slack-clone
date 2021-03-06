import {IRoom, RoomsService} from "../services/rooms";
import {useEffect, useState} from "react";
import {IEvent, NotificationService} from "../services/notification";

type IValue = IRoom[];
const event = IEvent.rooms;

export const useRooms = () => {

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
            const v = await RoomsService.instance().listRooms();
            console.log("useEffect v=")
            console.dir(v)
            setValue(v);
            listenerId = NotificationService.instance().subscribe(event, undefined, (v: IValue) => updateValue(v) );
        }

        if(mounted) {
            fetchData();
        }

        return () => {
            mounted=false;
            if(listenerId) {
                NotificationService.instance().unsubscribe(event, undefined, listenerId);
                listenerId = undefined;
            }
        };
    }, []);

    return value;
}
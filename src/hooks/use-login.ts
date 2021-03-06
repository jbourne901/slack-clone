import {useEffect, useState} from "react";
import {IEvent, NotificationService} from "../services/notification";
import {AuthService, IUser} from "../services/auth";

type IValue = IUser;
const event = IEvent.login;

export const useLogin = () => {

    let mounted=true;
    const [value, setValue] = useState<IValue>();

    const updateValue = (value: IValue) => {
        console.log("updateValue value=")
        console.dir(value)
        setValue(value);
    };

    let listenerId: string|undefined;
    useEffect(() => {
        const fetchData = async () => {
            const v = await AuthService.instance().getUser();
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
                NotificationService.instance().unsubscribe(event,undefined, listenerId);
                listenerId = undefined;
            }
        };
    }, []);

    return value;
}
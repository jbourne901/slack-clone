import {db} from "../firebase";
import {IEvent, NotificationService} from "./notification";
import {IUser} from "./auth";
import firebase from "firebase";

export interface IMessage {
    text: string;
    user?: string;
    userImage?: string;
    timestamp: firebase.firestore.Timestamp;
}

export type IRoom = {
    id: string;
    name: string;
}


export class RoomsService {
    private static _instance = new RoomsService();

    private constructor() {
    }

    public static instance() {
        return RoomsService._instance;
    }

    public async listRooms() {
        return new Promise<IRoom[]>( (resolve: (rooms: IRoom[]) => void, reject: (err: any) => void ) => {
            db.collection("rooms").onSnapshot( (snapshot: any) => {
                const rooms: IRoom[]  = [];
                snapshot.docs.forEach((doc: any) => {
                    //console.log("doc.id=")
                    //console.dir(doc.id)
                    const room: IRoom = {
                        name: doc.data().name,
                        id: doc.id,
                    }
                    rooms.push(room)
                } );
                resolve(rooms);
                NotificationService.instance().notify(IEvent.rooms, undefined, rooms);
            });
        });
    }


    public async addRoom(name: string) {
        return await db.collection("rooms").add({name});
    }

    public async getRoom(roomId: string) {
        return new Promise<IRoom>( (resolve: (room: IRoom) => void, reject: (err: any) => void) => {
            db.collection("rooms").doc(roomId).onSnapshot((doc) => {
                const room: IRoom = {name: doc.data()?.name, id: doc.id};
                resolve(room);
            });
        });
    }

    public async getMessages(roomId: string) {
        return new Promise<IMessage[]>( (resolve: (messages: IMessage[]) => void, reject: (err: any) => void ) => {
            db.collection("rooms").doc(roomId)
                .collection("messages").orderBy('timestamp', 'asc')
                .onSnapshot( (snapshot: any) => {
                const messages: IMessage[]  = [];
                snapshot.docs.forEach((doc: any) => {
                    const message: IMessage = {
                        text: doc.data().text,
                        user: doc.data().user,
                        userImage: doc.data().userImage,
                        timestamp: doc.data().timestamp,
                    }
                    messages.push(message);
                } );
                console.log("messages updated = ")
                console.dir(messages)
                NotificationService.instance().notify(IEvent.messages, roomId, messages);
                resolve(messages);
            });
        });
    }

    public async sendMessage(roomId: string, message: string, sender: IUser|undefined) {
        if(!roomId || !message || !sender) {
            console.error("sendMessage: roomId or message or user is blank - skipping")
            return;
        }

        const msg: IMessage = {
            text: message,
            user: sender.name,
            userImage: sender.photo,
            timestamp: firebase.firestore.Timestamp.now(),
        };

        console.log("adding message")
        console.dir(msg)

        try {
            db.collection("rooms").doc(roomId).collection("messages").add(msg);
            console.log("added");
        } catch(err) {
            console.error(err)
        }

    }
}
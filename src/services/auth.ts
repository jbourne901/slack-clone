import {auth, provider} from "../firebase";
import {IEvent, NotificationService} from "./notification";

export interface IUser {
    name?: string;
    photo?: string;
}

export class AuthService {
    private static readonly _instance = new AuthService();

    public static instance() {
        return AuthService._instance;
    }

    public async login() {
        const result = await auth.signInWithPopup(provider);
        console.log("login result=")
        console.dir(result)
        const newUser: IUser = {};
        if(result.user?.displayName) {
            newUser.name = result.user?.displayName;
        }
        if(result.user?.photoURL) {
            newUser.photo = result.user?.photoURL;
        }
        localStorage.setItem("user", JSON.stringify(newUser));
        NotificationService.instance().notify(IEvent.login, undefined, newUser);
    }

    public async logout() {
        await auth.signOut();
        localStorage.removeItem("user");
        NotificationService.instance().notify(IEvent.login, undefined,undefined);
    }

    public getUser() {
        const strUser = localStorage.getItem("user");
        if(!strUser) {
            return undefined;
        }
        return JSON.parse(strUser);
    }
}
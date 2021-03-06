import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MessageIcon from "@material-ui/icons/Message";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import DraftsIcon from "@material-ui/icons/Drafts";
import AppsIcon from "@material-ui/icons/Apps";
import {IIconType} from "../services/menu";

export interface IIconSelectorProps {
    type: IIconType;
}

export const IconSelector = (props: IIconSelectorProps) => {
    let jsx=null;
    if(props.type===IIconType.BookmarkBorder) {
        jsx = (<BookmarkBorderIcon />)
    } else if(props.type===IIconType.Message) {
        jsx = (<MessageIcon />)
    } else if(props.type===IIconType.Inbox) {
        jsx = (<InboxIcon />)
    } else if(props.type===IIconType.Drafts) {
        jsx = (<DraftsIcon />)
    } else if(props.type===IIconType.People) {
        jsx = (<PeopleIcon />)
    } else if(props.type===IIconType.Apps) {
        jsx = (<AppsIcon />)
    }
    return jsx;
}

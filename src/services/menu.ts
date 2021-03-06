export enum IIconType {
    Message,
    Inbox,
    Drafts,
    BookmarkBorder,
    People,
    Apps,
};

export interface IMenuListItem {
    text: string;
}

export interface IMenuListItemWithIcons extends IMenuListItem {
    iconType: IIconType;
}

const mainChannelList: IMenuListItemWithIcons[] = [
    {iconType: IIconType.Message, text: "Thread"},
    {iconType: IIconType.Inbox, text: "All DMs"},
    {iconType: IIconType.Drafts, text: "Mentions & Reactions"},
    {iconType: IIconType.BookmarkBorder, text: "Save Items"},
    {iconType: IIconType.People, text: "People & Groups"},
    {iconType: IIconType.Apps, text: "More"},
]

const channelList: IMenuListItem[] = [
    {text: "# Clever Programmer"},
    {text: "# CP"},
]


export class MenuService {
    private static readonly _instance = new MenuService();
    public static instance() {
        return MenuService._instance;
    }

    public mainChannels() {
        return mainChannelList;
    }

    public channels() {
        return channelList;
    }

}
import styled from "styled-components";
import {IMessage} from "../services/rooms";

export interface IChatMessageProps {
    message: IMessage;
}

export const ChatMessage = (props: IChatMessageProps) => {

    const userImg = props.message.userImage || "https://randomuser.me/api/portraits/men/39.jpg";
    return (
        <Container>
            <UserAvatar>
                <img src={userImg} />
            </UserAvatar>
            <MessageContent>
                <Name>
                    {props.message.user}
                    <span>{new Date(props.message.timestamp?.toDate()).toString()}</span>
                </Name>
                <Text>
                    {props.message.text}
                </Text>
            </MessageContent>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    padding-top: 8px;
    align-items: center;
`;

const UserAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 2px;
    margin-right: 8px;
    overflow: hidden;
    img {
        width: 100%;
    }
`;

const MessageContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    font-weight: 900;
    font-size: 15px;
    line-height: 1.4;
        
    span {
       margin-left: 8px;
       font-weight: 400;
       font-size: 13px;
       color: rgb(97,96,97);       
    }
`;


const Text = styled.div`

`;


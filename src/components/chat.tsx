import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import React, {useEffect, useState} from "react";
import {ChatInput} from "./chat-input";
import {useParams} from "react-router-dom";
import {IRoom, RoomsService} from "../services/rooms";
import {Loading} from "./loading";
import {ChatMessage} from "./chat-message";
import {useMessages} from "../hooks/use-messages";

export interface IChatParams {
    channelId?: string;
}

export const Chat = () => {

    const {channelId} = useParams<IChatParams>();

    const [room, setRoom] = useState<IRoom|undefined>();

    const messages = useMessages(channelId);

    let mounted=true;
    useEffect(() => {

        const fetchData = async () => {
            if(!channelId) {
                return;
            }
            try {
                const r = await RoomsService.instance().getRoom(channelId);
                setRoom(r);
            } catch(err) {
                console.error(err);
            }
        };
        if(mounted && channelId) {
            fetchData();
        }

        return () => {
            mounted=false;
        }

    }, [channelId])

    const jsxMessages: JSX.Element[] = [];
    if(room && messages) {
        for(let i=0; i<messages.length; i++) {
            const msg = messages[i];
            jsxMessages.push((
                <ChatMessage
                    key={i}
                    message={msg}
                />
            ))
        }
    }

    let jsx;
    if(channelId) {
        jsx = (
            <Container>
                <Header>
                    <Channel>
                        <ChannelName>
                            {room?.name}
                        </ChannelName>
                        <ChannelInfo>
                            Company-wide announcements and work-nased matters
                        </ChannelInfo>
                    </Channel>
                    <ChannelDetails>
                        Details
                        <Info/>
                    </ChannelDetails>
                </Header>
                <MessageContainer>
                    {jsxMessages}
                </MessageContainer>
                <ChatInput channelId={channelId}/>
            </Container>
        )
    } else {
        jsx = (
                <Loading />
                );
    }

    return jsx;

}

const Container = styled.div`
    display: grid;
    grid-template-rows: 64px auto min-content;
    min-height: 0;
`;

const Header = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid rgba(83, 39, 83, .13);
    justify-content: space-between;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

const Channel = styled.div`
    display: flex;
    flex-direction: column;    
`;

const ChannelName = styled.div`
    font-weight: 700;
`;

const ChannelInfo = styled.div`
    font-weight: 400;
    color: #606060;
    font-size: 13px;
    margin-top: 8px;
`;

const ChannelDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #606060;
`;

const Info = styled(InfoOutlinedIcon)`
    margin-left: 10px;
    cursor: pointer;
`;

import styled from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import {MenuService} from "../services/menu";
import {IconSelector} from "./icon-selector";
import {useRooms} from "../hooks/use-rooms";
import {RoomsService} from "../services/rooms";
import {useHistory} from "react-router-dom";

export const Sidebar = () => {
    const rooms = useRooms();

    const history = useHistory();

    const goToChannel = (id: string) => {
        if(id) {
            history.push(`/room/${id}`);
        }
    };

    const addChannel = async () => {
        const name = prompt("Enter channel name");
        if(!name) {
            alert("Name is required");
            return;
        }
        await RoomsService.instance().addRoom(name);
    }

    const jsxMainChannels: JSX.Element[] = [];
    const mainChannels =  MenuService.instance().mainChannels()
    for(let i=0; i<mainChannels.length; i++) {
        const it = mainChannels[i];
        jsxMainChannels.push((
            <MainChannelItem key={i}>
                <IconSelector type={it.iconType} />
                {it.text}
            </MainChannelItem>
        ))
    }

    const jsxChannels: JSX.Element[] = [];
    for(let i=0; i<rooms.length; i++) {
        const it = rooms[i];
        jsxChannels.push((
            <Channel
                key={i}
                onClick={() => goToChannel(it.id)}
            >
                # {it.name}
            </Channel>
        ))
    }

    return (
        <Container>
            <WorkspaceContainer>
                <Name>
                    CleverProgrammer
                </Name>
                <NewMessage>
                    <AddCircleOutlineIcon />
                </NewMessage>
            </WorkspaceContainer>
            <MainChannels>
                {jsxMainChannels}
            </MainChannels>
            <ChannelsContainer>
                <NewChannelContainer>
                    <div>
                        Channels
                    </div>
                    <AddContainer>
                        <AddIcon
                            onClick = {addChannel}
                        />
                    </AddContainer>
                </NewChannelContainer>
                <ChannelsList>
                    {jsxChannels}
                </ChannelsList>
            </ChannelsContainer>
        </Container>
    )
}

const Container = styled.div`
    background: #3f0e40;
`;

const WorkspaceContainer = styled.div`
   color: white;
   height: 64px;
   display: flex;
   padding-left: 19px;
   align-items: center;   
   justify-content: space-between;
   border-bottom: 1px solid #532753;
`;

const Name = styled.div`

`;

const NewMessage = styled.div`
    width: 36px;
    height: 36px;
    background: white;
    color: #3F0e40;
    display: flex;
    align-items: center;   
    justify-content: center;    
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
`;

const MainChannels = styled.div`
    padding-top: 20px;
`;

const MainChannelItem = styled.div`
    display: grid;
    grid-template-columns: 15% auto;
    color: rgb(188, 171, 188);
    height: 28px;
    align-items: center;
    justify-content: flex-start;
    padding-left: 19px;
    cursor: pointer;        
`;

const ChannelsContainer = styled.div`
    color: rgb(188,171,188);
    margin-top: 10px;
`;

const NewChannelContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 28px;
    padding-left: 19px;
    padding-right: 12px;
`;

const ChannelsList = styled.div`

`;

const Channel = styled.div`
   display: flex;
   height: 28px;
   padding-left: 19px;
   align-items: center;
   cursor: pointer;
   :hover {
      background: #35D036;
   }
`;

const AddContainer = styled.div`
   cursor: pointer;
`;
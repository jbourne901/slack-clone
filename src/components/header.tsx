import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {useLogin} from "../hooks/use-login";
import {AuthService} from "../services/auth";

export interface IHeaderProps {
}

export const Header = (_props: IHeaderProps) => {
    const user = useLogin();

    const handleSignout = async () => {
        await AuthService.instance().logout();
    }

    const imgUrl = user?.photo || "https://i.imgur.com/6VBx3io.png";
    return (
        <Container>
            <Main>
                <AccessTimeIcon />
                <SearchContainer>
                    <Search>
                        <input type="text"
                               placeholder="Search..."
                        />
                    </Search>
                </SearchContainer>
                <HelpOutlineIcon />
            </Main>
            <UserContainer>
                <Name>
                    {user?.name}
                </Name>
                <UserImage
                    onClick={handleSignout}
                >
                    <img src={imgUrl} />
                </UserImage>
            </UserContainer>
        </Container>
    )
}

const Container = styled.div`
    background: #350d36;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
`;

const Main = styled.div`
    flex: 1;
    display: flex;
    margin-left: 16px;
    margin-right: 16px;   
    align-items: center;
    justify-content: center; 
`;

const UserContainer = styled.div`
    flex: 0;
    display: flex;
    align-items: center;
    padding-right: 16px;
    right: 0;
`;

const SearchContainer = styled.div`
    min-width: 400px;
    margin-left: 16px;
    margin-right: 16px;
`;

const Search = styled.div`
    width: 100%;
    box-shadow: inset 0 0 0 1px rgb(104 74 104);
    border-radius: 6px;
    display: flex;
    align-items: center;
    
    input {
        width: 100%;
        background-color: transparent;
        border: 0;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
        color: white;
    }
    
    input:focus {
       outline: none;
    }
`;

const Name = styled.div`
    padding-right: 16px;
    white-space: nowrap;
`;

const UserImage = styled.div`
    height: 28px;
    width: 28px;
    border: 2px solid white;
    border-radius: 3px;
    cursor: pointer;
    
    img {
       width: 100%;
    }
`;
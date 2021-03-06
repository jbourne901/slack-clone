import styled from "styled-components";
import {AuthService, IUser} from "../services/auth";

export interface ILoginProps {
}

export const Login = (props: ILoginProps) => {
    const handleLogin = async () => {
        try {
            await AuthService.instance().login();
        } catch(err) {
            console.log("login error=")
            console.dir(err)
            alert(err.message);
        }
    };

    return (
        <Container>
            <Content>
                <SlackLogo
                    src="https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png"
                />
                <h1>Sign in to Slack</h1>
                <SignInButton
                    onClick = {handleLogin}
                >
                    Sign In With Google
                </SignInButton>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 100px;
    border-radius: 5px;
    box-shadow 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
`;

const SlackLogo = styled.img`
    height: 100px;
`;

const SignInButton = styled.button`
    margin-top: 50px;
    height: 40px;
    background-color: #0a8d48;    
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    cursor: pointer;
`;

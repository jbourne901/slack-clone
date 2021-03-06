import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import React, {useState} from "react";
import {RoomsService} from "../services/rooms";
import {useLogin} from "../hooks/use-login";

export interface IChatInputProps {
    channelId: string;
}

export const ChatInput = (props: IChatInputProps) => {
    const [message, setMessage] = useState<string>("");

    const user = useLogin();

    const updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await RoomsService.instance().sendMessage(props.channelId, message, user);
            setMessage("");
        } catch(err) {
            console.error(err);
        }
    };

    let jsxButton;
    if(message && message.length>0) {
        jsxButton = (
            <SendButton>
                <Send
                    type = "submit"
                    onClick = {sendMessage}
                />
            </SendButton>

        );
    } else {
        jsxButton = (
            <SendButtonDisabled>
                <SendDisabled />
            </SendButtonDisabled>
        );
    }

    return (
        <Container>
            <InputContainer>
                <form onSubmit = {sendMessage}>
                    <input
                        type="text"
                        placeholder="Message here..."
                        value={message}
                        onChange = {updateMessage}
                    />
                    {jsxButton}
                </form>
            </InputContainer>


        </Container>
    );
}

const Container = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 24px;
    
`;

const InputContainer = styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 4px;
    
    form {
        display: flex;
        flex-direction: row;
        height: 42px;        
        align-items: center;
        padding-left: 10px;
        input {        
           border: none;
           font-size: 13px;
           flex: 1;
        }
        input:focus {
            outline: none;
        } 
    }    
`;

const SendButton = styled.div`
    cursor: pointer;
    display: flex;
    background: #007a5a;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    
    .MuiSvgIcon-root {
       width: 18px;
    }
    
    :hover {
        background: #148567;
    }
`;


const Send = styled(SendIcon)`
    color: #D9D9D9;
`;

const SendButtonDisabled = styled.div`
    background: lightgray;
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    
    .MuiSvgIcon-root {
       width: 18px;
    }
`;


const SendDisabled = styled(SendIcon)`
    color: gray;
`;

import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Chat} from "./components/chat";
import {Login} from "./components/login";
import {Header} from "./components/header";
import styled from "styled-components";
import {Sidebar} from "./components/sidebar";
import {useLogin} from "./hooks/use-login";

const App = () => {
    const user = useLogin();

    let jsxMain;
    if(!user) {
        jsxMain=(
            <Login />
        );
    } else {
        jsxMain = (
            <Container>
                <Header />
                <Main>
                    <Sidebar />
                    <Switch>
                        <Route path="/room/:channelId">
                            <Chat />
                        </Route>
                        <Route path="/">
                            Select or create channel
                        </Route>
                    </Switch>
                </Main>
            </Container>
        );
    }
    return (
        <div className="App">
            <BrowserRouter>
                {jsxMain}
            </BrowserRouter>
        </div>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 38px minmax(0, 1fr); 
`;

const Main = styled.div`
    display: grid;
    grid-template-columns: 260px auto;
`;

export default App;

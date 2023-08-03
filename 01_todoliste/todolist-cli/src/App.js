import React from "react";
import "./App.scss";
import Form from "./From/Form";
import List from "./List/List";

function App() {
    const [data, setData] = React.useState(null);



    return (
        <div className="App">
            <header className="App-header">
                <h1>My todolist goal</h1>
            </header>
            <section>
                <Form></Form>
                <List></List>
            </section>
        </div>
    );
}

export default App;
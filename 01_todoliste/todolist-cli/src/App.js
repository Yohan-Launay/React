import React from "react";
import "./App.scss";
import Form from "./From/Form";
import List from "./List/List";

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{!data ? "Loading..." : data}</p>
            </header>
            <section>
                <Form></Form>
                <List></List>
            </section>
        </div>
    );
}

export default App;
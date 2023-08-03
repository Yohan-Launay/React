import React, { useState, useEffect } from "react";
import "./List.scss";

function List() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/list")
            .then((res) => res.json())
            .then((data) => setData(data)); // Utilisez setData pour stocker les données des tâches dans le state
    }, []);

    return (
        <div className="list">
                {data ? (
                    <ul>
                        {data.map((task) => (
                            <li key={task._id}>
                                <h3>{task.title}</h3>
                                <p>{task.resume}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
        </div>
    );
}

export default List;

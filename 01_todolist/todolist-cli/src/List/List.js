import React, { useState, useEffect } from "react";
import "./List.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Remplacez "faCoffee" par l'icône de votre choix

function List() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/list")
            .then((res) => res.json())
            .then((data) => setData(data)); // Utilisez setData pour stocker les données des tâches dans le state
    }, []);

    const handleDelete = (taskId) => {
        fetch(`/delete/${taskId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Réponse du serveur :', data);
                // Recharger la page après la suppression réussie de la tâche
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la tâche :', error);
            });
    };

    const handleUpdate = (taskId, updatedData) => {
        fetch(`/update/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Réponse du serveur :', data);
                // Recharger la page après la mise à jour réussie de la tâche
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour de la tâche :', error);
            });
    };


    return (
        <div className="list">
                {data ? (
                    <ul>
                        {data.map((task) => (
                            <li key={task._id}>
                                <div>
                                    <h3>{task.title}</h3>
                                    <p>{task.resume}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleDelete(task._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button onClick={() => handleUpdate(task._id, { title: 'Nouveau titre', resume: 'Nouveau résumé' })}>
                                        Mettre à jour
                                    </button>
                                </div>
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

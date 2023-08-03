import React, { useState } from 'react';
import "./Form.scss"

const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        resume: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoi des données au serveur
        fetch('/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Réponse du serveur :', data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Erreur lors de l\'envoi des données :', error);
            });
    };

    return (
        <div className="form_list">
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                </label>
                <label>
                    Resume:
                    <textarea type="text" name="resume" value={formData.resume} onChange={handleChange} required ></textarea>
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Form;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ISBNCode, setISBNCode] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState(0); // Default value for availableQuantity
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3001/book/book/' + id)
            .then(res => {
                setName(res.data.name);
                setAuthor(res.data.author);
                setImageUrl(res.data.imageUrl);
                setISBNCode(res.data.ISBNCode); // Set IFSC code
                setAvailableQuantity(res.data.availableQuantity); // Set available quantity
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/book/book/' + id, { name, author, imageUrl, ISBNCode, availableQuantity })
            .then(res => {
                if (res.data.updated) {
                    navigate('/books');
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Edit Book</h2>
                <div className="form-group">
                    <label htmlFor="book">Book Name:</label>
                    <input type="text" id="book" name="book" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author Name:</label>
                    <input type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="ISBN">ISBN Code:</label>
                    <input type="text" id="ISBN" name="ISBN" value={ISBNCode} onChange={(e) => setISBNCode(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Available Quantity:</label>
                    <input type="number" id="quantity" name="quantity" value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditBook;

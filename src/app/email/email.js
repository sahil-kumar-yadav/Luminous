"use client"
import { useState } from 'react';

const EmailComposePage = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSubjectChange = (e) => setSubject(e.target.value);
    const handleBodyChange = (e) => setBody(e.target.value);

    const sendEmail = () => {
        // Implement logic to send the email
        console.log(`Subject: ${subject}\nBody: ${body}`);
    };

    return (
        <div>
            <label>
                Subject:
                <input type="text" value={subject} onChange={handleSubjectChange} />
            </label>
            <br />
            <label>
                Body:
                <textarea value={body} onChange={handleBodyChange} />
            </label>
            <br />
            <button onClick={sendEmail}>Send Email</button>
        </div>
    );
};

export default EmailComposePage;

import { useState } from 'react';

const BookReadingPage = () => {
    const [fontSize, setFontSize] = useState(16); // default font size

    const increaseFontSize = () => setFontSize(fontSize + 2);
    const decreaseFontSize = () => setFontSize(Math.max(fontSize - 2, 12));

    return (
        <div style={{ fontSize: `${fontSize}px` }}>
            <p>Your book content goes here.</p>
            <button onClick={increaseFontSize}>Increase Font Size</button>
            <button onClick={decreaseFontSize}>Decrease Font Size</button>
        </div>
    );
};

export default BookReadingPage;

import React, { useEffect, useRef } from 'react';
import './Conversion.scss';
const ConversionRanking = () => {
    const ulRef = useRef(null);

    const newsTicker = (timer) => {
        if (ulRef.current) {
            const ul = ulRef.current;

            window.setInterval(() => {
                ul.style.transitionDuration = '400ms';
                ul.style.marginTop = '-34px';

                window.setTimeout(() => {
                    ul.style.transitionDuration = '';
                    ul.style.marginTop = '';
                    ul.appendChild(ul.querySelector('li:first-child'));
                }, 400);
            }, timer);
        }
    };

    useEffect(() => {
        newsTicker(1500);
    }, []);

    return (
        <div className="rolling">
            <ul className="rolling__list" ref={ulRef}>
                <li>1. River Flows In You</li>
                <li>2. Love Me</li>
                <li>3. May be</li>
                <li>4. When the love falls</li>
                <li>5. Yellow Room</li>
                <li>6. Love</li>
                <li>7. Kiss the rain</li>
                <li>8. The Moment</li>
                <li>9. Memories In My Eyes</li>
                <li>10. Hope</li>
            </ul>
        </div>
    );
};

export default ConversionRanking;
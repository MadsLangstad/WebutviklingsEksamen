
import React from 'react';

interface Props {}

const About: React.FC<Props> = () => {
    return (
        <div>
            <h1>About Page</h1>
            <ul>
                <li>Name: Mads</li>
                <li>Age: 28</li>
                <li>Location: Norway</li>
            </ul>
        </div>
    );
};

export default About;

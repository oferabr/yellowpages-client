import React from 'react';
import '../styling/styles.css';
import { map } from 'lodash';

const Suggestions = (props) => map(props.results, (person, key) => personContainer({ person, key }));

const personContainer = ({ person, key }) => (
    <div className="container" key={key}>
        <img className="user-avatar" src={process.env.PUBLIC_URL + `/img/${person.picture}`} alt="avatarImg"/>
        <div className="sub-container">
            <div className="label">
                {person.name}, {person.age}, {person.phoneNumber}
            </div>
            <p className="description">
                {person.address}
            </p>
        </div>
    </div>
);

export default Suggestions;
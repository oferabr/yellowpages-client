import axios from 'axios';
import '../styling/styles.css';
import { get, isEmpty } from 'lodash';
import Suggestions from './Suggestions';
import sanitizeHtml from 'sanitize-html';
import React, { Component } from 'react';


class Search extends Component {
    state = {
        query: '',
        results: []
    };

    getPeople = (queryString) => {
        return axios.get(`http://localhost:3001/yellowPages/search?queryString=${queryString}`)
            .then(({ data }) => {
                this.setState({
                    results: get(data, 'people', [])
                });
            });
    };

    areResultsEmpty = () => this.state.results.length === 0 && !isEmpty(this.state.query) && this.state.query.length >1;

    handleInputChange = () => {
        this.setState({
            query: sanitizeHtml(this.search.value),
            results: []
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getPeople(this.state.query);
            }
        });
    };

    render() {
        return (
            <div>
                <form>
                    <input className="input"
                        placeholder="Search for a person..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                    <Suggestions results={this.state.results}/>
                </form>

                {this.areResultsEmpty() && <div className="container">No results, please review your search or try a different one.</div>}
            </div>
        );
    }
}

export default Search;

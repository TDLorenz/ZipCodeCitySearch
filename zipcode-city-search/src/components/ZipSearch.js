import React, { Component, useState } from 'react';

import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class ZipSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            zipCode: "",
            found: false
        }
    }

    handleInputChange = (event) => {
        this.setState({ zipCode: event.target.value });
    }

    handleSearchClick = async () => {
        let zipCodeQuery = this.state.zipCode;
        let linkToAPI = 'https://ctp-zip-api.herokuapp.com/zip/' + zipCodeQuery;

        try {
            let response = await axios.get(linkToAPI);
            this.setState({ apiData: response.data, found: true });
            console.log(response.data)
        } catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data); //Not Found
                console.log(error.response.status); //404
                this.setState({ found: false });
            }

        }
    }

    makeTable = () => {
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        //found is false when we get 404 error
        if (!foundMatch) {
            table.push(<tr key={-1}><td>No Results</td></tr>);
            return table;
        } else {
            for (let i = 0; i < currData.length; i++) {
                let city = currData[i].LocationText;
                let state = currData[i].State;
                let location = currData[i].Lat + ", " + currData[i].Long;
                let population = currData[i].EstimatedPopulation
                let wages = currData[i].TotalWages
                table.push(
                    <tr key={currData[i].id}>
                        <td>City: {city}</td>
                        <td>State: {state}</td>
                        <td>Location: ({location})</td>
                        <td>Population (estimated) : {population}</td>
                        <td>Total Wages: {wages}</td>
                    </tr>
                );
            }
            return table;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="search">
                    <h3>Zip Code Search</h3>
                    <input type="text" value={this.state.zipCode} onChange={this.handleInputChange} placeholder="Try 10016" />
                    <button className="search-button" onClick={this.handleSearchClick}>Search</button>
                </div>
                <br />
                <div className="table">
                    <table id="data">
                        <tbody>
                            {this.makeTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ZipSearch;

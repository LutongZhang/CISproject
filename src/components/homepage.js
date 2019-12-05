import React from 'react';
import axios from "axios";
import {
    Route,
    Link
} from "react-router-dom";
import FlowerInfo from './flowerInfo'




class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            sightings: []
        }
    }

    getResponse = async () => {
        const response = await fetch('/Home');
        const body = await response.json();
        return body;
    }

    componentDidMount() {
        this.getResponse().then((res) => {
            this.setState({ flowers: res, sightings: [] })
        })
    }

    click = async (req) => {
        const response =
            await axios.get("/req",
                { params: { name: req } }
            )
        let res = response.data;
        if (res.length > 10) {
            res = res.slice(0, 10)
        }
        this.setState({
            flowers: this.state.flowers,
            sightings: res
        })
    }


    render() {
        let flowers = this.state.flowers.map((flower, index) =>
            <tr key={index}><td onClick={() => this.click(flower.COMNAME)}>   {flower.GENUS}   {flower.SPECIES}{flower.COMNAME} </td></tr>
        )
        //PERSON, LOCATION, SIGHTED
        let recentSightings = this.state.sightings.map((sighting, index) =>
            <tr key={index}><td >{sighting.PERSON} {sighting.LOCATION} {sighting.SIGHTED}</td></tr>
        )

        return (
            <div>
                <main>
                    <div className="row">
                        <div className="column1">
                            <div className="tableWrapper">
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b>Flowers</b>
                                            </td>
                                        </tr>
                                        {flowers}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="column2">
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>Flowers</b>
                                        </td>
                                    </tr>
                                    {recentSightings}
                                </tbody>
                            </table>

                            <button><Link to='/Update'>Button</Link></button>
                            <Route path='/Update'>

                            </Route>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}

export default HomePage;
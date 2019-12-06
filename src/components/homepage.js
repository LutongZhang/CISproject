import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'
import axios from "axios";
import Insert from './insert'
import map from './imageMap'
import {
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Update from './update'

const balabala = 'https://ded2589.inmotionhosting.com/~calsca6/ExtData/allimages/900/Mimulus_primuloides_900_4.jpg';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            sightings: [],
            choseFlower: ''
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
            res = await res.slice(0, 10)
        }
        await this.setState({
            flowers: this.state.flowers,
            sightings: res,
            choseFlower: req
        })

    }

    render() {
        let flowers = this.state.flowers.map((flower, index) =>
            <tr key={index}><td onClick={() => this.click(flower.COMNAME)}>   {flower.GENUS} {flower.SPECIES} {flower.COMNAME} </td></tr>
        )
        //PERSON, LOCATION, SIGHTED
        let recentSightings = this.state.sightings.map((sighting, index) =>
            <Row key={index}>
                <Col>{sighting.PERSON} </Col>
                <Col>{sighting.LOCATION}</Col>
                <Col>{sighting.SIGHTED}</Col>
            </Row>
        )

        return (
            <div>
                <main>
                    {/* <div className="row"> */}
                    <Row>
                        {/* <div className="column1"> */}
                        <Col className="column1">
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
                        </Col>

                        {/* <div className="column2"> */}
                        <Col className="column2">
                            <div>
                                <Image src={map[this.state.choseFlower]} thumbnail />
                            </div>

                            {/* <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>

                                    </tr>
                                    <tr>
                                        <td> */}
                            <b>Recent Sightings</b>
                            {/* </td>
                                    </tr> */}
                            {recentSightings}
                            {/* <tr>
                                        <td> */}
                            <br />
                            <br />
                            <button type="button"><Link to='/HomePage/Update'>Update</Link></button>
                            {/* </td>

                                        <td> */}
                            <br />
                            <br />
                            <button type="button"><Link to='/HomePage/Insert'>Insert</Link></button>
                            {/* </td>
                                    </tr>
                                </tbody>
                            </table> */}
                            <Route path='/HomePage/Update'>
                                <Update choseFlower={this.state.choseFlower} />
                            </Route>

                            <Route path='/HomePage/Insert'>
                                <Insert choseFlower={this.state.choseFlower} />
                            </Route>

                        </Col>
                    </Row>
                </main>
            </div>

        )
    }
}

export default HomePage;
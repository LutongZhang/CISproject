import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap'
import axios from "axios";
import Insert from './insert'
import map from './imageMap'


import Update from './update'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            sightings: [],
            choseFlower: '',
            update: false,
            Insert: false,
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
            choseFlower: req,
            Update: false,
            Insert: false,
        })
    }

    chooseUpdate = () => {
        this.setState({ Insert: false, Update: true })
    }

    chooseInsert = () => {
        this.setState({ Insert: true, Update: false })
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
                <div id='title'>
                    <h1>Flower Database</h1>
                    <h6>Southern Sierra Wildflower Club</h6>
                    <h6>By Ying Xu and Lutong Zhang</h6>
                </div>
                <main>
                    <Row>
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

                        <Col className="column2">
                            {(() => {
                                if (this.state.choseFlower==='') {
                                    return (
                                        <b>blah</b>
                                    )
                                }
                            })}
                            
                            <div>
                                <Image src={map[this.state.choseFlower]} thumbnail />
                            </div>

                            <b>Recent Sightings of {this.state.choseFlower}</b>

                            {recentSightings}

                            <br />
                            <br />
                            <button type="button" onClick={this.chooseUpdate}>Update Flower Info</button>

                            <br />
                            <br />
                            <button type="button" onClick={this.chooseInsert}>Insert New Sighting</button>

                            {this.state.Update ? <Update choseFlower={this.state.choseFlower} /> : null}
                            {this.state.Insert ? <Insert choseFlower={this.state.choseFlower} /> : null}
                        </Col>
                    </Row>
                </main>
            </div>

        )
    }
}

export default HomePage;
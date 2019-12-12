import React from 'react';
import { Container, Row, Col, Image, Table } from 'react-bootstrap'
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
        console.log(this.props.Login)
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
            <tr key={index} onClick={() => this.click(flower.COMNAME)}><td>{index + 1}</td><td>{flower.GENUS}</td><td>{flower.SPECIES}</td><td>{flower.COMNAME}</td></tr>
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
                    <Row>
                        <Col className="column1">
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>GENUS</th>
                                        <th>SPECIES</th>
                                        <th>COMNAME</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {flowers}

                                </tbody>
                            </Table>
                        </Col>

                        <Col className="column2">
                            <div>
                                <Image src={map[this.state.choseFlower]} thumbnail />
                            </div>

                            <b>Recent Sightings</b>

                            {recentSightings}

                            {this.props.Login ? <div>
                                <br />
                                <br />
                                <button type="button" onClick={this.chooseUpdate}>Update</button>

                                <br />
                                <br />
                                <button type="button" onClick={this.chooseInsert}>Insert</button>

                                {this.state.Update ? <Update choseFlower={this.state.choseFlower} /> : null}
                                {this.state.Insert ? <Insert choseFlower={this.state.choseFlower} /> : null}
                            </div> : null}

                        </Col>
                    </Row>
                </main>
            </div >

        )
    }
}

export default HomePage;
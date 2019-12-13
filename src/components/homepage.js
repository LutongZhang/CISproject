import React from 'react';

import axios from "axios";
import Insert from './Insert'
import Update from './Update'
import map from './imageMap'
import { Container, Row, Col, Image, Table, Button } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            sightings: [],
            chosenFlower: '',
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
        axios.get('/Home').then((res) => {
            this.setState({ flowers: res.data })
        })
        //console.log(res.data)
        // this.getResponse().then((res) => {
        //     this.setState({ flowers: res.data })
        // })
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
            chosenFlower: req,
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

    deleteFlower = async (flower) => {
        console.log(1)
        let res = await axios.get('/delete', { params: { comName: flower } })
        if (res.data) {
            axios.get('/Home').then((res) => {
                this.setState({ flowers: res.data, sightings: [],chosenFlower :'' })
            })
        }
    }

    render() {
        let flowers = this.state.flowers.map((flower, index) =>
            <tr key={index} onClick={() => this.click(flower.COMNAME)}><td className="order">{index + 1}</td><td>{flower.GENUS}</td><td>{flower.SPECIES}</td><td>{flower.COMNAME}</td></tr>
        )
        
        let recentSightings = this.state.sightings.map((sighting, index) =>
            <tr key={index}>
                <td>{sighting.PERSON} </td>
                <td>{sighting.LOCATION}</td>
                <td>{sighting.SIGHTED}</td>
            </tr>
        )

        return (
            <div>
                <div id="title">
                    <h1>Southern Sierra Wildflower Club</h1>
                    <h6>Flower Database, by Ying Xu and Lutong Zhang</h6>
                </div>
                <main>
                    <Row className="row">
                        <Col className="column1">
                            <h4 style={{color:'#2d839f'}}>Flower Listings</h4>
                            <Table id="flowerListings" responsive="sm" striped>
                                <thead>
                                    <tr>
                                        <th className="order">#</th>
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
                            {this.state.chosenFlower==='' ? "Select a flower to view its info!" : <div>
                            
                            <Table responsive="sm">
                                <tr>
                                    <td>
                                        <Image src={map[this.state.chosenFlower]} height='200px'/>
                                    </td>
                                    <td>
                                        {this.props.Login ? <div>
                                        
                                        <Button type="button" onClick={this.chooseUpdate}>Update Flower Info</Button>
                                        <br></br>
                                        <br></br>
                                        <Button type="button" onClick={this.chooseInsert}>Insert New Sighting</Button>
                                        <br></br>
                                        <br></br>
                                        <Button type="button" onClick={() => this.deleteFlower(this.state.chosenFlower)}>Delete Flower</Button>
                                        
                                        </div> : null }
                                    </td>
                                </tr>      
                            </Table>
                                    {this.state.Insert ? <Insert chosenFlower={this.state.chosenFlower} /> : null}
                                    {this.state.Update ? <Update chosenFlower={this.state.chosenFlower} /> : null}
                            <br></br>

                            <b>Recent Sightings of {this.state.chosenFlower}</b>

                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>Person</th>
                                        <th>Location</th>
                                        <th>Date Sighted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentSightings}
                                </tbody>
                            </Table>
                            </div>}
                        </Col>
                    </Row>
                </main>
            </div >

        )
    }
}

export default HomePage;
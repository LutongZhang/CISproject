import React from 'react';
import axios from "axios";
import FlowerInfo from './flowerInfo'




class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            sightings: [],
            chosen: ''
        }
    }

    getResponse = async () => {
        const response = await fetch('/Home');
        const body = await response.json();
        return body;
    }

    componentDidMount() {
        this.getResponse().then((res) => {
            this.setState({ flowers: res, chosen: '' })
        })
    }

    click = async (req) => {
        const response =
            await axios.get("/req",
                { params: { name: req } }
            )
        let sightings = response.data;
        if (sightings < 10) {

        }
    }


    render() {
        let flowers = this.state.flowers.map((flower, index) =>
<<<<<<< HEAD
            <tr key={index}>
                <td>
                    {flower.COMNAME}
                </td>
            </tr>
        )

        let person = this.state.sightings.map((sighting, index) =>
            <tr key={index}>
                <td>
                    {sighting.PERSON}
                </td>
            </tr>
=======
            <tr key={index}><td onClick={() => this.click(flower.COMNAME)}>{flower.COMNAME}</td></tr>
>>>>>>> 476e587fb627f29677cbddd095c51de0b9703dc8
        )

        return (
            // <div>
            //     {flowers}
            // </div>

            <div>

                {/* <Switch>
                        <Route path="/flowerInfo">
                            <FlowerInfo value='asd' />
                        </Route>
                        <Route path="/">
                            <div>
                                {flowers}
                            </div>
                        </Route>
                    </Switch> */}
<<<<<<< HEAD


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
                            </tbody>
                            {flowers}
                        </table>
                    </div>
                </div>

                <div className="column2">
                    <div className="tableWrapper">
                        <table className="table table-striped table-hover">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>Flowers</b>
                                    </td>
                                </tr>
                            </tbody>
                            {person}
                        </table>
                    </div>
                        {/* <p>
                            <b>BLAH: </b>
                            <br/>
                            <b>BLAH2: </b>
                            <br/>
                            <b>BLAH3: </b>
                        </p> */}
                    
                </div>
            </div>
        </div>
    
=======
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

                        </div>
                    </div>
                </main>
            </div>

>>>>>>> 476e587fb627f29677cbddd095c51de0b9703dc8
        )
    }
}

export default HomePage;
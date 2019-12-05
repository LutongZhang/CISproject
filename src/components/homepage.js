import React from 'react';
import axios from "axios";
import FlowerInfo from './flowerInfo'




class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
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
        console.log(res.length)
        this.setState({
            flowers: this.state.flowers,
            sightings: res
        })
    }


    render() {
        let flowers = this.state.flowers.map((flower, index) =>
            <tr key={index}><td onClick={() => this.click(flower.COMNAME)}>{flower.COMNAME}</td></tr>
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

        )
    }
}

export default HomePage;
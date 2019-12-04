import React from 'react';
import axios from "axios";
import FlowerInfo from './flowerInfo'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



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
            this.setState({ flowers: res, chosen: '' })
        })
    }

    // click = async (req) => {
    //     console.log(req)
    //     const response =
    //         await axios.get("/req",
    //             { params: { name: req } }
    //         )
    // }


    render() {
        let flowers = this.state.flowers.map((flower, index) =>
            <li key={index}>
                <div>
                    {flower.COMNAME}
                </div>
            </li>
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
                     <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <table className="table table-striped table-hover">
                  <tr>
                    <td>
                      <b>Flowers</b>
                    </td>
                  </tr>
                    {flowers}
                </table>
              </div>
            </div>
            <div className="column2">
              
            </div>
                </div>
                </div>
    
        )
    }
}

export default HomePage;
import React from 'react';
import ReactDOM from 'react-dom';



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowers: []
        }
    }

    getResponse = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        return body;
    }

    componentDidMount() {
        this.getResponse().then((res) => {
            this.setState({ flowers: res })
        })
    }


    render() {
        let flowers = this.state.flowers.map((flower, index) =>
            <li key={index}>{flower.GENUS + " " + flower.SPECIES + " " + flower.COMNAME}</li>
        )
        return (
            <div>
                {flowers}
            </div>
        )
    }

}

export default HomePage;
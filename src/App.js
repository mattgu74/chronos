import React from 'react';
import Chrono from './Chrono';
import './App.css';

class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            mode: 'step1',
            location: '',
        }
    }

    renderLocation() {
        return (
            <div className="App">
                <span>Nom du point de vente :</span><br /><br />
                <input onChange={(event) => (this.setState({location: event.target.value}))} /><br /><br />
                <a className={'button'} onClick={() => this.setState({mode: 'step2'})}>OK</a>
            </div>
        );
    }

    renderStep2() {
        return (
            <div className="App">
                <h2>{this.state.location}</h2>
                <a className={'button'}  onClick={() => this.setState({mode: 'step3', type: 'cmd'})}>Mode commande</a><br />
                <a className={'button'}  onClick={() => this.setState({mode: 'step3', type: 'retrait'})}>Mode retrait</a><br />
                <br />
                <br />
                <br />
                <a className={'button'}  onClick={() => this.setState({mode: 'step1'})}>Changer de point de vente</a><br />
            </div>
        )
    }

    renderStep3() {
        return (<div className="App">
            <h2>{this.state.type === 'cmd' ? 'Mode commande' : 'Mode retrait'} : {this.state.location}</h2>
            <Chrono
                location={this.state.location}
                mode={this.state.type}
                />
            <br />
            <br />
            <br />
            <a className={'button'}  onClick={() => this.setState({mode: 'step2'})}>Retour</a><br />
        </div>);
    }

    render() {
        switch(this.state.mode) {
            case 'step2':
                return this.renderStep2();
                break;
            case 'step3':
                return this.renderStep3();
                break;
            default:
                return this.renderLocation();
        }
    }
}

export default App;

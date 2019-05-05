import React from "react";


class Chrono extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            location: this.props.location,
            mode: this.props.mode,
            step: 0,
            save: false,
        };
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        if (this.state.save) {
            this.saveRow();
        }
    }

    stepName() {
        if (this.state.step === 0) {
            return "Attente client";
        }

        if(this.state.mode === 'retrait') {
            return "Service en cours";
        }

        if (this.state.step === 1) {
            return "Prise de commande en cours";
        }

        if (this.state.step === 2) {
            return "Paiement en cours";
        }

        return "Erreur ?";
    }

    stepDetail() {
        if (this.state.step > 0) {
            setTimeout(() => this.setState({t0Count: new Date() - this.state.t0}), 100);
            return <>Temps : {parseInt(this.state.t0Count / 100)/10}s<br/></>;
        }

        return <></>;
    }

    saveRow() {
        let row = {
            mode: this.state.mode,
            location: this.state.location,
            t0: this.state.t0,
            t1: this.state.t1,
            time1: (this.state.t1 - this.state.t0) / 1000,
            totalTime: (this.state.t1 - this.state.t0) / 1000,
        };
        if (this.state.mode !== 'retrait') {
            row.t2 = this.state.t2;
            row.time2 = (this.state.t2 - this.state.t1) / 1000;
            row.totalTime = (this.state.t2 - this.state.t0) / 1000;
            row.paiement = this.state.paiement;
        }
        console.log(row);
        this.setState({save: false});
    }

    nextStepChoices() {
        if (this.state.step === 0) {
            return [
                ["Arrivée client", () => this.setState({step: 1, t0: new Date(), t0Count: 0})],
                ];
        }

        if(this.state.mode === 'retrait') {
            return [
                ["Client servi", () => {
                    this.setState({step: 0, t1: new Date(), save: true});
                }],
            ];
        }

        if (this.state.step === 1) {
            return [
                ["Demande paiement", () => {
                    this.setState({step: 2, t1: new Date()});
                }],
            ];
        }

        if (this.state.step === 2) {
            return [
                ["FIN CB", () => {
                    this.setState({step: 0, t2: new Date(), save: true, paiement: 'CB'});
                }],
                ["FIN ESP", () => {
                    this.setState({step: 0, t2: new Date(), save: true, paiement: 'ESP'});
                }],
            ];
        }

        return [];
    }



    render() {
        return (
            <>
            <h3>{this.stepName()}</h3>
                {this.stepDetail()}<br />
                {this.nextStepChoices().map(([name, onClick]) => <a key={name} className={"button"} onClick={onClick}>{name}</a>)}
            </>);
    }
}


export default Chrono;
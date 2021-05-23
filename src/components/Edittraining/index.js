import React from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';


class Edittraining extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: this.props.training.date, duration: this.props.training.duration, activity: this.props.training.activity }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.date);
        const training = { date: moment(this.state.date).format(), duration: this.state.duration, activity: this.state.activity };
        console.log(this.state.date);
        this.props.updateTraining(this.props.link, training);
        this.simpleDialog.hide();
    }

    render() {

        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Edit training">

                    <form>
                        <div className="form-group">
                            <input placeholder="Date" value={this.state.date} className="form-control" name="date" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Duration" value={this.state.duration} className="form-control" name="duration" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input placeholder="Activity" value={this.state.activity} className="form-control" name="activity" onChange={this.handleChange} />
                        </div>
                        {/* <div className="form-group">
                            <input placeholder="Customer" value={this.state.customer} className="form-control" name="customer" onChange={this.handleChange} />
                        </div> */}

                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </form>
                </SkyLight>
                <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Update</button>
            </div>
        )
    }
}

export default Edittraining;


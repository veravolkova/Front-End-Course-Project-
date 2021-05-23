import React from 'react';
import SkyLight from 'react-skylight';
import moment from 'moment';

class Addtraining extends React.Component {

    constructor(props) {
    super(props);
    this.state = { date: '', duration: '', activity: '', customer: this.props.link}
    }

    handleChange = (event) => {

        this.setState ({

            [event.target.name]: event.target.value

         })       
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newTraining = {date: moment(this.state.date, 'DD.MM.YYYY', true).format(), duration: this.state.duration, activity: this.state.activity, customer: this.state.customer}
        this.props.addTraining(newTraining );
        console.log(newTraining);
        this.simpleDialog.hide();
    }

 
  render() {

    return (
      <div>
       
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add training">
        <form>
        
         <div className = "form-group">
        <input placeholder = "DD.MM.YYYY" className = "form-control" name="date"  onChange = {this.handleChange} />
         </div>

         <div className = "form-group">
        <input placeholder = "Duration" className = "form-control" name="duration" value = {this.state.duration} onChange = {this.handleChange} />
         </div>

         <div className = "form-group">
        <input placeholder = "Activity" className = "form-control" name="activity" onChange = {this.handleChange} />
         </div>

         <div className = "form-group">
        <input placeholder = "Customer" className = "form-control" name="customer" readOnly={true} onChange = {this.handleChange} />
          </div>

         
        <button className="btn btn-primary" onClick = {this.handleSubmit}>Save</button>


        </form>
        </SkyLight>
            
          <button style= {{marginRight: 10}} className = "btn btn-primary" onClick={() => this.simpleDialog.show()}>+ Training </button>  

      </div>
    )
  }
}

export default Addtraining;
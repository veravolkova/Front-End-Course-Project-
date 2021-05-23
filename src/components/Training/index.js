import React, { Component } from 'react'; 
import ReactTable from 'react-table'; 
import 'react-table/react-table.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Edittraining from '../Edittraining'; 
import {CSVLink, CSVDownload} from 'react-csv'; 

class Training extends Component { 

constructor(props) { 
super(props); 
this.state = { 
trainings: []
}; 
} 

componentDidMount() { 
this.loadTrainings(); 
} 

loadTrainings = () => { 
fetch('https://customerrest.herokuapp.com/gettrainings') 
.then(res => res.json()) 
.then(resData => { 
this.setState({ trainings: resData }); 
}) 
} 

deleteTraining = (value) => { 
    const url = 'https://customerrest.herokuapp.com/api/trainings/' + value; 

    confirmAlert({ 
    title: 'Confirm to proceed', 
    message: 'Are you sure to delete this training?', 
    buttons: [ 
    { 
    label: 'Yes', 
    onClick: () => { 
    fetch(url, {method: 'DELETE'}) 
    .then(res => this.loadTrainings()) 
    toast.success("Training is deleted!", 
    {position: toast.POSITION.TOP_RIGHT}) 
    }}, 
    { 
    label: 'No', 
    onClick: () => alert('Click No') 
    } 
    ] 
    }) 
    }

updateTraining = (link, training) => {
   
    const b = 'https://customerrest.herokuapp.com/api/trainings/' + link     

    console.log(link);
    console.log(b);   
    console.log(training);  
    
      fetch(b , 
      { method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
      
      body : JSON.stringify(training)}) 
      .then(
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT
        })         
      )
      .then(res => this.loadTrainings())
      .catch( err => console.error(err))
    } 

render() { 


return ( 
<div className="container"> 
{/* <h2>My trainings</h2>  */}
<div className ="row"> 

<CSVLink data={this.state.trainings} >Download csv</CSVLink> 
</div> 
<ReactTable 
data={this.state.trainings} 
filterable 
columns={[{ 
columns: [  
   {  
    id: 'date', 
    Header: "Date", 
    accessor: d => { 
    return new Date(d.date).toLocaleDateString()
      } 
  },
    
{ 
    Header: "Duration", 
    accessor: "duration" 
    }, 
{ 
Header: "Activity", 
accessor: "activity" 
}, 
{ 
Header: "Customer", 
accessor: "customer.lastname"
},
{ 
Header: "", 
sortabele: false, 
filterable: false, 
accessor: "id", 
Cell: ({value}) => (<button type="button" className="btn btn-danger" onClick={ () => {this.deleteTraining(value)}}>Delete</button>) 
},
{ 
    id: 'button',
    sortable: false, 
    filterable: false,     
    accessor: "id", 
    Cell: ({ row, value }) => (<Edittraining updateTraining={this.updateTraining} link = {value} training = {row} />)
  },
  

] 
} 
]} 
defaultPageSize={10} 
className="-striped -highlight" /> 
<ToastContainer autoClose={1500} />   

</div> 
) 
} 
} 

export default Training;

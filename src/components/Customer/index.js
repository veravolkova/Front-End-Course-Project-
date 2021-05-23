import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Addcustomer from '../Addcustomer';
import Addtraining from '../Addtraining';
import Editcustomer from '../Editcustomer';
import { CSVLink, CSVDownload } from 'react-csv';

class Customer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(res => res.json())
      .then(resData => {
        this.setState({ customers: resData.content });
      })
  }


  deleteCustomer = (value) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(value, { method: 'DELETE' })
              .then(res => this.loadCustomers())
            toast.success("Customer deleted!", {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        },
        {
          label: 'No',
        }
      ]
    })
  }



  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
      })
      .then(res => this.loadCustomers())
      .then(
      toast.success("Customer has been added", {
        position: toast.POSITION.BOTTOM_LEFT
      })
      )
      .catch(err => console.error(err))
  }


  addTraining = (link, training) => {
    console.log(link);

    fetch('https://customerrest.herokuapp.com/api/trainings/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          'date': this.state.date,
          'activity': this.state.activity,
          'duration': this.state.duration,
          'customer': link,
        }
      )
    })
      .then(
      // console.log(newTraining),
      toast.success("Training has been added", {
        position: toast.POSITION.BOTTOM_LEFT
      })
      )
      .catch(err => console.error(err))
  }


  updateCustomer = (link, customer) => {
    console.log(link);
    console.log(customer);

    fetch(link,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
      })
      .then(
      toast.success("Changes saved", {
        position: toast.POSITION.BOTTOM_LEFT
      })
      )
      .then(res => this.loadCustomers())
      .catch(err => console.error(err))
  }


  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {


    return (
      <div className="container">
        {/* <h2>My customers</h2> */}
        <div className="row">
          <Addcustomer addCustomer={this.addCustomer} />
          <CSVLink data={this.state.customers} >Download csv</CSVLink>
        </div>
        <ReactTable
          data={this.state.customers}
          filterable
          columns={[{
            columns: [
              {
                accessor: "links[0].href",
                show: false
              },
              {
                Header: "Firstname",
                accessor: "firstname"
              },
              {
                Header: "Lastname",
                accessor: "lastname"
              },
              {
                Header: "Streetaddress",
                accessor: "streetaddress"
              },
              {
                Header: "Postcode",
                accessor: "postcode"
              }, {
                Header: "City",
                accessor: "city"
              },
              {
                Header: "Email",
                accessor: "email"
              },
              {
                Header: "Phone",
                accessor: "phone"
              },

              {
                id: 'button',
                sortable: false,
                filterable: false,
                accessor: "links[0].href",
                Cell: ({ value }) => (<button type="button" className="btn btn-danger" onClick={() =>
                  this.deleteCustomer(value)}>Delete</button>)
              },


              {
                id: 'button',
                sortable: false,
                filterable: false,
                accessor: "links[0].href",
                Cell: ({ row, value }) => (<Editcustomer updateCustomer={this.updateCustomer} link={value} customer={row} />)
              },

              {
                id: 'button',
                sortable: false,
                filterable: false,
                accessor: "links[0].href",
                Cell: ({ row, value }) => (<Addtraining addTraining={this.addTraining} link={value} customer={row} />)
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

export default Customer;

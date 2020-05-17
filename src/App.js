//DEPENDENCIES
import React from "react";
import Container from "./components/container";
import Col from "./components/col";
import InputFilter from "./components/inputFilter";
import EmployeeCard from "./components/employeeCard";
import API from "./utils/API";
import "./App.css";


//APP
class App extends React.Component {
  state = { employees: [], search: "" };

  // grab employee data from API.js
  componentDidMount() {
    API.search().then((res) => {
      console.log(res);
      this.setState({
        employees: res.data.results.map((employee, i) => ({
          firstName: employee.name.first,
          lastName: employee.name.last,
          picture: employee.picture.large,
          phone: employee.phone,
          email: employee.email,
          city: employee.location.city,
          key: i,
        })),
      });
    })
    .catch((err) => console.log(err));
  };


  // PREVENT PAGE RELOAD
  refreshPage() {
    window.location.reload(false);
  };


  //EVENT HANDLERS
  // merge and lowerCase search filter, check if searched employee exists, and update list with the filtered employee
  searchName = (filter) => {
    console.log("Search by name:", filter);
    const filteredResult = this.state.employees.filter((employee) => {
      let values = Object.values(employee).join("").toLocaleLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ employees: filteredResult });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("Handle Request: ", this.state.search)
  };

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.searchName(this.state.search)
    console.log("Form Submission Button Clicked", this.state.search);
  };


  //RENDER
  render() {
    return (
      <Container>
        <div className = "container">
          <div className = "row">
            <Col size = "md-4">
              <h2>Employee Directory</h2>
              <InputFilter
              value = {this.state.search}
              handleInputChange = {this.handleInputChange}
              handleFormSubmission = {this.handleFormSubmission}
              />
            </Col>
          </div>

          <div className = "row">
            <Col size = "md-12">
              <table className = "table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>City</th>
                  </tr>
                </thead>
                {[...this.state.employees].map((item) => (
                  <EmployeeCard
                  picture = {item.picture}
                  firstName = {item.firstName}
                  lastName = {item.lastName}
                  phone = {item.phone}
                  email = {item.email}
                  city = {item.city}
                  key = {item.key}
                  />
                ))}
              </table>
            </Col>
          </div>   
        </div>
    </Container>
    );
  };
};

export default App;

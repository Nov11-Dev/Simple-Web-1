/**
 * Author: Nguyen Khanh Duy Phan
 * Date: April 7, 2021
 */
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      students: [],
      isLoaded: false,
    }
  }

  //Fetching data from API
  componentDidMount() {
    fetch('https://api.hatchways.io/assessment/students')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          students: json,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Calculate the average of student's grades
  averageCal(grades) {
    var result = 0;
    for (var i = 0; i < grades.length; i++) {
      result += parseInt(grades[i]);
    }
    return result / grades.length;
  }

  //Search for student(s) by their name
  myNameSearch() {
    var input, filter, li, i, h3, txtValue;
    input = document.getElementById("myNameInput");
    filter = input.value.toUpperCase();

    li = document.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      h3 = li[i].getElementsByTagName("h3")[0];
      txtValue = h3.textContent || h3.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  //Search for student(s) by tag
  myTagSearch() 
  {
    var input, filter, li, i, h3, txtValue;
    input = document.getElementById("myNameInput");
    filter = input.value.toUpperCase();

    li = document.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      h3 = li[i].getElementsByTagName("label")[0];
      txtValue = h3.textContent || h3.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  //Add tag for specific student
  addTag() {
    var text = document.getElementById("myTag");
    var label = document.createElement("LABEL");
    var text = document.createTextNode(text.value);
    label.appendChild(text);
    document.getElementById("tags").appendChild(label);
    document.getElementById("myTag").value="";

  }

  //Hide and unhide function for hiding or unhiding grades for tests
  expandButton() {
    var flag = document.getElementById("myBtn").value;
    console.log(typeof (flag));
    if (flag === "true") {
      document.getElementById("gradesList").style.display = "inline";
      document.getElementById("myBtn").value = "false";
    } else {
      document.getElementById("gradesList").style.display = "none";
      document.getElementById("myBtn").value = "true";
    }
  }

  render() {
    var { isLoaded, students } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
      // return students.students[0].id;
      var studentsJSON = students.students; //students object contains varaible "students" which contain array 
      return (
        //Create layout by creating table
        <table>
          <tbody>
            <tr>
              <input type="text" id="myNameInput" onChange={() => this.myNameSearch()} placeholder="Search By Name..."></input>
              <input type="text" id="myTagInput" onChange={() => this.myTagSearch()} placeholder="Search By Tag..."></input>
            </tr>
            <tr>
              <ul className="myUL">
                {studentsJSON.map(student => (
                  <li key={student.id}>
                    <table className="myTable">
                      <tbody>
                        <tr>
                          <td id="d1"><img id="picture" src={student.pic} alt=""></img></td>
                          <td id="d2">
                            <h3 id="name"><p id="text">{student.firstName} {student.lastName}</p></h3>
                            <p className="info">Email: {student.email}</p>
                            <p className="info">Company: {student.company}</p>
                            <p className="info">Skill: {student.skill}</p>
                            <p className="info">Average: {this.averageCal(student.grades)}%</p>
                            <p className="info">
                              <ul id="gradesList">
                                {student.grades.map(grade => (
                                  <li>
                                    Test: {grade}%
                                  </li>
                                ))}
                              </ul>
                            </p>
                            <p className="info">
                              <div id="tags">
                              </div>
                            </p>
                            <p className="info">
                              <input id="myTag" type="text" onKeyPress={() => this.addTag()} placeholder="Add Tag..."></input>
                            </p>
                          </td>
                          <td id="d3">
                            <button id="myBtn" type="button" onClick={() => this.expandButton()} value="true"><span>&#43;</span></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br></br>
                  </li>
                ))}
              </ul></tr>
          </tbody>
        </table>

      );
    }

  }

}

export default App;

import React, { Component } from 'react';
import Child from './Child';
import Header from './Header';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import PersonalProfile from './PersonalProfile';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "light",
      personInfo: {
        name: "Swapnil Deb",
        occupation: "Software Engineer"
      },
      contactInfo: {
        email: "swa2314@gmail.com",
        web: "https://github.com/SenseOfHumor",
        mobile: "018623855820"
      },
      profile: {
        title: "Personal Profile",
        content: "My name is Swapnil Deb. I am a Computer Science student at NJIT. I like building generative AI applications that solve real world problems. Currently I am working on creating a SAAS product that will provide small businesses with AI solutions."
      },
      workExperience: {
        title: "Work Experience",
        job1: "Technology and Data Co-op at Prudential Financial",
        job1Content: "Developed data pipelines between several Threat Intelligence and SIEM Platforms. Integrated ThreatConnect and AttackIQ together to improve efficiency by up to 14%. Cataloged concealed endpoints within ThreatConnect using AttackIQ Platform and API documentation tools like Postman to enhance future workflows, fostering streamlined collaboration processes. Collaborating with cross-functional teams to implement custom application within ThreatConnect Platform. Streamlined team productivity and response times by implementing Python scripts for automating routine tasks, resulting in reduced manual result lookup.",
        job2: "Software Engineer Intern at UPS",
        job2Content: "Coordinated by Passaic County Community College STEM Department and HISPA Implemented a program to streamline delivery prioritization based on factors such as distance, weight, mileage, and importance, resulting in a 20% reduction in delivery time and efficient optimization of delivery routes Utilized advanced algorithms such as Dijkstra's and A* alongside APIs like OpenStreetMaps and Google Maps to enhance efficiency by 5% and optimize route planning for real-world applications."
      },
      KeySkills: {
        title: "Key Skills",
        content1: "Java",
        content2: "Python",
        content3: "C",
        content4: "Bash",
        content5: "SQL",
        content6: "Javascript",
      },
      education: {
        title: "Education",
        bsInstitution: "New Jersey Institute of Technology",
        bsDegree: "Bachelor of Science in Computer Science",
        bsDate: "Expected December 2025",
        bsGpa: "3.745",
      },
    }
  }

  // Dark Mode (stack overflow and geeks for geeks)
  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }), () => {
      document.body.className = this.state.theme + '-mode';
    });
  }

  componentDidMount() {
    document.body.className = this.state.theme + '-mode';
  }


  render() {
    return (
      <div>
        <button onClick={this.toggleTheme}>TOGGLE THEME</button>
        <Header personInfo={this.state.personInfo} contactInfo={this.state.contactInfo}></Header>
        <hr id = "Yellow-Line"></hr>
        <PersonalProfile profile={this.state.profile}></PersonalProfile>
        <hr></hr>
        <WorkExperience workExperience={this.state.workExperience}></WorkExperience>
        <hr></hr>
        <Skills KeySkills={this.state.KeySkills}></Skills>
        <hr></hr>
        <Education education={this.state.education}></Education>
      </div>
      
    )
  }
}

export default App;

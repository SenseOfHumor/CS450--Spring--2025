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
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      workExperience: {
        title: "Work Experience",
        job1: "Technology and Data Co-op at Prudential Financial",
        job1Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        job2: "Software Engineer Intern at UPS",
        job2Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
        bsInstitution: "NJIT",
        bsDegree: "Bachelor of Science in Computer Science",
        bsDate: "Expected December 2025",
        bsGpa: "3.745",
      },
    }
  }

  render() {
    return (
      <div>
        <Header personInfo={this.state.personInfo} contactInfo={this.state.contactInfo}></Header>
        <PersonalProfile profile={this.state.profile}></PersonalProfile>
        <WorkExperience workExperience={this.state.workExperience}></WorkExperience>
        <Skills KeySkills={this.state.KeySkills}></Skills>
        <Education education={this.state.education}></Education>
      </div>
      
    )
  }
}

export default App;

import React from 'react';
import ProfileRender from '../components/ProfileRender';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    showPasswordVerification: false
    }
  }

  onPasswordChanged(e) {
    this.setState({
      showPasswordVerification: e.target.value.length > 0
    });
  }
  render(){
    return(
      <div>
        <ProfileRender onPasswordChanged={this.onPasswordChanged.bind(this)} showPasswordVerification={this.state.showPasswordVerification} />
      </div>
    );
  }
}
export default Profile;
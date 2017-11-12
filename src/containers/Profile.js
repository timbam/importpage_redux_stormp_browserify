import React from 'react';
import ProfileRender from '../components/ProfileRender';

class Profile extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

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
    console.log(this.context.user);
    return(
      <div>
        <ProfileRender onPasswordChanged={this.onPasswordChanged.bind(this)} showPasswordVerification={this.state.showPasswordVerification} />
      </div>
    );
  }
}
export default Profile;
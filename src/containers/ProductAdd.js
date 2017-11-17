import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createProduct } from '../actions/index';
import ProductForm from '../components/ProductForm'
import { connect } from 'react-redux';


class ProductAdd extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    console.log(withRouter);
  }

  // onDrop(filesToUpload, e) {
  //   // this.props.fields.files.onChange(filesToUpload);
  //   console.log(filesToUpload);
  //   this.setState({ dropFiles: filesToUpload });
  // }
  submit(data) {
    console.log(data);
    // event.preventDefault();
    var fd = new FormData();
    Object.keys(data).forEach((key) => {
      if(key != 'files') {
        fd.append(key, data[key]);
      };
    });

    for(var i = 0; i < data.files.length; i++){
      fd.append("photos[]", data.files[i]);
    };
    this.props.createProduct(fd)
      .then(() => {
        this.props.history.push('/');
      })
  }

  render() {
    return(
      <div>
        <ProductForm onSubmit={this.submit} />
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createProduct }, dispatch);
}
export default connect(null, mapDispatchToProps)(ProductAdd);

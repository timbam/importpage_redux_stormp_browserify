import React from 'react';
import { withRouter} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { createProduct } from '../actions/index';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';

class ProductAdd extends React.Component {
  // static contextTypes = {
  //   router: React.PropTypes.object
  // };
  constructor(props) {
    super(props);
    this.state = { dropFiles: []};
  }
  componentDidMount() {
    console.log(this.props);
  }

  handleSubmit(data) {
    event.preventDefault();
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
        withRouter.history.push('/');
      })
  }

  onDrop(filesToUpload, e) {
    // this.props.fields.files.onChange(filesToUpload);
    this.setState({ dropFiles: filesToUpload});
    console.log(filesToUpload);
  }

  renderField = ({
    input,
    label,
    type,
    meta: {touched, error}
  }) => (
    <div>
      <label className='control-label'>{label}</label>
      <input {...input} type={type} placeholder={label} className='form-control'/>
      {touched && <span className='help-block'>{error}</span>}
    </div>
  )

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='container jumbotron'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Product</div>
              <div className='panel-body'>
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this)) } >
                <Field
                  name="files"
                  component={files =>
                      <Dropzone {...files } onDrop={ this.onDrop.bind(this) } className="dropzone">
                        {this.state.dropFiles.length > 0 ?
                        <div>
                          <img key={this.state.dropFiles[0].preview} src={this.state.dropFiles[0].preview} />
                        </div> : <p>Drag and drop or click here to add pictures</p>}
                      </Dropzone>
                  }/>
                  <Field
                    name="name"
                    type="text"
                    label="Name"
                    component={this.renderField.bind(this)}/>
                  <Field
                    name="description"
                    type="text"
                    label="Description"
                    component={this.renderField.bind(this)}/>
                  <Field
                    name="country"
                    type="text"
                    label="Country"
                    component={this.renderField.bind(this)}/>
                  <Field
                    name="price"
                    type="text"
                    label="Price"
                    component={this.renderField.bind(this)}/>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if(!values.name) {
    errors.name = "Please enter a product name";
  }
  if(!values.description) {
    errors.description = "Please enter a description of your product";
  }
  if(!values.price) {
    errors.price = "Please enter a product price";
  } else if(isNaN(Number(values.price))) {
      errors.price = "Must be a number";
  }
  if(!values.country) {
    errors.country = "Please enter a product country";
  }
  if(!values.category) {
    errors.category = "Please enter a product category";
  }
  if(!values.files){
    errors.files = "Please add one or more photos to your product";
  }
  return errors;
}

export default reduxForm({
  form: 'ProductsNewForm',
  validate
}, null, { createProduct })(ProductAdd);

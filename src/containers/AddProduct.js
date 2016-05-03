import React from 'react';
import Dropzone from 'react-dropzone';
import { createProduct } from '../actions/index';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

class AddProduct extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = { dropFiles: []};
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
        this.context.router.push('/');
      })
  }

  onDrop(filesToUpload, e) {
    this.props.fields.files.onChange(filesToUpload);
    this.setState({ dropFiles: filesToUpload});
  }

  render() {
    const { fields: {name, description, price, files}, handleSubmit } = this.props;
    return (
      <div className='container jumbotron'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Product</div>
              <div className='panel-body'>

                <form onSubmit={handleSubmit(this.handleSubmit.bind(this)) } >
                <div>
                  <Dropzone {... files } onDrop={ this.onDrop.bind(this) } className="dropzone">
                    {this.state.dropFiles.length > 0 ? <div> 
                    <img key={this.state.dropFiles[0].preview} src={this.state.dropFiles[0].preview} />
                    </div> : <p>Drag and drop or click here to add pictures</p>}
                  </Dropzone> 
                  <br/>
                </div>
                  <div className={`form-group ${name.touched && name.invalid ? 'has-error' : ''}`}>
                    <span className='help-block'>{name.touched ? name.error : ''}</span>
                    <label className='control-label'>Product Name</label>
                    <input type='text' className='form-control' {...name} />
                  </div>

                  <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
                    <span className='help-block'>{description.touched ? description.error : ''}</span>
                    <label className='control-label'>Product description</label>
                    <input type='text' className='form-control' {...description} />
                  </div>
                  <div className={`form-group ${price.touched && price.invalid ? 'has-error' : ''}`}>
                    <span className='help-block'>{price.touched ? price.error : ''}</span>
                    <label className='control-label'>Product price</label>
                    <input type='text' className='form-control' {...price} />
                  </div>                  
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

function validate(values) {
  const errors = {};

  if(!values.name) {
    errors.name = "Please enter a product name";
  }
  if(!values.description) {
    errors.description = "Please enter a description of your product";
  }
  if(!values.price) {
    errors.price = "Please enter a product price";
  }
  return errors;
}

export default reduxForm({
  form: 'ProductsNewForm',
  fields: ['name', 'description', 'price', 'files'],
  validate
}, null, { createProduct })(AddProduct);

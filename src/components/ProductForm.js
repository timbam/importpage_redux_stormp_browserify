import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Dropzone from 'react-dropzone';

const renderField = ({input, label, type, meta: { touched, error }}) => {
  return (
    <div>
      <label className='control-label'>{label}</label>
      <input type={type} placeholder={label} className='form-control' {...input}/>
      {touched && <span className='help-block'>{error}</span>}
    </div>
  )}

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
      <div>
        <Dropzone
          name={field.name}
          className="dropzone"
          onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}>
          {files.length > 0 ?
            <div>
              <img key={files[0].preview} src={files[0].preview} />
            </div> : <p>Drag and drop or click here to add pictures</p>}
        </Dropzone>
      </div>
    );
  }

const ProductForm = (props) => {
  const { handleSubmit, onDrop, dropFiles } = props;
  console.log(props);
  return (
    <div className='container jumbotron'>
      <div className='row flipInX animated'>
        <div className='col-sm-8'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Add Product</div>
            <div className='panel-body'>
              <form onSubmit={ handleSubmit } >
                <Field
                  name="files"
                  component={ renderDropzoneInput }/>
                  <Field
                    name="name"
                    type="text"
                    label="Name"
                    component={renderField}/>
                  <Field
                    name="description"
                    type="text"
                    label="Description"
                    component={renderField}/>
                  <Field
                    name="country"
                    type="text"
                    label="Country"
                    component={renderField}/>
                  <Field
                    name="price"
                    type="text"
                    label="Price"
                    component={renderField}/>
                <button type='submit' className='btn btn-primary'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
  if(!values.files){
    errors.files = "Please add one or more photos to your product";
  }
  return errors;
};
export default reduxForm({
  form: 'ProductForm',
  validate
}, null)(ProductForm);

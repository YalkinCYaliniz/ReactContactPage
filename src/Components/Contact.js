import React, { useState } from 'react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('Gonder');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);

  const isEmail = (email) =>
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i.test(email);

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleChange = (e) => {
    // handle change for the select
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    console.log('values from select:', values);
    setOptions(values);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Gonderiliyor...');

    const errors = {};
    // get field values from form
    // const { name, email, message, selectedOptions } = e.target.elements;

    // collect all data to an object
    let collected = {
      name: name,
      email: email,
      message: message,
      selected_car_options: options,
    };
    console.log(collected);

    // control if any form fields is empty if so give error
    Object.keys(collected).forEach((value) => {
      if (value.length === 0) {
        errors.name = `Empty ${value} field`;
      }
    });

    // if given email is valid
    if (!isEmail(email)) {
      errors.email = 'Wrong Email';
    }

    setErrors(errors);
  };

  return (
    <div>
      <div className="container mt-5">
        {Object.entries(errors).map(([key, error]) => (
          <span
            key={`${key}: ${error}`}
            style={{
              fontWeight: 'bold',
              color: 'red',
            }}>
            {key}: {error} <br></br>
          </span>
        ))}
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend>Iletisim</legend>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="cars">Choose a car:</label>
              <br></br>
              <select
                id="cars"
                name="cars"
                size="4"
                multiple
                className="select"
                onChange={handleChange}>
                {/* <optgroup label="Swedish Cars"> */}
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                {/* </optgroup> */}
                {/* <optgroup label="German Cars"> */}
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
                {/* </optgroup> */}
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              {formStatus}
            </button>
            <button className="btn btn-danger">Temizle</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Contact;

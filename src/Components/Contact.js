import React, { useState } from "react";
import { JsonView,defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const Contact = () => {
  const [formStatus, setFormStatus] = useState("Gonder");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [collectData, setCollectedData] = useState("");
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const isEmail = (email) =>
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i.test(email);

  const handleChange = (e) => {
    // handle change for the select
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    console.log("values from select:", values);
    setOptions(values);
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    if (e.target.checked) {
      setSelectedCheckboxes((prevCheckboxes) => [
        ...prevCheckboxes,
        checkboxValue,
      ]);
    } else {
      setSelectedCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((checkbox) => checkbox !== checkboxValue)
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Gonderiliyor...");

    const errors = {};
    // get field values from form
    // const { name, email, message, selectedOptions } = e.target.elements;

    // collect all data to an object
    let collected = {
      name: name,
      email: email,
      message: message,
      selected_car_options: options,
      selected_radio: selectedRadio,
      selected_checkboxes: selectedCheckboxes,
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
      errors.email = "Wrong Email";
    }

    setErrors(errors);
    setCollectedData(collected);
  };

  return (
    <div>
      <div className="container mt-5">
        {Object.entries(errors).map(([key, error]) => (
          <span
            key={`${key}: ${error}`}
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
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
              <label htmlFor="cars">Choose a car:</label>
              <br></br>
              <select
                id="cars"
                name="cars"
                size="4"
                multiple
                className="select"
                onChange={handleChange}
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="radio1">Radio Button:</label>
              <br />
              <input
                type="radio"
                id="radio1"
                name="radioButton"
                value="option1"
                checked={selectedRadio === "option1"}
                onChange={handleRadioChange}
              />
              <label htmlFor="radio1">Option 1</label>
              <br />
              <input
                type="radio"
                id="radio2"
                name="radioButton"
                value="option2"
                checked={selectedRadio === "option2"}
                onChange={handleRadioChange}
              />
              <label htmlFor="radio2">Option 2</label>
              <br />
              <input
                type="radio"
                id="radio3"
                name="radioButton"
                value="option3"
                checked={selectedRadio === "option3"}
                onChange={handleRadioChange}
              />
              <label htmlFor="radio3">Option 3</label>
            </div>
            <div className="mb-3">
              <label>Checkboxes:</label>
              <br />
              <input
                type="checkbox"
                id="checkbox1"
                name="checkbox1"
                value="checkbox1"
                checked={selectedCheckboxes.includes("checkbox1")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox1">Checkbox 1</label>
              <br />
              <input
                type="checkbox"
                id="checkbox2"
                name="checkbox2"
                value="checkbox2"
                checked={selectedCheckboxes.includes("checkbox2")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox2">Checkbox 2</label>
              <br />
              <input
                type="checkbox"
                id="checkbox3"
                name="checkbox3"
                value="checkbox3"
                checked={selectedCheckboxes.includes("checkbox3")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox3">Checkbox 3</label>
            </div>
            <button className="btn btn-primary" type="submit">
              {formStatus}
            </button>
            <button className="btn btn-danger">Temizle</button>
          </fieldset>
        </form>
      </div>
      <JsonView
        data={collectData}
        shouldInitiallyExpand={(level) => true}
        style={defaultStyles}
      />
    </div>
  );
};

export default Contact;

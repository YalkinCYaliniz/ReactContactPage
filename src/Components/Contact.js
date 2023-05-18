import React, { useState } from "react";

const Contact = () => {
  const [formStatus, setFormStatus] = useState("Gonder");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [message, setMessage] = useState("");
  const [collectedData, setCollectedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // E-posta adresinin geçerli bir formata sahip olup olmadığını kontrol et
    const isValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value);
    setIsValidEmail(isValid);
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
    setOptions(values);
  };

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    setSelectedCheckboxes(
      checkboxValue === selectedCheckboxes ? "" : checkboxValue
    );
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Telefon numarasının 10 haneli olduğunu ve "5" ile başladığını kontrol et
    const isValid = /^[5]\d{9}$/.test(value);
    setIsValidPhoneNumber(isValid);
  };
  let collectData = null;
  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Gonderiliyor...");

    // Check for empty fields
    const errors = {};
    if (!name) {
      errors.name = "İsminizi lütfen yazınız";
    }
    if (!email) {
      errors.email = " Mail adresini lütfen yazınız";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Telefon numarınızı yazınız";
    }
    if (!message) {
      errors.message = "Mesajınızı Yazın!";
    }
    if (options.length === 0) {
      errors.options = "Lütfen İlgilendiğiniz alandan bir tane seçenek seçiniz";
    }
    if (!selectedRadio) {
      errors.selectedRadio = "Lütfen okuduğunuz bölümü işaretleyin";
    }
    if (!selectedCheckboxes) {
      errors.selectedCheckboxes = "Lütfen size nasıl ulaşacağımızı işaretleyin";
    }

    // Add similar checks for other fields

    // If there are errors, update the state and display error messages
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setFormStatus("Gonder");
      return;
    }
    const collected = {
      name: name,
      email: email,
      message: message,
      selected_department_options: options,
      selected_radio: selectedRadio,
      selected_checkboxes: selectedCheckboxes,
    };

    setTimeout(() => {
      if (Object.keys(errors).length === 0) {
        setCollectedData(collected);
      }
      setFormStatus("Gonder");
      setName("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
      setOptions([]);
      setSelectedRadio("");
      setSelectedCheckboxes("");
      setErrors({});
    }, 2000);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
    setOptions([]);
    setSelectedRadio("");
    setSelectedCheckboxes("");
    setErrors({});
    setCollectedData(null);
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
            {error} <br></br>
          </span>
        ))}
        <form onSubmit={onSubmit}>
          <fieldset>
            <legend>Iletisim</legend>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                İsminiz:
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <div className="container mt-5">
                <form>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      E-posta Adresi:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  {email && (
                    <span style={{ color: isValidEmail ? "green" : "red" }}>
                      {isValidEmail
                        ? "Geçerli e-posta adresi"
                        : "Geçersiz e-posta adresi"}
                    </span>
                  )}
                </form>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="bolum">Okuduğunuz Bölüm:</label>
              <br />
              <input
                type="radio"
                id="radio1"
                name="radioButton"
                value="pc-müh"
                checked={selectedRadio === "pc-müh"}
                onChange={handleRadioChange}
              />
              <label htmlFor="radio1">Bilgisayar Mühendsiliği</label>
              <br />
              <input
                type="radio"
                id="radio2"
                name="radioButton"
                value="yazilim"
                checked={selectedRadio === "yazilim"}
                onChange={handleRadioChange}
              />
              <label htmlFor="radio2">Yazılım Mühendsiliği</label>
              <br />
              <input
                type="radio"
                id="radio3"
                name="radioButton"
                value="bilisim"
                checked={selectedRadio === "bilisim"}
                onChange={handleRadioChange}
              />
              <label htmlFor="radio3">Bilişim Sistemleri</label>
            </div>
            <div className="mb-3">
              <label htmlFor="interests">İlgilendiğiniz Alanlar:</label>
              <br></br>
              <select
                id="interests"
                name="interests"
                size="4"
                multiple
                className="select"
                onChange={handleChange}
                value={options}
              >
                <option value="yapayzeka">Yapay Zeka</option>
                <option value="siber">Siber Güvenlik</option>
                <option value="web">Web</option>
                <option value="veri">Veri Analizi</option>
                <option value="machine">Makine Öğrenmesi</option>
                <option value="dil">Doğal Dil İşleme</option>
              </select>
            </div>
            <div>
              <div className="container mt-5">
                <form>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="phoneNumber">
                      Telefon Numarası:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                  {phoneNumber && (
                    <span
                      style={{ color: isValidPhoneNumber ? "green" : "red" }}
                    >
                      {isValidPhoneNumber
                        ? "Geçerli telefon numarası"
                        : "Geçersiz telefon numarası"}
                    </span>
                  )}
                </form>
                <em>
                  (Telefon numarınızı başında "0" olmadan yazınız.
                  Örn:5320580805)
                </em>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                Mesajınız:
              </label>
              <textarea
                className="form-control"
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>

            <div className="mb-3">
              <label>Size Nasıl Ulaşalım?</label>
              <br />
              <input
                type="checkbox"
                id="checkbox1"
                name="checkbox1"
                value="mail"
                checked={selectedCheckboxes === "mail"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox1">Mail</label>
              <br />
              <input
                type="checkbox"
                id="checkbox2"
                name="checkbox"
                value="telefon"
                checked={selectedCheckboxes === "telefon"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox2">Telefon</label>
              <br />
              <input
                type="checkbox"
                id="checkbox3"
                name="checkbox3"
                value="non-select"
                checked={selectedCheckboxes === "non-select"}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="checkbox3">Fark Etmez</label>
            </div>
            <button className="btn btn-primary" type="submit">
              {formStatus}
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleReset}
            >
              Temizle
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Contact;

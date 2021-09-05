import { useState } from "react";
import axios from "axios";

export const Services = (props) => {
  const [comments, setComments] = useState("");
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setComments(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append("comments", comments);
    bodyFormData.append("file", file);

    setLoading(true);

    axios({
      method: "post",
      url: "http://localhost:5000/file",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setLoading(false);
        setResult(response.data.result);
        setShowResult(true);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  const handleselectedFile = (e) => {
    setFilename(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  return (
    <div id="services">
      <div className="container">
        <div className="col-md-8">
          <div className="row">
            <div className="section-title">
              <h2>Upload CV in PDF</h2>
            </div>
            <form name="sentMessage" validate="true" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="btn btn-custom btn-lg">
                      Choose File
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=".pdf"
                        onChange={handleselectedFile}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <p>{filename}</p>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows="4"
                  placeholder="Comments"
                  required
                  onChange={handleChange}
                ></textarea>
                <p className="help-block text-danger"></p>
              </div>
              <div id="success"></div>
              <button
                type="submit"
                className="btn btn-custom btn-lg"
                disabled={file && !loading ? false : true}
              >
                Process
              </button>
            </form>
          </div>
        </div>
        {showResult && (
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="services-item">
              <div className="section-title">
                <h2>Prediction</h2>
              </div>{" "}
            </div>
            <div className="services-item">
              <p>
                <span>
                  <i
                    className={`fa ${result < 50 ? "fa-times" : "fa-check"}`}
                  ></i>{" "}
                  {`This Person has `} <strong>{result}</strong>
                  {`% chances of passing the technical interview process.`}
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

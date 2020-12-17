import React from 'react';
import './App.css';
import {FaRegWindowClose} from 'react-icons/fa';

class App extends React.Component{

  fileObject  = [];
  fileList    = [];

  constructor(props){
    super(props);

    this.state = {
      files: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    
    for (let x = 0; x < e.target.files.length; x++) {
      this.fileObject.push(e.target.files[x]);
    }
    
    this.fileList = [];
    
    for (let y = 0; y < this.fileObject.length; y++) {
      this.fileList.push(URL.createObjectURL(this.fileObject[y]));
    }

    this.setState({
      files: this.fileList
    })
  }

  removeImage = (key) => {

    let files = [];

    files = this.state.files.concat();

    this.fileList.splice(key, 1);
    this.fileObject.splice(key, 1);
    files.splice(key, 1);

    this.setState({
      files: files
    })

    if (this.fileList.length === 0) {
      this.fileObject = [];
    }
  }

  render(){
    const files = this.state.files;
    return(
      <React.Fragment>
        <div className="container">
          <div className="header">
            <h3>Multiple File Upload</h3>
          </div>
          <div className="space">
            <input
              onChange={this.handleChange}
              type="file"
              multiple
              />
            <p>
              Resimleri buraya sürükleyin
            </p>
          </div>

          <div className="imageList">
              <ul>
                {
                  files.length > 0 && (
                    files.map((url, key) => 
                      <li key={key}>
                        <FaRegWindowClose 
                          onClick={() => this.removeImage(key)}
                          className="remove-image"
                        />
                        <img
                          src={url} 
                        />
                      </li>
                    )
                  )
                }
              </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

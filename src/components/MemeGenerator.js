import React from "react";

class MemeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImg: []
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImg: memes });
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const num = Math.floor(Math.random() * this.state.allMemeImg.length);
    const randomMeme = this.state.allMemeImg[num].url;
    this.setState({ randomImg: randomMeme });
  };

  render() {
    return (
      <div className="container">
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input className="form-control"
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input className="form-control"
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button className="btn">Gen</button>
        </form>
        <div className="meme">
          <img className="img-flex img-thumbnail" src={this.state.randomImg} alt="random meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;

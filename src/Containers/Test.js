import React, { Component } from 'react'

export default class Test extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            test: []
        }
    }

    componentDidMount(){

        let data = {
            a: "pranjal"
        }
        fetch('http://test.corexx.in/test/test.php',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',

            })

        }).then((resp) =>resp.json())
        .then((resp) => {
            console.log(resp);
        })
    }
    
  render() {
    return (
      <div>
        Test
      </div>
    )
  }
}

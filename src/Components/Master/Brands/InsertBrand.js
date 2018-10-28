import React, { Component } from 'react'

class InsertBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand_name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

        handleChange(e){
            this.setState({
                [e.target.name] : e.target.value
            })
        }

        handleSubmit(e){
            e.preventDefault();
            const data = this.state;
            this.props.setData(data);
            this.setState({
                brand_name: ''
            })
        }
    
    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h3>Insert Brand Name</h3>
                    <hr />
                    <div className="form-group">
                        <label>Brand Name</label>
                        <input
                            className="form-control"
                            placeholder="Brand Name"
                            required={true}
                            name="brand_name"
                            onChange={this.handleChange}
                            value={this.state.brand_name} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default InsertBrand;

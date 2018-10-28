import React, { Component } from 'react'

class EditBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand_name: '',
            brand_id: '',
            type: 'edit'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        this.props.updateData(data);
        this.setState({
            brand_name: '',
            brand_id: ''
        })
    }
    componentDidMount(){
        this._initialSet();
    }

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this._initialSet();
        }
    }

    _initialSet(){
        let editData = this.props.setEditData;
        this.setState({
            brand_name: editData[0].brand_name,
            brand_id: editData[0].brand_id
        })
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h3>Edit Brand Name</h3>
                    <hr />
                    <div className="form-group">
                        
                        <input
                            type="hidden"
                            className="form-control"
                            placeholder="Brand Name"
                            required={true}
                            name="brand_id"
                            onChange={this.handleChange}
                            value={this.state.brand_id} />
                    </div>
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


export default EditBrand;

import React, { Component } from 'react'

class EditUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unit_name: '',
            unit_id: '',
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
            unit_name: '',
            unit_id: ''
        })
    }
    componentDidMount() {
        this._initialSet();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this._initialSet();
        }
    }

    _initialSet() {
        let editData = this.props.setEditData;
        this.setState({
            unit_name: editData[0].unit_name,
            unit_id: editData[0].unit_id
        })
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h3>Edit Unit Name</h3>
                    <hr />
                    <div className="form-group">

                        <input
                            type="hidden"
                            className="form-control"
                            placeholder="Unit Id"
                            required={true}
                            name="unit_id"
                            onChange={this.handleChange}
                            value={this.state.unit_id} />
                    </div>
                    <div className="form-group">
                        <label>Unit Name</label>
                        <input
                            className="form-control"
                            placeholder="Unit Name"
                            required={true}
                            name="unit_name"
                            onChange={this.handleChange}
                            value={this.state.unit_name} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default EditUnit;

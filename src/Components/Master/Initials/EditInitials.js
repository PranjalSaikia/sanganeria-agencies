import React, { Component } from 'react'

class EditInitials extends Component {
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
        const data = {
            id: this.state.unit_id,
            type: 'edit',
            initial: this.state.unit_name
        }
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
            unit_name: editData[0].bar,
            unit_id: editData[0].id
        })
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h3>Edit Initials</h3>
                    <hr />
                    <div className="form-group">

                        <input
                            type="hidden"
                            className="form-control"
                            placeholder="Initial"
                            required={true}
                            name="unit_id"
                            onChange={this.handleChange}
                            value={this.state.unit_id} />
                    </div>
                    <div className="form-group">
                        <label>Initials</label>
                        <input
                            className="form-control"
                            placeholder="Initials"
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


export default EditInitials;

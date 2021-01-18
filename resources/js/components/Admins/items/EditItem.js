import React, {Component} from 'react';
import {getAuthAdmin} from "../functions";
import {editItem, updateItem} from "./functions";

class EditItem extends Component {
    state = {
        // inputs
        name: '',
        description: '',
        status: '',
        price: '',
        photo: '',

        //validation
        nameRequired: '',
        descriptionRequired: '',
        statusRequired: '',
        priceRequired: '',
        photoRequired: '',
        photoType: '',
        photoSize: '',
        success: ''
    };

    inputRef = React.createRef();

    componentDidMount() {

        const id = this.props.match.params.id;

        editItem(id).then(res => {
            console.log(res.data.item.status)
            this.setState({
                name: res.data.item.name,
                description: res.data.item.description,
                status: res.data.item.status,
                price: res.data.item.price
            })

        })

        getAuthAdmin().then(res => {
            this.setState({
                admins_id: res.data.admin.id
            })
        })
    }

    validateName = () => {
        let nameRequired = '';
        if (this.state.name.length < 4) {
            nameRequired = 'you should enter at least 4 characters'
        }
        if (nameRequired) {
            this.setState({
                nameRequired
            })
        } else {
            this.setState({
                nameRequired: ''
            })
        }
    }


    validateDescription = () => {
        let descriptionRequired = '';
        if (this.state.description.length < 4) {
            descriptionRequired = 'you should enter at least 4 characters'
        }
        if (descriptionRequired) {
            this.setState({
                descriptionRequired
            })
        } else {
            this.setState({
                descriptionRequired: ''
            })
        }
    }

    validateStatus = () => {
        let statusRequired = '';
        if (!this.state.status) {
            statusRequired = 'you should select a status'
        }
        if (statusRequired) {
            this.setState({
                statusRequired
            })
        } else {
            this.setState({
                statusRequired: ''
            })
        }
    }

    validatePrice = () => {
        let priceRequired = '';
        if (!this.state.price) {
            priceRequired = 'you should enter price'
        }
        if (priceRequired) {
            this.setState({
                priceRequired
            })

        } else {
            this.setState({
                priceRequired: ''
            })
        }
    }

    validatePhoto = () => {
        let photoRequired = '';

        if (!this.state.photo) {
            photoRequired = 'you should select photo'
        }
        if (photoRequired) {
            this.setState({
                photoRequired
            })
            return
        } else {
            this.setState({
                photoRequired: ''
            })
        }

        let photoType = '';

        if (
            (this.state.photo.type !== "image/jpg") &&
            (this.state.photo.type !== "image/jpeg") &&
            (this.state.photo.type !== "image/png") &&
            (this.state.photo.type !== "image/jif")
        ) {
            photoType = 'Invalid Image'
        }
        if (photoType) {
            this.setState({
                photoType
            })
        } else {
            this.setState({
                photoType: ''
            })
        }

        let photoSize = '';

        if (this.state.photo.size > 14048000) {
            console.log(this.state.photo.size)
            photoSize = 'Image size must be less than 14 MB'
        }
        if (photoSize) {
            this.setState({
                photoSize
            })
        } else {
            this.setState({
                photoSize: ''
            })
        }

    }

    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changePhotoState = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    }

    submitState = (e) => {
        e.preventDefault();

        this.validateName();
        this.validateDescription();
        this.validateStatus();
        this.validatePrice();
        this.validatePhoto();

        const formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('status', this.state.status)
        formData.append('price', this.state.price)
        formData.append('photo', this.state.photo)

        const id = this.props.match.params.id;

        updateItem(id, formData).then(res => {

            if (res) {

                this.inputRef.current.value = '';
                this.setState({
                    success: 'You created an Item successfully',
                    name: '',
                    description: '',
                    status: '',
                    price: '',
                });
            } else {
                this.setState({
                    success: ''
                });
            }
        });

    }

    render() {

        const success = (<div className='alert alert-success'> {this.state.success} </div>);

        return (
            <div>
                {this.state.success ? success : null}

                <div className="card text-white bg-dark mb-3 mt-5 card_login" style={{maxWidth: "25rem"}}>
                    <div className="card-header">Add Item</div>
                    <div className="card-body">
                        <form onSubmit={this.submitState}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input
                                    type='name' className='form-control'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.changeState}
                                />
                                <small style={{color: 'red'}}>
                                    {this.state.nameRequired}
                                </small>

                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputDescription1">Description</label>
                                <input
                                    type='text' className='form-control'
                                    id="exampleInputDescription1"
                                    name='description'
                                    value={this.state.description}
                                    onChange={this.changeState}
                                />
                                <small style={{color: 'red'}}>
                                    {this.state.descriptionRequired}
                                </small>

                            </div>

                            <div className="form-group">

                                <label htmlFor="exampleInputDescription1">Status</label>

                                <select
                                    type='text'
                                    className='form-control'
                                    id="exampleInputStatus1"
                                    name='status'
                                    value={this.state.status}
                                    onChange={this.changeState}
                                >
                                    <option value={''}>...</option>
                                    <option value={'1'}>new</option>
                                    <option value={'2'}>used</option>
                                </select>

                                <small style={{color: 'red'}}>
                                    {this.state.statusRequired}
                                </small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPrice1">Price</label>
                                <input
                                    type='text' className='form-control'
                                    id="exampleInputPrice1"
                                    name='price'
                                    value={this.state.price}
                                    onChange={this.changeState}
                                />
                                <small style={{color: 'red'}}>
                                    {this.state.priceRequired}
                                </small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPhoto1">Photo</label>
                                <input
                                    ref={this.inputRef}
                                    type='file' className='form-control'
                                    id="exampleInputPhoto1"
                                    name='photo'
                                    onChange={this.changePhotoState}
                                />

                                <small style={{color: 'red'}}>
                                    {this.state.photoRequired}
                                </small>
                                <br/>
                                <small style={{color: 'red'}}>
                                    {this.state.photoType}
                                </small>
                                <br/>
                                <small style={{color: 'red'}}>
                                    {this.state.photoSize}
                                </small>
                            </div>


                            <button type='submit' className='btn btn-primary'>Add Item</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditItem;

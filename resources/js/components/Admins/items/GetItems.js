import React, {Component} from 'react';
import {deleteItem, getItems, handlePage} from "./functions";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class GetItems extends Component {
    state = {
        items: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 3
    }

    componentDidMount() {
        getItems().then(res => {
            this.setState({
                items: res.data.items.data,
                activePage: res.data.items.current_page,
                itemsCountPerPage: res.data.items.per_page,
                totalItemsCount: res.data.items.total,

            })
        })
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        handlePage(pageNumber).then(res => {
            this.setState({
                items: res.data.items.data,
                activePage: res.data.items.current_page,
                itemsCountPerPage: res.data.items.per_page,
                totalItemsCount: res.data.items.total,
            })
        })

    }

    delete = (id) => {
        deleteItem(id).then(res => {
            let items = this.state.items;
            for (let index = 0; index < items.length; index++) {
                if (items[index].id === id) {
                    items.splice(index, 1)
                    this.setState({
                        items
                    })
                }
            }
        })
    }

    render() {
        return (
            <div>
                <Link className='btn btn-info mt-3 mb-3' to={'/addItem'}>
                    <FontAwesomeIcon icon='plus-square' className={'icon'}/>
                    Add Item
                </Link>
                <table className='table table-striped'>
                    <thead className='bg-info'>
                    <tr>
                        <th scope='col'>Item Number</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Control</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.items.map(item => {
                        return (
                            <tr key={item.id}>
                                <th scope='row'>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    {item.status === '1' ? (
                                        <span>new</span>
                                    ) : null}
                                    {item.status === '2' ? (
                                        <span>used</span>
                                    ) : null}
                                </td>
                                <td>
                                    <Link
                                        className='btn btn-info'
                                        to={'/edit/item/' + item.id}
                                    >
                                        <FontAwesomeIcon icon='edit' className={'icon'}/>
                                        Edit
                                    </Link>
                                    <button className='btn btn-danger ml-2'
                                            onClick={() => this.delete(item.id)}
                                    >
                                        <FontAwesomeIcon icon='trash' className={'icon'}/>
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={3}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
        )
    }
}

export default GetItems;

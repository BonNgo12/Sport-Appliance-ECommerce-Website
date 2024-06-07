import React from 'react';
import { useEffect, useState } from 'react';
import { useFetchAllcode } from '../../customize/fetch';
import { deleteTypeShipService, getAllTypeShip } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../utils/constant';
import ReactPaginate from 'react-paginate';
import CommonUtils from '../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import FormSearch from '../../../component/Search/FormSearch';
const ManageTypeShip = () => {

    const [dataTypeShip, setdataTypeShip] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [keyword, setkeyword] = useState('')
    useEffect(() => {

        fetchData(keyword);


    }, [])
    let fetchData = async (keyword) => {
        let arrData = await getAllTypeShip({

            limit: PAGINATION.pagerow,
            offset: 0,
            keyword: keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataTypeShip(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    let handleDeleteTypeShip = async (id) => {

        let res = await deleteTypeShipService({
            data: {
                id: id
            }
        })
        if (res && res.errCode === 0) {
            toast.success("Deleted shipping type successfully")
            let arrData = await getAllTypeShip({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                keyword: keyword

            })
            if (arrData && arrData.errCode === 0) {
                setdataTypeShip(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error("Fail to delete shipping type")
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllTypeShip({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            keyword: keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataTypeShip(arrData.data)

        }
    }
    let handleSearchTypeShip = (keyword) => {
        fetchData(keyword)
        setkeyword(keyword)
    }
    let handleOnchangeSearch = (keyword) => {
        if (keyword === '') {
            fetchData(keyword)
            setkeyword(keyword)
        }
    }
    let handleOnClickExport = async () => {
        let res = await getAllTypeShip({

            limit: '',
            offset: '',
            keyword: ''
        })
        if (res && res.errCode == 0) {
            await CommonUtils.exportExcel(res.data, "List of Shipping type", "ListTypeShip")
        }

    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Manage Shipping type</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    List of shipping type
                </div>
                <div className="card-body">

                    <div className='row'>
                        <div className='col-4'>
                            <FormSearch title={"tên loại ship"} handleOnchange={handleOnchangeSearch} handleSearch={handleSearchTypeShip} />
                        </div>
                        <div className='col-8'>
                            <button style={{ float: 'right' }} onClick={() => handleOnClickExport()} className="btn btn-success" >Export to Excel <i class="fa-solid fa-file-excel"></i></button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Shipping type name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataTypeShip && dataTypeShip.length > 0 &&
                                    dataTypeShip.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.type}</td>
                                                <td>{CommonUtils.formatter.format(item.price)}</td>
                                                <td>
                                                    <Link to={`/admin/edit-typeship/${item.id}`}>Edit</Link>
                                                    &nbsp; &nbsp;
                                                    <span onClick={() => handleDeleteTypeShip(item.id)} style={{ color: '#0E6DFE', cursor: 'pointer' }}   >Delete</span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={count}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
            />
        </div>
    )
}
export default ManageTypeShip;
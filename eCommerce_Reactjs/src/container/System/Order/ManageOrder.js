import React from 'react';
import { useEffect, useState } from 'react';
import { getAllOrder } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../utils/constant';
import ReactPaginate from 'react-paginate';
import { useFetchAllcode } from '../../customize/fetch';
import CommonUtils from '../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
const ManageOrder = () => {

    const [dataOrder, setdataOrder] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const { data: dataStatusOrder } = useFetchAllcode('STATUS-ORDER');
    const [StatusId, setStatusId] = useState('ALL')
    useEffect(() => {
        loadOrderData('ALL')

    }, [])
    let loadOrderData = (statusId) => {
        try {
            let fetchData = async () => {
                let arrData = await getAllOrder({

                    limit: PAGINATION.pagerow,
                    offset: 0,
                    statusId: statusId

                })
                if (arrData && arrData.errCode === 0) {
                    setdataOrder(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }
    let handleOnchangeStatus = (event) => {

        loadOrderData(event.target.value)
        setStatusId(event.target.value)

    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllOrder({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            statusId: StatusId
        })
        if (arrData && arrData.errCode === 0) {
            setdataOrder(arrData.data)

        }
    }
    let handleOnClickExport = async () => {
        let res = await getAllOrder({

            limit: '',
            offset: '',
            statusId: 'ALL'
        })
        if (res && res.errCode == 0) {
            await CommonUtils.exportExcel(res.data, "List of orders", "ListOrder")
        }

    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Manage orders</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    List of orders
                </div>
                <select onChange={(event) => handleOnchangeStatus(event)} class="form-select col-3 ml-3 mt-3">
                    <option value={'ALL'} selected>Order status</option>
                    {
                        dataStatusOrder && dataStatusOrder.length > 0 &&
                        dataStatusOrder.map((item, index) => {
                            return (
                                <option value={item.code}>{item.value}</option>
                            )
                        })
                    }
                </select>
                <div className="card-body">
                    <div className='row'>

                        <div className='col-12 mb-2'>
                            <button style={{ float: 'right' }} onClick={() => handleOnClickExport()} className="btn btn-success" >Export to Excel <i class="fa-solid fa-file-excel"></i></button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Order code</th>
                                    <th>Phone number</th>
                                    <th>Email</th>
                                    <th>Order date</th>
                                    <th>Shipping type</th>
                                    <th>Voucher code</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                    <th>Shipper</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataOrder && dataOrder.length > 0 &&
                                    dataOrder.map((item, index) => {
                                        let date = moment.unix(item.orderdate / 1000).format('DD/MM/YYYY')
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.userData.phonenumber}</td>
                                                <td>{item.userData.email}</td>
                                                <td>{moment.utc(item.createdAt).local().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{item.typeShipData.type}</td>
                                                <td>{item.voucherData.codeVoucher}</td>
                                                <td>{item.isPaymentOnlien == 0 ? 'Cash payment' : 'online payment'}</td>
                                                <td>{item.statusOrderData.value}</td>
                                                <td>{item.shipperData && item.shipperData.firstName + " " + item.shipperData.lastName + " - " + item.shipperData.phonenumber}</td>
                                                <td>
                                                    <Link to={`/admin/order-detail/${item.id}`}>View details</Link>


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
                previousLabel={'Back'}
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
export default ManageOrder;
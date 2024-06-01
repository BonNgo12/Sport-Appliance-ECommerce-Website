import React from 'react';
import { useEffect, useState } from 'react';
import { createNewSupplierService, getDetailSupplierByIdService, updateSupplierService } from '../../../services/userService';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddSupplier = (props) => {



    const [isActionADD, setisActionADD] = useState(true)


    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        name: '', address: '',phonenumber: '',email: ''
    });
    useEffect(() => {

        if (id) {
            let fetchDetailSupplier = async () => {
                setisActionADD(false)
                let supplier = await getDetailSupplierByIdService(id)
                if (supplier && supplier.errCode === 0) {
                    setInputValues({ ...inputValues, 
                        ["name"]: supplier.data.name, 
                        ["address"]: supplier.data.address,
                        ["phonenumber"]: supplier.data.phonenumber,
                        ["email"]: supplier.data.email
                    })
                }
            }
            fetchDetailSupplier()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveSupplier = async () => {
        if (isActionADD === true) {
            let res = await createNewSupplierService({
                name: inputValues.name,
                address: inputValues.address,
                email: inputValues.email,
                phonenumber: inputValues.phonenumber,
            })
            if (res && res.errCode === 0) {
                toast.success("Added supplier successfully")
                setInputValues({
                    ...inputValues,
                    ["name"]: '',
                    ["address"]: '',
                    ["email"]: '',
                    ["phonenumber"]: ''
                })
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Fail to add supplier")
        } else {
            let res = await updateSupplierService({
                name: inputValues.name,
                address: inputValues.address,
                email: inputValues.email,
                phonenumber: inputValues.phonenumber,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Updated supllier successfully")

            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Fail to update supplier")
        }
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Manage supllier</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Add new Supplier' : 'Update Supplier information'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Supplier name</label>
                                <input type="text" value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Email address</label>
                                <input type="text" value={inputValues.email} name="email" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Address</label>
                                <input type="text" value={inputValues.address} name="address" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Phone number</label>
                                <input type="text" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                        </div>
                        <button type="button" onClick={() => handleSaveSupplier()} className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddSupplier;
import React from 'react';
import { useEffect, useState } from 'react';
import { createNewTypeShipService, getDetailTypeShipByIdService, updateTypeShipService } from '../../../services/userService';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddTypeShip = (props) => {



    const [isActionADD, setisActionADD] = useState(true)


    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        type: '', price: ''
    });
    useEffect(() => {

        if (id) {
            let fetchDetailTypeShip = async () => {
                setisActionADD(false)
                let typeship = await getDetailTypeShipByIdService(id)
                if (typeship && typeship.errCode === 0) {
                    setInputValues({ ...inputValues, ["type"]: typeship.data.type, ["price"]: typeship.data.price })
                }
            }
            fetchDetailTypeShip()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveTypeShip = async () => {
        if (isActionADD === true) {
            let res = await createNewTypeShipService({
                type: inputValues.type,
                price: inputValues.price,
            })
            if (res && res.errCode === 0) {
                toast.success("Successfully added shipping type")
                setInputValues({
                    ...inputValues,
                    ["type"]: '',
                    ["price"]: ''
                })
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Fail to add shipping type")
        } else {
            let res = await updateTypeShipService({
                type: inputValues.type,
                price: inputValues.price,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Shipping type updated successfully")

            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Failed to update shipping type")
        }
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Manage shipping type</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Add new shipping type' : 'Update information of shipping type'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Shipping type name</label>
                                <input type="text" value={inputValues.type} name="type" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Price</label>
                                <input type="text" value={inputValues.price} name="price" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                        </div>
                        <button type="button" onClick={() => handleSaveTypeShip()} className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddTypeShip;
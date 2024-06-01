import React from 'react';
import { useEffect, useState } from 'react';
import { createNewReceiptService,getAllSupplier,getAllProductAdmin } from '../../../services/userService';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddReceipt = (props) => {
    const [user, setUser] = useState({})
    const [dataSupplier, setdataSupplier] = useState([])
    const [dataProduct, setdataProduct] = useState([])
    const [dataProductDetail, setdataProductDetail] = useState([])
    const [dataProductDetailSize, setdataProductDetailSize] = useState([])
    const [productDetailSizeId, setproductDetailSizeId] = useState('')
    const [inputValues, setInputValues] = useState({
        supplierId: '',quantity:'',price:'',productId:''
    });
    if (dataSupplier && dataSupplier.length > 0 && inputValues.supplierId === '' && dataProduct && dataProduct.length > 0 && inputValues.productId === '' ) {

        setInputValues({ ...inputValues, ["supplierId"]: dataSupplier[0].id, })
        setdataProductDetail(dataProduct[0].productDetail)
        setdataProductDetailSize(dataProduct[0].productDetail[0].productDetailSize)
        setproductDetailSizeId(dataProduct[0].productDetail[0].productDetailSize[0].id)
    }
    useEffect(() => {
        loadDataSupplier()
        loadProduct()
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
    let loadDataSupplier = async () => {
        let arrData = await getAllSupplier({

           
            limit: '',
            offset: '',
            keyword:''

        })
        if (arrData && arrData.errCode === 0) {
            setdataSupplier(arrData.data)
            
        }
    }
    let loadProduct = async () => {
        let arrData = await getAllProductAdmin({

            sortName: '',
            sortPrice: '',
            categoryId: 'ALL',
            brandId: 'ALL',
            limit: '',
            offset: '',
            keyword:''

        })
        if (arrData && arrData.errCode === 0) {
            setdataProduct(arrData.data)
           
        }
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    const handleOnChangeProduct = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value})
        for(let i=0;i<dataProduct.length;i++){
            if(dataProduct[i].id==value){
             
                setdataProductDetail(dataProduct[i].productDetail)
                setdataProductDetailSize(dataProduct[i].productDetail[0].productDetailSize)
                setproductDetailSizeId(dataProduct[i].productDetail[0].productDetailSize[0].id)
            }
        }

    };
    let handleOnChangeProductDetail = event =>{
        const { name, value } = event.target;
        for(let i=0;i<dataProductDetail.length;i++){
            if(dataProductDetail[i].id==value){
             
                setdataProductDetailSize(dataProductDetail[i].productDetailSize)
                setproductDetailSizeId(dataProductDetail[i].productDetailSize[0].id)
            }
        }
    }
    let handleSaveReceipt = async () => {
      
            let res = await createNewReceiptService({
                supplierId:inputValues.supplierId,
                userId:user.id,
                productDetailSizeId:productDetailSizeId,
                quantity:inputValues.quantity,
                price:inputValues.price
            })
            if (res && res.errCode === 0) {
                toast.success("Successfully added item")
                setInputValues({
                    ...inputValues,
                  
                    ["quantity"]: '',
                    ["price"]: ''
                })
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Fail to add item")
       
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Manage inventory</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Add new inventory
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                        <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Supplier</label>
                                <select value={inputValues.supplierId} name="supplierId" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {dataSupplier && dataSupplier.length > 0 &&
                                        dataSupplier.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Product</label>
                                <select  value={inputValues.productId} name="productId" onChange={(event) => handleOnChangeProduct(event)} id="inputState" className="form-control">
                                    {dataProduct && dataProduct.length > 0 &&
                                        dataProduct.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Product type</label>
                                <select  onChange={(event) => handleOnChangeProductDetail(event)} id="inputState" className="form-control">
                                    {dataProductDetail && dataProductDetail.length > 0 &&
                                        dataProductDetail.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.nameDetail}</option>
                                            )
                                        })
                                    }
                                </select>
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="inputEmail4">Product size</label>
                                <select  value={productDetailSizeId} name="productDetailSizeId" onChange={(event) => setproductDetailSizeId(event.target.value)} id="inputState" className="form-control">
                                    {dataProductDetailSize && dataProductDetailSize.length > 0 &&
                                        dataProductDetailSize.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.sizeId}</option>
                                            )
                                        })
                                    }
                                </select>
                        </div>
                        <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Quantity</label>
                                <input type="number" value={inputValues.quantity} name="quantity" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Unit price</label>
                                <input type="number" value={inputValues.price} name="price" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                        </div>
                       
                        <button type="button" onClick={() => handleSaveReceipt()} className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddReceipt;
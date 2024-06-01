import React from 'react';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../../utils/CommonUtils';
import moment from 'moment';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";
import { getProductDetailImageByIdService } from '../../../../services/userService';


const AddImageModal = (props) => {

    const [inputValues, setInputValues] = useState({
        image: '', imageReview: '', caption: '', isOpen: false, isActionUpdate: false, id: ''
    });

    useEffect(() => {
        let id = props.productImageId
        console.log("check id", id)
        if (id) {
            let fetchProductImage = async () => {
                let res = await getProductDetailImageByIdService(id)
                if (res && res.errCode === 0) {
                    setInputValues({
                        ...inputValues, ["isActionUpdate"]: true, ["caption"]: res.data.caption, ["image"]: res.data.image,
                        ["imageReview"]: res.data.image
                    })

                }
            }
            fetchProductImage();


        }
    }, [props.isOpenModal])



    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file.size > 31312281){
            toast.error("File size less than 30MB")
        }
        else{
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setInputValues({ ...inputValues, ["image"]: base64, ["imageReview"]: objectUrl })

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, ["isOpen"]: true })
    }
    let HandleSendDataFromModal = () => {
        props.sendDataFromModal({
            image: inputValues.image,
            caption: inputValues.caption,
            isActionUpdate: inputValues.isActionUpdate,
            id: props.productImageId
        })
        setInputValues({ ...inputValues, ["image"]: '', ["imageReview"]: '', ["caption"]: '', ["isActionUpdate"]: false })

    }
    let handleCloseModal = () => {
        props.closeModal()
        setInputValues({ ...inputValues, ["image"]: '', ["imageReview"]: '', ["caption"]: '', ["isActionUpdate"]: false })
    }
    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Add detail product image</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label>Image name</label>
                            <input value={inputValues.caption} name="caption" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Display image</label>
                            <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="img-review"></div>
                        </div>
                        <div className="col-12 form-group">
                            <label>Select image</label>
                            <input onChange={(event) => handleOnChangeImage(event)} type="file" accept=".jpg,.png" className="form-control form-file" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={HandleSendDataFromModal}
                    >
                        Save
                    </Button>
                    {' '}
                    <Button onClick={handleCloseModal}>
                        Cancle
                    </Button>
                </ModalFooter>
            </Modal>
            {inputValues.isOpen === true &&
                <Lightbox mainSrc={inputValues.imageReview}
                    onCloseRequest={() => setInputValues({ ...inputValues, ["isOpen"]: false })}
                />
            }
        </div >
    )
}
export default AddImageModal;
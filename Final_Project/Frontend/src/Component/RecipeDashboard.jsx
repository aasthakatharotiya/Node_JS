import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function RecipeDashboard() {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [rate, setRate] = useState("")
    const [status, setStatus] = useState("")
    const [img, setImg] = useState(null)

    const [record, setRecord] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        let response = await axios.get("http://localhost:2006/viewRecipe")
        console.log(response.data)
        setRecord(response.data.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (!name || !price || !rate) {
            alert("Please fill out all fields and upload an image.")
            return
        }
    
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("rate", rate)
        formData.append("status", "On The Way")
    
        if (img) {
            formData.append("img", img)
        }
    
        if (editIndex) {
            formData.append("id", editIndex)
            await axios.put("http://localhost:2006/updateRecipe", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        } else {
            await axios.post("http://localhost:2006/addRecipe", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }
    
        setName("")
        setRate("")
        setPrice("")
        setImg(null)
        setEditIndex(null)
        fetchApi()
    }

    const handleEdit = (id) => {
        let editResponse = record.find((item) => item._id === id)
        setName(editResponse.name)
        setRate(editResponse.rate)
        setPrice(editResponse.price)
        setImg(editResponse.img)
        setEditIndex(id)
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:2006/deleteRecipe?id=${id}`)
        setRecord(record.filter(item => item._id !== id))
    }

    const handleComplete = (id) => {
        let updatedRecord = record.map((item) =>
            item._id === id
                ? { ...item, status: item.status === "On The Way" ? "Completed" : "On The Way" }
                : item
        )
        setRecord(updatedRecord)
    }


    return (
        <div>
            {/* <h1 style={{ color: 'black' }}>---------------- Task Mnager ----------------</h1> */}
            <div>
                <div className='form_div'>
                    <form onSubmit={handleSubmit}>
                        <div className="name_main">
                            <div className="first_name">
                                <h3>Name</h3>
                                <input required value={name} type="text" placeholder='Enter Name...' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="last_name">
                                <h3>Rate</h3>
                                <input required value={price} type="text" placeholder='Enter Price...' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="img_main">
                            <div className="img">
                                <h3>Upload Image</h3>
                                <input type="file" accept="image/*" className='file_input' onChange={(e) => setImg(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="select_main">
                            <div className="category" style={{width: "100%"}}>
                                <h3>Rate</h3>
                                <select required value={rate} name="" id="" onChange={(e) => setRate(e.target.value)}>
                                    <option value="">Select Appropriate Option</option>
                                    <option value="Very Bad">Very Bad</option>
                                    <option value="Bad">Bad</option>
                                    <option value="Good">Good</option>
                                    <option value="Very Good">Very Good</option>
                                    <option value="Excellent">Excellent</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <center>
                            <button type='submit'>
                                {editIndex ? "Update Data" : "Add Data"}
                            </button>
                        </center>
                    </form>
                </div>
                <br />


                <div className="task_manager" style={{ height: record && record.length > 0 ? '270px' : 'auto' }}>
                    {
                        record
                            ? record.map((e, i) => {
                                let BgColor
                                let BgOpacity

                                if (e.rate === "Very Bad") {
                                    BgColor = "rgb(232,50,33)"
                                }
                                else if (e.rate === "Bad") {
                                    BgColor = "rgb(255,147,0)"
                                }
                                else if (e.rate === "Good") {
                                    BgColor = "green"
                                }
                                else if (e.rate === "Very Good") {
                                    BgColor = "rgb(210, 90, 4)"
                                }
                                else if (e.rate === "Excellent") {
                                    BgColor = "rgb(255, 0, 119)"
                                }
                                else {
                                    BgColor = "gray"
                                }

                                BgOpacity = e.status === "Completed" ? 0.5 : 1

                                return <div className="task_div" key={i} style={{ backgroundColor: BgColor, opacity: BgOpacity }} >
                                    <div className='left_div'>
                                        <h5>{e.status}</h5>
                                    </div>
                                    <div className="right_div">
                                        <div className="task_main">
                                            <div className="task_img">
                                                <button>
                                                    <img src={`http://localhost:2006/uploads/${e.img}`} alt="Task Image" />
                                                </button>
                                            </div>
                                            <div className="task_text">
                                                <h1>{e.name}</h1>
                                                <h3>{e.price}</h3>
                                                <span>{e.rate}</span>
                                            </div>
                                        </div>
                                        <br />
                                        <button className='edit_btn' onClick={() => handleEdit(e._id)}>Edit</button>
                                        <button className='delete_btn' onClick={() => handleDelete(e._id)}>Delete</button>
                                        <button className='comp_btn' onClick={() => handleComplete(e._id)}>{e.status === "Pending" ? "Complete" : "Pending"}</button>
                                    </div>
                                </div>
                            })
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}
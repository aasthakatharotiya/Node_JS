import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Employee() {

    const [record, setRecord] = useState([])

    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        let response = await axios.get("http://localhost:2006/ViewEmployeeRegister")
        setRecord(response.data.data)
    }

    const handleComplete = async (id) => {
        setRecord((employee) =>
            employee.map((e) =>
                e._id === id
                    ? { ...e, status: e.status === "Deactivate" ? "Activate" : "Deactivate" }
                    : e
            )
        );
    };


        return (
            <div>
                <div className="Admin_manager">
                    {/* <h2>Employee Details</h2> */}
                    <br />

                    <div className="task_manager">
                        {
                            record
                                ? record.map((e, i) => {
                                    let BgColor
                                    let BgOpacity

                                    if (e.category === "High") {
                                        BgColor = "rgb(232,50,33)"
                                    }
                                    else if (e.category === "Medium") {
                                        BgColor = "rgb(255,147,0)"
                                    }
                                    else if (e.category === "Low") {
                                        BgColor = "green"
                                    }
                                    else {
                                        BgColor = "gray"
                                    }

                                    BgOpacity = e.status === "Deactivate" ? 0.5 : 1

                                    return <div className="task_div" key={i} style={{ backgroundColor: BgColor, opacity: BgOpacity }} >
                                        <div className='left_div'>
                                            <h5>{e.status}</h5>
                                        </div>
                                        <div className="right_div">
                                            <h1>{e.task}</h1>
                                            <div className="task_main">
                                                <div className="task_img">
                                                    <button>
                                                        <img src={`http://localhost:2006/uploads/${e.img}`} alt="Task Image" />
                                                    </button>
                                                </div>
                                                <div className="task_text">
                                                    <h3>{e.name}</h3>
                                                    <p>{e.email}</p>
                                                    <h4>91+ {e.number}</h4>
                                                    <p>{e.category} Performance</p>
                                                </div>
                                            </div>
                                            <br />
                                            {/* <button className='edit_btn' onClick={() => handleEdit(e._id)}>Edit</button>
                                        <button className='delete_btn' onClick={() => handleDelete(e._id)}>Delete</button> */}
                                            <button className='comp_btn' onClick={() => handleComplete(e._id)}>{e.status === "Deactivate" ? "Activate" : "Deactivate"}</button>
                                        </div>
                                    </div>
                                })
                                : ""
                        }
                    </div>
                </div>
            </div>
        );
    }

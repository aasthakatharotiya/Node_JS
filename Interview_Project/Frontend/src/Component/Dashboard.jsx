import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {

    const [img, setImg] = useState(null)
    const [category_name, setCategoryName] = useState("")

    const [product_name, setProductName] = useState("")
    const [product_price, setProductPrice] = useState("")

    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState("")

    const [record, setRecord] = useState(null)
    const [data, setData] = useState(null)
    const [editIndex, setEditIndex] = useState(null)

    const [activeCategoryId, setActiveCategoryId] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const [showForm, setShowForm] = useState(false)
    const [productForm, setProductForm] = useState(false)

    useEffect(() => {
        fetchApi()
        fetchProduct()
    }, [])


    useEffect(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css'
        link.integrity = 'sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)

        return () => {
            document.head.removeChild(link)
        }
    }, [])

    const fetchApi = async () => {
        let response = await axios.get("http://localhost:2006/viewCategory")
        const categoryList = response.data.data
        setRecord(categoryList)
        setCategories(categoryList)
        if (categoryList.length > 0) {
            setActiveCategoryId(categoryList[0]._id)
        }
    }

    const fetchProduct = async () => {
        let response = await axios.get("http://localhost:2006/viewProduct")
        setData(response.data.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!category_name || !img) {
            alert("Please Fill Out All Fields and Upload an Image.")
        }

        const formData = new FormData()
        formData.append("category_name", category_name)

        if (img) {
            formData.append("img", img)
        }

        if (editIndex) {
            formData.append("id", editIndex)
            await axios.put("http://localhost:2006/updateCategory", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }
        else {
            await axios.post("http://localhost:2006/addCategory", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }

        setCategoryName("")
        setImg(null)
        setEditIndex(null)
        setShowForm(false)
        fetchApi()
    }

    const handleEdit = (id) => {
        let editResponse = record.find((item) => item._id === id)
        setCategoryName(editResponse.category_name)
        setImg(editResponse.img)
        setEditIndex(id)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:2006/deleteCategory?id=${id}`)
        setRecord(record.filter(item => item._id !== id))
    }


    const submitProduct = async (e) => {
        e.preventDefault()

        if (!product_name || !img || !product_price) {
            alert("Please Fill Out All Fields and Upload an Image")
        }

        const formData = new FormData()
        formData.append("product_name", product_name)
        formData.append("product_price", product_price)
        formData.append("categoryId", categoryId)

        if (img) {
            formData.append("img", img)
        }

        if (editIndex) {
            formData.append("id", editIndex)
            await axios.put("http://localhost:2006/updateProduct", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }
        else {
            await axios.post("http://localhost:2006/addProduct", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
        }

        setProductName("")
        setProductPrice("")
        setCategoryId("")
        setImg(null)
        setEditIndex(null)
        setProductForm(false)
        fetchProduct()
    }

    const productEdit = (id) => {
        let editResponse = data.find((item) => item._id === id)
        setProductName(editResponse.product_name)
        setProductPrice(editResponse.product_price)
        setCategoryId(editResponse.categoryId)
        setImg(editResponse.img)
        setEditIndex(id)
        setProductForm(true)
    }

    const productDelete = async (id) => {
        await axios.delete(`http://localhost:2006/deleteProduct?id=${id}`)
        setData(data.filter(item => item._id !== id))
    }

    return (
        <div>
            <div className="navbar_main">
                <div className="logo">
                    <img src="https://img.freepik.com/premium-vector/grocery-shopping-business-commerce-logo-design-template_76712-487.jpg?semt=ais_hybrid&w=740" alt="" />
                </div>

                <div className="search_product">
                    <input type="text" placeholder="Search Your Product..." onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                <div className="product_type">
                    <div className="flex_type">
                        <span>Color</span>
                        <span className='plus'>+</span>
                    </div>

                    <div className="flex_type">
                        <span>Quantity</span>
                        <span className='plus'>+</span>
                    </div>

                    <div className="flex_type">
                        <span>Price</span>
                        <span className='plus'>+</span>
                    </div>

                    <div className="flex_type">
                        <span>Rate</span>
                        <span className='plus'>+</span>
                    </div>

                    <div className="flex_type">
                        <span>Quality</span>
                        <span className='plus'>+</span>
                    </div>

                    <div className="flex_type">
                        <span>Category</span>
                        <span className='plus'>+</span>
                    </div>

                    <div className="flex_type">
                        <span>Mterial</span>
                        <span className='plus'>+</span>
                    </div>
                </div>
            </div>

            <div className="all_category">
                <div className="add" onClick={() => setShowForm(true)}>
                    <i className="fa-solid fa-plus"></i>
                    <h3>Add Category</h3>
                </div>

                <div className="all_category_display">
                    {
                        record
                            ? record.map((e, i) => {
                                return <div
                                    className={`disp_category position-relative ${activeCategoryId === e._id ? 'active-category' : ''}`}
                                    key={e._id}
                                    onClick={() => setActiveCategoryId(e._id)}
                                >
                                    <button>
                                        <img src={`http://localhost:2006/uploads/${e.img}`} alt="Task Image" />
                                    </button>
                                    <h3>{e.category_name}</h3>

                                    <button onClick={(ev) => { ev.stopPropagation(); handleEdit(e._id) }} className='position-absolute top-0 end-0 edit_btn'>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={(ev) => { ev.stopPropagation(); handleDelete(e._id) }} className='position-absolute top-0 end-0 delete_btn'>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>

                                    {/* <button onClick={() => handleEdit(e._id)} className='position-absolute top-0 end-0 edit_btn'>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(e._id)} className='position-absolute top-0 end-0 delete_btn'>
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button> */}
                                </div>
                            })
                            : ""
                    }
                </div>
            </div>

            {showForm && (
                <div className="add_category_form">
                    <form onSubmit={handleSubmit}>
                        <h1>Add Category</h1>

                        <h3>Category Image</h3>
                        <input type="file" accept="image/*" className='file_input' onChange={(e) => setImg(e.target.files[0])} />

                        <h3>Category Name</h3>.
                        <input type="text" placeholder='Category Name...' value={category_name} onChange={(e) => setCategoryName(e.target.value)} />


                        <div className="category_btn">
                            <button type='submit' className='submit_btn'>
                                {editIndex ? "Save" : "Add"}
                            </button>
                            <button type="button" className='cancel_btn' onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="all_product">
                <div className="product_head">
                    <h2>Product</h2>
                    <button onClick={() => setProductForm(true)}>Add</button>
                </div>

                <div className="disp_product">
                    {
                        data
                            ? data
                                .filter(product =>
                                    (searchTerm === "" ? product.categoryId === activeCategoryId : true) &&
                                    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                // .filter(product => product.categoryId === activeCategoryId && product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((e, i) => {
                                    return <div className='all_product_disp position-relative' key={e._id}>
                                        <div className='product_img'>
                                            <img src={`http://localhost:2006/uploads/${e.img}`} alt="Task Image" />
                                        </div>
                                        <h3>{e.product_name}</h3>
                                        <p>₹ {e.product_price}</p>

                                        <button onClick={() => productEdit(e._id)} className='position-absolute top-0 end-0 edit_btn'>
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button onClick={() => productDelete(e._id)} className='position-absolute top-0 end-0 delete_btn'>
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                })
                            : ""
                    }
                </div>
            </div>


            {productForm && (
                <div className="add_category_form">
                    <form onSubmit={submitProduct}>
                        <h1>Add Product</h1>

                        <h3>Product Image</h3>
                        <input type="file" accept="image/*" className='file_input' onChange={(e) => setImg(e.target.files[0])} />

                        <h3>Product Name</h3>.
                        <input type="text" placeholder='Product Name...' value={product_name} onChange={(e) => setProductName(e.target.value)} />

                        <h3>Product Price</h3>.
                        <input type="number" placeholder='Product Price...' value={product_price} onChange={(e) => setProductPrice(e.target.value)} />

                        <h3>Product Category</h3>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className='form-control'>
                            <option value="">Select Category</option>
                            {categories.map((e) => (
                                <option key={e._id} value={e._id}>
                                    {e.category_name}
                                </option>
                            ))}
                        </select>

                        <div className="category_btn">
                            <button type='submit' className='submit_btn'>
                                {editIndex ? "Save" : "Add"}
                            </button>
                            <button type="button" className='cancel_btn' onClick={() => setProductForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
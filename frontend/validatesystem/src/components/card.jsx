import React, { useEffect, useState } from 'react';
import './CardComponent.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Card() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();
    const { ct } = useParams()
    const data = useSelector((state) => state.workers.users);
    const [empty, setEmpty] = useState(false);
    const isEmpty = useSelector((state) => state.workers.empty);
    const [users, setUsers] = useState([]);
    const [selectval, setselect] = useState("")
    const [notfound, setNotFound] = useState(false)
    
    const findbycategory = (a) => {
    
        a = a.toLowerCase()
        if (a == "all") {
            setNotFound(false)
            return setUsers(data)
        }
        const res = data.filter((item) => item.category.toLowerCase() == a)
        console.log(a)
        if (res.length==0)
            return setNotFound(true)
        setNotFound(false)
        setUsers(res)

    }
    useEffect(() => {
        findbycategory(ct)
    }, [data]);

    useEffect(() => {
        if (isEmpty) {
            setEmpty(true);
        }
    }, [isEmpty]);
    const handleSelectchange = (e) => {
        setselect(e.target.value)
        findbycategory(e.target.value)
    }
    const handlesearch = (e) => {
        const res = data.filter((item) => item.area.startsWith(e.target.value))
        console.log(!res)
        if (res.length==0)
            return setNotFound(true)
            
        setNotFound(false)
        setUsers(res)
    }
    if(isEmpty)
    {
        return (
            <div className='bg-gray text-black p-5 my-3  mx-auto text-center  border rounded'>
                    <h3>our workforce is empty now</h3>
                      <button onClick={()=>navigate('/register')} className='btn btn-primary btn-lg'>Want to join us</button>
            </div>

        )
    }
//console.log(notfound)
    return (
        <div className='outerframe'>
            <nav className="navbar">
                <div className="navbar-container">


                    <input type="text" placeholder="Search by area." onChange={handlesearch} />


                    <div className="showselect select-box">
                        <select onChange={handleSelectchange} value={selectval}>
                            <option value="">Filter By Category</option>
                            <option value="all">All</option>
                            <option value="Mason">Mason</option>
                            <option value="Labourer">Labourer</option>
                            <option value="Tile Work">Tile Work</option>
                            <option value="Shuttering">Shuttering</option>
                            <option value="Colouring">Colouring</option>
                            <option value="Pop Work">Pop Work</option>
                            <option value="Slab Work">Slab work</option>
                            <option value="Carpenter">Carpenter</option>
                        </select>
                    </div>
                    <i className="fa-solid fa-bars text-dark togglebtn" onClick={() => setIsOpen(!isOpen)}></i>

                </div>
                <div className={`navbar-links ${isOpen ? 'activator' : ''}`}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/aboutus">About us</Link></li>
                        <li><Link to="/register">Register</Link></li>

                        <li><Link to="/available/all">Available</Link></li>
                    </ul>
                    <div className="select-box">
                        <select onChange={handleSelectchange} value={selectval}>
                            <option value="">Filter By Category</option>
                            <option value="all">all </option>
                            <option value="Mason">Mason</option>
                            <option value="Labourer">Labourer</option>
                            <option value="Tile Work">Tile Work</option>
                            <option value="Shuttering">Shuttering</option>
                            <option value="Colouring">Colouring</option>
                            <option value="Pop Work">Pop Work</option>
                            <option value="Slab Work">Slab work</option>
                            <option value="Carpenter">Carpenter</option>
                        </select>
                    </div>
                </div>
            </nav>
            {
                notfound ? <h2 className='bg-light text-danger p-5 my-4'>No result matched your query </h2>
                    :
                    <>

                        {users.length !== 0 && (
                            <>

                                <div className='maincontent'>
                                    {users.map((item, key) => (
                                        <div key={key} className="imagecontainer">
                                            <div className="profile-img">
                                                <img src={item.photo} alt="Profile Picture" />
                                            </div>
                                            <div className="profile-info">
                                                <h2>User Profile</h2>
                                                <p><strong>Name:</strong>{item.username}</p>
                                                <p><strong>Age:</strong>{item.age}</p>
                                                <p><strong>Mobile Number:</strong>{item.mobile}</p>
                                                <p><strong>Aadhaar:</strong>{item.adhaar}</p>
                                                <p><strong>Area:</strong>{item.area}</p>
                                                <p><strong>Skills:</strong>{item.skills}</p>
                                                <p><strong>Category:</strong>{item.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>

                        )}
                    </>
            }


        </div>
    );
}

export default Card;

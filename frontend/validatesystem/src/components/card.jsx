import React, { useEffect, useState } from 'react';
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
       // console.log(data)
        const res = data.filter((item) => item.category.toLowerCase() == a)

//console.log(a)
        if (res.length==0)
            return setNotFound(true)
        setNotFound(false)
        setUsers(res)

    }
    useEffect(() => {
       // console.log("entered")
        findbycategory(ct)
    }, [data]);

    useEffect(() => {
       // console.log("entered in empty useeeffect handler also")
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
//console.log(!res)
        if (res.length==0)
            return setNotFound(true)
            
        setNotFound(false)
        setUsers(res)
    }
    if(isEmpty)
    {
        return (
            <div className='bg-blue-200 text-black p-5 my-3  mx-auto text-center  border rounded'>
                    <h3>our workforce is empty now</h3>
                      <button onClick={()=>navigate('/register')} className='btn btn-primary btn-lg'>Want to join us</button>
            </div>

        )
    }
//console.log(notfound)
    return (
        <div className='outerframe'>
            <nav className="navbar bg-blue-600 shdaow-lg border-b border-black ">
                <div className="navbar-container py-1 borde bg-white-400 w-full flex justify-around items-center">


                    <input type="text" className='h-full w-1/2 min-[512px]:w-2/6 p-3 rounded-full' placeholder="Search by area." onChange={handlesearch} />


                    <div className="hidden showselect rounded-full  bg-blue-200 select-box w-2/6 min-[512px]:flex items-center">
                        <select onChange={handleSelectchange} className="h-full rounded-full w-full p-3"value={selectval}>
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
                    <i className="fa-solid text-4xl p-1 min-[512px]:hidden fa-bars text-dark togglebtn" onClick={() => setIsOpen(!isOpen)}></i>

                </div>
                <div className={`navbar-links bg-gray-500 w-full py-5 flex flex-col justify-center items-center z-10 ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className='flex flex-col w-full justify-center items-center py-2 tracking-wide text-2xl'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/aboutus">About us</Link></li>
                        <li><Link to="/register">Register</Link></li>

                        <li><Link to="/available/all">Available</Link></li>
                    </ul>
                    <div className="select-box w-full bg-black mx-auto">
                        <select onChange={handleSelectchange} value={selectval} className='w-full p-3 rounded-full'>
                            <option value="" >Filter By Category</option>
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
                notfound ? <h2 className='text-red-500 bg-gray-600 mx-auto w-[90%] sm:w-1/2 p-6 my-4 text-2xl text-center'>No result matched your query </h2>
                    :
                    <>

                        {users.length !== 0 && (
                            <>

                                <div className='maincontent border border-black px-2 flex justify-evenly gap-4 flex-wrap py-2 font-serif'>
                                    {users.map((item, key) => (
                                        <div key={key} className="imagecontainer shadow-sm rounded-sm shadow-black p-9 bg-white w-full sm:max-w-[18rem]">
                                            <div className="profile-img  bg-pink-400 h-[5rem] w-[5rem] mx-auto my-4 rounded-full">
                                                <img src={item.photo} alt="Profile Picture"className='rounded-full size-full'/>
                                            </div>
                                            <div className="profile-info text-center py-9">
                                                <h2 className='my-2 font-bold'>User Profile</h2>
                                                <p><strong>Name:</strong>{" "+ item.username}</p>
                                                <p><strong>Age:</strong>{" "+item.age}</p>
                                                <p><strong>Mobile Number:</strong>{" "+ item.mobile}</p>
                                                <p><strong>Aadhaar:</strong>{" "+ item.adhaar}</p>
                                                <p><strong>Area:</strong>{" "+ item.area}</p>
                                                <p><strong>Skills:</strong>{" "+ item.skills}</p>
                                                <p><strong>Category:</strong>{ " "+ item.category}</p>
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

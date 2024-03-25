import React, { useState } from 'react'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
//7C1WD1Q2D21W115CYZ8L5FPV twillio
const Availablenav = () => {
 

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                   
                    
                        <input type="text" id="searchbar" placeholder="Search by area." />
                    
                
                    <div className="showselect select-box">
                        <select>
                        <option value="">Filter By Category</option>
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
                    <i className="fa-solid fa-bars text-dark togglebtn" onClick={()=>setIsOpen(!isOpen)}></i>
                  
                </div>
                <div className={`navbar-links ${isOpen ? 'activator' : ''}`}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/aboutus">About us</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/features">Features</Link></li>
                            <li><Link to="/available/all">Available</Link></li>
                        </ul>
                        <div className="select-box">
                        <select>
                        <option value="">Filter By Category</option>
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
        </>
    );
};

export default Availablenav;

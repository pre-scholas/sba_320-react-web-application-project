import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Card from "../components/Card";

const initialState = {
    loading: true,
    error: null,
    data: null,
};  

function Navbar() {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/planets">Planets</a></li>
                <li><a href="/people">People</a></li>
                <li><a href="/starships">Starships</a></li>
                <li><a href="/vehicles">Vehicles</a></li>
            </ul>
        </nav>   
    )
    
}
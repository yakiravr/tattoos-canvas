import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        if (searchTerm) {
            axios.get("/api/search/" + searchTerm).then(({ data }) => {
                setUsers(data.users);
            });
        }
    }, [searchTerm]);

    return (
        <>
            <div id="findpeople">
                <div className="">
                    <input
                        placeholder="find tattoo"
                        onChange={({ target }) => setSearchTerm(target.value)}
                    />
                </div>

                <div id="search-results">
                    {users &&
                        users.map((users) => {
                            return (
                                <div key={users.id}>
                                    <Link to={`/user/${users.id}`}>
                                        <img
                                            src={users.imgurl}
                                            id="findpeople-img"
                                        />
                                        <div id="names">{users.firstname}</div>
                                    </Link>
                                </div>
                            );
                        })}
                </div>
                <div></div>
            </div>
        </>
    );
}

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function UserList()
{
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedUser, setSelectedUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() =>
    {
        fetchUsers();
    }, []);

    async function fetchUsers()
    {
        setLoading(true);
        setError("");

        try
        {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!res.ok)
            {
                throw new Error("Failed to fetch");
            }

            const data = await res.json();
            setUsers(data);
            setFilteredUsers(data);
        }
        catch (err)
        {
            setError(err.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        let result = users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );

        result.sort((a, b) =>
        {
            if (sortOrder === "asc")
            {
                return a.name.localeCompare(b.name);
            }
            else
            {
                return b.name.localeCompare(a.name);
            }
        });

        setFilteredUsers(result);

    }, [search, users, sortOrder]);

    function toggleFavorite(id)
    {
        if (favorites.includes(id))
        {
            setFavorites(favorites.filter(f => f !== id));
        }
        else
        {
            setFavorites([...favorites, id]);
        }
    }

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} onRetry={fetchUsers} />;

    return (
        <div>
            <SearchBar
                search={search}
                setSearch={setSearch}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                reload={fetchUsers}
            />

            <div className="user-container">
                {
                    filteredUsers.map(user =>
                    (
                        <div className="card" key={user.id}>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>

                            <span
                                className="star"
                                onClick={() => toggleFavorite(user.id)}
                            >
                                {favorites.includes(user.id) ? "⭐" : "☆"}
                            </span>

                            <br />

                            <button onClick={() => setSelectedUser(user)}>
                                View Details
                            </button>
                        </div>
                    ))
                }
            </div>

            {selectedUser && (
                <div
                    className="modal"
                    onClick={() => setSelectedUser(null)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-btn"
                            onClick={() => setSelectedUser(null)}
                        >
                            ×
                        </button>

                        <h2>{selectedUser.name}</h2>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>City:</strong> {selectedUser.address.city}</p>
                        <p><strong>Phone:</strong> {selectedUser.phone}</p>
                        <p><strong>Company:</strong> {selectedUser.company.name}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;
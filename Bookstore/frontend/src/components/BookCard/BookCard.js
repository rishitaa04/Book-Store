import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const BookCard = ({ data, favourite }) => {
  // console.log(data);

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook= async()=>{
    const response= await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  }
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
      <div className="">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]"></img>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">
            {data.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            {data.price}
          </p>
        </div>
      </Link>
      {favourite && (
        <button
          onClick={handleRemoveBook}
          className="bg-yellow-50 px-4 py-2 round border-yellow-500 text-yellow-500 mt-4"
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);//state bata paste nikaleko
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();//action lai dispatch gareko

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())//harek paste ma yo condition check garxa
  );//patse ko title user le search gareko sanga milxa ki mildaina

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));

  }

  return (

    <div>
      <input className='p-2 rounded-2xl w-[700px]  bg-gray-100 border border-gray-300 
             placeholder-gray-500 text-black 
             focus:outline-none focus:ring-2 focus:ring-blue-500'
        type='search' placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-6 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(//map function ko use garera paste ko sabai title leko
            (paste) => {
              return (
                <div className='border' key={paste?._id}>
                  {/* yo key chai console ma warning ayera haleko nahale ni chalna chai chalxa */}
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-5 place-content-evenly'>
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>
                    <button>
                      <a href={`/pastes/${paste?._id}`}>
                        View{/*  view lai click garyo ki href ma vako path ma lagxa with that paste id*/}
                      </a>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    {/* ?. is called optional chaining in JavaScript.
                            It safely checks if paste is null or undefined before trying to access _id. */}
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("copied to clipboard");
                    }}>
                      Copy
                    </button>
                    <button>Share</button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>

                </div>
              )
            }
          )
        }

      </div>
    </div>

  )
}

export default Paste

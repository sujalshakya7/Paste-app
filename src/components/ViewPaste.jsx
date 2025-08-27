import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const {id}=useParams();//url ma vako id leko
  const allPastes=useSelector((state)=>state.paste.pastes)//sabai paste nikaleko
  const paste=allPastes.filter((p)=>p._id===id)[0];//sabai paste bata mathi nikaleko ko id vako paste lai nikaleko
                //value array ma aaira avera "[0]" yo hale
   
  return (
    <div>
    <div className='flex flex-row gap-5 place-content-between'>
    <input className='rounded-2xl mt-4 min-w-[300px] p-4 bg-gray-100 border border-gray-300 
     placeholder-gray-500 text-black 
     focus:outline-none focus:ring-2 focus:ring-blue-500' type='text'  placeholder='Enter title here'
        value={paste.title} 
        disabled//text lekhna paudaina view matra garna pauxa
        onChange={(e) => setTitle(e.target.value)} />

        {/* <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
           {
            pasteId?"Update My Paste":"Create Paste"
           }
        </button> */}
</div>
<div className='mt-8'>
    <textarea className='rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-100 border border-gray-300 
     placeholder-gray-500 text-black 
     focus:outline-none focus:ring-2 focus:ring-blue-500' value={paste.content} placeholder='enter content here' 
    onChange={(e)=>setValue(e.target.value)}
        rows={20}
        disabled
    />

</div>
</div>
  )
}

export default ViewPaste   
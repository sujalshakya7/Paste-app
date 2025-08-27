import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

    const [title, setTitle] = useState('');
    const [value,setValue]=useState('');
    const [searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId");//url ko parameter ma vako id
    const dispatch=useDispatch(); 
    const allPastes=useSelector((state)=>state.paste.pastes);//state bata sabai paste nikaleko

   
    useEffect(() => {//edit garna ko lagi
        if(pasteId){
            //sabai paste aba euta specific paste find out gareko
            const paste=allPastes.find((p)=>
                p._id===pasteId);//sabai paste bata jasko "pasteId" match hunxa tesko title ra content edit garna milxa 
            setTitle(paste.title);
            setValue(paste.content);
        }
        
      
    }, [pasteId])
    
    function createPaste(){
        //  paste ko data create garera reducer function lai provide garne
        const paste={
            title:title,
            content:value,
            _id:pasteId || Date.now().toString(36),
            createdAt:new Date().toISOString(),//paste kaile create vako time

        }
       if(pasteId){
        //if pasteId paila dekhe xa vae Update garne
        dispatch(updateToPastes(paste));

       } 
       else{
        //pasteId xaina vae create garne
        dispatch(addToPastes(paste));//yo bracket vitra ko paste chai payload lai pathako
       }
       //after creation or update
       setTitle('');
       setValue('');
       setSearchParams({});

    }
    return (
        <div>
            <div className='flex flex-row gap-5 place-content-between'>
            <input className='rounded-2xl mt-4 min-w-[150px] p-4 bg-gray-100 border border-gray-300 
             placeholder-gray-500 text-black 
             focus:outline-none focus:ring-2 focus:ring-blue-500' type='text'  placeholder='Enter title here'
                value={title} onChange={(e) => setTitle(e.target.value)} />

                <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
                   {
                    pasteId?"Update My Paste":"Create Paste"
                   }
                </button>
        </div>
        <div className='mt-8'>
            <textarea className='rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-100 border border-gray-300 
             placeholder-gray-500 text-black 
             focus:outline-none focus:ring-2 focus:ring-blue-500' value={value} placeholder='enter content here' 
            onChange={(e)=>setValue(e.target.value)}
                rows={20}
            />

        </div>
        </div>
      
    )
}

export default Home
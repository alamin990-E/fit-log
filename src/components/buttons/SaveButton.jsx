'use client'
import { useExerciseContext } from "@/context/Exercise";
import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const SaveButton = ({ exercise }) => {
     const {  saveList, setSaveList} =
        useExerciseContext();
        const alreadyInSave = saveList.some(item => item.id === exercise.id)
         const handleSave = ()=>{
        if(alreadyInSave){
            toast.error(`${exercise.name} is already in Saved!`);
        }
       
        setSaveList((prev)=>[...prev,exercise])
        toast.success(`${exercise.name} is added to Saved!`)
    }
  return (
    <div>
      <button disabled={alreadyInSave} onClick={handleSave} className=" disabled:cursor-not-allowed disabled:pointer-events-auto flex items-center justify-center gap-2 rounded-lg border cursor-pointer border-white/10 bg-transparent px-4 py-2 sm:px-5 sm:py-3 text-[14px] font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/5">
        <IoBookmarkOutline />
        Save for later
      </button>
    </div>
  );
};

export default SaveButton;

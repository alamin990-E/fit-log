"use client"

import { createContext, useState } from "react"

const ExerciseContext= createContext()

export function ExerciseProvider ({children}){
    const[todayList,setTodayList] = useState([])
    const[saveList,setSaveList] = useState([])
    const value ={todayList,setTodayList,saveList,setSaveList}
    return(
        <ExerciseContext.Provider value={value}></ExerciseContext.Provider>
    )
}
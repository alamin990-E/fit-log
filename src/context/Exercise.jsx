"use client"

import { createContext, useContext, useState } from "react"

const ExerciseContext= createContext()

export function ExerciseProvider ({children}){
    const[todayList,setTodayList] = useState([])
    const[saveList,setSaveList] = useState([])
    const value ={todayList,setTodayList,saveList,setSaveList}
    return(
        <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>
    )
}

export function useExerciseContext (){
    const context = useContext(ExerciseContext)
    if(!context){
        throw new Error('Maybe You have;t wrapped the app into the Provider')
    }
    return context
}
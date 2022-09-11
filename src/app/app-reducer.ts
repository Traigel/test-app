import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialized: false
}

type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.initialized}
        default:
            return state
    }
}

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch( error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(()=> {
            dispatch(setAppInitializedAC(true))
        })
}


export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetStatusType = ReturnType<typeof setStatusAC>
export type SetAppInitializedType = ReturnType<typeof setAppInitializedAC>
type AppActionsType = SetErrorType | SetStatusType | SetAppInitializedType
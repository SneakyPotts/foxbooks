import { configureStore} from '@reduxjs/toolkit'
import headerSlice from "../components/Header/headerSlice";


export function makeStore() {
    return configureStore({
        reducer: {
            headerSlice
        }
    })
}

const store = makeStore()


export default store
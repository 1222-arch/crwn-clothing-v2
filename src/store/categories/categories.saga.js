import { takeLatest, all,call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess , fetchCategoriesFailed} from "./categories.action";
import { CART_ACTION_TYPES } from "../cart/cart.types";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";


 export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCategoriesSuccess(categoriesArray)) 
      }
     catch(error){
         yield put(fetchCategoriesFailed(error))

     } 

 }


export function* onFetchCategories(){
   yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START , fetchCategoriesAsync )

}

export function* categoriesSaga(){
    yield all([call(onFetchCategories)])




}
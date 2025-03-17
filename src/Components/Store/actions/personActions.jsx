import axios from '../../../Utils/Axios';
import { loadperson } from '../reducers/personSlice';
export {removeperson} from '../reducers/personSlice';
export const asyncLoadperson = (id)=> async(dispatch,getState)=>{
          try {
                const detail = await axios.get(`/person/${id}`);
                const externalId = await axios.get(`/person/${id}/external_ids`);
                const credits = await axios.get(`/person/${id}/combined_credits`);
                const movieCredits = await axios.get(`/person/${id}/movie_credits`);
                const tvCredits = await axios.get(`/person/${id}/tv_credits`);
                const images = await axios.get(`/person/${id}/images`);
                
                
                let ultimateData ={
                    details: detail.data,
                    externalIds: externalId.data,
                    combinedCredits: credits.data.cast,
                    movieCredits: movieCredits.data.cast,
                    tvCredits: tvCredits.data.cast,
                    images: images.data.profiles
                }
                // console.log(ultimateData)
                dispatch(loadperson(ultimateData));
            } catch (error) {
                alert(` ${(error.status)} Not Found`);
                console.log((error.code.toUpperCase()).replace(/_/g, " "))
            }
} 
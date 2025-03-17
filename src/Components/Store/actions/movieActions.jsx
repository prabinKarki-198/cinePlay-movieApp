import axios from '../../../Utils/Axios';
import { loadMovie } from '../reducers/movieSlice';
export {removeMovie} from '../reducers/movieSlice';
export const asyncLoadMovie = (id)=> async(dispatch,getState)=>{
          try {
                const detail = await axios.get(`/movie/${id}`);
                const externalId = await axios.get(`/movie/${id}/external_ids`);
                const recommendations = await axios.get(`/movie/${id}/recommendations`);
                const similar = await axios.get(`/movie/${id}/similar`);
                const videos = await axios.get(`/movie/${id}/videos`);
                const credit = await axios.get(`/movie/${id}/credits`);
                const watchProvider = await axios.get(`/movie/${id}/watch/providers`);
                
                let ultimateData ={
                    details: detail.data,
                    externalIds: externalId.data,
                    recommendations: recommendations.data.results,
                    similar: similar.data.results,
                    cast:credit.data.cast,
                    videos: videos.data.results.find(m => m.type === 'Trailer'),
                    watchProviders: watchProvider.data.results.US
                }
                // console.log(ultimateData)
                dispatch(loadMovie(ultimateData));
            } catch (error) {
                alert(` ${(error.status)} Not Found`);
                console.log((error.code.toUpperCase()).replace(/_/g, " "))
            }
} 
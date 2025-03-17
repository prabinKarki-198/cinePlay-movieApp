import axios from '../../../Utils/Axios';
import { loadtv } from '../reducers/tvSlice';
export {removetv} from '../reducers/tvSlice';
export const asyncLoadTv = (id)=> async(dispatch,getState)=>{
          try {
                const detail = await axios.get(`/tv/${id}`);
                const externalId = await axios.get(`/tv/${id}/external_ids`);
                const recommendations = await axios.get(`/tv/${id}/recommendations`);
                const similar = await axios.get(`/tv/${id}/similar`);
                const videos = await axios.get(`/tv/${id}/videos`);
                const credit = await axios.get(`/tv/${id}/credits`);
                const watchProvider = await axios.get(`/tv/${id}/watch/providers`);
                
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
                dispatch(loadtv(ultimateData));
            } catch (error) {
                alert(` ${(error.status)} Not Found`);
                console.log((error.code.toUpperCase()).replace(/_/g, " "))
            }
} 
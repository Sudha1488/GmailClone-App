import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import { setEmails } from "../redux/appSlice";
import store from "../redux/store";

const useGetAllEmails = () => {
    const dispatch = useDispatch();
    const {emails} = useSelector(store=>store.app);
    useEffect(() => {
        const fetchEmails = async () => {

            try {
                const res = await axios.get("http://localhost:8000/api/v1/email/getallemails", {
                    withCredentials: true
                });
                console.log("API Response:", res.data);
                dispatch(setEmails(Array.isArray(res.data.emails) ? res.data.emails : []));
            } catch (error) {
                console.log(error);
            }
        }
        fetchEmails();
    }, []);
};

export default useGetAllEmails;
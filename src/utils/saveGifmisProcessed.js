import axios from "axios";
import { server } from "../server/server";

async function saveGifmisProcessed (data) {
    const insertGifmisProcessed = await axios.post(`${server}insertgifmisprocessed`, data);
    /* navigate("/dashboard/goods");
    window.location.reload(); */
}

async function updateGifmisProcessed (data, id) {
    const updateGifmisProcessed = await axios.put(`${server}updategifmissprocessed/${id}`, data);
}

export { saveGifmisProcessed, updateGifmisProcessed };
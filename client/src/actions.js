import axios from "axios";

export async function getTatto() {
    const { data } = await axios.get("/gettatto");
    return {
        type: "GET_TATTOO",
        array: data.rows,
    };
}

export function mostRecent(msgs) {
    return {
        type: "MOST_RECENT_MESSAGES",
        data: msgs,
    };
}

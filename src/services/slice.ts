import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;
const treeSlice = createApi({
    reducerPath: 'treeSlice',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: () => ({}),
    tagTypes: [
        'tree',
    ],
});

export default treeSlice;
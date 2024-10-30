import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const treeSlice = createApi({
    reducerPath: 'treeSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),
    endpoints: () => ({}),
    tagTypes: [
        'tree',
    ],
});

export default treeSlice;
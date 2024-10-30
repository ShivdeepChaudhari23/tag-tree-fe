import { ITreeQueryResponse } from "../../interfaces/tree";
import { API_URLS } from "../apiUrls";
import treeSlice from "../slice";

const treeService = treeSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTree: builder.query<ITreeQueryResponse, void>({
            query: () => API_URLS.tree,
            providesTags: ['tree'],
        }),

        updateTree: builder.mutation<unknown, string>({
            query: (payload) => ({
                url: API_URLS.tree,
                method: 'POST',
                body: { treeData: payload},
            }),
            invalidatesTags: ['tree'],
        })
    })
});

export const {
    useGetTreeQuery,
    useUpdateTreeMutation,
} = treeService;
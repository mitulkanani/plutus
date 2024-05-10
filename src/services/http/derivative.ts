import http from "./index";

// type signInResType = {
//     access_token: string;
//     token_type: string;
// }

export const Derivative = {
    market: async (port: any) => {
        return http
            .get<any>(`${port}`)
            .then((res) => res.data);
    },
    Portfolio: async (port: any, data: any) => {
        return http
            .post<any>(`${port}`, data)
            .then((res) => res.data)
    }
};
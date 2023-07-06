declare namespace DocumentRequest {
    interface params {
        keyword?: string;
        sortBy?: string;
        orderBy?: string;
        perPage?: string | number;
        page?: string | number;
        path?: string;
        type?: string;
        people?: string;
        date?: string;
        trash?: number;
        limit?: number;
    }
}


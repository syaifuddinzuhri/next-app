
const url = {
    base_api: process.env.NEXT_PUBLIC_API_URL,
    login: "auth/login",
    me: "auth/me",
    logout: "auth/logout",
    user: {
        prefix: "user",
        get_all: 'get-all'
    },
    position: {
        prefix: "position",
        get_all: 'get-all'
    },
    group: {
        prefix: "group",
        get_all: 'get-all'
    },
    document: {
        datatables: 'document',
        detail_folder: 'document/detail-folder/',
        create_folder: 'document/folder/create',
        upload: 'document/upload',
        rename: 'document/rename',
        empty_trash: 'document/empty-trash',
        delete: 'document/delete',
        restore: 'document/restore',
        force_delete: 'document/force-delete',
        multiple_delete: 'document/multiple-delete',
        download_folder: 'download-folder/',
        download: 'document/download',
        get_folders: 'document/get-folders',
        move: 'document/multiple-move'
    },
};
const headersNotLogin = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const mustLoginPages: any = ['my-drive', 'shared-with-me', 'trash', 'setting', 'user'];

export { headersNotLogin, mustLoginPages, url };


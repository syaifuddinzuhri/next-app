export function formatDate(value: any) {
    const date = new Date(value)
    const year = date.toLocaleDateString("id-ID", {
        year: "numeric"
    })
    const monthy = date.toLocaleDateString("id-ID", {
        month: "short",
    })
    const day = date.toLocaleDateString("id-ID", {
        day: "numeric",
    })
    const time = date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: '2-digit',
        minute:'2-digit'
    })
    return `${time} `
}

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


export const errorManagemet = async (errorx: any) => {
    let message: string[] = [];
    try {
        if (errorx.response.data.errors) {
            Object.entries(errorx.response.data.errors)?.forEach(
                (datafetch: any, index) => {
                    datafetch[1].forEach((x: string) => {
                        message.push('\n' + x);
                    });
                }
            );
        } else {
            Object.entries(errorx.response.data.message)?.forEach(
                (datafetch: any, index) => {
                    datafetch[1].forEach((x: string) => {
                        message.push('\n' + x);
                    });
                }
            );
        }
    } catch (error: any) {
        message.push(errorx.response.data.message);
    }
    return message;
}

export const getUidUrl = () => {
    const parts = window.location.href.split('/');
    return parts.pop();
}

export const getParamsPath = (param: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get(param);
    return myParam ?? '';
}
import { toast } from "react-toastify";

export function showToast(type: string, title: string = '') {
    if (type == 'success') {
        toast.success(title, {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: false,
        });
    } else if (type == 'error') {
        toast.error(title, {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            pauseOnHover: false,
        });
    } else if (type == 'loading') {
        toast.dismiss();
        toast.warning('Process...', {
            position: "top-right",
            closeOnClick: false,
            hideProgressBar: true,
            pauseOnHover: false,
        });
    }
}

export function closeToast() {
    toast.dismiss();
}
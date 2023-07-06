import { getUidUrl } from "@/utils/GlobalFunction";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import NewFolder from "./NewFolder";

const HeaderPage = ({ isMain }: any) => {
    const router = useRouter()
    const goToUpload = (dir: boolean) => {
        let path: any = ''
        if (!isMain) {
            path = getUidUrl();
        }
        router.push('/my-drive/uploads?dir=' + dir + '&path=' + path);
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-10 gap-4">
                <NewFolder isMain={isMain} />
                <Button text="Upload Files" icon="heroicons-outline:cloud-arrow-down" className="btn-outline-dark" onClick={() => goToUpload(false)} />
                {/* <Button text="Upload Folders" icon="heroicons-outline:cloud-arrow-down" className="btn-outline-dark" onClick={() => goToUpload(true)} /> */}
                {/* <Upload isMain={isMain}/> */}
            </div>
        </>
    )
}

export default HeaderPage;
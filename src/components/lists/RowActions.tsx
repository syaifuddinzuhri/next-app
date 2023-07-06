
import Icon from "@/components/ui/Icon";
import { Menu } from "@headlessui/react";

const RowActions = ({ actions, data }: any) => {

    const handleAction = (item: any) => {
        switch (item) {
            case 'delete':
                handleDelete()
                break;
            case 'share':
                handleShare()
                break;
            case 'rename':
                handleRename()
                break;
            case 'move':
                handleMove()
                break;
            case 'download':
                handleDownload()
                break;
            default:
                break;
        }
    }

    const handleRename = () => {
        console.log('Rename');
    }

    const handleShare = () => {
        console.log('Share');
    }

    const handleDownload = () => {
        console.log('Download');
    }

    const handleMove = () => {
        console.log('Move');
    }

    const handleDelete = () => {
        console.log('Delete');
    }

    return (
        <>
            {
                actions.map((item: any, i: number) => (
                    <Menu.Item key={i}>
                        <div
                            onClick={() => handleAction(item.name)}
                            className={`${item.name === "delete"
                                ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                                : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                                }
            w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
            first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                        >
                            {/* <button onClick={handleAction} className="flex items-center space-x-2"> */}
                            <span className="text-base">
                                <Icon icon={item.icon} />
                            </span>
                            <span className="capitalize">{item.name}</span>
                            {/* </button> */}
                        </div>
                    </Menu.Item>
                ))
            }
        </>
    )
}

export default RowActions
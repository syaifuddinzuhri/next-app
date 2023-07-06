import Icon from "@/components/ui/Icon";

const CircleButton = ({ icon, click }: any) => {
    return (
        <button onClick={click} className="w-8 h-8 rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 inline-flex items-center justify-center transition-colors duration-150">
            <Icon icon={icon} />
        </button>
    )
}

export default CircleButton
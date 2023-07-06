import Icon from "@/components/ui/Icon";
import { UserContext, UserProvider } from "@/contexts/UserContext";
import { withProviders } from "@/utils/withProviders";
import { useContext, useEffect, useState } from "react";
import Select, { components } from "react-select";

const ListFilter = ({ handleFilter }: any) => {
    const [type, setType] = useState('')
    const [people, setPeople] = useState('')
    const [date, setDate] = useState('')
    const [listUsers, setListUsers] = useState([])

    const FileTypeOptionsComponent = ({ data, ...props }: any) => {
        return (
            <components.Option {...props}>
                <div className="flex gap-x-2">
                    <Icon icon={data.icon} className={`text-lg w-6 ${data.color}`} />
                    <span>{data.label}</span>
                </div>
            </components.Option>
        );
    };

    const PeopleOptionsComponent = ({ data, ...props }: any) => {
        return (
            <components.Option {...props}>
                <div>
                    <span className="inline-flex items-center">
                        <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                            <img
                                src={data.image}
                                alt=""
                                className="object-cover w-full h-full rounded-full"
                            />
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                            {data.label}
                        </span>
                    </span>
                </div>
            </components.Option>
        );
    };

    const {
        action: { allUsers },
    } = useContext(UserContext);

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const data = await allUsers()
        const map = data.map((item: any) => ({
            value: item.id,
            label: item.name,
            image: item.image
        }));
        setListUsers(map)
    }

    const dateOptions = [
        { value: "today", label: "Today" },
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "this_month", label: "This Month" },
        { value: "this_year", label: "This Year" },
        { value: "last_year", label: "Last Year" },
    ];

    const peopleOptions = [
        { value: "1", label: "Jenny Wilson", image: "/assets/images/all-img/customer_1.png", },
    ];

    const fileTypeOptions = [
        { value: "pdf", label: "PDFs", icon: "mdi:file-pdf-box", color: 'text-danger-600' },
        { value: "image", label: "Photo & Images", icon: "mdi:image", color: 'text-danger-600' },
        { value: "word", label: "Words", icon: "mdi:file-word", color: 'text-blue-500' },
        { value: "excel", label: "Excels", icon: "mdi:file-excel", color: 'text-success-600' },
        { value: "ppt", label: "Powerpoints", icon: "mdi:file-powerpoint", color: 'text-yellow-500' },
        { value: "video", label: "Videos", icon: "mdi:video-box", color: 'text-danger-600' },
        { value: "folder", label: "Folders", icon: "mdi:folder", color: 'text-dark-600' },
        { value: "audio", label: "Audios", icon: "mdi:music-box", color: 'text-danger-600' },
        { value: "zip", label: "Archives (zip)", icon: "mdi:folder-zip", color: 'text-dark-600' },
    ];

    const styles = {
        option: (provided: any, state: any) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    const handleType = (item: any) => {
        if (item) {
            setType(item.value)
            handleFilter(item.value, people, date)
        } else {
            setType('')
            handleFilter('', people, date)
        }
    }

    const handleDate = (item: any) => {
        if (item) {
            setDate(item.value)
            handleFilter(type, people, item.value)
        } else {
            setDate('')
            handleFilter(type, people, '')
        }
    }

    const handlePeople = (item: any) => {
        if (item) {
            setPeople(item.value)
            handleFilter(type, item.value, date)
        } else {
            setPeople('')
            handleFilter(type, '', date)
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            <Select
                className="react-select"
                classNamePrefix="select"
                name="type"
                options={fileTypeOptions}
                isClearable
                id="type"
                components={{
                    Option: FileTypeOptionsComponent,
                }}
                styles={styles}
                placeholder="File Type"
                onChange={handleType}
            />
            {/* <Select
                onChange={handlePeople}
                className="react-select"
                classNamePrefix="select"
                name="people"
                options={listUsers}
                isClearable
                id="people"
                components={{
                    Option: PeopleOptionsComponent,
                }}
                styles={styles}
                placeholder="Search People"
            /> */}
            <Select
                onChange={handleDate}
                className="react-select"
                classNamePrefix="select"
                styles={styles}
                name="last_modified"
                options={dateOptions}
                isClearable
                id="last_modified"
                placeholder="Last Modified"
            />
        </div>
    )
}

export default withProviders(UserProvider)(ListFilter);

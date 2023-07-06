import HeadPage from '@/app/head';
import { GroupContext, GroupProvider } from '@/contexts/GroupContext';
import { UserContext, UserProvider } from '@/contexts/UserContext';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import Select from "react-select";
import Button from '../ui/Button';
import Textinput from '../ui/Textinput';

interface IGroup {
    name: string;
    users: any[]
}

const FormGroup = ({ close, type, id }: any) => {
    const [form, setForm] = useState<IGroup>({
        name: '',
        users: []
    });

    const [listUsers, setListUsers] = useState([])
    const [userSelected, setUserSelected] = useState([])

    const {
        action: { addNewGroup, detailGroup, updateGroup, allGroups },
        data: { isLoading, isSuccess },
    } = useContext(GroupContext);

    const {
        action: { allUsers },
    } = useContext(UserContext);

    useEffect(() => {
        getAllUsers()
        if (type === 'edit') {
            getDetailData();
        }
    }, [])

    const getAllUsers = async () => {
        const data = await allUsers()
        const map = data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setListUsers(map)
    }

    const getDetailData = async () => {
        const detailData = await detailGroup(id)
        const users = detailData.users.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setForm({
            ...form,
            name: detailData?.name,
        })
        setUserSelected(users)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (type == 'edit') {
            updateGroup(form)
        } else {
            addNewGroup(form)
        }
        setTimeout(() => {
            close()
        }, 1000);
    }

    const handleChange = (value: any) => {
        const ids = value.map((item: any) => item.value)
        setForm({
            ...form,
            users: ids
        })
        setUserSelected(value)
    }

    return (
        <>
            <GroupProvider>
                <UserProvider>
                    <HeadPage title={type == 'add' ? 'Add Group' : 'Edit Group'} />
                    <Textinput
                        name="name"
                        label="name"
                        type="text"
                        placeholder="Enter name"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setForm({
                                ...form,
                                name: e.currentTarget.value
                            })
                        }}
                        defaultValue={form.name}
                    />
                    <label htmlFor="image">User</label>
                    <div className="space-y-3">
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            menuPortalTarget={document.body} 
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            isClearable
                            name="users"
                            isMulti={true}
                            options={listUsers}
                            id="users"
                            value={userSelected}
                            placeholder="Select User"
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className="py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700">
                        {
                            !isLoading ? (
                                <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    text={type == 'add' ? "Create" : "Update"}
                                    className="btn-dark btn-sm"
                                    disabled={isLoading}
                                />
                            ) : ''
                        }
                    </div>
                </UserProvider>
            </GroupProvider>
        </>
    )
}

export default FormGroup;
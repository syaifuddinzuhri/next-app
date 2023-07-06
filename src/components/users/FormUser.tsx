'use client';

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Fileinput from "@/components/ui/Fileinput";
import Textinput from "@/components/ui/Textinput";
import { PositionContext } from "@/contexts/PositionContext";
import { UserContext } from "@/contexts/UserContext";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Select from "react-select";

const FormUser = () => {
    const router = useRouter();
    const params = useParams();

    const [preview, setPreview] = useState('');

    const [listPositions, setListPositions] = useState([])

    const [form, setForm] = useState({
        name: '',
        email: '',
        nip: '',
        username: '',
        password: '',
        image: '',
        position_id: ''
    });

    const styles = {
        option: (provided: any, state: any) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    const {
        action: { allPositions, addNewPosition }
    } = useContext(PositionContext)


    const {
        action: { addNewUser, detailUser, updateUser },
        data: { isLoading },
    } = useContext(UserContext);

    useEffect(() => {
        getAllPositions()
        if (params.id) {
            getDetailData();
        }
    }, [])

    const getDetailData = async () => {
        const detailData = await detailUser(parseInt(params.id))
        setForm({
            ...form,
            name: detailData.name,
            email: detailData.email,
            nip: detailData.nip,
            username: detailData.username,
            position_id: detailData.position_id
        })
        setPreview(detailData.image)
    }

    const getAllPositions = async () => {
        const data = await allPositions()
        const map = data.map((item: any) => ({
            value: item.id,
            label: item.name,
        }));
        setListPositions(map)
    }

    const handleFileChange = (e: any) => {
        setForm({
            ...form,
            image: e.target.files[0]
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (params.id) {
            updateUser(form)
        } else {
            addNewUser(form)
        }
        window.location.href = '/users'
    }

    return (
        <>
            <Button text="Back" icon="heroicons-outline:arrow-left" className="btn-outline-primary btn-sm mb-3" onClick={() => {
                router.push('/users')
            }} />
            <Card noborder>
                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">Form New User</h4>
                </div>
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
                <Textinput
                    name="username"
                    label="username"
                    type="text"
                    placeholder="Enter username"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setForm({
                            ...form,
                            username: e.currentTarget.value
                        })
                    }}
                    defaultValue={form.username}
                />
                <Textinput
                    name="email"
                    label="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setForm({
                            ...form,
                            email: e.currentTarget.value
                        })
                    }}
                    defaultValue={form.email}
                />
                <Textinput
                    name="nip"
                    label="nip"
                    type="number"
                    placeholder="Enter NIP"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setForm({
                            ...form,
                            nip: e.currentTarget.value
                        })
                    }}
                    defaultValue={form.nip}
                />
                <Textinput
                    name="password"
                    label="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setForm({
                            ...form,
                            password: e.currentTarget.value
                        })
                    }}
                    defaultValue={form.password}
                />
                <label htmlFor="image">Position</label>
                <div className="space-y-3">
                    <Select
                        className="react-select"
                        classNamePrefix="select"
                        styles={styles}
                        isClearable
                        value={
                            listPositions.filter((option: any) =>
                                option.value === form.position_id)
                        }
                        name="position_id"
                        options={listPositions}
                        id="position_id"
                        onChange={(item: any) => {
                            setForm({
                                ...form,
                                position_id: item.value
                            })
                        }}
                        placeholder="Select Position"
                    />
                </div>

                <label htmlFor="image">Image</label>
                {
                    preview && <img className="object-cover h-48 w-48 mb-3" src={preview} alt="preview"></img>
                }
                <Fileinput
                    name="image"
                    selectedFile={form.image}
                    onChange={handleFileChange}
                />
                <div className="py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700">
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        text="Submit"
                        className="btn-dark btn-sm"
                    />
                </div>
            </Card >
        </>
    );
};

export default FormUser
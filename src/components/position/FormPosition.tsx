import HeadPage from "@/app/head";
import { PositionContext, PositionProvider } from "@/contexts/PositionContext";
import { withProviders } from "@/utils/withProviders";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Button from "../ui/Button";
import Textinput from "../ui/Textinput";

const FormPosition = ({ close, type, id }: any) => {

    const [form, setForm] = useState({
        name: '',
    });

    const {
        action: { addNewPosition, detailPosition, updatePosition },
        data: { isLoading, isSuccess, isError },
    } = useContext(PositionContext);

    useEffect(() => {
        if (type === 'edit') {
            getDetailData();
        }
    }, [])

    const getDetailData = async () => {
        const detailData = await detailPosition(id)
        setForm({
            ...form,
            name: detailData?.name
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (type == 'edit') {
            updatePosition(form)
        } else {
            addNewPosition(form)
        }
        close();
    }

    return (
        <>
            <HeadPage title={type == 'add' ? 'Add Position' : 'Edit Position'} />

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
        </>
    )
}

export default withProviders(PositionProvider)(FormPosition);
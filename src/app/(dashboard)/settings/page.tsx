"use client"
import HeadPage from "@/app/head";
import FormModal from "@/components/groups/FormModal";
import GroupTable from "@/components/groups/GroupTable";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import { GroupContext, GroupProvider } from "@/contexts/GroupContext";
import { UserProvider } from "@/contexts/UserContext";
import { withProviders } from "@/utils/withProviders";
import { produce } from "immer";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from 'react';

const Blank = () => {
  const router = useRouter();
  const location = usePathname();

  const [isOpen, setIsOpen] = useState(false)
  const [modalId, setModalId] = useState(0)
  const [modalTitle, setModalTitle] = useState('')
  const [modalType, setModalType] = useState('')

  useEffect(() => {
    router.refresh()
  }, [router])

  const {
    setState,
    state: { filterGroup },
    data: { isLoading, isFetching, groups },
    action: { deleteGroup }
  } = useContext(GroupContext)

  const fetchGroup = (page: number) => {
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  const handleSearch = (e: any) => {
    setState((prev) =>
      produce(prev, (draft) => {
        draft.filterGroup.params.page = 1
        draft.filterGroup.params.keyword = e.target.value
      })
    );
  }

  const handleNewGroup = () => {
    setIsOpen(true)
    setModalTitle('Add New Group')
    setModalType('add')
  }

  const handleRowAction = (type: string, row: any) => {
    if (type == 'delete') {
      deleteGroup(row.id)
      fetchGroup(1)
    } else if (type == 'edit') {
      setIsOpen(true)
      setModalTitle('Edit Group')
      setModalType('edit')
      setModalId(row.id)
    }
  }

  return (
    <>
      <HeadPage title="Group Setting" />
      <Button text="Add New Group" icon="heroicons-outline:plus" className="btn-primary btn-sm mb-3" onClick={() => handleNewGroup()} />
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Groups</h4>
          <Textinput
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={filterGroup.params.keyword}
          />
        </div>
        {isLoading || isFetching ? '' : (
          <GroupTable listGroups={groups} fetchGroup={fetchGroup} rowAction={handleRowAction} />
        )}
      </Card>
      {isOpen && <FormModal id={modalId} type={modalType} title={modalTitle} isOpen={isOpen} setIsOpen={setIsOpen} fetchGroup={fetchGroup} />}
    </>
  )
}

const providers = [
  GroupProvider,
  UserProvider
]
export default withProviders(...providers)(Blank);

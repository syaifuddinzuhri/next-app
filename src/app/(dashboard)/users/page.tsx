"use client"
import HeadPage from "@/app/head";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import UserTable from "@/components/users/UserTable";
import { UserContext, UserProvider } from "@/contexts/UserContext";
import { withProviders } from "@/utils/withProviders";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useContext } from 'react';
const querystring = require('querystring');

const Blank = () => {
  const router = useRouter();

  const {
    state: { filterUser },
    data: { isLoading, isFetching, users },
    setState,
    action: { deleteUser, detailUser }
  } = useContext(UserContext)

  const fetchUser = (page: number) => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const searchUser = (e: any) => {
    setState((prev) =>
      produce(prev, (draft) => {
        draft.filterUser.params.page = 1
        draft.filterUser.params.keyword = e.target.value
      })
    );
  }

  const handleNewUser = () => {
    router.push('/users/new');
  }

  const handleRowAction = (type: string, row: any) => {
    if (type == 'delete') {
      deleteUser(row.id)
      fetchUser(1)
    } else if (type == 'edit') {
      router.push(`/users/edit/${row.id}`);
    }
  }

  return (
    <>
      <HeadPage title="Users" />
      <Button text="New User" icon="heroicons-outline:plus" className="btn-primary btn-sm mb-3" onClick={handleNewUser} />
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Users</h4>
          <Textinput
            type="text"
            placeholder="Search"
            onChange={searchUser}
            value={filterUser.params.keyword}
          />
        </div>
        {isFetching || isLoading ? '' : (
          <UserTable listUser={users} fetchUser={fetchUser} rowAction={handleRowAction} />
        )}
      </Card>
    </>
  )
}

export default withProviders(UserProvider)(Blank);

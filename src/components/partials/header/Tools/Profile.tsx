import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { LoginContext, LoginProvider } from "@/contexts/LoginContext";
import storeUser from "@/store/storeUser";
import { withProviders } from "@/utils/withProviders";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

const ProfileLabel = ({ data }: any) => {
  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            src={storeUser.get('me') ? storeUser.get('me').image : "/assets/images/all-img/user.png"}
            alt=""
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          {storeUser.get('me') ? storeUser.get('me').name : 'Anonymous'}
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [me, setMe] = useState('')

  const {
    action: { logoutUser, getMe },
    data: { isLoading },
  } = useContext(LoginContext);

  const ProfileMenu = [
    // {
    //   label: "Profile",
    //   icon: "heroicons-outline:user",

    //   action: () => {
    //     router.push("/profile");
    //   },
    // },
    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => {
        logoutUser()
        // dispatch(handleLogout(false));
      },
    },
  ];

  return (
    <Dropdown label={ProfileLabel(me)} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item: any, index: number) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${active
                ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                : "text-slate-600 dark:text-slate-300"
                } block     ${item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
                }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default withProviders(LoginProvider)(Profile);
